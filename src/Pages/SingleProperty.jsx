import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { getAPropertyAPI, getUserInfoAPI, sendRequestAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import Map from '../Components/Map'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function SingleProperty() {

    const[userInfo,setUserInfo] = useState([])
    const[propertyDetails,setPropertyDetails] = useState([])
    const {id} = useParams()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchProperties = async()=>{
        console.log("the value of id from params is: ",id);
        const token = sessionStorage.getItem("token")
        
        if(token){
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }
            try{
                const result = await getAPropertyAPI(id,reqHeader)
                console.log(result);
                
                if(result.status==200){
                    setPropertyDetails(result.data)
                }
            
            }catch(err){
            console.log(err);
            
            }
        }
    }

    const getUserInfo=async()=>{
        const name = sessionStorage.getItem("name")
    
        const result = await getUserInfoAPI(name)
        console.log(result);
        
        if(result.status==200){
          setUserInfo(result.data)
        }
        else{
            console.log(result.response.data);
            
        }
        
        
    }

    const handleSendRequest = async(propertyId,ownerId)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            const reqBody = JSON.stringify({propertyId,ownerId})
            // const reqBody = new FormData()
            // reqBody.append("propertyId",propertyId)
            // reqBody.append("ownerId",ownerId)
            try{
                const result = await sendRequestAPI(reqBody,reqHeader)
                if(result.status==200){
                    toast.success("Request sent")
                    handleClose()
                }
                else{
                    toast.warning("Could not send request")
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    

    useEffect(()=>{
        fetchProperties()
        getUserInfo()
    },[id])

  return (
    <>
      <Header/>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-6 d-flex flex-column">
            
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{width:'100%'}}>
                <div class="carousel-inner">
                    { propertyDetails.propertyImages?.map((image)=>(
                        <div class="carousel-item active">
                        <img height={"400px"} src={`${server_url}/Uploads/${image}`} class="d-block w-100" alt="..."/>
                        </div>
                    ))

                    }
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div className="d-flex justify-content-end">
                <button className='btn carouselWishlist justify-content-end' ><i class="fa-solid fa-bookmark fa-xl" style={{color: "#000000"}}></i></button>
            </div>

            <div className="d-flex flex-row mt-2 justify-content-between">
                <div className="d-flex flex-column">
                    <h3 style={{fontWeight:'bold'}}>{propertyDetails?.title}</h3>
                    <p>{propertyDetails?.description}</p>
                    <p><span style={{fontWeight:'bold'}}>Address:</span> {propertyDetails?.address}</p>
                    {!propertyDetails?.isRented && (
                        <button className='btn' style={{backgroundColor:'var(--Palette-4)'}} onClick={handleShow}>Interested</button>
                    )

                    }
                </div>
                <div className='me-4'>
                    <img width={"80px"} height={"80px"} src="../src/assets/dp.jpg" alt="" />
                    <h5 style={{fontSize:'15px'}}>{userInfo?.[0]?.name || "loading..."}</h5>
                </div>
            </div>
        </div>
        <div className="col-2" style={{backgroundColor:'var(--Palette-3)'}}>
            <div className="container d-flex flex-column justify-content-evenly align-items-center pt-3 ps-0 pe-0" style={{backgroundColor:'transparent'}}>
                <div className='mb-3'>
                    <button className='btn disabled bg-light'><i class="fa-solid fa-location-dot fa-lg" style={{color: "#000000"}}></i> {propertyDetails?.city}</button>
                </div>
                <div className='d-flex flex-row flex-grow-1 mb-3'>
                    <button className='btn disabled bg-light me-1'><i class="fa-solid fa-bed fa-lg" style={{color: "#000000"}}></i> X {propertyDetails?.bed} Bedrooms</button>
                    <button className='btn disabled bg-light'><i class="fa-solid fa-bath fa-lg" style={{color: "#000000"}}></i> X {propertyDetails?.bath} Bathrooms</button>
                </div>
                <div className="d-flex flex-grow-1 mb-3">
                    <button className='btn disabled bg-light'>Type: {propertyDetails?.property}</button>
                </div>
                <div className="d-flex flex-grow-1 mb-3">
                    <button className='btn disabled bg-light'><i class="fa-solid fa-paw fa-lg" style={{color: "#000000"}}></i> Pets: {propertyDetails?.pets}</button>
                </div>
                <div className="d-flex flex-grow-1 mb-3">
                    <button className='btn disabled bg-light'><i class="fa-solid fa-phone fa-lg" style={{color: "#000000"}}></i> {propertyDetails?.phone}</button>
                </div>

            </div>
            
        </div>
        <div className="col-2"></div>
      </div>

      <div className="row mt-4 mb-4">
        <div className="col-2"></div>
        <div className="col-8">
            {propertyDetails?.lat && propertyDetails?.long ? (
                <Map position={[propertyDetails.lat, propertyDetails.long]} />
                ) : (
                <p>Loading map...</p>
            )}


        </div>
        <div className="col-2"></div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="d-flex flex-column text-center p-3">
            Send Rental Request to Owner?

            <div className="d-flex flex-row justify-content-center mt-4">
                <button className='btn btn-danger me-3' onClick={handleClose}>No</button>
                <button className='btn btn-success' onClick={()=>handleSendRequest(propertyDetails?._id,propertyDetails?.ownerId)}>Yes</button>
            </div>
          </div>

        </Modal.Body>
        {/* <Modal.Footer >
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary">yes</Button>
        </Modal.Footer> */}
      </Modal>



                  <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default SingleProperty

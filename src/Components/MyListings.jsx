import React, { useEffect, useState } from 'react'
import { deletePropertyAPI, getAllPropertiesAPI, getUserPropertiesAPI, updatePropertyAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function MyListings() {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setSelectedProperty({
            title:"", price:"", address:"", description:"", city:"", bed:"", bath:"", lat:"", long:"", property:"", pets:"", phone:"", propertyImages:[]
        })
        
        setShow(false)
    };

    const handleShow = (pid) => {
        const selected = allProperties.find((property) => property._id === pid);

        if (selected) {
            setSelectedProperty({
            id: selected._id || "",
            title: selected.title || "",
            price: selected.price || "",
            address: selected.address || "",
            description: selected.description || "",
            city: selected.city || "",
            bed: selected.bed || "",
            bath: selected.bath || "",
            lat: selected.lat || "",
            long: selected.long || "",
            property: selected.property || "",
            pets: selected.pets || "",
            phone: selected.phone || "",
            propertyImages: selected.propertyImages || [],
            });
        } else {
            console.error("Property not found for pid:", pid);
        }
        
        setShow(true)
    };

    const[userProperties,setUserProperties] = useState([])
    const[selectedProperty,setSelectedProperty] = useState({
            id:"", title:"", price:"", address:"", description:"", city:"", bed:"", bath:"", lat:"", long:"", property:"", pets:"", phone:"", propertyImages:[]
    })

  const fetchProperties = async()=>{
    const token = sessionStorage.getItem("token")

    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      try{
        const result = await getUserPropertiesAPI(reqHeader)
        console.log(result);
        
        if(result.status==200){
          setUserProperties(result.data)
        }
        
      }catch(err){
        console.log(err);
        
      }
    }
  }

  const handleUpdateProperty = async()=>{
    const {id,title,price,address,description,city,bed,bath,lat,long,property,pets,phone} = selectedProperty
    if(!id || !title || !price || !address || !description || !city || !bed || !bath || !lat || !long || !property || !pets || !phone){
        toast.warning("Please fill missing fields")
    }
    else{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        if(token){
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("price",price)
            reqBody.append("address",address)
            reqBody.append("description",description)
            reqBody.append("city",city)
            reqBody.append("bed",bed)
            reqBody.append("bath",bath)
            reqBody.append("lat",lat)
            reqBody.append("long",long)
            reqBody.append("property",property)
            reqBody.append("pets",pets)
            reqBody.append("phone",phone)

            try{
                const result = await updatePropertyAPI(id,reqBody,reqHeader)
                if(result.status==200){
                    toast.success("Property details updated successfully")
                    handleClose()
                    fetchProperties()
                }
                else{
                    console.log(result.response.data);
                    
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }
  }

  const handleDeleteProperty = async(pid)=>{
    const token = sessionStorage.getItem("token")

    if(token){
        const reqHeader = {
           
            "Authorization":`Bearer ${token}`
        }

        // const reqBody = JSON.stringify(pid)

        try{
            const result = await deletePropertyAPI(pid,reqHeader)
            if(result.status==200){
                toast.success("Property deleted successfully")
                fetchProperties()
            }
            else{
                console.log(result.response.data);
                
            }
        }catch(err){
            console.log(err);
            
        }
    }
  }

  useEffect(()=>{
    fetchProperties()
  },[])

  return (
    <>
      <h1>My Listings</h1>

      <div className="row">
        <div className="col-12 pe-3">
            { userProperties?.map((property)=>(
                <div className="container card shadow  p-3  mb-2">
                    <div className='d-flex '>
                        <div className="d-flex me-5">
                            <img width={"200px"} height={"200px"} src={`${server_url}/Uploads/${property?.propertyImages[0]}`} alt="" />
                        </div>
                        <div className="d-flex flex-column">
                            <h3>{property?.title}</h3>
                            <p>{property?.description.slice(0,30)}</p>
                            <div className="d-flex flex-row p-2">
                                <button className='btn disabled me-2' ><i class="fa-solid fa-bed fa-lg" style={{color: "#000000"}}></i> {property?.bed}</button>
                                <button className='btn disabled me-2'><i class="fa-solid fa-bath fa-lg" style={{color: "#000000"}}></i> {property?.bath}</button>
                                <button className='btn disabled me-2'><i class="fa-solid fa-paw fa-lg" style={{color: "#000000"}}></i> Pets: {property?.pets}</button>
                                <button className='btn disabled '>Type: {property?.property}</button>
                            </div>
                            <p className='me-2'><i class="fa-solid fa-location-dot fa-sm" style={{color: "#000000"}}></i> {property?.city}</p>
                            <p>₹ {property?.price}</p>
                            {property?.isRented && (
                                <p><span style={{fontWeight:'bold'}}>Rented by:</span> {property?.rentedBy?.name}</p>
                            )

                            }
                        </div>
                    </div>

                    <div className='d-flex flex-row-reverse '>
                        <div className="d-flex flex-row me-0">
                            
                                {!property?.isRented  && (
                                    <>
                                    <button className='btn me-3 ' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} onClick={()=>handleShow(property?._id)}><i class="fa-solid fa-pen fa-lg" style={{color: "#000000"}}></i></button>
                                    <button className='btn ' style={{height:'35px'}} onClick={()=>handleDeleteProperty(property?._id)}><i class="fa-solid fa-trash-can fa-lg" style={{color: "#ff0000"}}></i></button>
                                    </>
                                )

                                }
                           
                        </div>
                    </div>
      
                </div>
            ))

            }
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="parent">
            <div class="div1">
                <label htmlFor="">Title:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, title: e.target.value })} value={selectedProperty?.title}/>
            </div>
            <div class="div2">
                <label htmlFor="">Price:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, price: e.target.value })} value={selectedProperty?.price}/>
            </div>
            <div class="div3">
                <label htmlFor="">Address:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, address: e.target.value })} value={selectedProperty?.address}/>
            </div>
            <div class="div4">
                <label htmlFor="">Description:</label>
                <textarea name="" id="description" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, description: e.target.value })} value={selectedProperty?.description}></textarea>
            </div>
            <div class="div5">
                <label htmlFor="">City:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, city: e.target.value })} value={selectedProperty?.city}/>
            </div>
            <div class="div6">
                <label htmlFor="">Bedroom no:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, bed: e.target.value })} value={selectedProperty?.bed}/>
            </div>
            <div class="div7">
                <label htmlFor="">Bathroom no:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, bath: e.target.value })} value={selectedProperty?.bath}/>
            </div>
            <div class="div8">
                <label htmlFor="">Latitude:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, lat: e.target.value })} value={selectedProperty?.lat}/>
            </div>
            <div class="div9">
                <label htmlFor="">Longitude:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, long: e.target.value })} value={selectedProperty?.long}/>
            </div>
            <div class="div10">
                <label htmlFor="">Property:</label>
                <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedProperty({ ...selectedProperty, property: e.target.value })} value={selectedProperty?.property}>
                    <option selected value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                </select>
            </div>
            <div class="div11">
                <label htmlFor="">Pets:</label>
                <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedProperty({ ...selectedProperty, pets: e.target.value })} value={selectedProperty?.pets}>
                    <option selected value="Allowed">Allowed</option>
                    <option value="Not allowed">Not allowed</option>
                    
                </select>
            </div>
            <div class="div12">
                <label htmlFor="">Phone:</label>
                <input type="text" className='form-control' onChange={(e) => setSelectedProperty({ ...selectedProperty, phone: e.target.value })} value={selectedProperty?.phone}/>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProperty}>Update</Button>
        </Modal.Footer>
      </Modal>



      <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default MyListings

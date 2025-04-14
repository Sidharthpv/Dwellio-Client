import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Button, Card } from 'react-bootstrap'
import { addBookmarkAPI, getHomePropertiesAPI, getUserInfoAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function TenantHome() {

  const[homeProperties,setHomeProperties] = useState([])

  const navigate = useNavigate()

  const fetchHomeProperties = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      try{
        const result = await getHomePropertiesAPI(reqHeader)
        if(result.status==200){
          console.log(result.data);
          setHomeProperties(result.data)
        }
      }catch(err){
        console.log(err);
        
      }
    }
  }

  const handleAddBookmark = async(pid)=>{
      const name = sessionStorage.getItem("name")
      const result = await getUserInfoAPI(name)
      
      if(result.status==200){
        const userId = result.data[0]._id
  
        const reqBody = new FormData()
        reqBody.append("userId",userId)
        reqBody.append("propertyId",pid)
  
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
  
          try{
            const result = await addBookmarkAPI(reqBody,reqHeader)
            if(result.status==200){
              toast.success("Bookmarked")
            }
            else{
              toast.warning("Error bookmarking")
            }
          }catch(err){
            console.log(err);
            
          }
        }
  
        
      }
    }

  useEffect(()=>{
    fetchHomeProperties()
  },[])


  return (
    <>
      <Header/>
      <div className="container banner">
        <img width={"1525px"} src="./src/assets/homeWall.jpg" alt="" style={{objectFit:'fill'}}/>
        <div >
            <h1 style={{fontSize:'60px',color:'white',fontWeight:'700'}}>Find Where Your <br /> Heart Will Dwell</h1>
        </div>
      </div>

      <div className="row" style={{paddingLeft:'130px',paddingRight:'130px'}}>
        {/* <div className="col-1"></div> */}
        <div className="col-12" style={{backgroundColor:'var(--Palette-1)',paddingTop:'30px',paddingBottom:'30px'}}>
            <div className="d-flex flex-row justify-content-around">
              {homeProperties?.map((property)=>(
                  <Card className='me-3 display-card'>
                    <Card.Img height={"200px"} variant="top" src={`${server_url}/Uploads/${property?.propertyImages?.[0]}`} />
                    <Card.Body>
                        <Card.Title>{property.title}</Card.Title>
                        <Card.Text style={{fontSize:'13px'}}>
                          {property.description}
                        </Card.Text>
                        
                    </Card.Body>
                    <div className="d-flex flex-row p-2">
                      <button className='btn disabled flex-grow-1' ><i class="fa-solid fa-bed fa-lg" style={{color: "#000000"}}></i> {property.bed}</button>
                      <button className='btn disabled flex-grow-1'><i class="fa-solid fa-bath fa-lg" style={{color: "#000000"}}></i> {property.bath}</button>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p style={{color:'black',fontSize:'18px',fontWeight:'bold'}} className='ms-2'>₹ {property.price}</p>
                      <p className='me-2'><i class="fa-solid fa-location-dot fa-sm" style={{color: "#000000"}}></i> {property?.city}</p>
                    </div>
                    <div className="d-flex flex-row ">
                    {property?.isRented == false ? (
                      <>
                        <button className='btn flex-grow-1' style={{backgroundColor:'var(--Palette-4)'}} onClick={()=>navigate(`/view/${property?._id}`)}>View details</button>
                        <button className='btn flex-grow-1' onClick={()=>handleAddBookmark(property?._id)}><i class="fa-solid fa-bookmark fa-xl" style={{color: "#000000"}}></i></button>
                      </>
                    ) : (
                      <button className='btn btn-danger disabled w-100'>Not Available</button>
                    )

                    }
                    </div>
                  </Card>
              ))

              }
           
            </div>
        </div>
        {/* <div className="col-1"></div> */}
      </div>

      <Footer/>


            <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default TenantHome

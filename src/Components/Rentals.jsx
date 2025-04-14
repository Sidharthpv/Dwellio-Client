import React, { useEffect, useState } from 'react'
import { getUserRentedPropertiesAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import { Link } from 'react-router-dom'

function Rentals() {

    const[rentedProperties,setRentedProperties] = useState([])

    const fetchUserRentedProperties = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

            try{
                const result = await getUserRentedPropertiesAPI(reqHeader)
                console.log(result);
                if(result.status==200){
                    setRentedProperties(result.data)
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    useEffect(()=>{
        fetchUserRentedProperties()
    },[])


  return (
    <>
      <h2>Rental Listings</h2>

        <div className="row">
            <div className="col-12 pe-3">
                {rentedProperties?.map((property)=>(
                    <div className="container card shadow  p-3  mb-2">
                        <div className='d-flex '>
                            <div className="d-flex me-5">
                                <img width={"200px"} height={"200px"} src={`${server_url}/Uploads/${property?.propertyImages[0]}`} alt="" />
                            </div>
                            <div className="d-flex flex-column">
                                <Link to={`/view/${property?._id}`} style={{textDecoration:'none',color:'black'}}>
                                    <h3>{property?.title}</h3>
                                </Link>
                                <p>{property?.description.slice(0,20)}</p>
                                <div className="d-flex flex-row p-2">
                                    <button className='btn disabled me-2' ><i class="fa-solid fa-bed fa-lg" style={{color: "#000000"}}></i> {property?.bed}</button>
                                    <button className='btn disabled me-2'><i class="fa-solid fa-bath fa-lg" style={{color: "#000000"}}></i> {property?.bath}</button>
                                    <button className='btn disabled me-2'><i class="fa-solid fa-paw fa-lg" style={{color: "#000000"}}></i> Pets: {property?.pets}</button>
                                    <button className='btn disabled '>Type: {property?.property}</button>
                                </div>
                                <p className='me-2'><i class="fa-solid fa-location-dot fa-sm" style={{color: "#000000"}}></i> {property?.city}</p>
                                <p>₹ {property?.price}</p>
                                <p><span style={{fontWeight:'bold'}}>Owned by:</span> {property?.ownerId?.name}</p>
                                
                            </div>
                        </div>

                        {/* <div className='d-flex flex-row-reverse '>
                            <div className="d-flex flex-row me-0">
                                
                                    {!property?.isRented  && (
                                        <>
                                        <button className='btn me-3 ' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} onClick={()=>handleShow(property?._id)}><i class="fa-solid fa-pen fa-lg" style={{color: "#000000"}}></i></button>
                                        <button className='btn ' style={{height:'35px'}} onClick={()=>handleDeleteProperty(property?._id)}><i class="fa-solid fa-trash-can fa-lg" style={{color: "#ff0000"}}></i></button>
                                        </>
                                    )

                                    }
                                
                            </div>
                        </div> */}
        
                    </div>
                )
                )}
            </div>
        </div>
    </>
  )
}

export default Rentals

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllPropertiesAPI } from '../services/allAPI';
import { server_url } from '../services/serverurl';

function Properties() {

    const[properties,setProperties] = useState([])

    const fetchAllProperties = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

            try{
                const result = await getAllPropertiesAPI(reqHeader)
                console.log(result.data);
                if(result.status == 200){
                    setProperties(result.data)
                }
                
            }catch(err){
                console.log(err);
                
            }
        }
    }

    useEffect(()=>{
      fetchAllProperties()
    },[])


  return (
    <div style={{backgroundColor:'#124559',height:'100vh',margin:'0',paddingTop:'20px'}}>
      <h1 className='text-light ms-4'>All Properties</h1>


      <div className="row ">
        <div className="col-2"></div>
        <div className="col-8 container d-flex flex-row justify-content-evenly">
        {properties.map((property)=>(
          <Card style={{ width: '18rem',backgroundColor:'#598392' }}>
            <Card.Img variant="top" src={`${server_url}/Uploads/${property?.propertyImages?.[0]}`} />
            <Card.Body>
              <Card.Title style={{fontWeight:'bold'}}>{property.title}</Card.Title>
              <Card.Text style={{fontSize:'13px'}}>
                {property.description}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
              <div className="d-flex flex-row p-2">
                <button className='btn disabled flex-grow-1' ><i class="fa-solid fa-bed fa-lg" style={{color: "#000000"}}></i> {property.bed}</button>
                <button className='btn disabled flex-grow-1'><i class="fa-solid fa-bath fa-lg" style={{color: "#000000"}}></i> {property.bath}</button>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <p style={{color:'black',fontSize:'18px',fontWeight:'bold'}} className='ms-2'>₹ {property.price}</p>
                <p className='me-2'><i class="fa-solid fa-location-dot fa-sm" style={{color: "#000000"}}></i> {property?.city}</p>
              </div>
          </Card>
          )
        )}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Properties

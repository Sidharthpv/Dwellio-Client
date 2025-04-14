import React, { useState } from 'react'
import Header from '../Components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addPropertyAPI } from '../services/allAPI';

function CreateListing() {

    const[propertyData,setPropertyData] = useState({
        title:"", price:"", address:"", description:"", city:"", bed:"", bath:"", lat:"", long:"", property:"", pets:"", phone:"", propertyImages:[]
    })

    const[previews,setPreviews] = useState()
    

    const handleImageChange = (e)=>{
        const files = e.target.files

        if (files) {
            
            const imageArray = Array.from(files);
            setPreviews(Array.from(files).map((file) => URL.createObjectURL(file)))
            setPropertyData({...propertyData,propertyImages:imageArray})
        }
    }

    const handleCreate = async()=>{
        console.log(propertyData);
        
        const{title,price,address,description,city,bed,bath,lat,long,property,pets,phone,propertyImages} = propertyData

        if(!title || !price || !address || !description || !city || !bed || !bath || !lat || !long || !property || !pets || !phone || !propertyImages){
            toast.warning("Please fill the missing fields")
        }
        else{
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
            propertyImages.forEach((image) => {
                reqBody.append("propertyImages", image);
            });

            const token = sessionStorage.getItem("token")

            if(token){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }

                try{
                    const result = await addPropertyAPI(reqBody,reqHeader)
                    console.log(result);
                    
                    if(result.status==200){
                        toast.success("Property added successfully")
                        setPropertyData({
                            title:"", price:"", address:"", description:"", city:"", bed:"", bath:"", lat:"", long:"", property:"", pets:"", phone:"", propertyImages:[]
                        })
                        setPreviews([])
                    }
                    else{
                        toast.warning(result.response.data)
                    }
                }catch(err){
                    console.log(err);
                    
                }
            }
        }
    }


  return (
    <>
      <Header/>
      <div className="row" style={{backgroundImage:'url(./src/assets/createListing.jpg)',backgroundSize:'cover',backgroundRepeat:'no-repeat',height:'1300px'}}>
        <div className="col-1"></div>
        <div className="col-10">
            <div className="container rounded create-box p-3">
                <h3 className='text-center fw-bold mb-3'>Add New Dwelling</h3>
                <div class="parent">
                    <div class="div1">
                        <label htmlFor="">Title:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,title:e.target.value})} value={propertyData.title}/>
                    </div>
                    <div class="div2">
                        <label htmlFor="">Price:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,price:e.target.value})} value={propertyData.price}/>
                    </div>
                    <div class="div3">
                        <label htmlFor="">Address:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,address:e.target.value})} value={propertyData.address}/>
                    </div>
                    <div class="div4">
                        <label htmlFor="">Description:</label>
                        <textarea name="" id="description" className='form-control' onChange={e=>setPropertyData({...propertyData,description:e.target.value})} value={propertyData.description}></textarea>
                    </div>
                    <div class="div5">
                        <label htmlFor="">City:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,city:e.target.value})} value={propertyData.city}/>
                    </div>
                    <div class="div6">
                        <label htmlFor="">Bedroom no:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,bed:e.target.value})} value={propertyData.bed}/>
                    </div>
                    <div class="div7">
                        <label htmlFor="">Bathroom no:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,bath:e.target.value})} value={propertyData.bath}/>
                    </div>
                    <div class="div8">
                        <label htmlFor="">Latitude:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,lat:e.target.value})} value={propertyData.lat}/>
                    </div>
                    <div class="div9">
                        <label htmlFor="">Longitude:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,long:e.target.value})} value={propertyData.long}/>
                    </div>
                    <div class="div10">
                        <label htmlFor="">Property:</label>
                        <select class="form-select" aria-label="Default select example" onChange={e=>setPropertyData({...propertyData,property:e.target.value})} value={propertyData.property}>
                            <option value="">Select Property Type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Villa">Villa</option>
                        </select>
                    </div>
                    <div class="div11">
                        <label htmlFor="">Pets:</label>
                        <select class="form-select" aria-label="Default select example" onChange={e=>setPropertyData({...propertyData,pets:e.target.value})} value={propertyData.pets}>
                            <option value="">Select Pet Policy</option>
                            <option value="Allowed">Allowed</option>
                            <option value="Not allowed">Not allowed</option>
                            
                        </select>
                    </div>
                    <div class="div12">
                        <label htmlFor="">Phone:</label>
                        <input type="text" className='form-control' onChange={e=>setPropertyData({...propertyData,phone:e.target.value})} value={propertyData.phone}/>
                    </div>
                </div>

                <div className="container d-flex flex-row p-4 justify-content-evenly" style={{backgroundColor:'white'}}>
                    {previews?.length>0 ? (
                        previews.map((image)=>{
                            return(
                                <img src={image} height={"100px"} width={"100%"} alt="" className='m-2'/>
                            )
                        })
                    ) : (
                        <label className='mb-3'>
                            <input type="file" style={{display:'none'}} multiple onChange={handleImageChange}/>
                            <img height={"100px"} width={"100%"} src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" alt="" />
                        </label>
                    )

                    }
                    

                    
                </div>

                <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-warning w-25 rounded' onClick={handleCreate}>Create</button>
                </div>
            </div>
        </div>
        <div className="col-1"></div>
      </div>


      <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default CreateListing

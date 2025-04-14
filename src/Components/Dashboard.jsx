import React, { useEffect, useState } from 'react'
import { getAllPropertiesAPI, getAllUsersAPI } from '../services/allAPI'

function Dashboard() {

    const[users,setUsers] = useState([])
    const[revenue,setRevenue] = useState([])
    const[properties,setProperties] = useState([])

    const fetchAllUsers = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            try{
                const result = await getAllUsersAPI(reqHeader)
                console.log("the result is ",result);
                
                console.log("the all users data and revenue are ",result.data);
                if(result.status==200){
                    setUsers(result.data.users)
                    setRevenue(result.data.revenue[0])
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

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
        fetchAllUsers()
        fetchAllProperties()
    },[])


  return (
    <div style={{backgroundColor:'#124559',height:'100vh',margin:'0'}}>
      <h1 className='text-light ms-4'>Welcome Admin</h1>

      <div className="row d-flex mt-5">
        <div className="col-4"></div>
        <div className="col-4 d-flex flex-row justify-content-around">
            <div className="d-flex flex-column">
                <h3 className='text-light text-center' style={{fontSize:'55px',fontWeight:'bold'}}>{users.length}</h3>
                <h4 className='text-light text-center' style={{fontSize:'25px'}}>Users</h4>

            </div>
            <div className="d-flex flex-column">
                <h3 className='text-light text-center' style={{fontSize:'55px',fontWeight:'bold'}}>{properties.length}</h3>
                <h4 className='text-light text-center'>Properties</h4>
            </div>
            <div className="d-flex flex-column">
                <h3 className='text-light text-center' style={{fontSize:'55px',fontWeight:'bold'}}>₹{revenue.totalRevenue}</h3>
                <h4 className='text-light text-center'>Revenue</h4>
            </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  )
}

export default Dashboard

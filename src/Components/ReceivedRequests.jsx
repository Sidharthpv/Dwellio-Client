import React, { useEffect, useState } from 'react'
import { acceptRequestAPI, getReceivedRequestsAPI, rejectRequestAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ReceivedRequests() {

    const[receivedRequests,setReceivedRequests] = useState([])

    const fetchReceivedrequests = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

            try{
                const result = await getReceivedRequestsAPI(reqHeader)
                console.log(result);
                
                if(result.status==200){
                    setReceivedRequests(result.data)
                    // console.log(receivedRequests);
                    
                }
                else{
                    console.log(result.response.data);
                    
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    const handleAcceptRequest = async(requestId)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            // const reqBody = JSON.stringify(requestId)

            const reqBody = new FormData()
            reqBody.append("requestId",requestId)
            try{
                const result = await acceptRequestAPI(reqBody,reqHeader)
                if(result.status==200){
                    toast.success("Request Accepted")
                    fetchReceivedrequests()
                }
                else{
                    toast.warning("Error accepting request")
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    const handleRejectRequest = async(requestId)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            const reqBody = JSON.stringify(requestId)
            try{
                const result = await rejectRequestAPI(reqBody,reqHeader)
                if(result.status==200){
                    toast.success("Request Rejected")
                    fetchReceivedrequests()
                }
                else{
                    toast.warning("Error rejecting request")
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    useEffect(()=>{
        fetchReceivedrequests()
    },[])

  return (
    <>
      {receivedRequests.length>0 ? (
        <h2>New Requests</h2>
      ) : (
        <h2>No New Requests</h2>
      )}

      <div className="row">
        <div className="col-12 pe-3">
            {receivedRequests.map((request)=>(
                <div className="container card shadow  p-3  mb-2">
                    <div className='d-flex '>
                        <div className="d-flex me-5">
                            <img width={"200px"} height={"200px"} src={`${server_url}/Uploads/${request?.propertyId?.propertyImages?.[0]}`} alt="" />
                        </div>
                        <div className="d-flex flex-column">
                            <h3>{request?.propertyId?.title}</h3>
                            <p>{request?.propertyId?.description}</p>
                            <p className='me-2'><i class="fa-solid fa-location-dot fa-sm" style={{color: "#000000"}}></i> {request?.propertyId?.city}</p>
                            <p>₹ {request?.propertyId?.price}</p>
                            <p><span style={{fontWeight:'bold'}}>Requested By:</span> {request?.renterId?.name}</p>
                        </div>
                    </div>

                    <div className='d-flex flex-row-reverse '>
                        <div className="d-flex flex-row me-0">
                            {request?.status === "Pending" && (
                                <>
                                    <button className='btn me-3 ' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} onClick={()=>handleAcceptRequest(request?._id)}>Accept</button>
                                    <button className='btn btn-danger' style={{height:'35px'}} onClick={()=>handleRejectRequest(request?._id)}>Reject</button>
                                </>
                            )}
                            {request?.status === "Approved" && (
                                <>
                                    <button className='btn me-3 disabled' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} >Accepted</button>
                                </>
                            )}
                            {request?.status === "Rejected" && (
                                <>
                                    <button className='btn btn-danger disabled' style={{height:'35px'}} >Rejected</button>
                                </>
                            )}
                            
                        </div>
                    </div>
      
                </div>
                ))
            }
        </div>
      </div>    


                  <ToastContainer theme="colored" autoClose={3000} />
        
    </>
  )
}

export default ReceivedRequests

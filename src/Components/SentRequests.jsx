import React, { useEffect, useState } from 'react'
import { completeRentingAPI, getSentRequestsAPI, initiatePaymentAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { server_url } from '../services/serverurl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SentRequests() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (pid,oid,rid,total) => {
        setSelectedRequest({propertyId:pid,ownerId:oid,renterId:rid,totalAmount:total})
        setShow(true);
    }

  const[sentRequests,setSentRequests] = useState([])
  const[selectedRequest,setSelectedRequest] = useState({
    propertyId:"",ownerId:"",renterId:"",totalAmount:""
  })

  const[rentPeriod,setRentPeriod] = useState('')

  const fetchSentRequests = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
        const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        }

        try{
            const result = await getSentRequestsAPI(reqHeader)
            console.log(result);
            
            if(result.status==200){
              setSentRequests(result.data)
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

  const completeRenting = async(adminFee)=>{
    const {propertyId,ownerId,renterId,totalAmount} = selectedRequest
    
    const token = sessionStorage.getItem("token")
    if(token){
        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

        const reqBody = JSON.stringify({propertyId,ownerId,renterId,totalAmount,adminFee,rentPeriod})
        // const reqBody = new FormData()
        // reqBody.append("propertyId",propertyId)
        // reqBody.append("ownerId",ownerId)
        // reqBody.append("renterId",renterId)
        // reqBody.append("totalAmount",totalAmount)
        // reqBody.append("admFee",admFee)
        // reqBody.append("rentPeriod",rentPeriod)

        // const completeData = {propertyId: propertyId,renterId: renterId, adminFee:admFee}

        try{
            const paymentResult = await initiatePaymentAPI(reqBody,reqHeader)
            console.log(paymentResult);
            
            if(paymentResult.status==200){
                const rentCompletedResult = await completeRentingAPI(reqBody,reqHeader)
                console.log(rentCompletedResult);
                
                if(rentCompletedResult.status==200){
                    toast.success("Property rented")
                    handleClose()
                    fetchSentRequests()
                }
                else{
                    toast.warning("Error completing the renting process")
                }
            }
            else{
                toast.warning("Error completing the payment")
            }
        }catch(err){
            console.log(err);
            
        }
    }
  }


  useEffect(()=>{
    fetchSentRequests()
  },[])

  return (
    <>
      <h2>Requests Sent</h2>

      <div className="row">
        <div className="col-12 pe-3">
            {sentRequests.map((request)=>(
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
                            <p><span style={{fontWeight:'bold'}}>Owned By:</span> {request?.ownerId?.name}</p>
                            <p><span style={{fontWeight:'bold'}}>Status:</span> {request?.status}</p>
                        </div>
                    </div>

                    <div className='d-flex flex-row-reverse '>
                        <div className="d-flex flex-row me-0">
                            {/* {request?.status === "Pending" && (
                                <>
                                    <button className='btn me-3 ' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} onClick={()=>handleAcceptRequest(request?._id)}>Accept</button>
                                    <button className='btn btn-danger' style={{height:'35px'}} onClick={()=>handleRejectRequest(request?._id)}>Reject</button>
                                </>
                            )} */}
                            {request?.status === "Approved" && (
                                <>
                                    {request?.propertyId?.isRented == true ? (
                                        <button className='btn me-3 disabled' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} >Rented</button>
                                    ) : (
                                        <button className='btn me-3 ' style={{backgroundColor:'var(--Palette-4)',height:'35px'}} onClick={()=>handleShow(request?.propertyId?._id,request?.ownerId?._id,request?.renterId,request?.propertyId?.price)}>Proceed to rent</button>
                                    )

                                    }
                                </>
                            )}
                            {/* {request?.status === "Rejected" && (
                                <>
                                    <button className='btn btn-danger disabled' style={{height:'35px'}} >Rejected</button>
                                </>
                            )} */}
                            
                        </div>
                    </div>
      
                </div>
                )
             )}
        </div>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
            <div className="d-flex justify-content-center mb-4">
                <input type="text" placeholder='Enter period of rent' className='form-control w-25' onChange={e=>setRentPeriod(e.target.value)}/>
            </div>
          <p className='text-center'>Total Amount: {selectedRequest?.totalAmount}</p>
          <p className='text-center'>Admin fee: {(10/100)*selectedRequest?.totalAmount}</p>
          <p >An amount of <span style={{fontWeight:'bold'}}>₹{(10/100)*selectedRequest?.totalAmount}</span> will be deducted from the <span style={{fontWeight:'bold'}}>₹{selectedRequest?.totalAmount}</span> as platform fee and the remaining will be credited to the owner.</p>
            <div className="d-flex flex-row justify-content-center mt-5">
                <button className='btn btn-danger me-3' onClick={handleClose}>Cancel</button>
                <button className='btn' style={{backgroundColor:'var(--Palette-4)'}} onClick={()=>completeRenting((10/100)*selectedRequest?.totalAmount)}>Confirm</button>
            </div>

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>



        <ToastContainer theme="colored" autoClose={3000} />
       
    </>
  )
}

export default SentRequests

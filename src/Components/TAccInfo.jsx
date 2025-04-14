import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { getUserInfoAPI, updateUserInfoAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function TAccInfo() {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUserData({ id: '', name: '', phone: '', email: '' }); // Reset userData
    setShow(false); // Close the modal
  };

  const handleShow = () => {
    if (userInfo.length > 0) {
      setUserData({
        id: userInfo[0]._id,
        name: userInfo[0].name,
        phone: userInfo[0].phone,
        email: userInfo[0].email,
      });
      setShow(true);
    } else {
      toast.warning("User information is not available yet.");
    }
  };

  const[userInfo,setUserInfo] = useState([])

  const[userData,setUserData] = useState({
    id:userInfo?._id, name:"", phone:"", email:""
  })


  const getUserInfo=async()=>{
    const name = sessionStorage.getItem("name")
    console.log(name);
    const result = await getUserInfoAPI(name)
    console.log(result);
    
    if(result.status==200){
      setUserInfo(result.data)
    }
  
  }


  const handleUpdate = async()=>{
    const {id,name,phone,email} = userData
    if(!name || !phone || !email){
      toast.warning("Please fill missing fields")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("name",name)
      reqBody.append("phone",phone)
      reqBody.append("email",email)

      const token = sessionStorage.getItem("token")

      if(token){
        const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
        }

        try{
          const result = await updateUserInfoAPI(id,reqBody,reqHeader)
          if(result.status==200){
            handleClose()
            getUserInfo()
          }
          else{
            toast.warning(result.response.data)
          }
        }
        catch(err){
          console.log(err);
          
        }
      }
    }
     
  }


  useEffect(()=>{
    getUserInfo()
  },[])

  return (
    <>
      <div className="container-fluid mt-3">
        <h2>Account Information</h2>
        <div className="card shadow">
            <div className="row">
                <div className="col-6 p-5">
                  {userInfo.length > 0 ? (
                    <>
                      <h5 className="mb-3"><span style={{fontWeight:'bold'}}>Name:</span> {userInfo[0].name}</h5>
                      <h5 className="mb-3"><span style={{fontWeight:'bold'}}>Phone:</span> {userInfo[0].phone}</h5>
                      <h5 className="mb-3"><span style={{fontWeight:'bold'}}>Email:</span> {userInfo[0].email}</h5>
                      <button className='btn mt-5' style={{backgroundColor:'var(--Palette-4)'}} onClick={handleShow}><i class="fa-solid fa-pen fa-sm" style={{color: "#000000"}}></i> Edit</button>
                    </>
                  ) : (
                    <p>Loading user information...</p>
                  )}
                </div>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  size='lg'
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Info</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-6">
                        { userInfo.length>0?(
                          <>
                            <label htmlFor="">Name:</label>
                            <input type="text" className='form-control' value={userData.name} onChange={e=>setUserData({...userData,name:e.target.value})}/>

                            <label htmlFor="">Phone:</label>
                            <input type="text" className='form-control' value={userData.phone} onChange={e=>setUserData({...userData,phone:e.target.value})}/>

                            <label htmlFor="">Email:</label>
                            <input type="email" className='form-control' value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
                          </>
                        ) : <p>loading user info</p>

                        }
                      </div>
                      <div className="col-6 text-center">
                        {/* <label className='mb-3'>
                          <p>choose a profile photo</p>
                          <input type="file" style={{display:'none'}} />
                          <img height={"200px"} width={"100%"} src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" alt="" />
                        </label> */}
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Submit</Button>
                  </Modal.Footer>
                </Modal>

                <div className="col-6 ">
                    <img width={"300px"} height={"300px"} src="./src/assets/dp.jpg" alt="" />
                </div>
            </div>
        </div>
      </div>


      <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default TAccInfo

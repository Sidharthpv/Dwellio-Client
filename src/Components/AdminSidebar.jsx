import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminSidebar({setSelectedComponent}) {

  const navigate = useNavigate()

  const logout = ()=>{
    sessionStorage.removeItem("name")
    sessionStorage.removeItem("token")
    navigate('/')
  }

  return (
    <>
       <div class="container-fluid">
    <div class="row" style={{Height:'100%'}}>
       {/* Sidebar  */}
      <nav class="col  sidebar py-4" style={{backgroundColor:'#01161E',height:'800px'}}>
        <ul class="nav flex-column justify-content-center align-items-center">
          <li className='mt-4'>
            <p  onClick={() => setSelectedComponent('Dashboard')} style={{ cursor: 'pointer',color:'white' }}>Dashboard</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Users')} style={{ cursor: 'pointer',color:'white' }}>Users</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Properties')} style={{ cursor: 'pointer',color:'white' }}>Properties</p>
          </li>
          {/* <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Requests Received')} style={{ cursor: 'pointer' }}>Requests Received</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Requests Sent')} style={{ cursor: 'pointer' }}>Requests Sent</p>
          </li> */}
          <li className='mt-3'>
            <button className='btn' onClick={logout}><i class="fa-solid fa-power-off fa-xl" style={{color: "white"}}></i></button>
          </li>
         
        </ul>
      </nav>
      </div>
      </div>
    </>
  )
}

export default AdminSidebar

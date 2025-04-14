import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar({ setSelectedComponent }) {

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
      <nav class="col  sidebar py-4" style={{backgroundColor:'var(--Palette-6)',height:'700px'}}>
        <ul class="nav flex-column justify-content-center align-items-center">
          <li className='mt-4'>
            <p  onClick={() => setSelectedComponent('Account')} style={{ cursor: 'pointer' }}>Account</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Rentals')} style={{ cursor: 'pointer' }}>Rentals</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Posts')} style={{ cursor: 'pointer' }}>Posts</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Requests Received')} style={{ cursor: 'pointer' }}>Requests Received</p>
          </li>
          <li className='mt-3'>
            <p  onClick={() => setSelectedComponent('Requests Sent')} style={{ cursor: 'pointer' }}>Requests Sent</p>
          </li>
          <li className='mt-3'>
            <button className='btn' onClick={logout}><i class="fa-solid fa-power-off fa-xl" style={{color: "#000000"}}></i></button>
          </li>
         
        </ul>
      </nav>
      </div>
      </div>
    </>
  )
}

export default Sidebar

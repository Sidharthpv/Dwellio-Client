import { styled } from '@mui/material'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()

  return (
    <>
      <div className="row pt-3 pb-3 ">
        {/* <div className="col-1"></div> */}
        <div className="col-12">
          <div className="container d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Link to={'/tenant-home'} style={{textDecoration:'none',color:'black'}}>
                <h3>Dwellio</h3>
              </Link>
            </div>
            <div className="d-flex flex-row">
            <button className='btn me-3' onClick={()=>navigate('/tenant-home')}>Home</button>
            <button className='btn me-3' onClick={()=>navigate('/tlistings')}>Listing</button>
            <button className='btn' onClick={()=>navigate('/create-listing')}>Create</button>
            </div>
            <div className="d-flex flex-row header-button">
              <button className='btn me-3' onClick={()=>navigate('/bookmarks')}><i class="fa-solid fa-bookmark fa-lg" style={{color: "#000000"}}></i> Bookmarks</button>
              <button className='btn ' onClick={()=>navigate('/tprofile')}><i class="fa-regular fa-user fa-lg" style={{color: "#000000"}}></i> Profile</button>
            </div>
          </div>
        </div>
        {/* <div className="col-1"></div> */}
      </div>
    </>
  )
}

export default Header

import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import TenantHome from './Pages/TenantHome'
import TProfile from './Pages/TProfile'
import TListings from './Pages/TListings'
import CreateListing from './Pages/CreateListing'
import SingleProperty from './Pages/SingleProperty'
import Bookmarks from './Pages/Bookmarks'
import AdminDashboard from './Pages/AdminDashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/tenant-home' element={<TenantHome/>}/>
        <Route path='/tprofile' element={<TProfile/>}/>
        <Route path='/tlistings' element={<TListings/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/view/:id' element={<SingleProperty/>}/>
        <Route path='/bookmarks' element={<Bookmarks/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default App

import React, { useState } from 'react'
import Dashboard from '../Components/Dashboard';
import Users from '../Components/Users';
import Properties from '../Components/Properties';
import Sidebar from '../Components/Sidebar';
import AdminSidebar from '../Components/AdminSidebar';

function AdminDashboard() {

    const [selectedComponent, setSelectedComponent] = useState('Dashboard');

    const renderContent = () => {
        switch (selectedComponent) {
          case 'Dashboard':
            return <Dashboard/>; 
          case 'Users':
            return <Users/> 
          case 'Properties':
            return <Properties/>; 
          default:
            return <h2>Welcome to Your Profile</h2>;
        }
      };

    
  return (
    <>
      <div className="row">
        <div className="col-3 p-0">
            <AdminSidebar setSelectedComponent={setSelectedComponent}/>
        </div>
        <div className="col-9 p-0">
        {renderContent()}
        </div>
      </div>
    </>
  )
}

export default AdminDashboard

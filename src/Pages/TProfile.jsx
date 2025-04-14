import React, { useState } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import TAccInfo from '../Components/TAccInfo';
import MyListings from '../Components/MyListings';
import ReceivedRequests from '../Components/ReceivedRequests';
import SentRequests from '../Components/SentRequests';
import Rentals from '../Components/Rentals';

function TProfile() {


const [selectedComponent, setSelectedComponent] = useState('Account');


const renderContent = () => {
  switch (selectedComponent) {
    case 'Account':
      return <TAccInfo/>; 
    case 'Rentals':
      return <Rentals/> 
    case 'Posts':
      return <MyListings/>; 
    case 'Requests Received':
      return <ReceivedRequests/>; 
    case 'Requests Sent':
      return <SentRequests/>; 
    default:
      return <h2>Welcome to Your Profile</h2>;
  }
};

  return (
    <>
      <Header/>
      <div className="row">
        <div className="col-3">
            <Sidebar setSelectedComponent={setSelectedComponent}/>
        </div>
        <div className="col-9">
        {renderContent()}
        </div>
      </div>
    </>
  )
}

export default TProfile

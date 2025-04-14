import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Header from '../Components/Header'
import { addBookmarkAPI, getAllPropertiesAPI, getUserInfoAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import { useNavigate } from 'react-router-dom'
import { addToBookmarkContext } from '../ContextAPI/AddToBookmark'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function TListings() {

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const { addBookmark } = useContext(addToBookmarkContext);

  const fetchProperties = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await getAllPropertiesAPI(reqHeader);
        if (result.status === 200) {
          setAllProperties(result.data);
          setFilteredProperties(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const filtered = allProperties.filter(property =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleFilter = () => {
    let filtered = [...allProperties];
    if (propertyType) {
      filtered = filtered.filter(property => property.property.toLowerCase() === propertyType.toLowerCase());
    }
    if (maxPrice) {
      filtered = filtered.filter(property => property.price <= maxPrice);
    }
    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPropertyType("");
    setMaxPrice("");
    setFilteredProperties(allProperties);
  };

  return (
    <>
      <Header />
      <h1 className='text-center mt-5'>Your Perfect Dwelling Awaits</h1>

      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 align-items-center text-center rounded" style={{ backgroundImage: 'url(./src/assets/listingBanner.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '300px' }}>
          <div className="container d-flex flex-row mt-5 justify-content-center align-items-center" style={{ paddingTop: '80px' }}>
            <i className="fa-solid fa-location-dot fa-lg p-3 pe-2 ms-3" style={{ color: "white" }}></i>
            <input type="text" placeholder='Enter a location' className='form-control rounded w-50' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button className='btn border border-1' style={{ backgroundColor: 'white' }} onClick={handleSearch}><i className="fa-solid fa-magnifying-glass" style={{ color: "#000000" }}></i></button>
          </div>

          <div className="container d-flex flex-row justify-content-center mt-3">
            <select className='form-select w-25 me-3' value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>
            <input type="number" className='form-control w-25' placeholder='Max Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            <button className='btn btn-primary ms-3' onClick={handleFilter}>Apply Filters</button>
            <button className='btn btn-secondary ms-3' onClick={clearFilters}>Clear Filters</button>
          </div>
        </div>
        <div className="col-1"></div>
      </div>

      <div className="row " style={{ marginTop: '150px' }}>
        <div className="col-2"></div>
        <div className="col-8 d-flex flex-wrap justify-content-center align-items-center p-3 rounded" style={{ backgroundColor: 'var(--Palette-3)' }}>
          {filteredProperties.map((property) => (
            <Card key={property._id} className='me-3 display-card'>
              <Card.Img height={"200px"} variant="top" src={`${server_url}/Uploads/${property?.propertyImages?.[0]}`} />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text style={{ fontSize: '13px' }}>{property.description}</Card.Text>
              </Card.Body>
              <div className="d-flex flex-row p-2">
                <button className='btn disabled flex-grow-1'><i className="fa-solid fa-bed fa-lg" style={{ color: "#000000" }}></i> {property.bed}</button>
                <button className='btn disabled flex-grow-1'><i className="fa-solid fa-bath fa-lg" style={{ color: "#000000" }}></i> {property.bath}</button>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }} className='ms-2'>₹ {property.price}</p>
                <p className='me-2'><i className="fa-solid fa-location-dot fa-sm" style={{ color: "#000000" }}></i> {property?.city}</p>
              </div>
              <div className="d-flex flex-row">
                {property?.isRented === false ? (
                  <>
                    <button className='btn flex-grow-1' style={{ backgroundColor: 'var(--Palette-4)' }} onClick={() => navigate(`/view/${property?._id}`)}>View details</button>
                    <button className='btn flex-grow-1' onClick={() => handleAddBookmark(property?._id)}><i className="fa-solid fa-bookmark fa-xl" style={{ color: "#000000" }}></i></button>
                  </>
                ) : (
                  <button className='btn btn-danger disabled w-100'>Not Available</button>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className="col-2"></div>
      </div>
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  );
}

export default TListings;

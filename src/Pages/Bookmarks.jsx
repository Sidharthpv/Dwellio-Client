import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
// import { addToBookmarkContext } from '../ContextAPI/AddToBookmark'
import { getBookmarksAPI, removeBookmarkAPI } from '../services/allAPI'
import { server_url } from '../services/serverurl'
import { Link } from 'react-router-dom'
Link
function Bookmarks() {

    // const {getUserBookmarks,propertyBookmarks} = useContext(addToBookmarkContext)
    const[userBookmarks,setUserBookmarks] = useState([])

    const fetchBookmarks = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

            try{
                const result = await getBookmarksAPI(reqHeader)
                if(result.status==200){
                    console.log(result.data);
                    setUserBookmarks(result.data)
                }
                else{
                    console.log("Error fetching bookmarks");
                    
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    const handleRemoveBookmark = async(userId,propertyId)=>{
        
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            const reqBody = JSON.stringify({ userId, propertyId });
            try{
                const result = await removeBookmarkAPI(reqBody,reqHeader)
                if(result.status==200){
                    console.log("bookmark removed successfully");
                    fetchBookmarks()
                }
                else{
                    console.log("error removing bookmark");
                    
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }


    useEffect(()=>{
        fetchBookmarks()
    },[])


  return (
    <>
      <Header/>

      <h3 className='text-center mt-5'><i class="fa-solid fa-bookmark fa-xl" style={{color: "#000000"}}></i> My Bookmarks</h3>

      <div className="row mt-5">
        <div className="col-2"></div>
        <div className="col-8">
            {userBookmarks.map((bookmark)=>(
                
                    <div className="container card shadow  p-3 me-3 mb-3">
                        <div className='d-flex '>
                            <div className="d-flex me-5">
                                <img width={"200px"} height={"200px"} src={`${server_url}/Uploads/${bookmark?.propertyId?.propertyImages?.[0]}`} alt="" />
                            </div>
                            <div className="d-flex flex-column">
                            <Link to={`/view/${bookmark?.propertyId?._id}`} style={{textDecoration:'none',color:'black'}}>
                                <h3>{bookmark?.propertyId?.title}</h3>
                            </Link>
                                <p>{bookmark?.propertyId?.description}</p>
                                <div className="d-flex flex-row p-2">
                                    <button className='btn disabled me-2' ><i class="fa-solid fa-bed fa-lg" style={{color: "#000000"}}></i> {bookmark?.propertyId?.bed}</button>
                                    <button className='btn disabled me-2'><i class="fa-solid fa-bath fa-lg" style={{color: "#000000"}}></i> {bookmark?.propertyId?.bath}</button>
                                    <button className='btn disabled me-2'><i class="fa-solid fa-paw fa-lg" style={{color: "#000000"}}></i> Pets: {bookmark?.propertyId?.pets}</button>
                                    <button className='btn disabled '>Type: {bookmark?.propertyId?.property}</button>
                                </div>
                                <p className='me-2'><i class="fa-solid fa-location-dot fa-sm" style={{color: "#000000"}}></i> {bookmark?.propertyId?.city}</p>
                                <p>₹ {bookmark?.propertyId?.price}</p>
                            </div>
                        </div>
        
                        <div className='d-flex flex-row-reverse '>
                            <div className="d-flex flex-row me-0">
                                <button className='btn ' style={{height:'35px'}} onClick={()=>handleRemoveBookmark(bookmark?.userId,bookmark?.propertyId)}><i class="fa-solid fa-trash-can fa-lg" style={{color: "#ff0000"}}></i></button>
                            </div>
                        </div>
            
                    </div>
                
            ))

            }
        </div>
        <div className="col-2"></div>
      </div>
    </>
  )
}

export default Bookmarks

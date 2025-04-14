import React, { createContext, useState } from 'react'
export const addToBookmarkContext = createContext()


function AddToBookmark({children}) {

    const[propertyBookmarks,setPropertyBookmarks] = useState({})

    const addBookmark = (userId, property) => {
        setPropertyBookmarks((prev) => ({
          ...prev,
          [userId]: [...(prev[userId] || []), property], // Add to specific user's bookmarks
        }));
    };
    
    const getUserBookmarks = (userId) => {
        return propertyBookmarks[userId] || []; // Return bookmarks for a specific user
    };

  return (
    <>
      <addToBookmarkContext.Provider value={{propertyBookmarks,addBookmark,getUserBookmarks}}>
        {children}
      </addToBookmarkContext.Provider>
    </>
  )
}

export default AddToBookmark

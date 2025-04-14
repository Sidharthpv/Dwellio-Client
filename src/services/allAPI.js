import { commonAPI } from "./commonAPI";
import { server_url } from "./serverurl";


//registerAPI
export const registerAPI=async(user)=>{
    return await commonAPI('POST',`${server_url}/register`,user,"")
}

//loginAPI
export const loginAPI=async(user)=>{
    return await commonAPI('POST',`${server_url}/login`,user,"")
}

//verifyOTPAPI
export const verifyOTPAPI=async(data)=>{
    try {
        const response = await commonAPI('POST', `${server_url}/verify-otp`, data, "");
        console.log("Raw API Response:", response); // Debugging
        return response;
    } catch (error) {
        console.log("Error in API Call:", error);
        return { status: 500, data: "Internal Server Error" }; // Handle errors gracefully
    }
}

//resendOTPAPI
export const resendOTPAPI = async (userId) => {
    try {
        const response = await commonAPI('POST', `${server_url}/resend-otp`,  {userId} , "");
        console.log("Resend OTP API Response:", response);
        return response;
    } catch (error) {
        console.log("Error in Resend OTP API:", error);
        return { status: 500, data: "Error resending OTP" };
    }
};

//getUserInfoAPI
export const getUserInfoAPI=async(name)=>{
    return await commonAPI('GET',`${server_url}/get-userInfo?name=${name}`,"","")
}

//updateUserInfoAPI
export const updateUserInfoAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/users/${id}/update`,reqBody,reqHeader)
}

//addPropertyAPI
export const addPropertyAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/addProperty`,reqBody,reqHeader)
}

//getAllPropertiesAPI
export const getAllPropertiesAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/getAllProperties`,"",reqHeader)
}

//getUserPropertiesAPI
export const getUserPropertiesAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/getUserProperties`,"",reqHeader)
}

//getAPropertyAPI
export const getAPropertyAPI=async(id,reqHeader)=>{
    return await commonAPI('GET',`${server_url}/viewAProperty/${id}`,"",reqHeader)
}

//updatePropertyAPI
export const updatePropertyAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/properties/${id}/update`,reqBody,reqHeader)
}

//deletePropertyAPI
export const deletePropertyAPI=async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${server_url}/properties/${id}/delete`,"",reqHeader)
}

//addBookmarkAPI
export const addBookmarkAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/addBookmark`,reqBody,reqHeader)
}

//getBookmarksAPI
export const getBookmarksAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/bookmarks`,"",reqHeader)
}

//removeBookmarkAPI
export const removeBookmarkAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('DELETE',`${server_url}/bookmarks/remove`,reqBody,reqHeader)
}

//getHomePropertiesAPI
export const getHomePropertiesAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/homeProperties`,"",reqHeader)
}

//sendRequestAPI
export const sendRequestAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/sendRequest`,reqBody,reqHeader)
}

//getReceivedRequestsAPI
export const getReceivedRequestsAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/getReceivedRequests`,"",reqHeader)
}

//getSentRequestsAPI
export const getSentRequestsAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/getSentRequests`,"",reqHeader)
}

//acceptRequestAPI
export const acceptRequestAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/acceptRequest`,reqBody,reqHeader)
}

//rejectRequestAPI
export const rejectRequestAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/rejectRequest`,reqBody,reqHeader)
}

// //deleteRequestAPI
// export const deleteRequestAPI=async(reqBody,reqHeader)=>{
//     return await commonAPI('DELETE',`${server_url}/deleteRequest`,reqBody,reqHeader)
// }

//initiatePaymentAPI
export const initiatePaymentAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/initiatePayment`,reqBody,reqHeader)
}

//completeRentingAPI
export const completeRentingAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/completeRenting`,reqBody,reqHeader)
}

//getUserRentedPropertiesAPI
export const getUserRentedPropertiesAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/properties/userRented`,"",reqHeader)
}

//getAllUsersAPI
export const getAllUsersAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/getAllUsers`,"",reqHeader)
}
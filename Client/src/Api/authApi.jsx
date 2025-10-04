import api from "./axiosConfig";

export const authApi = {
 register: async (userData) => {
  try {
   const response = await api.post('/signUp',userData);
   return response.data
  } catch (error) {
   console.error("ERROR: ",error)
   throw error.response?.data || {message : "registration failed!"}
  }
 },
 login : async (userData) => {
  try {
    console.log(import.meta.env.VITE_API_BASE_URL)
   const response = await api.post('/login',userData)
   return response.data
  } catch (error) {
      throw error.response?.data || {message : "Login failed!"}
  }
 },
 allBlogs: async ()=> {
   try {
   const response = await api.get('/get-allBlogs')   
   return response.data
  } catch (error) {
      throw error.response?.data || {message : "failed to access Blogs!"}
  }
 },
 myProfile: async (userData) => {
    try {
        const {userId} = userData;        
        const response = await api.get(`/user/me/${userId}`)
        return response.data
    } catch (error) {
              throw error.response?.data || {message : "failed to access User Profile!"}

    }
 },
userProfile: async (userData) => {
    try {
        const {userId} = userData;
        const response = await api.get(`/user/user/${userId}`)
        return response.data
    } catch (error) {
              throw error.response?.data || {message : "failed to access User Profile!"}

    }
 }
} 
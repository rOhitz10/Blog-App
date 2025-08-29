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
   const response = await api.post('/login',userData)
   return response.data
  } catch (error) {
      throw error.response?.data || {message : "Login failed!"}
  }
 } 
} 
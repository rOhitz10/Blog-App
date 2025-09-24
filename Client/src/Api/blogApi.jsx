import api from "./axiosConfig"

export const blogApi = {
create: async (data) => {
 try {
  const response = await api.post('/create',data,{
   headers:{
    "Content-Type":"multipart/form-data"
   }
  })
  return response.data
 } catch (error) {
 console.error("ERROR:",error);
 throw error.response?.data || {message:"Blog Creation Failed!"}
 }
},
getBlog: async (id) => {
  try {
    const response = await api.get(`/blog/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data|| {message:"Failed to get blog"}
  }
},

like: async (blogId,userId) => {
  try {
    const response = await api.post(`/like/${blogId}`,{userId})
    return response.data
  } catch (error) {
        throw error.response?.data|| {message:"Failed to get likes"}
  }
}
}


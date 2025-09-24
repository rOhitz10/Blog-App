import api from './axiosConfig'

export const commentApi = {
 getBlogComments : async (blogId) => {
  try {
   const response = await api.get(`/comment/${blogId}`)
   return response.data
  } catch (error) {
   throw error.response.message || {message : 'Failed to fetch comment of a blog'}
  }
 },
 addComment : async (data) => {
  try {
   const response = await api.post("/comment/add-comment",data)
   return response.data   
  } catch (error) {
   throw error.response.message || {message : 'Failed to add comment'}
  }  
 },
 deleteComment : async (commentId) => {
  try {
   const response = await api.delete("/comment/delete-comment",commentId)
   console.log(response);
   
  return response.data   
  } catch (error) {
   throw error.response.message || {message : "Failed to Delete comment"}
  }
 }
}
import axios from 'axios'

const api = axios.create({
 baseURL: import.meta.env.API_BASE_URL || 'http://localhost:4000/api/v1',
 timeout: 1000,
 headers:{
  'content-type' : 'application/json'
 },
})


// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
        const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
        if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  });

export default api

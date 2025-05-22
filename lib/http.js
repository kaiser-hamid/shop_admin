import axios from "axios";

const http = axios.create({ 
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    }
});

// Add a request interceptor to add the token to requests
http.interceptors.request.use(
  (config) => {
     const token = localStorage.getItem('auth-storage')
      ? JSON.parse(localStorage.getItem('auth-storage')).state.token
      : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http;

// lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL, // Use environment variable for base URL
  // You can add other default settings here if needed
});

export default axiosInstance;


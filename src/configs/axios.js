import { baseUrl, jwtTokenStr } from '@/constants';
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: baseUrl, // Your API base URL
});

// Interceptor to handle 401 responses
apiClient.interceptors.response.use(
  response => response, // Return the response if it's successful
  error => {
    if (error.response && error.response.status === 401) {
      // Logic to handle 401 response
      // For example, remove token from localStorage or state management
      localStorage.removeItem(jwtTokenStr); // or your token management logic

      // Optionally, redirect to login page or show a message
      // window.location.href = '/login';

      // Return a rejected promise to propagate the error
      return Promise.reject(error);
    }
    return Promise.reject(error); // For other errors, just reject the promise
  }
);

export default apiClient;

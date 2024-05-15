import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    (config) => {
      console.log('Sending request with config:', config)
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (token) {
        const tokenValue = token.split("=")[1];
        config.headers.Authorization = `Bearer ${tokenValue}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async(error) => {
      if (error.response && error.response.status === 401 || error.response.status === 403) {
        console.error(
          "Unauthorized access detected."
        );
        const { user, logOut } = useAuth();
        const navigate = useNavigate();
        if (user) {
          await logOut()
          toast.error("You have been logged out due to inactivity.")
          navigate("/login")
        }
        
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};


export default useAxiosSecure;
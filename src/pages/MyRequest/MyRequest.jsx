import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyRequest = () => {
 const { user } = useAuth()
 const [reqFoods, setReqFoods] = useState([])

 useEffect(() => {
  getReqFood()
  console.log(reqFoods)
 },[user])
 
 const getReqFood = async () => {
  const { data } = await axios.get(
   `${import.meta.env.VITE_API_URL}/foods/my-requests/${user?.email}`
  );
  setReqFoods(data)
 }

 return (
  <div>
   
  </div>
 );
};

export default MyRequest;
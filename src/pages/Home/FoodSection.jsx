import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard/FoodCard';

const FoodSection = () => {
 const [foods, setFoods] = useState([])
 
 useEffect(() => {
  const getFoods = async () => {
   const { data } = await axios(`${import.meta.env.VITE_API_URL}/foods`);
   setFoods(data);
  }
  getFoods();
 }, [])

 console.log(foods)
 return (
   <div className="container mx-auto my-6">
     <div>
       <h2 className="text-2xl font-bold text-center mb-6">Food Assistance</h2>
       <p className="text-lg text-center text-gray-600 mb-8">
         Don't be shy to ask for food assistance. Your well-being matters to us.
     Browse through
     <br />
     the available food options
     below, and feel free to
         request what you need.
       </p>
   </div>
   
   <div className='my-8'>
    {foods?.map((food) => <FoodCard key={food?._id} food={food} />)}
   </div>
   </div>
 );
};

export default FoodSection;
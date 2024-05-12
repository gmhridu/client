import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';

const FoodDetails = () => {
 const { user } = useAuth()
 const foods = useLoaderData()

 const {
   foodImage,
   foodName,
   foodQuantity,
   pickupLocation,
   expiredDateTime,
   additionalNotes,
   donator: { name, image, email },
 } = foods || {};


 return (
   <div className="flex items-center justify-center my-10 px-6">
     <div className="w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
       <div className="h-96">
         <img className="object-cover w-full h-full" src={foodImage} alt={foodName} />
       </div>
       <div className="p-6">
         <div>
           <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
             Product
           </span>
           <a
             href="#"
             className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
             tabindex="0"
             role="link"
           >
             I Built A Successful Blog In One Year
           </a>
           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
             parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
             egestas quam volutpat viverra. In pretium nec senectus erat. Et
             malesuada lobortis.
           </p>
         </div>

         <div className="mt-4">
           <div className="flex items-center">
             <div className="flex items-center">
               <img
                 className="object-cover h-10 rounded-full"
                 src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                 alt="Avatar"
               />
               <a
                 href="#"
                 className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                 tabindex="0"
                 role="link"
               >
                 Jone Doe
               </a>
             </div>
             <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
               21 SEP 2015
             </span>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default FoodDetails;
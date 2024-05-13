import React from 'react';
import { agent } from '../../utils/dataProvider';

const MeetOutTeam = () => {
 return (
   <section className="py-6 text-gray-800 my-8 bg-gray-100">
     <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
       <div>
         <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">
           Meet Our team
         </h1>
         <p className="max-w-2xl text-center text-gray-600">
           Meet our talented team members!
         </p>
       </div>
       <div className="flex flex-wrap justify-center">
         {agent?.map((data, index) => (
           <div
             key={index}
             className="flex flex-col justify-center m-8 text-center"
           >
             <img
               alt=""
               className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500"
               src={data?.image}
             />
             <p className="text-xl font-semibold leading-tight font-sans">{data?.name}</p>
             <p className="font-sans text-gray-600">{data?.phone}</p>
           </div>
         ))}
       </div>
     </div>
   </section>
 );
};

export default MeetOutTeam;
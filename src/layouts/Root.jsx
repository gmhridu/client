import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const Root = () => {
 return (
   <div className="font-merriWeather">
     <Navbar />
     <Outlet />
     <Footer />
   </div>
 );
};

export default Root;
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";


import bgImg1 from '../../assets/banner1.jpg'
import bgImg2 from '../../assets/banner2.jpeg'
import bgImg3 from '../../assets/banner3.jpg'
import Slide from './Slide';

const Banner = () => {
 return (
   <div className="px-2 md:px-6  py-4 md:py-10">
     <Swiper
       spaceBetween={30}
       centeredSlides={true}
       loop={true}
       autoplay={{
         delay: 3000,
         disableOnInteraction: false,
       }}
       pagination={{
         clickable: true,
       }}
       navigation={true}
       modules={[Autoplay, Pagination, Navigation]}
       className="mySwiper rounded-xl"
     >
       <SwiperSlide>
         <Slide
           image={bgImg1}
           text={"Nourish hearts, feed souls. Donate food and spread kindness."}
         />
       </SwiperSlide>
       <SwiperSlide>
         <Slide
           image={bgImg2}
           text={
             "Share a meal, share a smile. Join us in fighting hunger today."
           }
         />
       </SwiperSlide>
       <SwiperSlide>
         <Slide
           image={bgImg3}
           text={
             "Every plate shared brings hope. Be a donor, make a difference."
           }
         />
       </SwiperSlide>
     </Swiper>
   </div>
 );
};

export default Banner;
import React from "react";
import Marquee from "react-fast-marquee";

import { useMediaQuery } from "react-responsive";
import { marqueeImg } from "../../utils/dataProvider";

const MeetOurPartner = () => {
 const isMediumScreen = useMediaQuery({minWidth: 768})
  return (
    <div className="px-2 md:px-6 py-2">
      <div>
        <h1 className="text-lg md:text-xl md:font-medium font-semibold">Meet Our Global Partners</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Join us in our mission to make a positive impact across the globe with
          our esteemed partners.
        </p>
      </div>
      <div className="my-5">
        <Marquee
          autoFill={true}
          speed={50}
          gradient={true}
          gradientColor={isMediumScreen ? "rgb(248, 251, 253)" : ""}
          gradientWidth={200}
        >
          {marqueeImg?.map((img, index) => (
            <img src={img?.url} alt="" key={index} className="md:mr-16 md:h-10 h-8 mr-3" />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MeetOurPartner;

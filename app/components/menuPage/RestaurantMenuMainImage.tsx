import React from "react";
import Image from "next/image";

export const RestaurantMenuMainImage = () => {
  return (
    <>
      <div className="flex flex-col">
        <Image
          className="w-full h-36 object-cover"
          src="https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/home_background/Hamburger.jpg"
          alt="menu restaurant logo"
          width={250}
          height={100}
        />
      </div>
      <Image
        className="absolute  top-7 left-1/2 -translate-x-1/2 justify-center"
        src="https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/home_logo/mvpLogo.png"
        width={215}
        height={215}
        alt="restaurant logo"
      />
    </>
  );
};

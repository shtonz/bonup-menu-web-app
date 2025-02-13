import React from "react";
import Image from "next/image";

type RestaurantMenuHeaderProps = {
  backgroundImageSrc: string;
  brandImageSrc: string;
};

export const RestaurantMenuHeader: React.FC<RestaurantMenuHeaderProps> = (
  props
) => {
  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <Image
          className="w-full h-36 object-cover"
          src={props.backgroundImageSrc}
          alt="menu restaurant logo"
          width={250}
          height={100}
        />

        {/* Brand Image (Overlapping) */}
        <Image
          className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1/4 w-auto"
          src={props.brandImageSrc}
          width={100}
          height={100}
          alt="restaurant logo"
        />
      </div>
    </>
  );
};

import React from "react";
import Image from "next/image";

export enum DishCardType {
  Regular = "Regular",
  Promoted = "Promoted",
}

type DishCardProps = {
  dishCardType: DishCardType;
  imageSource: string;
  name: string;
  description: string;
  price: string;
};

export const DishMenuCard: React.FC<DishCardProps> = (props) => {
  let classNameProps = "";
  if (props.dishCardType == DishCardType.Regular) {
    classNameProps = "relative bg-white rounded-lg shadow-lg p-1";
  } else if (props.dishCardType == DishCardType.Promoted) {
    classNameProps = "relative col-span-2 bg-white rounded-lg shadow-lg p-1";
  }
  return (
    <div className={classNameProps}>
      <Image
        className="w-full h-40 object-cover rounded-md mb-4"
        src={props.imageSource}
        width={100}
        height={100}
        alt="restaurant logo"
      />
      <h2 className="text-xl font-semibold text-gray-800">{props.name}</h2>
      <p className="text-gray-600 mt-2">{props.description}</p>
      <p className="text-gray-600 mt-2 font-semibold">{props.price}</p>
    </div>
  );
};

"use client";
import React from "react";
import Image from "next/image";
import { DishObject } from "@/app/data/models/Dish";

type DishClassicCardProps = {
  dishProps: DishObject;
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    dishInfo: DishCardProps
  ) => void;
};

export const DishClassicMenuCard: React.FC<DishClassicCardProps> = (props) => {
  let classNameProps = "";
  if (!props.dishProps.isPromoted) {
    classNameProps = "relative bg-white rounded-lg shadow-sm p-1";
  } else {
    classNameProps = "relative col-span-2 bg-white rounded-lg shadow-sm p-1";
  }

  const handlOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    dishInfo: DishCardProps
  ) => {
    props.onClick(e, props);
  };

  return (
    <>
      <div onClick={(e) => handlOnClick(e, props)} className={classNameProps}>
        <Image
          className="w-full h-40 object-cover rounded-md mb-4"
          src={props.dishProps?.imageSrc}
          width={100}
          height={100}
          alt="restaurant logo"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {props.dishProps.name}
        </h2>
        <p className="text-gray-600 mt-2 line-clamp-2 overflow-hidden text-ellipsis">
          {props.dishProps.description}
        </p>
        <p className="text-gray-600 mt-2 font-semibold">
          {props.dishProps.price}
        </p>
      </div>
    </>
  );
};

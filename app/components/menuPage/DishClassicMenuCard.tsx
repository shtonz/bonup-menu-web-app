"use client";
import React from "react";
import { IDish } from "@/app/data/models/DishModel";
import { LocaleRouteNormalizer } from "next/dist/server/normalizers/locale-route-normalizer";

type DishClassicCardProps = {
  dishProps: IDish;
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    dishInfo: DishClassicCardProps
  ) => void;
};

export const DishClassicMenuCard: React.FC<DishClassicCardProps> = (props) => {
  // let classNameProps = "";
  // if (!props.dishProps.isPromoted) {
  //   classNameProps = "relative bg-white rounded-lg shadow-sm p-1";
  // } else {
  //   classNameProps = "relative col-span-2 bg-white rounded-lg shadow-sm p-1";
  // }

  const handlOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    dishInfo: DishClassicCardProps
  ) => {
    props.onClick(e, props);
  };

  return (
    <>
      {/* <div onClick={(e) => handlOnClick(e, props)} className={classNameProps}> */}
      <div onClick={(e) => handlOnClick(e, props)} className="">
        <h2 className="text-xl text-gray-900">{props.dishProps.name}</h2>
        <div className="flex justify-between">
          <p className="text-gray-700 line-clamp-2 overflow-hidden text-ellipsis">
            {props.dishProps.description}
          </p>
          <p className="text-gray-700 font-semibold">{props.dishProps.price}</p>
        </div>
      </div>
    </>
  );
};

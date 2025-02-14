import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DishObject } from "@/app/data/models/Dish";
import {
  ArrowRightIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useOrderItems } from "@/app/bonup/menu/OrderItemsContext";
import ListComponent from "../Dashboard/ModifiersList";
import ModifiersList from "../Dashboard/ModifiersList";

type DishExtendedInfoProps = {
  dishProps: DishObject;
  isVisible: boolean;
  onClose: () => void;
};

const DishExtendedInfo: React.FC<DishExtendedInfoProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [newDishInfo, setNewDishInfo] = useState<DishObject>(props.dishProps);
  const [dishCount, setDishCount] = useState(1);

  const { addOrderItem } = useOrderItems();

  useEffect(() => {
    setIsVisible(props.isVisible);
    setNewDishInfo(props.dishProps);
  }, [props.isVisible]);

  const incrementCount = () => setDishCount((prev) => prev + 1);
  const decrementCount = () =>
    dishCount > 1 && setDishCount((prev) => prev - 1);

  const handleAddDishBtnClick = () => {
    for (let i = 0; i < dishCount; i++) {
      addOrderItem({
        dishProps: newDishInfo,
        count: dishCount,
        id: "",
      });
    }
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-y-1/2 text-gray-900
         transition-transform duration-500 ease-in-out w-full h-full
      ${isVisible ? "left-1/2 -translate-x-1/2" : "translate-x-full"} 
      bg-white rounded-lg shadow-lg overflow-hidden z-30`}
    >
      {/* Close Button */}
      <button
        onClick={props.onClose}
        className="absolute top-1 left-1 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 z-20"
      >
        <ArrowRightIcon className="w-6 h-6" />
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto w-full h-full">
        {/* Full-Width Image */}
        <div className="relative w-full shadow-[0px_0px_5px_rgba(0,0,0,0.4)]">
          <Image
            className="w-full h-56 object-cover rounded-t-lg"
            src={props.dishProps.imageSrc}
            width={250}
            height={250}
            alt="Dish Image"
          />
          <h2 className="px-3 text-2xl font-bold my-1">
            {props.dishProps.name}
          </h2>
          <h2 className="px-3 text-lg font-bold">{props.dishProps.price}</h2>
          <p className="text-gray-600 line-clamp-2 px-3">
            {props.dishProps.description}
          </p>
        </div>

        <div className="px-3">
          <ModifiersList editMode={false}></ModifiersList>

          {/* Counter Section */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <MinusCircleIcon
              className={`w-8 h-8 cursor-pointer ${
                dishCount > 1
                  ? "text-gray-500 hover:text-red-500"
                  : "text-gray-300"
              }`}
              onClick={decrementCount}
            />
            <span className="text-black text-lg font-semibold">
              {dishCount}
            </span>
            <PlusCircleIcon
              className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-700"
              onClick={incrementCount}
            />
          </div>

          {/* Add Dish Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddDishBtnClick}
              className="bg-cyan-600 w-full text-white px-6 py-2 rounded-3xl hover:bg-blue-600 transition duration-300"
            >
              Add Dish
            </button>
          </div>

          {/* Comments Section */}
          <div className="text-lg font-bold my-4">Comments</div>
          <textarea className="bg-white rounded-md border drop-shadow-lg shadow-[5px_5px_10px_rgba(0,0,0,0.3)] w-full h-24"></textarea>
        </div>
      </div>
    </div>
  );
};

export default DishExtendedInfo;

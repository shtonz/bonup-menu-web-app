import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DishObject } from "@/app/data/models/Dish";
import ModifiersForm from "../Dashboard/ModifiersForm";
import {
  XMarkIcon,
  PencilIcon,
  EyeIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

type DishExtendedInfoProps = {
  dishProps: DishObject;
  isVisible: boolean;
  isEditMode: boolean;
  isEditable: boolean;
  onClose: () => void;
};

const DishExtendedInfo: React.FC<DishExtendedInfoProps> = (props) => {
  // Extended dish info show consts
  const [isVisible, setIsVisible] = useState(false);
  const [newDishInfo, setNewDishInfo] = useState<DishObject>(props.dishProps);

  // Extended dish info edit consts
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditBtnToggled, setisEditBtnToggled] = useState(false);

  // Extended dish info common consts
  const [isEditMode, setIsEditMode] = useState(props.isEditable);
  const [isEditable, setIsEditable] = useState(props.isEditable);

  //Counter for Dish Quantity
  const [dishCount, setDishCount] = useState(1);

  //Increase dish count
  const incrementCount = () => setDishCount(dishCount + 1);

  //Decrease dish count (Minimum: 1)
  const decrementCount = () => {
    if (dishCount > 1) setDishCount(dishCount - 1);
  };

  useEffect(() => {
    setIsVisible(props.isVisible);
    if (props.isEditable) setNewDishInfo(props.dishProps);
  }, [props.isVisible]);

  return (
    <>
      <div
        className={
          isEditMode
            ? ` flex flex-col z-30 w-max-[50%] h-max-[90%] fixed top-1/2 left-1/2 transform -translate-y-1/2 transition-transform duration-500 ease-in-out ${
                isVisible ? "left-1/2 -translate-x-1/2" : "translate-x-full"
              }  bg-white rounded-lg shadow-lg p-6 overflow-hidden`
            : `flex flex-col z-30 w-full h-full fixed top-1/2 left-1/2 transform -translate-y-1/2 transition-transform duration-500 ease-in-out ${
                isVisible ? "left-1/2 -translate-x-1/2" : "translate-x-full"
              }  bg-white rounded-lg shadow-lg overflow-hidden`
        }
      >
        {/*Close Button (Fixed to Upper Left of Image) */}
        <button
          onClick={() => props.onClose()}
          className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 z-20"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/*Scrollable Content (Image is full width if isEditMode is false) */}

        {/* <div className="overflow-y-auto max-h-full h-full  px-2"> */}
        <div
          className={`overflow-y-auto max-h-full h-full ${
            isEditMode ? "px-6" : "px-0"
          }`}
        >
          {!isEditable ? (
            <>
              {/*Full-Width Image (Only When isEditMode is False) */}
              {!isEditMode ? (
                <div className="relative w-full">
                  <Image
                    className="w-full h-56 object-cover rounded-t-lg"
                    src={props.dishProps.imageSrc}
                    width={100}
                    height={100}
                    alt="restaurant logo"
                  />
                </div>
              ) : (
                <Image
                  className="w-full h-40 object-cover rounded-md mb-4 hover:cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  src={newDishInfo.imageSrc}
                  width={100}
                  height={100}
                  alt="restaurant logo"
                />
              )}

              <h2 className="text-2xl font-bold text-gray-800 my-4 px-3 break-words">
                {props.dishProps.name}
              </h2>
              <p className="text-gray-600 break-words line-clamp-2 px-3">
                {props.dishProps.description}
              </p>
              <div className="mt-4 px-3">
                <ModifiersForm
                  isEditMode={props.isEditMode}
                  isEditable={props.isEditable}
                />
              </div>
              {/*Counter Section (Inside Scrollable Content) */}
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

              {/*Add Dish Button (Inside Scrollable Content) */}
              <div className="flex justify-center mt-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  Add Dish
                </button>
              </div>
            </>
          ) : (
            <>
              <Image
                className="w-full h-40 object-cover rounded-md mb-4 hover:cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                src={newDishInfo.imageSrc}
                width={100}
                height={100}
                alt="restaurant logo"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
              <input
                className="text-2xl font-bold text-gray-800 mb-4 bg-slate-100 w-full break-words"
                placeholder="Enter Dish Title"
                onChange={(e) =>
                  setNewDishInfo({ ...newDishInfo, name: e.target.value })
                }
              />
              <textarea
                name="description"
                id="dish_description"
                placeholder="Enter Dish Description"
                className="text-xl text-gray-800 mb-4 bg-slate-100 w-full break-words"
                onChange={(e) =>
                  setNewDishInfo({
                    ...newDishInfo,
                    description: e.target.value,
                  })
                }
              />
              <ModifiersForm
                isEditMode={props.isEditMode}
                isEditable={props.isEditable}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DishExtendedInfo;

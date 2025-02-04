import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DishObject } from "@/app/data/models/Dish";
import ModifiersForm from "../Dashboard/ModifiersForm";
import {
  UserIcon,
  XMarkIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

type DishExtendedInfoProps = {
  dishProps: DishObject;
  isVisible: boolean;
  isEditMode: boolean;
  isEditable: boolean;
  onClose: () => void;
};

const DishExtendedInfo: React.FC<DishExtendedInfoProps> = (props) => {
  //extended dish info show consts
  const [isVisible, setIsVisible] = useState(false);
  const [newDishInfo, setNewDishInfo] = useState<DishObject>(props.dishProps);

  //extended dish info edit consts
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditBtnToggled, setisEditBtnToggled] = useState(false);

  //extexded dish info common consts
  const [isEditMode, setIsEditMode] = useState(props.isEditable);
  const [isEditable, setIsEditable] = useState(props.isEditable);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setNewDishInfo({
        ...newDishInfo,
        imageSrc: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDishInfo({
      ...newDishInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDishInfo({
      ...newDishInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setIsVisible(props.isVisible);
    if (props.isEditable) setNewDishInfo(props.dishProps);
  }, [props.isVisible]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 z-30">
        <div
          className={`flex flex-col z-30 w-11/12 h-5/6 fixed top-1/2 left-1/2 transform -translate-y-1/2 transition-transform duration-500 ease-in-out ${
            isVisible ? "left-1/2 -translate-x-1/2" : "translate-x-full"
          } w-4/5 bg-white rounded-lg shadow-lg p-6`}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => props.onClose()}
              className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            {isEditMode ? (
              <>
                <button
                  onClick={() => props.onClose()}
                  className="flex items-center justify-center w-20 h-8 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setisEditBtnToggled(!isEditBtnToggled)}
                  className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                >
                  {isEditBtnToggled ? (
                    <PencilIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </>
            ) : (
              <></>
            )}
          </div>

          {!isEditable ? (
            <>
              <Image
                className="w-full h-40 object-cover rounded-md mb-4"
                src={props.dishProps.imageSrc}
                width={100}
                height={100}
                alt="restaurant logo"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {props.dishProps.name}
              </h2>
              <p className="text-gray-600">{props.dishProps.description}</p>
              <ModifiersForm
                isEditMode={props.isEditMode}
                isEditable={props.isEditable}
              ></ModifiersForm>
            </>
          ) : (
            <>
              <Image
                className="w-full h-40 object-cover rounded-md mb-4 hover:cursor-pointer"
                onClick={handleImageClick}
                src={newDishInfo.imageSrc}
                width={100}
                height={100}
                alt="restaurant logo"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <input
                className="text-2xl font-bold text-gray-800 mb-4 bg-slate-100"
                placeholder="Enter Dish Title"
                onChange={(e) => {
                  handleInputValueChange(e);
                }}
              />
              <textarea
                name="description"
                id="dish_description"
                placeholder="Enter Dish Description"
                className="text-xl text-gray-800 mb-4 bg-slate-100"
                onChange={(e) => {
                  handleTextAreaValueChange(e);
                }}
              />
              <ModifiersForm
                isEditMode={props.isEditMode}
                isEditable={props.isEditable}
              ></ModifiersForm>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DishExtendedInfo;

"use client";
import React, { useState } from "react";
import DishExtendedInfoUpdateEdit from "../menuPage/DishExtendedInfoUpdateEdit";

const MenuSectionBar = () => {
  const [showAddDishView, setShowAddDishView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const handleExtexdedInfoClose = () => {
    setIsVisible(false);
  };
  return (
    <>
      <div className="bg-blue-200 my-5 fixed top-12 left-0 w-full shadow-md py-3 px-6 flex justify-between items-center z-50">
        <select className="p-2 text-slate-800 bg-white border rounded-md shadow-sm">
          <option value="EveningMenu">Evening Menu</option>
          <option value="NoonMenu">Noon Menu</option>
          <option value="MorningMenu">Morning Menu</option>
        </select>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
            Add Category
          </button>
          <button
            onClick={() => {
              setIsVisible(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
          >
            Add Dish
          </button>
        </div>
      </div>
      <DishExtendedInfoUpdateEdit
        dishProps={{
          id: 0,
          name: "",
          category: "",
          subCategory: "",
          description: "",
          price: 0,
          isPromoted: false,
          isPromotedSize: false,
          bannerText: "",
          iconSrc: "",
          score: 0,
          cost: 0,
          modifiers: {},
          imageSrc:
            "https://bonupp.s3.eu-north-1.amazonaws.com/dashboard/images/add_dish_image.jpg",
        }}
        isVisible={isVisible}
        onClose={handleExtexdedInfoClose}
        isNewDish={true}
      ></DishExtendedInfoUpdateEdit>
    </>
  );
};

export default MenuSectionBar;

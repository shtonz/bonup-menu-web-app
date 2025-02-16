"use client";
import React, { useState } from "react";
import DishExtendedInfoUpdateEdit from "../menuPage/DishExtendedInfoUpdateEdit";
import { Menu, MenuType } from "../menuPage/Menu";

const MenuSectionBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuType, setMenuType] = useState<MenuType>(MenuType.GalleryMenu);

  const handleExtexdedInfoClose = () => {
    setIsVisible(false);
  };

  const handleMenuTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    if (event.target.value === "GalleryMenu") {
      setMenuType(MenuType.GalleryMenu);
    } else if (event.target.value === "ClassicMenu") {
      setMenuType(MenuType.ClassicMenu);
    }

    console.log(menuType);
  };
  return (
    <>
      <div className="bg-blue-200 my-5 fixed top-12 left-0 w-full shadow-md py-3 px-6 flex justify-between items-center z-50">
        <div className="flex gap-2">
          <select className="p-2 text-slate-800 bg-white border rounded-md shadow-sm">
            <option value="EveningMenu">Evening Menu</option>
            <option value="NoonMenu">Noon Menu</option>
            <option value="MorningMenu">Morning Menu</option>
          </select>
          <select
            onChange={handleMenuTypeChange}
            className="p-2 text-slate-800 bg-white border rounded-md shadow-sm"
          >
            <option value="GalleryMenu">Gallery Style</option>
            <option value="ClassicMenu">Classic Style</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsVisible(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
          >
            Add New Dish
          </button>
        </div>
      </div>
      {menuType === MenuType.ClassicMenu && (
        <Menu
          menuType={MenuType.ClassicMenu}
          isEditmode={true}
          includeNavbar={false}
          includeRestaurantHeader={false}
        ></Menu>
      )}

      {menuType === MenuType.GalleryMenu && (
        <Menu
          menuType={MenuType.GalleryMenu}
          isEditmode={true}
          includeNavbar={true}
          includeRestaurantHeader={true}
        ></Menu>
      )}

      <DishExtendedInfoUpdateEdit
        dishProps={{
          _id: "",
          uiId: 0,
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
          ModifiersListItems: [],
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

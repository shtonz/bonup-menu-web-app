"use client";
import React, { useEffect, useState } from "react";
import BottomDrawer from "../../components/menuPage/BottomDrawer";
import { OrderItemsProvider } from "./OrderItemsContext";
import { Menu, MenuType } from "@/app/components/menuPage/Menu";

const menuPage: React.FC = () => {
  const [menuType, setMenuType] = useState<MenuType>(MenuType.GalleryMenu);

  const toggleMenuType = () => {
    if (menuType === MenuType.GalleryMenu) setMenuType(MenuType.ClassicMenu);
    else if (menuType === MenuType.ClassicMenu)
      setMenuType(MenuType.GalleryMenu);
  };
  return (
    <>
      <OrderItemsProvider>
        <div className="flex-col top-0 left-0 m-h-screen w-full bg-slate-100">
          {menuType === MenuType.ClassicMenu && (
            <Menu
              menuType={MenuType.ClassicMenu}
              isEditmode={false}
              includeNavbar={false}
              includeRestaurantHeader={false}
            ></Menu>
          )}

          {menuType === MenuType.GalleryMenu && (
            <Menu
              menuType={MenuType.GalleryMenu}
              isEditmode={false}
              includeNavbar={true}
              includeRestaurantHeader={true}
            ></Menu>
          )}

          <button onClick={toggleMenuType} className="absolute top-0 right-0">
            ()
          </button>
        </div>
        <BottomDrawer></BottomDrawer>
      </OrderItemsProvider>
    </>
  );
};

export default menuPage;

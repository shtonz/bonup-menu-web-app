"use client";
import React, { useState } from "react";
import { RestaurantMenuHeader } from "../../components/menuPage/RestaurantMenuHeader";
import { MenuDishGalley } from "../../components/menuPage/MenuDishGalley";
import BottomDrawer from "../../components/menuPage/BottomDrawer";
import { OrderItemsProvider } from "./OrderItemsContext";
import { ClassicMenu } from "@/app/components/menuPage/ClassicMenu";

const menuPage: React.FC = () => {
  const isGalleryMenu = useState(false);

  const RestaurantMenuHeaderBckImg =
    "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/dishes_images/Cover.jpg";
  const RestaurantMenuHeaderBrdImg =
    "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/dishes_images/logo.jpg";

  return (
    <>
      <OrderItemsProvider>
        <div className="flex-col top-0 left-0 m-h-screen w-full bg-slate-100">
          <RestaurantMenuHeader
            backgroundImageSrc={RestaurantMenuHeaderBckImg}
            brandImageSrc={RestaurantMenuHeaderBrdImg}
          ></RestaurantMenuHeader>
          <MenuDishGalley isEditmode={false}></MenuDishGalley>
          {/* <ClassicMenu isEditmode={false}></ClassicMenu> */}
          <BottomDrawer></BottomDrawer>
        </div>
      </OrderItemsProvider>
    </>
  );
};

export default menuPage;

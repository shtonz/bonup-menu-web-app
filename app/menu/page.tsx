import AnimatedCard from "../components/menuPage/AnimatedCard";

import React from "react";
import { RestaurantMenuMainImage } from "../components/menuPage/RestaurantMenuMainImage";
import { MenuNavBar } from "../components/menuPage/MenuNavBar";
import { MenuDishGalley } from "../components/MenuDishGalley";

const menupage = () => {
  return (
    <>
      <div className="flex-col top-0 left-0 m-h-screen w-full bg-slate-100">
        <RestaurantMenuMainImage></RestaurantMenuMainImage>
        <MenuNavBar></MenuNavBar>
        <MenuDishGalley></MenuDishGalley>
        <AnimatedCard></AnimatedCard>
      </div>
    </>
  );
};

export default menupage;

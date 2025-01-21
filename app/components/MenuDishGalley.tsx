import React from "react";
import { DishCardType, DishMenuCard } from "./menuPage/DishMenuCard";

export const MenuDishGalley = () => {
  const tempImagesUrl =
    "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/home_background/Hamburger.jpg";
  return (
    <div className="max-w-6xl mx-auto p-1">
      <div className="grid grid-cols-2 gap-2">
        <DishMenuCard
          dishCardType={DishCardType.Regular}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
        <DishMenuCard
          dishCardType={DishCardType.Regular}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
        <DishMenuCard
          dishCardType={DishCardType.Promoted}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
        <DishMenuCard
          dishCardType={DishCardType.Regular}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
        <DishMenuCard
          dishCardType={DishCardType.Regular}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
        <DishMenuCard
          dishCardType={DishCardType.Regular}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
        <DishMenuCard
          dishCardType={DishCardType.Regular}
          imageSource={tempImagesUrl}
          name="Dynamic Name"
          description="Dynamic Description"
          price="Dynamic Price 12$"
        ></DishMenuCard>
      </div>
    </div>
  );
};

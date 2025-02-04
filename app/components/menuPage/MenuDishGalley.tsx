"use client";
import React, { useEffect, useState } from "react";
import { DishCardProps, DishMenuCard } from "./DishMenuCard";
import { MenuNavBar } from "./MenuNavBar";
import { DishObject } from "@/app/data/models/Dish";
import DishExtendedInfo from "./DishExtendedInfo";

type MenuDishGalleyProps = {
  isEditmode: boolean;
  isEditable: boolean;
};

export const MenuDishGalley: React.FC<MenuDishGalleyProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const [dishExtendedInfo, setDishExtendedInfo] = useState<DishObject>({
    name: "",
    category: "",
    subCategory: "",
    description: "",
    isPromoted: false,
    isPromotedSize: false,
    bannerText: "",
    price: 0,
    modifiers: {},
    imageSrc:
      "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/dishes_images/19.jpg",
    iconSrc: "",
    score: 0,
    cost: 0,
  });

  const [dishes, setDishes] = useState<DishObject[] | null>(null);

  const handleDishClicked = (
    e: React.MouseEvent<HTMLDivElement>,
    dishCardProps: DishCardProps
  ) => {
    setIsVisible(true);
    console.log("isvisible", isVisible);
    setDishExtendedInfo({
      ...dishExtendedInfo,
      name: dishCardProps.dishProps.name,
      description: dishCardProps.dishProps.description,
      category: dishCardProps.dishProps.category,
      isPromoted: dishCardProps.dishProps.isPromoted,
      price: dishCardProps.dishProps.price,
      imageSrc: dishCardProps.dishProps.imageSrc,
    });
  };

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("../../api/get_menu");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${res.status}`
          );
        }
        const data: DishObject[] = await res.json();
        setDishes(data);
      } catch (err: any) {
        console.error("Error fetching dishes:", err);
      }
    }

    fetchMenu();
  }, []);

  const handleExtexdedInfoClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <MenuNavBar></MenuNavBar>
      <div className="max-w-6xl mx-auto p-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {dishes?.map((dish: DishObject) => (
            <DishMenuCard
              dishProps={{
                name: dish.name,
                category: dish.category,
                subCategory: dish.subCategory,
                description: dish.description,
                isPromoted: dish.isPromoted,
                isPromotedSize: dish.isPromotedSize,
                bannerText: dish.bannerText,
                price: dish.price,
                modifiers: dish.modifiers,
                imageSrc: dish.imageSrc,
                iconSrc: dish.iconSrc,
                score: dish.score,
                cost: dish.cost,
              }}
              onClick={handleDishClicked}
            ></DishMenuCard>
          ))}
        </div>
      </div>

      <DishExtendedInfo
        dishProps={dishExtendedInfo}
        isVisible={isVisible}
        onClose={handleExtexdedInfoClose}
        isEditMode={props.isEditmode}
        isEditable={props.isEditable}
      />
    </>
  );
};

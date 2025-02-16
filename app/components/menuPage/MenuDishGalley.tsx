"use client";
import React, { createContext, useEffect, useState } from "react";
import { DishCardProps, DishMenuCard } from "./DishMenuCard";
import MenuNavBar from "./MenuNavBar";
import { IDish } from "@/app/data/models/DishModel";
import DishExtendedInfo from "./DishExtendedInfo";
import DishExtendedInfoUpdateEdit from "./DishExtendedInfoUpdateEdit";
import CarouselNavbar from "./CarouselNavbar";

type MenuDishGalleyProps = {
  isEditmode: boolean;
};

export const MenuDishGalley: React.FC<MenuDishGalleyProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dishExtendedInfo, setDishExtendedInfo] = useState<IDish>({
    _id: "",
    uiId: 0,
    name: "",
    category: "",
    subCategory: "",
    description: "",
    isPromoted: false,
    isPromotedSize: false,
    bannerText: "",
    price: 0,
    ModifiersListItems: [],
    imageSrc:
      "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/dishes_images/19.jpg",
    iconSrc: "",
    score: 0,
    cost: 0,
  });
  const [dishes, setDishes] = useState<IDish[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const handleDishClicked = (
    e: React.MouseEvent<HTMLDivElement>,
    dishCardProps: DishCardProps
  ) => {
    setIsVisible(true);
    setDishExtendedInfo(dishCardProps.dishProps);
    console.log(dishCardProps.dishProps._id);
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
        const data: IDish[] = await res.json();
        setDishes(data);

        setCategories(Array.from(new Set(data.map((dish) => dish.category))));
      } catch (err: any) {
        console.error("Error fetching dishes:", err);
      }
    }

    fetchMenu();
  }, []);

  const handleExtexdedInfoClose = () => {
    setIsVisible(false);
  };
  return <></>;
  return (
    <>
      <MenuNavBar categories={[]}></MenuNavBar>

      <div className="bg-white max-w-6xl mx-auto p-1">
        <div>
          {categories.map((category) => {
            // Filter dishes belonging to the current category
            const catDishes = dishes!.filter(
              (dish) => dish.category === category
            );

            // Extract unique subcategories for this category
            const subCategories = Array.from(
              new Set(catDishes.map((dish) => dish.subCategory))
            );

            return (
              <div key={category}>
                {/* Category title */}
                <h2 id={category}></h2>

                {subCategories.map((subCategory) => {
                  // Filter dishes belonging to the current subcategory
                  const subCatDishes = catDishes.filter(
                    (dish) => dish.subCategory === subCategory
                  );

                  return (
                    <div key={subCategory}>
                      {/* Subcategory title */}
                      <h3 className="text-xl underline font-semibold text-slate-500">
                        {subCategory}
                      </h3>

                      {/* Render the dishes */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {subCatDishes.map((dish) => (
                          <DishMenuCard
                            key={dish._id}
                            dishProps={dish}
                            onClick={handleDishClicked}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {props.isEditmode ? (
        <DishExtendedInfoUpdateEdit
          dishProps={dishExtendedInfo}
          isVisible={isVisible}
          onClose={handleExtexdedInfoClose}
          isNewDish={false}
        ></DishExtendedInfoUpdateEdit>
      ) : (
        <DishExtendedInfo
          dishProps={dishExtendedInfo}
          isVisible={isVisible}
          onClose={handleExtexdedInfoClose}
        />
      )}
    </>
  );
};

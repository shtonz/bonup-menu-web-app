"use client";
import React, { useEffect, useState } from "react";
import { DishCardProps } from "./DishMenuCard";
import { IDish } from "@/app/data/models/DishModel";
import DishExtendedInfo from "./DishExtendedInfo";
import DishExtendedInfoUpdateEdit from "./DishExtendedInfoUpdateEdit";
import { DishClassicMenuCard } from "./DishClassicMenuCard";
import { RestaurantMenuHeader } from "./RestaurantMenuHeader";

type ClassicMenuProps = {
  includeNavbar: boolean;
  includeRestaurantHeader: boolean;
  isEditmode: boolean;
};

export const ClassicMenu: React.FC<ClassicMenuProps> = (props) => {
  const [isVisible, setIsVisible] = useState(props.includeNavbar);
  const [includeNavbar, setIncludeNavbar] = useState(
    props.includeRestaurantHeader
  );
  const [includeRestaurantHeader, setIncludeRestaurantHeader] = useState(false);
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
  const RestaurantMenuHeaderBckImg =
    "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/dishes_images/Cover.jpg";
  const RestaurantMenuHeaderBrdImg =
    "https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/dishes_images/logo.jpg";
  const handleDishClicked = (
    e: React.MouseEvent<HTMLDivElement>,
    dishCardProps: DishCardProps
  ) => {
    setIsVisible(true);
    setDishExtendedInfo(dishCardProps.dishProps);
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
      <div className="bg-white max-w-6xl mx-auto p-1 text-black">
        {includeRestaurantHeader && (
          <RestaurantMenuHeader
            backgroundImageSrc={RestaurantMenuHeaderBckImg}
            brandImageSrc={RestaurantMenuHeaderBrdImg}
          ></RestaurantMenuHeader>
        )}
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
                <h2 style={{ marginTop: "" }}>{category}</h2>

                {subCategories.map((subCategory) => {
                  // Filter dishes belonging to the current subcategory
                  const subCatDishes = catDishes.filter(
                    (dish) => dish.subCategory === subCategory
                  );

                  return (
                    <div key={subCategory} style={{ marginLeft: "" }}>
                      {/* Subcategory title */}
                      <h3 style={{ marginTop: "1.5rem" }}>{subCategory}</h3>

                      {/* Render the dishes */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        {subCatDishes.map((dish) => (
                          <DishClassicMenuCard
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
        {/* <div className="">
          {dishes?.map((dish: IDish) => (
            <DishClassicMenuCard
              dishProps={dish}
              onClick={handleDishClicked}
            ></DishClassicMenuCard>
          ))}
        </div> */}
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

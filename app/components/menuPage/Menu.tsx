"use client";
import React, { useEffect, useState } from "react";
import { DishCardProps, DishMenuCard } from "./DishMenuCard";
import { IDish } from "@/app/data/models/DishModel";
import DishExtendedInfo from "./DishExtendedInfo";
import DishExtendedInfoUpdateEdit from "./DishExtendedInfoUpdateEdit";
import { DishClassicMenuCard } from "./DishClassicMenuCard";
import { RestaurantMenuHeader } from "./RestaurantMenuHeader";
import MenuNavBar, { NavBarCategory } from "./MenuNavBar";
import { generateId } from "@/app/Utils/Utils";

export enum MenuType {
  "GalleryMenu",
  "ClassicMenu",
}

type MenuProps = {
  menuType: MenuType;
  includeNavbar: boolean;
  includeRestaurantHeader: boolean;
  isEditmode: boolean;
};

export const Menu: React.FC<MenuProps> = (props) => {
  //   const HEADER_HEIGHT = 142; //px
  //   const NAVBAR_HEIGHT = 10; //px
  //   const totalFixedHeight = HEADER_HEIGHT + NAVBAR_HEIGHT; //px
  const [menuType, setMenuType] = useState<MenuType>(props.menuType);
  const [isVisible, setIsVisible] = useState(false);
  const [includeNavbar, setIncludeNavbar] = useState(
    props.includeRestaurantHeader
  );
  const [includeRestaurantHeader, setIncludeRestaurantHeader] = useState(
    props.includeRestaurantHeader
  );
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

  const handleOnCategoryChanged = (category: NavBarCategory) => {
    const targetElement = document.getElementById(category.name);
    if (targetElement) {
      console.log(category.name);
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="bg-white max-w-6xl mx-auto p-0 text-black flex-col top-0 left-0 m-h-screen w-full">
        {includeRestaurantHeader && (
          //<div className="fixed top-0 left-0 w-full z-50">
          <div>
            <RestaurantMenuHeader
              backgroundImageSrc={RestaurantMenuHeaderBckImg}
              brandImageSrc={RestaurantMenuHeaderBrdImg}
            ></RestaurantMenuHeader>
          </div>
        )}
        {includeNavbar && (
          //   <div
          //     className="fixed top-0 left-0 w-full z-50"
          //     style={{ top: HEADER_HEIGHT, height: NAVBAR_HEIGHT }}
          //   >
          <div>
            <MenuNavBar
              onCategorySelect={handleOnCategoryChanged}
              categories={categories.map((name) => ({
                id: generateId(),
                name,
              }))}
            ></MenuNavBar>
          </div>
        )}

        <div
        //   className="max-w-6xl mx-auto p-1"
        //    style={{ marginTop: totalFixedHeight + 35 }}
        >
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
              <div className="px-1" key={category}>
                {/* Category title */}
                {menuType === MenuType.ClassicMenu && (
                  <h2 id={category} className="font-semibold text-2xl">
                    {category}
                  </h2>
                )}

                {menuType === MenuType.GalleryMenu && (
                  <h2 id={category} className="font-semibold text-2xl"></h2>
                )}

                {subCategories.map((subCategory) => {
                  // Filter dishes belonging to the current subcategory
                  const subCatDishes = catDishes.filter(
                    (dish) => dish.subCategory === subCategory
                  );

                  return (
                    <div key={subCategory}>
                      {/* Subcategory title */}
                      <h3 className="font-semibold">{subCategory}</h3>

                      {/* Render the dishes */}
                      {menuType === MenuType.GalleryMenu ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                          {subCatDishes.map((dish) => (
                            <DishMenuCard
                              key={dish._id}
                              dishProps={dish}
                              onClick={handleDishClicked}
                            />
                          ))}
                        </div>
                      ) : (
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
                      )}
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

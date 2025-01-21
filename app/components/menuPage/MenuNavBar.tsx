import React from "react";

export const MenuNavBar = () => {
  return (
    <div className="sticky shadow-md bg-white top-0 z-10">
      <div className="flex overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Main
        </a>
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Starters
        </a>
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Chef
        </a>
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Drinks
        </a>
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Desserts
        </a>
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Hot Drinks
        </a>
        <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-500">
          Specials
        </a>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames";

export interface NavBarCategory {
  id: string;
  name: string;
}

interface NavbarProps {
  categories: NavBarCategory[];
  selectedCategoryId?: string;
  onCategorySelect: (category: NavBarCategory) => void;
}

const MenuNavBar: React.FC<NavbarProps> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    selectedCategoryId ?? null
  );

  // If the parent passes a new selectedCategoryId, update our internal state
  useEffect(() => {
    if (selectedCategoryId !== undefined) {
      setInternalSelectedId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleCategoryClick = (cat: NavBarCategory) => {
    // If there's a parent callback, call it
    onCategorySelect?.(cat);

    // If we're not "controlled" by a parent, set our own state
    if (selectedCategoryId === undefined) {
      setInternalSelectedId(cat.id);
    }
  };

  return (
    <nav className="flex text-xl space-x-6 border-b bg-white border-gray-300 pb-2">
      {categories.map((cat) => {
        const isSelected = cat.id === internalSelectedId;
        return (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className={classNames(
              "relative px-2 py-1 text-gray-700 hover:text-gray-900 focus:outline-none",
              {
                "font-semibold": isSelected, // optional styling for selected state
              }
            )}
          >
            {/* Category label */}
            {cat.name}

            {/* Underline element: absolutely positioned span */}
            {isSelected && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default MenuNavBar;

"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Infinite horizontal list of plain-text items with click-to-scroll.
 * The selected item is styled in blue **and** underlined.
 */

const CircularScrollList = () => {
  // Base array of text items
  const baseItems: string[] = [
    "Starters",
    "Mains",
    "Chef",
    "Sushi",
    "Meat",
    "Drinks",
    "Desserts",
  ];

  // We triple the array so we can position the user in the middle copy,
  // allowing them to scroll "infinitely" left or right.
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];

  // We'll start near the middle copy (index = baseItems.length).
  const middleStartIndex = baseItems.length;

  // Tracks which "base index" is selected (0..baseItems.length-1).
  const [selectedBaseIndex, setSelectedBaseIndex] = useState<number>(-1);

  // Reference to the <ul> container
  const containerRef = useRef<HTMLUListElement>(null);

  // References for each <li> item
  const itemRefs = useRef<HTMLLIElement[]>([]);

  /**
   * On mount, scroll to 1/3 of total width so we start in the "middle" copy.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      const scrollWidth = container.scrollWidth;
      container.scrollLeft = scrollWidth / 3;
    });
  }, []);

  /**
   * Scroll event: keep the user in the middle copy if they go too far left/right.
   */
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (scrollWidth <= clientWidth) return; // Not scrollable

    const oneThird = scrollWidth / 3;

    // If user is in the first copy
    if (scrollLeft < oneThird) {
      container.scrollLeft += oneThird; // jump forward
    }
    // If user is in the third copy
    else if (scrollLeft > 2 * oneThird) {
      container.scrollLeft -= oneThird; // jump backward
    }
  };

  // Attach/detach the scroll event
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // (Optionally) Set an initial selected item
    handleItemClick(0);

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * When a user clicks an item:
   * 1) Calculate its base index and update selectedBaseIndex.
   * 2) Compute which item in the middle copy corresponds to that base index.
   * 3) Smoothly scroll so that item sits flush with the container's left edge.
   */
  const handleItemClick = (clickedIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    // Derive the baseIndex for styling / selection
    const baseIndex = clickedIndex % baseItems.length;
    setSelectedBaseIndex(baseIndex);

    // The matching index in the middle copy
    const middleIndex = baseIndex + middleStartIndex;
    const targetItem = itemRefs.current[middleIndex];
    if (!targetItem) return;

    // Determine how far the item is from the container left, then scroll by that amount.
    const containerLeft = container.getBoundingClientRect().left;
    const itemLeft = targetItem.getBoundingClientRect().left;
    const distanceToLeftEdge = itemLeft - containerLeft;

    // Use scrollBy so it smoothly animates rather than jumping (snapping).
    container.scrollBy({
      left: distanceToLeftEdge,
      behavior: "smooth",
    });
  };

  return (
    <nav className="sticky shadow-md bg-white top-0 z-10 text-xl w-full py-3">
      <div className="mx-auto px-4">
        <ul
          ref={containerRef}
          className="flex overflow-x-auto whitespace-nowrap no-scrollbar"
        >
          {repeatedItems.map((item, index) => {
            // Base index for styling
            const baseIndex = index % baseItems.length;
            const isSelected = baseIndex === selectedBaseIndex;

            return (
              <li
                key={index}
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                onClick={() => handleItemClick(index)}
                className={`mx-2 flex-shrink-0 cursor-pointer ${
                  isSelected ? "text-blue-500 underline" : "text-gray-800"
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CircularScrollList;

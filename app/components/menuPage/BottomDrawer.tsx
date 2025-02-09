"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReviewOrder from "./ReviewOrder";

export default function BottomDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Drawer height states
  const collapsedHeight = "5vh"; // When closed
  const expandedHeight = "100vh"; // When open

  return (
    <motion.div
      initial={{ height: collapsedHeight }}
      animate={{ height: isOpen ? expandedHeight : collapsedHeight }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="z-20 fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-3xl overflow-hidden"
    >
      {/*Drag & Click Handle (Only this area is draggable) */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={(event, info) => {
          if (info.point.y < 300) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-200 z-20 w-full h-10 flex justify-center items-center cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-1 bg-gray-400 rounded-full"></div>
          <div className="bg-blue-400 rounded-lg text-black font m-1 px-4">
            Review Order
          </div>
        </div>
      </motion.div>

      {/*Scrollable Drawer Content (Not Draggable) */}
      <div className="overflow-y-auto max-h-[100vh] p-4">
        <ReviewOrder
          title="Your Order"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
          status="Waiting for confirmation"
          initialItems={[
            { id: 1, name: "Burger", description: "Cheese & Bacon", count: 1 },
            { id: 2, name: "Fries", description: "Large Size", count: 2 },
          ]}
        />
        <ReviewOrder
          title="Jane Smith"
          avatar="https://randomuser.me/api/portraits/women/1.jpg"
          status="Order Sent"
          initialItems={[
            { id: 3, name: "Pizza", description: "Pepperoni", count: 1 },
            { id: 4, name: "Soda", description: "Coke", count: 3 },
          ]}
        />
        <ReviewOrder
          title="Johnny Quid"
          avatar="https://randomuser.me/api/portraits/men/2.jpg"
          status="Order Sent"
          initialItems={[
            { id: 3, name: "Pizza", description: "Pepperoni", count: 1 },
            { id: 4, name: "Soda", description: "Coke", count: 3 },
          ]}
        />
      </div>
    </motion.div>
  );
}

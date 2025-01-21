"use client";
import { useState, useEffect } from "react";

export default function AnimatedCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component is mounted
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 z-20">
      <div
        className={`z-20 w-11/12 h-5/6 fixed top-1/2 left-0 transform -translate-y-1/2 transition-transform duration-500 ease-in-out ${
          isVisible ? "left-1/2 -translate-x-1/2" : "translate-x-full"
        } w-4/5 bg-white rounded-lg shadow-lg p-6`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Animated Card</h2>
        <p className="text-gray-600">
          This card animates into the screen from right to left. You can add any
          content here and style it as you like.
        </p>
      </div>
    </div>
  );
}

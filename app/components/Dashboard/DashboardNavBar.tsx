import Link from "next/link";
import Image from "next/image";
import React from "react";

const DashboardNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-3 px-6 flex justify-between items-center z-50">
      <div className="flex space-x-6">
        <Link
          href="/dashboard/home"
          className="text-gray-800 font-medium hover:text-blue-500 transition"
        >
          Home
        </Link>
        <Link
          href="/dashboard/menu"
          className="text-gray-800 font-medium hover:text-blue-500 transition"
        >
          Menu
        </Link>
        <Link
          href="/dashboard/analytics"
          className="text-gray-800 font-medium hover:text-blue-500 transition"
        >
          Analytics
        </Link>
      </div>
      <div>
        <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src="https://randomuser.me/api/portraits/men/4.jpg"
            alt="User Avatar"
            width={40}
            height={40}
          />
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavBar;

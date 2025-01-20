"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div>
      <Image
        layout="fill"
        className="object-cover"
        src="https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/home_background/Hamburger.jpg"
        alt="background image"
      />

      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60"></div>

      <div className="absolute -top-5 left-0 h-full w-full flex flex-col items-center justify-start">
        <Image
          src="https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/home_logo/mvpLogo.png"
          width={250}
          height={250}
          alt="restaurant logo"
        />
        <Image
          className="-mt-10"
          src="https://bonupp.s3.eu-north-1.amazonaws.com/FirstRestaurant/welcome_text_logo/image-removebg-preview+(1).png"
          width={250}
          height={250}
          alt="welcome text logo"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center text-slate-100 text-xl">
        <form onSubmit={handleSubmit} className=" flex flex-col items-start">
          <h2 className="mb-1">What is your name?</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="rounded-[6px] mb-5 text-black p-1 pl-2"
          ></input>
          <div className="flex">
            <input type="checkbox" id="vegetarian" className="mr-1"></input>
            <label htmlFor="vegetarian">I am vegetarian</label>
          </div>
          <div className="flex">
            <input type="checkbox" id="allergy" className="mr-1"></input>
            <label htmlFor="allergy">I have food allergy</label>
          </div>
          <div className="absolute bottom-12 self-center">
            <Link
              type="submit"
              href={"./menu"}
              className="bg-black rounded-lg py-3 px-7"
            >
              Ready to Oreder
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

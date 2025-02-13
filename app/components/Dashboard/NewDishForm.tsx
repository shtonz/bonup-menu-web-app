"use client";
import { DishObject } from "@/app/data/models/Dish";
import React, { useState } from "react";

export const NewDishForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newDishInfo, setNewDishInfo] = useState<DishObject>({
    id: 0,
    name: "",
    description: "",
    category: "",
    subCategory: "",
    isPromoted: false,
    isPromotedSize: false,
    bannerText: "",
    price: 0,
    imageSrc: "",
    iconSrc: "",
    score: 0,
    cost: 0,
    modifiers: {},
  });
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please fill out all fields.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      //Get Pre-Signed URL
      const uploadResponse = await fetch("../../../api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!uploadResponse.ok) throw new Error("Failed to get upload URL");
      console.log(file.size);
      const { uploadUrl } = await uploadResponse.json();

      //Upload Image to S3
      console.log("uploadUrl: ", uploadUrl);
      const s3Response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        //Create 403 forbidden headers: { "Content-Type": file.type, "x-amz-acl": "public-read" },
      });

      if (!s3Response.ok) throw new Error(s3Response.statusText);

      const imageUrl = uploadUrl.split("?")[0]; // Extract clean URL
      setNewDishInfo({
        ...newDishInfo,
        modifiers: {},
        imageSrc: imageUrl as string,
      });

      console.log(newDishInfo);
      //Handle from upload
      const response = await fetch("../../../api/create_new_dish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDishInfo),
      });

      const result = await response.json();
      setMessage(result.message);
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Error submitting form.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDishInfo({
      ...newDishInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDishInfo({
      ...newDishInfo,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSelectValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewDishInfo({
      ...newDishInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="md:w-1/2 lg:w-1/3 h-full flex flex-col items-center"
      >
        <div className="mx-6 grid grid-cols-2 gap-y-4 font-sans text-black mb-14">
          <label htmlFor="dish_name">Name</label>
          <input
            name="name"
            id="dish_name"
            type="text"
            placeholder="Enter Dish Name"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_description">Description</label>
          <input
            name="description"
            id="dish_description"
            placeholder="Enter Dish Description"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_categories">Category</label>
          <select
            name="category"
            id="dish_categories"
            className="bg-slate-500"
            onChange={(e) => {
              handleSelectValueChange(e);
            }}
          >
            <option value={"Starter"}>Starter</option>
            <option value={"Main"}>Main</option>
            <option value={"Fish"}>Fish</option>
            <option value={"Vegetarian"}>Vegetarian</option>
            <option value={"Drinks"}>Drinks</option>
            <option value={"Desserts"}>Desserts</option>
          </select>
          <label htmlFor="dish_subCategory">Sub Category</label>
          <input
            name="subCategory"
            id="dish_subCategory"
            type="text"
            placeholder="Enter Dish Sub Category"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_price">Price</label>
          <input
            name="price"
            id="dish_price"
            type="text"
            placeholder="Enter Dish Price"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_image">Image</label>
          <input
            name="imageSrc"
            id="dish_image"
            type="file"
            accept="image/jpeg"
            className="bg-slate-500"
            onChange={handleFileChange}
          />
          <label htmlFor="dish_score">Score</label>
          <input
            name="score"
            id="dish_score"
            type="number"
            placeholder="Enter Dish Score"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_cost">Cost</label>
          <input
            name="cost"
            id="dish_cost"
            type="number"
            placeholder="Enter Dish Cost"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="is_dish_promoted">Is Promoted</label>
          <input
            name="isPromoted"
            id="is_dish_promoted"
            type="checkbox"
            className="justify-self-start w-6"
            onChange={(e) => {
              handleCheckboxValueChange(e);
            }}
          />
          <label htmlFor="is_dish_promoted_size">Is Promoted Size</label>
          <input
            name="isPromotedSize"
            id="is_dish_promoted_size"
            type="checkbox"
            className="justify-self-start w-6"
            onChange={(e) => {
              handleCheckboxValueChange(e);
            }}
          />
          <label htmlFor="dish_bannerText">Banner Text</label>
          <input
            name="bannerText"
            id="dish_bannerText"
            type="text"
            placeholder="Enter Banner Text"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_icon">Icon</label>
          <input
            name="iconSrc"
            id="dish_icon"
            type="text"
            placeholder="Enter Icon Url"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label htmlFor="dish_modifiers">Modifiers</label>
          <input
            name="modifiers"
            id="dish_modifiers"
            type="text"
            placeholder="Enter Dish Modifiers"
            className="pl-1 bg-slate-500 placeholder-slate-900"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
        </div>
        <button type="submit" className="bg-slate-500 rounded-md p-2 px-6">
          Create Dish
        </button>
        <div className="mt-5">{uploading ? "UPLOADING" : "IDLE"}</div>
      </form>
    </>
  );
};

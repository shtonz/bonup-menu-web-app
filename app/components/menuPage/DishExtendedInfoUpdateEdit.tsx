"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IDish } from "@/app/data/models/DishModel";
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import ModifiersList from "../Dashboard/ModifiersList";

type DishExtendedInfoProps = {
  isNewDish: boolean;
  dishProps: IDish;
  isVisible: boolean;
  onClose: () => void;
};

const DishExtendedInfoUpdateEdit: React.FC<DishExtendedInfoProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [newDishInfo, setNewDishInfo] = useState<IDish>(props.dishProps);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    props.dishProps.imageSrc
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setPreviewImage(props.dishProps.imageSrc);
    setIsVisible(props.isVisible);
    setNewDishInfo(props.dishProps);
    setPreviewImage(props.dishProps.imageSrc);
  }, [props.isVisible]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(event.target.files[0]);

      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(previewURL);
      console.log("previewURL: ", event.target.files[0]);
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

  const handleCreateNewDish = async (e: React.FormEvent) => {
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
      const { uploadUrl } = await uploadResponse.json();

      //Upload Image to S3
      console.log("uploadUrl: ", uploadUrl);
      const s3Response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!s3Response.ok) throw new Error(s3Response.statusText);

      const imageUrl = uploadUrl.split("?")[0]; // Extract clean URL
      setNewDishInfo({
        ...newDishInfo,
        imageSrc: imageUrl as string,
      });

      const newDishInfoDeepCopy: IDish = JSON.parse(
        JSON.stringify(newDishInfo)
      );
      newDishInfoDeepCopy.imageSrc = imageUrl;

      // console.log("imageUrl: " + imageUrl);
      // console.log("newDishInfo: " + newDishInfoDeepCopy.imageSrc);

      //Handle form upload
      const response = await fetch("../../../api/create_new_dish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDishInfoDeepCopy),
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

  const handleUpdateDish = async (e: React.FormEvent) => {
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
      const { uploadUrl } = await uploadResponse.json();

      //Upload Image to S3
      console.log("uploadUrl: ", uploadUrl);

      const s3Response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!s3Response.ok) throw new Error(s3Response.statusText);

      const s3DeleteResponse = await deleteFile(newDishInfo.imageSrc);
      if (!s3DeleteResponse.ok) throw new Error(s3DeleteResponse.statusText);

      const imageUrl = uploadUrl.split("?")[0]; // Extract clean URL
      setNewDishInfo({
        ...newDishInfo,
        imageSrc: imageUrl as string,
      });

      console.log(newDishInfo);
      //Handle form upload
      const response = await fetch("../../api/update_dish", {
        method: "PUT",
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

  const handleDeleteDish = async (e: React.FormEvent) => {
    // const s3DeleteResponse = await deleteFile(newDishInfo.imageSrc);
    try {
      const response = await fetch("../../api/delete_dish", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: newDishInfo.imageSrc,
          dbItemId: newDishInfo._id,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(response.statusText);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const deleteFile = async (fileKey: string) => {
    try {
      const response = await fetch("/api/delete-file", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: fileKey, dbItemId: "" }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // async function handleDelete() {
  //   try {
  //     const response = await fetch("/api/s3-delete", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ key }),
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to delete file.");
  //     }
  //     alert("File deleted successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error deleting file");
  //   }
  // }

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-y-1/2
        transition-transform duration-500 ease-in-out w-[80vh]] h-[60vh] p-6
         bg-white rounded-lg shadow-lg overflow-hidden z-30
        ${
          isVisible ? "left-1/2 -translate-x-1/2" : "-right-2 translate-x-full"
        } `}
    >
      <div className="flex justify-between items-center top-0 left-0 absolute w-full h-8 bg-blue-200">
        <button
          onClick={props.onClose}
          className="bg-blue-500 h-5/6 ml-1 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          <XMarkIcon className="w-auto h-full" />
        </button>
        {!props.isNewDish ? (
          <div>
            <button
              onClick={handleUpdateDish}
              className="mx-1 w-16 h-5/6 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Update
            </button>
            <button
              onClick={handleDeleteDish}
              className="w-16 h-5/6 bg-red-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={handleCreateNewDish}
            className="w-auto h-5/6 px-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Create Dish
          </button>
        )}
        <button
          onClick={props.onClose}
          className="bg-blue-500 h-5/6 mr-1 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          <EyeIcon className="w-auto h-full" />
        </button>
      </div>

      {/* Scrollable Content */}
      <form
        onSubmit={handleCreateNewDish}
        encType="multipart/form-data"
        className="overflow-y-auto max-h-full"
      >
        <div className="mt-6 grid grid-cols-2 gap-y-4 text-slate-800">
          <Image
            className="w-full col-span-2 h-40 object-cover rounded-md mb-4 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            src={previewImage}
            width={100}
            height={100}
            alt="Dish Image"
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          ></input>
          <input
            value={newDishInfo.name}
            className="col-span-2 p-1 text-2xl font-bold text-gray-800 mb-4 bg-slate-100 w-full"
            placeholder="Enter Dish Title"
            onChange={(e) =>
              setNewDishInfo({ ...newDishInfo, name: e.target.value })
            }
          />
          <textarea
            name="description"
            value={newDishInfo.description}
            placeholder="Enter Dish Description"
            className="px-1 col-span-2 text-xl text-gray-800 mb-4 bg-slate-100 w-full"
            onChange={(e) =>
              setNewDishInfo({ ...newDishInfo, description: e.target.value })
            }
          />
          <label>Category</label>
          <select
            value={newDishInfo.category}
            name="category"
            className="bg-slate-100"
            onChange={(e) =>
              setNewDishInfo({ ...newDishInfo, category: e.target.value })
            }
          >
            <option value="Starter">Starter</option>
            <option value="Main">Main</option>
            <option value="Fish">Fish</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Drinks">Drinks</option>
            <option value="Desserts">Desserts</option>
          </select>
          <label>Sub Category</label>
          <input
            name="subCategory"
            id="sub_category"
            type="text"
            placeholder="Enter Sub Category"
            className="pl-1 bg-slate-100"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
          <label>Price</label>
          <input
            value={newDishInfo.price}
            name="price"
            placeholder="Enter Dish Price"
            className="pl-1 bg-slate-100"
            onChange={(e) =>
              setNewDishInfo({
                ...newDishInfo,
                price: parseFloat(e.target.value),
              })
            }
          />
          <label>Score</label>
          <input
            name="score"
            type="number"
            value={newDishInfo.score}
            placeholder="Enter Dish Score"
            className="pl-1 bg-slate-100"
            onChange={(e) =>
              setNewDishInfo({ ...newDishInfo, score: +e.target.value })
            }
          />
          <label>Is Promoted</label>
          <input
            name="isPromoted"
            type="checkbox"
            value={newDishInfo.isPromoted.toString()}
            className="justify-self-start w-6"
            onChange={(e) =>
              setNewDishInfo({
                ...newDishInfo,
                isPromoted: e.target.checked,
              })
            }
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
            className="pl-1 bg-slate-100"
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
            className="pl-1 bg-slate-100"
            onChange={(e) => {
              handleInputValueChange(e);
            }}
          />
        </div>
        <ModifiersList editMode={true}></ModifiersList>
      </form>
    </div>
  );
};

export default DishExtendedInfoUpdateEdit;

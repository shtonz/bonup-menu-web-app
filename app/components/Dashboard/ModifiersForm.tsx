"use client";
import React, { use, useEffect, useState } from "react";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

type FormElement = {
  id: number;
  type: "checkbox" | "radio-group" | "multi-checkbox";
  label?: string;
  options?: { id: number; label: string }[];
};

type ModifiersDynamicFormProps = {
  isEditMode: boolean;
  isEditable: boolean;
};

const ModifiersDynamicForm: React.FC<ModifiersDynamicFormProps> = (props) => {
  const [isEditMode, setIsEditMode] = useState(props.isEditable);
  const [isEditable, setIsEditable] = useState(props.isEditable);
  const [elements, setElements] = useState<FormElement[]>([]);

  //Add New Element
  const addElement = (type: "checkbox" | "radio-group" | "multi-checkbox") => {
    //if (!isEditable) return;
    const newId = elements.length + 1;
    const newElement: FormElement = {
      id: newId,
      type,
      label: type !== "checkbox" ? `Group ${newId}` : `Checkbox ${newId}`,
      options:
        type !== "checkbox"
          ? [
              { id: 1, label: "Option 1" },
              { id: 2, label: "Option 2" },
            ]
          : undefined,
    };
    setElements([...elements, newElement]);
  };

  //Delete Element
  const deleteElement = (id: number) => {
    if (!isEditable) return;
    setElements(elements.filter((el) => el.id !== id));
  };

  //Update Label or Group Title
  const updateLabel = (elementId: number, newLabel: string) => {
    if (!isEditable) return;
    setElements(
      elements.map((el) =>
        el.id === elementId ? { ...el, label: newLabel } : el
      )
    );
  };

  //Update Option Label
  const updateOptionLabel = (
    elementId: number,
    optionId: number,
    newLabel: string
  ) => {
    if (!isEditable) return;
    setElements(
      elements.map((el) =>
        el.id === elementId && el.options
          ? {
              ...el,
              options: el.options.map((opt) =>
                opt.id === optionId ? { ...opt, label: newLabel } : opt
              ),
            }
          : el
      )
    );
  };

  //Add Option to Group
  const addOption = (id: number) => {
    if (!isEditable) return;
    setElements(
      elements.map((el) =>
        el.id === id && el.options
          ? {
              ...el,
              options: [
                ...el.options,
                {
                  id: el.options.length + 1,
                  label: `Option ${el.options.length + 1}`,
                },
              ],
            }
          : el
      )
    );
  };

  //Remove Option from Group
  const removeOption = (elementId: number, optionId: number) => {
    if (!isEditable) return;
    setElements(
      elements.map((el) =>
        el.id === elementId && el.options
          ? { ...el, options: el.options.filter((opt) => opt.id !== optionId) }
          : el
      )
    );
  };

  useEffect(() => {
    //console.log("Elements Updated:", elements);
    addElement("checkbox");
    //addElement("radio-group");
    //addElement("multi-checkbox");
  }, []);

  return (
    <div className="">
      {isEditMode && isEditable && (
        <div className="text-black flex justify-between mb-4">
          <h2 className="text-xl">Modifiers</h2>
          {/* <button
          onClick={() => setIsEditable(!isEditable)}
          className={`px-3 py-1 rounded-md text-white ${
            isEditable ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isEditable ? "Disable Editing" : "Enable Editing"}
        </button> */}
        </div>
      )}

      {/*Render Dynamic Elements */}
      <div className="mb-4 space-y-4">
        {elements.map((el) => (
          <div
            key={el.id}
            className={`${
              el.type === "checkbox"
                ? "flex items-center justify-between"
                : "p-4 border rounded-lg shadow-sm relative"
            }`}
          >
            {/*Checkbox (Single) */}
            {el.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  disabled={!isEditable}
                />
                <input
                  type="text"
                  value={el.label || ""}
                  onChange={(e) => updateLabel(el.id, e.target.value)}
                  className="border-b text-xl text-gray-800 bg-slate-100 focus:outline-none"
                  disabled={!isEditable}
                />
                {isEditable && (
                  <XCircleIcon
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => deleteElement(el.id)}
                  />
                )}
              </div>
            )}

            {/*Render Group Title (Radio & Multi-Choice) */}
            {el.type !== "checkbox" && (
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={el.label || ""}
                  onChange={(e) => updateLabel(el.id, e.target.value)}
                  className="border-b text-xl text-gray-800 bg-slate-100 focus:outline-none"
                  disabled={!isEditable}
                />
                {isEditable && (
                  <XCircleIcon
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => deleteElement(el.id)}
                  />
                )}
              </div>
            )}

            {/*Render Radio Group */}
            {el.type === "radio-group" && (
              <div className="mt-2">
                {el.options?.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`radio-${el.id}`}
                        className="w-5 h-5"
                        disabled={!isEditable}
                      />
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) =>
                          updateOptionLabel(el.id, option.id, e.target.value)
                        }
                        className="border-b text-lg text-gray-800 bg-slate-100 focus:outline-none"
                        disabled={!isEditable}
                      />
                    </label>
                    {isEditable && (
                      <XCircleIcon
                        className="w-4 h-4 text-gray-400 cursor-pointer"
                        onClick={() => removeOption(el.id, option.id)}
                      />
                    )}
                  </div>
                ))}
                {isEditable && (
                  <button
                    className="text-blue-500 mt-2 flex items-center"
                    onClick={() => addOption(el.id)}
                  >
                    <PlusCircleIcon className="w-5 h-5 mr-1" />
                    Add Option
                  </button>
                )}
              </div>
            )}

            {/*Render Multi-Choice Checkboxes */}
            {el.type === "multi-checkbox" && (
              <div className="mt-2">
                {el.options?.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        disabled={!isEditable}
                      />
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) =>
                          updateOptionLabel(el.id, option.id, e.target.value)
                        }
                        className="border-b text-xl text-gray-800 bg-slate-100 focus:outline-none"
                        disabled={!isEditable}
                      />
                    </label>
                    {isEditable && (
                      <XCircleIcon
                        className="w-4 h-4 text-gray-400 cursor-pointer"
                        onClick={() => removeOption(el.id, option.id)}
                      />
                    )}
                  </div>
                ))}
                {isEditable && (
                  <button
                    className="text-blue-500 mt-2 flex items-center"
                    onClick={() => addOption(el.id)}
                  >
                    <PlusCircleIcon className="w-5 h-5 mr-1" />
                    Add Option
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/*Buttons to Add New Elements */}
      {isEditMode && isEditable && (
        <div className="flex space-x-2 justify-center ">
          <button
            onClick={() => addElement("checkbox")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Add Checkbox
          </button>
          <button
            onClick={() => addElement("radio-group")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            + Add Radio Group
          </button>
          <button
            onClick={() => addElement("multi-checkbox")}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            + Add Multi-Choice
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifiersDynamicForm;

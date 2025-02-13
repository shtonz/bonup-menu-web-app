"use client";

import React, { useState } from "react";

/** Generate a unique ID (for demo). */
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/** Item types (only RADIO and MULTI_SELECT). */
const ITEM_TYPES = {
  RADIO: "RADIO",
  MULTI_SELECT: "MULTI_SELECT",
};

/**
 * Each toggle option in a Radio or Multi-select group.
 * - `label`: editable text
 * - `selected`: whether it's toggled on
 */
type Option = {
  id: string;
  label: string;
  selected: boolean;
};

/**
 * For a RADIO group:
 * - `title`: an editable group title
 * - `options`: toggles (one can be selected)
 */
type RadioItem = {
  id: string;
  type: "RADIO";
  title: string;
  options: Option[];
};

/**
 * For a MULTI_SELECT group:
 * - `title`: an editable group title
 * - `options`: toggles (multiple can be selected)
 */
type MultiSelectItem = {
  id: string;
  type: "MULTI_SELECT";
  title: string;
  options: Option[];
};

/** Union type for the allowed items. */
type ListItem = RadioItem | MultiSelectItem;

interface ListComponentProps {
  /**
   * When true, enables edit features:
   *  - Add new items (radio or multi-select)
   *  - Delete items
   *  - Edit group titles
   *  - Edit option text
   *  - Add new options
   */
  editMode?: boolean;
}

/**
 * A Next.js + Tailwind component displaying a list of:
 * - Radio groups (title + toggles in a 2-col grid, only one selected)
 * - Multi-select groups (title + toggles in a 2-col grid, any selected)
 *
 * - Each grid cell is the same width (1/2 the container width) and auto-stretched for same height.
 * - Horizontal gap is maintained between columns.
 * - Radio group text is truncated to one line with ellipsis. (You can extend that behavior to multi-select if desired.)
 */
const ModifiersList: React.FC<ListComponentProps> = ({ editMode = false }) => {
  // Example initial state
  const [items, setItems] = useState<ListItem[]>([
    {
      id: generateId(),
      type: ITEM_TYPES.MULTI_SELECT,
      title: "Toppings",
      options: [
        { id: generateId(), label: "Cool Cheese", selected: false },
        { id: generateId(), label: "Cashew Nuts", selected: false },
        { id: generateId(), label: "Truffle", selected: false },
        { id: generateId(), label: "Peperoni", selected: false },
        { id: generateId(), label: "Extra Sauce", selected: false },
        { id: generateId(), label: "Pineapple", selected: false },
        { id: generateId(), label: "Mushrooms", selected: false },
      ],
    },
    {
      id: generateId(),
      type: ITEM_TYPES.RADIO,
      title: "Crust",
      options: [
        {
          id: generateId(),
          label: "Traditional",
          selected: true,
        },
        { id: generateId(), label: "Deep Dish", selected: false },
        { id: generateId(), label: "Italian", selected: false },
      ],
    },
  ]);

  /**
   * Toggle a single option in a RADIO group (one selected at a time).
   */
  const handleRadioToggle = (itemId: string, optionId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId && item.type === ITEM_TYPES.RADIO) {
          return {
            ...item,
            options: item.options.map((opt) => ({
              ...opt,
              selected: opt.id === optionId,
            })),
          };
        }
        return item;
      })
    );
  };

  /**
   * Toggle an option in a MULTI_SELECT group (multiple can be selected).
   */
  const handleMultiToggle = (itemId: string, optionId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId && item.type === ITEM_TYPES.MULTI_SELECT) {
          return {
            ...item,
            options: item.options.map((opt) =>
              opt.id === optionId ? { ...opt, selected: !opt.selected } : opt
            ),
          };
        }
        return item;
      })
    );
  };

  /**
   * Add a new item (radio or multi-select).
   */
  const handleAddItem = (type: string) => {
    if (type === ITEM_TYPES.RADIO) {
      const newItem: RadioItem = {
        id: generateId(),
        type: "RADIO",
        title: "New Radio Group",
        options: [
          { id: generateId(), label: "Option 1", selected: false },
          { id: generateId(), label: "Option 2", selected: false },
        ],
      };
      setItems((prev) => [...prev, newItem]);
    } else if (type === ITEM_TYPES.MULTI_SELECT) {
      const newItem: MultiSelectItem = {
        id: generateId(),
        type: "MULTI_SELECT",
        title: "New Multi-Select Group",
        options: [
          { id: generateId(), label: "Option A", selected: false },
          { id: generateId(), label: "Option B", selected: false },
        ],
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  /**
   * Remove an entire group item.
   */
  const handleRemoveItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  /**
   * Add a new toggle option to a RADIO or MULTI_SELECT item.
   */
  const handleAddOption = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newOption: Option = {
            id: generateId(),
            label: "New Option",
            selected: false,
          };
          return {
            ...item,
            options: [...item.options, newOption],
          };
        }
        return item;
      })
    );
  };

  /**
   * Edit the "title" of a RADIO or MULTI_SELECT item in edit mode.
   */
  const handleTitleChange = (itemId: string, newTitle: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, title: newTitle };
        }
        return item;
      })
    );
  };

  /**
   * Edit the text label of an option in a RADIO or MULTI_SELECT item.
   */
  const handleLabelChange = (
    itemId: string,
    optionId: string,
    newLabel: string
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            options: item.options.map((opt) =>
              opt.id === optionId ? { ...opt, label: newLabel } : opt
            ),
          };
        }
        return item;
      })
    );
  };

  /**
   * Render a single item (RADIO or MULTI_SELECT).
   * For radio items, we apply one-line truncation classes.
   * You can do the same for multi-select if you want identical styling.
   */
  const renderItem = (item: ListItem) => {
    const isRadio = item.type === ITEM_TYPES.RADIO;

    return (
      <div className="text-black flex flex-col flex-grow">
        {/* Title (truncated if radio). If you also want multi-select truncated, apply the same classes. */}
        {editMode ? (
          <input
            type="text"
            value={item.title}
            onChange={(e) => handleTitleChange(item.id, e.target.value)}
            className={`mb-2 focus:outline-none w-full  bg-blue-100
                        ${isRadio ? "truncate" : ""}`}
          />
        ) : (
          <div
            className={`font-semibold mb-2 w-full 
                        ${isRadio ? "truncate" : ""}`}
            title={item.title}
          >
            {item.title}
          </div>
        )}

        {/* Grid of options: 2 columns, horizontal gap, stretch cells to match height */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-full items-stretch ">
          {item.options.map((option) => (
            <div
              key={option.id}
              className="flex flex-col justify-between h-full w-full "
            >
              {/* Option label (truncated if radio) */}
              {editMode ? (
                <input
                  type="text"
                  value={option.label}
                  onChange={(e) =>
                    handleLabelChange(item.id, option.id, e.target.value)
                  }
                  className={`mb-1 focus:outline-none w-full bg-blue-100
                              ${isRadio ? "truncate" : ""}`}
                />
              ) : (
                <div
                  className={`${isRadio ? "truncate" : ""} w-full `}
                  title={option.label}
                >
                  {editMode ? option.label : ""}
                </div>
              )}

              {/* The toggle button fills the full width. */}
              <button
                onClick={() => {
                  if (item.type === ITEM_TYPES.RADIO) {
                    handleRadioToggle(item.id, option.id);
                  } else {
                    handleMultiToggle(item.id, option.id);
                  }
                }}
                className={`px-4 py-1 mt-auto rounded-md text-black w-full 
                  ${option.selected ? "bg-green-400" : "bg-gray-200"}
                `}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>

        {/* Add new option if in edit mode */}
        {editMode && (
          <button
            onClick={() => handleAddOption(item.id)}
            className="mt-2 px-2 py-1 bg-blue-100 rounded hover:bg-blue-200 w-fit"
          >
            + Add Option
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-3xl mt-5">
      {items.map((item) => (
        <div key={item.id} className="flex items-start justify-between mb-6">
          {/* Render the item content */}
          {renderItem(item)}

          {/* "x" button to delete item (only in edit mode) */}
          {editMode && (
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="ml-4 text-gray-700 bg-gray-200 hover:bg-gray-300 p-2 rounded-md h-fit"
              title="Delete"
            >
              x
            </button>
          )}
        </div>
      ))}

      {/* Add new items if in edit mode */}
      {editMode && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleAddItem(ITEM_TYPES.RADIO)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Radio Group
          </button>
          <button
            onClick={() => handleAddItem(ITEM_TYPES.MULTI_SELECT)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Multi-Select
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifiersList;

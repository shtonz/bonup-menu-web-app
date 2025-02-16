"use client";

import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useOrderItems } from "@/app/bonup/menu/OrderItemsContext";

type OrderListProps = {
  title: string;
  avatar: string;
  status: string;
};

const ReviewOrder: React.FC<OrderListProps> = ({ title, avatar, status }) => {
  //context
  const {
    orderItems,
    setOrderItems,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
  } = useOrderItems();

  const handleSendOrderNow = () => {
    console.log(orderItems);
  };

  //Increase item count
  const incrementCount = (uiId: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.dishProps.uiId === uiId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  //Decrease item count or remove item if count is 1
  const decrementCount = (uiId: number) => {
    setOrderItems(
      orderItems
        .map((item) =>
          item.dishProps.uiId === uiId
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      {/*List Title */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-gray-800 text-lg font-semibold">{title}</h2>
          <span className="text-sm text-gray-500">{status}</span>
        </div>
      </div>

      {/*Order Items */}
      <div className="space-y-2">
        {orderItems &&
          orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-2"
            >
              {/* Text Elements */}
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">
                  {item.dishProps.name}
                </span>
                <span className="line-clamp-1 text-sm text-gray-500">
                  {item.dishProps.description}
                </span>
              </div>

              {/* Counter */}
              <div className="flex items-center space-x-2">
                {item.count === 1 ? (
                  <TrashIcon
                    className="w-6 h-6 text-red-500 cursor-pointer"
                    onClick={() => decrementCount(item.dishProps.uiId)}
                  />
                ) : (
                  <MinusCircleIcon
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={() => decrementCount(item.dishProps.uiId)}
                  />
                )}

                <span className="text-gray-800 w-6 text-center">
                  {item.count}
                </span>

                <PlusCircleIcon
                  className="w-6 h-6 text-green-500 cursor-pointer"
                  onClick={() => incrementCount(item.dishProps.uiId)}
                />
              </div>
            </div>
          ))}
      </div>

      {/*Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleSendOrderNow}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send Order Now
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
          Wait for Others
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;

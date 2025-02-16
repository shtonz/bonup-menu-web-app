import { IDish } from "@/app/data/models/DishModel";
import React, { createContext, useContext, useState } from "react";

export type OrderItem = {
  id: string;
  dishProps: IDish;
  count: number;
};

interface OrderItemsContextType {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  addOrderItem: (orderItem: OrderItem) => void;
  removeOrderItem: (id: string) => void;
  updateOrderItem: (orderItem: OrderItem) => void;
}

const OrderItemsContext = createContext<OrderItemsContextType>({
  orderItems: [],
  setOrderItems: () => {}, // No-op default function
  addOrderItem: () => {}, // No-op default function
  removeOrderItem: () => {}, // No-op default function
  updateOrderItem: () => {}, // No-op default function
});

export const OrderItemsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addOrderItem = (orderItem: OrderItem) => {
    setOrderItems([...orderItems, orderItem]);
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(orderItems.filter((orderItem) => orderItem.id !== id));
  };

  const updateOrderItem = (orderItem: OrderItem) => {
    setOrderItems(
      orderItems.map((d) => (d.id === orderItem.id ? orderItem : d))
    );
  };

  const value = {
    orderItems,
    setOrderItems,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
  };

  return (
    <OrderItemsContext.Provider value={value}>
      {children}
    </OrderItemsContext.Provider>
  );
};

export const useOrderItems = (): OrderItemsContextType => {
  const context = useContext(OrderItemsContext);
  if (context === undefined) {
    throw new Error("useDishes must be used within a DishesProvider");
  }
  return context;
};

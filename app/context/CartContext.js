"use client"; // 必須：クライアントで状態を管理

import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item,price) => {
    
    setCartItems([...cartItems, {...item,price}]);
    console.log(item, price);
    alert("カートに追加しました");
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("現在のカートの内容:", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {console.log("CartProvider cartItems:", cartItems)}
      {children}
    </CartContext.Provider>
  );
}

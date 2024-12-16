"use client"; // 必須：クライアントコンポーネントを使用
import Link from 'next/link';
import { useContext ,useEffect} from "react";
import { CartContext } from "@/app/context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  return (
    <div className="p-4">
      {/* <h2>カート</h2> */}
      <h2 className="text-2xl font-bold mb-4">Order items</h2>
      {cartItems.length === 0 ? (
        <p>カートの中身は空です。</p>
      ) : (
        <ul className="divide-y divide-gray-200">
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-2">
            <div className="flex items-center">
              {/* <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded mr-4" /> */}
              <span>{index+1}.</span>
              <span>{item.name}</span>
            </div>
            <div>
              <span className="font-bold">{item.price}円</span>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 ml-4"
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
    <Link href="/order" passHref>
  <div className="bg-red-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-200">
    注文する
  </div>
</Link>
    </div>
  );
}

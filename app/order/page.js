"use client";
import Link from 'next/link';
import { useState, useContext } from "react";
import { CartContext } from "@/app/context/CartContext"; // カートコンテキストをインポート
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseApp from "@/app/firebaseConfig"; // 初期化済みFirebaseアプリをインポート

export default function OrderForm() {
  const { cartItems } = useContext(CartContext); // カートデータ取得
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0); // 合計金額計算

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    arrivalTime: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 注文データ
    const orderData = {
      ...formData,
      cartItems,
      totalAmount,
    };

    console.log("注文データ:", orderData);

    try {
        const db = getFirestore(firebaseApp); // FirebaseアプリからFirestoreインスタンスを取得
        const ordersCollection = collection(db, "orders");
        await addDoc(ordersCollection, orderData); // Firestoreに保存
        console.log("注文データが保存されました:", orderData);
        setIsSubmitted(true);
      } catch (error) {
        console.error("注文データの保存中にエラーが発生しました:", error);
      }
    // Firebase保存処理（次ステップで実装）
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex justify-center items-center flex-col px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Thank you for your order!
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        お店にてお待ちしています！
      </p>
      <Link href="/">
        <button className="bg-red-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-200">
          トップに戻る
        </button>
      </Link>
    </div>
    </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
      注文フォーム
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 名前入力 */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          お名前
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* 電話番号入力 */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          電話番号
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* 来店予定時間 */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          来店予定時間
          <span className="block text-sm text-gray-500">
            (30分以内に来店してください)
          </span>
        </label>
        <input
          type="time"
          name="arrivalTime"
          onChange={handleChange}
          value={formData.arrivalTime}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* 支払い情報 */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          お支払い情報
        </label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Credit card Number"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none mb-2"
          required
        />
        <input
          type="text"
          name="cardExpiry"
          value={formData.cardExpiry}
          onChange={handleChange}
          placeholder="EXP"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
      </div>

      {/* 合計金額 */}
      <div className="flex justify-between items-center font-bold text-gray-700">
        <span>合計</span>
        <span className="text-lg text-gray-900">{totalAmount} 円</span>
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-600 transition duration-200"
      >
        注文を送信
      </button>
    </form>
  </div>
    // <form onSubmit={handleSubmit}>
    //   <h2>注文フォーム</h2>

    //   <label>
    //     お名前:
    //     <input
    //       type="text"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       required
    //     />
    //   </label>
    //   <br />

    //   <label>
    //     電話番号:
    //     <input
    //       type="text"
    //       name="phone"
    //       value={formData.phone}
    //       onChange={handleChange}
    //       required
    //     />
    //   </label>
    //   <br />

    //   <label>
    //     クレジットカード番号:
    //     <input
    //       type="text"
    //       name="cardNumber"
    //       value={formData.cardNumber}
    //       onChange={handleChange}
    //       required
    //     />
    //   </label>
    //   <br />

    //   <label>
    //     カード有効期限 (MM/YY):
    //     <input
    //       type="text"
    //       name="cardExpiry"
    //       value={formData.cardExpiry}
    //       onChange={handleChange}
    //       required
    //     />
    //   </label>
    //   <br />

    //   <label>
    //     来店時間:
    //     <input
    //       type="datetime-local"
    //       name="arrivalTime"
    //       value={formData.arrivalTime}
    //       onChange={handleChange}
    //       required
    //     />
    //   </label>
    //   <br />

    //   <p>合計金額: {totalAmount}円</p> {/* 合計金額表示 */}

    //   <button type="submit">注文を送信</button>
    // </form>
  );
}

"use client";
import Link from 'next/link';
import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "@/app/firebaseConfig";

export default function HomePage() {
  const [storeStatus, setStoreStatus] = useState("普通");
  const [products, setProducts] = useState([]);

  const db = getFirestore(firebaseApp);
  // 混雑状況を取得する関数
  const fetchStoreStatus = async () => {
    try {
      const docRef = doc(db, "settings", "storeStatus");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStoreStatus(docSnap.data().storeStatus);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  const { addToCart } = useContext(CartContext);
  // 商品情報を取得する関数
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("商品データの取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchStoreStatus();
    fetchProducts();
  }, []);

  // 価格を動的に変更
  const getPrice = (product) => {
    switch (storeStatus) {
      case "混んでいる":
        return product.prices.high;
      case "空いている":
        return product.prices.low;
      default:
        return product.prices.mid;
    }
  };

  const getPriceColor = () => {
    switch (storeStatus) {
      case "混んでいる":
        return "text-[#EE6352]"; // 混んでいる
      case "空いている":
        return "text-[#63b0cd]"; // 空いている
      default:
        return "text-[#EDD892]"; // 普通
    }
  };

  return (
    <div>
     < h2 className="text-xl font-bold my-4 text-center">商品一覧</h2>
      <h2>現在の混雑状況: {storeStatus}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product,index) => (
          <li key={product.id} className="border rounded-lg shadow p-4 flex">
          {/* <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded mr-4" /> */}
          <img src={`/img/sand${(index % 3) + 1}.png`} alt={product.name} className="w-20 h-20 rounded mr-4" />
            <div className='flex-1'>
            <h3 className="text-lg font-semibold">{product.name}</h3>
          {/* <p className="text-gray-500">{product.description}</p> */}
          <p className={`font-bold ${getPriceColor()}`}>{getPrice(product)}円</p>
            <button onClick={() => addToCart(product,getPrice(product))} className="bg-red-500 text-white py-1 px-3 rounded mt-2">
              カートに追加
            </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-8">
    <Link href="/cart" passHref>
  <div className="bg-red-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-200">
    カートに移動
  </div>
</Link>
  </div>
    </div>
    
  );
}


// const ProductList = () => {
//   const { addToCart } = useContext(CartContext);

//   const products = [
//     { id: 1, name: "ハムサンド", price: 1100 },
//     { id: 2, name: "ツナサンド", price: 1200 },
//     { id: 3, name: "野菜サンド", price: 1000 },
//   ];

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     alert(`${product.name} をカートに追加しました！`);
//   };

//   return (
//     <div>
//       <h1>商品一覧</h1>
//       <Link href="./cart">カートを見る</Link>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} - ¥{product.price}
//             <button onClick={() => handleAddToCart(product)}>カートに追加</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

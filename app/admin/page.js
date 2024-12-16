"use client";

import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "@/app/firebaseConfig";

const AdminPage = () => {
    const [storeStatus, setStoreStatus] = useState("普通");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    prices: {
      low: 100,
      mid: 200,
      high: 300
    }
  });
  const db = getFirestore(firebaseApp);

  // Firestoreから商品データを取得
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, [db]);

  // 商品をFirestoreに追加
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.prices.low || !newProduct.prices.mid || !newProduct.prices.high) {
      alert("全てのフィールドを入力してください！");
      return;
    }
    const productData = {
      name: newProduct.name,
      prices: {
        low: parseInt(newProduct.prices.low),
        mid: parseInt(newProduct.prices.mid),
        high: parseInt(newProduct.prices.high),
      },
    };

    try {
      await addDoc(collection(db, "products"), productData);
      alert("商品が追加されました！");
      setNewProduct({ name: "", prices: { low: "", mid: "", high: "" } });
    } catch (error) {
      console.error("商品追加中にエラーが発生しました:", error);
    }
  };

  // 商品をFirestoreから削除
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("商品が削除されました！");
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("商品削除中にエラーが発生しました:", error);
    }
  };
  // 混雑状況をFirestoreに保存する関数
  const updateStoreStatus = async (status) => {
    try {
      const docRef = doc(db, "settings", "storeStatus");  // settingsコレクションのstoreStatusドキュメントを指定
      await updateDoc(docRef, {
        storeStatus: status,
      });
      setStoreStatus(status);  // 状態を更新
      alert("混雑状況が更新されました");
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <h1>管理者様用、掲載内容変更ページ</h1>
      <h2 class="my-5 font-semibold">・現在の混雑状況: {storeStatus}</h2>
      <div>
        <button onClick={() => updateStoreStatus("混んでいる")} class="bg-[#EE6352] hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-full">混んでいる</button>
        <button onClick={() => updateStoreStatus("普通")} class="bg-[#EDD892] hover:bg-blue-300 text-white font-bold py-2 px-4 mx-4 rounded-full">普通</button>
        <button onClick={() => updateStoreStatus("空いている")} class="bg-[#63b0cd] hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-full">空いている</button>
      </div>
      <section>
        <h2 class="my-5 font-semibold">・商品追加</h2>
        <input
          type="text"
          placeholder="商品名"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          class="w-32 rounded-md bg-white mx-3 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <input
          type="number"
          placeholder="価格 (空いている)"
          value={newProduct.prices.low}
          onChange={(e) => setNewProduct({ ...newProduct, prices: { ...newProduct.prices, low: e.target.value } })}
          class="w-32 rounded-md bg-white mx-3 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <input
          type="number"
          placeholder="価格 (普通)"
          value={newProduct.prices.mid}
          onChange={(e) => setNewProduct({ ...newProduct, prices: { ...newProduct.prices, mid: e.target.value } })}
          class="w-32 rounded-md bg-white mx-3 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <input
          type="number"
          placeholder="価格 (混んでいる)"
          value={newProduct.prices.high}
          onChange={(e) => setNewProduct({ ...newProduct, prices: { ...newProduct.prices, high: e.target.value } })}
          class="w-32 rounded-md bg-white mx-3 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        {/* <button onClick={handleAddProduct}>商品を追加</button> */}
        <button onClick={handleAddProduct} className="text-white bg-red-500 py-1 px-2 mx-4 my-2 rounded">
                ➕商品を追加
        </button>
      </section>

      <section>
        <h2 class="my-5 font-semibold">・掲載されている商品一覧</h2>
        <ul>
          {products.map((product,index) => (
            <li key={product.id} className="ml-2">
              {index+1}.{product.name} ・・・ 低: ¥{product.prices.low}, 中: ¥{product.prices.mid}, 高: ¥{product.prices.high}
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="text-white bg-red-500 py-1 px-1 mx-4 my-2 rounded"
              >
                ✖削除
              </button>
              {/* <button onClick={() => handleDeleteProduct(product.id)}>削除</button> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPage;


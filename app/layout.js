import CartProvider from "@/app/context/CartContext";
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="bg-blue-300 text-white flex items-center p-4">
          <button className="text-lg">☰</button>
            <Link href="./"className="text-xl font-bold no-underline text-center m-auto" >The Sandwich Shop</Link>
          </header>
          <main>{children}</main>
          {/* <footer>
            <p>© 2024 サンドイッチ屋さん</p>
          </footer> */}
          <footer className="fixed bottom-0 left-0 right-0 bg-blue-300 text-white p-2 flex justify-around">
  <button>
  <Link href="./"className="text-m no-underline text-center m-auto" >🏠 HOME</Link>
    </button>
  <button>
  <Link href="./"className="text-m no-underline text-center m-auto" >➕ ORDER</Link>
    </button>
  <button>
  <Link href="./cart"className="text-m no-underline text-center m-auto" > 🛒 CART</Link>
   
    </button>
</footer>
        </CartProvider>
      </body>
    </html>
  );
}


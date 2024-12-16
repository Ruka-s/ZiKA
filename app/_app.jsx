// pages/_app.js
import { CartProvider } from '../CartContext.jsx';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

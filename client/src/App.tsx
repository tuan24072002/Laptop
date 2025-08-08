import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart";
import { Product } from "./types/Product";
import AdminPage from "./pages/AdminPage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Login from "./components/Login";
import { HttpService } from "./services/http/HttpService";
import { setShowEmailVerification } from "./slice/auth/Auth.slice";
import Verify from "./components/Verify";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);
  const authState = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  HttpService.initialize();
  useEffect(() => {
    if (appState.logined && !appState.user?.isVerified) {
      dispatch(setShowEmailVerification(true));
    } else {
      dispatch(setShowEmailVerification(false));
    }
  }, [appState.logined, appState.user?.isVerified, dispatch]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartOpen={() => setIsCartOpen(true)} />

        <main>
          {/* {renderCurrentPage()} */}
          <Routes>
            <Route
              path="/"
              element={<HomePage onProductView={handleProductView} />}
            />
            <Route
              path="/products"
              element={<ProductsPage onProductView={handleProductView} />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <Footer />

        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
        />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      {authState.showUserLogin && <Login />}
      {authState.showEmailVerification && !appState.user?.isVerified && (
        <Verify />
      )}
      <Toaster />
    </CartProvider>
  );
}

export default App;

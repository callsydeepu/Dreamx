import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LandingPage } from "./screens/LandingPage";
import { ServicesPage } from "./screens/ServicesPage";
import { DashboardPage } from "./screens/DashboardPage";
import { ProductPage } from "./screens/ProductPage";
import { CartPage } from "./screens/CartPage";
import { AuthPage } from "./screens/AuthPage";
import { ProfilePage, UserProfilePage } from "./screens/ProfilePage";
import { CheckoutPage } from "./screens/CheckoutPage";
import { OrderSuccessPage } from "./screens/OrderSuccessPage";
import { AdminPage } from "./screens/AdminPage";
import { BrandPage } from "./screens/BrandPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:productSlug" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/brand/:brandSlug" element={<BrandPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/brand/:brandSlug" element={<BrandPage />} />
            {/* Fallback route for any unmatched paths */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
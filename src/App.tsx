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
import { ProfilePage } from "./screens/ProfilePage";
import { BrandProfilePage } from "./screens/BrandProfilePage";

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
            <Route path="/brand/:brandName" element={<BrandProfilePage />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:productSlug" element={<ProductPage />} />
            {/* Fallback route for any unmatched paths */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
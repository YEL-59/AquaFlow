import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Storefront & Public Pages
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { DeliveryAreas } from "./pages/DeliveryAreas";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Subscriptions } from "./pages/Subscriptions";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { TrackOrder } from "./pages/TrackOrder";

// Customer Account Pages
import { Account } from "./pages/Account";

// Auth Pages
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";

// Admin Dashboard Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";

// Delivery Rider Dashboard Pages
import { DeliveryDashboard } from "./pages/delivery/DeliveryDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function AppRoutes({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  handleAddToCart,
  totalCartCount,
}) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDeliveryRoute = location.pathname.startsWith("/delivery");

  // 1. Dedicated Full-screen Admin Portal (Sidebar & Content workspace layout)
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminDashboard />} />
        <Route path="/admin/inventory" element={<AdminDashboard />} />
        <Route path="/admin/jar-management" element={<AdminDashboard />} />
        <Route path="/admin/subscriptions" element={<AdminDashboard />} />
        <Route path="/admin/deliveries" element={<AdminDashboard />} />
        <Route path="/admin/staff" element={<AdminDashboard />} />
        <Route path="/admin/suppliers" element={<AdminDashboard />} />
        <Route path="/admin/finance" element={<AdminDashboard />} />
        <Route path="/admin/reports" element={<AdminDashboard />} />
        <Route path="/admin/audit-logs" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  // 2. Dedicated Mobile-First Delivery Rider Portal
  if (isDeliveryRoute) {
    return (
      <Routes>
        <Route path="/delivery" element={<DeliveryDashboard />} />
        <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
        <Route path="/delivery/my-deliveries" element={<DeliveryDashboard />} />
        <Route path="/delivery/delivery/:id" element={<DeliveryDashboard />} />
        <Route path="/delivery/cash-reconciliation" element={<DeliveryDashboard />} />
        <Route path="/delivery/*" element={<DeliveryDashboard />} />
      </Routes>
    );
  }

  // 3. Public Storefront & Customer Portal with Navbar & Footer
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-200">
      <Navbar cartCount={totalCartCount} />
      <main className="flex-1">
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
          <Route path="/products/:slug" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/delivery-areas" element={<DeliveryAreas onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                onClearCart={onClearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                onClearCart={onClearCart}
              />
            }
          />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/track-order" element={<TrackOrder />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Customer Account Sub-Routes */}
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Account />} />
          <Route path="/account/subscriptions" element={<Account />} />
          <Route path="/account/addresses" element={<Account />} />
          <Route path="/account/payments" element={<Account />} />
          <Route path="/account/support" element={<Account />} />
          <Route path="/account/*" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <AppRoutes
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              handleAddToCart={handleAddToCart}
              totalCartCount={totalCartCount}
            />
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

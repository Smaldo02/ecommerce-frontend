import "./App.css";

import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import AdminLayout from "./layout/admin-layout/AdminLayout";
import AdminUsers from "./pages/admin/Users/AdminUsers";
import AdminProducts from "./pages/admin/Products/AdminProducts";
import Products from "./pages/products/Products";
import ProductsDetails from "./pages/product-details/ProductsDetails";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;

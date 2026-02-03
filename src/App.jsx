import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// COMPONENTS
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import FAQ from './components/FAQ'; // Import FAQ

// PAGES
import About from './pages/About';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Legal from './pages/Legal';

// HOME PAGE LAYOUT
// 1. Hero (Video)
// 2. Products
// 3. FAQ (Questions)
// 4. Enquiry Form (Contact)
const Home = () => (
  <div>
    <Hero />
    <ProductSection />
    <FAQ />           {/* <--- FAQ is now BEFORE the Enquiry Form */}
    <EnquiryForm />   {/* <--- Enquiry Form is at the bottom */}
  </div>
);

export default function App() {
  const user = null; // Placeholder for user auth

  return (
    // !!! CRITICAL FIX: Everything must be inside <Router> !!!
    <Router>
      
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#333', color: '#fff' },
      }} />

      <div className="bg-black min-h-screen font-sans text-white flex flex-col justify-between">
        
        {/* Navbar is NOW inside the Router -> No more White Screen */}
        <Navbar user={user} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-aimasterji" element={<About />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
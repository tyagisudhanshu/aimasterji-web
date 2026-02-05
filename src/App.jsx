import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// COMPONENTS
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeReviews from './components/HomeReviews';
import ProductSection from './components/ProductSection';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import FAQ from './components/FAQ'; // Import FAQ
import WhatsAppButton from './components/WhatsAppButton';

// PAGES
import About from './pages/About';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Legal from './pages/Legal';
import SalePage from './pages/SalePage';
import SupportPage from './pages/SupportPage'

// HOME PAGE LAYOUT
// 1. Hero (Video)
// 2. Products
// 3. FAQ (Questions)
// 4. Enquiry Form (Contact)
const Home = () => (
  <div>
    <Hero />
    <HomeReviews />
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
            <Route path="/sale" element={<SalePage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </main>

        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}
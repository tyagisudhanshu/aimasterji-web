import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';

// PAGES (Only the ones we know work)
import About from './pages/About';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Legal from './pages/Legal';

// Home Component
const Home = () => (
  <div>
    <Hero />
    <ProductSection />
    <EnquiryForm />
  </div>
);

export default function App() {
  const user = null; 

  return (
    <Router>
      <div className="bg-black min-h-screen font-sans text-white flex flex-col justify-between">
        <Navbar user={user} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-aimasterji" element={<About />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* I commented out the new pages to stop the crash */}
            {/* <Route path="/console" element={<ControlPanel />} /> */}
            {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
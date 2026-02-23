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
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Legal from './pages/Legal';
import SalePage from './pages/SalePage';
import SupportPage from './pages/SupportPage';
import AILab from './pages/AILab';
import ControlPanel from './pages/ControlPanel';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentResultPage from './pages/PaymentResultPage';

// AUTH
import { AuthProvider } from './context/AuthContext';

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
  return (
    <AuthProvider>
    <Router>
      
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#333', color: '#fff' },
      }} />

      <div className="bg-black min-h-screen font-sans text-white flex flex-col justify-between">

        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-aimasterji" element={<About />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/try-it-out" element={<AILab />} />
            <Route path="/console" element={<ControlPanel />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/payment-result" element={<PaymentResultPage />} />
          </Routes>
        </main>

        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}
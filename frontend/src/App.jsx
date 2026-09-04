import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImpactReceipt from './components/ImpactReceipt';
import ToastContainer from './components/ToastContainer';
import MobileBottomNav from './components/MobileBottomNav';
import PwaInstallBanner from './components/PwaInstallBanner';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import TrackingDashboard from './pages/TrackingDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import ImpactPage from './pages/ImpactPage';
import AuthPage from './pages/AuthPage';
import AccessDenied from './pages/AccessDenied';
import CertificatesDashboard from './pages/CertificatesDashboard';
import CertificateVerifyPage from './pages/CertificateVerifyPage';

// Professional 1.5s Site Startup Loading Overlay
function SiteStartupLoader() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('annsetu_loaded_splash');
  });

  useEffect(() => {
    if (loading) {
      sessionStorage.setItem('annsetu_loaded_splash', 'true');
      const timer = setTimeout(() => setLoading(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#064e3b] text-white flex flex-col items-center justify-center p-4 animate-out fade-out duration-500">
      <div className="space-y-4 text-center animate-pulse">
        <div className="relative bg-white rounded-3xl p-3 shadow-2xl inline-block border-2 border-amber-400">
          <img src="/annsetu_logo.png" alt="AnnSetu" className="h-16 w-auto object-contain" />
        </div>
        <h1 className="text-3xl font-black font-outfit tracking-tight">
          Ann<span className="text-orange-400">setu</span>
        </h1>
        <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
          Connecting surplus with smiles...
        </p>

        <div className="flex items-center justify-center space-x-2 pt-2 text-amber-400">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping delay-100"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping delay-200"></span>
        </div>
      </div>
    </div>
  );
}

// Component to guarantee homepage appears first every time someone opens the website
function AlwaysOpenHomepageOnVisit() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const visited = sessionStorage.getItem('annsetu_visited_session');
    if (!visited) {
      sessionStorage.setItem('annsetu_visited_session', 'true');
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, location]);

  return null;
}

function AppContent() {
  const { selectedReceiptDonation, setSelectedReceiptDonation } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#064e3b] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-950 overflow-x-hidden">
      <SiteStartupLoader />
      <AlwaysOpenHomepageOnVisit />
      <Navbar />
      <ToastContainer />
      <PwaInstallBanner />

      <main className="flex-1 pb-20 lg:pb-0">
        <Routes>
          {/* Public Homepage always opens first */}
          <Route path="/" element={<Home />} />
          
          {/* Authentication Routes */}
          <Route path="/auth/:roleParam" element={<AuthPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Role-Based Protected Routes */}
          <Route 
            path="/donor" 
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <DonorDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/ngo" 
            element={
              <ProtectedRoute allowedRoles={['ngo']}>
                <NgoDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/delivery" 
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <DeliveryDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/certificates" 
            element={
              <ProtectedRoute allowedRoles={['donor', 'ngo', 'volunteer', 'admin']}>
                <CertificatesDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Requirement 1: 100% PUBLIC Impact Page & Verification */}
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/track" element={<TrackingDashboard />} />
          <Route path="/certificate/verify/:code" element={<CertificateVerifyPage />} />

          {/* Fallback to Homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Global Impact Receipt Modal */}
      {selectedReceiptDonation && (
        <ImpactReceipt
          donation={selectedReceiptDonation}
          onClose={() => setSelectedReceiptDonation(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;

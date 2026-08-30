import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function AppContent() {
  const { selectedReceiptDonation, setSelectedReceiptDonation } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#064e3b] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-950 overflow-x-hidden">
      <Navbar />
      <ToastContainer />
      <PwaInstallBanner />

      <main className="flex-1 pb-20 lg:pb-0">
        <Routes>
          {/* Requirement 1: Public Homepage always opens first without login */}
          <Route path="/" element={<Home />} />
          
          {/* Requirement 2, 5, 6, 7, 8: Authentication Routes */}
          <Route path="/auth/:roleParam" element={<AuthPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Requirement 11, 14, 15: Role-Based Protected Routes */}
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

          {/* Requirement 25: Public Tracking & Impact */}
          <Route path="/track" element={<TrackingDashboard />} />
          <Route path="/impact" element={<ImpactPage />} />

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

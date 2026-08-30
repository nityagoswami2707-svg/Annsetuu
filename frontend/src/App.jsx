import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImpactReceipt from './components/ImpactReceipt';
import ToastContainer from './components/ToastContainer';
import MobileBottomNav from './components/MobileBottomNav';
import PwaInstallBanner from './components/PwaInstallBanner';

import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import TrackingDashboard from './pages/TrackingDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import ImpactPage from './pages/ImpactPage';

function AppContent() {
  const { selectedReceiptDonation, setSelectedReceiptDonation } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#064e3b] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-950 overflow-x-hidden">
      <Navbar />
      <ToastContainer />
      <PwaInstallBanner />

      <main className="flex-1 pb-20 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/ngo" element={<NgoDashboard />} />
          <Route path="/track" element={<TrackingDashboard />} />
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/impact" element={<ImpactPage />} />
          {/* Catch-all fallback: redirect to homepage */}
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

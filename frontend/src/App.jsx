import React, { useEffect } from 'react';
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
import AuthLanding from './pages/AuthLanding';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import FundDonorDashboard from './pages/FundDonorDashboard';
import AdminDashboard from './pages/AdminDashboard';

import TrackingDashboard from './pages/TrackingDashboard';
import ImpactPage from './pages/ImpactPage';

function InitialHomepageRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasOpenedSession = sessionStorage.getItem('annsetu_session_opened');
    if (!hasOpenedSession) {
      sessionStorage.setItem('annsetu_session_opened', 'true');
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
      <InitialHomepageRedirect />
      <Navbar />
      <ToastContainer />
      <PwaInstallBanner />

      <main className="flex-1 pb-20 lg:pb-0">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/track" element={<TrackingDashboard />} />

          {/* Protected Role Routes */}
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
            path="/volunteer"
            element={
              <ProtectedRoute allowedRoles={['volunteer', 'delivery']}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery"
            element={
              <ProtectedRoute allowedRoles={['volunteer', 'delivery']}>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fund-donor"
            element={
              <ProtectedRoute allowedRoles={['fund_donor']}>
                <FundDonorDashboard />
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />

      {selectedReceiptDonation && (
        <ImpactReceipt
          donation={selectedReceiptDonation}
          onClose={() => setSelectedReceiptDonation(null)}
        />
      )}
    </div>
  );
};

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

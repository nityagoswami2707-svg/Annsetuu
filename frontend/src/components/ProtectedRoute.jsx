import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from './AnnsetuMotionBackground';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role } = useApp();
  const navigate = useNavigate();

  // If user is not logged in, redirect to authentication page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const currentRole = user.role || role || 'donor';

  // Check if current role is authorized for this route
  const isAuthorized = allowedRoles.includes(currentRole) || currentRole === 'admin';

  if (!isAuthorized) {
    const userRoleDashboard = currentRole === 'admin' ? '/admin' :
                              currentRole === 'ngo' ? '/ngo' :
                              currentRole === 'volunteer' ? '/volunteer' :
                              currentRole === 'fund_donor' ? '/fund-donor' : '/donor';

    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
        
        {/* ANIMATED MOTION BACKGROUND */}
        <AnnsetuMotionBackground type="home" />

        <div className="max-w-md w-full mx-auto px-4 relative z-10 space-y-6">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-200 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-red-100 border border-red-300 text-red-600 flex items-center justify-center shadow-md">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Unauthorized Route Attempt
              </span>
              <h2 className="text-2xl font-black font-outfit text-red-950">
                Access Denied
              </h2>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                “You don't have permission to access this section.”
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-bold text-gray-700">
              Your Current Active Role: <span className="text-green-800 uppercase">{currentRole.replace('_', ' ')}</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate(userRoleDashboard)}
                className="w-full min-h-[48px] px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
              >
                <Home className="w-4 h-4" />
                <span>Return to My Dashboard</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

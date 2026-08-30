import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { currentUser, t } = useApp();
  const location = useLocation();

  if (!currentUser) {
    // Map path to auth portal
    let authPortal = 'donor';
    if (location.pathname.startsWith('/ngo')) authPortal = 'ngo';
    else if (location.pathname.startsWith('/delivery')) authPortal = 'volunteer';
    else if (location.pathname.startsWith('/admin')) authPortal = 'admin';

    return <Navigate to={`/auth/${authPortal}`} state={{ from: location }} replace />;
  }

  // Admin has full platform access
  const isAdmin = currentUser.role === 'admin';
  const isAllowed = isAdmin || allowedRoles.includes(currentUser.role);

  if (!isAllowed) {
    return <Navigate to="/access-denied" replace />;
  }

  return (
    <div className="relative">
      {isAdmin && location.pathname !== '/admin' && (
        <div className="bg-purple-950 text-purple-200 text-xs font-black py-1.5 px-4 text-center border-b border-purple-800 flex items-center justify-center space-x-2 relative z-40">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>{t('viewingAsAdmin')} ({currentUser.name})</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default ProtectedRoute;

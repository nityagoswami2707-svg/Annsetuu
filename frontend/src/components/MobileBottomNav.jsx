import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import NotificationModal from './NotificationModal';
import { 
  Home as HomeIcon, 
  Utensils, 
  MapPin, 
  Bell, 
  User, 
  Building2, 
  Truck, 
  ShieldCheck, 
  BarChart3,
  CheckSquare
} from 'lucide-react';

const MobileBottomNav = () => {
  const { t, role, setRole, notifications } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showProfileSheet, setShowProfileSheet] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Define bottom tabs per role (Visitor Role removed!)
  const getTabs = () => {
    switch (role) {
      case 'ngo':
        return [
          { id: 'home', label: t('home'), path: '/', icon: HomeIcon },
          { id: 'requests', label: 'Requests', path: '/ngo', icon: Building2 },
          { id: 'track', label: 'Tracking', path: '/track', icon: MapPin },
          { id: 'notif', label: 'Alerts', action: () => setShowNotifModal(true), icon: Bell, badge: unreadCount },
          { id: 'profile', label: 'Profile', action: () => setShowProfileSheet(true), icon: User }
        ];
      case 'delivery':
        return [
          { id: 'jobs', label: 'Jobs', path: '/delivery', icon: Truck },
          { id: 'map', label: 'Map', path: '/track', icon: MapPin },
          { id: 'track', label: 'Tracking', path: '/track', icon: CheckSquare },
          { id: 'notif', label: 'Alerts', action: () => setShowNotifModal(true), icon: Bell, badge: unreadCount },
          { id: 'profile', label: 'Profile', action: () => setShowProfileSheet(true), icon: User }
        ];
      case 'admin':
        return [
          { id: 'dash', label: 'Dashboard', path: '/admin', icon: ShieldCheck },
          { id: 'donations', label: 'Donations', path: '/admin', icon: Utensils },
          { id: 'ngos', label: 'NGOs', path: '/ngo', icon: Building2 },
          { id: 'reports', label: 'Reports', path: '/impact', icon: BarChart3 },
          { id: 'profile', label: 'Profile', action: () => setShowProfileSheet(true), icon: User }
        ];
      case 'donor':
      default:
        return [
          { id: 'home', label: t('home'), path: '/', icon: HomeIcon },
          { id: 'donate', label: t('donateFood'), path: '/donor', icon: Utensils },
          { id: 'track', label: t('trackDonation'), path: '/track', icon: MapPin },
          { id: 'notif', label: 'Alerts', action: () => setShowNotifModal(true), icon: Bell, badge: unreadCount },
          { id: 'profile', label: 'Profile', action: () => setShowProfileSheet(true), icon: User }
        ];
    }
  };

  const tabs = getTabs();

  return (
    <>
      {/* Mobile Bottom Navigation Bar - Sticky to Bottom on Mobile (< lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl py-1.5 px-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = tab.path && location.pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.action) {
                  tab.action();
                } else if (tab.path) {
                  navigate(tab.path);
                }
              }}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all btn-bounce-active ${
                isActive ? 'text-green-800 font-black' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <IconComp className={`w-5 h-5 ${isActive ? 'text-orange-500 scale-110' : 'text-gray-500'}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-black text-green-950' : 'font-semibold'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications Drawer */}
      {showNotifModal && (
        <NotificationModal onClose={() => setShowNotifModal(false)} />
      )}

      {/* Profile Bottom Sheet Modal for Mobile (Visitor Role Removed) */}
      {showProfileSheet && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowProfileSheet(false)}
        >
          <div 
            className="bg-white rounded-t-3xl w-full max-w-lg p-6 space-y-5 animate-in slide-in-from-bottom duration-300 border-t-4 border-orange-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2"></div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-green-950 text-white flex items-center justify-center font-black text-xl shadow-md">
                {role[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-black font-outfit text-green-950 capitalize">
                  {role} Profile
                </h3>
                <p className="text-xs text-gray-500">Annsetu Platform Active Role</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Switch Active Role</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'donor', label: 'Donor' },
                  { id: 'ngo', label: 'NGO Partner' },
                  { id: 'admin', label: 'Admin' },
                  { id: 'delivery', label: 'Delivery Driver' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setShowProfileSheet(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      role === r.id ? 'bg-green-950 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowProfileSheet(false)}
              className="w-full py-3 rounded-2xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;

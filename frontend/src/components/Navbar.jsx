import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';
import NotificationModal from './NotificationModal';
import { 
  Heart, 
  Utensils, 
  MapPin, 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck, 
  Truck, 
  Building2,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const { t, role, setRole, notifications } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const location = useLocation();
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const roles = [
    { id: 'guest', labelKey: 'visitorRole', icon: UserCheck, color: 'text-gray-700' },
    { id: 'donor', labelKey: 'donorPortalRole', icon: Utensils, color: 'text-orange-600' },
    { id: 'ngo', labelKey: 'ngoPortalRole', icon: Building2, color: 'text-green-700' },
    { id: 'admin', labelKey: 'adminCenterRole', icon: ShieldCheck, color: 'text-purple-600' },
    { id: 'delivery', labelKey: 'deliveryDriverRole', icon: Truck, color: 'text-blue-600' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-nav shadow-xl py-2.5' : 'bg-white/95 backdrop-blur-md py-3.5 border-b-2 border-orange-500/20 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Prominent Large Logo & Brand Badge */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative bg-white rounded-2xl p-1.5 shadow-md border-2 border-green-600/30 group-hover:scale-105 transition-transform">
              <img 
                src="/annsetu_logo.png" 
                alt="ANNSETU Logo" 
                className="h-14 sm:h-16 w-auto object-contain rounded-xl"
              />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-green-800 font-outfit">
                  Ann<span className="text-orange-600">setu</span>
                </span>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-orange-300">
                  {t('officialBadge')}
                </span>
              </div>
              <p className="text-xs font-bold text-green-700 tracking-wide">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7">
            <Link 
              to="/" 
              className={`text-sm font-extrabold transition-all tab-animated hover:text-green-700 ${
                location.pathname === '/' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              {t('home')}
            </Link>

            <Link 
              to="/donor" 
              className={`text-sm font-extrabold transition-all tab-animated hover:text-orange-600 ${
                location.pathname === '/donor' ? 'text-orange-600 font-black border-b-2 border-orange-600 pb-1' : 'text-gray-700'
              }`}
            >
              {t('donateFood')}
            </Link>

            <Link 
              to="/ngo" 
              className={`text-sm font-extrabold transition-all tab-animated hover:text-green-700 ${
                location.pathname === '/ngo' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              {t('ngos')}
            </Link>

            <Link 
              to="/track" 
              className={`text-sm font-extrabold transition-all tab-animated hover:text-green-700 flex items-center space-x-1 ${
                location.pathname === '/track' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{t('trackDonation')}</span>
            </Link>

            <Link 
              to="/impact" 
              className={`text-sm font-extrabold transition-all tab-animated hover:text-green-700 ${
                location.pathname === '/impact' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              {t('ourImpact')}
            </Link>

            <Link 
              to="/admin" 
              className={`text-sm font-extrabold transition-all tab-animated hover:text-purple-700 ${
                location.pathname === '/admin' ? 'text-purple-800 font-black border-b-2 border-purple-600 pb-1' : 'text-gray-700'
              }`}
            >
              {t('adminPortal')}
            </Link>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Notification Bell */}
            <button 
              onClick={() => setShowNotifModal(!showNotifModal)}
              className="relative p-2.5 text-gray-700 hover:text-green-800 bg-gray-100 hover:bg-green-50 rounded-full transition-all border border-gray-200 tab-animated"
              title="Notifications"
              aria-label="View Notifications"
            >
              <Bell className="w-4 h-4 text-green-800" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-green-800 to-orange-600 text-white hover:from-green-900 hover:to-orange-700 transition-all shadow-md btn-bounce-active"
              >
                <span className="capitalize">{role === 'guest' ? t('visitorRole') : t(`${role}PortalRole`)}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {t('switchRole')}
                  </div>
                  {roles.map((r) => {
                    const IconComp = r.icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setRole(r.id);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs text-left hover:bg-green-50 transition-colors ${
                          role === r.id ? 'bg-green-50/80 font-black text-green-900' : 'text-gray-700'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${r.color}`} />
                        <span>{t(r.labelKey)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-lg animate-in fade-in">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-green-700 border-b border-gray-50"
          >
            {t('home')}
          </Link>
          <Link 
            to="/donor" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-orange-600 border-b border-gray-50"
          >
            {t('donorDashboard')}
          </Link>
          <Link 
            to="/ngo" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-green-700 border-b border-gray-50"
          >
            {t('ngoDashboard')}
          </Link>
          <Link 
            to="/track" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-green-700 border-b border-gray-50"
          >
            {t('trackingDashboard')}
          </Link>
          <Link 
            to="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-purple-700 border-b border-gray-50"
          >
            {t('adminDashboard')}
          </Link>
          <Link 
            to="/delivery" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-blue-700 border-b border-gray-50"
          >
            {t('deliveryDashboard')}
          </Link>
          <Link 
            to="/impact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-800 hover:text-green-700"
          >
            {t('ourImpact')}
          </Link>
        </div>
      )}

      {/* Notification Drawer Modal */}
      {showNotifModal && (
        <NotificationModal onClose={() => setShowNotifModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;

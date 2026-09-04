import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Truck, 
  Building2,
  ChevronDown,
  MoreVertical,
  Home as HomeIcon,
  Sparkles,
  UserCheck,
  LogOut,
  User,
  KeyRound
} from 'lucide-react';

const Navbar = () => {
  const { t, currentUser, logoutUser, role, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const portalMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (portalMenuRef.current && !portalMenuRef.current.contains(event.target)) {
        setShowPortalMenu(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const portals = [
    { id: 'donor', path: '/donor', labelKey: 'donateFood', descKey: 'donorDesc', roleName: 'donor', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'ngo', path: '/ngo', labelKey: 'ngos', descKey: 'ngoDesc', roleName: 'ngo', icon: Building2, color: 'text-green-700', bg: 'bg-green-50' },
    { id: 'track', path: '/track', labelKey: 'trackDonation', descKey: 'trackingDesc', roleName: role, icon: MapPin, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'delivery', path: '/delivery', labelKey: 'deliveryDashboard', descKey: 'deliveryDesc', roleName: 'volunteer', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'admin', path: '/admin', labelKey: 'adminPortal', descKey: 'adminDesc', roleName: 'admin', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'impact', path: '/impact', labelKey: 'ourImpact', descKey: 'impactSubtext', roleName: role, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' }
  ];

  const handlePortalSelect = (portal) => {
    if (portal.id === 'impact' || portal.id === 'track') {
      navigate(portal.path);
    } else if (!currentUser) {
      navigate(`/auth/${portal.roleName || 'donor'}`);
    } else {
      navigate(portal.path);
    }
    setShowPortalMenu(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setShowProfileDropdown(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-3.5 border-b-2 border-orange-500/20 shadow-md transition-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Prominent Large Logo & Brand Badge - Always navigates to Homepage */}
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

          {/* Desktop Navigation: ONLY Homepage & Portals/Dashboards 3-Dots Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Direct Homepage Link */}
            <Link 
              to="/" 
              className={`text-sm font-extrabold flex items-center space-x-1.5 transition-all tab-animated hover:text-green-700 ${
                location.pathname === '/' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-green-700" />
              <span>{t('home')}</span>
            </Link>

            {/* ONLY PORTALS & DASHBOARDS 3-DOTS BUTTON IN MENUBAR */}
            <div className="relative" ref={portalMenuRef}>
              <button
                onClick={() => setShowPortalMenu(!showPortalMenu)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border shadow-sm btn-bounce-active ${
                  showPortalMenu ? 'bg-orange-500 text-gray-950 border-orange-600' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-orange-100 hover:text-orange-900'
                }`}
                title="Click 3 dots to switch portals and dashboards"
                aria-label="Portals and Dashboards Menu"
              >
                <MoreVertical className="w-4 h-4 text-orange-600" />
                <span>{t('portalsAndDashboards')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* 3-DOTS PORTALS & DASHBOARDS POPOVER */}
              {showPortalMenu && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border-2 border-orange-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block">
                        {t('switchPortalHeader')}
                      </span>
                      <h4 className="text-xs font-extrabold text-green-950 font-outfit">
                        {t('dashboardsTitle')}
                      </h4>
                    </div>
                    <Sparkles className="w-4 h-4 text-orange-500" />
                  </div>

                  <div className="p-2 space-y-1 max-h-[70vh] overflow-y-auto">
                    {portals.map((portal) => {
                      const IconComp = portal.icon;
                      const isActive = location.pathname === portal.path;

                      return (
                        <button
                          key={portal.id}
                          onClick={() => handlePortalSelect(portal)}
                          className={`w-full flex items-start space-x-3 p-3 rounded-2xl text-left transition-all ${
                            isActive ? 'bg-orange-100/80 border border-orange-300' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${portal.bg}`}>
                            <IconComp className={`w-5 h-5 ${portal.color}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-extrabold ${isActive ? 'text-orange-950 font-black' : 'text-gray-900'}`}>
                                {t(portal.labelKey)}
                              </span>
                              {isActive && (
                                <span className="text-[9px] font-black bg-orange-500 text-gray-950 px-2 py-0.5 rounded-full uppercase">
                                  {t('activeBadge')}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">
                              {t(portal.descKey)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Tools (Language Selector, Bell, Profile/Login) */}
          <div className="flex items-center space-x-3">
            <LanguageSelector />

            <button 
              onClick={() => setShowNotifModal(!showNotifModal)}
              className="relative p-2.5 text-gray-700 hover:text-green-800 bg-gray-100 hover:bg-green-50 rounded-full transition-all border border-gray-200 tab-animated"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-green-800" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-700 transition-all btn-bounce-active"
                >
                  <UserCheck className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-black max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border-2 border-orange-200 py-3 z-50 animate-in fade-in text-gray-900">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-black text-emerald-950">Hello, {currentUser.name}</p>
                      <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full uppercase">
                        Role: {currentUser.role}
                      </span>
                    </div>

                    <div className="p-2 space-y-1 text-xs font-bold">
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          const dest = currentUser.role === 'admin' ? '/admin' : `/${currentUser.role === 'volunteer' ? 'delivery' : currentUser.role}`;
                          navigate(dest);
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded-xl hover:bg-orange-50 text-left"
                      >
                        <User className="w-4 h-4 text-orange-500" />
                        <span>{t('myDashboard')}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          navigate('/certificates');
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded-xl hover:bg-orange-50 text-left"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>{t('myCertificates')}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          navigate(`/auth/${currentUser.role}`);
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded-xl hover:bg-orange-50 text-left"
                      >
                        <KeyRound className="w-4 h-4 text-emerald-600" />
                        <span>{t('changePassword')}</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 p-2 rounded-xl hover:bg-red-50 text-red-600 text-left border-t border-gray-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logoutBtn')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/donor"
                className="min-h-[40px] px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center space-x-1.5 btn-bounce-active"
              >
                <User className="w-4 h-4 text-orange-400" />
                <span>{t('login')}</span>
              </Link>
            )}

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
            className="flex items-center space-x-2 py-2 text-sm font-bold text-gray-800 hover:text-green-700 border-b border-gray-50"
          >
            <HomeIcon className="w-4 h-4 text-green-700" />
            <span>{t('home')}</span>
          </Link>

          <div className="pt-2 px-2 text-[10px] font-black uppercase text-orange-600 tracking-wider">
            {t('portalsAndDashboards')} (3-Dots)
          </div>

          {portals.map((portal) => {
            const IconComp = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => handlePortalSelect(portal)}
                className="w-full flex items-center space-x-3 p-2.5 rounded-xl text-left bg-gray-50 hover:bg-orange-50 text-gray-800 border border-gray-100"
              >
                <IconComp className={`w-4 h-4 ${portal.color}`} />
                <span className="text-xs font-bold">{t(portal.labelKey)}</span>
              </button>
            );
          })}
        </div>
      )}

      {showNotifModal && (
        <NotificationModal onClose={() => setShowNotifModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;

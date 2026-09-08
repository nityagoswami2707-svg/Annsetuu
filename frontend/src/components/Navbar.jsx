import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';
import NotificationModal from './NotificationModal';
import UserProfileBox from './UserProfileBox';
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
  KeyRound,
  BarChart2,
  Settings,
  Award
} from 'lucide-react';

const Navbar = () => {
  const { t, currentUser, logoutUser, role, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const portalMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown menus when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (portalMenuRef.current && !portalMenuRef.current.contains(event.target)) {
        setShowPortalMenu(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowPortalMenu(false);
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const portals = [
    { id: 'donor', path: '/donor', labelKey: 'donateFood', descKey: 'donorDesc', roleName: 'donor', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'ngo', path: '/ngo', labelKey: 'ngos', descKey: 'ngoDesc', roleName: 'ngo', icon: Building2, color: 'text-green-700', bg: 'bg-green-50' },
    { id: 'track', path: '/track', labelKey: 'trackDonation', descKey: 'trackingDesc', roleName: role, icon: MapPin, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'delivery', path: '/delivery', labelKey: 'deliveryDashboard', descKey: 'deliveryDesc', roleName: 'volunteer', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'admin', path: '/admin', labelKey: 'adminPortal', descKey: 'adminDesc', roleName: 'admin', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const handlePortalSelect = (portal) => {
    if (!currentUser) {
      navigate(`/auth/${portal.roleName || 'donor'}`);
    } else {
      navigate(portal.path);
    }
    setShowPortalMenu(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
    logoutUser(navigate);
    setShowProfileDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md py-2.5 sm:py-3.5 border-b-2 border-orange-500/20 shadow-md transition-none">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1 sm:gap-4">
          
          {/* Prominent Large Logo & Brand Badge - Always navigates to Homepage */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0 min-w-fit">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-md border-2 border-green-600/30 shrink-0">
              <img 
                src="/annsetu_logo.png" 
                alt="ANNSETU Logo" 
                className="h-8 xs:h-10 sm:h-14 md:h-16 w-auto object-contain rounded-lg shrink-0"
              />
            </div>

            <div className="flex items-center space-x-1.5 shrink-0">
              <span className="text-base xs:text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-green-800 font-outfit shrink-0">
                Ann<span className="text-orange-600">setu</span>
              </span>
              <span className="hidden sm:inline-block bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-orange-300">
                {t('officialBadge')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

            {/* Direct Our Impact Link */}
            <Link 
              to="/impact" 
              className={`text-sm font-extrabold flex items-center space-x-1.5 transition-all tab-animated hover:text-green-700 ${
                location.pathname === '/impact' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
              <span>{t('ourImpact')}</span>
            </Link>

            {/* Portals & Dashboards 3-dots Menu (Visible when logged in or for role navigation) */}
            {currentUser && (
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
            )}

          </div>

          {/* Right Tools (Language Selector, Bell, Profile/Login) */}
          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 shrink-0">
            <LanguageSelector />

            <button 
              onClick={() => setShowNotifModal(!showNotifModal)}
              className="relative p-2 xs:p-2.5 text-gray-700 hover:text-green-800 bg-gray-100 hover:bg-green-50 rounded-full transition-all border border-gray-200 tab-animated shrink-0"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-green-800" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer shrink-0"
                title="Logout from AnnSetu"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>{t('logoutBtn')}</span>
              </button>
            ) : (
              <Link
                to="/auth/donor"
                className="min-h-[36px] xs:min-h-[40px] px-2.5 xs:px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center space-x-1.5 btn-bounce-active shrink-0"
              >
                <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-orange-400" />
                <span>{t('login')}</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-800 focus:outline-none shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
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

          <Link 
            to="/impact" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 py-2 text-sm font-bold text-gray-800 hover:text-green-700 border-b border-gray-50"
          >
            <Heart className="w-4 h-4 text-red-500" />
            <span>{t('ourImpact')}</span>
          </Link>

          {currentUser && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowProfileBox(true);
              }}
              className="w-full flex items-center space-x-2 py-2 text-sm font-black text-emerald-950 hover:text-orange-600 border-b border-gray-50 bg-orange-50 px-2 rounded-xl text-left"
            >
              <User className="w-4 h-4 text-orange-500" />
              <span>👤 {t('myProfile')}</span>
            </button>
          )}

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

      {/* User Profile Side Panel Box (Same as Notification Box) */}
      {showProfileBox && (
        <UserProfileBox onClose={() => setShowProfileBox(false)} />
      )}
    </nav>
  );
};

export default Navbar;

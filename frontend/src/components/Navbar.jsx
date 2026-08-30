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
  ArrowRight
} from 'lucide-react';

const Navbar = () => {
  const { t, role, setRole, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const portalMenuRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close portal dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (portalMenuRef.current && !portalMenuRef.current.contains(event.target)) {
        setShowPortalMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const portals = [
    { id: 'donor', path: '/donor', labelKey: 'donateFood', descKey: 'donorDesc', roleName: 'donor', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'ngo', path: '/ngo', labelKey: 'ngos', descKey: 'ngoDesc', roleName: 'ngo', icon: Building2, color: 'text-green-700', bg: 'bg-green-50' },
    { id: 'track', path: '/track', labelKey: 'trackDonation', descKey: 'trackingDesc', roleName: role, icon: MapPin, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'delivery', path: '/delivery', labelKey: 'deliveryDashboard', descKey: 'deliveryDesc', roleName: 'delivery', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'admin', path: '/admin', labelKey: 'adminPortal', descKey: 'adminDesc', roleName: 'admin', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'impact', path: '/impact', labelKey: 'ourImpact', descKey: 'impactSubtext', roleName: role, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' }
  ];

  const handlePortalSelect = (portal) => {
    if (portal.roleName) {
      setRole(portal.roleName);
    }
    navigate(portal.path);
    setShowPortalMenu(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-3.5 border-b-2 border-orange-500/20 shadow-md transition-none">
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

          {/* Desktop Navigation: ONLY Homepage + 3 Dots Portal Switcher */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Direct Homepage Link Only */}
            <Link 
              to="/" 
              className={`text-sm font-extrabold flex items-center space-x-1.5 transition-all tab-animated hover:text-green-700 ${
                location.pathname === '/' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-green-700" />
              <span>{t('home')}</span>
            </Link>

            {/* 3 DOTS PORTAL SWITCHER BUTTON */}
            <div className="relative" ref={portalMenuRef}>
              <button
                onClick={() => setShowPortalMenu(!showPortalMenu)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all border shadow-sm btn-bounce-active ${
                  showPortalMenu ? 'bg-orange-500 text-gray-950 border-orange-600' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-orange-100 hover:text-orange-900'
                }`}
                title="Click 3 dots to switch portals"
                aria-label="Switch Portals Menu"
              >
                <MoreVertical className="w-4 h-4 text-orange-600" />
                <span>{t('portalsAndDashboards')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* 3 DOTS PORTAL DROPDOWN POPOVER */}
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

            {/* 3-Dots Quick Portal Access Button */}
            <div className="relative">
              <button
                onClick={() => setShowPortalMenu(!showPortalMenu)}
                className="p-2.5 text-gray-800 bg-orange-100 hover:bg-orange-200 rounded-full transition-all border border-orange-300 tab-animated flex items-center justify-center"
                title={t('switchPortalHeader')}
                aria-label="3 Dots Portal Switcher"
              >
                <MoreVertical className="w-5 h-5 text-orange-700" />
              </button>
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
          <div className="px-2 py-1 text-[10px] font-black uppercase text-orange-600 tracking-wider">
            {t('home')}
          </div>

          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 py-2 text-sm font-bold text-gray-800 hover:text-green-700 border-b border-gray-50"
          >
            <HomeIcon className="w-4 h-4 text-green-700" />
            <span>{t('home')}</span>
          </Link>

          <div className="pt-2 px-2 text-[10px] font-black uppercase text-gray-400 tracking-wider">
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

      {/* Notification Drawer Modal */}
      {showNotifModal && (
        <NotificationModal onClose={() => setShowNotifModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;

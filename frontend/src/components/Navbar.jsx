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
  ArrowRight,
  LogIn,
  UserPlus,
  LogOut,
  User,
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const { t, user, logoutUser, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const portalMenuRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (portalMenuRef.current && !portalMenuRef.current.contains(event.target)) {
        setShowPortalMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Map active user role to dashboard route
  const getUserDashboardPath = () => {
    if (!user) return '/auth';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'ngo': return '/ngo';
      case 'volunteer': return '/volunteer';
      case 'fund_donor': return '/fund-donor';
      default: return '/donor';
    }
  };

  const getRoleLabel = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin': return '🛡️ Admin';
      case 'ngo': return '🏢 NGO';
      case 'volunteer': return '🚴 Volunteer';
      case 'fund_donor': return '💝 Fund Donor';
      default: return '🍱 Food Donor';
    }
  };

  const portals = [
    { id: 'donor', path: '/donor', labelKey: 'donateFood', descKey: 'donorDesc', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'ngo', path: '/ngo', labelKey: 'ngos', descKey: 'ngoDesc', icon: Building2, color: 'text-green-700', bg: 'bg-green-50' },
    { id: 'volunteer', path: '/volunteer', labelKey: 'deliveryDashboard', descKey: 'deliveryDesc', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'fund_donor', path: '/fund-donor', labelKey: 'dashboards', descKey: 'impactSubtext', icon: Heart, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'admin', path: '/admin', labelKey: 'adminPortal', descKey: 'adminDesc', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'impact', path: '/impact', labelKey: 'ourImpact', descKey: 'impactSubtext', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-3.5 border-b-2 border-orange-500/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative bg-white rounded-2xl p-1.5 shadow-md border-2 border-green-600/30 group-hover:scale-105 transition-transform">
              <img 
                src="/annsetu_logo.png" 
                alt="ANNSETU Logo" 
                className="h-12 sm:h-14 w-auto object-contain rounded-xl"
              />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-green-800 font-outfit">
                  Ann<span className="text-orange-600">setu</span>
                </span>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-orange-300">
                  {t('officialBadge')}
                </span>
              </div>
              <p className="text-[11px] font-bold text-green-700 tracking-wide">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            
            <Link 
              to="/" 
              className={`text-sm font-extrabold flex items-center space-x-1.5 transition-all hover:text-green-700 ${
                location.pathname === '/' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-green-700" />
              <span>{t('home')}</span>
            </Link>

            <Link 
              to="/impact" 
              className={`text-sm font-extrabold flex items-center space-x-1.5 transition-all hover:text-green-700 ${
                location.pathname === '/impact' ? 'text-green-800 font-black border-b-2 border-green-600 pb-1' : 'text-gray-700'
              }`}
            >
              <Heart className="w-4 h-4 text-pink-600" />
              <span>{t('ourImpact')}</span>
            </Link>

            {/* If Logged In: My Role Dashboard Link */}
            {user ? (
              <Link
                to={getUserDashboardPath()}
                className="text-sm font-black text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200 flex items-center space-x-1.5 hover:bg-orange-100"
              >
                <LayoutDashboard className="w-4 h-4 text-orange-600" />
                <span>My Dashboard</span>
              </Link>
            ) : (
              /* 3 DOTS PORTAL SWITCHER BUTTON FOR VISITORS */
              <div className="relative" ref={portalMenuRef}>
                <button
                  onClick={() => setShowPortalMenu(!showPortalMenu)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl text-xs font-extrabold bg-gray-100 text-gray-800 border border-gray-200 hover:bg-orange-100 btn-bounce-active"
                >
                  <MoreVertical className="w-4 h-4 text-orange-600" />
                  <span>{t('portalsAndDashboards')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {showPortalMenu && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border-2 border-orange-200 py-3 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-orange-600 block">{t('switchPortalHeader')}</span>
                        <h4 className="text-xs font-extrabold text-green-950 font-outfit">{t('dashboardsTitle')}</h4>
                      </div>
                    </div>
                    <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto">
                      {portals.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            navigate(p.path);
                            setShowPortalMenu(false);
                          }}
                          className="w-full flex items-start space-x-3 p-2.5 rounded-xl text-left hover:bg-gray-50 text-xs font-bold"
                        >
                          <p.icon className={`w-4 h-4 ${p.color}`} />
                          <div>
                            <p className="text-gray-900">{t(p.labelKey)}</p>
                            <p className="text-[10px] text-gray-500 font-normal">{t(p.descKey)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Action Tools: Auth / User Profile */}
          <div className="flex items-center space-x-2.5">
            
            <LanguageSelector />

            {/* Notification Bell */}
            <button 
              onClick={() => setShowNotifModal(!showNotifModal)}
              className="relative p-2 text-gray-700 hover:text-green-800 bg-gray-100 rounded-full border border-gray-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-green-800" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* AUTH STATE BUTTONS */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-green-950 bg-green-100 px-3 py-1.5 rounded-xl border border-green-300 hidden sm:inline-block">
                  {getRoleLabel()}
                </span>
                <button
                  onClick={logoutUser}
                  className="p-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl border border-red-200 text-xs font-black flex items-center space-x-1 btn-bounce-active"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-green-900 bg-green-50 hover:bg-green-100 border border-green-200 flex items-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5 text-green-700" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-xl text-xs font-black text-gray-950 bg-orange-500 hover:bg-orange-600 shadow-md flex items-center space-x-1 btn-bounce-active"
                >
                  <span>Explore AnnSetu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-lg">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 py-2 text-xs font-bold text-gray-800">
            <HomeIcon className="w-4 h-4 text-green-700" />
            <span>{t('home')}</span>
          </Link>

          {user ? (
            <div className="space-y-2 pt-2 border-t">
              <div className="text-xs font-black text-green-900 bg-green-50 p-2 rounded-xl border border-green-200">
                Logged in as: {getRoleLabel()} ({user.name})
              </div>
              <Link to={getUserDashboardPath()} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-black text-orange-600">
                Go to My Dashboard →
              </Link>
              <button onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="w-full text-left py-2 text-xs font-bold text-red-600">
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-green-800">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-orange-600">
                Create an Account
              </Link>
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block p-3 bg-orange-500 text-gray-950 text-xs font-black text-center rounded-xl shadow-sm">
                Explore AnnSetu →
              </Link>
            </div>
          )}
        </div>
      )}

      {showNotifModal && (
        <NotificationModal onClose={() => setShowNotifModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;

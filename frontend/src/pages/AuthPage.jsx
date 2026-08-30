import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp, validatePasswordStrength } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { 
  Utensils, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  UserCheck, 
  Mail, 
  Phone, 
  Lock, 
  Home, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

const AuthPage = () => {
  const { roleParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, loginUser, registerUser, updatePassword, currentUser } = useApp();

  // Role resolution: donor, ngo, volunteer, admin
  const role = ['donor', 'ngo', 'volunteer', 'admin'].includes(roleParam?.toLowerCase())
    ? roleParam.toLowerCase()
    : 'donor';

  const isAdmin = role === 'admin';

  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot' | 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
    remember: true
  });

  // Forgot / Reset Password state
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Registration form state
  const [regData, setRegData] = useState({
    fullName: '',
    ngoName: '',
    regNo: '',
    contactPersonName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: 'Vadodara',
    pincode: '',
    vehicleType: 'Car / EV',
    agreeTerms: false,
    agreeVolunteerGuidelines: false
  });

  // If user is already logged in, redirect to homepage or requested route
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || (currentUser.role === 'admin' ? '/admin' : `/${currentUser.role === 'volunteer' ? 'delivery' : currentUser.role}`);
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!loginData.identifier || !loginData.password) {
      setError(t('invalidCredsMsg'));
      return;
    }

    const res = loginUser(loginData.identifier, loginData.password, role);
    if (res.success) {
      const dest = location.state?.from?.pathname || (res.user.role === 'admin' ? '/admin' : `/${res.user.role === 'volunteer' ? 'delivery' : res.user.role}`);
      navigate(dest, { replace: true });
    } else {
      setError(res.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!regData.email || !regData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (regData.password !== regData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const strength = validatePasswordStrength(regData.password);
    if (!strength.isValid) {
      setError(strength.errors.join(". "));
      return;
    }

    if (role === 'donor' && !regData.agreeTerms) {
      setError(t('agreeTerms'));
      return;
    }

    if (role === 'volunteer' && !regData.agreeVolunteerGuidelines) {
      setError(t('agreeVolunteerGuidelines'));
      return;
    }

    const payload = {
      ...regData,
      role: role,
      name: role === 'ngo' ? regData.ngoName : regData.fullName
    };

    const res = registerUser(payload);
    if (res.success) {
      if (res.isPendingNgo) {
        setMode('pending_ngo');
      } else {
        const dest = role === 'volunteer' ? '/delivery' : `/${role}`;
        navigate(dest, { replace: true });
      }
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!resetIdentifier) {
      setError("Please enter your email address or mobile number.");
      return;
    }
    setMode('reset');
    setError('');
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    const strength = validatePasswordStrength(newPassword);
    if (!strength.isValid) {
      setError(strength.errors.join(". "));
      return;
    }

    const res = updatePassword(resetIdentifier, newPassword);
    setSuccessMsg(res.message);
    setTimeout(() => {
      setMode('login');
      setSuccessMsg('');
    }, 2500);
  };

  // Demo Credentials Quick Fill Handler
  const handleQuickDemoFill = () => {
    setError('');
    if (role === 'admin') {
      setLoginData({ identifier: 'admin@annsetu.demo', password: 'AnnSetu@2026Demo', remember: true });
    } else if (role === 'donor') {
      setLoginData({ identifier: 'donor@annsetu.demo', password: 'Donor@2026Demo', remember: true });
    } else if (role === 'ngo') {
      setLoginData({ identifier: 'ngo@annsetu.demo', password: 'Ngo@2026Demo', remember: true });
    } else if (role === 'volunteer') {
      setLoginData({ identifier: 'volunteer@annsetu.demo', password: 'Volunteer@2026Demo', remember: true });
    }
  };

  const roleMeta = {
    donor: { title: t('donorLogin'), regTitle: t('donorRegister'), icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
    ngo: { title: t('ngoLogin'), regTitle: t('ngoRegister'), icon: Building2, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
    volunteer: { title: t('volunteerLogin'), regTitle: t('volunteerRegister'), icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    admin: { title: t('adminLogin'), regTitle: '', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' }
  }[role];

  const IconComponent = roleMeta.icon;
  const passwordStrength = validatePasswordStrength(regData.password || newPassword);

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type={role === 'volunteer' ? 'track' : role} />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 space-y-6">

        {/* Top Return to Homepage Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 text-emerald-950 text-xs font-extrabold border border-gray-200 shadow-sm hover:bg-orange-100 transition-all"
          >
            <Home className="w-4 h-4 text-orange-600" />
            <span>← {t('home')}</span>
          </Link>

          <span className="text-[10px] font-black uppercase text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            {role.toUpperCase()} PORTAL
          </span>
        </div>

        {/* Auth Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500/20 space-y-6">

          {/* Card Header */}
          <div className="text-center space-y-2">
            <div className="relative inline-block bg-white p-2 rounded-2xl shadow-md border border-gray-200 mb-1">
              <img src="/annsetu_logo.png" alt="ANNSETU Logo" className="h-12 w-auto object-contain mx-auto" />
            </div>

            <h1 className="text-2xl font-black font-outfit text-emerald-950 flex items-center justify-center space-x-2">
              <IconComponent className={`w-6 h-6 ${roleMeta.color}`} />
              <span>
                {mode === 'register' ? roleMeta.regTitle : mode === 'forgot' || mode === 'reset' ? t('resetPasswordTitle') : roleMeta.title}
              </span>
            </h1>
            <p className="text-xs font-bold text-green-700">"{t('tagline')}"</p>
          </div>

          {/* Quick Demo Credentials Bar */}
          {mode === 'login' && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 flex items-center justify-between gap-2">
              <div className="text-[11px] font-extrabold text-amber-950">
                <span>Demo Account Available</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-[11px] shadow-sm btn-bounce-active shrink-0"
              >
                Auto-fill Demo Credentials
              </button>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-red-50 text-red-700 text-xs font-extrabold rounded-2xl border border-red-200 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-2xl border border-emerald-200 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* PENDING NGO VERIFICATION SCREEN */}
          {mode === 'pending_ngo' ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black font-outfit text-emerald-950">{t('ngoSubmittedMsg')}</h3>
              <div className="inline-block bg-amber-100 text-amber-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-amber-300">
                {t('pendingVerificationStatus')}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Admin review is in progress. Once verified by Admin, your NGO will receive full operational access to evaluate and accept surplus food requests.
              </p>
              <button
                onClick={() => navigate('/')}
                className="w-full min-h-[48px] py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md btn-bounce-active"
              >
                {t('returnHomeBtn')}
              </button>
            </div>
          ) : mode === 'forgot' ? (
            /* FORGOT PASSWORD FORM */
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">{t('enterResetDetailsPrompt')}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={resetIdentifier}
                    onChange={(e) => setResetIdentifier(e.target.value)}
                    placeholder={t('emailOrMobile')}
                    className="w-full min-h-[46px] px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md btn-bounce-active"
              >
                {t('sendResetLinkBtn')}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-bold text-emerald-800 hover:underline pt-2 block"
              >
                ← Back to {t('loginBtn')}
              </button>
            </form>
          ) : mode === 'reset' ? (
            /* RESET PASSWORD FORM */
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">New {t('password')}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full min-h-[46px] px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Password Strength Bar */}
              {newPassword && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>Password Strength:</span>
                    <span className={passwordStrength.score === 'Strong' ? 'text-green-600' : passwordStrength.score === 'Medium' ? 'text-amber-600' : 'text-red-500'}>
                      {passwordStrength.score}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${
                      passwordStrength.score === 'Strong' ? 'w-full bg-green-500' : passwordStrength.score === 'Medium' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-red-500'
                    }`}></div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">{t('confirmPassword')}</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full min-h-[46px] px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <p className="text-[10px] text-gray-500 italic">{t('passwordValidationHint')}</p>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md btn-bounce-active"
              >
                Update Password
              </button>
            </form>
          ) : mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  {isAdmin ? t('adminIdOrEmail') : t('emailOrMobile')}
                </label>
                <input
                  type="text"
                  value={loginData.identifier}
                  onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
                  placeholder={isAdmin ? "e.g. admin@annsetu.demo or ANNSETU-ADMIN-01" : "e.g. donor@annsetu.demo or 9428099887"}
                  className="w-full min-h-[46px] px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700">{t('password')}</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-bold text-orange-600 hover:underline"
                  >
                    {t('forgotPassword')}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    className="w-full min-h-[46px] pl-4 pr-10 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-sm shadow-md btn-bounce-active tracking-wide mt-2"
              >
                {t('loginBtn')}
              </button>

              {/* Requirement 8: NO Admin Public Registration link */}
              {!isAdmin && (
                <div className="text-center pt-3 border-t border-gray-100 text-xs font-bold text-gray-600">
                  <span>{t('dontHaveAccount')} </span>
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-orange-600 hover:underline font-black"
                  >
                    {t('registerNowBtn')}
                  </button>
                </div>
              )}
            </form>
          ) : (
            /* REGISTRATION FORM (Donor, NGO, Volunteer Only - No Admin Signup) */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-medium">
              
              {role === 'donor' && (
                <>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('fullName')}</label>
                    <input
                      type="text"
                      value={regData.fullName}
                      onChange={(e) => setRegData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Green Leaf Dining or Vikram Mehta"
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </>
              )}

              {role === 'ngo' && (
                <>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('ngoName')}</label>
                    <input
                      type="text"
                      value={regData.ngoName}
                      onChange={(e) => setRegData(prev => ({ ...prev, ngoName: e.target.value }))}
                      placeholder="e.g. Hope Foundation India"
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('regNo')}</label>
                    <input
                      type="text"
                      value={regData.regNo}
                      onChange={(e) => setRegData(prev => ({ ...prev, regNo: e.target.value }))}
                      placeholder="e.g. REG-2026-987654"
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('contactPersonName')}</label>
                    <input
                      type="text"
                      value={regData.contactPersonName}
                      onChange={(e) => setRegData(prev => ({ ...prev, contactPersonName: e.target.value }))}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </>
              )}

              {role === 'volunteer' && (
                <>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('fullName')}</label>
                    <input
                      type="text"
                      value={regData.fullName}
                      onChange={(e) => setRegData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('vehicleType')}</label>
                    <select
                      value={regData.vehicleType}
                      onChange={(e) => setRegData(prev => ({ ...prev, vehicleType: e.target.value }))}
                      className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Walking">{t('walking')}</option>
                      <option value="Bicycle">{t('bicycle')}</option>
                      <option value="Two-Wheeler">{t('twoWheeler')}</option>
                      <option value="Car / EV">{t('car')}</option>
                      <option value="Other">{t('otherVehicle')}</option>
                    </select>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">{t('emailOrMobile').split('/')[0]}</label>
                  <input
                    type="email"
                    value={regData.email}
                    onChange={(e) => setRegData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@domain.com"
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">{t('phoneNumber')}</label>
                  <input
                    type="tel"
                    value={regData.phone}
                    onChange={(e) => setRegData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block mb-1">{t('password')}</label>
                <input
                  type="password"
                  value={regData.password}
                  onChange={(e) => setRegData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Min 8 chars (e.g. Donor@2026Demo)"
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Password Strength Bar */}
              {regData.password && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>Password Strength:</span>
                    <span className={passwordStrength.score === 'Strong' ? 'text-green-600' : passwordStrength.score === 'Medium' ? 'text-amber-600' : 'text-red-500'}>
                      {passwordStrength.score}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${
                      passwordStrength.score === 'Strong' ? 'w-full bg-green-500' : passwordStrength.score === 'Medium' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-red-500'
                    }`}></div>
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-gray-700 block mb-1">{t('confirmPassword')}</label>
                <input
                  type="password"
                  value={regData.confirmPassword}
                  onChange={(e) => setRegData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Re-enter password"
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">{t('cityLabel')}</label>
                  <input
                    type="text"
                    value={regData.city}
                    onChange={(e) => setRegData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">{t('pincodeLabel')}</label>
                  <input
                    type="text"
                    value={regData.pincode}
                    onChange={(e) => setRegData(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder="390007"
                    className="w-full min-h-[44px] px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start space-x-2 text-[11px] font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role === 'volunteer' ? regData.agreeVolunteerGuidelines : regData.agreeTerms}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRegData(prev => role === 'volunteer' ? { ...prev, agreeVolunteerGuidelines: checked } : { ...prev, agreeTerms: checked });
                    }}
                    className="mt-0.5 text-orange-600 rounded focus:ring-orange-500"
                    required
                  />
                  <span>
                    {role === 'volunteer' ? t('agreeVolunteerGuidelines') : t('agreeTerms')}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-sm shadow-md btn-bounce-active tracking-wide mt-2"
              >
                {role === 'ngo' ? t('registerNgoBtn') : role === 'volunteer' ? t('createVolunteerAccountBtn') : t('createDonorAccountBtn')}
              </button>

              <div className="text-center pt-3 border-t border-gray-100 text-xs font-bold text-gray-600">
                <span>{t('alreadyHaveAccount')} </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-orange-600 hover:underline font-black"
                >
                  {t('loginBtn')}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthPage;

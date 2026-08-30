import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

const LoginPage = () => {
  const { loginUser, t } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await loginUser(email, password);
      setLoading(false);

      if (loggedUser) {
        const rolePath = loggedUser.role === 'admin' ? '/admin' :
                         loggedUser.role === 'ngo' ? '/ngo' :
                         loggedUser.role === 'volunteer' ? '/volunteer' :
                         loggedUser.role === 'fund_donor' ? '/fund-donor' : '/donor';
        navigate(rolePath);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Invalid email or password. Please try again.');
    }
  };

  const handleQuickDemoFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo1234');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 space-y-6">
        
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-green-200 text-gray-900 space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 border border-orange-300 text-orange-600 flex items-center justify-center mb-2 shadow-sm">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-green-950">
              {t('accountLogin')}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {t('enterCredentialsSub')}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-gray-700 block">{t('emailLabel')} *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-extrabold text-gray-700 block">{t('passwordLabel')} *</label>
                <button
                  type="button"
                  onClick={() => alert("Password Reset: Check your email for recovery instructions.")}
                  className="text-[11px] font-bold text-orange-600 hover:underline"
                >
                  {t('forgotPassword')}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{t('accountLogin')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Login Fill Buttons */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="text-[10px] font-black uppercase text-gray-400 block text-center">Quick Demo Preset Login</span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
              <button onClick={() => handleQuickDemoFill('donor@annsetu.org')} className="p-2 bg-orange-50 hover:bg-orange-100 text-orange-900 rounded-xl border border-orange-200">
                🍱 {t('donorPortalRole')}
              </button>
              <button onClick={() => handleQuickDemoFill('ngo@annsetu.org')} className="p-2 bg-green-50 hover:bg-green-100 text-green-900 rounded-xl border border-green-200">
                🏢 {t('ngoPortalRole')}
              </button>
              <button onClick={() => handleQuickDemoFill('volunteer@annsetu.org')} className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200">
                🚴 {t('deliveryDriverRole')}
              </button>
              <button onClick={() => handleQuickDemoFill('fund@annsetu.org')} className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl border border-purple-200">
                💝 Fund Donor
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-xs font-medium text-gray-600">
            {t('dontHaveAccount')}{' '}
            <Link to="/register" className="font-black text-green-800 hover:underline">
              {t('registerNow')}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;

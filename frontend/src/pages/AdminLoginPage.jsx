import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { ShieldCheck, Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
  const { loginUser, t } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter administrator credentials.');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await loginUser(email, password);
      setLoading(false);

      if (loggedUser) {
        if (loggedUser.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          setErrorMsg(t('noAdminPrivileges'));
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Invalid administrator credentials. Access denied.');
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@annsetu.org');
    setPassword('admin1234');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 space-y-6">
        
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-300 text-gray-900 space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-purple-100 border border-purple-300 text-purple-700 flex items-center justify-center mb-2 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Restricted Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-purple-950">
              {t('adminLoginTitle')}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {t('adminLoginSub')}
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 text-center space-y-1">
              <ShieldAlert className="w-5 h-5 text-red-600 mx-auto" />
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-gray-700 block">{t('emailLabel')} *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@annsetu.org"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-gray-700 block">{t('passwordLabel')} *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] px-6 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active mt-2"
            >
              {loading ? (
                <span>Verifying Admin Credentials...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-purple-300" />
                  <span>{t('loginAsAdmin')}</span>
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Preset Admin Button */}
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-950 text-xs font-extrabold rounded-xl border border-purple-200 flex items-center justify-center space-x-1.5"
            >
              <span>🛡️ Fill Demo Admin Credentials</span>
            </button>
          </div>

          <div className="text-center text-xs font-medium text-gray-500">
            <Link to="/" className="hover:underline font-bold text-gray-700">
              ← Return to Public Home Page
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;

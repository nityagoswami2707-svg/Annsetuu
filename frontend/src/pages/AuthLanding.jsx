import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { Utensils, LogIn, UserPlus, Sparkles, ArrowRight, ShieldCheck, Heart, Building2, Truck } from 'lucide-react';

const AuthLanding = () => {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 space-y-6">
        
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-200 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="w-16 h-16 mx-auto rounded-3xl bg-orange-100 border-2 border-orange-300 p-2 flex items-center justify-center shadow-lg">
            <img src="/annsetu_logo.png" alt="AnnSetu" className="h-full w-auto object-contain rounded-xl" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full border border-orange-300">
              {t('welcomeToAnnsetu')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-green-950">
              {t('exploreAnnsetu')}
            </h1>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              {t('joinMovement')}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/login"
              className="w-full min-h-[52px] px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-sm shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('loginExisting')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="w-full min-h-[52px] px-6 rounded-2xl bg-green-900 hover:bg-green-950 text-white font-black text-sm shadow-md border-2 border-green-700 flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <UserPlus className="w-4 h-4 text-orange-400" />
              <span>{t('createAccount')}</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 grid grid-cols-4 gap-2 text-center text-[10px] text-gray-500 font-bold">
            <div className="p-2 bg-orange-50 rounded-xl">
              <Utensils className="w-4 h-4 text-orange-600 mx-auto mb-1" />
              <span>{t('donorPortalRole')}</span>
            </div>
            <div className="p-2 bg-green-50 rounded-xl">
              <Building2 className="w-4 h-4 text-green-700 mx-auto mb-1" />
              <span>{t('ngoPortalRole')}</span>
            </div>
            <div className="p-2 bg-blue-50 rounded-xl">
              <Truck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <span>{t('deliveryDriverRole')}</span>
            </div>
            <div className="p-2 bg-purple-50 rounded-xl">
              <Heart className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <span>Fund Donor</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthLanding;

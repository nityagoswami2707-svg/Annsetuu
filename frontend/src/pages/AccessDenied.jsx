import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

const AccessDenied = () => {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 text-center space-y-6">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-red-200 space-y-6">
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-gray-900">
              {t('accessDeniedTitle')}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed">
              {t('accessDeniedSub')}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-lg flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Home className="w-4 h-4 text-orange-400" />
              <span>{t('returnHomeBtn')}</span>
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs shadow-sm flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccessDenied;

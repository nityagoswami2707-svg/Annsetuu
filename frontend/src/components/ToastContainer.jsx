import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertTriangle, Info, X, Bell } from 'lucide-react';

const ToastContainer = () => {
  const { activeToast, dismissToast } = useApp();

  if (!activeToast) return null;

  let IconComp = Info;
  let borderColor = "border-emerald-600";
  let bgColor = "bg-white/98 text-emerald-950";
  let iconBg = "bg-emerald-100 text-emerald-700";

  if (activeToast.type === 'success') {
    IconComp = CheckCircle;
    borderColor = "border-emerald-600";
    iconBg = "bg-emerald-600 text-white";
  } else if (activeToast.type === 'warning') {
    IconComp = AlertTriangle;
    borderColor = "border-orange-500";
    iconBg = "bg-orange-500 text-white";
  }

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-lg w-full animate-in fade-in slide-in-from-top-6 duration-300 pointer-events-auto">
      <div className={`p-5 rounded-3xl shadow-2xl border-2 ${borderColor} ${bgColor} backdrop-blur-xl flex items-center space-x-4 relative overflow-hidden ring-4 ring-black/5`}>
        
        {/* Animated Timer Progress Line at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-orange-500 animate-pulse"></div>
        </div>

        <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0 shadow-md`}>
          <IconComp className="w-6 h-6 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        <div className="flex-1 pr-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-wider">
              Notification Alert
            </span>
          </div>
          <h4 className="text-sm font-black font-outfit uppercase tracking-wide text-gray-900 mt-1">{activeToast.title}</h4>
          <p className="text-xs font-semibold text-gray-700 mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>

        <button
          onClick={dismissToast}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors btn-bounce-active"
          title="Dismiss Toast"
        >
          <X className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default ToastContainer;

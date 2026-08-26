import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertTriangle, Info, X, Bell } from 'lucide-react';

const ToastContainer = () => {
  const { activeToast, dismissToast } = useApp();

  if (!activeToast) return null;

  let IconComp = Info;
  let borderColor = "border-emerald-500";
  let bgColor = "bg-white/95 text-emerald-950";
  let iconBg = "bg-emerald-100 text-emerald-700";

  if (activeToast.type === 'success') {
    IconComp = CheckCircle;
    borderColor = "border-emerald-600";
    iconBg = "bg-emerald-500 text-white";
  } else if (activeToast.type === 'warning') {
    IconComp = AlertTriangle;
    borderColor = "border-orange-500";
    iconBg = "bg-orange-500 text-white";
  }

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-6 duration-300 pointer-events-auto">
      <div className={`p-4 rounded-2xl shadow-2xl border-2 ${borderColor} ${bgColor} backdrop-blur-xl flex items-start space-x-3.5 relative overflow-hidden ring-4 ring-black/5`}>
        
        {/* Animated Timer Progress Line at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-orange-500 animate-pulse"></div>
        </div>

        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-md`}>
          <IconComp className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        <div className="flex-1 pr-6">
          <h4 className="text-xs font-black font-outfit uppercase tracking-wider">{activeToast.title}</h4>
          <p className="text-xs font-semibold text-gray-700 mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>

        <button
          onClick={dismissToast}
          className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default ToastContainer;

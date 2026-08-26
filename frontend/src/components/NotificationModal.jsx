import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCircle, Info, AlertTriangle, Clock, Sparkles, CheckCheck } from 'lucide-react';

const NotificationModal = ({ onClose }) => {
  const { notifications, markNotificationsRead } = useApp();

  // Prevent background page scroll while notification side panel is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      {/* 1/4TH SCREEN SIDE PANEL (Lengthy full-height drawer, mobile responsive) */}
      <div 
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 min-w-[320px] sm:min-w-[380px] bg-white h-screen max-h-screen shadow-2xl flex flex-col justify-between border-l-4 border-orange-500 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b-2 border-green-100 flex items-center justify-between bg-emerald-950 text-white shadow-md shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shrink-0">
              <Bell className="w-6 h-6 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black font-outfit text-white">Notifications</h3>
                <span className="bg-orange-500 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                  1/4 Feed
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">Real-Time Telematics & Dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors btn-bounce-active"
            title="Close Panel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-3.5 bg-emerald-900/10 border-b border-emerald-950/10 flex items-center justify-between shrink-0">
          <span className="text-xs font-black text-emerald-950 flex items-center">
            <Sparkles className="w-4 h-4 text-orange-500 mr-1.5" />
            {notifications.length} Total Alerts
          </span>
          <button
            onClick={markNotificationsRead}
            className="text-xs font-black text-emerald-800 hover:text-emerald-950 flex items-center space-x-1 underline btn-bounce-active"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
        </div>

        {/* Vertical Stacked Notifications List with overscroll-contain & fixed scroll area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain">
          {notifications.length === 0 ? (
            <div className="text-center py-24 text-gray-500 space-y-3">
              <Bell className="w-14 h-14 mx-auto text-gray-300" />
              <p className="text-base font-bold text-gray-700">No active notifications</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">Task dispatches, donation registrations, and delivery updates will stack here one below another.</p>
            </div>
          ) : (
            notifications.map((item) => {
              let IconComp = Info;
              let bgColor = "bg-blue-50/90 border-blue-200 text-blue-950";
              let iconBg = "bg-blue-600 text-white";

              if (item.type === 'success') {
                IconComp = CheckCircle;
                bgColor = "bg-emerald-50/90 border-emerald-300 text-emerald-950";
                iconBg = "bg-emerald-700 text-white";
              } else if (item.type === 'warning') {
                IconComp = AlertTriangle;
                bgColor = "bg-orange-50/90 border-orange-300 text-orange-950";
                iconBg = "bg-orange-600 text-white";
              }

              return (
                <div 
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 ${bgColor} shadow-md relative transition-all card-zoom-3d ${
                    !item.read ? 'ring-2 ring-emerald-500/40 font-bold' : 'opacity-85'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black font-outfit uppercase tracking-wide leading-tight">{item.title}</h4>
                        <span className="text-[10px] font-bold text-gray-500 bg-white/90 px-2 py-0.5 rounded-md border border-gray-200 flex items-center shrink-0">
                          <Clock className="w-2.5 h-2.5 mr-1 text-gray-400" />
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-800 mt-1.5 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-emerald-950 text-white text-center text-xs font-bold flex items-center justify-between px-6 shrink-0">
          <span className="text-xs text-emerald-300">Annsetu 1/4 Screen Side Panel</span>
          <span className="text-[10px] bg-orange-500 text-gray-950 font-black px-2.5 py-0.5 rounded-full">Live 24/7</span>
        </div>

      </div>
    </div>
  );
};

export default NotificationModal;

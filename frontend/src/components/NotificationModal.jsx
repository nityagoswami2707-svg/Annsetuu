import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCircle, Info, AlertTriangle, Clock, Sparkles } from 'lucide-react';

const NotificationModal = ({ onClose }) => {
  const { notifications, markNotificationsRead } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in">
      {/* Broader notification drawer: max-w-lg sm:max-w-xl (576px - 672px) */}
      <div className="w-full max-w-lg sm:max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between border-l-2 border-emerald-800">
        
        {/* Broader Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Bell className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h3 className="text-xl font-black font-outfit tracking-wide">System Notifications</h3>
              <p className="text-xs text-emerald-300">Live Real-Time Telematics & Donation Dispatch Feed</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={markNotificationsRead}
              className="text-xs font-bold text-emerald-200 hover:text-white bg-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-700 hover:bg-emerald-800 transition-all btn-bounce-active"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors btn-bounce-active"
              title="Close notifications"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Broader Notification List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-base font-bold text-gray-700">No notifications yet</p>
              <p className="text-xs text-gray-400 mt-1">Actions & donation updates will appear here in real time.</p>
            </div>
          ) : (
            notifications.map((item) => {
              let IconComp = Info;
              let bgColor = "bg-blue-50/80 border-blue-300 text-blue-900";
              let iconBg = "bg-blue-600 text-white";

              if (item.type === 'success') {
                IconComp = CheckCircle;
                bgColor = "bg-emerald-50/90 border-emerald-300 text-emerald-950";
                iconBg = "bg-emerald-600 text-white";
              } else if (item.type === 'warning') {
                IconComp = AlertTriangle;
                bgColor = "bg-amber-50/90 border-amber-300 text-amber-950";
                iconBg = "bg-orange-500 text-white";
              }

              return (
                <div 
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 ${bgColor} shadow-md relative transition-all ${
                    !item.read ? 'ring-2 ring-emerald-500/40 font-bold' : 'opacity-90'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-extrabold font-outfit tracking-wide">{item.title}</h4>
                        <span className="text-[11px] font-bold text-gray-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-gray-200 flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 mt-1.5 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-xs font-bold text-gray-600 flex items-center justify-between px-6">
          <span>Annsetu Real-Time Telematics</span>
          <span className="text-emerald-700 flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1 text-orange-500" /> Live Feed Active</span>
        </div>

      </div>
    </div>
  );
};

export default NotificationModal;

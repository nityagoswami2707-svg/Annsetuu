import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCircle, Info, AlertTriangle, Clock } from 'lucide-react';

const NotificationModal = ({ onClose }) => {
  const { notifications, markNotificationsRead } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-emerald-900/10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-outfit">Notifications</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={markNotificationsRead}
              className="text-xs text-emerald-200 hover:text-white underline font-medium"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bell className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium">No notifications yet</p>
            </div>
          ) : (
            notifications.map((item) => {
              let IconComp = Info;
              let bgColor = "bg-blue-50 border-blue-200 text-blue-800";

              if (item.type === 'success') {
                IconComp = CheckCircle;
                bgColor = "bg-emerald-50 border-emerald-200 text-emerald-900";
              } else if (item.type === 'warning') {
                IconComp = AlertTriangle;
                bgColor = "bg-amber-50 border-amber-200 text-amber-900";
              }

              return (
                <div 
                  key={item.id}
                  className={`p-3.5 rounded-2xl border ${bgColor} shadow-xs relative transition-all ${
                    !item.read ? 'ring-2 ring-emerald-500/30' : 'opacity-85'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComp className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold font-outfit">{item.title}</h4>
                        <span className="text-[10px] text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-gray-700 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
          Annsetu Real-Time Dispatch System
        </div>

      </div>
    </div>
  );
};

export default NotificationModal;

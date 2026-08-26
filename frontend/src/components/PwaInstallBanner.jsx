import React, { useState, useEffect } from 'react';
import { Download, WifiOff, X } from 'lucide-react';

const PwaInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    });
  };

  return (
    <>
      {/* Weak / Offline Connection Toast */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-gray-950 px-4 py-2 text-xs font-bold text-center flex items-center justify-center space-x-2 shadow-lg animate-in slide-in-from-top duration-300">
          <WifiOff className="w-4 h-4 text-gray-950 shrink-0" />
          <span>Connection is weak. Your information will be submitted when the connection is restored.</span>
        </div>
      )}

      {/* PWA Add to Home Screen Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-sm bg-emerald-950 text-white p-4 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center justify-between space-x-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center space-x-3">
            <img src="/annsetu_logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-lg bg-white p-1 shrink-0" />
            <div>
              <h4 className="text-xs font-black font-outfit text-white">Add Annsetu to Home Screen</h4>
              <p className="text-[10px] text-emerald-200">Fast app-like experience & offline access.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-amber-400 text-gray-950 font-black text-xs hover:bg-amber-500 transition-all flex items-center space-x-1 shadow-md btn-bounce-active"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="p-1 text-emerald-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PwaInstallBanner;

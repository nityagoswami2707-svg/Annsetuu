import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Navigation, ShieldCheck, Phone, RefreshCw } from 'lucide-react';

const MapView = ({ donation }) => {
  const [progress, setProgress] = useState(65); // 0% at donor, 50% midpoint, 100% at NGO

  // Simulate progress movement if delivery is In Transit
  useEffect(() => {
    if (donation?.status === 'In Transit') {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 30 : prev + 2));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [donation?.status]);

  const donorName = donation?.donorName || "Green Leaf Fine Dining";
  const ngoName = donation?.ngoName || "Hope Foundation India";
  const driverName = donation?.deliveryDriver?.name || "Ramesh Kumar";
  const driverVehicle = donation?.deliveryDriver?.vehicleNo || "GJ-06-EV-4412";

  return (
    <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-emerald-800">
      
      {/* Map Header Overlay */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-emerald-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <h3 className="text-base font-bold font-outfit">Live Delivery Telematics Navigation</h3>
          </div>
          <p className="text-xs text-emerald-300">
            Real-time GPS Tracking: <span className="text-amber-400 font-semibold">{donorName}</span> → <span className="text-emerald-400 font-semibold">{ngoName}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-emerald-200">Live GPS Signal Active</span>
        </div>
      </div>

      {/* Simulated Map Canvas Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner flex items-center justify-center">
        
        {/* Map Grid Pattern background */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#d97706 1px, #0f172a 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        ></div>

        {/* Dynamic Vector Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Curved path */}
          <path
            d="M 60 220 Q 200 60 520 180"
            fill="none"
            stroke="#059669"
            strokeWidth="5"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          {/* Active completed route */}
          <path
            d="M 60 220 Q 200 60 520 180"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeDasharray="600"
            strokeDashoffset={600 - (600 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>

        {/* DONOR PIN (Start) */}
        <div className="absolute top-[200px] left-[40px] flex flex-col items-center group cursor-pointer z-10">
          <div className="bg-amber-500 text-gray-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md mb-1 whitespace-nowrap">
            📍 DONOR: {donorName}
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500 text-gray-950 flex items-center justify-center ring-4 ring-amber-400/30 shadow-xl">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* DELIVERY DRIVER PIN (Moving Vehicle along curve) */}
        <div 
          className="absolute transition-all duration-700 ease-out z-20 flex flex-col items-center"
          style={{
            left: `${15 + (progress * 0.72)}%`,
            top: `${160 - Math.sin((progress / 100) * Math.PI) * 110}px`
          }}
        >
          <div className="bg-emerald-500 text-emerald-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xl mb-1 flex items-center space-x-1 whitespace-nowrap ring-2 ring-emerald-300">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>🚚 EV VAN: {driverVehicle}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center ring-4 ring-emerald-400/40 shadow-2xl animate-bounce">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        {/* NGO TARGET PIN (End) */}
        <div className="absolute top-[160px] right-[40px] flex flex-col items-center group cursor-pointer z-10">
          <div className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md mb-1 whitespace-nowrap">
            🏢 NGO: {ngoName}
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-emerald-500/30 shadow-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Driver Telematics Footer */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Assigned Delivery Partner</span>
          <p className="font-bold text-white text-sm mt-0.5">{driverName}</p>
          <p className="text-emerald-300 text-[11px] flex items-center mt-1">
            <Phone className="w-3 h-3 mr-1" /> {donation?.deliveryDriver?.phone || "+91 91066 33221"}
          </p>
        </div>

        <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Vehicle & Route Status</span>
          <p className="font-bold text-amber-400 text-sm mt-0.5">{driverVehicle}</p>
          <p className="text-emerald-200 text-[11px] mt-1">{donation?.deliveryDriver?.currentLocation || "En route on Sayajigunj Main Rd"}</p>
        </div>

        <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Estimated Arrival (ETA)</span>
          <p className="font-black text-emerald-400 text-base mt-0.5 font-outfit">12 Mins (3.4 km remaining)</p>
          <p className="text-emerald-300 text-[11px] mt-0.5">Cold-chain thermal insulation verified</p>
        </div>
      </div>

    </div>
  );
};

export default MapView;

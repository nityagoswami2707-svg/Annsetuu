import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MapView from '../components/MapView';
import ImpactReceipt from '../components/ImpactReceipt';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Truck, 
  Building2, 
  Utensils, 
  ShieldCheck, 
  FileText,
  ArrowRight
} from 'lucide-react';

const TrackingDashboard = () => {
  const { t, donations, setSelectedReceiptDonation, selectedReceiptDonation } = useApp();
  const [searchId, setSearchId] = useState('ANS-2026-000123');
  const [activeDonation, setActiveDonation] = useState(
    donations.find(d => d.id === 'ANS-2026-000123') || donations[0]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = donations.find(d => d.id.trim().toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setActiveDonation(found);
    } else {
      alert(`Donation ID "${searchId}" not found. Try sample ID: ANS-2026-000123`);
    }
  };

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-emerald-950 to-orange-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-800 text-center space-y-4">
          <div className="max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-black/30 px-3 py-1 rounded-full border border-orange-300/40">
              Real-Time GPS Telematics
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-outfit text-white">Track Your Food Donation</h1>
            <p className="text-emerald-100 text-xs sm:text-sm">Enter your unique Donation ID to view stage progress and live driver location.</p>
          </div>

          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Donation ID (e.g. ANS-2026-000123)"
              className="flex-1 min-h-[48px] px-4 rounded-2xl bg-white text-gray-900 text-xs font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md"
            />
            <button
              type="submit"
              className="min-h-[48px] px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md flex items-center space-x-1 shrink-0 btn-bounce-active"
            >
              <Search className="w-4 h-4" />
              <span>Track Donation</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-200">
            <span>Demo IDs:</span>
            {donations.slice(0, 3).map(d => (
              <button
                key={d.id}
                onClick={() => {
                  setSearchId(d.id);
                  setActiveDonation(d);
                }}
                className="px-3 py-1 bg-black/40 hover:bg-black/60 rounded-full border border-white/20 font-mono text-amber-300 font-bold btn-bounce-active text-[11px]"
              >
                {d.id}
              </button>
            ))}
          </div>
        </div>

        {activeDonation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Live Telematics Map & Details */}
            <div className="lg:col-span-2 space-y-6">
              
              <MapView donation={activeDonation} />

              <div className="bg-white text-gray-900 rounded-3xl p-5 sm:p-7 shadow-md border border-gray-200/80 space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tracking Reference</span>
                    <h3 className="text-xl font-black font-outfit text-emerald-950">{activeDonation.id}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Current Status</span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mt-0.5">
                      {activeDonation.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Donated By</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{activeDonation.donorName}</p>
                    <p className="text-[11px] text-gray-500">{activeDonation.pickupAddress}</p>
                  </div>

                  <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
                    <p className="text-[10px] text-emerald-800 font-bold uppercase">Target NGO Shelter</p>
                    <p className="text-sm font-bold text-emerald-950 mt-0.5">{activeDonation.ngoName}</p>
                    <p className="text-[11px] text-emerald-700">{activeDonation.city}, Gujarat</p>
                  </div>
                </div>

                {activeDonation.status === 'Delivered' && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-amber-600 shrink-0" />
                      <div>
                        <h4 className="text-xs font-black text-amber-950">Impact Verified & Delivered ✓</h4>
                        <p className="text-[11px] text-amber-800">Your food reached {activeDonation.servingCapacity} people!</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedReceiptDonation(activeDonation)}
                      className="w-full sm:w-auto min-h-[44px] px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md btn-bounce-active"
                    >
                      View Impact Receipt
                    </button>
                  </div>
                )}

              </div>

            </div>

            {/* Right Col: Vertical Timeline */}
            <div className="bg-white text-gray-900 rounded-3xl p-5 sm:p-7 shadow-md border border-gray-200/80 space-y-5">
              <h3 className="text-lg font-black font-outfit text-emerald-950 border-b border-gray-100 pb-3">
                Vertical Mobile Timeline
              </h3>

              <div className="space-y-4 relative pl-6">
                <div className="absolute top-3 bottom-3 left-2.5 w-0.5 bg-orange-300"></div>

                {[
                  { status: "Donation Registered", label: "Donation Registered", icon: "✓" },
                  { status: "NGO Accepted", label: "NGO Accepted", icon: "✓" },
                  { status: "Pickup Assigned", label: "Pickup Assigned", icon: "✓" },
                  { status: "Picked Up", label: "Picked Up", icon: "●" },
                  { status: "In Transit", label: "In Transit", icon: "●" },
                  { status: "Delivered", label: "Delivered", icon: "○" }
                ].map((stepItem, idx) => {
                  const stageData = activeDonation.timeline.find(t => t.status === stepItem.status) || {
                    timestamp: activeDonation.createdAt,
                    detail: `${stepItem.label} status logged`,
                    completed: activeDonation.status === 'Delivered' || activeDonation.status === stepItem.status
                  };

                  const isCompleted = stageData.completed || activeDonation.status === 'Delivered';
                  const isCurrent = activeDonation.status === stepItem.status;

                  return (
                    <div key={idx} className="relative flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 shrink-0 ${
                        isCompleted ? 'bg-emerald-700 text-white ring-4 ring-emerald-100' :
                        isCurrent ? 'bg-amber-500 text-gray-950 ring-4 ring-amber-200 animate-pulse' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? '✓' : stepItem.icon}
                      </div>

                      <div className="flex-1 bg-gray-50/70 p-3 rounded-2xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-black ${isCompleted ? 'text-emerald-950' : 'text-gray-600'}`}>
                            {stepItem.label}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-mono">{stageData.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-0.5">{stageData.detail}</p>
                        <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">Location: {activeDonation.city}, Gujarat</span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        )}

        {selectedReceiptDonation && (
          <ImpactReceipt
            donation={selectedReceiptDonation}
            onClose={() => setSelectedReceiptDonation(null)}
          />
        )}

      </div>
    </div>
  );
};

export default TrackingDashboard;

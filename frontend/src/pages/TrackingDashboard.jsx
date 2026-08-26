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
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Search Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-emerald-900 px-3.5 py-1 rounded-full border border-emerald-700">
            {t('realtimeGpsTracking')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit">{t('trackFoodDonationHeader')}</h1>
          <p className="text-emerald-200 text-sm">{t('trackHeaderSub')}</p>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={t('enterDonationIdPlaceholder')}
            className="flex-1 px-5 py-3.5 rounded-2xl bg-white text-gray-900 text-sm font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-lg flex items-center space-x-1.5 shrink-0 btn-bounce-active"
          >
            <Search className="w-4 h-4" />
            <span>{t('trackBtn')}</span>
          </button>
        </form>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-300">
          <span>{t('quickDemoIds')}</span>
          {donations.slice(0, 3).map(d => (
            <button
              key={d.id}
              onClick={() => {
                setSearchId(d.id);
                setActiveDonation(d);
              }}
              className="px-3 py-1 bg-emerald-900 hover:bg-emerald-800 rounded-full border border-emerald-700 font-mono text-amber-300 font-bold btn-bounce-active"
            >
              {d.id} ({d.status})
            </button>
          ))}
        </div>
      </div>

      {activeDonation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Live Telematics Map & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Map Container */}
            <MapView donation={activeDonation} />

            {/* Donation Meta Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/10 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tracking Reference</span>
                  <h3 className="text-2xl font-black font-outfit text-emerald-950">{activeDonation.id}</h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Status</span>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>{activeDonation.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Donated By</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{activeDonation.donorName}</p>
                  <p className="text-[11px] text-gray-500">{activeDonation.pickupAddress}</p>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                  <p className="text-[10px] text-emerald-800 font-bold uppercase">Assigned NGO Partner</p>
                  <p className="text-sm font-bold text-emerald-950 mt-0.5">{activeDonation.ngoName}</p>
                  <p className="text-[11px] text-emerald-700">{activeDonation.city}, Gujarat</p>
                </div>
              </div>

              {/* Receipt Trigger if Delivered */}
              {activeDonation.status === 'Delivered' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-950">Impact Verified & Delivered</h4>
                      <p className="text-[11px] text-amber-800">Your food reached {activeDonation.servingCapacity} people!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReceiptDonation(activeDonation)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow-md btn-bounce-active"
                  >
                    View Digital Receipt
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right Col: Animated Stage Progress Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/10 space-y-6">
            <h3 className="text-xl font-bold font-outfit text-emerald-950 border-b border-gray-100 pb-3">
              {t('journeyTimeline')}
            </h3>

            <div className="space-y-6 relative pl-6">
              
              {/* Timeline Connector Line */}
              <div className="absolute top-3 bottom-3 left-2.5 w-0.5 bg-gray-200"></div>

              {activeDonation.timeline.map((stage, idx) => {
                const isCurrent = activeDonation.status === stage.status;
                const isCompleted = stage.completed;

                return (
                  <div key={idx} className="relative flex items-start space-x-3">
                    {/* Circle Node */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shrink-0 ${
                      isCompleted ? 'bg-emerald-700 text-white ring-4 ring-emerald-100' :
                      isCurrent ? 'bg-amber-500 text-gray-950 ring-4 ring-amber-200 animate-pulse' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? '✓' : idx + 1}
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold ${isCompleted ? 'text-emerald-950' : 'text-gray-500'}`}>
                        {stage.status}
                      </h4>
                      <p className="text-[11px] text-gray-600 leading-snug">{stage.detail}</p>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{stage.timestamp}</span>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      )}

      {/* Digital Impact Receipt Modal Popup */}
      {selectedReceiptDonation && (
        <ImpactReceipt
          donation={selectedReceiptDonation}
          onClose={() => setSelectedReceiptDonation(null)}
        />
      )}

    </div>
  );
};

export default TrackingDashboard;

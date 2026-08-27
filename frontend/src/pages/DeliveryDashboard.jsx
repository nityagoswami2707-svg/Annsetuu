import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Navigation,
  ArrowRight,
  ExternalLink,
  Play
} from 'lucide-react';

const DeliveryDashboard = () => {
  const { t, donations, updateDeliveryStatus, setSelectedReceiptDonation } = useApp();
  const [confirmModalDonation, setConfirmModalDonation] = useState(null);

  const driverDeliveries = donations.filter(d => d.status !== 'Rejected');
  const activeAssignment = driverDeliveries[0] || donations[0];

  const handleUpdate = (id, newStatus) => {
    if (newStatus === 'Delivered') {
      const target = donations.find(d => d.id === id);
      setConfirmModalDonation(target);
    } else {
      updateDeliveryStatus(id, newStatus);
    }
  };

  const handleConfirmDelivered = () => {
    if (!confirmModalDonation) return;
    updateDeliveryStatus(confirmModalDonation.id, 'Delivered');
    const target = confirmModalDonation;
    setConfirmModalDonation(null);
    setSelectedReceiptDonation(target);
  };

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen portal-motion-bg text-gray-900 relative overflow-hidden">
      
      {/* Multi-colored Motion Particles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl pointer-events-none motion-particle-purple"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400/25 rounded-full filter blur-3xl pointer-events-none motion-particle-orange"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Smartphone Driver Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-orange-600 text-white rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-orange-300">
          <div>
            <div className="flex items-center space-x-2">
              <Truck className="w-6 h-6 text-amber-400 animate-bounce" style={{ animationDuration: '3s' }} />
              <h1 className="text-xl sm:text-3xl font-extrabold font-outfit">Delivery Volunteer Portal</h1>
            </div>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">Smart Logistics Task Manager for Smartphone Users.</p>
          </div>

          <div className="bg-black/30 px-3.5 py-2 rounded-2xl border border-white/20 text-xs w-full sm:w-auto backdrop-blur-md">
            <span className="text-amber-300 font-bold block text-[10px]">Driver Profile & Vehicle</span>
            <span className="font-extrabold text-white text-xs sm:text-sm">Ramesh Kumar (GJ-06-EV-4412)</span>
          </div>
        </div>

        {/* CURRENT ASSIGNMENT CARD */}
        {activeAssignment && (
          <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl border-2 border-orange-500/40 p-5 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">Active Assignment</span>
                <h3 className="text-xl font-black font-outfit text-green-950">{activeAssignment.id}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800">
                {activeAssignment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Food Quantity & Meals</span>
                <p className="font-extrabold text-gray-900 text-sm">{activeAssignment.foodName}</p>
                <p className="text-amber-700 font-extrabold">{activeAssignment.servingCapacity} Meals ({activeAssignment.quantity})</p>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase">Pickup Address (Donor)</span>
                <p className="font-bold text-gray-900">{activeAssignment.donorName}</p>
                <p className="text-gray-600 text-[11px]">{activeAssignment.pickupAddress}, {activeAssignment.city}</p>
                <p className="text-amber-900 font-bold"><Phone className="w-3 h-3 inline mr-1" /> {activeAssignment.phone}</p>
              </div>

              <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1 sm:col-span-2">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">Destination (NGO Shelter)</span>
                <p className="font-extrabold text-emerald-950 text-sm">{activeAssignment.ngoName}</p>
                <p className="text-emerald-800 text-[11px]">Pickup Time: <strong>{activeAssignment.prepTime}</strong> ({activeAssignment.city}, Gujarat)</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider text-center">Driver Task Controls (Tap while on route)</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                <button
                  onClick={() => handleUpdate(activeAssignment.id, 'NGO Request Sent')}
                  className="min-h-[48px] px-4 rounded-2xl bg-green-900 hover:bg-green-950 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
                >
                  <Play className="w-4 h-4 text-amber-400" />
                  <span>Start Pickup</span>
                </button>

                <button
                  onClick={() => handleUpdate(activeAssignment.id, 'Picked Up')}
                  disabled={activeAssignment.status === 'Picked Up' || activeAssignment.status === 'In Transit' || activeAssignment.status === 'Delivered'}
                  className={`min-h-[48px] px-4 rounded-2xl font-black text-xs shadow-md flex items-center justify-center space-x-2 transition-all ${
                    activeAssignment.status === 'Picked Up' || activeAssignment.status === 'In Transit' || activeAssignment.status === 'Delivered'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white btn-bounce-active'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Picked Up</span>
                </button>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=22.3072,73.1811`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
                >
                  <Navigation className="w-4 h-4 text-gray-950" />
                  <span>Start Navigation</span>
                </a>

                <button
                  onClick={() => handleUpdate(activeAssignment.id, 'In Transit')}
                  disabled={activeAssignment.status === 'In Transit' || activeAssignment.status === 'Delivered'}
                  className={`min-h-[48px] px-4 rounded-2xl font-black text-xs shadow-md flex items-center justify-center space-x-2 transition-all ${
                    activeAssignment.status === 'In Transit' || activeAssignment.status === 'Delivered'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white btn-bounce-active'
                  }`}
                >
                  <Truck className="w-4 h-4 text-white" />
                  <span>In Transit</span>
                </button>

              </div>

              <button
                onClick={() => handleUpdate(activeAssignment.id, 'Delivered')}
                disabled={activeAssignment.status === 'Delivered'}
                className={`w-full min-h-[52px] px-6 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center space-x-2 transition-all ${
                  activeAssignment.status === 'Delivered'
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-green-700 hover:from-orange-600 hover:to-green-800 text-gray-950 btn-bounce-active'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>{activeAssignment.status === 'Delivered' ? 'Marked Delivered ✓' : 'Mark Delivered'}</span>
              </button>

            </div>

          </div>
        )}

        {confirmModalDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-gray-900">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black font-outfit text-green-950">Confirm Delivery Completion</h3>
                <p className="text-xs text-gray-600">
                  Handed over donation <strong className="text-emerald-900 font-mono">{confirmModalDonation.id}</strong> to <strong className="text-emerald-900">{confirmModalDonation.ngoName}</strong>?
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setConfirmModalDonation(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 btn-bounce-active"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelivered}
                  className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold shadow-lg btn-bounce-active"
                >
                  Yes, Delivered ✓
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DeliveryDashboard;

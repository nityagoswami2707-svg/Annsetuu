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
  ArrowRight
} from 'lucide-react';

const DeliveryDashboard = () => {
  const { donations, updateDeliveryStatus, setSelectedReceiptDonation } = useApp();
  const [confirmModalDonation, setConfirmModalDonation] = useState(null);

  // Active driver deliveries
  const driverDeliveries = donations.filter(d => d.status !== 'Rejected');

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
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-emerald-800">
        <div>
          <div className="flex items-center space-x-2">
            <Truck className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit">Delivery Volunteer Portal</h1>
          </div>
          <p className="text-emerald-200 text-sm mt-1">Active logistics task queue & status manager for meal transportation.</p>
        </div>

        <div className="bg-emerald-900 px-4 py-2 rounded-2xl border border-emerald-700 text-xs">
          <span className="text-emerald-300 font-bold block">Assigned Logistics Vehicle</span>
          <span className="font-extrabold text-amber-400 text-sm">Ramesh Kumar (GJ-06-EV-4412)</span>
        </div>
      </div>

      {/* Deliveries Queue */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-outfit text-emerald-950">Assigned Food Pickup & Delivery Orders</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {driverDeliveries.map(item => (
            <div key={item.id} className="bg-white rounded-3xl border border-emerald-900/10 shadow-lg overflow-hidden flex flex-col justify-between">
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Donation ID</span>
                    <h4 className="text-lg font-black font-outfit text-emerald-950">{item.id}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-700">
                  <p><strong>Food Item:</strong> {item.foodName} ({item.quantity})</p>
                  <p className="text-emerald-800 font-bold"><strong>Portions:</strong> {item.servingCapacity} Meals</p>
                  
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-amber-800 uppercase">Pickup Location (Donor)</p>
                    <p className="font-bold text-gray-900">{item.donorName}</p>
                    <p className="text-[11px] text-gray-600">{item.pickupAddress}, {item.city}</p>
                    <p className="text-[11px] text-amber-900 font-bold"><Phone className="w-3 h-3 inline mr-1" /> {item.phone}</p>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-emerald-800 uppercase">Destination (NGO Shelter)</p>
                    <p className="font-bold text-emerald-950">{item.ngoName}</p>
                    <p className="text-[11px] text-emerald-800">{item.city}, Gujarat</p>
                  </div>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdate(item.id, 'Picked Up')}
                  disabled={item.status === 'Picked Up' || item.status === 'In Transit' || item.status === 'Delivered'}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-colors ${
                    item.status === 'Picked Up' || item.status === 'In Transit' || item.status === 'Delivered'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-md'
                  }`}
                >
                  1. Picked Up
                </button>

                <button
                  onClick={() => handleUpdate(item.id, 'In Transit')}
                  disabled={item.status === 'In Transit' || item.status === 'Delivered'}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-colors ${
                    item.status === 'In Transit' || item.status === 'Delivered'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                  }`}
                >
                  2. In Transit
                </button>

                <button
                  onClick={() => handleUpdate(item.id, 'Delivered')}
                  disabled={item.status === 'Delivered'}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs transition-colors ${
                    item.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-500 hover:bg-amber-600 text-gray-950 shadow-md'
                  }`}
                >
                  {item.status === 'Delivered' ? 'Delivered ✓' : '3. Mark Delivered'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModalDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black font-outfit text-emerald-950">Confirm Delivery Completion</h3>
              <p className="text-xs text-gray-600">
                Confirm that donation <strong className="text-emerald-900 font-mono">{confirmModalDonation.id}</strong> has been safely handed over to <strong className="text-emerald-900">{confirmModalDonation.ngoName}</strong>?
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setConfirmModalDonation(null)}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-xs font-bold text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelivered}
                className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold shadow-lg"
              >
                Yes, Delivered ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DeliveryDashboard;

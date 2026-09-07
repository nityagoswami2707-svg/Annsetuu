import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
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
  Play,
  Award,
  LogOut,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeliveryDashboard = () => {
  const { t, donations, updateDeliveryStatus, setSelectedReceiptDonation, logoutUser } = useApp();
  const navigate = useNavigate();
  const [confirmModalDonation, setConfirmModalDonation] = useState(null);
  const [rejectModalDonation, setRejectModalDonation] = useState(null);
  const [rejectReason, setRejectReason] = useState("Vehicle breakdown");
  const [deliveryPhoto, setDeliveryPhoto] = useState(null);
  const [acceptedAssignments, setAcceptedAssignments] = useState({});

  const driverDeliveries = donations.filter(d => d.status !== 'Rejected');
  const activeAssignment = driverDeliveries[0] || donations[0];

  const handleAcceptDelivery = (id) => {
    setAcceptedAssignments(prev => ({ ...prev, [id]: true }));
    updateDeliveryStatus(id, 'Picked Up');
  };

  const handleConfirmReject = () => {
    if (!rejectModalDonation) return;
    updateDeliveryStatus(rejectModalDonation.id, 'Rejected');
    setRejectModalDonation(null);
  };

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
    setDeliveryPhoto(null);
    setSelectedReceiptDonation(target);
  };

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="track" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/95 hover:bg-orange-100 text-emerald-950 font-black text-xs border border-gray-200 shadow-md transition-all btn-bounce-active"
          >
            <Home className="w-4 h-4 text-orange-600" />
            <span>← {t('home')}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/certificates')}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md transition-all btn-bounce-active"
            >
              <Award className="w-4 h-4" />
              <span>{t('myCertificates')}</span>
            </button>

            <button
              onClick={() => {
                logoutUser();
                navigate('/');
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition-all btn-bounce-active"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logoutBtn')}</span>
            </button>
          </div>
        </div>

        {/* Smartphone Driver Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-orange-600 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-800">
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
          <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl border-2 border-orange-500/40 p-5 sm:p-7 shadow-xl space-y-5">
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

            {/* Volunteer Accept/Reject Request Controls */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                  Volunteer Delivery Request Action
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Status: {activeAssignment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleAcceptDelivery(activeAssignment.id)}
                  disabled={acceptedAssignments[activeAssignment.id] || activeAssignment.status === 'Delivered'}
                  className={`py-3 rounded-2xl font-black text-xs shadow-md flex items-center justify-center space-x-1.5 transition-all ${
                    acceptedAssignments[activeAssignment.id]
                      ? 'bg-emerald-900 text-white cursor-default'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white btn-bounce-active cursor-pointer'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>{acceptedAssignments[activeAssignment.id] ? 'ACCEPTED ✓' : 'ACCEPT DELIVERY'}</span>
                </button>

                <button
                  onClick={() => setRejectModalDonation(activeAssignment)}
                  disabled={activeAssignment.status === 'Delivered'}
                  className="py-3 rounded-2xl bg-red-100 hover:bg-red-200 text-red-900 font-black text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-all btn-bounce-active cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>REJECT REQUEST</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider text-center">Driver Task Controls (Tap while on route)</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                <button
                  onClick={() => handleUpdate(activeAssignment.id, 'NGO Request Sent')}
                  className="min-h-[48px] px-4 rounded-2xl bg-green-900 hover:bg-green-950 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active cursor-pointer"
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
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white btn-bounce-active cursor-pointer'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Picked Up</span>
                </button>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=22.3072,73.1811`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active cursor-pointer"
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
                      : 'bg-blue-600 hover:bg-blue-700 text-white btn-bounce-active cursor-pointer'
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
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-green-700 hover:from-orange-600 hover:to-green-800 text-gray-950 btn-bounce-active cursor-pointer'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>{activeAssignment.status === 'Delivered' ? 'Marked Delivered ✓' : 'Mark Delivered (Photo Required)'}</span>
              </button>

            </div>

          </div>
        )}

        {/* CONFIRM DELIVERY & UPLOAD PHOTO MODAL */}
        {confirmModalDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-gray-900">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black font-outfit text-green-950">Confirm Delivery & Photo Handover</h3>
                <p className="text-xs text-gray-600">
                  Handed over donation <strong className="text-emerald-900 font-mono">{confirmModalDonation.id}</strong> to <strong className="text-emerald-900">{confirmModalDonation.ngoName}</strong>?
                </p>
              </div>

              {/* Delivery Photo Capture / Upload */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-left space-y-2">
                <label className="text-xs font-bold text-gray-700 block">📷 Upload Delivery Confirmation Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setDeliveryPhoto(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-900 hover:file:bg-emerald-200"
                />
                {deliveryPhoto && (
                  <div className="w-full h-28 rounded-xl overflow-hidden border border-emerald-300">
                    <img src={deliveryPhoto} alt="Delivery Handover Proof" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setConfirmModalDonation(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 btn-bounce-active cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelivered}
                  className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold shadow-lg btn-bounce-active cursor-pointer"
                >
                  Yes, Delivered ✓
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REJECTION REASON MODAL FOR VOLUNTEERS */}
        {rejectModalDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-gray-900">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-left">
              <h3 className="text-lg font-black font-outfit text-emerald-950">Select Rejection Reason</h3>
              <p className="text-xs text-gray-600">Please select why you are unable to fulfill delivery request {rejectModalDonation.id}.</p>

              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs font-extrabold focus:outline-none bg-gray-50"
              >
                <option value="Vehicle breakdown / unavailable">Vehicle breakdown / unavailable</option>
                <option value="Pickup location too far">Pickup location too far</option>
                <option value="Schedule conflict">Schedule conflict</option>
                <option value="Package size exceeds vehicle capacity">Package size exceeds vehicle capacity</option>
                <option value="Other reason">Other reason</option>
              </select>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setRejectModalDonation(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 btn-bounce-active cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-4 py-2.5 rounded-xl bg-red-600 text-xs font-black text-white shadow-md btn-bounce-active cursor-pointer"
                >
                  Confirm Rejection
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

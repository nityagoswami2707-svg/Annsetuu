import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Utensils, 
  ShieldCheck, 
  Calendar,
  AlertTriangle,
  Send,
  Users,
  Eye,
  X
} from 'lucide-react';

const NgoDashboard = () => {
  const { t, donations, ngos, evaluateDonation, registerNgo } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('requests'); // requests, accepted, schedule, register
  const [rejectingDonationId, setRejectingDonationId] = useState(null);
  const [rejectReason, setRejectReason] = useState("Capacity unavailable");
  const [selectedDetailsDonation, setSelectedDetailsDonation] = useState(null);

  // New NGO Registration form state
  const [ngoRegData, setNgoRegData] = useState({
    name: "",
    registrationNo: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "Vadodara",
    pincode: "",
    availableCapacity: "300"
  });

  const activeNgo = ngos[0]; // Hope Foundation India

  const pendingRequests = donations.filter(d => d.status === 'Pending' || d.status === 'NGO Request Sent');
  const acceptedDonations = donations.filter(d => d.status === 'Accepted' || d.status === 'In Transit' || d.status === 'Picked Up');
  const pickupPending = donations.filter(d => d.status === 'Accepted' || d.status === 'NGO Request Sent');
  const deliveredDonations = donations.filter(d => d.status === 'Delivered');

  const handleAccept = (id) => {
    evaluateDonation(id, 'accept');
    if (selectedDetailsDonation?.id === id) {
      setSelectedDetailsDonation(null);
    }
  };

  const handleConfirmReject = () => {
    if (!rejectingDonationId) return;
    evaluateDonation(rejectingDonationId, 'reject', rejectReason);
    setRejectingDonationId(null);
    if (selectedDetailsDonation?.id === rejectingDonationId) {
      setSelectedDetailsDonation(null);
    }
  };

  const handleNgoSubmit = (e) => {
    e.preventDefault();
    registerNgo(ngoRegData);
    setActiveTab('requests');
  };

  return (
    <div className="pt-20 pb-20 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl sm:text-3xl font-extrabold font-outfit">Annsetu NGO Portal</h1>
          </div>
          <p className="text-emerald-200 text-xs sm:text-sm mt-1">Review incoming food requests & evaluate quality.</p>
        </div>

        {/* Verification Status Badge */}
        <div className="flex items-center space-x-3 bg-emerald-900/90 px-3.5 py-2 rounded-2xl border border-emerald-700 text-xs w-full md:w-auto">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-emerald-300 font-bold uppercase block">Verification Status</span>
            <span className="text-xs font-black text-emerald-100 flex items-center">
              {activeNgo.name} — <span className="text-amber-400 ml-1">Verified ✓</span>
            </span>
          </div>
        </div>
      </div>

      {/* TOP SUMMARY CARDS SPECIFICATION */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm card-zoom-3d">
          <span className="text-xs font-bold text-gray-500 block">New Requests</span>
          <p className="text-2xl font-black text-amber-600 font-outfit mt-1">{pendingRequests.length}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm card-zoom-3d">
          <span className="text-xs font-bold text-gray-500 block">Accepted</span>
          <p className="text-2xl font-black text-emerald-800 font-outfit mt-1">{acceptedDonations.length}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm card-zoom-3d">
          <span className="text-xs font-bold text-gray-500 block">Pickup Pending</span>
          <p className="text-2xl font-black text-blue-600 font-outfit mt-1">{pickupPending.length}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm card-zoom-3d">
          <span className="text-xs font-bold text-gray-500 block">Delivered</span>
          <p className="text-2xl font-black text-purple-700 font-outfit mt-1">{deliveredDonations.length * 50 + 2500}</p>
        </div>
      </div>

      {/* NGO Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
            activeTab === 'requests' ? 'bg-emerald-900 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200'
          }`}
        >
          Requests ({pendingRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
            activeTab === 'accepted' ? 'bg-emerald-900 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200'
          }`}
        >
          Active Pickups ({acceptedDonations.length})
        </button>

        <button
          onClick={() => setActiveTab('register')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
            activeTab === 'register' ? 'bg-amber-500 text-gray-950 font-black shadow-md' : 'bg-white text-gray-700 border border-gray-200'
          }`}
        >
          + Register NGO
        </button>
      </div>

      {/* TAB 1: DONATION CARDS LIST SPECIFICATION */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-black font-outfit text-green-950">Incoming Food Requests</h3>
          
          {pendingRequests.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl text-center text-gray-500 border border-gray-100">
              <Utensils className="w-10 h-10 mx-auto text-emerald-300 mb-2" />
              <p className="text-xs sm:text-sm font-bold">No pending donation requests right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map(item => (
                <div key={item.id} className="bg-white rounded-3xl border border-emerald-900/15 shadow-md p-5 space-y-3.5 card-zoom-3d">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-black font-mono text-emerald-900">
                      Donation {item.id}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">{item.createdAt}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-black font-outfit text-gray-900">{item.foodName}</h4>
                    <p className="text-xs font-bold text-amber-700">{item.servingCapacity} Meals ({item.quantity})</p>
                    <p className="text-xs text-gray-600">Prepared: <strong>{item.prepTime}</strong> ({item.prepDate})</p>
                    <p className="text-xs text-gray-600">Distance: <strong>2.1 km away</strong> ({item.city})</p>
                  </div>

                  {/* Mobile Button Controls */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedDetailsDonation(item)}
                      className="py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center space-x-1 btn-bounce-active"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => handleAccept(item.id)}
                      className="py-2.5 px-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center space-x-1 btn-bounce-active"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>

                    <button
                      onClick={() => setRejectingDonationId(item.id)}
                      className="py-2.5 px-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs flex items-center justify-center space-x-1 btn-bounce-active"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW DETAILS MOBILE BOTTOM SHEET MODAL */}
      {selectedDetailsDonation && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in p-0 sm:p-4"
          onClick={() => setSelectedDetailsDonation(null)}
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto border-t-4 border-emerald-700 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">Food Evaluation Details</span>
                <h3 className="text-lg font-black font-outfit text-green-950">Donation {selectedDetailsDonation.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedDetailsDonation(null)}
                className="p-1 rounded-xl bg-gray-100 text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Food Photograph */}
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
              <img src={selectedDetailsDonation.imageUrl} alt="Food Photograph" className="w-full h-full object-cover" />
            </div>

            {/* Evaluation Fields */}
            <div className="space-y-2 text-xs text-gray-700 bg-emerald-50/70 p-4 rounded-2xl">
              <p><strong>Food Description:</strong> {selectedDetailsDonation.foodName}</p>
              <p><strong>Quantity:</strong> {selectedDetailsDonation.quantity}</p>
              <p><strong>Serving Capacity:</strong> <span className="font-extrabold text-green-900">{selectedDetailsDonation.servingCapacity} People</span></p>
              <p><strong>Preparation Date & Time:</strong> {selectedDetailsDonation.prepTime} ({selectedDetailsDonation.prepDate})</p>
              <p><strong>Quality / Condition:</strong> {selectedDetailsDonation.foodQuality}</p>
              <p><strong>Donor Location:</strong> {selectedDetailsDonation.donorName}, {selectedDetailsDonation.pickupAddress}, {selectedDetailsDonation.city}</p>
              <p><strong>Contact Phone:</strong> {selectedDetailsDonation.phone}</p>
            </div>

            {/* Food Safety Declaration Badge */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Donor Hygiene Declaration Confirmed ✓</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleAccept(selectedDetailsDonation.id)}
                className="py-3 rounded-2xl bg-emerald-800 text-white font-black text-xs shadow-md btn-bounce-active"
              >
                Accept Donation
              </button>

              <button
                onClick={() => {
                  setRejectingDonationId(selectedDetailsDonation.id);
                }}
                className="py-3 rounded-2xl bg-red-100 text-red-800 font-black text-xs btn-bounce-active"
              >
                Reject Donation
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectingDonationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-outfit text-emerald-950">Select Rejection Reason</h3>
            <p className="text-xs text-gray-600">Please specify why this donation cannot be accepted.</p>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none"
            >
              <option value="Food quality unsuitable">Food quality unsuitable</option>
              <option value="Pickup distance too far">Pickup distance too far</option>
              <option value="Insufficient information">Insufficient information</option>
              <option value="Food safety concern">Food safety concern</option>
              <option value="Capacity unavailable">Capacity unavailable</option>
              <option value="Other">Other</option>
            </select>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setRejectingDonationId(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 btn-bounce-active"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white shadow-md btn-bounce-active"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE ACCEPTED PICKUPS */}
      {activeTab === 'accepted' && (
        <div className="space-y-3">
          <h3 className="text-base font-black font-outfit text-emerald-950">Active Accepted Pickups</h3>
          {acceptedDonations.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2 card-zoom-3d">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900 font-mono">{item.id}</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  {item.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-gray-900">{item.foodName} ({item.servingCapacity} Meals)</h4>
              <p className="text-[11px] text-gray-500">Driver: <strong>{item.deliveryDriver.name}</strong></p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: REGISTER NEW NGO */}
      {activeTab === 'register' && (
        <form onSubmit={handleNgoSubmit} className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md space-y-4 max-w-lg mx-auto">
          <h3 className="text-base font-black font-outfit text-emerald-950">Register New NGO Organization</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">NGO Name *</label>
              <input
                type="text"
                required
                value={ngoRegData.name}
                onChange={(e) => setNgoRegData({ ...ngoRegData, name: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Registration Number *</label>
              <input
                type="text"
                required
                value={ngoRegData.registrationNo}
                onChange={(e) => setNgoRegData({ ...ngoRegData, registrationNo: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Contact Person *</label>
              <input
                type="text"
                required
                value={ngoRegData.contactPerson}
                onChange={(e) => setNgoRegData({ ...ngoRegData, contactPerson: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={ngoRegData.phone}
                onChange={(e) => setNgoRegData({ ...ngoRegData, phone: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-emerald-900 text-white font-black text-xs shadow-md btn-bounce-active"
          >
            Submit NGO for Admin Verification
          </button>
        </form>
      )}

    </div>
  );
};

export default NgoDashboard;

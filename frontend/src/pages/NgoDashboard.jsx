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
  Users
} from 'lucide-react';

const NgoDashboard = () => {
  const { donations, ngos, evaluateDonation, registerNgo } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('requests'); // requests, accepted, schedule, register
  const [rejectingDonationId, setRejectingDonationId] = useState(null);
  const [rejectReason, setRejectReason] = useState("Capacity unavailable");

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
  const deliveredDonations = donations.filter(d => d.status === 'Delivered');

  const handleAccept = (id) => {
    evaluateDonation(id, 'accept');
  };

  const handleConfirmReject = () => {
    if (!rejectingDonationId) return;
    evaluateDonation(rejectingDonationId, 'reject', rejectReason);
    setRejectingDonationId(null);
  };

  const handleNgoSubmit = (e) => {
    e.preventDefault();
    registerNgo(ngoRegData);
    alert("NGO Registration submitted successfully! Pending Admin verification.");
    setActiveTab('requests');
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit">Annsetu NGO Portal</h1>
          </div>
          <p className="text-emerald-200 text-sm mt-1">Manage incoming food donation requests and coordinate shelter pickups.</p>
        </div>

        {/* Verification Status Badge */}
        <div className="flex items-center space-x-3 bg-emerald-900/90 px-4 py-2 rounded-2xl border border-emerald-700">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] text-emerald-300 font-bold uppercase block">Verification Status</span>
            <span className="text-xs font-black text-emerald-100 flex items-center">
              {activeNgo.name} — <span className="text-amber-400 ml-1">Verified Badge ✓</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Bar for NGO Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'requests' ? 'bg-emerald-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Donation Requests ({pendingRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'accepted' ? 'bg-emerald-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Accepted & Active Pickups ({acceptedDonations.length})
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'schedule' ? 'bg-emerald-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Delivered History ({deliveredDonations.length})
        </button>

        <button
          onClick={() => setActiveTab('register')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'register' ? 'bg-amber-500 text-gray-950 font-black shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          + Register New NGO Partner
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs">
          <span className="text-xs font-bold text-gray-500">New Requests</span>
          <p className="text-2xl font-black text-amber-600 font-outfit mt-1">{pendingRequests.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs">
          <span className="text-xs font-bold text-gray-500">Accepted Active</span>
          <p className="text-2xl font-black text-emerald-800 font-outfit mt-1">{acceptedDonations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs">
          <span className="text-xs font-bold text-gray-500">Delivered Meals</span>
          <p className="text-2xl font-black text-blue-700 font-outfit mt-1">{deliveredDonations.length * 50 + 2500}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs">
          <span className="text-xs font-bold text-gray-500">Shelter Capacity</span>
          <p className="text-2xl font-black text-emerald-950 font-outfit mt-1">{activeNgo.availableCapacity}</p>
        </div>
      </div>

      {/* TAB 1: DONATION EVALUATION QUEUE */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-outfit text-emerald-950">Incoming Food Donation Evaluation Queue</h3>
          
          {pendingRequests.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl text-center text-gray-500 border border-gray-100">
              <Utensils className="w-10 h-10 mx-auto text-emerald-300 mb-2" />
              <p className="text-sm font-bold">No pending donation requests right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingRequests.map(item => (
                <div key={item.id} className="bg-white rounded-3xl border border-emerald-900/10 shadow-lg overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        {item.id}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">{item.createdAt}</span>
                    </div>

                    <div className="flex items-start space-x-4">
                      <img src={item.imageUrl} alt="Food" className="w-24 h-24 rounded-2xl object-cover border border-gray-200 shrink-0" />
                      <div>
                        <h4 className="text-lg font-bold font-outfit text-emerald-950">{item.foodName}</h4>
                        <p className="text-xs text-amber-700 font-bold">{item.quantity} ({item.servingCapacity} portions)</p>
                        <p className="text-xs text-gray-600 mt-1">Quality: <span className="font-bold text-emerald-700">{item.foodQuality}</span></p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Prep Time: {item.prepTime} ({item.prepDate})</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-2xl space-y-1 text-xs text-emerald-950">
                      <p><strong>Donor:</strong> {item.donorName} ({item.donorType})</p>
                      <p><strong>Pickup Address:</strong> {item.pickupAddress}, {item.city}</p>
                      <p><strong>Contact:</strong> {item.phone}</p>
                      <p><strong>Condition:</strong> {item.foodCondition}</p>
                    </div>
                  </div>

                  {/* Accept / Reject Action Buttons */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAccept(item.id)}
                      className="py-3 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>[ Accept Donation ]</span>
                    </button>

                    <button
                      onClick={() => setRejectingDonationId(item.id)}
                      className="py-3 px-4 rounded-2xl bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs flex items-center justify-center space-x-1.5"
                    >
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span>[ Reject Donation ]</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectingDonationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-outfit text-emerald-950">Rejection Reason Required</h3>
            <p className="text-xs text-gray-600">Please specify why this donation cannot be accepted by your NGO.</p>

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
                className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white shadow-md"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACCEPTED & ACTIVE PICKUPS */}
      {activeTab === 'accepted' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md space-y-4">
          <h3 className="text-xl font-bold font-outfit text-emerald-950">Active Accepted Pickups</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-100">
                  <th className="p-3">ID</th>
                  <th className="p-3">Donor</th>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Serving Count</th>
                  <th className="p-3">Assigned Driver</th>
                  <th className="p-3">Current Telematics Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {acceptedDonations.map(item => (
                  <tr key={item.id} className="hover:bg-emerald-50/50">
                    <td className="p-3 font-bold text-emerald-900">{item.id}</td>
                    <td className="p-3 font-semibold">{item.donorName}</td>
                    <td className="p-3">{item.foodName}</td>
                    <td className="p-3 font-bold text-amber-700">{item.servingCapacity} Meals</td>
                    <td className="p-3 font-semibold text-emerald-800">{item.deliveryDriver.name}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REGISTER NEW NGO */}
      {activeTab === 'register' && (
        <form onSubmit={handleNgoSubmit} className="bg-white rounded-3xl p-8 border border-emerald-900/10 shadow-md space-y-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold font-outfit text-emerald-950">Register New NGO Organization</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">NGO Name *</label>
              <input
                type="text"
                required
                value={ngoRegData.name}
                onChange={(e) => setNgoRegData({ ...ngoRegData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Registration Number *</label>
              <input
                type="text"
                required
                value={ngoRegData.registrationNo}
                onChange={(e) => setNgoRegData({ ...ngoRegData, registrationNo: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Contact Person *</label>
              <input
                type="text"
                required
                value={ngoRegData.contactPerson}
                onChange={(e) => setNgoRegData({ ...ngoRegData, contactPerson: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={ngoRegData.phone}
                onChange={(e) => setNgoRegData({ ...ngoRegData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-900 text-white font-bold text-xs shadow-lg hover:bg-emerald-950"
          >
            Submit NGO for Admin Verification
          </button>
        </form>
      )}

    </div>
  );
};

export default NgoDashboard;

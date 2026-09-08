import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
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
  X,
  Award,
  LogOut,
  Home
} from 'lucide-react';

const NgoDashboard = () => {
  const { t, donations, ngos, evaluateDonation, registerNgo, logoutUser, currentUser, ngoRequests = [], createNgoRequirement, cancelNgoRequirement, calculatePriorityScore } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('requests');
  const [rejectingDonationId, setRejectingDonationId] = useState(null);
  const [findVolunteerDonation, setFindVolunteerDonation] = useState(null);
  const [assignedDriverMsg, setAssignedDriverMsg] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reqFormData, setReqFormData] = useState({
    foodCategory: "Prepared Cooked Food",
    quantityRequired: "100",
    urgencyLevel: "Urgent",
    requiredByDate: new Date().toISOString().split('T')[0],
    requiredByTime: "20:00",
    peopleCount: "100",
    city: currentUser?.city || "Vadodara",
    address: currentUser?.address || "",
    pincode: currentUser?.pincode || "390001",
    notes: ""
  });

  const activeNgo = ngos?.find(n => n.email === currentUser?.email) || ngos?.[0] || { name: 'Hope Foundation India', status: 'Verified' };
  const isGaushalaUser = currentUser?.organizationType === "Gaushala / Animal Feed Organization" || activeNgo?.organizationType === "Gaushala / Animal Feed Organization";

  const handleCreateRequirement = (e) => {
    e.preventDefault();
    createNgoRequirement(reqFormData);
    setShowCreateModal(false);
    setActiveTab('my-requirements');
  };

  const sampleVolunteers = [
    { name: "Ramesh Kumar", vehicle: "Car / EV", distance: "1.2 km", avail: "Available Now", score: 96, phone: "+91 91066 33221" },
    { name: "Priya Patel", vehicle: "Two-Wheeler", distance: "2.8 km", avail: "Available in 10 mins", score: 85, phone: "+91 98251 44556" },
    { name: "Sanjay Shah", vehicle: "Van / Cargo EV", distance: "3.5 km", avail: "Available Now", score: 79, phone: "+91 94260 11223" }
  ];

  const handleDispatchVolunteer = (vol) => {
    setAssignedDriverMsg(`Assigned ${vol.name} (${vol.vehicle}) to donation ${findVolunteerDonation?.id}`);
    setTimeout(() => {
      setAssignedDriverMsg('');
      setFindVolunteerDonation(null);
    }, 2000);
  };
  const [rejectReason, setRejectReason] = useState("Capacity unavailable");
  const [selectedDetailsDonation, setSelectedDetailsDonation] = useState(null);

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
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="ngo" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
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
                navigate('/', { replace: true });
                logoutUser(navigate);
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logoutBtn')}</span>
            </button>          </div>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-amber-400" />
              <h1 className="text-xl sm:text-3xl font-extrabold font-outfit">Annsetu NGO Portal</h1>
            </div>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1">Review incoming food requests & evaluate quality.</p>
          </div>

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

        {/* TOP SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/95 backdrop-blur-md text-gray-900 p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <span className="text-xs font-bold text-gray-500 block">New Requests</span>
            <p className="text-2xl font-black text-amber-600 font-outfit mt-1">{pendingRequests.length}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md text-gray-900 p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <span className="text-xs font-bold text-gray-500 block">Accepted</span>
            <p className="text-2xl font-black text-emerald-800 font-outfit mt-1">{acceptedDonations.length}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md text-gray-900 p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <span className="text-xs font-bold text-gray-500 block">Pickup Pending</span>
            <p className="text-2xl font-black text-blue-600 font-outfit mt-1">{pickupPending.length}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md text-gray-900 p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <span className="text-xs font-bold text-gray-500 block">Delivered</span>
            <p className="text-2xl font-black text-purple-700 font-outfit mt-1">{deliveredDonations.length * 50 + 2500}</p>
          </div>
        </div>

        {/* NGO Tabs Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
                activeTab === 'requests' ? 'bg-emerald-800 text-white font-black shadow-md' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Requests ({pendingRequests.length})
            </button>

            <button
              onClick={() => setActiveTab('accepted')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
                activeTab === 'accepted' ? 'bg-emerald-800 text-white font-black shadow-md' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Active Pickups ({acceptedDonations.length})
            </button>

            <button
              onClick={() => setActiveTab('my-requirements')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
                activeTab === 'my-requirements' ? 'bg-emerald-800 text-white font-black shadow-md' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              📋 Food Requirements ({ngoRequests.length})
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all tab-animated ${
                activeTab === 'register' ? 'bg-orange-600 text-white font-black shadow-md' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              + Register NGO
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md transition-all btn-bounce-active flex items-center space-x-1"
          >
            <span>+ Post Requirement</span>
          </button>
        </div>

        {/* TAB 0: NGO FOOD REQUIREMENTS */}
        {activeTab === 'my-requirements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-black font-outfit text-green-950">NGO Food Requirements & Priority Tracker</h3>
                <p className="text-xs text-gray-600">Post immediate food or organic waste needs to donors with auto-calculated P1-P4 priority levels.</p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md transition-all btn-bounce-active flex items-center space-x-1.5"
              >
                <span>+ Create Food Requirement</span>
              </button>
            </div>

            {ngoRequests.length === 0 ? (
              <div className="bg-white/95 backdrop-blur-md text-gray-900 p-8 rounded-3xl text-center border border-gray-200 shadow-sm">
                <Utensils className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                <p className="text-xs sm:text-sm font-bold">No active food requirements posted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ngoRequests.map(req => {
                  const priority = calculatePriorityScore(req);
                  const reqQty = parseInt(req.quantityRequired) || 1;
                  const fulQty = parseInt(req.quantityFulfilled) || 0;
                  const remQty = req.remainingQuantity !== undefined ? parseInt(req.remainingQuantity) : reqQty;
                  const fulPct = Math.min(100, Math.round((fulQty / reqQty) * 100));

                  return (
                    <div key={req.id} className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl border border-gray-200/80 shadow-md p-5 space-y-3.5 card-zoom-3d relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-xs font-black font-mono text-emerald-900">
                          Req ID: {req.id} ({req.ngoName})
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${priority.colorClass}`}>
                          {priority.priorityBadge} ({priority.score} pts)
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-black font-outfit text-gray-900">{req.foodCategory}</h4>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${req.status === 'Fully Fulfilled' ? 'bg-green-100 text-green-800' : req.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">Urgency: <strong className="text-amber-700">{req.urgencyLevel}</strong> | Required By: <strong>{req.requiredByDate} at {req.requiredByTime}</strong></p>
                        <p className="text-xs text-gray-600">Target Beneficiaries: <strong>{req.peopleCount} People</strong> | City: <strong>{req.city}</strong></p>
                        {req.notes && <p className="text-xs italic text-gray-500 bg-gray-50 p-2 rounded-xl border border-gray-100">"{req.notes}"</p>}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                        <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                          <span>Progress ({fulPct}% Fulfilled)</span>
                          <span className="font-mono text-emerald-900">{fulQty} / {reqQty} {req.unit || 'meals'}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${fulPct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-500">
                          <span>Fulfilled: {fulQty} {req.unit || 'meals'}</span>
                          <span className="font-extrabold text-orange-600">Remaining: {remQty} {req.unit || 'meals'}</span>
                        </div>
                      </div>

                      {req.status !== 'Cancelled' && req.status !== 'Fully Fulfilled' && (
                        <div className="pt-1">
                          <button
                            onClick={() => cancelNgoRequirement(req.id)}
                            className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center space-x-1 border border-red-200 transition-all btn-bounce-active"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel Requirement</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 1: REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black font-outfit text-green-950">Incoming Food Requests</h3>
            
            {pendingRequests.length === 0 ? (
              <div className="bg-white/95 backdrop-blur-md text-gray-900 p-8 rounded-3xl text-center border border-gray-200 shadow-sm">
                <Utensils className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                <p className="text-xs sm:text-sm font-bold">No pending donation requests right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRequests.map(item => (
                  <div key={item.id} className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl border border-gray-200/80 shadow-md p-5 space-y-3.5 card-zoom-3d">
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

        {/* VIEW DETAILS BOTTOM SHEET MODAL */}
        {selectedDetailsDonation && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in p-0 sm:p-4 text-gray-900"
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
                  className="px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-black text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-4 h-4" />
                  <span>✕ Close</span>
                </button>
              </div>

              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm group">
                <img src={selectedDetailsDonation.imageUrl} alt="Food Photograph" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-xl bg-white text-gray-900 font-black text-xs shadow flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-orange-600" />
                    <span>View Food Image</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-700 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                <p><strong>Food Item Name:</strong> <span className="font-extrabold text-green-950">{selectedDetailsDonation.foodName}</span></p>
                <p><strong>Food Category:</strong> {selectedDetailsDonation.foodCategory}</p>
                <p><strong>Total Quantity:</strong> {selectedDetailsDonation.quantity}</p>
                <p><strong>Serving Capacity:</strong> <span className="font-extrabold text-emerald-900">{selectedDetailsDonation.servingCapacity} People</span></p>
                <p><strong>Food Timing Slot:</strong> <span className="font-black text-orange-700">{selectedDetailsDonation.foodTimingText || '🌅 Morning / 🌆 Evening Slot'}</span></p>
                <p><strong>Prep Date & Time:</strong> {selectedDetailsDonation.prepTime || '12:30'} ({selectedDetailsDonation.prepDate || '2026-09-07'})</p>
                <p><strong>Pickup Date & Time:</strong> {selectedDetailsDonation.pickupTime || '14:00'} ({selectedDetailsDonation.pickupDate || '2026-09-07'})</p>
                <p><strong>Donor Location:</strong> {selectedDetailsDonation.donorName}, {selectedDetailsDonation.pickupAddress}, {selectedDetailsDonation.city}</p>
                <p><strong>Contact Phone:</strong> {selectedDetailsDonation.phone}</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Donor Hygiene Declaration Confirmed ✓</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleAccept(selectedDetailsDonation.id)}
                  className="py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md btn-bounce-active cursor-pointer"
                >
                  Accept Donation
                </button>

                <button
                  onClick={() => {
                    setRejectingDonationId(selectedDetailsDonation.id);
                  }}
                  className="py-3 rounded-2xl bg-red-100 hover:bg-red-200 text-red-800 font-black text-xs btn-bounce-active cursor-pointer"
                >
                  Reject Donation
                </button>
              </div>

            </div>
          </div>
        )}

        {/* REJECTION REASON MODAL */}
        {rejectingDonationId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-gray-900">
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
            <h3 className="text-base font-black font-outfit text-green-950">Active Accepted Pickups</h3>
            {acceptedDonations.map(item => (
              <div key={item.id} className="bg-white/95 backdrop-blur-md text-gray-900 p-5 rounded-2xl border border-gray-200 shadow-md space-y-3 card-zoom-3d">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-900 font-mono">{item.id}</span>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900">{item.foodName} ({item.servingCapacity} Meals)</h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
                  <p className="text-[11px] text-gray-600">Assigned Volunteer: <strong className="text-emerald-950">{item.deliveryDriver.name}</strong></p>
                  <button
                    onClick={() => setFindVolunteerDonation(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-sm flex items-center space-x-1.5 btn-bounce-active cursor-pointer"
                  >
                    <span>🔍 FIND VOLUNTEER</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FIND VOLUNTEER WEIGHTED MATCHING MODAL */}
        {findVolunteerDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-gray-900">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider">AI Weighted Volunteer Ranking</span>
                  <h3 className="text-lg font-black font-outfit text-green-950">Matching Volunteers for {findVolunteerDonation.id}</h3>
                </div>
                <button onClick={() => setFindVolunteerDonation(null)} className="p-1 rounded-xl bg-gray-100 text-gray-600 hover:text-gray-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {assignedDriverMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-black text-center">
                  {assignedDriverMsg}
                </div>
              )}

              <p className="text-xs text-gray-500 italic bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                “Matching is based on proximity, capacity, and schedule compatibility without encouraging unsafe transit speeds.”
              </p>

              <div className="space-y-3">
                {sampleVolunteers.map((vol, idx) => (
                  <div key={idx} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-gray-900">{vol.name}</span>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Match Score: {vol.score}%
                        </span>
                      </div>
                      <p className="text-gray-600 text-[11px]">{vol.vehicle} • {vol.distance} away • {vol.avail}</p>
                    </div>

                    <button
                      onClick={() => handleDispatchVolunteer(vol)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md btn-bounce-active shrink-0 cursor-pointer"
                    >
                      DISPATCH VOLUNTEER
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGISTER NEW NGO */}
        {activeTab === 'register' && (
          <form onSubmit={handleNgoSubmit} className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-6 border border-gray-200/80 shadow-md space-y-4 max-w-lg mx-auto">
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
              className="w-full h-12 rounded-2xl bg-emerald-800 text-white font-black text-xs shadow-md btn-bounce-active"
            >
              Submit NGO for Admin Verification
            </button>
          </form>
        )}

        {/* CREATE FOOD REQUIREMENT MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in text-gray-900">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto border-t-4 border-orange-500 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">Food Requirement Portal</span>
                  <h3 className="text-lg font-black font-outfit text-green-950">Post NGO Food Requirement</h3>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-xl bg-gray-100 text-gray-600 hover:text-gray-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRequirement} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Food Category / Need Type *</label>
                  <select
                    value={reqFormData.foodCategory}
                    onChange={(e) => {
                      const cat = e.target.value;
                      setReqFormData(prev => ({
                        ...prev,
                        foodCategory: cat,
                        quantityRequired: cat === 'Vegetable/Organic Waste' ? "200" : "100"
                      }));
                    }}
                    className="w-full p-2.5 rounded-xl border border-gray-300 font-bold bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Prepared Cooked Food">Prepared Cooked Food</option>
                    <option value="Grocery / Raw Food">Grocery / Raw Food</option>
                    <option value="Bakery / Packaged">Bakery / Packaged</option>
                    {isGaushalaUser && (
                      <option value="Vegetable/Organic Waste">Vegetable/Organic Waste (KG for Animals/Gaushala)</option>
                    )}
                  </select>
                  {!isGaushalaUser && (
                    <p className="text-[10px] text-gray-400 mt-0.5">Note: Organic/Vegetable Waste is restricted exclusively to registered Gaushalas & Animal Feed shelters.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      {reqFormData.foodCategory === 'Vegetable/Organic Waste' ? 'Quantity Needed (KG) *' : 'Quantity Needed (Meals) *'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={reqFormData.quantityRequired}
                      onChange={(e) => setReqFormData({ ...reqFormData, quantityRequired: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                      placeholder="e.g. 100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Urgency Level *</label>
                    <select
                      value={reqFormData.urgencyLevel}
                      onChange={(e) => setReqFormData({ ...reqFormData, urgencyLevel: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-bold bg-white"
                    >
                      <option value="Emergency">🚨 Emergency (Immediate)</option>
                      <option value="Urgent">⚡ Urgent (Today)</option>
                      <option value="Normal">🟢 Normal (1-2 Days)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Required By Date *</label>
                    <input
                      type="date"
                      required
                      value={reqFormData.requiredByDate}
                      onChange={(e) => setReqFormData({ ...reqFormData, requiredByDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Required By Time *</label>
                    <input
                      type="time"
                      required
                      value={reqFormData.requiredByTime}
                      onChange={(e) => setReqFormData({ ...reqFormData, requiredByTime: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Target Beneficiaries Count *</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={reqFormData.peopleCount}
                      onChange={(e) => setReqFormData({ ...reqFormData, peopleCount: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                      placeholder="e.g. 150"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={reqFormData.city}
                      onChange={(e) => setReqFormData({ ...reqFormData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Notes / Instructions</label>
                  <textarea
                    rows="2"
                    value={reqFormData.notes}
                    onChange={(e) => setReqFormData({ ...reqFormData, notes: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 font-medium"
                    placeholder="Specify dietary details, packaging requirements or loading instructions..."
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md"
                  >
                    Publish Requirement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NgoDashboard;

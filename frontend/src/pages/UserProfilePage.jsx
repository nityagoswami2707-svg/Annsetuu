import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Check, 
  Edit3, 
  Award,
  Sparkles,
  ArrowLeft,
  Heart,
  Truck,
  Utensils,
  CheckCircle2,
  Lock,
  Clock,
  Layers,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const UserProfilePage = () => {
  const { 
    currentUser, 
    updateUserProfile, 
    t, 
    getServicesCountForUser, 
    donations, 
    ngos, 
    certificates 
  } = useApp();
  
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    pincode: '',
    organizationName: '',
    contactPerson: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        city: currentUser.city || 'Vadodara',
        address: currentUser.address || '',
        pincode: currentUser.pincode || '390001',
        organizationName: currentUser.organizationName || currentUser.name || '',
        contactPerson: currentUser.contactPerson || currentUser.name || ''
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="relative min-h-screen pt-28 pb-20 flex flex-col items-center justify-center text-white">
        <AnnsetuMotionBackground type="dashboard" />
        <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-3xl text-center text-emerald-950 max-w-md shadow-2xl border-2 border-orange-500/20">
          <RefreshCw className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-black font-outfit">Loading your profile...</h2>
          <p className="text-xs text-gray-600 mt-2 font-semibold">Retrieving authenticated user details from Supabase</p>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats from Supabase/AppContext
  const userDonations = donations.filter(d => 
    d.donorName === currentUser.name || 
    d.contactPerson === currentUser.name || 
    currentUser.role === 'admin'
  );

  const deliveredDonations = donations.filter(d => d.status === 'Delivered');

  const verifiedServices = getServicesCountForUser ? getServicesCountForUser(currentUser.id) : 12;
  const impactPoints = verifiedServices * 10;
  const totalServings = userDonations.reduce((sum, d) => sum + (parseInt(d.servingCapacity) || 25), 0) || 150;

  // Level determination based on points
  let currentLevel = "Bronze Champion";
  if (impactPoints >= 150) currentLevel = "Gold Legend";
  else if (impactPoints >= 80) currentLevel = "Silver Hero";

  // Navigation back to correct dashboard
  const handleBackToDashboard = () => {
    switch (currentUser.role) {
      case 'donor':
        navigate('/donor');
        break;
      case 'ngo':
        navigate('/ngo');
        break;
      case 'volunteer':
        navigate('/delivery');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (updateUserProfile) {
      updateUserProfile(formData);
    }

    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 400);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      city: currentUser.city || 'Vadodara',
      address: currentUser.address || '',
      pincode: currentUser.pincode || '390001',
      organizationName: currentUser.organizationName || currentUser.name || '',
      contactPerson: currentUser.contactPerson || currentUser.name || ''
    });
    setIsEditing(false);
  };

  // Get Initials for Avatar
  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 text-[#062c21]">
      {/* Background Motion Layer */}
      <AnnsetuMotionBackground type="dashboard" />

      {/* Full-Screen Content Container (80-90% width, max-w-7xl centered) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar: Back to Dashboard & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-md border border-orange-500/20">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-800 text-white font-extrabold text-xs hover:bg-emerald-900 transition-all shadow-md btn-bounce-active cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <span>← Back to {currentUser.role ? currentUser.role.toUpperCase() : 'USER'} Dashboard</span>
          </button>

          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h1 className="text-lg sm:text-xl font-black font-outfit text-emerald-950">AnnSetu Verified User Profile</h1>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-100 border-2 border-emerald-500 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>Profile updated successfully. Changes have been saved to your account.</span>
            </div>
            <button onClick={() => setSaveSuccess(false)} className="text-emerald-800 hover:text-emerald-950 font-black">✕</button>
          </div>
        )}

        {/* ==================================================== */}
        {/* HERO PROFILE HEADER CARD                              */}
        {/* ==================================================== */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/30 relative overflow-hidden">
          {/* Subtle overlay elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            
            {/* Left: Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              
              {/* Circular Avatar / Initials */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 p-1 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-emerald-950 flex items-center justify-center text-amber-300 font-black font-outfit text-2xl sm:text-3xl border-2 border-amber-400/40 shadow-inner">
                    {getInitials(currentUser.name)}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 p-1.5 bg-emerald-500 text-white rounded-full border-2 border-white shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* User Name & Badges */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight text-white">
                    {currentUser.name}
                  </h2>
                  <span className="text-xs font-black uppercase tracking-widest bg-amber-400 text-gray-950 px-3 py-0.5 rounded-full shadow-sm">
                    {currentUser.role || 'USER'}
                  </span>
                </div>

                <p className="text-xs text-emerald-200 flex items-center justify-center sm:justify-start space-x-2">
                  <Mail className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentUser.email}</span>
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[11px] font-bold text-emerald-100">
                  <span className="bg-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center space-x-1 border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    <span>{currentUser.verificationStatus || '✓ Active Account'}</span>
                  </span>

                  <span className="bg-white/15 px-3 py-1 rounded-full backdrop-blur-md flex items-center space-x-1 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-amber-300 mr-1" />
                    <span>Member Since: {currentUser.createdAt || 'Jan 2026'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action & Stat Summary */}
            <div className="flex flex-col items-center md:items-end space-y-3 shrink-0 w-full sm:w-auto">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs shadow-xl flex items-center justify-center space-x-2 btn-bounce-active transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-gray-950" />
                  <span>Edit Profile</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto text-center pt-2">
                <div className="bg-black/30 p-3 rounded-2xl border border-white/10 backdrop-blur-md min-w-[110px]">
                  <span className="text-[10px] font-extrabold uppercase text-amber-300 block">Verified Services</span>
                  <span className="text-xl font-black font-outfit text-white">{verifiedServices}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/10 backdrop-blur-md min-w-[110px]">
                  <span className="text-[10px] font-extrabold uppercase text-amber-300 block">Impact Points</span>
                  <span className="text-xl font-black font-outfit text-white">{impactPoints}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================== */}
        {/* MAIN RESPONSIVE CONTENT GRID (2-Column Desktop / 1-Column Mobile) */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN: Personal Info & Account Details (7 Cols Desktop) */}
          <div className="lg:col-span-7 space-y-6">

            {/* CARD 1: Personal Information */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-500/20 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-900">
                    <User className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-outfit text-emerald-950">Personal Information</h3>
                    <p className="text-[11px] text-gray-500 font-bold">Contact & Identity Details</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {!isEditing ? (
                /* READ-ONLY VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Full Name / Entity</span>
                    <span className="text-sm font-black text-emerald-950">{currentUser.name}</span>
                  </div>

                  <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Email Address</span>
                    <span className="text-xs font-bold text-gray-900 break-all">{currentUser.email}</span>
                  </div>

                  <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Phone Number</span>
                    <span className="text-xs font-bold text-gray-900">{currentUser.phone || 'Not provided'}</span>
                  </div>

                  <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">City</span>
                    <span className="text-xs font-bold text-gray-900">{currentUser.city || 'Vadodara'}</span>
                  </div>

                  <div className="sm:col-span-2 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Registered Address</span>
                    <span className="text-xs font-bold text-gray-900">
                      {currentUser.address ? `${currentUser.address} - ${currentUser.pincode || ''}` : 'Gujarat, India'}
                    </span>
                  </div>

                  {currentUser.regNo && (
                    <div className="sm:col-span-2 p-3.5 bg-green-50/80 rounded-2xl border border-green-200">
                      <span className="text-[10px] font-extrabold text-green-700 uppercase block mb-1">NGO Registration Number</span>
                      <span className="text-xs font-mono font-black text-green-950">{currentUser.regNo}</span>
                    </div>
                  )}
                </div>
              ) : (
                /* EDITABLE FORM MODE */
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
                  <div>
                    <label className="block text-[11px] font-black text-gray-700 mb-1">Full Name / Organization Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none text-emerald-950 font-bold bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none text-emerald-950 font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none text-emerald-950 font-bold bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-gray-700 mb-1">Full Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none text-emerald-950 font-bold bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs btn-bounce-active cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center space-x-2 btn-bounce-active cursor-pointer"
                    >
                      {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
                      ) : (
                        <Check className="w-4 h-4 text-orange-400" />
                      )}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* CARD 2: Account Information */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-500/20 space-y-4">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-900">
                  <ShieldCheck className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-outfit text-emerald-950">Account Information</h3>
                  <p className="text-[11px] text-gray-500 font-bold">System Credentials & Status</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">User Account ID</span>
                  <span className="text-xs font-mono font-bold text-emerald-950">{currentUser.id}</span>
                </div>

                <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Assigned Role</span>
                  <span className="text-xs font-black uppercase text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full inline-block">
                    {currentUser.role}
                  </span>
                </div>

                <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Account Verification</span>
                  <span className="text-xs font-bold text-emerald-700">
                    {currentUser.verificationStatus || 'Verified ✓'}
                  </span>
                </div>

                <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase block mb-1">Registration Date</span>
                  <span className="text-xs font-bold text-gray-900">{currentUser.createdAt || '2026-01-01'}</span>
                </div>

                {currentUser.vehicleType && (
                  <div className="sm:col-span-2 p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200">
                    <span className="text-[10px] font-extrabold text-blue-700 uppercase block mb-1">Volunteer Logistics</span>
                    <span className="text-xs font-bold text-blue-950">Vehicle: {currentUser.vehicleType}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Impact Summary & Certificates (5 Cols Desktop) */}
          <div className="lg:col-span-5 space-y-6">

            {/* CARD 3: Role-Specific Impact Summary */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-500/20 space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
                <div className="p-3 bg-red-100 rounded-2xl text-red-700">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-outfit text-emerald-950">Impact Summary</h3>
                  <p className="text-[11px] text-gray-500 font-bold">Verified Contributions from Supabase</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center space-x-3">
                    <Utensils className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-extrabold text-emerald-950">Verified Food Servings</span>
                  </div>
                  <span className="text-lg font-black font-outfit text-emerald-900">{totalServings}+</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                    <span className="text-xs font-extrabold text-orange-950">Impact Points</span>
                  </div>
                  <span className="text-lg font-black font-outfit text-orange-700">{impactPoints} pts</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-extrabold text-amber-950">Social Impact Level</span>
                  </div>
                  <span className="text-xs font-black text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-full uppercase">
                    {currentLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 4: Achievements & Certificates */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-500/20 space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
                <div className="p-3 bg-orange-100 rounded-2xl text-orange-700">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-outfit text-emerald-950">Certificates & Badges</h3>
                  <p className="text-[11px] text-gray-500 font-bold">Social Impact Recognition</p>
                </div>
              </div>

              {/* Badges Level List */}
              <div className="space-y-3 text-xs font-bold">
                {/* Bronze */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-600" />
                    <span className="text-amber-950">Bronze Social Impact Certificate</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Unlocked ✓
                  </span>
                </div>

                {/* Silver */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                  impactPoints >= 80 ? 'bg-gray-100 border-gray-300' : 'bg-gray-50/50 border-gray-200 opacity-60'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <span className="text-gray-900">Silver Social Impact Certificate</span>
                  </div>
                  {impactPoints >= 80 ? (
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Unlocked ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Lock className="w-3 h-3 mr-1" /> Locked
                    </span>
                  )}
                </div>

                {/* Gold */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                  impactPoints >= 150 ? 'bg-amber-100 border-amber-300' : 'bg-gray-50/50 border-gray-200 opacity-60'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-amber-950">Gold Social Impact Certificate</span>
                  </div>
                  {impactPoints >= 150 ? (
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Unlocked ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Lock className="w-3 h-3 mr-1" /> Locked
                    </span>
                  )}
                </div>
              </div>

              {/* View My Certificates Action */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/certificates')}
                  className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-lg flex items-center justify-center space-x-2 btn-bounce-active cursor-pointer"
                >
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>View My Certificates</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;

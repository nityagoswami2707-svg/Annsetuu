import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
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
  Heart,
  Utensils,
  CheckCircle2,
  Lock,
  RefreshCw,
  X
} from 'lucide-react';

const UserProfileBox = ({ onClose }) => {
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

  // Lock background scroll while side box is open (Same as Notification box)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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

  if (!currentUser) return null;

  // Calculate dynamic stats
  const userDonations = donations.filter(d => 
    d.donorName === currentUser.name || 
    d.contactPerson === currentUser.name || 
    currentUser.role === 'admin'
  );

  const verifiedServices = getServicesCountForUser ? getServicesCountForUser(currentUser.id) : 12;
  const impactPoints = verifiedServices * 10;
  const totalServings = userDonations.reduce((sum, d) => sum + (parseInt(d.servingCapacity) || 25), 0) || 150;

  let currentLevel = "Bronze Champion";
  if (impactPoints >= 150) currentLevel = "Gold Legend";
  else if (impactPoints >= 80) currentLevel = "Silver Hero";

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

  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      {/* SIDE PANEL DRAWER (85-90% width on mobile, 420px on desktop) */}
      <div 
        className="w-[88vw] sm:w-[420px] lg:w-[440px] max-w-full bg-white h-screen max-h-screen shadow-2xl flex flex-col justify-between border-l-4 border-orange-500 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="p-5 border-b-2 border-green-100 flex items-center justify-between bg-emerald-950 text-white shadow-md shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-lg shrink-0">
              {getInitials(currentUser.name)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black font-outfit text-white">My Profile</h3>
                <span className="bg-orange-500 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {currentUser.role || 'User'}
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">Official Verified AnnSetu User Profile & Settings</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors btn-bounce-active cursor-pointer"
            title="Close Panel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action / Status Bar */}
        <div className="px-5 py-3 bg-emerald-900/10 border-b border-emerald-950/10 flex items-center justify-between shrink-0 text-xs font-black text-emerald-950">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" />
            {currentUser.verificationStatus || '✓ Active Account'}
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
            Member Since {currentUser.createdAt || '2026'}
          </span>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain text-xs text-[#062c21]">
          
          {saveSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-400 rounded-xl text-emerald-900 text-xs font-bold flex items-center justify-between">
              <span>Profile updated successfully!</span>
              <button onClick={() => setSaveSuccess(false)} className="text-emerald-800">✕</button>
            </div>
          )}

          {/* User Header Summary Card */}
          <div className="bg-gradient-to-r from-emerald-950 to-amber-700 text-white rounded-2xl p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-black font-outfit">{currentUser.name}</h4>
                <p className="text-[11px] text-emerald-200">{currentUser.email}</p>
              </div>
              <span className="text-[10px] font-black uppercase bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded-full">
                {currentUser.role}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20 text-center text-[10px]">
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="text-amber-300 font-bold uppercase block">Verified Services</span>
                <span className="text-base font-black">{verifiedServices}</span>
              </div>
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="text-amber-300 font-bold uppercase block">Impact Points</span>
                <span className="text-base font-black">{impactPoints}</span>
              </div>
            </div>
          </div>

          {/* Personal Information Box */}
          <div className="p-4 bg-gray-50/90 rounded-2xl border-2 border-gray-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-black font-outfit uppercase tracking-wide text-emerald-950">Personal Information</h4>
              </div>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-[11px] font-black text-orange-600 hover:text-orange-700 flex items-center space-x-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-2 font-medium">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Full Name</span>
                  <span className="font-bold text-gray-900">{currentUser.name}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Email Address</span>
                  <span className="font-bold text-gray-900 break-all">{currentUser.email}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Phone Number</span>
                  <span className="font-bold text-gray-900">{currentUser.phone || 'Not specified'}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">City</span>
                  <span className="font-bold text-gray-900">{currentUser.city || 'Vadodara'}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Registered Address</span>
                  <span className="font-bold text-gray-900">{currentUser.address || 'Vadodara, Gujarat'}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 font-bold">
                <div>
                  <label className="block text-[10px] text-gray-600 mb-0.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-600 mb-0.5">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-600 mb-0.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-600 mb-0.5">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-[11px] font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-[11px] font-black flex items-center space-x-1"
                  >
                    {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 text-orange-400" />}
                    <span>Save</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Account Credentials Box */}
          <div className="p-4 bg-gray-50/90 rounded-2xl border-2 border-gray-200/80 space-y-2">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-black font-outfit uppercase tracking-wide text-emerald-950">Account Details</h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Account ID</span>
                <span className="font-mono font-bold text-emerald-950">{currentUser.id}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Role</span>
                <span className="font-bold text-orange-600 uppercase">{currentUser.role}</span>
              </div>
            </div>
          </div>

          {/* Impact Metrics Box */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 space-y-2">
            <div className="flex items-center space-x-2 border-b border-emerald-200 pb-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs font-black font-outfit uppercase tracking-wide text-emerald-950">Impact Metrics</h4>
            </div>

            <div className="space-y-1.5 text-xs font-bold">
              <div className="flex justify-between">
                <span className="text-gray-600">Servings Helped:</span>
                <span className="text-emerald-900 font-black">{totalServings}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impact Level:</span>
                <span className="text-amber-800 font-black">{currentLevel}</span>
              </div>
            </div>
          </div>

          {/* Certificates Box */}
          <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-200 space-y-3">
            <div className="flex items-center space-x-2 border-b border-amber-200 pb-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-black font-outfit uppercase tracking-wide text-emerald-950">Certificates</h4>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate('/certificates');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-md btn-bounce-active cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>View My Certificates</span>
            </button>
          </div>

        </div>

        {/* Footer (Matching Notification Modal Footer) */}
        <div className="p-4 bg-emerald-950 text-white text-center text-xs font-bold flex items-center justify-between px-6 shrink-0">
          <span className="text-xs text-emerald-300">Annsetu Profile Side Panel Box</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-orange-500 text-gray-950 font-black rounded-full text-[11px] hover:bg-orange-400 cursor-pointer"
          >
            ✕ Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfileBox;

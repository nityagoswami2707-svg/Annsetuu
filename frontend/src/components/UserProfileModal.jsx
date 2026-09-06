import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from './AnnsetuMotionBackground';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  X, 
  Check, 
  Edit3, 
  Award,
  Sparkles
} from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, t, getServicesCountForUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    city: currentUser?.city || '',
    address: currentUser?.address || '',
    pincode: currentUser?.pincode || ''
  });

  if (!isOpen || !currentUser) return null;

  const verifiedServices = getServicesCountForUser ? getServicesCountForUser(currentUser.id) : 12;
  const impactPoints = verifiedServices * 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile(formData);
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#faf8f5] text-[#062c21] overflow-y-auto animate-in fade-in flex flex-col">
      {/* Background Motion Layer */}
      <AnnsetuMotionBackground type="home" />

      {/* Top Fixed Control Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-800 text-white rounded-2xl shadow-md">
            <User className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-emerald-950">{t('myProfile')}</h1>
            <p className="text-xs text-gray-600 font-semibold">Official Verified AnnSetu User Profile & Settings</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-orange-100 text-emerald-950 font-black text-xs border border-gray-200 shadow-md flex items-center space-x-1.5 btn-bounce-active cursor-pointer"
        >
          <X className="w-4 h-4 text-orange-600" />
          <span>Close Profile</span>
        </button>
      </div>

      {/* Full-Screen Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 flex-1">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-orange-500/20 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-900">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black font-outfit text-emerald-950">{t('myProfile')}</h2>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                Role: {currentUser.role}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-700 text-white rounded-2xl p-5 shadow-lg space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="text-lg font-black font-outfit">{currentUser.name}</h3>
              <p className="text-xs text-emerald-200 flex items-center space-x-1 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-amber-300 mr-1" />
                <span>{currentUser.email}</span>
              </p>
            </div>
            <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              {currentUser.verificationStatus || 'Verified ✓'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20 text-center relative z-10">
            <div className="bg-black/20 p-2 rounded-xl backdrop-blur-xs">
              <span className="text-[10px] uppercase font-bold text-amber-300">Verified Services</span>
              <p className="text-xl font-black font-outfit">{verifiedServices}</p>
            </div>
            <div className="bg-black/20 p-2 rounded-xl backdrop-blur-xs">
              <span className="text-[10px] uppercase font-bold text-amber-300">Impact Points</span>
              <p className="text-xl font-black font-outfit">{impactPoints}</p>
            </div>
          </div>
        </div>

        {/* Profile Info or Edit Form */}
        {!isEditing ? (
          <div className="space-y-4 text-xs font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Account ID</span>
                <span className="font-mono font-bold text-emerald-950">{currentUser.id}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Phone</span>
                <span className="font-bold text-gray-900">{currentUser.phone || 'Not specified'}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">City</span>
                <span className="font-bold text-gray-900">{currentUser.city || 'Vadodara'}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Member Since</span>
                <span className="font-bold text-gray-900">{currentUser.createdAt || '2026-01-01'}</span>
              </div>
            </div>

            {currentUser.address && (
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Registered Address</span>
                <span className="font-bold text-gray-900">{currentUser.address} {currentUser.pincode ? `- ${currentUser.pincode}` : ''}</span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center space-x-2 btn-bounce-active"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name / Entity Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none font-semibold"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 font-bold text-xs hover:bg-gray-300 btn-bounce-active"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 btn-bounce-active"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}

        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

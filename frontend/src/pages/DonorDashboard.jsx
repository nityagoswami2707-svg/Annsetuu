import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { 
  Utensils, 
  Upload, 
  Camera, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Building2, 
  ArrowRight,
  Heart,
  Sparkles,
  Image as ImageIcon,
  Send,
  Calendar,
  Home as HomeIcon,
  Bot,
  Flame,
  AlertCircle,
  Award,
  LogOut,
  FileText,
  Search,
  Download
} from 'lucide-react';
import ImpactReceipt from '../components/ImpactReceipt';

const DonorDashboard = () => {
  const { t, ngos, registerDonation, donations, logoutUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState('form');
  const [createdId, setCreatedId] = useState(null);
  const [selectedDonationForReceipt, setSelectedDonationForReceipt] = useState(null);
  const [currentTab, setCurrentTab] = useState('donate');
  const [receiptSearch, setReceiptSearch] = useState('');
  const [receiptSort, setReceiptSort] = useState('newest');

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Eligible receipts (Delivered / Verified donations)
  const verifiedDonations = donations.filter(d => 
    d.status === 'Delivered' || 
    d.status === 'Completed' || 
    d.status === 'Verified'
  );

  const filteredReceipts = verifiedDonations.filter(d => {
    const rNum = `ANN-RCP-2026-${String(d.id.replace(/[^0-9]/g, '') || '000124').padStart(6, '0')}`;
    const query = receiptSearch.toLowerCase().trim();
    return (
      !query || 
      d.id.toLowerCase().includes(query) || 
      rNum.toLowerCase().includes(query) ||
      (d.foodName && d.foodName.toLowerCase().includes(query)) ||
      (d.ngoName && d.ngoName.toLowerCase().includes(query))
    );
  }).sort((a, b) => {
    if (receiptSort === 'newest') return (b.id > a.id ? 1 : -1);
    return (a.id > b.id ? 1 : -1);
  });

  const [formData, setFormData] = useState({
    donorName: "Green Leaf Restaurant",
    donorType: "Restaurant",
    email: "manager@greenleaf.com",
    phone: "+91 94280 99887",
    pickupAddress: "1st Floor, Crystal Plaza, Jetaipur Main Rd",
    city: "Vadodara",
    pincode: "390007",
    foodName: "Paneer Butter Masala & Steamed Rice",
    foodCategory: "Prepared Cooked Food",
    foodQuality: "Fresh",
    prepDate: new Date().toISOString().split('T')[0],
    prepTime: "20:00",
    quantity: "15 kg (4 Large Insulated Vessels)",
    servingCapacity: "50",
    specialInstructions: "Use back service entrance for quick loading.",
    contactPerson: "Chef Vikram Mehta",
    safetyConfirmed: false,
    ngoId: ngos[0]?.id || "NGO-101",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80"
  });

  const [imagePreview, setImagePreview] = useState("https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.safetyConfirmed) {
      alert("Please confirm that the food is safe and suitable for donation.");
      return;
    }

    const newId = registerDonation(formData);
    setCreatedId(newId);
    setStep('matching');

    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="donor" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/95 hover:bg-orange-100 text-emerald-950 font-black text-xs border border-gray-200 shadow-md transition-all btn-bounce-active cursor-pointer"
          >
            <HomeIcon className="w-4 h-4 text-orange-600" />
            <span>← {t('home')} ({t('exploreAnnsetu')})</span>
          </button>

          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <button
              onClick={() => setCurrentTab('donate')}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer ${
                currentTab === 'donate' ? 'bg-emerald-900 text-white border border-emerald-700' : 'bg-white/95 text-emerald-950 hover:bg-emerald-100 border border-gray-200'
              }`}
            >
              <Utensils className="w-4 h-4 text-orange-500" />
              <span>Donate Food</span>
            </button>

            <button
              onClick={() => setCurrentTab('receipts')}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer ${
                currentTab === 'receipts' ? 'bg-orange-500 text-gray-950 border border-orange-600' : 'bg-white/95 text-emerald-950 hover:bg-orange-100 border border-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 text-orange-600" />
              <span>🧾 My Receipts</span>
            </button>

            <button
              onClick={() => navigate('/certificates')}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{t('myCertificates')}</span>
            </button>

            <button
              onClick={() => {
                logoutUser();
                navigate('/');
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logoutBtn')}</span>
            </button>
          </div>
        </div>

        {/* DONATE FOOD TAB CONTENT */}
        {currentTab === 'donate' && (
          <>
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-orange-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center space-x-2 bg-black/30 px-3 py-1 rounded-full text-[11px] font-black backdrop-blur-md text-orange-200 uppercase tracking-widest border border-orange-300/40">
                  <Sparkles className="w-3.5 h-3.5 text-orange-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Donor Registration Portal</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black font-outfit text-white">"Share Food. Share Hope."</h1>
                <p className="text-orange-100 text-xs sm:text-sm font-medium leading-relaxed">
                  Register surplus meals from your restaurant, cafe, hotel, home, wedding, or catering service to reach people in need.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border-2 border-white text-center shadow-lg shrink-0 text-green-950 w-full md:w-auto">
                <Utensils className="w-8 h-8 mx-auto text-orange-500 mb-1 animate-bounce" style={{ animationDuration: '3s' }} />
                <p className="text-xs font-black">2-Min Fast Registration</p>
                <p className="text-[10px] font-bold text-gray-500">AI Smart NGO Matching Enabled</p>
              </div>
            </div>

            {/* REGISTER DONATION FORM */}
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-200/80 space-y-7">
                {/* SECTION 1: DONOR INFORMATION */}
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-black font-outfit text-green-950 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-orange-500" />
                      1. Donor Information
                    </h3>
                    <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">Step 1 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Donation Source *</label>
                      <select
                        name="donorType"
                        value={formData.donorType}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      >
                        <option value="Restaurant">🍱 Restaurant</option>
                        <option value="Cafe">☕ Cafe</option>
                        <option value="Hotel">🏨 Hotel / Resort</option>
                        <option value="Household">🏠 Household / Home</option>
                        <option value="Wedding">💍 Wedding Feast</option>
                        <option value="Event">🎉 Party / Event</option>
                        <option value="Catering Service">🍲 Catering Service</option>
                        <option value="Other">📍 Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Full Name / Establishment Name *</label>
                      <input
                        type="text"
                        name="donorName"
                        required
                        value={formData.donorName}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Contact Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: FOOD DETAILS */}
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-black font-outfit text-green-950 flex items-center">
                      <Utensils className="w-5 h-5 mr-2 text-orange-500" />
                      2. Food Surplus Details
                    </h3>
                    <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">Step 2 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Food Item Name / Menu *</label>
                      <input
                        type="text"
                        name="foodName"
                        required
                        value={formData.foodName}
                        onChange={handleChange}
                        placeholder="e.g. Vegetable Biryani & Paneer Curry"
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Food Category *</label>
                      <select
                        name="foodCategory"
                        value={formData.foodCategory}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      >
                        <option value="Prepared Cooked Food">🍲 Prepared Cooked Food</option>
                        <option value="Packaged / Shelf Stable">📦 Packaged / Shelf Stable</option>
                        <option value="Bakery / Breads">🍞 Bakery & Breads</option>
                        <option value="Fresh Produce / Fruits">🍎 Fresh Produce & Fruits</option>
                        <option value="Beverages / Milk">🥛 Beverages & Dairy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Total Quantity / Weight *</label>
                      <input
                        type="text"
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 15 kg (4 Large Vessels)"
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Estimated Serving Capacity (Meals) *</label>
                      <input
                        type="number"
                        name="servingCapacity"
                        required
                        value={formData.servingCapacity}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                      />
                    </div>
                  </div>
                </div>

                {/* SAFETY CONFIRMATION & SUBMIT */}
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="safetyConfirmed"
                      checked={formData.safetyConfirmed}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-900 leading-snug">
                      I confirm that all donated food items are fresh, safe, hygienically packed, and compliant with safety guidelines. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-green-700 hover:from-emerald-900 hover:to-green-800 text-white font-black text-sm shadow-xl flex items-center justify-center space-x-2 btn-bounce-active cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-orange-400" />
                    <span>Register Surplus Food Donation</span>
                  </button>
                </div>
              </form>
            )}

            {step === 'matching' && (
              <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-10 shadow-xl border border-gray-200/80 text-center space-y-6 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-amber-500 animate-spin" />
                </div>
                <h2 className="text-2xl font-black font-outfit text-green-950">AI Smart NGO Matching in Progress...</h2>
                <p className="text-xs text-gray-600 font-medium max-w-md mx-auto">
                  Searching for nearest verified community kitchens, shelters, and distribution teams based on capacity and distance.
                </p>
              </div>
            )}

            {step === 'success' && (
              <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-6 animate-in fade-in">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
                  </div>
                  <h2 className="text-2xl font-black font-outfit text-green-950">Donation Registered Successfully! ❤️</h2>
                  <p className="text-xs font-semibold text-gray-600">Generated Reference ID: <strong className="text-green-900 font-mono text-sm">{createdId}</strong></p>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        const current = donations.find(d => d.id === createdId) || {
                          id: createdId,
                          foodName: formData.foodName,
                          quantity: formData.quantity,
                          servingCapacity: formData.servingCapacity,
                          foodCategory: formData.foodCategory,
                          donorName: formData.donorName,
                          createdAt: new Date().toISOString().split('T')[0]
                        };
                        setSelectedDonationForReceipt(current);
                      }}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md transition-all btn-bounce-active cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-orange-400" />
                      <span>View & Download Receipt</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black font-outfit text-green-950 flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-amber-500" />
                      AI Smart Matched NGOs Nearby
                    </h3>
                    <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">Top Recommendations</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Hope Foundation India", distance: "2.3 km", capacity: "100 meals", match: "94%", priority: "NORMAL 🟢", time: "18 mins" },
                      { name: "Annapoorna Food Relief", distance: "3.5 km", capacity: "150 meals", match: "88%", priority: "NORMAL 🟢", time: "25 mins" },
                      { name: "Vadodara Care Society", distance: "4.1 km", capacity: "80 meals", match: "82%", priority: "URGENT 🔴", time: "12 mins" }
                    ].map((ngo, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-800/15 bg-gray-50/70 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-zoom-3d">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-black font-outfit text-green-950">{ngo.name}</h4>
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Verified ✓
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 space-x-3">
                            <span>Distance: <strong>{ngo.distance}</strong></span>
                            <span>Capacity: <strong>{ngo.capacity}</strong></span>
                            <span>Est. Pickup: <strong>{ngo.time}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 pt-1">
                            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              AI Match: {ngo.match}
                            </span>
                            <span className="text-[10px] font-black text-gray-700 bg-gray-200 px-2 py-0.5 rounded-md">
                              Priority: {ngo.priority}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => navigate('/track')}
                          className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl bg-green-900 hover:bg-green-950 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 btn-bounce-active shrink-0 cursor-pointer"
                        >
                          <span>Send Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => setStep('form')}
                      className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold hover:bg-gray-200 btn-bounce-active cursor-pointer"
                    >
                      + Register Another Donation
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* MY REGISTERED DONATIONS HISTORY */}
            <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-200/80 space-y-4">
              <h3 className="text-lg font-black font-outfit text-green-950">My Registered Donations</h3>
              
              <div className="space-y-3">
                {donations.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 card-zoom-3d">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-emerald-900 font-mono">{item.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 mt-1">{item.foodName} ({item.quantity})</h4>
                      <p className="text-[11px] text-gray-500">Target NGO: {item.ngoName} — {item.servingCapacity} Meals</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedDonationForReceipt(item)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold text-xs shadow-sm transition-all btn-bounce-active cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-700" />
                        <span>View Receipt</span>
                      </button>

                      <button
                        onClick={() => navigate('/track')}
                        className="text-xs text-green-800 font-black underline hover:text-green-950 btn-bounce-active cursor-pointer"
                      >
                        Track Live →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* MY RECEIPTS TAB CONTENT */}
        {currentTab === 'receipts' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-black/30 px-3 py-1 rounded-full border border-amber-400/30">
                  OFFICIAL DONATION ACKNOWLEDGEMENT
                </span>
                <h1 className="text-2xl sm:text-4xl font-black font-outfit mt-2">DONATION RECEIPTS</h1>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  Official activity receipts for your verified and delivered food donations.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('donate')}
                className="px-4 py-2 rounded-2xl bg-white text-emerald-950 font-black text-xs shadow-md hover:bg-orange-100 transition-all btn-bounce-active shrink-0 flex items-center space-x-1 cursor-pointer"
              >
                <span>← Back to Dashboard</span>
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by Donation ID or Receipt No..."
                  value={receiptSearch}
                  onChange={(e) => setReceiptSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-emerald-600 font-bold text-gray-900"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <span className="font-bold text-gray-500 text-xs">Sort:</span>
                <select
                  value={receiptSort}
                  onChange={(e) => setReceiptSort(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 font-bold text-gray-900 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Receipts Cards Grid */}
            {filteredReceipts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReceipts.map((item) => {
                  const receiptNumber = `ANN-RCP-2026-${String(item.id.replace(/[^0-9]/g, '') || '000124').padStart(6, '0')}`;
                  return (
                    <div key={item.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-gray-200/90 space-y-4 hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div>
                          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase border border-emerald-300">
                            ANNSETU DONATION RECEIPT
                          </span>
                          <p className="text-xs font-mono font-black text-emerald-950 mt-1">{receiptNumber}</p>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Verified ✓
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">Donation ID</span>
                          <span className="font-bold text-gray-900 font-mono">{item.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">Donation Date</span>
                          <span className="font-bold text-gray-900">{item.createdAt ? item.createdAt.split(' ')[0] : '2026-08-06'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">Food Type</span>
                          <span className="font-bold text-gray-900 truncate block">{item.foodName}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">Servings</span>
                          <span className="font-black text-emerald-900">{item.servingCapacity} Meals</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">Recipient NGO</span>
                          <span className="font-bold text-emerald-900">{item.ngoName || 'Hope Foundation India'}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center space-x-2 border-t border-gray-100">
                        <button
                          onClick={() => setSelectedDonationForReceipt(item)}
                          className="flex-1 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center justify-center space-x-1.5 btn-bounce-active cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-orange-400" />
                          <span>View Receipt</span>
                        </button>

                        <button
                          onClick={() => setSelectedDonationForReceipt(item)}
                          className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-1.5 btn-bounce-active cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-10 bg-white/95 rounded-3xl border border-gray-200 space-y-3 shadow-md">
                <FileText className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-base font-black text-emerald-950 font-outfit">
                  No verified donation receipts are available yet.
                </h3>
                <p className="text-xs text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                  Your receipt will appear after a donation is successfully delivered and verified by our partner community shelters.
                </p>
              </div>
            )}

          </div>
        )}

      </div>

      {/* DONATION RECEIPT MODAL */}
      {selectedDonationForReceipt && (
        <ImpactReceipt 
          donation={selectedDonationForReceipt} 
          onClose={() => setSelectedDonationForReceipt(null)} 
        />
      )}

    </div>
  );
};

export default DonorDashboard;

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
  LogOut
} from 'lucide-react';

const DonorDashboard = () => {
  const { t, ngos, registerDonation, donations, logoutUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState('form');
  const [createdId, setCreatedId] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

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
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/95 hover:bg-orange-100 text-emerald-950 font-black text-xs border border-gray-200 shadow-md transition-all btn-bounce-active"
          >
            <HomeIcon className="w-4 h-4 text-orange-600" />
            <span>← {t('home')} ({t('exploreAnnsetu')})</span>
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
                    placeholder="e.g. Green Leaf Dining / Sharma Family"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98000 00000"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="donor@example.com"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-800 mb-1">Pickup Address *</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    required
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="Street, Landmark, Building"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Pincode *</label>
                  <input
                    type="number"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: FOOD DETAILS */}
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black font-outfit text-green-950 flex items-center">
                  <Utensils className="w-5 h-5 mr-2 text-green-700" />
                  2. Food Details
                </h3>
                <span className="text-[10px] font-black text-green-700 bg-green-100 px-2.5 py-1 rounded-full">Step 2 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Food Name *</label>
                  <input
                    type="text"
                    name="foodName"
                    required
                    value={formData.foodName}
                    onChange={handleChange}
                    placeholder="e.g. Paneer Masala & Rice"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Food Quality *</label>
                  <select
                    name="foodQuality"
                    value={formData.foodQuality}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-2xl border-2 border-green-300 bg-green-50/50 text-xs font-black text-green-950 focus:outline-none"
                  >
                    <option value="Fresh">🟢 Fresh (Cooked within 2 hours)</option>
                    <option value="Good">🟡 Good (Hygienically Stored)</option>
                    <option value="Needs Urgent Pickup">🔴 Priority: URGENT (&lt; 2 hrs left)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Quantity *</label>
                  <input
                    type="text"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 15 kg / 4 vessels"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Number of People It Can Serve *</label>
                  <input
                    type="number"
                    name="servingCapacity"
                    required
                    value={formData.servingCapacity}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Preparation Date & Time *</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      name="prepDate"
                      required
                      value={formData.prepDate}
                      onChange={handleChange}
                      className="w-1/2 h-12 px-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:outline-none"
                    />
                    <input
                      type="time"
                      name="prepTime"
                      required
                      value={formData.prepTime}
                      onChange={handleChange}
                      className="w-1/2 h-12 px-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Preferred Pickup Time</label>
                  <input
                    type="time"
                    name="preferredPickupTime"
                    defaultValue="20:30"
                    className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: UPLOAD FOOD IMAGE */}
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black font-outfit text-green-950 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-orange-500" />
                  3. Upload Food Image / Camera Photo
                </h3>
                <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">Step 3 of 4</span>
              </div>

              <div className="p-4 bg-gray-50 border-2 border-dashed border-green-300 rounded-3xl space-y-4">
                {imagePreview ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-40 h-32 rounded-2xl overflow-hidden bg-white border border-gray-200 shrink-0 shadow-md">
                      <img src={imagePreview} alt="Food Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="text-xs font-bold text-green-800 bg-green-100 px-2.5 py-1 rounded-full inline-block">
                        Photo Uploaded ✓
                      </span>
                      <p className="text-xs text-gray-600">Verified image preview ready for NGO inspection.</p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="px-3 py-1.5 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 font-bold text-xs flex items-center space-x-1 mx-auto sm:mx-0 btn-bounce-active"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove / Replace Image</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-3">
                    <ImageIcon className="w-10 h-10 mx-auto text-green-600" />
                    <p className="text-xs font-bold text-gray-700">Choose photo source on your smartphone:</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 btn-bounce-active"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Choose From Gallery</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-orange-500 text-gray-950 font-bold text-xs flex items-center justify-center space-x-1.5 btn-bounce-active"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Take Photo With Camera</span>
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 4: SAFETY DECLARATION */}
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black font-outfit text-green-950 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2 text-green-700" />
                  4. Safety Declaration
                </h3>
                <span className="text-[10px] font-black text-green-700 bg-green-100 px-2.5 py-1 rounded-full">Step 4 of 4</span>
              </div>

              <div className="p-4 bg-orange-50/90 rounded-2xl border-2 border-orange-300">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="safetyConfirmed"
                    checked={formData.safetyConfirmed}
                    onChange={handleChange}
                    className="mt-0.5 w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-xs text-orange-950 font-black leading-relaxed">
                    “I confirm that the food is safe and suitable for donation.”
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-green-900 to-orange-600 hover:from-green-950 hover:to-orange-700 text-white font-black text-base shadow-xl flex items-center justify-center space-x-2 btn-bounce-active tracking-wide"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Register Donation</span>
            </button>

          </form>
        )}

        {step === 'matching' && (
          <div className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200/80 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-md animate-spin" style={{ animationDuration: '3s' }}>
              <Bot className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black font-outfit text-green-950">Finding the Best NGO…</h2>
              <p className="text-xs text-gray-500 font-semibold">AI is analyzing distance, shelter capacity, and urgency metrics.</p>
            </div>
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
                      className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl bg-green-900 hover:bg-green-950 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 btn-bounce-active shrink-0"
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
                  className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold hover:bg-gray-200 btn-bounce-active"
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

                <button
                  onClick={() => navigate('/track')}
                  className="text-xs text-green-800 font-black underline hover:text-green-950 btn-bounce-active"
                >
                  Track Live →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;

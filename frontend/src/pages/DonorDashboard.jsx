import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Utensils, 
  Upload, 
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
  Coffee,
  Hotel
} from 'lucide-react';

const DonorDashboard = () => {
  const { ngos, registerDonation, donations } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [createdId, setCreatedId] = useState(null);

  // Form State with comprehensive default & user inputs
  const [formData, setFormData] = useState({
    donorName: "Green Leaf Restaurant",
    donorType: "Restaurant", // Restaurant, Cafe, Home, Hotel, Wedding, Catering, Event, etc.
    email: "manager@greenleaf.com",
    phone: "+91 94280 99887",
    pickupAddress: "1st Floor, Crystal Plaza, Jetaipur Main Rd",
    city: "Vadodara",
    pincode: "390007",
    foodName: "Paneer Butter Masala & Steamed Rice",
    foodCategory: "Prepared Cooked Food",
    foodQuality: "Fresh", // Fresh, Good, Needs Urgent Pickup
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.safetyConfirmed) {
      alert("Please confirm the food safety declaration before submitting.");
      return;
    }

    const newId = registerDonation(formData);
    setCreatedId(newId);
    setStep('success');
  };

  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Prominent Header Banner */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-orange-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-green-700/40">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-orange-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="uppercase tracking-widest text-orange-200">Donor Registration Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white">"Share Food. Share Hope."</h1>
          <p className="text-green-100 text-sm leading-relaxed">
            Register surplus meals from your restaurant, cafe, hotel, home, wedding, or catering service to reach people in need.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-white text-center shadow-xl shrink-0 text-green-950">
          <Utensils className="w-10 h-10 mx-auto text-orange-500 mb-1" />
          <p className="text-xs font-black">Fast 2-Min Registration</p>
          <p className="text-[10px] font-bold text-gray-500">Real-Time NGO Matching</p>
        </div>
      </div>

      {step === 'form' ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-green-600/10 space-y-9">
          
          {/* ================================================== */}
          {/* STEP 1: DONOR SOURCE & ADDRESS DETAILS */}
          {/* ================================================== */}
          <div className="space-y-4">
            <div className="border-b-2 border-green-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black font-outfit text-green-950 flex items-center">
                  <Building2 className="w-6 h-6 mr-2 text-orange-500" />
                  1. Donor Establishment & Pickup Address
                </h3>
                <p className="text-xs font-semibold text-gray-500">Specify where the food is being donated from (Restaurant, Cafe, Home, Hotel, etc.).</p>
              </div>
              <span className="text-xs font-black text-orange-600 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">Step 1 of 4</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Where is food donated from dropdown */}
              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Where is the food being donated from? *</label>
                <select
                  name="donorType"
                  value={formData.donorType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                >
                  <option value="Restaurant">🍱 Restaurant</option>
                  <option value="Cafe">☕ Cafe</option>
                  <option value="Hotel">🏨 Hotel / Resort</option>
                  <option value="Home">🏠 Home / Household</option>
                  <option value="Wedding">💍 Wedding Feast</option>
                  <option value="Catering Service">🍲 Catering Service</option>
                  <option value="Event">🎉 Party / Event</option>
                  <option value="Community Kitchen">🥣 Community Kitchen</option>
                  <option value="Other">📍 Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Donor Establishment / Name *</label>
                <input
                  type="text"
                  name="donorName"
                  required
                  value={formData.donorName}
                  onChange={handleChange}
                  placeholder="e.g. Green Leaf Fine Dining / Sharma Family Home"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Contact Person Name *</label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="e.g. Chef Vikram Mehta"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-gray-800 mb-1.5">Full Pickup Address *</label>
                <input
                  type="text"
                  name="pickupAddress"
                  required
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Street, Building, Landmark"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

            </div>
          </div>

          {/* ================================================== */}
          {/* STEP 2: SURPLUS FOOD SPECIFICATIONS */}
          {/* ================================================== */}
          <div className="space-y-4">
            <div className="border-b-2 border-green-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black font-outfit text-green-950 flex items-center">
                  <Utensils className="w-6 h-6 mr-2 text-green-700" />
                  2. Food Specifications & Quality Details
                </h3>
                <p className="text-xs font-semibold text-gray-500">Provide accurate food preparation time, quality, quantity, and serving count.</p>
              </div>
              <span className="text-xs font-black text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">Step 2 of 4</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Food Item Name / Description *</label>
                <input
                  type="text"
                  name="foodName"
                  required
                  placeholder="e.g. Paneer Butter Masala & Rice / Sandwiches"
                  value={formData.foodName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Food Category *</label>
                <select
                  name="foodCategory"
                  value={formData.foodCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-extrabold focus:border-green-600 focus:outline-none bg-gray-50/50"
                >
                  <option value="Prepared Cooked Food">Prepared Cooked Food</option>
                  <option value="Catering Surplus">Catering Surplus</option>
                  <option value="Bakery / Packaged">Bakery / Packaged</option>
                  <option value="Raw Staples / Grocery">Raw Staples / Grocery</option>
                </select>
              </div>

              {/* Quality of Food Dropdown */}
              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Quality of Food *</label>
                <select
                  name="foodQuality"
                  value={formData.foodQuality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-green-300 bg-green-50/50 text-xs font-extrabold text-green-950 focus:border-green-600 focus:outline-none"
                >
                  <option value="Fresh">🟢 Fresh (Cooked within 2 hours)</option>
                  <option value="Good">🟡 Good (Packed & hygienically stored)</option>
                  <option value="Needs Urgent Pickup">🔴 Needs Urgent Pickup (&lt; 2 hrs before expiry)</option>
                </select>
              </div>

              {/* Quantity of Food */}
              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Quantity of Food *</label>
                <input
                  type="text"
                  name="quantity"
                  required
                  placeholder="e.g. 15 kg / 4 large containers"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              {/* Number of People it Can be Served */}
              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Number of People It Can Be Served *</label>
                <input
                  type="number"
                  name="servingCapacity"
                  required
                  placeholder="e.g. 50 people"
                  value={formData.servingCapacity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

              {/* Food Preparation Date & Time */}
              <div>
                <label className="block text-xs font-black text-gray-800 mb-1.5">Food Preparation Date & Time *</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="prepDate"
                    required
                    value={formData.prepDate}
                    onChange={handleChange}
                    className="w-1/2 px-3 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:outline-none"
                  />
                  <input
                    type="time"
                    name="prepTime"
                    required
                    value={formData.prepTime}
                    onChange={handleChange}
                    className="w-1/2 px-3 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-gray-800 mb-1.5">Special Instructions / Pickup Availability (Optional)</label>
                <input
                  type="text"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="e.g. Call upon arrival, parking available in basement"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-xs font-bold focus:border-green-600 focus:outline-none"
                />
              </div>

            </div>
          </div>

          {/* ================================================== */}
          {/* STEP 3: UPLOAD FOOD IMAGE */}
          {/* ================================================== */}
          <div className="space-y-4">
            <div className="border-b-2 border-green-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black font-outfit text-green-950 flex items-center">
                  <ImageIcon className="w-6 h-6 mr-2 text-orange-500" />
                  3. Upload Food Image
                </h3>
                <p className="text-xs font-semibold text-gray-500">Provide a clear photo of the surplus meal containers for NGO verification.</p>
              </div>
              <span className="text-xs font-black text-orange-600 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">Step 3 of 4</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50/80 border-2 border-dashed border-green-300 rounded-3xl">
              <div className="w-36 h-28 rounded-2xl overflow-hidden bg-white border-2 border-green-200 shrink-0 shadow-md">
                <img src={imagePreview} alt="Food Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <p className="text-xs text-gray-700 font-bold">Select or drag & drop a photo of the prepared meal</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-green-800 file:text-white hover:file:bg-green-900 cursor-pointer"
                />
                <p className="text-[10px] text-gray-400">Supports PNG, JPG, JPEG formats</p>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* STEP 4: TARGET NGO & SAFETY DECLARATION */}
          {/* ================================================== */}
          <div className="space-y-4">
            <div className="border-b-2 border-green-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black font-outfit text-green-950 flex items-center">
                  <ShieldAlert className="w-6 h-6 mr-2 text-green-700" />
                  4. Target NGO Selection & Food Safety Declaration
                </h3>
                <p className="text-xs font-semibold text-gray-500">Send your donation request directly to a verified NGO.</p>
              </div>
              <span className="text-xs font-black text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">Step 4 of 4</span>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-800 mb-1.5">Select Verified NGO for Request Dispatch *</label>
              <select
                name="ngoId"
                value={formData.ngoId}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-green-400 bg-green-50/60 text-xs font-black text-green-950 focus:outline-none shadow-sm"
              >
                {ngos.map(n => (
                  <option key={n.id} value={n.id}>
                    🏢 {n.name} ({n.badge}) — Capacity: {n.availableCapacity} — {n.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-5 bg-orange-50 rounded-2xl border-2 border-orange-200 space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="safetyConfirmed"
                  checked={formData.safetyConfirmed}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-xs text-orange-950 font-black leading-relaxed">
                  I confirm that the food is safe, hygienic, and suitable for human consumption in accordance with FSSAI hygiene guidelines.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Primary Button */}
          <button
            type="submit"
            className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-green-800 via-green-700 to-orange-600 hover:from-green-900 hover:to-orange-700 text-white font-black text-base shadow-2xl flex items-center justify-center space-x-2 transition-transform transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            <span>[ Register Food Donation & Send Request ]</span>
          </button>

        </form>
      ) : (
        /* SUCCESS SCREEN & REQUEST STATUS */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-green-600/10 space-y-8 animate-in fade-in zoom-in-95">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 fill-red-500 text-red-500 animate-bounce" />
            </div>
            
            <h2 className="text-3xl font-black font-outfit text-green-950">
              Your donation has been registered! ❤️
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              Annsetu has dispatched your donation request to the NGO.
            </p>

            <div className="p-4 bg-green-950 text-white rounded-2xl inline-block shadow-xl">
              <span className="text-[10px] text-orange-400 font-black uppercase tracking-widest block">Generated Donation ID</span>
              <span className="text-3xl font-black font-outfit text-orange-400 tracking-wider">{createdId}</span>
            </div>
          </div>

          {/* Nearby NGOs Grid */}
          <div className="border-t-2 border-gray-100 pt-8 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-black font-outfit text-green-950">Target NGO Dispatch Status</h3>
              <p className="text-xs text-gray-500">Your donation request is awaiting response from the verified NGO partner.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ngos.map(ngo => (
                <div key={ngo.id} className="bg-green-50/70 p-5 rounded-3xl border-2 border-green-200 space-y-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black bg-green-800 text-white px-2.5 py-0.5 rounded-full">
                        Verified Badge ✓
                      </span>
                      <span className="text-xs font-bold text-gray-500">1.8 km away</span>
                    </div>

                    <h4 className="text-base font-black font-outfit text-green-950">{ngo.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">Capacity: <span className="font-bold text-green-800">{ngo.availableCapacity}</span></p>
                    <p className="text-xs text-gray-500">City: {ngo.city}</p>
                  </div>

                  <div className="pt-3 border-t border-green-200 flex items-center justify-between">
                    <span className="text-[11px] font-black text-orange-600">Awaiting NGO Response</span>
                    <button
                      onClick={() => navigate('/track')}
                      className="px-3.5 py-2 rounded-xl bg-green-900 text-white font-bold text-xs hover:bg-green-950 transition-colors flex items-center space-x-1 shadow-md"
                    >
                      <span>Track Live</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setStep('form')}
                className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-800 text-xs font-black hover:bg-gray-200 border border-gray-200"
              >
                + Register Another Surplus Meal
              </button>
            </div>
          </div>

        </div>
      )}

      {/* MY DONATIONS HISTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-green-600/10 space-y-4">
        <h3 className="text-xl font-black font-outfit text-green-950">My Registered Donations History</h3>
        
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-green-950 text-white font-black uppercase tracking-wider">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Food Item</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Serving Count</th>
                <th className="p-3">Assigned NGO</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map(item => (
                <tr key={item.id} className="hover:bg-green-50/60 transition-colors">
                  <td className="p-3 font-bold text-green-900 font-mono">{item.id}</td>
                  <td className="p-3 font-bold text-gray-900">{item.foodName}</td>
                  <td className="p-3 font-semibold text-orange-600">{item.quantity}</td>
                  <td className="p-3 font-extrabold text-green-900">{item.servingCapacity} Meals</td>
                  <td className="p-3 text-green-800 font-bold">{item.ngoName}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      item.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate('/track')}
                      className="text-xs text-green-700 font-black underline hover:text-green-900"
                    >
                      Track Live
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DonorDashboard;

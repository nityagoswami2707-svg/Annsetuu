import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { Utensils, Building2, Truck, Heart, UserPlus, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const { registerUser, t } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ngoPendingSubmitted, setNgoPendingSubmitted] = useState(false);

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Vadodara');

  // Food Donor Specific
  const [donorType, setDonorType] = useState('Restaurant');
  const [orgName, setOrgName] = useState('');

  // NGO Specific
  const [ngoName, setNgoName] = useState('');
  const [address, setAddress] = useState('');
  const [serviceArea, setServiceArea] = useState('Vadodara Metropolitan');
  const [regNo, setRegNo] = useState('');
  const [beneficiaryType, setBeneficiaryType] = useState('Children & Shelter Homes');
  const [capacity, setCapacity] = useState('300 meals/day');

  // Volunteer Specific
  const [transportType, setTransportType] = useState('EV Bike / Two Wheeler');
  const [availability, setAvailability] = useState('Weekends & Evenings');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedRole) {
      setErrorMsg('Please select how you would like to contribute.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const registeredData = {
        email,
        password,
        name: fullName || (selectedRole === 'ngo' ? ngoName : email.split('@')[0]),
        phone,
        location,
        role: selectedRole,
        donorType,
        orgName,
        ngoName,
        address,
        serviceArea,
        regNo,
        beneficiaryType,
        capacity,
        transportType,
        availability
      };

      const newUser = await registerUser(registeredData);
      setLoading(false);

      if (selectedRole === 'ngo') {
        setNgoPendingSubmitted(true);
      } else {
        const rolePath = selectedRole === 'volunteer' ? '/volunteer' :
                         selectedRole === 'fund_donor' ? '/fund-donor' : '/donor';
        navigate(rolePath);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Registration failed. Please check inputs.');
    }
  };

  const rolesConfig = [
    {
      id: 'donor',
      title: `🍱 ${t('donorPortalRole')}`,
      subtitle: 'Donate surplus food from restaurants, hotels, cafés, caterers, events, or your home.',
      color: 'border-orange-300 hover:border-orange-500 bg-orange-50/70 text-orange-950',
      badge: 'Surplus Rescue'
    },
    {
      id: 'ngo',
      title: `🏢 ${t('ngoPortalRole')}`,
      subtitle: 'Help receive and distribute surplus food to people in need.',
      color: 'border-green-300 hover:border-green-500 bg-green-50/70 text-green-950',
      badge: 'Verified Distribution'
    },
    {
      id: 'volunteer',
      title: `🚴 ${t('deliveryDriverRole')}`,
      subtitle: 'Help collect and deliver surplus food safely from donors to NGOs.',
      color: 'border-blue-300 hover:border-blue-500 bg-blue-50/70 text-blue-950',
      badge: 'Logistics Partner'
    },
    {
      id: 'fund_donor',
      title: '💝 Fund Donor',
      subtitle: 'Support AnnSetu financially when you don\'t have food to donate.',
      color: 'border-purple-300 hover:border-purple-500 bg-purple-50/70 text-purple-950',
      badge: 'Social Impact'
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-2xl w-full mx-auto px-4 relative z-10 space-y-6">
        
        {ngoPendingSubmitted ? (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-300 text-center space-y-5 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black">
              ⏳
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-green-950">
              Registration Submitted!
            </h2>
            <p className="text-sm font-semibold text-amber-900 bg-amber-50 p-4 rounded-2xl border border-amber-200 leading-relaxed">
              “Your NGO registration has been submitted. Our team will verify your organization before full platform access is enabled.”
            </p>
            <div className="pt-3">
              <button
                onClick={() => navigate('/ngo')}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md btn-bounce-active"
              >
                Proceed to Pending NGO View →
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-green-200 text-gray-900 space-y-6 animate-in fade-in zoom-in-95 duration-500">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-green-100 border border-green-300 text-green-700 flex items-center justify-center mb-2 shadow-sm">
                <UserPlus className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-outfit text-green-950">
                {t('createAccount')}
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                {!selectedRole ? t('howContribute') : `Step 2: Complete ${selectedRole.toUpperCase().replace('_', ' ')} Registration.`}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 text-center">
                {errorMsg}
              </div>
            )}

            {!selectedRole ? (
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-gray-800 text-center uppercase tracking-wider">
                  {t('howContribute')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {rolesConfig.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all btn-bounce-active flex flex-col justify-between space-y-3 ${r.color}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-black font-outfit">{r.title}</h4>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white border border-gray-200 shadow-sm">
                            {r.badge}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray-700 leading-relaxed">
                          {r.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-end text-xs font-black text-green-900 space-x-1">
                        <span>{t('selectRoleLabel')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                
                <div className="flex items-center justify-between bg-orange-50 p-3 rounded-2xl border border-orange-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-orange-950">Active Role:</span>
                    <span className="text-xs font-bold text-orange-700 uppercase bg-white px-2.5 py-0.5 rounded-full border">
                      {selectedRole.replace('_', ' ')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('changeRole')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-extrabold text-gray-700 block mb-1">
                      {selectedRole === 'ngo' ? 'Contact Person Name *' : `${t('fullNameLabel')} *`}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-gray-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-gray-700 block mb-1">{t('emailLabel')} *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-gray-700 block mb-1">City / Location *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Vadodara, Gujarat"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-gray-700 block mb-1">{t('passwordLabel')} *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-gray-700 block mb-1">{t('confirmPasswordLabel')} *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                    />
                  </div>
                </div>

                {selectedRole === 'donor' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Donor Type *</label>
                      <select
                        value={donorType}
                        onChange={(e) => setDonorType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      >
                        <option value="Restaurant">Restaurant</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Café">Café</option>
                        <option value="Caterer">Caterer</option>
                        <option value="Individual">Individual / Home</option>
                        <option value="Event Organizer">Event Organizer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Organization Name (Optional)</label>
                      <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="e.g. Royal Grand Dining"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'ngo' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">NGO Organization Name *</label>
                      <input
                        type="text"
                        value={ngoName}
                        onChange={(e) => setNgoName(e.target.value)}
                        placeholder="e.g. Hope Foundation India"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Registration Number *</label>
                      <input
                        type="text"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        placeholder="e.g. REG-2023-998877"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-extrabold text-gray-700 block mb-1">Full Shelter Address *</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Plot 45, Community Center, Alkapuri, Vadodara"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Daily Shelter Capacity *</label>
                      <input
                        type="text"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="e.g. 400 meals/day"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Service Area *</label>
                      <input
                        type="text"
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                        placeholder="e.g. Vadodara Central"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'volunteer' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Transport Mode *</label>
                      <select
                        value={transportType}
                        onChange={(e) => setTransportType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      >
                        <option value="EV Bike / Two Wheeler">EV Bike / Two Wheeler</option>
                        <option value="Four Wheeler Van">Four Wheeler Cargo Van</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="On Foot / Local">On Foot / Local Helper</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-extrabold text-gray-700 block mb-1">Availability Schedule *</label>
                      <input
                        type="text"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        placeholder="e.g. Weekends 6 PM - 10 PM"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active mt-3"
                >
                  {loading ? (
                    <span>Registering Account...</span>
                  ) : (
                    <>
                      <span>{t('completeRegistration')}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

            <div className="text-center pt-2 text-xs font-medium text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-black text-green-800 hover:underline">
                {t('accountLogin')}
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterPage;

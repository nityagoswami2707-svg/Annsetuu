import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Utensils, 
  Building2, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  ChevronRight,
  Bot,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Leaf,
  Recycle,
  Award,
  Smile
} from 'lucide-react';

const Home = () => {
  const { t, setRole, stats } = useApp();
  const navigate = useNavigate();

  // 3D Ken-Burns Slideshow Images
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80",
      caption: "Volunteers Distributing Fresh Meals to Community Children"
    },
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&auto=format&fit=crop&q=80",
      caption: "Surplus Food Collected from Fine Dining Restaurants & Banquets"
    },
    {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80",
      caption: "EV Logistics Delivering Warm Food to Shelter Homes"
    },
    {
      url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1600&auto=format&fit=crop&q=80",
      caption: "Community Kitchen Staff Preparing Hygienic Meal Packs"
    },
    {
      url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=1600&auto=format&fit=crop&q=80",
      caption: "Connecting Surplus Food to Thousands of Happy Smiles"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="space-y-12 sm:space-y-20">
      
      {/* ================================================== */}
      {/* HERO SECTION — MOBILE FIRST OPTIMIZED */}
      {/* ================================================== */}
      <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        
        {/* 3D Moving Background Slideshow */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slide.url}
              alt={`Annsetu Project ${idx + 1}`}
              className="w-full h-full object-cover animate-kenburns transform scale-105"
            />
            {/* Theme Gradient Overlay for High Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-black/50 backdrop-blur-[1px]"></div>
          </div>
        ))}

        {/* Slide Manual Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-orange-500 transition-colors backdrop-blur-md btn-bounce-active"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-orange-500 transition-colors backdrop-blur-md btn-bounce-active"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Progress Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-orange-400' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hero Text & Actions */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-900/90 text-orange-300 border border-orange-500/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>ANNSETU — Bridging Surplus to Smiles</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-outfit text-white leading-tight tracking-tight drop-shadow-md">
            “Turn Surplus Food Into Someone’s Meal.”
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm px-2">
            Annsetu connects surplus food from restaurants, hotels, events and households with NGOs and volunteers who can deliver it to people who need it.
          </p>

          {/* Primary Call to Actions — Touch Friendly Full Width on Mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-2 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => {
                const target = document.getElementById('dashboards-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-base shadow-2xl flex items-center justify-center space-x-2 btn-bounce-active tracking-wide"
            >
              <span>Explore Annsetu</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/donor"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-base shadow-2xl border-2 border-emerald-400/40 flex items-center justify-center space-x-2 btn-bounce-active tracking-wide"
            >
              <Utensils className="w-5 h-5 text-orange-400" />
              <span>Donate Food</span>
            </Link>
          </div>

          {/* Dynamic Caption Bar */}
          <div className="pt-4 text-xs font-semibold text-emerald-200/90 flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
            <span className="italic">{slides[currentSlide].caption}</span>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* REAL-TIME IMPACT COUNTERS */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-900/10 gradient-card-emerald">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-green-800 bg-green-100 px-3.5 py-1 rounded-full border border-green-200">
              {t('realtimePlatformStats')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-green-950 font-outfit mt-2">{t('ourCollectiveImpact')}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
            
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">10,480+</p>
              <p className="text-[11px] font-black text-green-800 uppercase tracking-wider mt-1">{t('mealsDonated')}</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">2,500+</p>
              <p className="text-[11px] font-black text-green-800 uppercase tracking-wider mt-1">{t('peopleServed')}</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-purple-600" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">120+</p>
              <p className="text-[11px] font-black text-green-800 uppercase tracking-wider mt-1">{t('activeDonors')}</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">45+</p>
              <p className="text-[11px] font-black text-green-800 uppercase tracking-wider mt-1">{t('partnerNGOs')}</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-2">
                <Recycle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">8.5+ Tons</p>
              <p className="text-[11px] font-black text-green-800 uppercase tracking-wider mt-1">{t('foodSaved')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* PROBLEM STATEMENT — MOBILE CARD SPECIFICATION */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-orange-500/20 card-zoom-3d space-y-4">
          <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">Core Challenge</span>
              <h2 className="text-xl sm:text-3xl font-black font-outfit text-green-950">THE PROBLEM</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
            “Large quantities of safe, edible food from restaurants, hotels, weddings, and households are wasted every day, while many people go hungry. There is no efficient platform to connect food donors with NGOs and volunteers in real time.”
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* SOLUTION — MOBILE VERTICAL FLOW SPECIFICATION */}
      {/* ================================================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-green-800 uppercase tracking-widest bg-green-100 px-3.5 py-1 rounded-full border border-green-200">
            Platform Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">THE ANNSETU SOLUTION</h2>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            “Annsetu creates a real-time bridge between food donors, verified NGOs and delivery volunteers. The platform allows surplus food to be registered, evaluated, accepted, collected, tracked and successfully delivered.”
          </p>
        </div>

        {/* Vertical Mobile Flow (Switches to Horizontal on Desktop) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 pt-4 max-w-4xl mx-auto">
          
          {/* Step 1: Donor */}
          <div className="w-full md:w-1/5 bg-white p-5 rounded-2xl border-2 border-emerald-800/20 shadow-md text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🍱</span>
            <h4 className="text-sm font-black font-outfit text-green-950">Donor</h4>
            <p className="text-[10px] text-gray-500 font-semibold">Registers surplus food & pickup info</p>
          </div>

          <div className="text-orange-500 text-2xl font-black transform md:rotate-0 rotate-90 my-1">↓</div>

          {/* Step 2: AI Smart Matching */}
          <div className="w-full md:w-1/5 bg-amber-500 text-gray-950 p-5 rounded-2xl border-2 border-amber-600 shadow-md text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🤖</span>
            <h4 className="text-sm font-black font-outfit">AI Smart Matching</h4>
            <p className="text-[10px] font-bold">Matches nearby verified NGO by distance & capacity</p>
          </div>

          <div className="text-orange-500 text-2xl font-black transform md:rotate-0 rotate-90 my-1">↓</div>

          {/* Step 3: NGO */}
          <div className="w-full md:w-1/5 bg-white p-5 rounded-2xl border-2 border-emerald-800/20 shadow-md text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🤝</span>
            <h4 className="text-sm font-black font-outfit text-green-950">NGO</h4>
            <p className="text-[10px] text-gray-500 font-semibold">Evaluates food quality & accepts request</p>
          </div>

          <div className="text-orange-500 text-2xl font-black transform md:rotate-0 rotate-90 my-1">↓</div>

          {/* Step 4: Delivery */}
          <div className="w-full md:w-1/5 bg-white p-5 rounded-2xl border-2 border-emerald-800/20 shadow-md text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🚚</span>
            <h4 className="text-sm font-black font-outfit text-green-950">Delivery</h4>
            <p className="text-[10px] text-gray-500 font-semibold">EV volunteer completes GPS tracked route</p>
          </div>

          <div className="text-orange-500 text-2xl font-black transform md:rotate-0 rotate-90 my-1">↓</div>

          {/* Step 5: People Served */}
          <div className="w-full md:w-1/5 bg-emerald-950 text-white p-5 rounded-2xl border-2 border-emerald-800 shadow-md text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">❤️</span>
            <h4 className="text-sm font-black font-outfit">People Served</h4>
            <p className="text-[10px] text-emerald-200 font-semibold">Nourishing meals shared with dignity</p>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* MOBILE DASHBOARD SELECTION CARDS */}
      {/* ================================================== */}
      <section id="dashboards-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {t('platformPortals')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-green-950 font-outfit">
            Explore Annsetu Portals
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Select your role to access role-specific tools, live tracking, and distribution management.
          </p>
        </div>

        {/* Stacked Vertically on Mobile / 4-Col Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Admin */}
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xl card-zoom-3d flex flex-col justify-between space-y-4">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black font-outfit text-green-950 mb-1">Admin</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Monitor users, NGOs, donations and overall platform impact in real time.</p>
            </div>
            <button
              onClick={() => {
                setRole('admin');
                navigate('/admin');
              }}
              className="w-full min-h-[48px] px-4 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-black text-xs flex items-center justify-center space-x-2 btn-bounce-active shadow-md"
            >
              <span>Access Admin Dashboard</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Card 2: Donor */}
          <div className="bg-white rounded-3xl p-6 border-2 border-orange-200 shadow-xl card-zoom-3d flex flex-col justify-between space-y-4">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black font-outfit text-green-950 mb-1">Donor</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Register surplus food, capture photos, and track real-time NGO acceptance.</p>
            </div>
            <button
              onClick={() => {
                setRole('donor');
                navigate('/donor');
              }}
              className="w-full min-h-[48px] px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs flex items-center justify-center space-x-2 btn-bounce-active shadow-md"
            >
              <span>Access Donor Dashboard</span>
              <ChevronRight className="w-4 h-4 text-gray-950" />
            </button>
          </div>

          {/* Card 3: NGO */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-200 shadow-xl card-zoom-3d flex flex-col justify-between space-y-4">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black font-outfit text-green-950 mb-1">NGO</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Review incoming food requests, evaluate quality, and accept pickups.</p>
            </div>
            <button
              onClick={() => {
                setRole('ngo');
                navigate('/ngo');
              }}
              className="w-full min-h-[48px] px-4 rounded-2xl bg-green-800 hover:bg-green-900 text-white font-black text-xs flex items-center justify-center space-x-2 btn-bounce-active shadow-md"
            >
              <span>Access NGO Dashboard</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Card 4: Tracking */}
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-xl card-zoom-3d flex flex-col justify-between space-y-4">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black font-outfit text-green-950 mb-1">Tracking</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Track the complete food journey live on GPS telematics map from pickup to delivery.</p>
            </div>
            <button
              onClick={() => {
                navigate('/track');
              }}
              className="w-full min-h-[48px] px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center space-x-2 btn-bounce-active shadow-md"
            >
              <span>Access Tracking Dashboard</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* FINAL CALL TO ACTION */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-950 via-green-900 to-orange-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black font-outfit">{t('haveExtraFood')}</h2>
            <p className="text-base text-orange-200 italic font-bold">"Bridging Surplus to Smiles — Anytime, Anywhere, From Any Device."</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/donor"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-base shadow-xl flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Utensils className="w-5 h-5" />
              <span>Donate Surplus Meals</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

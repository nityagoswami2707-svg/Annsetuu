import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Utensils, 
  Building2, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Recycle, 
  Leaf, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80',
    title: 'Hopeful Children Waiting for Meals',
    subtitle: 'Connecting Surplus Food with Hungry Smiles'
  },
  {
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&auto=format&fit=crop&q=80',
    title: 'Volunteers Distributing Warm Meals',
    subtitle: '100% Grassroots NGO Network in Action'
  },
  {
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&auto=format&fit=crop&q=80',
    title: 'Underprivileged Children Receiving Food',
    subtitle: 'Zero Food Waste, Maximum Social Impact'
  },
  {
    url: 'https://images.unsplash.com/photo-1594708767771-a75921d83724?w=1600&auto=format&fit=crop&q=80',
    title: 'Hygienic Community Kitchen & Prep',
    subtitle: 'Certified Quality & Food Safety Protocols'
  },
  {
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&auto=format&fit=crop&q=80',
    title: 'Restaurant & Banquet Surplus Meal Pickup',
    subtitle: 'Real-Time Live GPS Telematics Navigation'
  }
];

const Home = () => {
  const { t, stats, setRole } = useApp();
  const navigate = useNavigate();

  // 3D Animated Hero Background Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slideshow slides every 4 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  // Animated counters
  const [mealsCount, setMealsCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  const [donorsCount, setDonorsCount] = useState(0);
  const [ngosCount, setNgosCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMealsCount(prev => (prev < stats.totalMeals ? Math.min(prev + 250, stats.totalMeals) : stats.totalMeals));
      setPeopleCount(prev => (prev < stats.peopleServed ? Math.min(prev + 60, stats.peopleServed) : stats.peopleServed));
      setDonorsCount(prev => (prev < stats.activeDonors ? Math.min(prev + 3, stats.activeDonors) : stats.activeDonors));
      setNgosCount(prev => (prev < stats.activeNGOs ? Math.min(prev + 1, stats.activeNGOs) : stats.activeNGOs));
    }, 40);
    return () => clearInterval(timer);
  }, [stats]);

  return (
    <div className="space-y-24 pb-16 pt-24">
      
      {/* ================================================== */}
      {/* HERO SECTION WITH 3D MOVING BACKGROUND SLIDESHOW */}
      {/* ================================================== */}
      <section className="relative min-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-6 sm:p-12 text-white border-2 border-green-700/30 mx-4 sm:mx-8">
        
        {/* 3D Moving Animated Background Slideshow */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center animate-kenburns"
              style={{ backgroundImage: `url('${slide.url}')` }}
            />
          </div>
        ))}
        
        {/* Soft Theme Gradient Overlay for text readability */}
        <div className="absolute inset-0 gradient-hero-overlay backdrop-blur-xs z-1"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Prominent Large Logo Display */}
          <div className="inline-block p-4 sm:p-5 bg-white/95 rounded-3xl shadow-2xl border-4 border-orange-500/40 backdrop-blur-md transition-transform transform hover:scale-105">
            <img 
              src="/annsetu_logo.png" 
              alt="ANNSETU Official Logo" 
              className="h-28 sm:h-36 md:h-44 w-auto mx-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Subtitle text */}
          <div className="space-y-3">
            <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-orange-300 italic font-sans drop-shadow-md">
              "{t('heroSubtitle')}"
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-200 tracking-wider uppercase">
              ✨ {HERO_SLIDES[currentSlide].subtitle}
            </p>
          </div>

          {/* Primary Interactive Animated Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
            <a 
              href="#dashboards-section"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-base shadow-2xl shadow-orange-600/30 flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <span>[ {t('exploreAnnsetu')} ]</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a 
              href="#how-it-works"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-base border-2 border-white/40 backdrop-blur-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <span>[ {t('howItWorks')} ]</span>
            </a>
          </div>

          {/* Key highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-green-200 font-extrabold border-t border-green-700/60 max-w-2xl mx-auto">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-orange-400 mr-1.5" /> {t('verifiedNgoNetwork')}</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-orange-400 mr-1.5" /> {t('realtimeGpsTracking')}</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-orange-400 mr-1.5" /> {t('certifiedFoodSafety')}</span>
          </div>

          {/* Slideshow Controls & Indicators */}
          <div className="pt-4 flex items-center justify-center space-x-3">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all transform active:scale-90"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex space-x-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-orange-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all transform active:scale-90"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* IMPACT COUNTERS SECTION */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-green-600/10 gradient-card-emerald relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-green-700 bg-green-100 px-3.5 py-1 rounded-full border border-green-200">
              {t('realtimePlatformStats')}
            </span>
            <h2 className="text-3xl font-black text-green-950 font-outfit mt-2">{t('ourCollectiveImpact')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                <Utensils className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-green-950 font-outfit">
                {mealsCount.toLocaleString()}+
              </p>
              <p className="text-xs font-black text-green-800 uppercase tracking-wider mt-1">{t('mealsDonated')}</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-green-950 font-outfit">
                {peopleCount.toLocaleString()}+
              </p>
              <p className="text-xs font-black text-green-800 uppercase tracking-wider mt-1">{t('peopleServed')}</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 fill-purple-600" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-green-950 font-outfit">
                {donorsCount}+
              </p>
              <p className="text-xs font-black text-green-800 uppercase tracking-wider mt-1">{t('activeDonors')}</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-green-950 font-outfit">
                {ngosCount}+
              </p>
              <p className="text-xs font-black text-green-800 uppercase tracking-wider mt-1">{t('partnerNGOs')}</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm card-zoom-3d col-span-2 md:col-span-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-3">
                <Recycle className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-green-950 font-outfit">
                8.5+
              </p>
              <p className="text-xs font-black text-green-800 uppercase tracking-wider mt-1">{t('foodSaved')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* WHY FOOD DONATION MATTERS */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {t('missionPurpose')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-green-950 font-outfit">
            "{t('whyDonationTitle')}"
          </h2>
          <p className="text-base text-gray-700 leading-relaxed font-normal">
            {t('whyDonationSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-green-900/10 shadow-md card-zoom-3d group">
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-5 group-hover:bg-green-700 group-hover:text-white transition-colors">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('reduceWasteTitle')}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t('reduceWasteDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-green-900/10 shadow-md card-zoom-3d group">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('fightHungerTitle')}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t('fightHungerDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-green-900/10 shadow-md card-zoom-3d group">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Recycle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('protectEnvTitle')}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t('protectEnvDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-green-900/10 shadow-md card-zoom-3d group">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('buildCommunityTitle')}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t('buildCommunityDesc')}</p>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* PROBLEM STATEMENT SECTION */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border-2 border-green-800">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-green-900 px-4 py-1 rounded-full border border-green-700">
              {t('theReality')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-outfit text-white">
              {t('problemTitle')}
            </h2>
            <p className="text-base sm:text-lg text-green-100/90 leading-relaxed font-normal">
              "{t('problemText')}"
            </p>
          </div>

          {/* Visual Flow Diagram */}
          <div className="mt-12 pt-8 border-t border-green-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
            
            {/* Left Box */}
            <div className="bg-green-900/70 p-6 rounded-2xl border border-green-700 space-y-3">
              <div className="text-xs font-black text-orange-400 uppercase tracking-widest">{t('surplusSide')}</div>
              <div className="text-xl font-extrabold font-outfit text-white">{t('surplusFood')}</div>
              <div className="text-2xl font-bold text-red-400 animate-bounce">↓</div>
              <div className="text-sm font-bold text-red-300 bg-red-950/60 py-1 px-3 rounded-lg border border-red-800">
                {t('foodWaste')}
              </div>
            </div>

            {/* Middle Connector */}
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-orange-500 to-green-500 flex items-center justify-center shadow-xl animate-pulse">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="text-base font-black text-orange-300 font-outfit uppercase tracking-wider">
                {t('annsetuConnects')}
              </div>
            </div>

            {/* Right Box */}
            <div className="bg-green-900/70 p-6 rounded-2xl border border-green-700 space-y-3">
              <div className="text-xs font-black text-green-400 uppercase tracking-widest">{t('needSide')}</div>
              <div className="text-xl font-extrabold font-outfit text-white">{t('peopleInNeed')}</div>
              <div className="text-2xl font-bold text-orange-400 animate-bounce">↓</div>
              <div className="text-sm font-bold text-orange-200 bg-orange-950/60 py-1 px-3 rounded-lg border border-orange-800">
                {t('foodShortage')}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SOLUTION & 7-STEP PIPELINE SECTION */}
      {/* ================================================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold text-green-700 uppercase tracking-widest bg-green-100 px-3.5 py-1 rounded-full border border-green-200">
            {t('redistributionEngine')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-green-950 font-outfit">
            {t('solutionTitle')}
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {t('solutionSub')}
          </p>
        </div>

        {/* 7-Step Visual Process Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
          
          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm space-y-2 card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-green-800 text-white font-bold text-xs flex items-center justify-center">1</div>
            <p className="text-xs font-bold text-green-950 font-outfit">{t('step1Title')}</p>
            <p className="text-[10px] text-gray-500">{t('step1Sub')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm space-y-2 card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center">2</div>
            <p className="text-xs font-bold text-green-950 font-outfit">{t('step2Title')}</p>
            <p className="text-[10px] text-gray-500">{t('step2Sub')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm space-y-2 card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-green-700 text-white font-bold text-xs flex items-center justify-center">3</div>
            <p className="text-xs font-bold text-green-950 font-outfit">{t('step3Title')}</p>
            <p className="text-[10px] text-gray-500">{t('step3Sub')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm space-y-2 card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">4</div>
            <p className="text-xs font-bold text-green-950 font-outfit">{t('step4Title')}</p>
            <p className="text-[10px] text-gray-500">{t('step4Sub')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm space-y-2 card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">5</div>
            <p className="text-xs font-bold text-green-950 font-outfit">{t('step5Title')}</p>
            <p className="text-[10px] text-gray-500">{t('step5Sub')}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm space-y-2 card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center">6</div>
            <p className="text-xs font-bold text-green-950 font-outfit">{t('step6Title')}</p>
            <p className="text-[10px] text-gray-500">{t('step6Sub')}</p>
          </div>

          <div className="bg-orange-500 p-4 rounded-2xl border border-orange-400 shadow-md space-y-2 col-span-2 md:col-span-1 text-white card-zoom-3d">
            <div className="w-8 h-8 mx-auto rounded-full bg-white text-orange-600 font-black text-xs flex items-center justify-center">7</div>
            <p className="text-xs font-black font-outfit">{t('step7Title')}</p>
            <p className="text-[10px] font-bold">{t('step7Sub')}</p>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* FOUR MAIN DASHBOARDS SELECTION SCREEN */}
      {/* ================================================== */}
      <section id="dashboards-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {t('platformPortals')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-green-950 font-outfit">
            {t('dashboardsTitle')}
          </h2>
          <p className="text-base text-gray-700">
            {t('dashboardsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Admin */}
          <div className="bg-white rounded-3xl p-6 border border-green-900/10 shadow-lg card-zoom-3d flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('adminDashboard')}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">{t('adminDesc')}</p>
            </div>
            <button
              onClick={() => {
                setRole('admin');
                navigate('/admin');
              }}
              className="w-full py-3 px-4 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <span>{t('openDashboard')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Donor */}
          <div className="bg-white rounded-3xl p-6 border border-green-900/10 shadow-lg card-zoom-3d flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('donorDashboard')}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">{t('donorDesc')}</p>
            </div>
            <button
              onClick={() => {
                setRole('donor');
                navigate('/donor');
              }}
              className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <span>{t('openDashboard')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: NGO */}
          <div className="bg-white rounded-3xl p-6 border border-green-900/10 shadow-lg card-zoom-3d flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('ngoDashboard')}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">{t('ngoDesc')}</p>
            </div>
            <button
              onClick={() => {
                setRole('ngo');
                navigate('/ngo');
              }}
              className="w-full py-3 px-4 rounded-xl bg-green-800 hover:bg-green-900 text-white font-bold text-xs flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <span>{t('openDashboard')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Tracking */}
          <div className="bg-white rounded-3xl p-6 border border-green-900/10 shadow-lg card-zoom-3d flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-outfit text-green-950 mb-2">{t('trackingDashboard')}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">{t('trackingDesc')}</p>
            </div>
            <button
              onClick={() => {
                navigate('/track');
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <span>{t('openDashboard')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* LANDING PAGE FINAL CALL TO ACTION */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-orange-600 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black font-outfit">{t('haveExtraFood')}</h2>
            <p className="text-xl text-orange-200 italic font-semibold">"{t('ctaSubText')}"</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/donor"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-base shadow-xl flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Utensils className="w-5 h-5" />
              <span>[ {t('donateNow')} ]</span>
            </Link>

            <Link
              to="/ngo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-base border-2 border-white/40 backdrop-blur-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Building2 className="w-5 h-5" />
              <span>[ {t('partnerNGO')} ]</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

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
  Smile,
  Activity,
  Globe,
  Star
} from 'lucide-react';

const Home = () => {
  const { t, setRole, stats, isRealtimeActive } = useApp();
  const navigate = useNavigate();

  // 3D Ken-Burns Hero Slideshow Images
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

  // Aesthetic Multi-Stage Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="space-y-16 sm:space-y-24 relative overflow-hidden bg-gradient-to-b from-green-950 via-emerald-950 to-emerald-900 text-white min-h-screen">
      
      {/* ================================================== */}
      {/* THEMED DYNAMIC MOTION BACKGROUND MESH & FLOATING ORBS */}
      {/* ================================================== */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none z-0">
        {/* Animated Theme Glow Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl motion-bg-particle-1"></div>
        <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-orange-500/25 rounded-full filter blur-3xl motion-bg-particle-2"></div>
        <div className="absolute top-2/3 left-1/4 w-[28rem] h-[28rem] bg-amber-500/20 rounded-full filter blur-3xl motion-bg-particle-1"></div>
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-green-400/20 rounded-full filter blur-3xl motion-bg-particle-2"></div>

        {/* Floating Glowing Brand Icons */}
        <div className="absolute top-96 left-8 text-emerald-400/15 motion-bg-particle-1 hidden lg:block">
          <Utensils className="w-28 h-28 animate-pulse" />
        </div>
        <div className="absolute top-[40%] right-12 text-orange-400/20 motion-bg-particle-2 hidden lg:block">
          <Heart className="w-32 h-32 fill-orange-400/20 animate-bounce" style={{ animationDuration: '7s' }} />
        </div>
        <div className="absolute top-[65%] left-16 text-amber-300/15 motion-bg-particle-1 hidden lg:block">
          <Leaf className="w-24 h-24" />
        </div>
        <div className="absolute bottom-40 right-20 text-emerald-300/15 motion-bg-particle-2 hidden lg:block">
          <Recycle className="w-28 h-28" />
        </div>
      </div>

      {/* ================================================== */}
      {/* HERO SECTION — 3D SLIDESHOW & RESPONSIVE CTAs */}
      {/* ================================================== */}
      <section className="relative min-h-[92vh] sm:min-h-[88vh] flex items-center justify-center pt-24 pb-12 overflow-hidden shadow-2xl z-10">
        
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
            {/* Gradient Overlay for Readable Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/85 to-black/60 backdrop-blur-[1px]"></div>
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

        {/* Hero Content with Entrance Transition */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Badge with Supabase Real-Time Indicator */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-emerald-900/90 text-orange-300 border border-orange-500/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-xl">
            <Sparkles className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t('brandName')} — {t('tagline')}</span>
            {isRealtimeActive && (
              <span className="inline-flex items-center text-[9px] bg-amber-500 text-gray-950 px-2 py-0.5 rounded-full font-black ml-1">
                <Activity className="w-2.5 h-2.5 mr-1 animate-ping text-gray-950" /> Live Database Sync
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-outfit text-white leading-tight tracking-tight drop-shadow-lg">
            “{t('ctaSubText')}”
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm px-2">
            {t('heroSubtitle')}
          </p>

          {/* Primary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-2 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => {
                const target = document.getElementById('how-it-works');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-base shadow-2xl flex items-center justify-center space-x-2 btn-bounce-active tracking-wide"
            >
              <span>{t('exploreAnnsetu')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/donor"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-base shadow-2xl border-2 border-emerald-400/40 flex items-center justify-center space-x-2 btn-bounce-active tracking-wide"
            >
              <Utensils className="w-5 h-5 text-orange-400" />
              <span>{t('donateFood')}</span>
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
      {/* REAL-TIME IMPACT COUNTERS — GLASSMORPHISM SCROLL REVEAL */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-reveal">
        <div className="bg-emerald-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-700/60 text-white">
          
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-700">
              {t('realtimePlatformStats')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white">{t('ourCollectiveImpact')}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
            
            <div className="p-5 bg-emerald-950/80 rounded-2xl border border-emerald-700/80 shadow-md card-zoom-3d space-y-1">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
                <Utensils className="w-6 h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-amber-400 font-outfit">10,480+</p>
              <p className="text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider">{t('mealsDonated')}</p>
            </div>

            <div className="p-5 bg-emerald-950/80 rounded-2xl border border-emerald-700/80 shadow-md card-zoom-3d space-y-1">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-white font-outfit">2,500+</p>
              <p className="text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider">{t('peopleServed')}</p>
            </div>

            <div className="p-5 bg-emerald-950/80 rounded-2xl border border-emerald-700/80 shadow-md card-zoom-3d space-y-1">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 fill-purple-400" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-white font-outfit">120+</p>
              <p className="text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider">{t('activeDonors')}</p>
            </div>

            <div className="p-5 bg-emerald-950/80 rounded-2xl border border-emerald-700/80 shadow-md card-zoom-3d space-y-1">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <Building2 className="w-6 h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-white font-outfit">45+</p>
              <p className="text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider">{t('partnerNGOs')}</p>
            </div>

            <div className="p-5 bg-emerald-950/80 rounded-2xl border border-emerald-700/80 shadow-md card-zoom-3d col-span-2 lg:col-span-1 space-y-1">
              <div className="w-11 h-11 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                <Recycle className="w-6 h-6" />
              </div>
              <p className="text-2xl sm:text-4xl font-black text-amber-400 font-outfit">8.5+ Tons</p>
              <p className="text-[11px] font-extrabold text-emerald-200 uppercase tracking-wider">{t('foodSaved')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* MISSION & PURPOSE — STAGGERED SCROLL TRANSITIONS */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 scroll-reveal">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-emerald-900/90 px-4 py-1.5 rounded-full border border-emerald-700">
            {t('missionPurpose')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit">
            "{t('whyDonationTitle')}"
          </h2>
          <p className="text-base text-emerald-100/90 leading-relaxed font-medium">
            {t('whyDonationSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-emerald-900/70 backdrop-blur-md p-6 rounded-3xl border border-emerald-700/60 shadow-xl card-zoom-3d group scroll-reveal-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-md">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white mb-2">{t('reduceWasteTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">{t('reduceWasteDesc')}</p>
          </div>

          <div className="bg-emerald-900/70 backdrop-blur-md p-6 rounded-3xl border border-emerald-700/60 shadow-xl card-zoom-3d group scroll-reveal-scale">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-gray-950 transition-colors shadow-md">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white mb-2">{t('fightHungerTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">{t('fightHungerDesc')}</p>
          </div>

          <div className="bg-emerald-900/70 backdrop-blur-md p-6 rounded-3xl border border-emerald-700/60 shadow-xl card-zoom-3d group scroll-reveal-scale">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-md">
              <Recycle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white mb-2">{t('protectEnvTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">{t('protectEnvDesc')}</p>
          </div>

          <div className="bg-emerald-900/70 backdrop-blur-md p-6 rounded-3xl border border-emerald-700/60 shadow-xl card-zoom-3d group scroll-reveal-right">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white mb-2">{t('buildCommunityTitle')}</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">{t('buildCommunityDesc')}</p>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* CORE PROBLEM CARD — SCROLL REVEAL SCALE */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-reveal-scale">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-orange-500/40 card-zoom-3d space-y-4">
          <div className="flex items-center space-x-3 border-b border-emerald-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-gray-950 flex items-center justify-center shrink-0 shadow-lg">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block">{t('theReality')}</span>
              <h2 className="text-xl sm:text-3xl font-black font-outfit text-white">{t('problemTitle')}</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-semibold">
            “{t('problemText')}”
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* SOLUTION PIPELINE — VERTICAL STACK TRANSITION */}
      {/* ================================================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 scroll-reveal">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-emerald-900 px-4 py-1.5 rounded-full border border-emerald-700">
            {t('redistributionEngine')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white">{t('solutionTitle')}</h2>
          <p className="text-sm text-emerald-200/90 leading-relaxed font-medium">
            “{t('solutionSub')}”
          </p>
        </div>

        {/* Vertical Mobile Flow (Horizontal on Desktop) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 pt-4 max-w-4xl mx-auto">
          
          {/* Step 1: Donor */}
          <div className="w-full md:w-1/5 bg-emerald-900/80 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-700 shadow-xl text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🍱</span>
            <h4 className="text-sm font-black font-outfit text-amber-400">{t('step1Title')}</h4>
            <p className="text-[10px] text-emerald-200 font-semibold">{t('step1Sub')}</p>
          </div>

          <div className="text-orange-400 text-2xl font-black transform md:rotate-0 rotate-90 my-1 animate-pulse">↓</div>

          {/* Step 2: AI Smart Matching */}
          <div className="w-full md:w-1/5 bg-amber-500 text-gray-950 p-5 rounded-2xl border-2 border-amber-400 shadow-xl text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🤖</span>
            <h4 className="text-sm font-black font-outfit">{t('step2Title')}</h4>
            <p className="text-[10px] font-bold">{t('step2Sub')}</p>
          </div>

          <div className="text-orange-400 text-2xl font-black transform md:rotate-0 rotate-90 my-1 animate-pulse">↓</div>

          {/* Step 3: NGO */}
          <div className="w-full md:w-1/5 bg-emerald-900/80 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-700 shadow-xl text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🤝</span>
            <h4 className="text-sm font-black font-outfit text-amber-400">{t('step3Title')}</h4>
            <p className="text-[10px] text-emerald-200 font-semibold">{t('step3Sub')}</p>
          </div>

          <div className="text-orange-400 text-2xl font-black transform md:rotate-0 rotate-90 my-1 animate-pulse">↓</div>

          {/* Step 4: Delivery */}
          <div className="w-full md:w-1/5 bg-emerald-900/80 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-700 shadow-xl text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">🚚</span>
            <h4 className="text-sm font-black font-outfit text-amber-400">{t('step5Title')}</h4>
            <p className="text-[10px] text-emerald-200 font-semibold">{t('step5Sub')}</p>
          </div>

          <div className="text-orange-400 text-2xl font-black transform md:rotate-0 rotate-90 my-1 animate-pulse">↓</div>

          {/* Step 5: People Served */}
          <div className="w-full md:w-1/5 bg-orange-600 text-white p-5 rounded-2xl border-2 border-orange-400 shadow-xl text-center space-y-2 card-zoom-3d">
            <span className="text-3xl">❤️</span>
            <h4 className="text-sm font-black font-outfit">{t('step7Title')}</h4>
            <p className="text-[10px] text-orange-100 font-semibold">{t('step7Sub')}</p>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* FINAL CALL TO ACTION */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-reveal">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-orange-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6 border border-emerald-700">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black font-outfit">{t('haveExtraFood')}</h2>
            <p className="text-base text-orange-200 italic font-bold">"{t('tagline')} — Anytime, Anywhere, From Any Device."</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/donor"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-base shadow-xl flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Utensils className="w-5 h-5" />
              <span>{t('donateNow')}</span>
            </Link>

            <Link
              to="/ngo"
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-base border-2 border-white/40 backdrop-blur-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Building2 className="w-5 h-5" />
              <span>{t('partnerNGO')}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

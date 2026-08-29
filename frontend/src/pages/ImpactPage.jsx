import React from 'react';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { 
  Heart, 
  Utensils, 
  Building2, 
  Users, 
  MapPin, 
  Award, 
  Sparkles, 
  Quote,
  Smile,
  ArrowRight
} from 'lucide-react';

const ImpactPage = () => {
  const { t, stats } = useApp();

  const testimonials = [
    {
      name: "Chef Vikram Mehta",
      role: "Head Chef, Green Leaf Dining",
      type: "Donor Partner",
      quote: "Before Annsetu, disposing of evening banquet surplus was painful. Now within 20 minutes, an EV volunteer collects the insulated containers and feeds 50 children at Hope Foundation.",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Rajesh Sharma",
      role: "Director, Hope Foundation India",
      type: "NGO Partner",
      quote: "Annsetu's verification badge and real-time telematics give our shelter staff full confidence in food safety and temperature control. We have served over 10,000 warm meals this year alone.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Ramesh Kumar",
      role: "Voluntary Logistics Partner",
      type: "Delivery Volunteer",
      quote: "Driving an EV van for Annsetu on my way home from work brings immense joy. Seeing the smiles when delivering fresh meals to community kitchens makes every trip worth it.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="impact" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
            {t('quantifiableResults')}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-outfit text-emerald-950">
            {t('ourCollectiveImpactTitle')}
          </h1>
          <p className="text-base text-gray-700 leading-relaxed font-medium">
            {t('impactSubtext')}
          </p>
        </div>

        {/* Impact Multiplier Visual Flow */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center space-y-6">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
            {t('equationTitle')}
          </span>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-xl sm:text-3xl font-black font-outfit pt-2">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md card-zoom-3d">
              {t('eqnStep1')}
            </div>
            <span className="text-amber-400 text-2xl">→</span>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md card-zoom-3d">
              {t('eqnStep2')}
            </div>
            <span className="text-amber-400 text-2xl">→</span>
            <div className="p-4 bg-amber-400 text-gray-950 rounded-2xl shadow-lg card-zoom-3d">
              {t('eqnStep3')}
            </div>
          </div>
        </div>

        {/* Large Visual Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-gray-900">
          
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <Utensils className="w-8 h-8 mx-auto text-amber-600 mb-2" />
            <p className="text-3xl font-black text-emerald-950 font-outfit">10,000+</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">{t('mealsSavedLabel')}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <Heart className="w-8 h-8 mx-auto text-red-500 fill-red-500 mb-2" />
            <p className="text-3xl font-black text-emerald-950 font-outfit">2,500+</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">{t('peopleServed')}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <Building2 className="w-8 h-8 mx-auto text-emerald-700 mb-2" />
            <p className="text-3xl font-black text-emerald-950 font-outfit">45+</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">{t('partnerNGOs')}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <Users className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <p className="text-3xl font-black text-emerald-950 font-outfit">120+</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">{t('activeDonors')}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <MapPin className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <p className="text-3xl font-black text-emerald-950 font-outfit">5 Cities</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">{t('citiesCoveredLabel')}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <Award className="w-8 h-8 mx-auto text-amber-500 mb-2" />
            <p className="text-3xl font-black text-emerald-950 font-outfit">85+</p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-1">{t('volunteersEngagedLabel')}</p>
          </div>

        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black font-outfit text-emerald-950">{t('storiesOfHope')}</h2>
            <p className="text-xs text-gray-500">{t('storiesSubtext')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-900">
            {testimonials.map((tItem, idx) => (
              <div key={idx} className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200/80 shadow-md flex flex-col justify-between space-y-4 card-zoom-3d">
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-amber-500" />
                  <p className="text-xs text-gray-700 italic leading-relaxed">"{tItem.quote}"</p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img src={tItem.avatar} alt={tItem.name} className="w-11 h-11 rounded-full object-cover border border-gray-200" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 font-outfit">{tItem.name}</h4>
                    <p className="text-[10px] text-gray-500">{tItem.role}</p>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {tItem.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImpactPage;

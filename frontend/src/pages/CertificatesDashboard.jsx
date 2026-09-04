import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Download, 
  QrCode, 
  ExternalLink, 
  ShieldCheck, 
  X, 
  Printer, 
  Heart,
  Utensils,
  Building2,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CertificatesDashboard = () => {
  const { t, currentUser, certificates, generateCertificate, getServicesCountForUser } = useApp();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const verifiedServices = getServicesCountForUser(currentUser?.id);
  const impactPoints = verifiedServices * 10;

  // Determine current level
  let currentLevel = 'Bronze';
  let nextLevel = 'Silver';
  let targetServices = 50;
  
  if (verifiedServices >= 100) {
    currentLevel = 'Gold';
    nextLevel = 'Gold Master';
    targetServices = 200;
  } else if (verifiedServices >= 50) {
    currentLevel = 'Silver';
    nextLevel = 'Gold';
    targetServices = 100;
  }

  const servicesNeeded = Math.max(0, targetServices - verifiedServices);
  const progressPercent = Math.min(100, Math.round((verifiedServices / targetServices) * 100));

  const tiers = [
    {
      id: 'Bronze',
      titleKey: 'bronzeLevel',
      minServices: 1,
      color: 'from-amber-700 to-amber-900 border-amber-600',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      desc: '1–49 verified food redistribution services'
    },
    {
      id: 'Silver',
      titleKey: 'silverLevel',
      minServices: 50,
      color: 'from-slate-400 to-slate-600 border-slate-300',
      badgeBg: 'bg-slate-100 text-slate-900 border-slate-300',
      desc: '50–99 verified food redistribution services'
    },
    {
      id: 'Gold',
      titleKey: 'goldLevel',
      minServices: 100,
      color: 'from-yellow-400 to-amber-600 border-yellow-300',
      badgeBg: 'bg-yellow-100 text-yellow-950 border-yellow-400',
      desc: '100+ verified food redistribution services'
    }
  ];

  const handleGenerateClick = (tierId) => {
    const res = generateCertificate(tierId);
    if (res.success) {
      setSelectedCertificate(res.certificate);
      setShowModal(true);
    }
  };

  const handleViewClick = (tierId) => {
    const cert = certificates.find(c => c.userId === currentUser?.id && c.level === tierId && c.status === 'Valid');
    if (cert) {
      setSelectedCertificate(cert);
      setShowModal(true);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {t('certificatesAndAchievements')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit text-emerald-950">
            {t('myCertificates')}
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Official verified social impact certificates issued on the AnnSetu blockchain registry.
          </p>
        </div>

        {/* Top Progress Dashboard Card */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-700 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                {t('quantifiableResults')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-outfit mt-1">
                {currentUser?.name || "Community Partner"}
              </h2>
              <span className="text-xs font-bold uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full inline-block mt-2">
                Role: {currentUser?.role?.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black font-outfit text-amber-400">{verifiedServices}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 mt-0.5">{t('verifiedServices')}</p>
              </div>

              <div className="h-10 w-px bg-white/20"></div>

              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black font-outfit text-amber-400">{impactPoints}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 mt-0.5">{t('impactPoints')}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar to Next Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span>{t('currentLevel')}: <strong className="text-amber-300">{currentLevel}</strong></span>
              <span>{servicesNeeded > 0 ? `${servicesNeeded} more verified services to reach ${nextLevel}` : `Max Level (${currentLevel}) Unlocked!`}</span>
            </div>

            <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-1000 shadow-md"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const isUnlocked = verifiedServices >= tier.minServices;
            const existingCert = certificates.find(c => c.userId === currentUser?.id && c.level === tier.id && c.status === 'Valid');

            return (
              <div 
                key={tier.id}
                className={`bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 shadow-lg flex flex-col justify-between space-y-6 transition-all ${
                  isUnlocked ? 'border-emerald-600/30' : 'border-gray-200 opacity-80'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${tier.badgeBg}`}>
                      {tier.id} TIER
                    </span>
                    {isUnlocked ? (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('unlocked')}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-black text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-300 flex items-center space-x-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t('locked')}</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black font-outfit text-emerald-950">
                      {t(tier.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                      {tier.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  {isUnlocked ? (
                    existingCert ? (
                      <button
                        onClick={() => handleViewClick(tier.id)}
                        className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
                      >
                        <Award className="w-4 h-4 text-orange-400" />
                        <span>{t('viewCertificateBtn')}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleGenerateClick(tier.id)}
                        className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{t('generateCertificateBtn')}</span>
                      </button>
                    )
                  ) : (
                    <div className="text-center py-2 text-xs font-bold text-gray-500">
                      <span>Requires {tier.minServices - verifiedServices} more verified services</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Official Certificate Modal */}
      {showModal && selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border-4 border-orange-400 relative text-gray-900 space-y-6">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Print Wrapper */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-emerald-800 bg-[#faf8f5] space-y-6 text-center relative overflow-hidden shadow-inner">
              
              {/* Top Watermark Logo */}
              <div className="flex items-center justify-between border-b-2 border-emerald-800/30 pb-4">
                <div className="flex items-center space-x-2">
                  <img src="/annsetu_logo.png" alt="AnnSetu" className="h-10 w-auto" />
                  <span className="text-xl font-black text-emerald-950 font-outfit">Ann<span className="text-orange-600">setu</span></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  VERIFIED IMPACT REGISTRY
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-black uppercase tracking-widest text-orange-600">
                  {t('certificateOfImpact')}
                </p>
                <p className="text-xs font-medium text-gray-600 italic">
                  {t('presentedTo')}
                </p>
                <h2 className="text-2xl sm:text-4xl font-black font-outfit text-emerald-950 underline decoration-amber-400 decoration-4">
                  {selectedCertificate.userName}
                </h2>
              </div>

              <p className="text-xs text-gray-700 font-medium max-w-lg mx-auto leading-relaxed">
                For outstanding contribution to AnnSetu's social food redistribution mission, reducing edible food waste and ensuring nutritious meals reach community shelters.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-2xl border border-gray-200 text-center">
                <div>
                  <span className="text-[9px] font-bold uppercase text-gray-400 block">ROLE</span>
                  <span className="text-xs font-black text-emerald-950 uppercase">{selectedCertificate.role}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase text-gray-400 block">TIER</span>
                  <span className="text-xs font-black text-amber-600 uppercase">{selectedCertificate.level}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase text-gray-400 block">SERVICES</span>
                  <span className="text-xs font-black text-emerald-950">{selectedCertificate.verifiedServices}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase text-gray-400 block">POINTS</span>
                  <span className="text-xs font-black text-amber-600">{selectedCertificate.impactPoints}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between border-t-2 border-emerald-800/30 pt-4 text-left gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{t('certificateId')}: <span className="font-mono font-black text-gray-900">{selectedCertificate.id}</span></p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{t('issuedOn')}: <span className="text-gray-900">{selectedCertificate.issuedAt}</span></p>
                </div>

                <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-gray-300 shrink-0">
                  <QrCode className="w-8 h-8 text-emerald-900" />
                  <div className="text-[9px] font-bold text-gray-600 max-w-[120px]">
                    {t('verifyQrText')}
                  </div>
                </div>
              </div>

            </div>

            {/* Action Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center space-x-2 btn-bounce-active"
              >
                <Printer className="w-4 h-4 text-orange-400" />
                <span>{t('downloadPdfBtn')}</span>
              </button>

              <Link
                to={`/certificate/verify/${selectedCertificate.id}`}
                target="_blank"
                className="px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center space-x-2 btn-bounce-active"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('verifyCertificateBtn')}</span>
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CertificatesDashboard;

import React, { useState, useRef } from 'react';
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
  Utensils,
  Building2,
  Heart,
  Truck,
  ArrowLeft,
  Leaf,
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const ROLE_CERT_CONFIGS = {
  donor: {
    roleTitle: 'Donor Appreciation Certificate',
    badgeText: 'DONOR APPRECIATION CERTIFICATE',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-400',
    appreciationMsg: 'In heartfelt appreciation of your generous contribution to AnnSetu. Your support helps reduce food waste and ensures surplus food reaches those in need.',
    roleLabel: 'VERIFIED FOOD DONOR',
    icon: Utensils,
    themeBorder: 'border-emerald-800',
    headerGradient: 'from-emerald-900 via-emerald-800 to-emerald-950'
  },
  ngo: {
    roleTitle: 'NGO Appreciation Certificate',
    badgeText: 'NGO APPRECIATION CERTIFICATE',
    badgeColor: 'bg-teal-100 text-teal-950 border-teal-400',
    appreciationMsg: 'In heartfelt appreciation of your valuable partnership and dedicated efforts in supporting AnnSetu\'s mission to redistribute surplus food and serve communities in need.',
    roleLabel: 'PARTNER ORGANIZATION (NGO)',
    icon: Building2,
    themeBorder: 'border-teal-800',
    headerGradient: 'from-teal-900 via-emerald-800 to-teal-950'
  },
  volunteer: {
    roleTitle: 'Volunteer Appreciation Certificate',
    badgeText: 'VOLUNTEER APPRECIATION CERTIFICATE',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-400',
    appreciationMsg: 'In heartfelt appreciation for your valuable time, dedication and selfless efforts in supporting the AnnSetu community. Your compassion and commitment help us build a kinder, stronger and more sustainable tomorrow.',
    roleLabel: 'COMMUNITY VOLUNTEER',
    icon: Heart,
    themeBorder: 'border-amber-700',
    headerGradient: 'from-amber-900 via-emerald-900 to-amber-950'
  }
};

const CertificatesDashboard = () => {
  const { t, currentUser, certificates, generateCertificate, getServicesCountForUser } = useApp();
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const printRef = useRef(null);

  const userRole = (currentUser?.role || 'donor').toLowerCase();
  const currentRoleConfig = ROLE_CERT_CONFIGS[userRole] || ROLE_CERT_CONFIGS.donor;

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
    } else {
      // If not yet saved in list, create/view on fly
      const res = generateCertificate(tierId);
      if (res.success) {
        setSelectedCertificate(res.certificate);
        setShowModal(true);
      }
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedCertificate) return;

    try {
      const certRole = (selectedCertificate.role || userRole).toLowerCase();
      const config = ROLE_CERT_CONFIGS[certRole] || ROLE_CERT_CONFIGS.donor;

      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Background
      doc.setFillColor(253, 251, 247);
      doc.rect(0, 0, 297, 210, 'F');

      // Decorative Frame Border
      doc.setDrawColor(6, 78, 59);
      doc.setLineWidth(1.5);
      doc.roundedRect(8, 8, 281, 194, 6, 6, 'S');

      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.5);
      doc.roundedRect(11, 11, 275, 188, 4, 4, 'S');

      // Top Brand Header
      doc.setFillColor(6, 78, 59);
      doc.rect(15, 15, 267, 25, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('ANNSETU', 25, 28);

      doc.setTextColor(245, 158, 11);
      doc.setFontSize(9);
      doc.text('Bridging Surplus to Smiles', 25, 34);

      // Top Right Role Badge
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(180, 20, 95, 15, 3, 3, 'F');
      doc.setTextColor(6, 78, 59);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(config.badgeText, 227.5, 29.5, { align: 'center' });

      // Title Section
      doc.setTextColor(6, 78, 59);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Certificate of Appreciation', 148.5, 58, { align: 'center' });

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('This certificate is proudly presented to', 148.5, 68, { align: 'center' });

      // Recipient Name
      doc.setTextColor(6, 44, 33);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(selectedCertificate.userName, 148.5, 84, { align: 'center' });

      // Clean underline
      doc.setDrawColor(6, 78, 59);
      doc.setLineWidth(0.8);
      doc.line(74, 88, 223, 88);

      // Message Body
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const splitMsg = doc.splitTextToSize(config.appreciationMsg, 220);
      doc.text(splitMsg, 148.5, 102, { align: 'center' });

      // Cursive Flourish
      doc.setTextColor(217, 119, 6);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('"Together, we create a bigger impact!"', 148.5, 124, { align: 'center' });

      // 3 Impact Pillars
      doc.setFillColor(240, 253, 244);
      doc.roundedRect(25, 134, 75, 20, 4, 4, 'F');
      doc.setTextColor(6, 78, 59);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('Surplus Food Saved', 62.5, 142, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`${selectedCertificate.verifiedServices * 10}+ Meals`, 62.5, 148, { align: 'center' });

      doc.setFillColor(254, 243, 199);
      doc.roundedRect(111, 134, 75, 20, 4, 4, 'F');
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('People Nourished', 148.5, 142, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`${selectedCertificate.verifiedServices * 8}+ Lives Touched`, 148.5, 148, { align: 'center' });

      doc.setFillColor(236, 253, 245);
      doc.roundedRect(197, 134, 75, 20, 4, 4, 'F');
      doc.setTextColor(4, 120, 87);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('CO2 Waste Prevented', 234.5, 142, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`${selectedCertificate.verifiedServices * 4} kg CO2 Reduced`, 234.5, 148, { align: 'center' });

      // Footer
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.4);
      doc.line(20, 168, 277, 168);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text(`CERTIFICATE ID: ${selectedCertificate.id}`, 25, 178);
      doc.text(`ISSUED ON: ${selectedCertificate.issuedAt}`, 25, 184);

      doc.setFillColor(6, 78, 59);
      doc.roundedRect(115, 172, 67, 14, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('DIGITALLY VERIFIED BY ANNSETU', 148.5, 180, { align: 'center' });

      doc.setTextColor(6, 78, 59);
      doc.setFontSize(8);
      doc.text('Scan / Visit to Verify:', 245, 178, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.text(`annsetu.org/verify/${selectedCertificate.id}`, 245, 184, { align: 'center' });

      doc.save(`AnnSetu_${config.roleTitle.replace(/\s+/g, '_')}_${selectedCertificate.id}.pdf`);
    } catch (err) {
      console.error(err);
      window.print();
    }
  };

  const getRoleConfig = (cert) => {
    if (!cert) return currentRoleConfig;
    const roleKey = (cert.role || userRole).toLowerCase();
    return ROLE_CERT_CONFIGS[roleKey] || currentRoleConfig;
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Back to Dashboard Navigation Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              const role = currentUser?.role;
              const target = role === 'admin' ? '/admin' : role === 'ngo' ? '/ngo' : role === 'volunteer' ? '/delivery' : '/donor';
              navigate(target);
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/95 hover:bg-orange-100 text-emerald-950 font-black text-xs border border-gray-200 shadow-md transition-all btn-bounce-active"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>← Back to {currentUser?.role ? `${currentUser.role.toUpperCase()} Dashboard` : 'Dashboard'}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3.5 py-1 rounded-full border border-orange-200">
            {t('certificatesAndAchievements')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit text-emerald-950">
            {currentRoleConfig.roleTitle}
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Official verified digital appreciation certificates issued on the AnnSetu blockchain registry.
          </p>
        </div>

        {/* Top Progress Dashboard Card */}
        <div className={`bg-gradient-to-r ${currentRoleConfig.headerGradient} text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 border border-emerald-700/40`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                {t('quantifiableResults')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-outfit mt-1">
                {currentUser?.name || "Community Partner"}
              </h2>
              <span className="text-xs font-bold uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full inline-block mt-2">
                ROLE: {userRole.toUpperCase()}
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

      {/* Official Role-Based Certificate Modal */}
      {showModal && selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl border-4 border-orange-400 relative text-gray-900 space-y-6">
            
            {/* Close Button (Explicit 44x44px minimum touch target, safe-area offset for mobile APK) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-2xl bg-red-100 hover:bg-red-200 text-red-950 font-black text-xs flex items-center space-x-1.5 transition-all z-30 shadow-md border border-red-300 btn-bounce-active active:scale-95 cursor-pointer"
              aria-label="Close Certificate Preview"
            >
              <X className="w-4 h-4 text-red-700" />
              <span className="font-black">✕ Close</span>
            </button>

            {/* Certificate Print Wrapper (Exact Reference Artwork Match) */}
            <div 
              ref={printRef}
              className="p-6 sm:p-10 rounded-3xl border-4 border-emerald-800/40 bg-[#fdfbf7] space-y-6 relative overflow-hidden shadow-2xl text-center"
            >
              
              {/* Subtle Background Leaf Accent Watermark */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
                <Leaf className="w-96 h-96 text-emerald-900" />
              </div>

              {/* Top Header: Logo + Brand + Role Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-emerald-800/20 pb-5 gap-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <img src="/annsetu_logo.png" alt="AnnSetu Logo" className="h-12 w-auto object-contain" />
                  <div className="text-left">
                    <span className="text-2xl font-black text-emerald-950 font-outfit tracking-tight block">
                      Ann<span className="text-orange-600">setu</span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 italic block -mt-1">
                      “Bridging Surplus to Smiles”
                    </span>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-2xl border-2 font-black text-xs sm:text-sm tracking-wider shadow-sm uppercase ${getRoleConfig(selectedCertificate).badgeColor}`}>
                  {getRoleConfig(selectedCertificate).badgeText}
                </div>
              </div>

              {/* Center Certificate Heading */}
              <div className="space-y-3 pt-3 relative z-10">
                <div className="flex items-center justify-center space-x-2 text-emerald-700">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
                    ANNSETU OFFICIAL RECOGNITION
                  </span>
                  <Leaf className="w-5 h-5 text-emerald-600 scale-x-[-1]" />
                </div>

                <h1 className="text-3xl sm:text-5xl font-black font-outfit text-emerald-950 tracking-tight">
                  Certificate of Appreciation
                </h1>

                <p className="text-xs sm:text-sm font-semibold text-gray-500 italic">
                  This certificate is proudly presented to
                </p>

                {/* Recipient Name with Clean Horizontal Line (NO Heart Icons) */}
                <div className="py-2 max-w-lg mx-auto">
                  <h2 className="text-2xl sm:text-4xl font-black font-outfit text-emerald-950 tracking-tight">
                    {selectedCertificate.userName}
                  </h2>
                  <div className="h-0.5 w-full bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-800 mt-2.5 rounded-full"></div>
                </div>
              </div>

              {/* Role-Based Appreciation Message */}
              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed px-2">
                  {getRoleConfig(selectedCertificate).appreciationMsg}
                </p>

                <p className="text-sm font-black italic text-orange-600 flex items-center justify-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>“Together, we create a bigger impact!”</span>
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                </p>
              </div>

              {/* 3 Impact Pillars Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 relative z-10 max-w-2xl mx-auto">
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 text-center shadow-sm">
                  <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">🍲 Surplus Food Saved</span>
                  <span className="text-sm font-black text-emerald-950">{selectedCertificate.verifiedServices * 10}+ Meals</span>
                </div>

                <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3 text-center shadow-sm">
                  <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider block">👥 People Nourished</span>
                  <span className="text-sm font-black text-amber-950">{selectedCertificate.verifiedServices * 8}+ Lives Touched</span>
                </div>

                <div className="bg-teal-50/90 border border-teal-200 rounded-2xl p-3 text-center shadow-sm">
                  <span className="text-[10px] font-black uppercase text-teal-800 tracking-wider block">🌱 CO₂ Waste Prevented</span>
                  <span className="text-sm font-black text-teal-950">{selectedCertificate.verifiedServices * 4} kg CO₂</span>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t-2 border-emerald-800/20 pt-5 text-left gap-4 relative z-10">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-500 uppercase">
                    CERTIFICATE ID: <span className="font-mono font-black text-emerald-950">{selectedCertificate.id}</span>
                  </p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">
                    ISSUED ON: <span className="text-gray-900 font-bold">{selectedCertificate.issuedAt}</span>
                  </p>
                  <p className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md inline-block border border-emerald-300">
                    LEVEL: {selectedCertificate.level} TIER
                  </p>
                </div>

                <div className="flex items-center space-x-2 bg-emerald-900 text-white px-4 py-2 rounded-2xl shadow-md">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="text-[11px] font-black tracking-wide">DIGITALLY VERIFIED BY ANNSETU</span>
                </div>

                <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-gray-300 shadow-sm shrink-0">
                  <QrCode className="w-8 h-8 text-emerald-900" />
                  <div className="text-[9px] font-bold text-gray-600 max-w-[110px] leading-tight">
                    Scan or visit URL to verify authenticity
                  </div>
                </div>
              </div>

            </div>

            {/* Action Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-lg flex items-center space-x-2 btn-bounce-active"
              >
                <Download className="w-4 h-4 text-orange-400" />
                <span>Download Certificate (PDF)</span>
              </button>

              <Link
                to={`/certificate/verify/${selectedCertificate.id}`}
                target="_blank"
                className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-lg flex items-center space-x-2 btn-bounce-active"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Certificate</span>
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CertificatesDashboard;

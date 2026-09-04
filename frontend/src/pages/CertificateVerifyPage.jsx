import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Home, 
  QrCode,
  Calendar,
  UserCheck
} from 'lucide-react';

const CertificateVerifyPage = () => {
  const { code } = useParams();
  const { t, certificates } = useApp();

  const cert = certificates.find(c => c.id === code || c.verificationCode === code);
  const isValid = cert && cert.status === 'Valid';
  const isRevoked = cert && cert.status === 'Revoked';

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden flex items-center justify-center">
      <AnnsetuMotionBackground type="home" />

      <div className="max-w-xl w-full mx-auto px-4 relative z-10 space-y-6">

        {/* Top Return Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 text-emerald-950 text-xs font-extrabold border border-gray-200 shadow-sm hover:bg-orange-100 transition-all"
          >
            <Home className="w-4 h-4 text-orange-600" />
            <span>← {t('home')}</span>
          </Link>

          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            PUBLIC REGISTRY VERIFICATION
          </span>
        </div>

        {/* Verification Results Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-orange-200 text-center space-y-6">
          
          <div className="relative inline-block bg-white p-2 rounded-2xl shadow-md border border-gray-200">
            <img src="/annsetu_logo.png" alt="AnnSetu" className="h-12 w-auto mx-auto" />
          </div>

          {isValid ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-block bg-emerald-100 text-emerald-900 font-black text-xs px-4 py-1.5 rounded-full border border-emerald-300 tracking-wide uppercase">
                {t('certificateValidStatus')}
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-xs text-gray-500 font-medium">{t('presentedTo')}</p>
                <h1 className="text-2xl sm:text-3xl font-black font-outfit text-emerald-950">
                  {cert.userName}
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left text-xs font-bold text-gray-800">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">ROLE</span>
                  <span className="text-emerald-950 uppercase">{cert.role}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">ACHIEVEMENT TIER</span>
                  <span className="text-amber-600 uppercase">{cert.level}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">VERIFIED SERVICES</span>
                  <span className="text-emerald-950">{cert.verifiedServices}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">ISSUE DATE</span>
                  <span className="text-gray-900">{cert.issuedAt}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] font-bold text-amber-900">
                <span>Certificate ID: </span>
                <span className="font-mono font-black">{cert.id}</span>
              </div>
            </div>
          ) : isRevoked ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-inner">
                <XCircle className="w-10 h-10" />
              </div>

              <div className="inline-block bg-red-100 text-red-900 font-black text-xs px-4 py-1.5 rounded-full border border-red-300 tracking-wide uppercase">
                {t('certificateRevokedStatus')}
              </div>

              <p className="text-xs text-gray-600 font-medium">
                This certificate has been revoked by AnnSetu administration.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                <QrCode className="w-9 h-9" />
              </div>

              <h2 className="text-lg font-black font-outfit text-emerald-950">
                {t('certificateNotFoundMsg')}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Verification Code: <span className="font-mono font-bold text-gray-900">{code}</span>
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <Link
              to="/"
              className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Home className="w-4 h-4 text-orange-400" />
              <span>{t('returnHomeBtn')}</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CertificateVerifyPage;

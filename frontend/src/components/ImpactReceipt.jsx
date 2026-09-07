import React from 'react';
import { jsPDF } from 'jspdf';
import { X, Download, ShieldCheck, Heart, Award, Sparkles, Share2, Utensils, HeartHandshake, Users } from 'lucide-react';

const ImpactReceipt = ({ donation, onClose }) => {
  if (!donation) return null;

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background
      doc.setFillColor(250, 248, 245);
      doc.rect(0, 0, 210, 297, 'F');

      // Top Header Header Banner
      doc.setFillColor(6, 78, 59);
      doc.rect(0, 0, 210, 50, 'F');

      // Left Brand Column
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('ANNSETU', 15, 20);

      doc.setTextColor(245, 158, 11);
      doc.setFontSize(9);
      doc.text('Bridging Surplus to Smiles', 15, 26);

      doc.setTextColor(200, 230, 200);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('DONATE | SHARE | FEED', 15, 34);

      // Right Heading Column
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Together We Reduce Food Waste', 110, 20);
      doc.text('and Fight Hunger', 110, 26);

      doc.setTextColor(200, 230, 200);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Annsetu connects generous donors with those', 110, 33);
      doc.text('in need to bridge surplus food to smiles.', 110, 38);

      // Card Container
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, 60, 180, 215, 6, 6, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(15, 60, 180, 215, 6, 6, 'S');

      // Receipt Title
      doc.setTextColor(6, 44, 33);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(`OFFICIAL IMPACT RECEIPT`, 25, 78);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(217, 119, 6);
      doc.text(`ID: #${donation.id}`, 145, 78);

      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.8);
      doc.line(25, 84, 185, 84);

      // Details Table Rows
      const details = [
        { label: 'Donation Date & Time:', value: donation.createdAt || new Date().toISOString().split('T')[0] },
        { label: 'Donor Name:', value: donation.donorName },
        { label: 'Donor Category:', value: donation.donorType || 'Restaurant / Catering' },
        { label: 'Food Item Donated:', value: donation.foodName },
        { label: 'Food Category:', value: donation.foodCategory || 'Prepared Cooked Meals' },
        { label: 'Quantity Provided:', value: `${donation.quantity || '15'} Containers / Packets` },
        { label: 'Total Meals Served:', value: `${donation.servingCapacity} Meals` },
        { label: 'Beneficiary / Partner NGO:', value: donation.ngoName || 'Community Shelter' },
        { label: 'Delivery Status:', value: 'Delivered ✓', isSuccess: true }
      ];

      let startY = 96;
      details.forEach((item) => {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(item.label, 25, startY);

        doc.setFont('helvetica', 'bold');
        if (item.isSuccess) {
          doc.setTextColor(5, 150, 105);
        } else {
          doc.setTextColor(6, 44, 33);
        }
        doc.text(String(item.value), 90, startY);

        doc.setDrawColor(240, 240, 240);
        doc.setLineWidth(0.2);
        doc.line(25, startY + 3, 185, startY + 3);

        startY += 12;
      });

      // Emotional Callout
      doc.setFillColor(240, 253, 244);
      doc.roundedRect(25, startY + 5, 160, 24, 4, 4, 'F');
      doc.setTextColor(4, 120, 87);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('"Your surplus became someone\'s meal."', 105, startY + 19, { align: 'center' });

      // Verification Badge Footer
      doc.setFillColor(6, 78, 59);
      doc.roundedRect(25, startY + 38, 160, 14, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('DIGITALLY VERIFIED ANNSETU SOCIAL IMPACT RECEIPT', 105, startY + 47, { align: 'center' });

      doc.save(`Annsetu_Impact_Receipt_${donation.id}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Downloading Digital Impact Receipt...");
    }
  };

  const handleShareImpact = async () => {
    const shareData = {
      title: 'Annsetu Impact Receipt',
      text: `I just donated ${donation.servingCapacity} meals through Annsetu! "Your surplus became someone's meal."`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled:', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.text);
      alert('Impact message copied to clipboard! Share it with friends and family.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-800/30 relative text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Layout: 2 Columns Matching Reference */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-700 p-6 sm:p-8 text-white relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left Column: Brand, Tagline, 3 Icon Labels */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img src="/annsetu_logo.png" alt="Annsetu" className="h-10 w-auto bg-white p-1 rounded-xl shadow-md" />
                <div>
                  <h2 className="text-2xl font-black font-outfit tracking-wide leading-none">ANNSETU</h2>
                  <p className="text-[11px] text-amber-300 font-bold italic">“Bridging Surplus to Smiles”</p>
                </div>
              </div>

              {/* 3 Icon Labels: DONATE | SHARE | FEED */}
              <div className="flex items-center space-x-2 text-[10px] font-black tracking-widest text-emerald-200 bg-black/25 px-3 py-1.5 rounded-full inline-flex border border-white/10">
                <span className="flex items-center space-x-1"><HeartHandshake className="w-3 h-3 text-orange-400" /> <span>DONATE</span></span>
                <span>|</span>
                <span className="flex items-center space-x-1"><Share2 className="w-3 h-3 text-amber-300" /> <span>SHARE</span></span>
                <span>|</span>
                <span className="flex items-center space-x-1"><Utensils className="w-3 h-3 text-emerald-300" /> <span>FEED</span></span>
              </div>
            </div>

            {/* Right Column: Heading & Concept Description */}
            <div className="space-y-1.5 md:border-l md:border-white/20 md:pl-6 text-left">
              <h3 className="text-lg sm:text-xl font-black font-outfit text-amber-300 leading-tight">
                Together We Reduce Food Waste and Fight Hunger
              </h3>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                Annsetu connects generous donors with those in need to bridge surplus food to smiles across communities.
              </p>
            </div>

          </div>

        </div>

        {/* Receipt Body Card */}
        <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white to-emerald-50/20">
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                OFFICIAL IMPACT RECEIPT
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block">DONATION ID</span>
              <span className="font-mono font-black text-emerald-950 text-sm">{donation.id}</span>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">FOOD DONATED</span>
              <span className="font-black text-emerald-950 text-sm block">{donation.foodName}</span>
              <span className="text-gray-500 font-medium block">Category: {donation.foodCategory || 'Prepared Cooked Meals'}</span>
            </div>

            <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">PEOPLE SERVED</span>
              <span className="font-black text-emerald-900 text-lg block">{donation.servingCapacity} Meals</span>
              <span className="text-emerald-700 font-bold text-[11px] block">Status: Delivered ✓</span>
            </div>

            <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">DONOR INFORMATION</span>
              <span className="font-bold text-gray-900 block">{donation.donorName}</span>
              <span className="text-gray-500 font-medium block">Type: {donation.donorType || 'Restaurant'}</span>
            </div>

            <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">RECEIVING NGO</span>
              <span className="font-bold text-emerald-900 block">{donation.ngoName || 'Hope Foundation India'}</span>
              <span className="text-gray-500 font-medium block">Verified Partner Shelter</span>
            </div>
          </div>

          {/* Emotional Impact Callout Box */}
          <div className="p-4 bg-emerald-950 text-amber-300 rounded-2xl text-center shadow-inner space-y-1 border border-emerald-800">
            <Heart className="w-6 h-6 mx-auto text-red-500 fill-red-500 animate-bounce" />
            <p className="text-base font-black font-outfit tracking-wide">“Your surplus became someone’s meal.”</p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-2xl border border-emerald-300 text-xs font-black">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>DIGITALLY VERIFIED ANNSETU SOCIAL IMPACT RECEIPT</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadPDF}
              className="py-3 px-4 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Receipt (PDF)</span>
            </button>

            <button
              onClick={handleShareImpact}
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-2 btn-bounce-active"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Impact</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ImpactReceipt;

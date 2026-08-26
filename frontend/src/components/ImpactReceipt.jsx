import React from 'react';
import { jsPDF } from 'jspdf';
import { X, Download, ShieldCheck, Heart, Award, Sparkles, Share2 } from 'lucide-react';

const ImpactReceipt = ({ donation, onClose }) => {
  if (!donation) return null;

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      doc.setFillColor(250, 248, 245);
      doc.rect(0, 0, 210, 297, 'F');

      doc.setFillColor(6, 78, 59);
      doc.rect(0, 0, 210, 45, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('ANNSETU', 105, 20, { align: 'center' });

      doc.setTextColor(245, 158, 11);
      doc.setFontSize(12);
      doc.text('Bridging Surplus to Smiles', 105, 29, { align: 'center' });

      doc.setTextColor(200, 230, 200);
      doc.setFontSize(10);
      doc.text('OFFICIAL DIGITAL IMPACT RECEIPT', 105, 36, { align: 'center' });

      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 55, 170, 200, 4, 4, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(20, 55, 170, 200, 4, 4, 'S');

      doc.setTextColor(6, 44, 33);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Impact Receipt #${donation.id}`, 30, 75);

      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.8);
      doc.line(30, 80, 180, 80);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Food Donated:`, 30, 95);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.servingCapacity} Meals (${donation.foodName})`, 90, 95);

      doc.setFont('helvetica', 'normal');
      doc.text(`People Served:`, 30, 107);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.servingCapacity}`, 90, 107);

      doc.setFont('helvetica', 'normal');
      doc.text(`Status:`, 30, 119);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(`Delivered ✓`, 90, 119);

      doc.setTextColor(6, 44, 33);
      doc.setFont('helvetica', 'normal');
      doc.text(`Donor:`, 30, 131);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.donorName}`, 90, 131);

      doc.setFont('helvetica', 'normal');
      doc.text(`NGO:`, 30, 143);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.ngoName}`, 90, 143);

      doc.setFillColor(240, 253, 244);
      doc.roundedRect(30, 165, 150, 25, 3, 3, 'F');
      doc.setTextColor(4, 120, 87);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('"Your surplus became someone\'s meal."', 105, 180, { align: 'center' });

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/20 relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-600 p-6 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-2 backdrop-blur-md">
            <Award className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black font-outfit tracking-wide">ANNSETU</h2>
          <p className="text-xs text-amber-200 font-bold">“Bridging Surplus to Smiles”</p>
          <p className="text-[11px] tracking-widest uppercase text-emerald-200 mt-2 font-black bg-black/20 inline-block px-3.5 py-1 rounded-full">
            Impact Receipt
          </p>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-5 bg-gradient-to-b from-white to-emerald-50/30">
          
          <div className="space-y-2 border-b border-gray-100 pb-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500">Donation ID:</span>
              <span className="font-black text-emerald-950 font-mono text-sm">{donation.id}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500">Food Donated:</span>
              <span className="font-black text-green-900">{donation.servingCapacity} Meals</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500">People Served:</span>
              <span className="font-black text-orange-600">{donation.servingCapacity}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500">Status:</span>
              <span className="font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Delivered ✓
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500">Donor:</span>
              <span className="font-bold text-gray-900">{donation.donorName}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500">NGO:</span>
              <span className="font-bold text-emerald-900">{donation.ngoName}</span>
            </div>
          </div>

          {/* Emotional Message */}
          <div className="p-4 bg-emerald-950 text-amber-300 rounded-2xl text-center shadow-inner space-y-1">
            <Heart className="w-6 h-6 mx-auto text-red-500 fill-red-500 animate-bounce" />
            <p className="text-sm font-black font-outfit">“Your surplus became someone’s meal.”</p>
          </div>

          {/* Buttons SPECIFICATION */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadPDF}
              className="py-3 px-4 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-white font-black text-xs shadow-md flex items-center justify-center space-x-1.5 btn-bounce-active"
            >
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>

            <button
              onClick={handleShareImpact}
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs shadow-md flex items-center justify-center space-x-1.5 btn-bounce-active"
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

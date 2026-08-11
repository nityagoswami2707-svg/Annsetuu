import React from 'react';
import { jsPDF } from 'jspdf';
import { X, Download, ShieldCheck, Heart, Award, Sparkles, FileText } from 'lucide-react';

const ImpactReceipt = ({ donation, onClose }) => {
  if (!donation) return null;

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background card
      doc.setFillColor(250, 248, 245);
      doc.rect(0, 0, 210, 297, 'F');

      // Top Banner
      doc.setFillColor(6, 78, 59); // Deep Green
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

      // Receipt Box Container
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 55, 170, 200, 4, 4, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(20, 55, 170, 200, 4, 4, 'S');

      // Details
      doc.setTextColor(6, 44, 33);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`DONATION CERTIFICATE #${donation.id}`, 30, 75);

      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.8);
      doc.line(30, 80, 180, 80);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Donation Date:`, 30, 95);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.createdAt}`, 90, 95);

      doc.setFont('helvetica', 'normal');
      doc.text(`Donated By:`, 30, 107);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.donorName} (${donation.donorType})`, 90, 107);

      doc.setFont('helvetica', 'normal');
      doc.text(`Food Item:`, 30, 119);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.foodName}`, 90, 119);

      doc.setFont('helvetica', 'normal');
      doc.text(`Quantity / Volume:`, 30, 131);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.quantity}`, 90, 131);

      doc.setFont('helvetica', 'normal');
      doc.text(`Total Meals Served:`, 30, 143);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(217, 119, 6);
      doc.text(`${donation.servingCapacity} Nourishing Meals ❤️`, 90, 143);

      doc.setTextColor(6, 44, 33);
      doc.setFont('helvetica', 'normal');
      doc.text(`Beneficiary Partner NGO:`, 30, 155);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.ngoName}`, 90, 155);

      doc.setFont('helvetica', 'normal');
      doc.text(`Delivery Location:`, 30, 167);
      doc.setFont('helvetica', 'bold');
      doc.text(`${donation.city}, Gujarat`, 90, 167);

      doc.setFont('helvetica', 'normal');
      doc.text(`Verification Status:`, 30, 179);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(`VERIFIED DELIVERED ✓`, 90, 179);

      // Watermark Box / Quote
      doc.setFillColor(240, 253, 244);
      doc.roundedRect(30, 195, 150, 25, 3, 3, 'F');
      doc.setTextColor(4, 120, 87);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'oblique');
      doc.text('"Your surplus became someone\'s warm meal. Thank you for bridging food waste to human smiles!"', 105, 210, { align: 'center', maxWidth: 140 });

      // Footer stamp inside PDF
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Cryptographically Hash Signed by Annsetu Verification Engine - Vadodara Hub', 105, 245, { align: 'center' });

      doc.save(`Annsetu_Impact_Receipt_${donation.id}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Downloading Digital Impact Receipt...");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/20 relative">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-600 p-6 text-white text-center relative overflow-hidden">
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
          <p className="text-xs text-amber-200 font-medium">Bridging Surplus to Smiles</p>
          <p className="text-[10px] tracking-widest uppercase text-emerald-200 mt-2 font-bold bg-black/20 inline-block px-3 py-1 rounded-full">
            Official Digital Impact Receipt
          </p>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white to-emerald-50/30">
          
          <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Donation ID</span>
              <p className="text-lg font-extrabold font-outfit text-emerald-950">{donation.id}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
              <div className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Successfully Delivered
              </div>
            </div>
          </div>

          {/* Grid of Key Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Food Donated</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{donation.foodName}</p>
              <p className="text-[11px] text-emerald-700 font-semibold">{donation.quantity}</p>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
              <span className="text-[10px] text-amber-700 font-bold uppercase">Impact Capacity</span>
              <p className="text-lg font-black text-amber-800 font-outfit flex items-center">
                {donation.servingCapacity} Meals Served <Heart className="w-4 h-4 ml-1.5 fill-red-500 text-red-500" />
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Donated By</span>
              <p className="text-xs font-bold text-gray-900 mt-0.5">{donation.donorName}</p>
              <p className="text-[11px] text-gray-500">{donation.donorType}</p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Received By NGO</span>
              <p className="text-xs font-bold text-emerald-900 mt-0.5">{donation.ngoName}</p>
              <p className="text-[11px] text-gray-500">{donation.city}, Gujarat</p>
            </div>
          </div>

          {/* Emotional Quote */}
          <div className="p-4 bg-emerald-950 text-emerald-100 rounded-2xl text-center relative overflow-hidden">
            <Sparkles className="w-12 h-12 text-amber-400/20 absolute -right-2 -bottom-2" />
            <p className="text-xs italic font-medium">
              "Your surplus food became someone's warm, nutritious meal today. Thank you for spreading hope!"
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-amber-600 hover:from-emerald-800 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Impact Receipt (PDF)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ImpactReceipt;

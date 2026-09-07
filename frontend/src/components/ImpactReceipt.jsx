import React from 'react';
import { jsPDF } from 'jspdf';
import { X, Download, Printer, Heart, Leaf, Utensils, Users, User, Mail, Globe, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ImpactReceipt = ({ donation, onClose }) => {
  const { currentUser } = useApp();

  if (!donation) return null;

  // Donor Details (use currentUser if available or donation fields)
  const donorName = currentUser?.name || donation.donorName || "Hiral Panchal";
  const donorEmail = currentUser?.email || donation.email || "hiral@example.com";
  const donorPhone = currentUser?.phone || donation.phone || "+91 98765 43210";
  const receiptNo = donation.id || "AS-2025-0048";
  const donationDate = donation.createdAt ? donation.createdAt.split(' ')[0] : "04 Sep 2025";

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background: #FAF9F5
      doc.setFillColor(250, 249, 245);
      doc.rect(0, 0, 210, 297, 'F');

      // Top Header Left (Logo + Brand + Tagline)
      doc.setTextColor(15, 56, 44);
      doc.setFontSize(22);
      doc.setFont('times', 'bold');
      doc.text('Annsetu', 20, 25);

      doc.setTextColor(229, 91, 19);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text('— Bridging Surplus to Smiles —', 20, 31);

      doc.setTextColor(15, 56, 44);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('DONATE   |   SHARE   |   FEED', 20, 39);

      // Vertical Line Divider
      doc.setDrawColor(200, 210, 200);
      doc.setLineWidth(0.5);
      doc.line(105, 18, 105, 42);

      // Top Header Right
      doc.setTextColor(15, 56, 44);
      doc.setFontSize(11);
      doc.setFont('times', 'bold');
      doc.text('Together We Reduce Food Waste', 112, 24);
      doc.text('and Fight Hunger', 112, 29);

      doc.setTextColor(80, 80, 80);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Annsetu connects generous donors with those', 112, 35);
      doc.text('in need, turning surplus food into smiles.', 112, 39);

      // Title Banner
      doc.setFillColor(231, 240, 230);
      doc.roundedRect(15, 48, 180, 14, 3, 3, 'F');
      doc.setTextColor(15, 56, 44);
      doc.setFontSize(16);
      doc.setFont('times', 'bold');
      doc.text('Donation Receipt', 105, 57, { align: 'center' });

      // Thank You Subtitle Line
      doc.setDrawColor(200, 210, 200);
      doc.line(15, 68, 195, 68);
      doc.setFillColor(250, 249, 245);
      doc.rect(70, 65, 70, 6, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text('THANK YOU FOR YOUR KINDNESS', 105, 69, { align: 'center' });

      // Top Metadata Row
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Receipt No.', 20, 78);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text(receiptNo, 20, 84);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Date of Donation', 90, 78);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text(donationDate, 90, 84);

      doc.setFont('times', 'italic');
      doc.setTextColor(6, 78, 59);
      doc.text('A small act makes a big difference!', 150, 82);

      // Donor Details Card
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, 92, 180, 42, 3, 3, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(15, 92, 180, 42, 3, 3, 'S');

      doc.setFillColor(231, 240, 230);
      doc.roundedRect(15, 92, 180, 10, 3, 3, 'F');
      doc.setFontSize(10);
      doc.setFont('times', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text('Donor Details', 22, 98.5);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text('Name', 22, 109);
      doc.text('Email', 22, 117);
      doc.text('Phone', 22, 125);

      doc.setTextColor(15, 56, 44);
      doc.text(`:  ${donorName}`, 55, 109);
      doc.text(`:  ${donorEmail}`, 55, 117);
      doc.text(`:  ${donorPhone}`, 55, 125);

      // Donation Details Card
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, 140, 180, 42, 3, 3, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(15, 140, 180, 42, 3, 3, 'S');

      doc.setFillColor(231, 240, 230);
      doc.roundedRect(15, 140, 180, 10, 3, 3, 'F');
      doc.setFontSize(10);
      doc.setFont('times', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text('Donation Details', 22, 146.5);

      doc.setFillColor(236, 243, 235);
      doc.roundedRect(20, 153, 170, 8, 2, 2, 'F');
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text('Item Name', 30, 158.5);
      doc.text('Quantity', 105, 158.5, { align: 'center' });
      doc.text('Category', 170, 158.5, { align: 'right' });

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      doc.text(donation.foodName || 'Cooked Food', 30, 172);
      doc.text(donation.quantity || `${donation.servingCapacity || 10} Meal Boxes`, 105, 172, { align: 'center' });
      doc.text(donation.foodCategory || 'Meals', 170, 172, { align: 'right' });

      // Thank You & Message
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const msg = 'Your generous contribution helps us provide nutritious meals to those in need. Together, we are building a kinder, healthier and stronger community.';
      doc.text(doc.splitTextToSize(msg, 180), 15, 194);

      doc.setFontSize(18);
      doc.setFont('times', 'italic');
      doc.setTextColor(15, 56, 44);
      doc.text('Thank You ♡', 15, 212);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text('With Gratitude,', 15, 220);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 56, 44);
      doc.text('Team Annsetu', 15, 225);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text('Bridging Surplus to Smiles', 15, 230);

      // Contact Footer
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 275, 195, 275);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('contact@ansetu.org   |   www.annsetu.org   |   India', 105, 282, { align: 'center' });

      doc.save(`Annsetu_Donation_Receipt_${receiptNo}.pdf`);
    } catch (err) {
      console.error(err);
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#FAF9F5] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative text-[#0F382C] my-6">
        
        {/* Close Button (Explicit 44x44px minimum touch target, safe-area offset for mobile APK) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-2xl bg-red-100 hover:bg-red-200 text-red-950 font-black text-xs flex items-center space-x-1.5 transition-all z-30 shadow-md border border-red-300 btn-bounce-active active:scale-95 cursor-pointer"
          aria-label="Close Receipt Preview"
        >
          <X className="w-4 h-4 text-red-700" />
          <span className="font-black">✕ Close</span>
        </button>

        {/* PRINTABLE RECEIPT TEMPLATE (EXACT REFERENCE MATCH) */}
        <div className="p-6 sm:p-10 space-y-6 relative">
          
          {/* TOP HEADER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* LEFT: LOGO + TAGLINE + 3 CIRCULAR ICONS */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img src="/annsetu_logo.png" alt="Annsetu Logo" className="h-12 w-auto object-contain" />
                <div>
                  <span className="text-2xl sm:text-3xl font-black font-serif text-[#0F382C] tracking-tight block">
                    Ann<span className="text-[#E55B13]">setu</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#E55B13] italic block -mt-1">
                    — Bridging Surplus to Smiles —
                  </span>
                </div>
              </div>

              {/* 3 CIRCULAR ICONS: DONATE | SHARE | FEED */}
              <div className="flex items-center space-x-2 text-[10px] font-bold text-[#0F382C]">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 rounded-full border border-[#0F382C] flex items-center justify-center">
                    <Utensils className="w-3 h-3 text-[#0F382C]" />
                  </div>
                  <span className="tracking-wider">DONATE</span>
                </div>
                <span>|</span>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 rounded-full border border-[#E55B13] flex items-center justify-center">
                    <Heart className="w-3 h-3 text-[#E55B13] fill-[#E55B13]" />
                  </div>
                  <span className="tracking-wider text-[#E55B13]">SHARE</span>
                </div>
                <span>|</span>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 rounded-full border border-[#0F382C] flex items-center justify-center">
                    <Users className="w-3 h-3 text-[#0F382C]" />
                  </div>
                  <span className="tracking-wider">FEED</span>
                </div>
              </div>
            </div>

            {/* RIGHT: HEADING + SUBTITLE + LEAF FLOURISH */}
            <div className="border-l-0 md:border-l-2 border-[#0F382C]/30 md:pl-6 space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#0F382C] leading-snug">
                Together We Reduce Food Waste and Fight Hunger
              </h3>
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                Annsetu connects generous donors with those in need, turning surplus food into smiles.
              </p>

              {/* Leaf flourish with heart */}
              <div className="flex items-center justify-center space-x-2 pt-1 text-[#0F382C]">
                <div className="h-px bg-[#0F382C]/20 w-8"></div>
                <Leaf className="w-3.5 h-3.5 text-[#0F382C]" />
                <Heart className="w-3 h-3 text-[#E55B13] fill-[#E55B13]" />
                <Leaf className="w-3.5 h-3.5 text-[#0F382C] scale-x-[-1]" />
                <div className="h-px bg-[#0F382C]/20 w-8"></div>
              </div>
            </div>

          </div>

          {/* TITLE BANNER */}
          <div className="bg-[#E7F0E6] rounded-2xl py-3 text-center border border-[#0F382C]/10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F382C] tracking-wide">
              Donation Receipt
            </h2>
          </div>

          {/* DIVIDER WITH SUBTITLE */}
          <div className="relative text-center my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#0F382C]/30"></div>
            </div>
            <span className="relative bg-[#FAF9F5] px-4 text-[10px] sm:text-[11px] font-black tracking-widest text-[#0F382C] uppercase">
              THANK YOU FOR YOUR KINDNESS
            </span>
          </div>

          {/* METADATA ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-xs text-[#0F382C] border-b border-gray-200 pb-4">
            <div>
              <span className="font-bold text-gray-500 block text-[10px] uppercase">Receipt No.</span>
              <span className="font-black text-sm text-[#0F382C]">{receiptNo}</span>
            </div>
            <div className="sm:border-l sm:border-r border-gray-200 sm:px-4">
              <span className="font-bold text-gray-500 block text-[10px] uppercase">Date of Donation</span>
              <span className="font-bold text-sm text-[#0F382C]">{donationDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-800 italic font-serif">
              <Leaf className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs font-semibold">A small act makes a big difference!</span>
            </div>
          </div>

          {/* DONOR DETAILS CARD */}
          <div className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="bg-[#E7F0E6] px-4 py-2.5 flex items-center space-x-2 border-b border-gray-200">
              <User className="w-4 h-4 text-[#0F382C]" />
              <h4 className="font-bold font-serif text-sm text-[#0F382C]">Donor Details</h4>
            </div>
            <div className="p-4 space-y-2 text-xs">
              <div className="grid grid-cols-3 items-center">
                <span className="text-gray-500 font-bold">Name</span>
                <span className="col-span-2 font-bold text-gray-900">:  {donorName}</span>
              </div>
              <div className="grid grid-cols-3 items-center">
                <span className="text-gray-500 font-bold">Email</span>
                <span className="col-span-2 font-medium text-gray-800">:  {donorEmail}</span>
              </div>
              <div className="grid grid-cols-3 items-center">
                <span className="text-gray-500 font-bold">Phone</span>
                <span className="col-span-2 font-medium text-gray-800">:  {donorPhone}</span>
              </div>
            </div>
          </div>

          {/* DONATION DETAILS CARD */}
          <div className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="bg-[#E7F0E6] px-4 py-2.5 flex items-center space-x-2 border-b border-gray-200">
              <Utensils className="w-4 h-4 text-[#0F382C]" />
              <h4 className="font-bold font-serif text-sm text-[#0F382C]">Donation Details</h4>
            </div>
            <div className="p-4 text-xs">
              <div className="grid grid-cols-3 bg-[#E7F0E6]/70 p-2.5 rounded-xl font-bold text-[#0F382C] mb-2 text-center">
                <div>Item Name</div>
                <div>Quantity</div>
                <div>Category</div>
              </div>
              <div className="grid grid-cols-3 p-2.5 font-medium text-gray-800 text-center items-center">
                <div className="font-bold text-[#0F382C]">{donation.foodName || 'Cooked Food'}</div>
                <div>{donation.quantity || `${donation.servingCapacity || 10} Meal Boxes`}</div>
                <div>{donation.foodCategory || 'Meals'}</div>
              </div>
            </div>
          </div>

          {/* THANK YOU & SIGNATURE SECTION */}
          <div className="space-y-3 pt-2">
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Your generous contribution helps us provide nutritious meals to those in need. Together, we are building a kinder, healthier and stronger community.
            </p>

            <div className="space-y-1 pt-1">
              <div className="text-2xl font-serif italic text-[#0F382C] font-bold">
                Thank You ♡
              </div>
              <div className="text-xs text-gray-600 font-medium">
                <p>With Gratitude,</p>
                <p className="font-bold text-[#0F382C]">Team Annsetu</p>
                <p className="italic text-gray-500">Bridging Surplus to Smiles</p>
              </div>
            </div>
          </div>

          {/* BOTTOM CONTACT BAR */}
          <div className="border-t border-gray-300/80 pt-4 flex flex-wrap items-center justify-between text-[11px] text-gray-600 font-medium gap-2">
            <div className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0F382C]" />
              <span>contact@ansetu.org</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#0F382C]" />
              <span>www.annsetu.org</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0F382C]" />
              <span>India</span>
            </div>
          </div>

          {/* BOTTOM DECORATIVE CORNER ACCENTS */}
          <div className="absolute bottom-0 left-0 w-24 h-12 bg-orange-200/30 rounded-tr-full pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 pointer-events-none opacity-30">
            <Leaf className="w-12 h-12 text-emerald-800" />
          </div>

        </div>

        {/* ACTION CONTROLS */}
        <div className="bg-gray-100 p-4 border-t border-gray-200 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center space-x-2 btn-bounce-active"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Download Receipt (PDF)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md flex items-center space-x-2 btn-bounce-active"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImpactReceipt;

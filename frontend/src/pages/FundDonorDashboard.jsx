import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import { Heart, DollarSign, CreditCard, ShieldCheck, CheckCircle2, FileText, Sparkles, Award } from 'lucide-react';

const FundDonorDashboard = () => {
  const { user, showToast } = useApp();

  const [amount, setAmount] = useState('500');
  const [purpose, setPurpose] = useState('Food Distribution');
  const [customPurpose, setCustomPurpose] = useState('');
  const [donorName, setDonorName] = useState(user?.name || 'Generous Donor');
  const [receiptModal, setReceiptModal] = useState(null);

  const [history, setHistory] = useState([
    {
      id: "FND-2026-8801",
      amount: "₹ 2,500",
      purpose: "Food Distribution",
      date: "2026-08-28 14:30",
      status: "Completed",
      impact: "Funded 250 warm meals"
    },
    {
      id: "FND-2026-8802",
      amount: "₹ 1,000",
      purpose: "Volunteer Travel Support",
      date: "2026-08-20 11:15",
      status: "Completed",
      impact: "Covered 50 km EV delivery fuel"
    }
  ]);

  const handleDonateFunds = (e) => {
    e.preventDefault();
    if (!amount || parseInt(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const newContrib = {
      id: `FND-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: `₹ ${amount}`,
      purpose: purpose === 'Other' ? customPurpose : purpose,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Completed",
      impact: `Funded ~${Math.floor(parseInt(amount) / 10)} meals / logistics`
    };

    setHistory([newContrib, ...history]);
    setReceiptModal(newContrib);
    showToast("Financial Contribution Received! 💝", `Thank you for donating ₹ ${amount} for ${newContrib.purpose}!`, "success");
    setAmount('500');
  };

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="impact" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-pink-900 to-orange-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-800 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-pink-300 shadow-md">
              <Heart className="w-6 h-6 fill-pink-400" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-300 bg-black/30 px-3 py-1 rounded-full border border-pink-300/40">
                Fund Donor Portal
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-outfit">Financial Support Center</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-pink-100 max-w-2xl font-medium">
            Support AnnSetu's zero-hunger mission financially when you don't have surplus food to donate.
          </p>
        </div>

        {/* PROTOTYPE / DEMO PAYMENT BADGE */}
        <div className="bg-amber-50 border-2 border-amber-300 text-amber-950 p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-sm">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Prototype / Demo Mode Active: Payment flows are simulated for platform demonstration. No real money will be charged.</span>
          </div>
          <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-[10px] font-black uppercase shrink-0">
            Demo Payment Gateway
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Donation Form */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md border border-gray-200/80 space-y-6 text-gray-900">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xl font-black font-outfit text-purple-950">Make a Financial Contribution</h2>
              <p className="text-xs text-gray-500 font-medium">Select a purpose and contribution amount.</p>
            </div>

            <form onSubmit={handleDonateFunds} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-700 block">Contribution Purpose *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'Food Distribution', label: '🍱 Food Distribution Relief', desc: 'Direct meal packaging & logistics' },
                    { id: 'Volunteer Travel Support', label: '🚴 Volunteer Travel Support', desc: 'EV bike charge & delivery fuel' },
                    { id: 'NGO Support', label: '🏢 NGO Shelter Support', desc: 'Thermal containers & food storage' },
                    { id: 'AnnSetu Sustainability', label: '🌱 AnnSetu Sustainability', desc: 'AI server & platform maintenance' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPurpose(item.id)}
                      className={`p-3 rounded-2xl text-left border-2 transition-all ${
                        purpose === item.id ? 'bg-purple-50 border-purple-500 text-purple-950 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-extrabold">{item.label}</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-700 block">Select Contribution Amount (INR) *</label>
                <div className="flex flex-wrap gap-2 text-xs font-black">
                  {['250', '500', '1000', '2500', '5000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      className={`px-4 py-2.5 rounded-xl border-2 transition-all ${
                        amount === amt ? 'bg-orange-500 text-gray-950 border-orange-600 shadow-md' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-orange-100'
                      }`}
                    >
                      ₹ {amt}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-gray-500 block mb-1">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-gray-400 text-xs">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter custom amount"
                      required
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Donor Name *</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                  />
                </div>
                <div>
                  <label className="font-extrabold text-gray-700 block mb-1">Payment Method</label>
                  <div className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 font-bold text-gray-600 flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>UPI / Debit Card / NetBanking (Demo)</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[50px] px-6 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-lg flex items-center justify-center space-x-2 btn-bounce-active"
              >
                <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
                <span>Confirm Contribution (₹ {amount})</span>
              </button>

            </form>
          </div>

          {/* Right Col: Contribution History */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border border-gray-200/80 space-y-4 text-gray-900">
            <h3 className="text-lg font-black font-outfit text-purple-950 border-b border-gray-100 pb-3">
              Contribution History & Receipts
            </h3>

            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.id} className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-purple-950 font-mono">{h.id}</span>
                    <span className="font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-[10px]">
                      {h.status} ✓
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-lg text-purple-900">{h.amount}</span>
                    <span className="text-[10px] text-gray-500">{h.date}</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-700">Purpose: {h.purpose}</p>
                  <p className="text-[10px] text-emerald-800 font-semibold italic">{h.impact}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RECEIPT MODAL */}
        {receiptModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 text-gray-900 shadow-2xl border-2 border-purple-300 animate-in zoom-in-95">
              <div className="text-center space-y-1 border-b border-gray-100 pb-3">
                <span className="text-2xl">💝</span>
                <h3 className="text-xl font-black font-outfit text-purple-950">Official Donation Receipt</h3>
                <p className="text-xs text-gray-500 font-mono">{receiptModal.id}</p>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Donor Name:</span>
                  <span>{donorName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Amount Contributed:</span>
                  <span className="text-purple-900 font-black">{receiptModal.amount}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Purpose:</span>
                  <span>{receiptModal.purpose}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Date:</span>
                  <span>{receiptModal.date}</span>
                </div>
                <div className="p-2.5 bg-green-50 rounded-xl text-green-900 text-[11px] font-semibold text-center border border-green-200">
                  Impact Generated: {receiptModal.impact}
                </div>
              </div>

              <button
                onClick={() => setReceiptModal(null)}
                className="w-full py-3 rounded-2xl bg-purple-900 text-white font-black text-xs btn-bounce-active"
              >
                Close Receipt
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FundDonorDashboard;

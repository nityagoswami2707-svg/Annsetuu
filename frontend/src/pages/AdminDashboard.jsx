import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { jsPDF } from 'jspdf';
import { 
  Users, 
  Building2, 
  Utensils, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  Calendar,
  FileSpreadsheet,
  FileText,
  Clock,
  Eye,
  Check,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const { t, donations, ngos, stats, verifyNgo, setSelectedReceiptDonation } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.foodCategory === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleExportCSV = () => {
    const headers = ["Donation ID", "Donor Name", "Food Item", "Category", "Quantity", "Serving Capacity", "NGO Partner", "City", "Status", "Date"];
    const rows = donations.map(d => [
      d.id,
      `"${d.donorName}"`,
      `"${d.foodName}"`,
      `"${d.foodCategory}"`,
      `"${d.quantity}"`,
      d.servingCapacity,
      `"${d.ngoName}"`,
      d.city,
      d.status,
      d.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Annsetu_Overall_Platform_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(6, 78, 59);
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('ANNSETU ADMIN EXECUTIVE REPORT', 105, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 28, { align: 'center' });

      doc.setTextColor(6, 44, 33);
      doc.setFontSize(14);
      doc.text('Platform System Overview:', 15, 52);

      const metrics = [
        [`Total Registered Users:`, `1,250`],
        [`Verified Active NGOs:`, `${stats.activeNGOs}`],
        [`Total Food Donations:`, `${stats.totalDonations}`],
        [`Pending / In-Progress:`, `${stats.pendingDonations}`],
        [`Completed Deliveries:`, `${stats.completedDeliveries}`],
        [`Total Meals Generated:`, `${stats.totalMeals}`]
      ];

      let y = 64;
      metrics.forEach(([label, val]) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(label, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(val, 120, y);
        y += 10;
      });

      doc.save(`Annsetu_Executive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Generating Executive PDF Report...");
    }
  };

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-orange-600 text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-purple-800">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h1 className="text-xl sm:text-3xl font-extrabold font-outfit">Annsetu Admin Portal</h1>
            </div>
            <p className="text-purple-200 text-xs sm:text-sm mt-1">Monitor users, NGOs, donations and platform impact.</p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-purple-400/40 text-xs w-full md:w-auto backdrop-blur-md">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'dashboard' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-purple-100'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('ngos')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'ngos' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-purple-100'
              }`}
            >
              NGOs
            </button>

            <button
              onClick={() => setActiveTab('donations')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'donations' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-purple-100'
              }`}
            >
              Donations
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'reports' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-purple-100'
              }`}
            >
              Reports
            </button>
          </div>
        </div>

        {/* SUMMARY METRIC CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-gray-900">
          
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
              <span>Total Users</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-950 font-outfit">1,250</p>
            <span className="text-[10px] text-emerald-600 font-bold">↑ 12% this week</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
              <span>Active NGOs</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-950 font-outfit">{stats.activeNGOs}</p>
            <span className="text-[10px] text-emerald-600 font-bold">100% Verified</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
              <span>Total Donations</span>
              <Utensils className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-950 font-outfit">8,430</p>
            <span className="text-[10px] text-amber-600 font-bold">Live Streamed</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d">
            <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
              <span>Meals Served</span>
              <Utensils className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-700 font-outfit">{stats.totalMeals.toLocaleString()}</p>
            <span className="text-[10px] text-amber-600 font-bold">Impact High</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm card-zoom-3d col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
              <span>Pending Deliveries</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-950 font-outfit">{stats.pendingDonations}</p>
            <span className="text-[10px] text-blue-600 font-bold">Awaiting Pickup</span>
          </div>

        </div>

        {/* MOBILE ANALYTICS TRIGGER BUTTON */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-orange-600 shrink-0" />
            <span className="text-xs font-black text-gray-900">Mobile Analytics Engine</span>
          </div>
          <button
            onClick={() => setShowAnalyticsModal(true)}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md btn-bounce-active"
          >
            View Analytics
          </button>
        </div>

        {/* ANALYTICS MODAL */}
        {showAnalyticsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-gray-900">
            <div className="bg-white rounded-3xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-black font-outfit text-green-950">Platform Mobile Analytics</h3>
                <button 
                  onClick={() => setShowAnalyticsModal(false)}
                  className="p-1 rounded-xl bg-gray-100 text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700">Donation Growth & Monthly Volume</h4>
                <div className="h-40 flex items-end justify-between gap-2 pt-6 px-1 border-b border-gray-200">
                  {[
                    { m: 'Jan', v: 60 }, { m: 'Feb', v: 75 }, { m: 'Mar', v: 90 },
                    { m: 'Apr', v: 82 }, { m: 'May', v: 110 }, { m: 'Jun', v: 130 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-orange-500 rounded-t-md" style={{ height: `${item.v}%` }}></div>
                      <span className="text-[9px] text-gray-500 font-bold">{item.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700">Donations By Category</h4>
                <div className="space-y-2">
                  {[
                    { label: "Prepared Cooked Food", pct: 58, color: "bg-orange-500" },
                    { label: "Catering Surplus", pct: 24, color: "bg-amber-500" },
                    { label: "Bakery / Packaged", pct: 12, color: "bg-blue-600" },
                    { label: "Fresh Raw Produce", pct: 6, color: "bg-purple-600" }
                  ].map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-gray-700">
                        <span>{cat.label}</span>
                        <span>{cat.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MAIN TAB CONTENT */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h3 className="text-base font-black font-outfit text-green-950">Recent System Activity</h3>
            
            <div className="space-y-3 text-gray-900">
              {donations.slice(0, 5).map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 card-zoom-3d">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-emerald-900 font-mono">{item.id}</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 mt-1">{item.foodName}</h4>
                    <p className="text-[11px] text-gray-500">Donor: {item.donorName} → NGO: {item.ngoName}</p>
                  </div>
                  <span className="text-xs font-black text-amber-700">{item.servingCapacity} Meals</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NGO VERIFICATION TAB */}
        {activeTab === 'ngos' && (
          <div className="space-y-4">
            <h3 className="text-base font-black font-outfit text-green-950">NGO Partner Verification Center</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-900">
              {ngos.map(ngo => (
                <div key={ngo.id} className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm space-y-3 card-zoom-3d">
                  <div className="flex items-start space-x-3">
                    <img src={ngo.avatar} alt="NGO" className="w-10 h-10 rounded-xl object-cover border border-gray-200 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 font-outfit">{ngo.name}</h4>
                      <p className="text-[10px] text-emerald-700 font-mono">{ngo.registrationNo}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {ngo.verificationStatus} Badge
                    </span>

                    {ngo.verificationStatus !== 'Verified' ? (
                      <button
                        onClick={() => verifyNgo(ngo.id, 'Verified')}
                        className="px-3 py-1 rounded-lg bg-emerald-700 text-white font-bold text-xs btn-bounce-active"
                      >
                        Verify NGO
                      </button>
                    ) : (
                      <button
                        onClick={() => verifyNgo(ngo.id, 'Pending')}
                        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs font-semibold btn-bounce-active"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DONATIONS TAB */}
        {activeTab === 'donations' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-black font-outfit text-green-950">Master Donations Register</h3>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-orange-500 text-gray-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md btn-bounce-active"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-3 text-gray-900">
              {filteredDonations.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm space-y-2 card-zoom-3d">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-900 font-mono">{item.id}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">{item.foodName} ({item.quantity})</h4>
                  <p className="text-[11px] text-gray-500">Donor: {item.donorName} | NGO: {item.ngoName}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-xs font-extrabold text-amber-700">{item.servingCapacity} Meals</span>
                    {item.status === 'Delivered' && (
                      <button
                        onClick={() => setSelectedReceiptDonation(item)}
                        className="px-2.5 py-1 bg-amber-500 text-gray-950 font-bold text-[10px] rounded-lg shadow-xs btn-bounce-active"
                      >
                        Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OVERALL REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="bg-white text-gray-900 rounded-3xl p-6 border border-gray-200/80 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black font-outfit text-emerald-950">Overall Platform Report</h3>
                <p className="text-xs text-gray-500">Summary of food rescued and beneficiaries fed.</p>
              </div>
              <button
                onClick={handleExportPDF}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-gray-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md btn-bounce-active"
              >
                <Download className="w-4 h-4 text-gray-950" />
                <span>Download Executive PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">Food Rescued</span>
                <p className="text-2xl font-black font-outfit text-emerald-950 mt-1">8.5+ Tons</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase">Meals Generated</span>
                <p className="text-2xl font-black font-outfit text-amber-800 mt-1">{stats.totalMeals.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;

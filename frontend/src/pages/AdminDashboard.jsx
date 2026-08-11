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
  const { donations, ngos, stats, verifyNgo, setSelectedReceiptDonation } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, ngos, donations, reports
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filtered Donations
  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.foodCategory === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Export CSV Report
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

  // Export PDF Overall Report
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

      doc.line(15, y, 195, y);
      y += 12;

      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Recent Donations Summary:', 15, y);
      y += 10;

      donations.slice(0, 8).forEach(d => {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`${d.id} | ${d.donorName} -> ${d.ngoName} | ${d.servingCapacity} Meals | [${d.status}]`, 15, y);
        y += 7;
      });

      doc.save(`Annsetu_Executive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Generating Executive PDF Report...");
    }
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit">Annsetu Admin Portal</h1>
          </div>
          <p className="text-emerald-200 text-sm mt-1">Monitor the entire food donation ecosystem in real time.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 bg-emerald-900/80 p-1.5 rounded-2xl border border-emerald-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'dashboard' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('ngos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'ngos' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            NGO Verifications
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'donations' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            All Donations
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'reports' ? 'bg-amber-500 text-gray-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            Overall Reports
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Total Users</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-outfit">1,250</p>
          <span className="text-[10px] text-emerald-600 font-bold">↑ 12% this week</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Active NGOs</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-outfit">{stats.activeNGOs}</p>
          <span className="text-[10px] text-emerald-600 font-bold">100% Verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Total Donations</span>
            <Utensils className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-outfit">8,430</p>
          <span className="text-[10px] text-amber-600 font-bold">Live Streamed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Pending</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-outfit">{stats.pendingDonations}</p>
          <span className="text-[10px] text-blue-600 font-bold">Awaiting pickup</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Deliveries</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-outfit">7,920</p>
          <span className="text-[10px] text-emerald-600 font-bold">98.2% Success</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Meals Served</span>
            <Utensils className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-700 font-outfit">{stats.totalMeals.toLocaleString()}</p>
          <span className="text-[10px] text-amber-600 font-bold">Impact High</span>
        </div>

      </div>

      {/* MAIN TAB CONTENT */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Visual Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Donations Over Time */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold font-outfit text-emerald-950">Donations Over Time</h3>
                  <p className="text-xs text-gray-500">Monthly surplus food volume trend</p>
                </div>
                <BarChart3 className="w-5 h-5 text-emerald-700" />
              </div>

              {/* Bar Chart Visual Simulation */}
              <div className="h-48 flex items-end justify-between gap-3 pt-8 px-2 border-b border-gray-100">
                {[
                  { month: 'Jan', val: 60 },
                  { month: 'Feb', val: 75 },
                  { month: 'Mar', val: 90 },
                  { month: 'Apr', val: 82 },
                  { month: 'May', val: 110 },
                  { month: 'Jun', val: 130 },
                  { month: 'Jul', val: 145 },
                  { month: 'Aug', val: 170 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-800 to-emerald-500 rounded-t-lg transition-all group-hover:from-amber-600 group-hover:to-amber-400"
                      style={{ height: `${item.val}%` }}
                    ></div>
                    <span className="text-[10px] text-gray-500 font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Food Categories Donated */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold font-outfit text-emerald-950">Donations by Category</h3>
                  <p className="text-xs text-gray-500">Distribution of surplus meal types</p>
                </div>
                <PieChart className="w-5 h-5 text-amber-600" />
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { label: "Prepared Cooked Food (Restos/Weddings)", pct: 58, color: "bg-emerald-600" },
                  { label: "Catering Surplus (Events)", pct: 24, color: "bg-amber-500" },
                  { label: "Bakery / Packaged Foods", pct: 12, color: "bg-blue-600" },
                  { label: "Fresh Raw Produce (Markets)", pct: 6, color: "bg-purple-600" }
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>{cat.label}</span>
                      <span>{cat.pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Table Preview */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-outfit text-emerald-950">Recent System Activity</h3>
              <button 
                onClick={() => setActiveTab('donations')} 
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View All Table →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-100">
                    <th className="p-3">ID</th>
                    <th className="p-3">Donor</th>
                    <th className="p-3">Food Item</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">NGO</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donations.slice(0, 5).map(item => (
                    <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-bold text-emerald-900">{item.id}</td>
                      <td className="p-3 font-semibold">{item.donorName}</td>
                      <td className="p-3">{item.foodName}</td>
                      <td className="p-3 font-medium text-amber-700">{item.quantity}</td>
                      <td className="p-3 font-semibold text-emerald-800">{item.ngoName}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* NGO VERIFICATION TAB */}
      {activeTab === 'ngos' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md space-y-6">
          <div>
            <h3 className="text-xl font-bold font-outfit text-emerald-950">NGO Partner Verification Center</h3>
            <p className="text-xs text-gray-500">Review registration credentials & issue verified checkmark badges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ngos.map(ngo => (
              <div key={ngo.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4 relative">
                <div className="flex items-start space-x-3">
                  <img src={ngo.avatar} alt="NGO" className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-outfit">{ngo.name}</h4>
                    <p className="text-[11px] text-gray-500">{ngo.type}</p>
                    <p className="text-[10px] text-emerald-700 font-mono mt-0.5">{ngo.registrationNo}</p>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <p><strong>Contact:</strong> {ngo.contactPerson} ({ngo.phone})</p>
                  <p><strong>Capacity:</strong> {ngo.availableCapacity}</p>
                  <p><strong>Served/Day:</strong> {ngo.peopleServedPerDay} meals</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    ngo.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ngo.verificationStatus} Badge
                  </span>

                  <div className="flex space-x-2">
                    {ngo.verificationStatus !== 'Verified' ? (
                      <button
                        onClick={() => verifyNgo(ngo.id, 'Verified')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify NGO</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => verifyNgo(ngo.id, 'Pending')}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-semibold"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW ALL DONATIONS TABLE TAB */}
      {activeTab === 'donations' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-outfit text-emerald-950">Master Donations Table</h3>
              <p className="text-xs text-gray-500">Filtered real-time register of all surplus food contributions.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ID, Donor, NGO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 font-semibold focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="px-3 py-2 rounded-xl bg-emerald-900 text-white font-bold text-xs flex items-center space-x-1.5 hover:bg-emerald-800"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>CSV Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-950 text-white font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Donation ID</th>
                  <th className="p-3">Donor</th>
                  <th className="p-3">Food Item</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Meals</th>
                  <th className="p-3">NGO</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDonations.map(item => (
                  <tr key={item.id} className="hover:bg-emerald-50/60 transition-colors">
                    <td className="p-3 font-bold text-emerald-900 font-mono">{item.id}</td>
                    <td className="p-3 font-semibold text-gray-900">{item.donorName}</td>
                    <td className="p-3 text-gray-800 max-w-xs truncate">{item.foodName}</td>
                    <td className="p-3 text-gray-500">{item.foodCategory}</td>
                    <td className="p-3 font-medium text-amber-700">{item.quantity}</td>
                    <td className="p-3 font-bold text-emerald-800">{item.servingCapacity}</td>
                    <td className="p-3 font-semibold text-emerald-900">{item.ngoName}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Accepted' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {item.status === 'Delivered' && (
                        <button
                          onClick={() => setSelectedReceiptDonation(item)}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-[10px] rounded-lg shadow-xs"
                        >
                          Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OVERALL REPORTS SECTION */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl p-8 border border-emerald-900/10 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold font-outfit text-emerald-950">Overall Platform Impact Report</h3>
              <p className="text-xs text-gray-500">Comprehensive summary of food rescued, beneficiaries fed, and ecosystem health.</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportPDF}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-800 to-amber-600 hover:from-emerald-900 hover:to-amber-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive PDF Report</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase">Total Food Rescued</span>
              <p className="text-3xl font-black font-outfit text-emerald-950 mt-1">8.5+ Tons</p>
              <p className="text-[11px] text-emerald-700 mt-1">Prevented from ending up in landfills</p>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-800 uppercase">Total Meals Generated</span>
              <p className="text-3xl font-black font-outfit text-amber-800 mt-1">{stats.totalMeals.toLocaleString()}</p>
              <p className="text-[11px] text-amber-700 mt-1">Nourishing meals served to urban poor</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
              <span className="text-xs font-bold text-purple-800 uppercase">Fulfillment Rate</span>
              <p className="text-3xl font-black font-outfit text-purple-950 mt-1">98.2%</p>
              <p className="text-[11px] text-purple-700 mt-1">Successful pickup & delivery completion</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <span className="text-xs font-bold text-blue-800 uppercase">Partner Network</span>
              <p className="text-3xl font-black font-outfit text-blue-950 mt-1">165+ Entities</p>
              <p className="text-[11px] text-blue-700 mt-1">Donors, NGOs & Delivery Volunteers</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;

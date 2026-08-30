import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnnsetuMotionBackground from '../components/AnnsetuMotionBackground';
import MapView from '../components/MapView';
import { Truck, MapPin, CheckCircle, Navigation, Award, DollarSign, Clock, ShieldCheck } from 'lucide-react';

const VolunteerDashboard = () => {
  const { donations, updateDeliveryStatus, user } = useApp();

  const activeAssignedTasks = donations.filter(
    d => d.status === 'Accepted' || d.status === 'In Transit' || d.status === 'Picked Up'
  );

  const completedTasks = donations.filter(d => d.status === 'Delivered');

  return (
    <div className="pt-24 pb-20 sm:pb-16 min-h-screen bg-[#faf8f5] text-[#062c21] relative overflow-hidden">
      
      {/* ANIMATED MOTION BACKGROUND */}
      <AnnsetuMotionBackground type="track" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-orange-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-800 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-blue-300 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 bg-black/30 px-3 py-1 rounded-full border border-blue-300/40">
                Volunteer Logistics Module
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-outfit">Delivery Volunteer Dashboard</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium">
            Pickup and transit manager for delivery volunteers to safely transport meals from donors to NGO shelters.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase">Assigned Active Orders</span>
            <p className="text-2xl font-black text-blue-950 font-outfit">{activeAssignedTasks.length} Active</p>
          </div>
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase">Completed Deliveries</span>
            <p className="text-2xl font-black text-green-950 font-outfit">{completedTasks.length} Delivered</p>
          </div>
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase">Volunteer Rewards & Fuel Reimbursement</span>
            <p className="text-2xl font-black text-amber-700 font-outfit">₹ 1,250 Claimed</p>
          </div>
        </div>

        {/* Active Tasks List & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {activeAssignedTasks.length > 0 ? (
              <div className="space-y-6">
                <MapView donation={activeAssignedTasks[0]} />

                {activeAssignedTasks.map((task) => (
                  <div key={task.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border border-gray-200/80 text-gray-900 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gray-400">{task.id}</span>
                        <h3 className="text-lg font-black font-outfit text-blue-950">{task.foodName}</h3>
                      </div>
                      <span className="text-xs font-black text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                        {task.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-orange-50 p-3 rounded-2xl border border-orange-200">
                        <span className="text-[10px] font-bold text-orange-700 uppercase">Pickup Donor</span>
                        <p className="font-extrabold text-gray-900 mt-0.5">{task.donorName}</p>
                        <p className="text-[11px] text-gray-600">{task.pickupAddress}</p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-2xl border border-green-200">
                        <span className="text-[10px] font-bold text-green-700 uppercase">Destination NGO Shelter</span>
                        <p className="font-extrabold text-gray-900 mt-0.5">{task.ngoName}</p>
                        <p className="text-[11px] text-gray-600">{task.city}, Gujarat</p>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {task.status === 'Accepted' && (
                        <button
                          onClick={() => updateDeliveryStatus(task.id, 'Picked Up')}
                          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-gray-950 font-black text-xs shadow-md btn-bounce-active"
                        >
                          1. Mark Picked Up
                        </button>
                      )}

                      {(task.status === 'Accepted' || task.status === 'Picked Up') && (
                        <button
                          onClick={() => updateDeliveryStatus(task.id, 'In Transit')}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md btn-bounce-active"
                        >
                          2. Mark In Transit
                        </button>
                      )}

                      {task.status !== 'Delivered' && (
                        <button
                          onClick={() => updateDeliveryStatus(task.id, 'Delivered')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md btn-bounce-active"
                        >
                          3. Confirm Delivery ✓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl text-center space-y-3 border border-gray-200 text-gray-700">
                <Truck className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="text-lg font-black font-outfit text-gray-900">No Active Pickup Orders</h3>
                <p className="text-xs text-gray-500">You currently have no active assigned delivery tasks.</p>
              </div>
            )}

          </div>

          {/* Right Col: Completed Deliveries History */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border border-gray-200/80 text-gray-900 space-y-4">
            <h3 className="text-lg font-black font-outfit text-blue-950 border-b border-gray-100 pb-3">
              Completed Tasks History
            </h3>

            <div className="space-y-3">
              {completedTasks.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-900">{c.id}</span>
                    <span className="text-[10px] font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      Delivered ✓
                    </span>
                  </div>
                  <p className="font-extrabold text-gray-800">{c.foodName}</p>
                  <p className="text-[10px] text-gray-500">{c.donorName} → {c.ngoName}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VolunteerDashboard;

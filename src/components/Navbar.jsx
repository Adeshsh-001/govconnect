import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  UserCheck, 
  ShieldCheck, 
  Activity, 
  Bell, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Lock,
  Cpu,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  pendingCount, 
  language, 
  setLanguage,
  systemStatus = "operational"
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "New Integration Proposal", time: "10 mins ago", unread: true, desc: "Higher & Technical Education Dept submitted data access request for MahaFood PDS schema." },
    { id: 2, title: "DPDP Consent Verification", time: "25 mins ago", unread: true, desc: "Automated direct benefit transfer consent tokens validated for 45,210 farmers." },
    { id: 3, title: "mTLS Certificate Updated", time: "2 hours ago", unread: false, desc: "State Police CCTNS node renewed security certificate until 2028." }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Main Navigation Header */}
      <div className="px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1D4ED8] shadow-md shadow-blue-950/20 text-white font-bold text-lg">
            <div className="absolute inset-0 rounded-xl border border-white/20"></div>
            <div className="flex flex-col items-center leading-none">
              <span className="text-[9px] tracking-widest text-amber-300 font-extrabold">SETU</span>
              <Layers className="w-5 h-5 text-white my-0.5" />
              <span className="text-[8px] text-emerald-300 font-bold">GOV</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B2545]">
                Gov<span className="text-[#1D4ED8]">Connect</span>
                <span className="text-slate-400 font-normal text-lg ml-1.5 hidden sm:inline">|</span>
                <span className="text-sm sm:text-base font-semibold text-slate-700 ml-1.5">
                  {language === 'MR' ? 'सेतुGov आंतरकार्यक्षमता मंच' : 'Interoperability Platform'}
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'MR' 
                ? 'महाराष्ट्र शासन — सर्व विभागांमधील सुरक्षित व प्रमाणबद्ध डेटा देवाणघेवाण प्रणाली' 
                : 'Government of Maharashtra — Unified Inter-Departmental Data Exchange & DPDP Consent Gateway'}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (3 Core Views) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-inner self-start md:self-auto">
          {/* View 1: Admin Dashboard */}
          <button
            onClick={() => setActiveView('admin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeView === 'admin'
                ? 'bg-[#0B2545] text-white shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeView === 'admin' ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>Admin Dashboard</span>
            {pendingCount > 0 && (
              <span className="bg-[#FF671F] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          {/* View 2: Data Exchange */}
          <button
            onClick={() => setActiveView('gateway')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeView === 'gateway'
                ? 'bg-[#0B2545] text-white shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className={`w-4 h-4 ${activeView === 'gateway' ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Data Exchange</span>
            <span className="bg-emerald-600/20 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full hidden sm:inline">
              5 Schemas
            </span>
          </button>

          {/* View 3: Citizen Portal */}
          <button
            onClick={() => setActiveView('citizen')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeView === 'citizen'
                ? 'bg-[#046A38] text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <UserCheck className={`w-4 h-4 ${activeView === 'citizen' ? 'text-amber-300' : 'text-slate-500'}`} />
            <span>Citizen Portal</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full hidden sm:inline">
              DPDP 2023
            </span>
          </button>
        </div>

        {/* Right Action Icons & Officer Badge */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF671F] rounded-full ring-2 ring-white"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">System Notifications</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="divide-y divide-slate-100 mt-2">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 hover:bg-slate-50 rounded-lg px-2 transition">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-2 pt-2 text-center text-xs font-semibold text-blue-600 hover:text-blue-800 border-t border-slate-100 block"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* User Profile Badge (Dynamic based on view) */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            {activeView === 'citizen' ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                  RP
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">Ramesh S. Patil</div>
                  <div className="text-[10px] text-emerald-700 font-medium">Citizen (DigiLocker Verified)</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-900 font-bold text-xs">
                  RK
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">Shri R. V. Kulkarni, IAS</div>
                  <div className="text-[10px] text-blue-700 font-medium">State Interoperability Admin</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

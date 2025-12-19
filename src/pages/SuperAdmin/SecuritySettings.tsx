import React, { useState } from "react";
import {
    IoFingerPrintOutline,
    IoGlobeOutline,
    IoKeyOutline,
    IoListOutline,
    IoLockClosedOutline,
    IoPulseOutline,
    IoRefreshOutline,
    IoSaveOutline,
    IoShieldCheckmarkOutline,
    IoWarningOutline
} from "react-icons/io5";

const SecuritySettings: React.FC = () => {
  const [activeSessions] = useState([
    { id: 1, device: "MacBook Pro", location: "New York, USA", ip: "192.168.1.1", status: "Active Now", current: true },
    { id: 2, device: "iPhone 15 Pro", location: "London, UK", ip: "10.0.0.45", status: "2 hours ago", current: false },
    { id: 3, device: "Windows Desktop", location: "Tokyo, JP", ip: "172.16.254.1", status: "1 day ago", current: false },
  ]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
            <IoShieldCheckmarkOutline className="text-primary-100" />
            Security & Compliance
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Manage global security protocols and infrastructure protection.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-xl text-sm font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
            <IoRefreshOutline />
            Reset Defaults
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary-100 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all">
            <IoSaveOutline />
            Deploy Policy
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Policies */}
        <div className="lg:col-span-8 space-y-8">
          {/* Infrastructure Protection */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10 space-y-8">
            <h2 className="text-xl font-black text-primary-50 flex items-center gap-3">
              <IoGlobeOutline className="text-primary-100" />
              Infrastructure Protection
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Global Firewall (WAF)", desc: "Protect against SQL injection and XSS globally.", checked: true },
                { title: "DDoS Mitigation", desc: "Automatic traffic filtration during high-scale attacks.", checked: true },
                { title: "IP Whitelisting", desc: "Restrict Super Admin access to specific IP ranges.", checked: false },
                { title: "Brute Force Protection", desc: "Global lockout after multiple failed login attempts.", checked: true },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-primary-100/10 transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 pr-4">
                      <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication & Sessions */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 sm:p-10 space-y-8">
              <h2 className="text-xl font-black text-primary-50 flex items-center gap-3">
                <IoFingerPrintOutline className="text-primary-100" />
                Access Control Policies
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">MFA Enforcement</label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold">
                      <option>Required for all Admins</option>
                      <option>Required for Super Admin only</option>
                      <option>Optional for all users</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Session Timeout</label>
                    <input 
                      type="text" 
                      defaultValue="30 Minutes"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <h3 className="text-sm font-black text-primary-50 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <IoListOutline />
                  Active Sessions Monitor
                </h3>
                <div className="space-y-4">
                  {activeSessions.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-gray-100 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${s.current ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "bg-white text-gray-400 shadow-sm"}`}>
                          <IoKeyOutline />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-gray-800">{s.device} <span className="text-[10px] font-medium text-gray-400 ml-2">{s.ip}</span></p>
                          <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                            {s.location} • <span className={s.current ? "text-primary-100 font-bold" : ""}>{s.status}</span>
                          </p>
                        </div>
                      </div>
                      {!s.current && (
                        <button className="text-[10px] font-black text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                          Revoke Access
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status Cards */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary-50 p-10 rounded-[2.5rem] text-white shadow-xl shadow-primary-50/20 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 transition-transform group-hover:scale-110">
              <IoShieldCheckmarkOutline />
            </div>
            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl mx-auto backdrop-blur-md">
                <IoPulseOutline className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">System Secure</h3>
                <p className="text-blue-100/60 text-xs font-bold uppercase tracking-widest mt-1">Infrastructure Health: 100%</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase text-blue-200">Last Security Audit</p>
                <p className="text-sm font-bold">14 Dec, 2024 at 08:30 UTC</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 space-y-6">
            <div className="flex items-center gap-3 text-amber-600">
              <IoWarningOutline className="text-2xl" />
              <h3 className="font-black text-sm uppercase tracking-widest">Active Precautions</h3>
            </div>
            <div className="space-y-4">
              {[
                "Concurrent login limits active",
                "Password complexity enforced",
                "Geo-blocking disabled (Global Access)"
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-bold text-amber-700/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-primary-50 flex items-center gap-3">
              <IoLockClosedOutline className="text-primary-100" />
              Emergency Lockdown
            </h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              In case of a detected breach, you can instantly terminate all active sessions and lock out all non-Super Admin users globally.
            </p>
            <button className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10">
              INITIATE GLOBAL LOCKDOWN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;

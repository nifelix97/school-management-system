import React, { useState } from "react";
import {
    IoAccessibilityOutline,
    IoColorPaletteOutline,
    IoEarthOutline,
    IoGlobeOutline,
    IoImageOutline,
    IoLanguageOutline,
    IoRefreshOutline,
    IoSaveOutline,
    IoSettingsOutline,
    IoTimeOutline
} from "react-icons/io5";

const GeneralSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("branding");

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
            <IoSettingsOutline className="text-primary-100" />
            General Settings
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Configure site-wide identity, localization, and user policies.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-xl text-sm font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
            <IoRefreshOutline />
            Discard
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary-100 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all">
            <IoSaveOutline />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-72 shrink-0 space-y-2">
          {[
            { id: "branding", label: "Site Branding", icon: <IoImageOutline /> },
            { id: "localization", label: "Localization", icon: <IoEarthOutline /> },
            { id: "preferences", label: "User Preferences", icon: <IoAccessibilityOutline /> },
            { id: "appearance", label: "Theme & Design", icon: <IoColorPaletteOutline /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary-50 text-white shadow-xl shadow-primary-50/20 translate-x-1"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-primary-50 border border-transparent shadow-sm"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[600px]">
          <div className="p-8 sm:p-10">
            {activeTab === "branding" && (
              <div className="space-y-10 animate-slideIn">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Application Name</label>
                    <input 
                      type="text" 
                      defaultValue="Global Academy Management System" 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Site Tagline</label>
                    <input 
                      type="text" 
                      defaultValue="Empowering Institutional Excellence" 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Global Identity Assets</label>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30 flex flex-col items-center text-center space-y-4 hover:border-primary-100/30 transition-all cursor-pointer group">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl text-primary-100 group-hover:scale-110 transition-transform">
                        <IoImageOutline />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-700">Main Platform Logo</p>
                        <p className="text-[10px] text-gray-400">SVG or transparent PNG preferred.</p>
                      </div>
                      <button className="px-5 py-2 bg-primary-50/10 text-primary-50 text-[10px] font-black uppercase tracking-wider rounded-xl">Upload New</button>
                    </div>
                    <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30 flex flex-col items-center text-center space-y-4 hover:border-primary-100/30 transition-all cursor-pointer group">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl text-primary-100 group-hover:scale-110 transition-transform">
                        <IoGlobeOutline />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-700">App Favicon</p>
                        <p className="text-[10px] text-gray-400">ICO or standard 32x32 PNG.</p>
                      </div>
                      <button className="px-5 py-2 bg-primary-50/10 text-primary-50 text-[10px] font-black uppercase tracking-wider rounded-xl">Upload New</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "localization" && (
              <div className="space-y-10 animate-slideIn">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase text-flex items-center gap-2">
                       <IoLanguageOutline />
                       Default Platform Language
                    </label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold">
                      <option>English (US)</option>
                      <option>French (FR)</option>
                      <option>Spanish (ES)</option>
                      <option>Arabic (SA)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase flex items-center gap-2">
                      <IoTimeOutline />
                      System Timezone
                    </label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold">
                      <option>(GMT+02:00) Central Africa Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) London, UTC</option>
                      <option>(GMT+09:00) Tokyo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Date Display Format</label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-8 animate-slideIn">
                {[
                  { title: "Public Registration", desc: "Allow new users to sign up without institution-specific invite.", checked: false },
                  { title: "Guest Access", desc: "Enable limited viewing features for unauthenticated visitors.", checked: true },
                  { title: "Maintenance Mode", desc: "Shutdown all user access for global system maintenance.", checked: false },
                  { title: "In-App Sound FX", desc: "Play micro-interaction sounds for UI actions.", checked: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-7 bg-gray-50/50 rounded-3xl border border-transparent hover:border-primary-100/10 hover:bg-white transition-all group">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer scale-110">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-10 animate-slideIn">
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Global Brand Colors</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Primary", val: "#034ea1", class: "bg-primary-50" },
                      { label: "Secondary", val: "#3d96ff", class: "bg-primary-100" },
                      { label: "Accent", val: "#7eb6ff", class: "bg-primary-200" },
                      { label: "Light", val: "#c8e0ff", class: "bg-primary-400" },
                    ].map((c) => (
                      <div key={c.label} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl shadow-lg ${c.class}`} />
                        <div className="text-center">
                          <p className="text-[10px] font-black text-gray-400 uppercase">{c.label}</p>
                          <p className="text-xs font-bold text-gray-700">{c.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-primary-50 rounded-[2.5rem] text-white relative overflow-hidden group">
                   <div className="absolute -right-5 -bottom-5 text-8xl opacity-10 transition-transform group-hover:scale-110">
                      <IoColorPaletteOutline />
                    </div>
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-lg font-black italic">Visual Theme Sync</h4>
                    <p className="text-xs text-blue-100 leading-relaxed font-medium">Changing the global theme will instantly propagate new design tokens across all institutional dashboards. This action may take a few seconds to flush CDN caches.</p>
                    <button className="px-8 py-3 bg-white text-primary-50 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-gray-50 transition-all">Refresh CSS Tokens</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;

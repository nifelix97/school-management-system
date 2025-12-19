import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCardOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloudUploadOutline,
    IoGlobeOutline,
    IoImageOutline,
    IoInformationCircleOutline,
    IoKeyOutline,
    IoLinkOutline,
    IoMailOutline,
    IoPowerOutline,
    IoRefreshOutline,
    IoSaveOutline,
    IoSettingsOutline,
    IoShieldCheckmarkOutline,
    IoSpeedometerOutline
} from "react-icons/io5";
import {
    ALL_ROLES,
    getEnabledRoles,
    isSystemLocked,
    setEnabledRoles,
    setSystemLock
} from "../../utils/roles";

interface SettingFieldProps {
  label: string;
  description?: string;
  type: string;
  placeholder?: string;
  value: string;
}

const SettingField: React.FC<SettingFieldProps> = ({ label, description, type, placeholder, value }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700">{label}</label>
    {description && <p className="text-xs text-gray-400 mb-1">{description}</p>}
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-100/10 transition-all outline-none"
    />
  </div>
);

const SystemConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [systemLocked, setSystemLocked] = useState(isSystemLocked());
  const [enabledRoles, setRolesVisibility] = useState<string[]>(getEnabledRoles());

  // Pagination for Roles
  const [currentRolesPage, setCurrentRolesPage] = useState(1);
  const itemsPerPage = 6;
  const totalRolesPages = Math.ceil(ALL_ROLES.length / itemsPerPage);
  
  const currentRoles = ALL_ROLES.slice(
    (currentRolesPage - 1) * itemsPerPage,
    currentRolesPage * itemsPerPage
  );

  const tabs = [
    { id: "general", label: "General", icon: <IoGlobeOutline /> },
    { id: "communication", label: "Communication", icon: <IoMailOutline /> },
    { id: "payments", label: "Payments & Compliance", icon: <IoCardOutline /> },
    { id: "access", label: "Access Control", icon: <IoKeyOutline /> },
    { id: "performance", label: "Performance", icon: <IoSpeedometerOutline /> },
    { id: "integrations", label: "Integrations", icon: <IoLinkOutline /> },
  ];

  const handleToggleSystemLock = (locked: boolean) => {
    setSystemLocked(locked);
    setSystemLock(locked);
  };

  const handleToggleRole = (role: string) => {
    let newRoles: string[];
    if (enabledRoles.includes(role)) {
      newRoles = enabledRoles.filter(r => r !== role);
    } else {
      newRoles = [...enabledRoles, role];
    }
    setRolesVisibility(newRoles);
    setEnabledRoles(newRoles);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
            <IoSettingsOutline className="text-primary-100 animate-spin-slow" />
            System Configuration
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Advanced platform parameters and global enforcement controls.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-xl text-sm font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
            <IoRefreshOutline className="text-lg" />
            Discard
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary-100 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all">
            <IoSaveOutline className="text-lg" />
            Save Configuration
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-72 shrink-0 space-y-2">
          {tabs.map((tab) => (
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
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            {activeTab === "general" && (
              <div className="space-y-8 animate-slideIn">
                <div className="grid md:grid-cols-2 gap-8">
                  <SettingField label="Institution Name" value="Global Academy of Excellence" type="text" />
                  <SettingField label="System Tagline" value="Empowering the leaders of tomorrow" type="text" />
                  <SettingField label="Contact Email" value="support@globalacademy.edu" type="email" />
                  <SettingField label="Support Phone" value="+1 (555) 000-1111" type="tel" />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700">Institution Logo</label>
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-inner flex items-center justify-center text-3xl text-primary-50/20">
                      <IoImageOutline />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm font-bold text-gray-600">Upload a new logo</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG or SVG. Max size 2MB.</p>
                      <button className="mt-4 px-6 py-2 bg-primary-50/10 text-primary-50 text-xs font-bold rounded-xl hover:bg-primary-50/20 transition-all flex items-center gap-2 mx-auto sm:mx-0">
                        <IoCloudUploadOutline className="text-lg" />
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "communication" && (
              <div className="space-y-8 animate-slideIn">
                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
                  <IoInformationCircleOutline className="text-2xl text-blue-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-blue-900">SMTP Server Information</h4>
                    <p className="text-xs text-blue-700/70 mt-1 leading-relaxed">Ensure your SMTP credentials are correct to avoid email delivery failures for notifications and invoices.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <SettingField label="SMTP Host" value="smtp.mailtrap.io" type="text" />
                  <SettingField label="SMTP Port" value="2525" type="text" />
                  <SettingField label="SMTP Username" value="fe89b342a1" type="text" />
                  <SettingField label="SMTP Password" value="********" type="password" />
                </div>
                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-gray-700 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
                    Test SMTP Connection
                  </button>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-10 animate-slideIn">
                {/* Billing Enforcement Section */}
                <div className="p-8 bg-red-50/50 rounded-[2.5rem] border border-red-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                        <IoPowerOutline />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-red-900">Platform Operational Status</h4>
                        <p className="text-xs text-red-700/70 font-medium italic">Enforce global system lock for payment non-compliance.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={systemLocked}
                        onChange={(e) => handleToggleSystemLock(e.target.checked)}
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  
                  {systemLocked && (
                    <div className="p-6 bg-red-600 rounded-3xl text-white space-y-3 animate-pulse">
                      <div className="flex items-center gap-3">
                        <IoAlertCircleOutline className="text-2xl" />
                        <h5 className="font-black text-sm uppercase tracking-[0.1em]">SYSTEM HARD-LOCK ACTIVE</h5>
                      </div>
                      <p className="text-xs text-red-100/90 leading-relaxed font-medium">
                        All application access points across all institutions are currently suspended. Only Super Admins can authenticate to resolve this status.
                      </p>
                    </div>
                  )}

                  {!systemLocked && (
                    <div className="p-4 bg-white/50 rounded-2xl border border-red-100/50 text-red-800 text-xs font-medium leading-relaxed">
                      <strong>Warning:</strong> Activating the payment lock will instantly terminate all active sessions and prevent any new logins until disabled. Use this only for severe billing delinquency.
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <SettingField label="Currency Code" value="USD ($)" type="text" />
                  <SettingField label="Tax Percentage (%)" value="5.0" type="text" />
                </div>
                
                <div className="p-8 border border-gray-100 rounded-[2.5rem] bg-gray-50/30 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 text-white rounded-xl flex items-center justify-center text-2xl">
                        <IoCardOutline />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Stripe Integration</h4>
                        <p className="text-xs text-gray-400 font-medium">Manage online payments and platform-wide subscriptions.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <SettingField label="Secret Key" value="sk_test_51Mz..." type="password" />
                    <SettingField label="Publishable Key" value="pk_test_51Mz..." type="text" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "access" && (
              <div className="space-y-8 animate-slideIn">
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                  <IoShieldCheckmarkOutline className="text-2xl text-amber-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 italic">Role Availability Control</h4>
                    <p className="text-xs text-amber-700/70 mt-1 leading-relaxed font-medium">Enable or disable specific roles globally. Disabled roles will be hidden from registration and user assignment flows across all institutions.</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentRoles.map((role, i) => {
                    const isCore = ["Super Admin", "Admin"].includes(role);
                    const isEnabled = enabledRoles.includes(role);
                    
                    return (
                      <div key={i} className={`p-5 rounded-3xl border transition-all flex items-center justify-between group ${isCore ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:border-primary-100/30 hover:bg-gray-50/50'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl ${isCore ? 'bg-gray-200 text-gray-400' : 'bg-primary-50/10 text-primary-50 group-hover:scale-110'}`}>
                            <IoKeyOutline />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-700">{role}</p>
                            {isCore && <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">System Core</span>}
                          </div>
                        </div>
                        {!isCore && (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={isEnabled} 
                              onChange={() => handleToggleRole(role)}
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-100"></div>
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Role Pagination Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Showing {((currentRolesPage - 1) * itemsPerPage) + 1}-{Math.min(currentRolesPage * itemsPerPage, ALL_ROLES.length)} of {ALL_ROLES.length}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentRolesPage(prev => Math.max(1, prev - 1))}
                      disabled={currentRolesPage === 1}
                      className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-primary-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <IoChevronBackOutline className="text-lg" />
                    </button>
                    <div className="flex items-center px-4 bg-gray-50 rounded-xl">
                      <span className="text-xs font-black text-primary-50">{currentRolesPage}</span>
                      <span className="text-xs font-bold text-gray-300 mx-2">/</span>
                      <span className="text-xs font-bold text-gray-400">{totalRolesPages}</span>
                    </div>
                    <button
                      onClick={() => setCurrentRolesPage(prev => Math.min(totalRolesPages, prev + 1))}
                      disabled={currentRolesPage === totalRolesPages}
                      className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-primary-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <IoChevronForwardOutline className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div className="space-y-8 animate-slideIn">
                <div className="grid gap-6">
                  {[
                    { title: "Gzip Compression", desc: "Reduce file sizes before they are sent from your server to the browser.", checked: true },
                    { title: "Browser Caching", desc: "Store resources in the visitor's browser for faster subsequent loads.", checked: true },
                    { title: "Image CDN", desc: "Serve images from a globally distributed content delivery network.", checked: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-7 bg-gray-50/50 rounded-3xl hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                      <div className="max-w-[80%]">
                        <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 font-medium italic">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-200"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "integrations" && (
              <div className="space-y-8 animate-slideIn text-center py-10">
                <div className="w-24 h-24 bg-primary-50/5 text-primary-50 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner animate-pulse">
                  <IoLinkOutline />
                </div>
                <h3 className="text-2xl font-black text-gray-800">Third-Party Connections</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed font-medium">Extend your system's capabilities by connecting with Google Maps, Zoom, and more. Advanced settings coming soon.</p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {["Google Maps", "Zoom API", "AWS S3", "Twilio"].map((api) => (
                    <div key={api} className="p-4 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-primary-100 hover:text-primary-100 transition-all cursor-pointer bg-gray-50/30">
                      Connect {api}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;

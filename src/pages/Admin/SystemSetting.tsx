import React, { useState } from "react";
import {
    IoCheckmarkOutline,
    IoCloudUploadOutline,
    IoGlobeOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPeopleOutline,
    IoSaveOutline,
    IoSchoolOutline,
    IoSettingsOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline
} from "react-icons/io5";

import { ALL_ROLES, getEnabledRoles, setEnabledRoles as saveRolesToStorage } from "../../utils/roles";

const SystemSetting: React.FC = () => {
  // General Settings
  const [schoolName, setSchoolName] = useState("Excellence Academy");
  const [schoolEmail, setSchoolEmail] = useState("info@excellenceacademy.edu");
  const [schoolPhone, setSchoolPhone] = useState("+1 (555) 123-4567");
  const [schoolAddress, setSchoolAddress] = useState("123 Education Street, Learning City, LC 12345");
  const [timezone, setTimezone] = useState("America/New_York");
  const [language, setLanguage] = useState("en");

  // Academic Settings
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [currentSemester, setCurrentSemester] = useState("Fall 2024");
  const [gradeScale, setGradeScale] = useState("percentage");
  const [passingGrade, setPassingGrade] = useState("60");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [passwordExpiry, setPasswordExpiry] = useState("90");
  const [loginAttempts, setLoginAttempts] = useState("5");

  // Appearance Settings
  const [primaryColor, setPrimaryColor] = useState("#1e3a8a");
  const [secondaryColor, setSecondaryColor] = useState("#f97316");
  const [darkMode, setDarkMode] = useState(false);

  // Portal Access Settings
  const [enabledRoles, setEnabledRoles] = useState<string[]>(getEnabledRoles());

  const [activeTab, setActiveTab] = useState("general");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    // Save roles to localStorage
    saveRolesToStorage(enabledRoles);
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: <IoSchoolOutline /> },
    { id: "academic", label: "Academic", icon: <IoGlobeOutline /> },
    { id: "notifications", label: "Notifications", icon: <IoNotificationsOutline /> },
    { id: "security", label: "Security", icon: <IoShieldCheckmarkOutline /> },
    { id: "portal", label: "Portal Access", icon: <IoPeopleOutline /> },
    { id: "appearance", label: "Appearance", icon: <IoSettingsOutline /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary-100/10 rounded-2xl flex items-center justify-center text-primary-100 shadow-inner">
              <IoSettingsOutline className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">System Settings</h1>
              <p className="text-sm font-medium text-gray-400">Configure global platform parameters and preferences</p>
            </div>
          </div>
          
          <button
            onClick={handleSaveSettings}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary-50 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-50/20 hover:shadow-primary-50/40 active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <IoSaveOutline className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Save All Changes</span>
          </button>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mt-4 animate-slide-down flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center shadow-sm">
              <IoCheckmarkOutline className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Settings deployed successfully!</span>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-72 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm text-left group
                ${activeTab === tab.id 
                  ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20 scale-[1.02]' 
                  : 'bg-white text-gray-400 border border-gray-50 hover:border-primary-50/30 hover:text-primary-50 hover:bg-primary-50/[0.02]'}`}
            >
              <span className={`text-xl transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : 'text-primary-50'}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-8 bg-primary-100 rounded-full" />
                {tabs.find(t => t.id === activeTab)?.label} Configuration
              </h2>
            </div>

            <div className="flex-1 p-8 lg:p-10 overflow-y-auto">
              {activeTab === "general" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Institution Name</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                        placeholder="e.g. Excellence Academy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Official Email</label>
                      <input
                        type="email"
                        value={schoolEmail}
                        onChange={(e) => setSchoolEmail(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                        placeholder="admin@school.edu"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Contact Phone</label>
                      <input
                        type="tel"
                        value={schoolPhone}
                        onChange={(e) => setSchoolPhone(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50 appearance-none cursor-pointer"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">System Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50 appearance-none cursor-pointer"
                      >
                        <option value="en">English (US)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Physical Address</label>
                    <textarea
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                      rows={3}
                      className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50 resize-none"
                      placeholder="Enter full campus address..."
                    />
                  </div>
                </div>
              )}

              {activeTab === "academic" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Active Academic Year</label>
                      <input
                        type="text"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Current Semester</label>
                      <input
                        type="text"
                        value={currentSemester}
                        onChange={(e) => setCurrentSemester(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Grading System</label>
                      <select
                        value={gradeScale}
                        onChange={(e) => setGradeScale(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50 appearance-none cursor-pointer"
                      >
                        <option value="percentage">Percentage (0-100)</option>
                        <option value="gpa">GPA (0.0-4.0)</option>
                        <option value="letter">Letter Grade (A-F)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Passing Threshold (%)</label>
                      <input
                        type="number"
                        value={passingGrade}
                        onChange={(e) => setPassingGrade(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div className="p-8 bg-primary-50/[0.03] border border-primary-50/10 rounded-[2rem] flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary-50 shadow-sm border border-primary-50/10">
                      <IoCloudUploadOutline className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">Calendar Synchronization</h4>
                      <p className="text-xs text-gray-400 mt-1">Upload and sync the official academic calendar (.csv or .pdf)</p>
                    </div>
                    <button className="px-8 py-3 bg-white text-primary-50 border border-primary-50/20 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-50 hover:text-white transition-all">
                      Sync Documents
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-4 animate-fade-in">
                  {[
                    { id: 'email', label: 'Email Notifications', desc: 'Global SMTP delivery for student alerts', icon: <IoMailOutline />, value: emailNotifications, setter: setEmailNotifications },
                    { id: 'sms', label: 'SMS Gateway', desc: 'Critical alerts via SMS provider integration', icon: <IoNotificationsOutline />, value: smsNotifications, setter: setSmsNotifications },
                    { id: 'push', label: 'Real-time Push', desc: 'Browser & mobile application push alerts', icon: <IoNotificationsOutline />, value: pushNotifications, setter: setPushNotifications },
                    { id: 'weekly', label: 'Analytics Digest', desc: 'Weekly administrative performance reports', icon: <IoTimeOutline />, value: weeklyReports, setter: setWeeklyReports },
                  ].map((item) => (
                    <div key={item.id} className="group flex items-center justify-between p-6 bg-gray-50/50 hover:bg-white rounded-[1.5rem] border border-transparent hover:border-gray-100 transition-all">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${item.value ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20' : 'bg-white text-gray-300 shadow-sm'}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-black text-gray-900 uppercase tracking-wider">{item.label}</div>
                          <div className="text-xs font-medium text-gray-400">{item.desc}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => item.setter(!item.value)}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${item.value ? "bg-primary-50" : "bg-gray-200"}`}
                      >
                        <div className={`absolute top-1.5 left-1.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 ${item.value ? "translate-x-6 scale-110" : "scale-90"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center justify-between p-8 bg-primary-100/5 rounded-[2rem] border border-primary-100/10">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl transition-all ${twoFactorAuth ? 'bg-primary-100 text-white shadow-xl shadow-primary-100/20' : 'bg-white text-primary-100'}`}>
                        <IoShieldCheckmarkOutline />
                      </div>
                      <div>
                        <div className="text-lg font-black text-gray-900 uppercase tracking-widest">Two-Factor Authentication</div>
                        <p className="text-sm font-medium text-gray-400">Force 2FA for all administrative accounts</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                      className={`relative w-16 h-9 rounded-full transition-all duration-300 ${twoFactorAuth ? "bg-primary-100" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-1.5 left-1.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${twoFactorAuth ? "translate-x-7" : ""}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Session TTL (min)</label>
                       <input
                         type="number"
                         value={sessionTimeout}
                         onChange={(e) => setSessionTimeout(e.target.value)}
                         className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Pass Expiry (days)</label>
                       <input
                         type="number"
                         value={passwordExpiry}
                         onChange={(e) => setPasswordExpiry(e.target.value)}
                         className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Max Retries</label>
                       <input
                         type="number"
                         value={loginAttempts}
                         onChange={(e) => setLoginAttempts(e.target.value)}
                         className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-primary-100/10 text-sm font-bold transition-all border border-gray-50"
                       />
                    </div>
                  </div>
                </div>
              )}

               {activeTab === "portal" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="bg-primary-50/5 p-8 rounded-[2.5rem] border border-primary-50/10 mb-8">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-3 mb-2">
                       Role Visibility Control
                    </h3>
                    <p className="text-sm font-medium text-gray-400">Select which user roles should be visible on the Login and Registration portals.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_ROLES.map((role) => {
                      const isEnabled = enabledRoles.includes(role);
                      return (
                        <div 
                          key={role}
                          onClick={() => {
                            if (isEnabled) {
                              setEnabledRoles(enabledRoles.filter(r => r !== role));
                            } else {
                              setEnabledRoles([...enabledRoles, role]);
                            }
                          }}
                          className={`group flex items-center justify-between p-6 rounded-[1.5rem] border transition-all cursor-pointer
                            ${isEnabled 
                              ? 'bg-white border-primary-100/20 shadow-lg shadow-primary-100/5' 
                              : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200 opacity-60'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all
                              ${isEnabled ? 'bg-primary-100 text-white' : 'bg-gray-200 text-gray-400'}`}>
                              <IoPeopleOutline />
                            </div>
                            <span className={`font-black text-sm uppercase tracking-widest ${isEnabled ? 'text-gray-900' : 'text-gray-400'}`}>
                              {role}
                            </span>
                          </div>
                          
                          <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isEnabled ? "bg-primary-100" : "bg-gray-200"}`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isEnabled ? "translate-x-6" : ""}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-10 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Primary Brand Color</label>
                      <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-[1.5rem] border border-gray-50">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-16 h-16 rounded-[1.25rem] border-none bg-transparent cursor-pointer shadow-sm overflow-hidden"
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1 bg-transparent border-none text-sm font-black uppercase tracking-widest"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Accent Secondary Color</label>
                      <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-[1.5rem] border border-gray-50">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-16 h-16 rounded-[1.25rem] border-none bg-transparent cursor-pointer shadow-sm overflow-hidden"
                        />
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1 bg-transparent border-none text-sm font-black uppercase tracking-widest"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-900 rounded-[2rem] text-white flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-3xl">
                        {darkMode ? '🌙' : '☀️'}
                      </div>
                      <div>
                        <div className="text-lg font-black uppercase tracking-widest">Dark Mode Experience</div>
                        <p className="text-sm font-medium text-white/50">Switch to low-light visual theme</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative w-16 h-9 rounded-full transition-all duration-500 bg-white/20`}
                    >
                      <div className={`absolute top-1.5 left-1.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 ${darkMode ? "translate-x-7 scale-110" : ""}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSetting;

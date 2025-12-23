import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoBusOutline,
    IoCalendarOutline,
    IoCallOutline,
    IoCameraOutline,
    IoDocumentTextOutline,
    IoKeyOutline,
    IoLocationOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoRibbonOutline,
    IoSaveOutline,
    IoShieldCheckmarkOutline,
    IoSchoolOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

const TransportManagerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "professional" | "certifications" | "settings">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("https://ui-avatars.com/api/?name=Robert+Anderson&background=1e293b&color=fff&size=256");

  // Mock data - mapped from previous Transport Manager data
  const [profile, setProfile] = useState({
    firstName: "Robert",
    lastName: "Anderson",
    email: "robert.anderson@school.com",
    phone: "+1 (555) 123-4567",
    address: "123 Logistics Boulevard, North City",
    dateOfBirth: "1982-05-14",
    role: "Transport Systems Manager",
    department: "Strategic Operations / Logistics",
    employeeId: "TMS-2024-X89",
    joinDate: "2022-01-15",
    licenseNumber: "CDL-CLASS-A-88021",
    licenseExpiry: "2028-05-14",
    experience: "12 Years",
    qualifications: ["B.Sc in Logistics & Supply Chain", "Certified Fleet Manager (CFM)", "Transit Safety Specialist"],
    certifications: [
      { name: "Advanced Fleet Logistics", issuer: "International Transit Board", date: "2023-01-10", expiry: "2026-01-10" },
      { name: "Safety Compliance Officer", issuer: "National Safety Council", date: "2022-06-15", expiry: "2025-06-15" },
      { name: "Fleet Efficiency Management", issuer: "Logistics Academy", date: "2021-11-20", expiry: "2024-11-20" },
    ],
    bio: "Driving excellence in education transit. Specialized in fleet optimization, route efficiency, and strictly adhering to modern safety protocols.",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Operational profile synchronized successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: "personal", label: "Identity", icon: <IoPersonOutline className="w-5 h-5" /> },
    { id: "professional", label: "Registry", icon: <IoBriefcaseOutline className="w-5 h-5" /> },
    { id: "certifications", label: "Diplomas", icon: <IoRibbonOutline className="w-5 h-5" /> },
    { id: "settings", label: "Security", icon: <IoShieldCheckmarkOutline className="w-5 h-5" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200/50 p-3 xs:p-4 sm:p-6 lg:p-8 font-primary">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Manager Profile
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Configure operational parameters, credentials, and system security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-primary-50 to-primary-100 relative">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
            </div>

            {/* Profile Image & Info */}
            <div className="px-6 pb-6 text-center relative">
              <div className="relative inline-block -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden p-1">
                  <div className="w-full h-full rounded-full bg-primary-50 flex items-center justify-center overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => document.getElementById('profile-image-upload')?.click()}
                  className="absolute bottom-2 right-2 p-2.5 bg-primary-100 text-white rounded-full shadow-lg hover:bg-primary-50 transition-colors border-2 border-white"
                  type="button"
                >
                  <IoCameraOutline className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-primary-100 font-bold text-xs uppercase tracking-wider mb-4">{profile.role}</p>

              <div className="flex justify-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase border border-green-200">
                  In Service
                </div>
                <div className="px-3 py-1 rounded-full bg-primary-50 text-white text-[10px] font-bold uppercase border border-primary-100/20 shadow-md shadow-primary-50/20">
                  {profile.employeeId}
                </div>
              </div>

              <div className="space-y-4 text-left border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <IoMailOutline className="w-4 h-4 text-primary-100" />
                  </div>
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <IoCallOutline className="w-4 h-4 text-primary-100" />
                  </div>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <IoLocationOutline className="w-4 h-4 text-primary-100" />
                  </div>
                  <span className="leading-tight">{profile.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <IoBusOutline className="w-4 h-4 text-primary-100" />
                  </div>
                  <span>{profile.licenseNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content Tabs */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary-100 text-white shadow-lg shadow-primary-50/20"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 min-h-[500px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                  {tabs.find(t => t.id === activeTab)?.label} Parameters
                </h3>
                <p className="text-sm text-gray-400 font-medium mt-1">Configure your system profile information</p>
              </div>
              {activeTab !== "settings" && activeTab !== "certifications" && (
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    isEditing
                      ? "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <IoSaveOutline className="w-4 h-4" />
                      Commit Changes
                    </>
                  ) : (
                    "Modify Details"
                  )}
                </button>
              )}
            </div>

            {activeTab === "personal" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Interface</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Frequency</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Geographic Base</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Origin</label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Personal Brief</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">System Index ID</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold flex items-center justify-between">
                       {profile.employeeId}
                       <IoSchoolOutline className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Designation</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold flex items-center justify-between">
                       {profile.role}
                       <IoBriefcaseOutline className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Registry Sector</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold flex items-center justify-between">
                       {profile.department}
                       <IoLocationOutline className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Activation Date</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold flex items-center justify-between">
                       {profile.joinDate}
                       <IoCalendarOutline className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">License Registry</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold flex items-center justify-between">
                       {profile.licenseNumber}
                       <IoDocumentTextOutline className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Credential Expiry</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold flex items-center justify-between">
                       {profile.licenseExpiry}
                       <IoCalendarOutline className="text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Active Tenure</label>
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50/10 outline-none transition-all disabled:opacity-60 text-gray-700 font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Core Qualifications</label>
                    <div className="flex flex-wrap gap-2 p-6 rounded-[2rem] border-2 border-dashed border-gray-100 bg-gray-50/30 min-h-[100px] items-center">
                      {profile.qualifications.map((qual, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-wider text-gray-700 shadow-sm border-b-4 hover:border-primary-100 transition-colors cursor-default">
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "certifications" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 gap-6">
                  {profile.certifications.map((cert, idx) => (
                    <div key={idx} className="p-8 rounded-[2rem] border border-gray-100 hover:border-primary-100/30 hover:shadow-2xl hover:shadow-primary-50/10 transition-all duration-500 bg-gradient-to-br from-white to-gray-50/30 group">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                        <div className="flex items-start gap-5">
                          <div className="p-4 rounded-2xl bg-primary-100 text-white shadow-lg shadow-primary-50/30 group-hover:scale-110 transition-transform duration-500">
                            <IoRibbonOutline className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-gray-800 mb-1 tracking-tight">{cert.name}</h4>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{cert.issuer}</p>
                          </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                          new Date(cert.expiry) > new Date() 
                            ? "bg-green-50 text-green-600 border-green-200" 
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}>
                          {new Date(cert.expiry) > new Date() ? "Active" : "Expired"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8 mt-6 pt-8 border-t border-gray-100">
                        <div className="space-y-1">
                          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Initialization</div>
                          <div className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                            {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="space-y-1 text-right sm:text-left">
                          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Termination</div>
                          <div className="text-sm font-bold text-gray-700 flex items-center gap-2 justify-end sm:justify-start">
                            <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                            {new Date(cert.expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-12 animate-fadeIn max-w-2xl">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-4">Security Matrix</h4>
                  <div className="group flex flex-col sm:flex-row items-center justify-between p-8 rounded-[2rem] border border-gray-100 hover:border-primary-100/20 hover:bg-gray-50/50 transition-all gap-6">
                    <div className="flex items-center gap-6 text-center sm:text-left">
                      <div className="p-4 rounded-2xl bg-orange-100 text-orange-600 shadow-lg shadow-orange-500/5 group-hover:scale-110 transition-transform">
                        <IoKeyOutline className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="font-black text-gray-800 text-lg tracking-tight">Master Sequence</div>
                        <div className="text-sm text-gray-400 font-medium">Update account primary credentials</div>
                      </div>
                    </div>
                    <button className="px-8 py-3 bg-white text-orange-600 border border-orange-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-orange-500/10">
                      Rotate
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-4">Dispatch Protocols</h4>
                  <div className="group flex flex-col sm:flex-row items-center justify-between p-8 rounded-[2rem] border border-gray-100 hover:border-primary-100/20 hover:bg-gray-50/50 transition-all gap-6">
                    <div className="flex items-center gap-6 text-center sm:text-left">
                      <div className="p-4 rounded-2xl bg-primary-100/10 text-primary-100 shadow-lg shadow-primary-500/5 group-hover:scale-110 transition-transform">
                        <IoNotificationsOutline className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="font-black text-gray-800 text-lg tracking-tight">Dispatch Summaries</div>
                        <div className="text-sm text-gray-400 font-medium">Receive daily operational telemetry</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer p-2">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500 shadow-inner"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-12 text-center">
                   <button className="flex items-center justify-center gap-3 w-full py-5 bg-red-50 text-red-500 rounded-[2rem] border border-red-100 font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10">
                      Terminate Access Session
                   </button>
                   <p className="text-[10px] text-gray-400 mt-4 font-black uppercase tracking-widest">Protocol Version 4.8.2-TMS</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportManagerProfile;

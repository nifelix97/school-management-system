import React, { useRef, useState } from "react";
import {
    IoCallOutline,
    IoCameraOutline,
    IoGlobeOutline,
    IoKeyOutline,
    IoLocationOutline,
    IoLockClosedOutline,
    IoLogOutOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSaveOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

const SuperAdminProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "system">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock super admin data
  const [adminData, setAdminData] = useState({
    firstName: "Root",
    lastName: "Admin",
    email: "super.admin@sanverse.edu",
    phone: "+250 788 000 000",
    address: "Global Headquarters, Kigali",
    dateOfBirth: "1990-01-01",
    joinDate: "2024-01-01",
    role: "Global Systems Director",
    department: "Executive Control",
    adminId: "SA-ROOT-001",
    privilegeLevel: "Level 10 (Maximum)",
  });

  const [securityLogs] = useState([
    { id: 1, event: "Successful Login", device: "Desktop (Kigali)", time: "2 mins ago", ip: "197.243.12.45" },
    { id: 2, event: "Password Changed", device: "System Console", time: "1 week ago", ip: "Internal" },
    { id: 3, event: "2FA Verified", device: "Mobile (iOS)", time: "2 weeks ago", ip: "197.243.15.89" },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement API call
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-50 tracking-tight">Root Profile</h1>
        <p className="text-gray-500 mt-1">Manage global administrative access and security protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="relative inline-block mb-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-primary-50 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {adminData.firstName[0]}{adminData.lastName[0]}
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <button
                onClick={handleImageUpload}
                className="absolute -bottom-2 -right-2 bg-primary-100 text-white p-2.5 rounded-xl hover:scale-110 transition-transform shadow-lg border-2 border-white"
              >
                <IoCameraOutline className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-primary-50">{adminData.firstName} {adminData.lastName}</h2>
            <p className="text-sm font-semibold text-primary-100 mb-4">{adminData.role}</p>
            <div className="flex flex-col gap-2">
                <span className="bg-primary-50/5 text-primary-50 text-xs font-bold py-2 rounded-lg border border-primary-50/10">
                    ID: {adminData.adminId}
                </span>
                <span className="bg-green-50 text-green-600 text-xs font-bold py-2 rounded-lg border border-green-100">
                    {adminData.privilegeLevel}
                </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-hidden">
            {[
              { id: "personal", label: "Personal Information", icon: <IoPersonOutline /> },
              { id: "security", label: "Security Protocols", icon: <IoShieldCheckmarkOutline /> },
              { id: "system", label: "System Audit", icon: <IoGlobeOutline /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" 
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
            <div className="mt-4 p-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                    <IoLogOutOutline className="text-lg" />
                    Terminate Sessions
                </button>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary-50 capitalize">
                {activeTab === "personal" ? "Administrative Records" : 
                 activeTab === "security" ? "Access Control" : "System Activity Audit"}
              </h2>
              {activeTab === "personal" && (
                !isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="bg-primary-100 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all">
                        Edit Records
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="bg-primary-100 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
                            <IoSaveOutline /> Save
                        </button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-600 px-5 py-2 rounded-xl text-sm font-bold">
                            Cancel
                        </button>
                    </div>
                )
              )}
            </div>

            <div className="p-8">
              {activeTab === "personal" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <Input label="Global Admin Code" value={adminData.adminId} disabled />
                  <Input label="System Privilege" value={adminData.privilegeLevel} disabled />
                  <Input
                    label="First Name"
                    value={adminData.firstName}
                    onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                    disabled={!isEditing}
                    leftIcon={<IoPersonOutline />}
                  />
                  <Input
                    label="Last Name"
                    value={adminData.lastName}
                    onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                    disabled={!isEditing}
                    leftIcon={<IoPersonOutline />}
                  />
                  <Input
                    label="Control Email"
                    value={adminData.email}
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                    disabled={!isEditing}
                    leftIcon={<IoMailOutline />}
                  />
                  <Input
                    label="Encrypted Phone"
                    value={adminData.phone}
                    onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                    disabled={!isEditing}
                    leftIcon={<IoCallOutline />}
                  />
                  <div className="md:col-span-2">
                    <Input
                        label="Primary Deployment Address"
                        value={adminData.address}
                        onChange={(e) => setAdminData({ ...adminData, address: e.target.value })}
                        disabled={!isEditing}
                        leftIcon={<IoLocationOutline />}
                    />
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-bold text-primary-50 mb-4 flex items-center gap-2"><IoKeyOutline /> Global Password</h3>
                        <p className="text-xs text-gray-500 mb-4">Rotate your administrative key every 30 days for compliance.</p>
                        <button className="bg-white border border-gray-200 text-primary-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white shadow-sm transition-all">
                            Initialize Key Rotation
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-bold text-primary-50 mb-4 flex items-center gap-2"><IoLockClosedOutline /> Hardware Security</h3>
                        <p className="text-xs text-gray-500 mb-4">Manage YubiKey and Titan security key assignments.</p>
                        <button className="bg-white border border-gray-200 text-primary-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white shadow-sm transition-all">
                            Register New Key
                        </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-primary-50 px-2">System Guard Settings</h3>
                    {[
                      { title: "Quantum-Safe Encryption", desc: "Enable AES-256-GCM for all session data", active: true },
                      { title: "IP Whitelisting", desc: "Only allow access from authorized HQ ranges", active: true },
                      { title: "Auto-Revoke", desc: "Instantly sign out if inactive for 15 minutes", active: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                        <div>
                          <p className="text-sm font-bold text-gray-700">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={item.active} className="sr-only peer" readOnly />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-100 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "system" && (
                <div className="space-y-6">
                   <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Event Detail</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Origin</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Activity</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {securityLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <p className="text-sm font-bold text-primary-50">{log.event}</p>
                                <p className="text-xs text-gray-400 font-mono">{log.ip}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600 font-medium">{log.device}</span>
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><IoTimeOutline /> {log.time}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-xs font-bold text-primary-50 underline">Details</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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

export default SuperAdminProfile;

import React from "react";
import {
    IoCallOutline,
    IoCameraOutline,
    IoLocationOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSettingsOutline
} from "react-icons/io5";

import { useState } from "react";
import {
    IoCheckmarkCircleOutline,
    IoCloseOutline
} from "react-icons/io5";

const HRProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean, msg: string }>({ show: false, msg: "" });

  const [profile, setProfile] = useState({
    name: "Jane Smith",
    fullName: "Jane Doe Smith",
    role: "Head of Human Resources",
    email: "jane.smith@school.edu",
    personalEmail: "jane@example.com",
    phone: "+256 701 234567",
    address: "Block A, Admin Office",
    personalAddress: "Bunga Road, Kampala",
    nationality: "Ugandan"
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    showNotify("Profile updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    showNotify("Password changed securely!");
  };

  const showNotify = (msg: string) => {
    setNotification({ show: true, msg });
    setTimeout(() => setNotification({ show: false, msg: "" }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 relative">
       {/* Global Notification */}
       {notification.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-300">
           <div className="bg-primary-50 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
              <IoCheckmarkCircleOutline className="text-2xl" />
              <span>{notification.msg}</span>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-50 tracking-tight">HR Profile</h1>
        <p className="text-primary-50/40 font-bold uppercase text-[10px] tracking-widest mt-1">Manage personal information and account security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-r from-primary-50/10 to-primary-100/10"></div>
            <div className="px-6 pb-8 -mt-16 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-3xl border-4 border-white bg-primary-50 flex items-center justify-center text-white text-4xl font-black shadow-2xl transform group-hover:rotate-3 transition-transform">
                  JS
                </div>
                <button className="absolute bottom-0 right-0 p-2.5 bg-white text-primary-50 rounded-xl shadow-xl hover:bg-primary-50 hover:text-white transition-all active:scale-95 border-2 border-white">
                  <IoCameraOutline size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-black text-primary-50">{profile.name}</h2>
              <p className="text-[10px] font-black text-primary-50/30 uppercase tracking-widest mt-1">{profile.role}</p>
              
              <div className="mt-8 flex flex-col gap-2 text-left">
                <div className="flex items-center gap-3 text-primary-50/60 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                  <IoMailOutline className="text-primary-50/20" />
                  <span className="text-xs font-bold leading-none">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-primary-50/60 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                  <IoCallOutline className="text-primary-50/20" />
                  <span className="text-xs font-bold leading-none">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-primary-50/60 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                  <IoLocationOutline className="text-primary-50/20" />
                  <span className="text-xs font-bold leading-none">{profile.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 group hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-xl font-black text-primary-50">Personal Information</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-[10px] font-black text-primary-50 uppercase tracking-widest hover:bg-primary-50 hover:text-white px-4 py-2 rounded-xl transition-all border border-primary-50/10 active:scale-95"
              >
                Edit Details
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 ml-1">Full Legal Name</p>
                <div className="bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-100/50">
                  <p className="text-sm font-bold text-primary-50">{profile.fullName}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 ml-1">Personal Email</p>
                <div className="bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-100/50">
                  <p className="text-sm font-bold text-primary-50">{profile.personalEmail}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 ml-1">Residential Address</p>
                <div className="bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-100/50">
                  <p className="text-sm font-bold text-primary-50">{profile.personalAddress}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 ml-1">Nationality</p>
                <div className="bg-gray-50/50 px-4 py-3 rounded-2xl border border-gray-100/50">
                  <p className="text-sm font-bold text-primary-50">{profile.nationality}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 group hover:shadow-md transition-shadow">
            <h3 className="text-xl font-black text-primary-50 mb-8">Account Security</h3>
            <div className="space-y-4">
              <div 
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:bg-gray-50/50 transition-all cursor-pointer group/item hover:border-primary-50/20 bg-gray-50/30"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-50/5 rounded-2xl text-primary-50 group-hover/item:bg-primary-50 group-hover/item:text-white transition-all">
                    <IoSettingsOutline size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-primary-50 text-sm tracking-tight leading-none mb-1">Change Password</h4>
                    <p className="text-[10px] font-bold text-primary-50/30 uppercase tracking-tighter">Security last updated 3 months ago</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary-50 group-hover/item:bg-primary-50 group-hover/item:text-white shadow-sm transition-all group-hover/item:translate-x-1">
                  →
                </div>
              </div>

              <div className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl bg-gray-50/30">
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-2xl transition-all ${is2FAEnabled ? 'bg-green-500 text-white shadow-lg' : 'bg-primary-50/5 text-primary-50'}`}>
                    <IoPersonOutline size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-primary-50 text-sm tracking-tight leading-none mb-1">Two-Factor Authentication</h4>
                    <p className="text-[10px] font-bold text-primary-50/30 uppercase tracking-tighter">{is2FAEnabled ? 'Account fully secured' : 'Enhance your account security'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIs2FAEnabled(!is2FAEnabled);
                    showNotify(is2FAEnabled ? "2FA Disabled" : "2FA Enabled Successfully!");
                  }}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm ${is2FAEnabled ? 'bg-red-50 text-red-500 border border-red-500/20' : 'bg-primary-50 text-white shadow-primary-50/20'}`}
                >
                  {is2FAEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-10 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-primary-50 mb-1">Edit Profile</h2>
                <p className="text-sm text-primary-50/40 font-medium tracking-tight">Keep your information up to date.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-primary-50 transition-colors bg-gray-50 p-2 rounded-full">
                <IoCloseOutline size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="p-10 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Full Legal Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-5 py-4 rounded-3xl bg-gray-50 border-none focus:ring-4 focus:ring-primary-50/10 font-bold text-primary-50 text-sm transition-all"
                  value={profile.fullName}
                  onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Personal Email</label>
                <input
                  required
                  type="email"
                  className="w-full px-5 py-4 rounded-3xl bg-gray-50 border-none focus:ring-4 focus:ring-primary-50/10 font-bold text-primary-50 text-sm transition-all"
                  value={profile.personalEmail}
                  onChange={e => setProfile({ ...profile, personalEmail: e.target.value })}
                />
              </div>

              <div className="space-y-1 pb-4">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Residential Address</label>
                <input
                  required
                  type="text"
                  className="w-full px-5 py-4 rounded-3xl bg-gray-50 border-none focus:ring-4 focus:ring-primary-50/10 font-bold text-primary-50 text-sm transition-all"
                  value={profile.personalAddress}
                  onChange={e => setProfile({ ...profile, personalAddress: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 rounded-3xl bg-primary-50 text-white text-xs font-black hover:bg-primary-100 transition-all shadow-xl shadow-primary-50/20 active:scale-95 uppercase tracking-widest"
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-10 border-b border-gray-100">
              <h2 className="text-2xl font-black text-primary-50 mb-1">Update Password</h2>
              <p className="text-sm text-primary-50/40 font-medium tracking-tight">Ensure your account stays secure.</p>
            </div>
            
            <form onSubmit={handlePasswordChange} className="p-10 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">New Password</label>
                <input
                  required
                  type="password"
                  className="w-full px-5 py-4 rounded-3xl bg-gray-50 border-none focus:ring-4 focus:ring-primary-50/10 font-bold text-primary-50 text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1 pb-4">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Confirm Password</label>
                <input
                  required
                  type="password"
                  className="w-full px-5 py-4 rounded-3xl bg-gray-50 border-none focus:ring-4 focus:ring-primary-50/10 font-bold text-primary-50 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-5 rounded-3xl text-primary-50/30 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 rounded-3xl bg-primary-50 text-white text-[10px] font-black hover:bg-primary-100 transition-all shadow-xl shadow-primary-50/20 active:scale-95 uppercase tracking-widest"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRProfile;

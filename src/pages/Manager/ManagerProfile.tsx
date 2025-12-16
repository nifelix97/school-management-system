import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoCallOutline,
    IoCameraOutline,
    IoKeyOutline,
    IoLocationOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoSaveOutline,
    IoShieldCheckmarkOutline
} from "react-icons/io5";

const ManagerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "professional" | "settings">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=Manager");

  // Mock data for Manager
  const [profile, setProfile] = useState({
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Admin Block, Campus City",
    dateOfBirth: "1980-05-15",
    role: "Operations Manager",
    department: "Administration",
    employeeId: "MGR-2015-001",
    joinDate: "2015-08-01",
    status: "Active",
    bio: "Experienced operations manager with a focus on efficiency and student welfare.",
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, send api request here
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
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
    { id: "personal", label: "Personal Info", icon: <IoPersonOutline className="w-5 h-5" /> },
    { id: "professional", label: "Professional", icon: <IoBriefcaseOutline className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <IoShieldCheckmarkOutline className="w-5 h-5" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          My Profile
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-primary-50 to-primary-100 relative">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
            </div>

            {/* Profile Image & Info */}
            <div className="px-6 pb-6 text-center relative">
              <div className="relative inline-block -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-200 overflow-hidden">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
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
                  className="absolute bottom-2 right-2 p-2 bg-primary-50 text-white rounded-full shadow-lg hover:bg-primary-100 transition-colors"
                  type="button"
                >
                  <IoCameraOutline className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-primary-50 mb-1">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-primary-50/60 font-medium mb-4">{profile.role}</p>

              <div className="flex justify-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-200">
                  {profile.status}
                </div>
                <div className="px-3 py-1 rounded-full bg-primary-100/10 text-primary-100 text-xs font-semibold border border-primary-100/20">
                  {profile.employeeId}
                </div>
              </div>

              <div className="space-y-3 text-left border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm text-primary-50/80">
                  <IoMailOutline className="w-5 h-5 text-primary-100" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary-50/80">
                  <IoCallOutline className="w-5 h-5 text-primary-100" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary-50/80">
                  <IoLocationOutline className="w-5 h-5 text-primary-100" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content Tabs */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary-50 text-white shadow-md"
                    : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary-50">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              {activeTab !== "settings" && (
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    isEditing
                      ? "bg-primary-50 text-white hover:bg-primary-100"
                      : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <IoSaveOutline className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    "Edit Details"
                  )}
                </button>
              )}
            </div>

            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">First Name</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Last Name</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Date of Birth</label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Employee ID</label>
                    <input
                      type="text"
                      value={profile.employeeId}
                      disabled={true}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Department</label>
                    <input
                      type="text"
                      value={profile.department}
                      disabled={true}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Role</label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled={true}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Date Joined</label>
                    <input
                      type="date"
                      value={profile.joinDate}
                      disabled={true}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-primary-50 border-b border-gray-100 pb-2">Security</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary-50/10 text-primary-50">
                        <IoKeyOutline className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">Change Password</div>
                        <div className="text-sm text-primary-50/60">Update your account password</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-primary-50 hover:bg-primary-50/5 rounded-lg transition-colors">
                      Update
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-bold text-primary-50 border-b border-gray-100 pb-2">Notifications</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary-100/10 text-primary-100">
                        <IoNotificationsOutline className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">Email Alerts</div>
                        <div className="text-sm text-primary-50/60">Receive weekly summary of reports</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-50/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-50"></div>
                    </label>
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

export default ManagerProfile;

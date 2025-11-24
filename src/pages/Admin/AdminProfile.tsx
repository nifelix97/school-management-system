import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCallOutline,
    IoCameraOutline,
    IoKeyOutline,
    IoLocationOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoSaveOutline,
    IoShieldCheckmarkOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

const AdminProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "preferences">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Mock admin data
  const [adminData, setAdminData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@school.edu",
    phone: "+250 788 123 456",
    address: "Kigali, Rwanda",
    dateOfBirth: "1985-03-15",
    joinDate: "2020-01-10",
    role: "System Administrator",
    department: "Administration",
    employeeId: "ADM-2020-001",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
  });

  const handleSave = () => {
    console.log("Saving profile data:", adminData);
    setIsEditing(false);
    // TODO: Implement API call to save data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form to original data
  };

  const handleImageUpload = () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to server
      console.log('Uploading image:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Admin Profile
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-4 sm:p-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 mb-6">
            {/* Profile Image */}
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary-50 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
                  {adminData.firstName[0]}{adminData.lastName[0]}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleImageUpload}
                className="absolute bottom-0 right-0 bg-primary-100 text-white p-2 rounded-full hover:opacity-90 transition-opacity shadow-lg"
                title="Upload photo"
              >
                <IoCameraOutline className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-1">
                {adminData.firstName} {adminData.lastName}
              </h2>
              <p className="text-sm sm:text-base text-primary-50/70 mb-2">
                {adminData.role}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-primary-50/60">
                <span className="flex items-center gap-1">
                  <IoMailOutline className="w-4 h-4" />
                  {adminData.email}
                </span>
                <span className="flex items-center gap-1">
                  <IoCallOutline className="w-4 h-4" />
                  {adminData.phone}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="w-full md:w-auto">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full md:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={handleSave}
                    className="flex-1 md:flex-none px-4 py-2 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
                  >
                    <IoSaveOutline className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 md:flex-none px-4 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mb-px">
              <button
                onClick={() => setActiveTab("personal")}
                className={`px-3 xs:px-4 sm:px-6 py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "personal"
                    ? "text-primary-100 border-b-2 border-primary-100"
                    : "text-primary-50/60 hover:text-primary-50"
                }`}
              >
                <span className="hidden xs:inline">Personal Information</span>
                <span className="xs:hidden">Personal</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-3 xs:px-4 sm:px-6 py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "security"
                    ? "text-primary-100 border-b-2 border-primary-100"
                    : "text-primary-50/60 hover:text-primary-50"
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`px-3 xs:px-4 sm:px-6 py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "preferences"
                    ? "text-primary-100 border-b-2 border-primary-100"
                    : "text-primary-50/60 hover:text-primary-50"
                }`}
              >
                Preferences
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* First Name */}
                <Input
                  label="First Name"
                  type="text"
                  value={adminData.firstName}
                  onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<IoPersonOutline className="w-4 h-4" />}
                />

                {/* Last Name */}
                <Input
                  label="Last Name"
                  type="text"
                  value={adminData.lastName}
                  onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<IoPersonOutline className="w-4 h-4" />}
                />

                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<IoMailOutline className="w-4 h-4" />}
                />

                {/* Phone */}
                <Input
                  label="Phone Number"
                  type="tel"
                  value={adminData.phone}
                  onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<IoCallOutline className="w-4 h-4" />}
                />

                {/* Address */}
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    type="text"
                    value={adminData.address}
                    onChange={(e) => setAdminData({ ...adminData, address: e.target.value })}
                    disabled={!isEditing}
                    leftIcon={<IoLocationOutline className="w-4 h-4" />}
                  />
                </div>

                {/* Date of Birth */}
                <Input
                  label="Date of Birth"
                  type="text"
                  value={adminData.dateOfBirth}
                  onChange={(e) => setAdminData({ ...adminData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<IoCalendarOutline className="w-4 h-4" />}
                  placeholder="YYYY-MM-DD"
                />

                {/* Employee ID */}
                <Input
                  label="Employee ID"
                  type="text"
                  value={adminData.employeeId}
                  disabled
                />

                {/* Department */}
                <Input
                  label="Department"
                  type="text"
                  value={adminData.department}
                  disabled
                />

                {/* Join Date */}
                <Input
                  label="Join Date"
                  type="text"
                  value={adminData.joinDate}
                  disabled
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoKeyOutline className="w-5 h-5" />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    showPasswordToggle
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    showPasswordToggle
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                    showPasswordToggle
                  />
                  <button className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="w-5 h-5" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  {/* Two-Factor Auth */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <div className="text-sm sm:text-base font-medium text-primary-50">
                        Two-Factor Authentication
                      </div>
                      <div className="text-xs sm:text-sm text-primary-50/60">
                        Add an extra layer of security
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>

                  {/* Login Alerts */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm sm:text-base font-medium text-primary-50">
                        Login Alerts
                      </div>
                      <div className="text-xs sm:text-sm text-primary-50/60">
                        Get notified of new login attempts
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, loginAlerts: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              {/* Notification Preferences */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoNotificationsOutline className="w-5 h-5" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <div className="text-sm sm:text-base font-medium text-primary-50">
                        Email Notifications
                      </div>
                      <div className="text-xs sm:text-sm text-primary-50/60">
                        Receive updates via email
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.emailNotifications}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, emailNotifications: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm sm:text-base font-medium text-primary-50">
                        SMS Notifications
                      </div>
                      <div className="text-xs sm:text-sm text-primary-50/60">
                        Receive updates via SMS
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.smsNotifications}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, smsNotifications: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

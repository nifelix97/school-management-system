import React, { useState } from "react";
import {
    IoCheckmarkOutline,
    IoCloudUploadOutline,
    IoGlobeOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoSaveOutline,
    IoSchoolOutline,
    IoSettingsOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
} from "react-icons/io5";

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

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    // Simulate saving settings
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoSettingsOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              System Settings
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Configure and manage your school management system
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
          >
            <IoSaveOutline className="w-5 h-5" />
            Save All Changes
          </button>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mt-4 p-4 bg-primary-100/10 border border-primary-100 rounded-lg flex items-center gap-2 text-primary-100">
            <IoCheckmarkOutline className="w-5 h-5" />
            <span className="text-sm font-medium">Settings saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 flex items-center gap-2">
            <IoSchoolOutline className="w-5 h-5 text-primary-100" />
            General Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                School Email
              </label>
              <input
                type="email"
                value={schoolEmail}
                onChange={(e) => setSchoolEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={schoolPhone}
                onChange={(e) => setSchoolPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Address
              </label>
              <textarea
                value={schoolAddress}
                onChange={(e) => setSchoolAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Settings */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 flex items-center gap-2">
            <IoGlobeOutline className="w-5 h-5 text-primary-100" />
            Academic Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Current Semester
              </label>
              <input
                type="text"
                value={currentSemester}
                onChange={(e) => setCurrentSemester(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Grading Scale
              </label>
              <select
                value={gradeScale}
                onChange={(e) => setGradeScale(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              >
                <option value="percentage">Percentage (0-100)</option>
                <option value="gpa">GPA (0.0-4.0)</option>
                <option value="letter">Letter Grade (A-F)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Passing Grade (%)
              </label>
              <input
                type="number"
                value={passingGrade}
                onChange={(e) => setPassingGrade(e.target.value)}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
            </div>

            <div className="p-4 bg-primary-50/5 rounded-lg border border-primary-50/20">
              <h3 className="text-sm font-medium text-primary-50 mb-2">Academic Calendar</h3>
              <button className="w-full px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors text-sm font-medium">
                <IoCloudUploadOutline className="w-4 h-4 inline mr-2" />
                Upload Academic Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 flex items-center gap-2">
            <IoNotificationsOutline className="w-5 h-5 text-primary-100" />
            Notification Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <IoMailOutline className="w-5 h-5 text-primary-50/60" />
                <div>
                  <div className="text-sm font-medium text-primary-50">Email Notifications</div>
                  <div className="text-xs text-primary-50/60">Receive updates via email</div>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? "bg-primary-50" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    emailNotifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <IoNotificationsOutline className="w-5 h-5 text-primary-50/60" />
                <div>
                  <div className="text-sm font-medium text-primary-50">SMS Notifications</div>
                  <div className="text-xs text-primary-50/60">Receive updates via SMS</div>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  smsNotifications ? "bg-primary-50" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    smsNotifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <IoNotificationsOutline className="w-5 h-5 text-primary-50/60" />
                <div>
                  <div className="text-sm font-medium text-primary-50">Push Notifications</div>
                  <div className="text-xs text-primary-50/60">Browser push notifications</div>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  pushNotifications ? "bg-primary-50" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    pushNotifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <IoTimeOutline className="w-5 h-5 text-primary-50/60" />
                <div>
                  <div className="text-sm font-medium text-primary-50">Weekly Reports</div>
                  <div className="text-xs text-primary-50/60">Receive weekly summary reports</div>
                </div>
              </div>
              <button
                onClick={() => setWeeklyReports(!weeklyReports)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  weeklyReports ? "bg-primary-50" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    weeklyReports ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 flex items-center gap-2">
            <IoShieldCheckmarkOutline className="w-5 h-5 text-primary-100" />
            Security Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-primary-50">Two-Factor Authentication</div>
                <div className="text-xs text-primary-50/60">Add extra security layer</div>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  twoFactorAuth ? "bg-primary-50" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    twoFactorAuth ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                min="5"
                max="120"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
              <p className="text-xs text-primary-50/60 mt-1">
                Users will be logged out after this period of inactivity
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={passwordExpiry}
                onChange={(e) => setPasswordExpiry(e.target.value)}
                min="30"
                max="365"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
              <p className="text-xs text-primary-50/60 mt-1">
                Users must change password after this period
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={loginAttempts}
                onChange={(e) => setLoginAttempts(e.target.value)}
                min="3"
                max="10"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
              />
              <p className="text-xs text-primary-50/60 mt-1">
                Account locked after this many failed attempts
              </p>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 flex items-center gap-2">
            <IoSettingsOutline className="w-5 h-5 text-primary-100" />
            Appearance Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Secondary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                />
              </div>
            </div>

            <div className="flex items-end">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg w-full">
                <div>
                  <div className="text-sm font-medium text-primary-50">Dark Mode</div>
                  <div className="text-xs text-primary-50/60">Enable dark theme</div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    darkMode ? "bg-primary-50" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      darkMode ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button (Mobile) */}
      <div className="mt-6 sm:hidden">
        <button
          onClick={handleSaveSettings}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
        >
          <IoSaveOutline className="w-5 h-5" />
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default SystemSetting;

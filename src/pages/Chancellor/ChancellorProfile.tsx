import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoCallOutline,
    IoCameraOutline,
    IoGlobeOutline,
    IoKeyOutline,
    IoLocationOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoSaveOutline,
    IoSchoolOutline,
    IoShieldCheckmarkOutline,
    IoTrophyOutline,
} from "react-icons/io5";

const ChancellorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "professional" | "achievements" | "settings">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("https://ui-avatars.com/api/?name=Dr+Michael+Anderson&background=1e3a8a&color=fff&size=256");

  // Mock data - in a real app, this would come from an API
  const [profile, setProfile] = useState({
    firstName: "Dr. Michael",
    lastName: "Anderson",
    email: "m.anderson@university.edu",
    phone: "+1 (555) 987-6543",
    address: "University Administration Building, Campus City, ST 12345",
    dateOfBirth: "1968-03-22",
    role: "Vice Chancellor",
    department: "Office of the Vice Chancellor",
    employeeId: "VC-2015-001",
    joinDate: "2015-01-15",
    qualifications: [
      "PhD in Educational Leadership",
      "Master of Business Administration",
      "Bachelor of Science in Engineering"
    ],
    specialization: "Higher Education Management & Strategic Planning",
    bio: "Visionary academic leader with over 25 years of experience in higher education administration. Committed to fostering academic excellence, promoting research innovation, and building strategic international partnerships. Passionate about quality assurance and institutional development.",
    researchInterests: "Higher Education Policy, Quality Assurance, International Collaborations",
    publications: 45,
    conferences: 32,
    yearsOfExperience: 28,
  });

  const achievements = [
    {
      title: "QS World University Rankings Improvement",
      description: "Led strategic initiatives that improved university ranking by 50 positions",
      year: "2023",
      icon: <IoTrophyOutline className="w-6 h-6" />,
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "International Partnerships",
      description: "Established 25+ partnerships with leading universities worldwide",
      year: "2022",
      icon: <IoGlobeOutline className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Research Excellence Award",
      description: "Recognized for outstanding contribution to research development",
      year: "2021",
      icon: <IoSchoolOutline className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Accreditation Success",
      description: "Achieved full accreditation for all academic programs",
      year: "2020",
      icon: <IoShieldCheckmarkOutline className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
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
    { id: "personal", label: "Personal Info", icon: <IoPersonOutline /> },
    { id: "professional", label: "Professional", icon: <IoBriefcaseOutline /> },
    { id: "achievements", label: "Achievements", icon: <IoTrophyOutline /> },
    { id: "settings", label: "Settings", icon: <IoShieldCheckmarkOutline /> },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24 animate-[slideUp_0.6s_ease-out]">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-primary-50 to-primary-100 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
            </div>

            {/* Profile Image & Info */}
            <div className="px-6 pb-6 text-center relative">
              <div className="relative inline-block -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden">
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
                  className="absolute bottom-2 right-2 p-2 bg-primary-50 text-white rounded-full shadow-lg hover:bg-primary-100 transition-all hover:scale-110"
                  type="button"
                >
                  <IoCameraOutline className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-primary-50 mb-1">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-primary-50/60 font-medium mb-4">{profile.role}</p>

              <div className="flex justify-center gap-3 mb-6 flex-wrap">
                <div className="px-3 py-1 rounded-full bg-primary-50/10 text-primary-50 text-xs font-semibold border border-primary-50/20">
                  Active
                </div>
                <div className="px-3 py-1 rounded-full bg-primary-100/10 text-primary-100 text-xs font-semibold border border-primary-100/20">
                  {profile.employeeId}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-50">{profile.publications}</div>
                  <div className="text-xs text-primary-50/60">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-100">{profile.conferences}</div>
                  <div className="text-xs text-primary-50/60">Conferences</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-200">{profile.yearsOfExperience}</div>
                  <div className="text-xs text-primary-50/60">Years Exp.</div>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm text-primary-50/80">
                  <IoMailOutline className="w-5 h-5 text-primary-100 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-primary-50/80">
                  <IoCallOutline className="w-5 h-5 text-primary-100 flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-primary-50/80">
                  <IoLocationOutline className="w-5 h-5 text-primary-100 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{profile.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content Tabs */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto animate-[slideUp_0.7s_ease-out]">
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 animate-[scaleIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary-50">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              {activeTab !== "settings" && activeTab !== "achievements" && (
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    isEditing
                      ? "bg-primary-50 text-white hover:bg-primary-100 shadow-md"
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
                    <label className="text-sm font-semibold text-primary-50/80">Role / Designation</label>
                    <input
                      type="text"
                      value={profile.role}
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
                    <label className="text-sm font-semibold text-primary-50/80">Date Joined</label>
                    <input
                      type="date"
                      value={profile.joinDate}
                      disabled={true}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Specialization</label>
                    <input
                      type="text"
                      value={profile.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Research Interests</label>
                    <input
                      type="text"
                      value={profile.researchInterests}
                      onChange={(e) => handleInputChange('researchInterests', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Qualifications</label>
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50/50 min-h-[60px]">
                      {profile.qualifications.map((qual, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-primary-50 shadow-sm">
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="group p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} text-white shadow-md flex-shrink-0`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-base font-bold text-primary-50">{achievement.title}</h4>
                          <span className="px-2 py-0.5 bg-primary-50/10 text-primary-50 rounded-full text-xs font-semibold">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-sm text-primary-50/70">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-primary-50 border-b border-gray-100 pb-2">Security</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary-50/30 transition-all">
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
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary-50/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary-100/10 text-primary-100">
                        <IoNotificationsOutline className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">Email Notifications</div>
                        <div className="text-sm text-primary-50/60">Receive daily summaries and alerts</div>
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

export default ChancellorProfile;

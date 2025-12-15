import React, { useState } from "react";
import { IoCameraOutline, IoSaveOutline } from "react-icons/io5";

const DeanProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Michael",
    lastName: "Thompson",
    email: "dean.thompson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "School of Engineering",
    office: "Building A, Room 304",
    bio: "Professor Michael Thompson has over 20 years of experience in higher education administration...",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary-50">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing
              ? "bg-primary-50 text-white hover:bg-primary-50/90"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {isEditing ? (
            <>
              <IoSaveOutline /> Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Photo */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 font-bold overflow-hidden border-4 border-white shadow-lg">
                MT
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-primary-50 text-white rounded-full shadow-md hover:bg-primary-50/90 transition-colors">
                  <IoCameraOutline className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-primary-50">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-primary-50 font-medium">{profile.department}</p>
            <p className="text-gray-500 text-sm mt-1">Dean</p>
          </div>
        </div>

        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary-50 mb-4 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50"
                  />
                ) : (
                  <p className="text-primary-50 font-medium">{profile.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50"
                  />
                ) : (
                  <p className="text-primary-50 font-medium">{profile.lastName}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50"
                  />
                ) : (
                  <p className="text-primary-50 font-medium">{profile.email}</p>
                )}
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50"
                  />
                ) : (
                  <p className="text-primary-50 font-medium">{profile.phone}</p>
                )}
              </div>
            </div>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary-50 mb-4 border-b pb-2">
              Academic Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Department / School
                </label>
                <p className="text-primary-50">{profile.department}</p>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Office Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="office"
                    value={profile.office}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50"
                  />
                ) : (
                  <p className="text-primary-50">{profile.office}</p>
                )}
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Biography
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50"
                  />
                ) : (
                   <p className="text-primary-50 leading-relaxed">{profile.bio}</p>
                )}
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeanProfile;

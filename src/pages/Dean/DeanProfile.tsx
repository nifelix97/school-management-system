import React, { useEffect, useState } from "react";
import { IoCameraOutline, IoPersonOutline, IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation
} from "../../app/api/user";
import type { StudentProfileUpdate } from "../../types/StudentProfile";

const DeanProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profileResponse, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();

  const [formData, setFormData] = useState<StudentProfileUpdate>({});

  const profile = profileResponse?.data;

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        telephoneNumber: profile.telephoneNumber,
        department: profile.department,
        office: profile.office,
        bio: profile.bio,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      if (isEditing) {
        await updateProfile(formData).unwrap();
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        await uploadAvatar(formData).unwrap();
        toast.success("Profile picture updated");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to upload image");
      }
    }
  };

  if (isLoading) return <div className="p-8 text-center text-primary-50">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading profile</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-primary-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold bg-linear-to-r from-primary-50 to-primary-100 bg-clip-text text-transparent">My Profile</h1>
        <button
          onClick={handleSaveChanges}
          disabled={isUpdating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
            isEditing
              ? "bg-primary-50 text-white hover:bg-primary-50/90"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          } ${isUpdating ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isEditing ? (
            <>
              <IoSaveOutline className={isUpdating ? "animate-spin" : ""} /> 
              {isUpdating ? "Saving..." : "Save Changes"}
            </>
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Photo */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50/5 rounded-full -mr-12 -mt-12" />
            
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-4xl text-primary-50/30 font-bold overflow-hidden border-4 border-white shadow-xl">
                {profile?.profileImageUrl ? (
                  <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <IoPersonOutline className="w-16 h-16" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-primary-50 text-white rounded-full shadow-lg hover:bg-primary-50/90 transition-all cursor-pointer group-hover:scale-110 active:scale-95">
                <IoCameraOutline className="w-5 h-5" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
              </label>
            </div>
            <h2 className="text-xl font-bold text-primary-50">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-primary-50 font-medium opacity-80">{profile?.department || "No Department Assigned"}</p>
            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">{profile?.role || "Dean"}</p>
          </div>
        </div>

        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-primary-50 mb-4 border-b pb-2 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary-50 rounded-full" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all"
                  />
                ) : (
                  <p className="text-primary-50 font-medium py-2">{profile?.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all"
                  />
                ) : (
                  <p className="text-primary-50 font-medium py-2">{profile?.lastName}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all"
                  />
                ) : (
                  <p className="text-primary-50 font-medium py-2">{profile?.email}</p>
                )}
              </div>
               <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="telephoneNumber"
                    value={formData.telephoneNumber || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all"
                  />
                ) : (
                  <p className="text-primary-50 font-medium py-2">{profile?.telephoneNumber || "N/A"}</p>
                )}
              </div>
            </div>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-primary-50 mb-4 border-b pb-2 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary-100 rounded-full" />
              Academic Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Department / School
                </label>
                <p className="text-primary-50 py-2">{profile?.department || "No Department Assigned"}</p>
              </div>
               <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Office Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="office"
                    value={formData.office || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all"
                    placeholder="e.g. Building A, Room 304"
                  />
                ) : (
                  <p className="text-primary-50 py-2">{profile?.office || "N/A"}</p>
                )}
              </div>
               <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Biography
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                   <p className="text-primary-50 leading-relaxed py-2">{profile?.bio || "No biography provided."}</p>
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

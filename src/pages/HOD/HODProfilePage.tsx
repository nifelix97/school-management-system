import { toast } from "react-toastify";
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation
} from "../../app/api/user";
import type { StudentProfileUpdate } from "../../types/StudentProfile";
import HODProfile from "./HoDProfile";

export default function HODProfilePage() {
  const { data: profileResponse, isLoading, error } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();

  const handleUpdateProfile = async (data: StudentProfileUpdate) => {
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong while updating profile");
    }
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      await uploadAvatar(formData).unwrap();
      toast.success("Profile picture updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upload image");
    }
  };

  if (isLoading) return <div className="p-8 text-center text-primary-50">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading profile</div>;

  const profile = profileResponse?.data;

  if (!profile) return <div className="p-8 text-center text-gray-500">No profile data found</div>;

  return (
    <HODProfile 
      profile={profile as any} 
      onUpdatePersonal={handleUpdateProfile}
      onUploadAvatar={handleUploadAvatar}
    />
  );
}
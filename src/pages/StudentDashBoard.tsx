import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useAddEmergencyContactMutation,
  useDeleteEmergencyContactMutation,
  useGetEmergencyContactsQuery,
  useGetProfileQuery,
  useUpdateEmergencyContactMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation
} from "../app/api/user";
import EmergencyContactModal from "../components/EmergencyContactModal";
import StudentProfile from "../components/StudentProfile";
import type { EmergencyContact, StudentProfileUpdate } from "../types/StudentProfile";

const StudentDashBoard = () => {
  const { data: profileData, isLoading: profileLoading, error: profileError } = useGetProfileQuery();
  const { data: contactsData, isLoading: contactsLoading } = useGetEmergencyContactsQuery();
  
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [addContact, { isLoading: isAdding }] = useAddEmergencyContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateEmergencyContactMutation();
  const [deleteContact] = useDeleteEmergencyContactMutation();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  const onUpdatePersonal = async (data: StudentProfileUpdate) => {
    try {
      if (data.profileImageFile) {
        const formData = new FormData();
        formData.append('avatar', data.profileImageFile);
        await uploadAvatar(formData).unwrap();
        toast.success("Profile picture updated");
      }

      const { profileImageFile, ...metadata } = data;
      if (Object.keys(metadata).length > 0) {
        await updateProfile(metadata).unwrap();
        toast.success("Profile details updated");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile");
      throw err;
    }
  };

  const handleSaveContact = async (data: Partial<EmergencyContact>) => {
    try {
      if (editingContact) {
        await updateContact({
          contactId: editingContact.id,
          data
        }).unwrap();
        toast.success("Emergency contact updated");
      } else {
        await addContact(data).unwrap();
        toast.success("Emergency contact added");
      }
      setIsModalOpen(false);
      setEditingContact(null);
    } catch (err) {
      console.error("Failed to save contact:", err);
      toast.error("Failed to save contact");
    }
  };

  const handleDeleteContact = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this emergency contact?")) {
      try {
        await deleteContact(id).unwrap();
        toast.success("Emergency contact deleted");
      } catch (err) {
        console.error("Failed to delete contact:", err);
        toast.error("Failed to delete contact");
      }
    }
  };

  const handleEditContact = (id: string | number) => {
    const contact = mergedProfile?.emergencyContacts?.find(c => c.id === id);
    if (contact) {
      setEditingContact(contact);
      setIsModalOpen(true);
    }
  };

  const handleCreateContact = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const isLoading = profileLoading || contactsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading profile...</span>
      </div>
    );
  }

  if (profileError || !profileData?.data) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">
        <p className="font-bold">Error loading profile</p>
        <p className="text-sm">Please make sure you are logged in and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  // Merge profile with emergency contacts
  const mergedProfile = {
    ...profileData.data,
    emergencyContacts: contactsData?.data || profileData.data.emergencyContacts || []
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 relative">
      <div className="mx-auto max-w-6xl">
        <StudentProfile
          profile={mergedProfile}
          onCreateEmergencyContact={handleCreateContact}
          onEditEmergencyContact={handleEditContact}
          onDeleteEmergencyContact={handleDeleteContact}
          onUpdatePersonal={onUpdatePersonal}
        />
      </div>

      <EmergencyContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        contact={editingContact}
        isLoading={isAdding || isUpdating}
      />
    </section>
  );
};

export default StudentDashBoard;
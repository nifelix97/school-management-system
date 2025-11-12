import { useState } from "react";
import StudentProfile from "../components/StudentProfile";
import type { StudentProfile as TStudentProfile, StudentProfileUpdate } from "../types/StudentProfile";

const initialProfile: TStudentProfile = {
  profileImageUrl: "https://i.pravatar.cc/100?img=12",
  firstName: "Steve",
  lastName: "Pendleton",
  email: "steve.pendleton@example.com",
  telephoneNumber: "09720838158",
  registrationNumber: "REG-2025-001",
  currentYear: "2025/2026",
  role: "Student",
  program: "BSc Computer Science",
  department: "Engineering",
  emergencyContacts: [
    {
      id: "c1",
      name: "Joyce Wilson",
      priority: "Primary",
      email: "joycewilson2001@yahoo.com",
      phone: "09720838158",
      workPhone: "07720838456",
      mobilePhone: "07777838158",
      relation: "Parent",
    },
  ],
};

const StudentDashBoard = () => {
  const [profile, setProfile] = useState<TStudentProfile>(initialProfile);

  const onUpdatePersonal = async (data: StudentProfileUpdate) => {
    const uploadedUrl =
      data.profileImageFile ? URL.createObjectURL(data.profileImageFile) : undefined;

    setProfile((p) => ({
      ...p,
      firstName: data.firstName ?? p.firstName,
      lastName: data.lastName ?? p.lastName,
      email: data.email ?? p.email,
      telephoneNumber: data.telephoneNumber ?? p.telephoneNumber,
      profileImageUrl: uploadedUrl ?? p.profileImageUrl,
    }));
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
      <div className="mx-auto max-w-6xl">
        <StudentProfile
          profile={profile}
          onCreateEmergencyContact={() => console.log("create")}
          onEditEmergencyContact={(id) => console.log("edit", id)}
          onDeleteEmergencyContact={(id) => console.log("delete", id)}
          onUpdatePersonal={onUpdatePersonal}
        />
      </div>
    </section>
  );
};

export default StudentDashBoard;
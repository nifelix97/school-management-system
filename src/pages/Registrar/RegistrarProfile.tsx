import React, { useMemo, useState } from "react";
import type {
  EmergencyContact,
} from "../../types/StudentProfile";
import {
  IoPencilOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface RegistrarProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber?: string;
  profileImageUrl?: string;
  employeeId: string;
  department: string;
  position: string;
  specialization?: string;
  yearsOfExperience?: number;
  qualifications?: string;
  officeLocation?: string;
  officeHours?: string;
  managedDepartments?: string[];
  emergencyContacts?: EmergencyContact[];
}

interface RegistrarProfileUpdate {
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber?: string;
  profileImageFile: File | null;
  newPassword: string;
  specialization?: string;
  qualifications?: string;
  officeLocation?: string;
  officeHours?: string;
}

type Props = {
  profile: RegistrarProfile;
  onCreateEmergencyContact?: () => void;
  onEditEmergencyContact?: (id: string) => void;
  onDeleteEmergencyContact?: (id: string) => void;
  onUpdatePersonal?: (data: RegistrarProfileUpdate) => Promise<void> | void;
};

const tabs = ["Personal details", "Professional details"] as const;
type Tab = (typeof tabs)[number];

const Field = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <div className="py-3 sm:py-4">
    <div className="text-xs sm:text-sm uppercase tracking-wide text-primary-50/60 mb-2">
      {label}
    </div>
    <div className="text-base sm:text-lg md:text-xl text-primary-50 font-medium">
      {value || <span className="text-gray-400">—</span>}
    </div>
    <div className="border-b border-gray-100 mt-3 sm:mt-4" />
  </div>
);

const RegistrarProfile: React.FC<Props> = ({
  profile,
  onUpdatePersonal,
}) => {
  const [active, setActive] = useState<Tab>("Personal details");
  const fullName = `${profile.firstName} ${profile.lastName}`;

  // edit personal info
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<RegistrarProfileUpdate>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    telephoneNumber: profile.telephoneNumber,
    profileImageFile: null,
    newPassword: "",
    specialization: profile.specialization,
    qualifications: profile.qualifications,
    officeLocation: profile.officeLocation,
    officeHours: profile.officeHours,
  });

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (editing) {
      if (!form.firstName) e.firstName = "First name is required.";
      if (!form.lastName) e.lastName = "Last name is required.";
      if (!form.email) e.email = "Email is required.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        e.email = "Enter a valid email.";
      if (form.newPassword && form.newPassword.length < 6)
        e.newPassword = "Password must be at least 6 characters.";
    }
    return e;
  }, [editing, form]);

  const isValid = Object.keys(errors).length === 0;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, profileImageFile: f }));
  };

  const handleSave = async () => {
    if (!isValid) return;
    try {
      setSaving(true);
      await onUpdatePersonal?.(form);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  // Mock data for demonstration
  const mockProfile: RegistrarProfile = {
    id: "reg001",
    firstName: "Dr. Michael",
    lastName: "Thompson",
    email: "michael.thompson@university.edu",
    telephoneNumber: "+1-555-0456",
    profileImageUrl: "https://via.placeholder.com/150",
    employeeId: "REG001",
    department: "Registrar's Office",
    position: "Registrar",
    specialization: "Student Records & Registration Management",
    yearsOfExperience: 12,
    qualifications: "Ph.D. in Education Administration, M.S. in Information Systems",
    officeLocation: "Administration Building, Room 105",
    officeHours: "Monday-Friday: 8:00 AM - 4:00 PM",
    managedDepartments: ["Student Registrations", "Academic Records", "Admissions"],
  };

  const displayProfile = profile.id ? profile : mockProfile;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
          <img
            src={displayProfile.profileImageUrl || "https://via.placeholder.com/64"}
            alt={fullName}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-50 truncate">
              {`${displayProfile.firstName} ${displayProfile.lastName}`}
            </div>
            <div className="text-xs sm:text-sm md:text-base text-primary-50/40">
              {displayProfile.position} - {displayProfile.department}
            </div>

            {/* Tabs */}
            <div className="mt-3 sm:mt-4 md:mt-5 flex items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base overflow-x-auto no-scrollbar">
              {tabs.map((t) => {
                const isActive = active === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActive(t)}
                    className={`relative pb-2 whitespace-nowrap bg-transparent border-none cursor-pointer ${
                      isActive
                        ? "text-primary-100 font-semibold"
                        : "text-primary-50/60 hover:text-primary-50"
                    }`}
                  >
                    {t}
                    {isActive && (
                      <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-primary-100 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mt-3 sm:mt-4 md:mt-5" />

        {/* Personal details */}
        {active === "Personal details" && (
          <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
            {!editing ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <Field label="Employee ID" value={displayProfile.employeeId} />
                  <Field label="Email" value={displayProfile.email} />
                  <Field label="Telephone" value={displayProfile.telephoneNumber} />
                  <Field label="Department" value={displayProfile.department} />
                  <Field label="Position" value={displayProfile.position} />
                  <Field label="Office Location" value={displayProfile.officeLocation} />
                </div>
                <div className="pt-4 sm:pt-5">
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-primary-100 text-primary-100 bg-white hover:bg-primary-100/10"
                  >
                    <IoPencilOutline /> Edit
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Profile image
                  </label>
                  <input type="file" accept="image/*" onChange={handleFile} />
                  {form.profileImageFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      {form.profileImageFile.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First name"
                    name="firstName"
                    value={form.firstName || ""}
                    onChange={(e) => {
                      const v = (e.currentTarget as HTMLInputElement).value;
                      setForm((p) => ({ ...p, firstName: v }));
                    }}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last name"
                    name="lastName"
                    value={form.lastName || ""}
                    onChange={(e) => {
                      const v = (e.currentTarget as HTMLInputElement).value;
                      setForm((p) => ({ ...p, lastName: v }));
                    }}
                    error={errors.lastName}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => {
                      const v = (e.currentTarget as HTMLInputElement).value;
                      setForm((p) => ({ ...p, email: v }));
                    }}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <Input
                    label="Telephone"
                    name="telephoneNumber"
                    value={form.telephoneNumber || ""}
                    onChange={(e) => {
                      const v = (e.currentTarget as HTMLInputElement).value;
                      setForm((p) => ({ ...p, telephoneNumber: v }));
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Office Location"
                    name="officeLocation"
                    value={form.officeLocation || ""}
                    onChange={(e) => {
                      const v = (e.currentTarget as HTMLInputElement).value;
                      setForm((p) => ({ ...p, officeLocation: v }));
                    }}
                  />
                  <Input
                    label="Office Hours"
                    name="officeHours"
                    value={form.officeHours || ""}
                    onChange={(e) => {
                      const v = (e.currentTarget as HTMLInputElement).value;
                      setForm((p) => ({ ...p, officeHours: v }));
                    }}
                  />
                </div>

                <Input
                  label="New password"
                  name="newPassword"
                  type="password"
                  value={form.newPassword || ""}
                  onChange={(e) => {
                    const v = (e.currentTarget as HTMLInputElement).value;
                    setForm((p) => ({ ...p, newPassword: v }));
                  }}
                  showPasswordToggle
                  error={errors.newPassword}
                  autoComplete="new-password"
                />

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    disabled={!isValid || saving}
                    onClick={handleSave}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-white ${
                      !isValid || saving
                        ? "bg-primary-50/60 cursor-not-allowed"
                        : "bg-primary-50 hover:opacity-95"
                    }`}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setForm({
                        firstName: displayProfile.firstName,
                        lastName: displayProfile.lastName,
                        email: displayProfile.email,
                        telephoneNumber: displayProfile.telephoneNumber,
                        profileImageFile: null,
                        newPassword: "",
                        specialization: displayProfile.specialization,
                        qualifications: displayProfile.qualifications,
                        officeLocation: displayProfile.officeLocation,
                        officeHours: displayProfile.officeHours,
                      });
                    }}
                    className="px-5 py-2 rounded-full border border-gray-300 text-primary-50 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Professional details */}
        {active === "Professional details" && (
          <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <Field label="Specialization" value={displayProfile.specialization} />
              <Field label="Years of Experience" value={displayProfile.yearsOfExperience} />
              <Field label="Office Hours" value={displayProfile.officeHours} />
              <Field label="Office Location" value={displayProfile.officeLocation} />
            </div>
            <div className="mt-4">
              <Field label="Qualifications" value={displayProfile.qualifications} />
            </div>
            <div className="mt-4">
              <Field
                label="Managed Departments"
                value={displayProfile.managedDepartments?.join(", ")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarProfile;
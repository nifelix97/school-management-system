
import React, { useMemo, useState } from "react";
import {
    IoPencilOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

// Interface tailored for Auditor
interface AuditorProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber?: string;
  profileImageUrl?: string;
  employeeId: string;
  department: string; // Likely "Audit Dept"
  position: string;   // e.g. "Senior Auditor"
  certifications?: string; // e.g. "CPA, CIA"
  auditExperienceYears?: number;
  specialization?: string; // e.g. "Financial Risk"
  officeLocation?: string;
}

interface AuditorProfileUpdate {
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber?: string;
  profileImageFile: File | null;
  newPassword: string;
  officeLocation?: string;
  certifications?: string;
  specialization?: string;
}

const mockProfile: AuditorProfile = {
    id: "aud-001",
    firstName: "James",
    lastName: "Carter",
    email: "j.carter@university.edu",
    telephoneNumber: "+250 788 123 456",
    employeeId: "AUD-2024-001",
    department: "Internal Audit",
    position: "Senior Auditor",
    certifications: "CPA, CIA, CISA",
    auditExperienceYears: 12,
    specialization: "Financial Compliance & Risk Management",
    officeLocation: "Admin Block, Room 304",
    profileImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
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

const AuditorProfilePage: React.FC = () => {
  const [profile] = useState<AuditorProfile>(mockProfile);
  const [active, setActive] = useState<Tab>("Personal details");
  const fullName = `${profile.firstName} ${profile.lastName}`;

  // edit personal info
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AuditorProfileUpdate>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    telephoneNumber: profile.telephoneNumber,
    profileImageFile: null,
    newPassword: "",
    officeLocation: profile.officeLocation,
    certifications: profile.certifications,
    specialization: profile.specialization
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditing(false);
      alert("Profile updated successfully (Mock)");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
        
      <div className="w-full mx-auto max-w-5xl">
         {/* Page Header */}
         <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">My Profile</h1>
          <p className="text-sm sm:text-base text-primary-50/70">
            Manage your personal information and professional details.
          </p>
        </div>

        {/* Profile Card Header */}
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
            <img
            src={profile.profileImageUrl || "https://via.placeholder.com/64"}
            alt={fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-sm border-2 border-white"
            />
            <div className="min-w-0 flex-1 pt-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-50 truncate">
                {fullName}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-primary-50/60 font-medium">
                {profile.position} • {profile.department}
            </div>

            {/* Tabs */}
            <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base overflow-x-auto no-scrollbar">
                {tabs.map((t) => {
                const isActive = active === t;
                return (
                    <button
                    key={t}
                    type="button"
                    onClick={() => setActive(t)}
                    className={`relative pb-2 whitespace-nowrap bg-transparent border-none cursor-pointer transition-colors ${
                        isActive
                        ? "text-primary-100 font-bold"
                        : "text-primary-50/60 hover:text-primary-50"
                    }`}
                    >
                    {t}
                    {isActive && (
                        <span className="absolute left-0 -bottom-[1px] h-[3px] w-full bg-primary-100 rounded-full" />
                    )}
                    </button>
                );
                })}
            </div>
            </div>
        </div>

        <div className="border-b border-gray-200 mt-2" />

        {/* Personal details */}
        {active === "Personal details" && (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 transition-all duration-300 animate-slideUp">
            {!editing ? (
                <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Employee ID" value={profile.employeeId} />
                    <Field label="Email" value={profile.email} />
                    <Field label="Telephone" value={profile.telephoneNumber} />
                    <Field label="Department" value={profile.department} />
                    <Field label="Position" value={profile.position} />
                    <Field label="Office Location" value={profile.officeLocation} />
                </div>
                <div className="pt-6">
                    <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary-100 text-primary-100 bg-white hover:bg-primary-50/5 transition-colors font-medium text-sm sm:text-base shadow-sm hover:shadow"
                    >
                    <IoPencilOutline className="text-lg" /> Edit Profile
                    </button>
                </div>
                </>
            ) : (
                <div className="space-y-6 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                    Profile image
                    </label>
                    <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-white hover:file:bg-primary-100 transition-colors cursor-pointer"/>
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
                </div>

                <div className="my-4 border-t border-gray-100 pt-4">
                     <h3 className="text-lg font-semibold text-primary-50 mb-3">Change Password</h3>
                    <Input
                        label="New password"
                        name="newPassword"
                        type="password"
                        placeholder="Leave blank to keep current"
                        value={form.newPassword || ""}
                        onChange={(e) => {
                        const v = (e.currentTarget as HTMLInputElement).value;
                        setForm((p) => ({ ...p, newPassword: v }));
                        }}
                        showPasswordToggle
                        error={errors.newPassword}
                        autoComplete="new-password"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                    type="button"
                    disabled={!isValid || saving}
                    onClick={handleSave}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium shadow-md transition-all active:scale-95 ${
                        !isValid || saving
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary-100 hover:bg-primary-200"
                    }`}
                    >
                    {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                    type="button"
                    onClick={() => {
                        setEditing(false);
                        setForm({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        email: profile.email,
                        telephoneNumber: profile.telephoneNumber,
                        profileImageFile: null,
                        newPassword: "",
                        officeLocation: profile.officeLocation,
                        certifications: profile.certifications,
                        specialization: profile.specialization
                        });
                    }}
                    className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 font-medium transition-colors"
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
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 transition-all duration-300 animate-slideUp">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <Field label="Specialization" value={profile.specialization} />
                <Field label="Years of Audit Experience" value={`${profile.auditExperienceYears} years`} />
                <Field label="Professional Certifications" value={profile.certifications} />
                <Field label="Office Location" value={profile.officeLocation} />
            </div>
            
            <div className="mt-8 p-4 bg-primary-50/5 rounded-xl border border-primary-50/10">
                <h4 className="text-sm font-bold text-primary-50 uppercase tracking-wide mb-2">Audit Authority Level</h4>
                <p className="text-gray-600 text-sm">
                    Authorized to conduct Level 3 Financial Audits and System Compliance Checks. 
                    <br/>
                    Clearance ID: <span className="font-mono text-primary-100">{profile.employeeId}-L3</span>
                </p>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AuditorProfilePage;

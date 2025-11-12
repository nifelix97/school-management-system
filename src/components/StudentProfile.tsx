import React, { useMemo, useState } from "react";
import type {
  StudentProfile as TStudentProfile,
  EmergencyContact,
  StudentProfileUpdate,
} from "../types/StudentProfile";
import {
  IoCreateOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Input from "./ui/Input";

type Props = {
  profile: TStudentProfile;
  onCreateEmergencyContact?: () => void;
  onEditEmergencyContact?: (id: string) => void;
  onDeleteEmergencyContact?: (id: string) => void;
  onUpdatePersonal?: (data: StudentProfileUpdate) => Promise<void> | void;
};

const tabs = ["Personal details", "Emergency contacts"] as const;
type Tab = (typeof tabs)[number];

const Field = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <div className="py-3">
    <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
      {label}
    </div>
    <div className="text-sm text-primary-50">
      {value || <span className="text-gray-400">—</span>}
    </div>
    <div className="border-b border-gray-100 mt-3" />
  </div>
);

const EmergencyCard = ({
  contact,
  onEdit,
  onDelete,
}: {
  contact: EmergencyContact;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
    <div className="flex items-center gap-2 text-primary-50 font-semibold">
      <span className="w-2.5 h-2.5 rounded-full bg-primary-100" />
      Emergency contact
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
      <div>
        <Field label="Priority To Call" value={contact.priority} />
        <Field label="Phone" value={contact.phone} />
        <Field label="Mobile Phone" value={contact.mobilePhone} />
      </div>
      <div>
        <Field label="Email" value={contact.email} />
        <Field label="Work Phone" value={contact.workPhone} />
        <Field label="Relation" value={contact.relation} />
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3 pt-4">
      <button
        type="button"
        onClick={() => onEdit?.(contact.id)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-100 text-primary-100 bg-white hover:bg-primary-100/10"
      >
        <IoPencilOutline /> Edit
      </button>
      <button
        type="button"
        onClick={() => onDelete?.(contact.id)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 text-red-600 bg-white hover:bg-red-50"
      >
        <IoTrashOutline /> Delete
      </button>
    </div>
  </div>
);

const StudentProfile: React.FC<Props> = ({
  profile,
  onCreateEmergencyContact,
  onEditEmergencyContact,
  onDeleteEmergencyContact,
  onUpdatePersonal,
}) => {
  const [active, setActive] = useState<Tab>("Emergency contacts");
  const fullName = `${profile.firstName} ${profile.lastName}`;

  // edit personal info
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<StudentProfileUpdate>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    telephoneNumber: profile.telephoneNumber,
    profileImageFile: null,
    newPassword: "",
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

  return (
    <div className="w-full mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex items-start gap-4 sm:gap-6">
        <img
          src={profile.profileImageUrl || "https://via.placeholder.com/64"}
          alt={fullName}
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="text-base sm:text-xl font-bold text-primary-50 truncate">
            {fullName}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            {profile.title || profile.program || profile.role || "Student"}
          </div>

          {/* Tabs */}
          <div className="mt-3 sm:mt-4 flex items-center gap-4 sm:gap-6 text-sm overflow-x-auto no-scrollbar">
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
                      : "text-gray-500 hover:text-primary-50"
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

      <div className="border-b border-gray-200 mt-4" />

      {/* Emergency contacts */}
      {active === "Emergency contacts" && (
        <div className="mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="m-0 text-primary-50 font-semibold">
              Emergency contacts
            </h3>
            <button
              type="button"
              onClick={onCreateEmergencyContact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-50 hover:opacity-90 self-start sm:self-auto"
            >
              <IoCreateOutline className="text-primary-50" />
              Create emergency contact
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4">
            {profile.emergencyContacts && profile.emergencyContacts.length > 0 ? (
              profile.emergencyContacts.map((c) => (
                <EmergencyCard
                  key={c.id}
                  contact={c}
                  onEdit={onEditEmergencyContact}
                  onDelete={onDeleteEmergencyContact}
                />
              ))
            ) : (
              <div className="text-sm text-gray-500">
                No emergency contacts yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Personal details (view / edit) */}
      {active === "Personal details" && (
        <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          {!editing ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <Field label="Registration Number" value={profile.registrationNumber} />
                <Field label="Email" value={profile.email} />
                <Field label="Telephone" value={profile.telephoneNumber} />
                <Field label="Current Year" value={String(profile.currentYear)} />
                <Field label="Program" value={profile.program} />
                <Field label="Department" value={profile.department} />
              </div>
              <div className="pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-100 text-primary-100 bg-white hover:bg-primary-100/10"
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
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-primary-50 ${
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
                      firstName: profile.firstName,
                      lastName: profile.lastName,
                      email: profile.email,
                      telephoneNumber: profile.telephoneNumber,
                      profileImageFile: null,
                      newPassword: "",
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

      {/* {active === "Work details" && (
        <div className="mt-4 sm:mt-6 text-sm text-gray-500">
          No work details for students.
        </div>
      )} */}
    </div>
  );
};

export default StudentProfile;
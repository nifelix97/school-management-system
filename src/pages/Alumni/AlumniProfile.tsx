
import React, { useMemo, useState } from "react";
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoPencilOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

// Interface for Alumni
interface AlumniProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephoneNumber?: string;
    profileImageUrl?: string;
    alumniId: string;
    graduationYear: number;
    degree: string;
    major: string;
    currentCompany?: string;
    currentPosition?: string;
    industry?: string;
    location?: string;
    linkedInUrl?: string;
    mentorshipStatus?: "Available" | "Not Available";
    achievements?: string;
}

interface AlumniProfileUpdate {
    firstName: string;
    lastName: string;
    email: string;
    telephoneNumber?: string;
    profileImageFile: File | null;
    newPassword: string;
    currentCompany?: string;
    currentPosition?: string;
    industry?: string;
    location?: string;
    linkedInUrl?: string;
    mentorshipStatus?: "Available" | "Not Available";
    achievements?: string;
}

const mockProfile: AlumniProfile = {
    id: "alum-001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    telephoneNumber: "+250 788 456 789",
    alumniId: "ALM-2015-0234",
    graduationYear: 2015,
    degree: "Bachelor of Science",
    major: "Computer Science",
    currentCompany: "Tech Innovations Inc.",
    currentPosition: "Senior Software Engineer",
    industry: "Information Technology",
    location: "San Francisco, CA",
    linkedInUrl: "linkedin.com/in/sarahjohnson",
    mentorshipStatus: "Available",
    achievements: "Published research in AI ethics, Promoted to VP of Engineering",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
};

const tabs = ["Personal Details", "Academic Background", "Professional Details"] as const;
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

const AlumniProfilePage: React.FC = () => {
    const [profile] = useState<AlumniProfile>(mockProfile);
    const [active, setActive] = useState<Tab>("Personal Details");
    const fullName = `${profile.firstName} ${profile.lastName}`;

    // edit personal info
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<AlumniProfileUpdate>({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        telephoneNumber: profile.telephoneNumber,
        profileImageFile: null,
        newPassword: "",
        currentCompany: profile.currentCompany,
        currentPosition: profile.currentPosition,
        industry: profile.industry,
        location: profile.location,
        linkedInUrl: profile.linkedInUrl,
        mentorshipStatus: profile.mentorshipStatus,
        achievements: profile.achievements
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

    const handleSave = async () => {
        if (Object.keys(errors).length > 0) return;
        setSaving(true);
        // Simulate API call
        await new Promise((res) => setTimeout(res, 1500));
        setSaving(false);
        setEditing(false);
        alert("Profile updated successfully!");
    };

    const handleCancel = () => {
        setForm({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            telephoneNumber: profile.telephoneNumber,
            profileImageFile: null,
            newPassword: "",
            currentCompany: profile.currentCompany,
            currentPosition: profile.currentPosition,
            industry: profile.industry,
            location: profile.location,
            linkedInUrl: profile.linkedInUrl,
            mentorshipStatus: profile.mentorshipStatus,
            achievements: profile.achievements
        });
        setEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                    Alumni Profile
                </h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Manage your alumni profile and stay connected.
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 sm:mb-8">
                {/* Cover Image */}
                <div className="h-32 sm:h-48 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50"></div>

                {/* Profile Info */}
                <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20">
                        {/* Profile Image */}
                        <div className="relative">
                            <img
                                src={profile.profileImageUrl}
                                alt={fullName}
                                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl border-4 border-white shadow-lg object-cover"
                            />
                            {profile.mentorshipStatus === "Available" && (
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                    <IoCheckmarkCircleOutline className="w-4 h-4" />
                                    Mentor
                                </div>
                            )}
                        </div>

                        {/* Name and Details */}
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                {fullName}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-600 mb-3">
                                <span className="font-semibold">{profile.currentPosition}</span>
                                {profile.currentCompany && (
                                    <>
                                        <span>•</span>
                                        <span>{profile.currentCompany}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold border border-blue-200">
                                    Class of {profile.graduationYear}
                                </span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs sm:text-sm font-semibold border border-purple-200">
                                    {profile.major}
                                </span>
                                {profile.industry && (
                                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs sm:text-sm font-semibold border border-amber-200">
                                        {profile.industry}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Edit Button */}
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
                            >
                                <IoPencilOutline className="w-5 h-5" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs and Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActive(tab)}
                                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors border-b-2 ${
                                    active === tab
                                        ? "border-primary-100 text-primary-100"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    {!editing ? (
                        <div className="animate-slideUp">
                            {active === "Personal Details" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                    <Field label="First Name" value={profile.firstName} />
                                    <Field label="Last Name" value={profile.lastName} />
                                    <Field label="Email Address" value={profile.email} />
                                    <Field label="Phone Number" value={profile.telephoneNumber} />
                                    <Field label="Alumni ID" value={profile.alumniId} />
                                    <Field label="Location" value={profile.location} />
                                    <Field label="LinkedIn" value={profile.linkedInUrl} />
                                    <Field 
                                        label="Mentorship Status" 
                                        value={
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${
                                                profile.mentorshipStatus === "Available" 
                                                    ? "bg-emerald-50 text-emerald-700" 
                                                    : "bg-gray-100 text-gray-700"
                                            }`}>
                                                {profile.mentorshipStatus === "Available" ? (
                                                    <IoCheckmarkCircleOutline className="w-4 h-4" />
                                                ) : (
                                                    <IoCloseCircleOutline className="w-4 h-4" />
                                                )}
                                                {profile.mentorshipStatus}
                                            </span>
                                        } 
                                    />
                                </div>
                            )}

                            {active === "Academic Background" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                    <Field label="Graduation Year" value={profile.graduationYear} />
                                    <Field label="Degree" value={profile.degree} />
                                    <Field label="Major" value={profile.major} />
                                    <Field label="Alumni ID" value={profile.alumniId} />
                                </div>
                            )}

                            {active === "Professional Details" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                    <Field label="Current Company" value={profile.currentCompany} />
                                    <Field label="Current Position" value={profile.currentPosition} />
                                    <Field label="Industry" value={profile.industry} />
                                    <Field label="Location" value={profile.location} />
                                    <div className="md:col-span-2">
                                        <Field label="Achievements" value={profile.achievements} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="animate-slideUp">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <Input
                                    label="First Name"
                                    value={form.firstName}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                    error={errors.firstName}
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    value={form.lastName}
                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                    error={errors.lastName}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    error={errors.email}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    value={form.telephoneNumber || ""}
                                    onChange={(e) => setForm({ ...form, telephoneNumber: e.target.value })}
                                />
                                <Input
                                    label="Current Company"
                                    value={form.currentCompany || ""}
                                    onChange={(e) => setForm({ ...form, currentCompany: e.target.value })}
                                />
                                <Input
                                    label="Current Position"
                                    value={form.currentPosition || ""}
                                    onChange={(e) => setForm({ ...form, currentPosition: e.target.value })}
                                />
                                <Input
                                    label="Industry"
                                    value={form.industry || ""}
                                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                                />
                                <Input
                                    label="Location"
                                    value={form.location || ""}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                />
                                <Input
                                    label="LinkedIn URL"
                                    value={form.linkedInUrl || ""}
                                    onChange={(e) => setForm({ ...form, linkedInUrl: e.target.value })}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mentorship Status
                                    </label>
                                    <select
                                        value={form.mentorshipStatus}
                                        onChange={(e) => setForm({ ...form, mentorshipStatus: e.target.value as "Available" | "Not Available" })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Achievements
                                    </label>
                                    <textarea
                                        value={form.achievements || ""}
                                        onChange={(e) => setForm({ ...form, achievements: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent resize-none"
                                        placeholder="List your notable achievements..."
                                    />
                                </div>
                                <Input
                                    label="New Password (optional)"
                                    type="password"
                                    value={form.newPassword}
                                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                    error={errors.newPassword}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 sm:mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving || Object.keys(errors).length > 0}
                                    className="px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-medium disabled:opacity-50 shadow-md hover:shadow-lg"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlumniProfilePage;

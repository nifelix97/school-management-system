import React, { useRef, useState } from "react";
import {
    IoCalendarOutline,
    IoCallOutline,
    IoCameraOutline,
    IoChatbubbleEllipsesOutline,
    IoCheckmarkCircleOutline,
    IoHeartOutline,
    IoKeyOutline,
    IoLocationOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSaveOutline,
    IoSchoolOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

const GuildProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"personal" | "office" | "social">("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock Guild President data
    const [guildData, setGuildData] = useState({
        firstName: "Mugisha",
        lastName: "Emmanuel",
        email: "president.guild@university.edu",
        phone: "+250 788 123 456",
        address: "Guild Office, Block A, Kigali",
        dateOfBirth: "2000-05-15",
        joinDate: "2023-09-01",
        role: "Guild President",
        department: "Student Leadership",
        studentId: "STU-2023-456",
        term: "2024 - 2025",
        campus: "Kigali Main Campus",
    });

    const achievements = [
        { id: 1, title: "Welfare Bill Passed", status: "Completed", icon: <IoHeartOutline />, color: "bg-blue-500" },
        { id: 2, title: "Budget Allocation Q3", status: "Ongoing", icon: <IoShieldCheckmarkOutline />, color: "bg-purple-500" },
        { id: 3, title: "Freshers Gala", status: "Planning", icon: <IoCalendarOutline />, color: "bg-orange-500" },
    ];

    const handleSave = () => {
        setIsEditing(false);
        // TODO: Implement API call
    };

    const handleImageUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-50 tracking-tight">Presidential Records</h1>
                <p className="text-gray-500 mt-1 font-medium italic">Manage your profile and student leadership credentials.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden group">
                        <div className="relative inline-block mb-6">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-2xl relative z-10"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-3xl bg-primary-50 flex items-center justify-center text-white text-4xl font-black shadow-2xl relative z-10">
                                    {guildData.firstName[0]}{guildData.lastName[0]}
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            <button
                                onClick={handleImageUpload}
                                className="absolute -bottom-2 -right-2 bg-primary-100 text-white p-3 rounded-2xl hover:scale-110 transition-transform shadow-xl border-4 border-white z-20"
                            >
                                <IoCameraOutline className="w-5 h-5" />
                            </button>
                        </div>
                        <h2 className="text-xl font-black text-primary-50">{guildData.firstName} {guildData.lastName}</h2>
                        <p className="text-[10px] font-black text-primary-100 uppercase tracking-widest mt-1 mb-6">{guildData.role}</p>
                        <div className="space-y-2">
                            <div className="bg-primary-50/5 text-primary-50 text-[10px] font-black py-3 rounded-2xl border border-primary-50/10 uppercase tracking-widest">
                                ID: {guildData.studentId}
                            </div>
                            <div className="bg-green-50 text-green-600 text-[10px] font-black py-3 rounded-2xl border border-green-100 uppercase tracking-widest">
                                Term: {guildData.term}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100">
                        {[
                            { id: "personal", label: "Identity", icon: <IoPersonOutline /> },
                            { id: "office", label: "Guild Office", icon: <IoSchoolOutline /> },
                            { id: "social", label: "Activities", icon: <IoHeartOutline /> },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab.id 
                                        ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" 
                                        : "text-gray-400 hover:text-primary-50"
                                }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-primary-50/[0.02]">
                            <div>
                                <h2 className="text-xl font-black text-primary-50">
                                    {activeTab === "personal" ? "Registry Information" : 
                                     activeTab === "office" ? "Leadership Credentials" : "Engagement Feed"}
                                </h2>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Verified Institutional Data</p>
                            </div>
                            {activeTab === "personal" && (
                                !isEditing ? (
                                    <button onClick={() => setIsEditing(true)} className="bg-primary-100 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all active:scale-95">
                                        Modify Records
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button onClick={handleSave} className="bg-primary-50 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 flex items-center gap-2">
                                            <IoSaveOutline className="text-base" /> Commit
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                                            Cancel
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="p-10">
                            {activeTab === "personal" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <Input label="First Name" value={guildData.firstName} onChange={(e) => setGuildData({ ...guildData, firstName: e.target.value })} disabled={!isEditing} leftIcon={<IoPersonOutline />} />
                                    <Input label="Last Name" value={guildData.lastName} onChange={(e) => setGuildData({ ...guildData, lastName: e.target.value })} disabled={!isEditing} leftIcon={<IoPersonOutline />} />
                                    <Input label="Official Email" value={guildData.email} onChange={(e) => setGuildData({ ...guildData, email: e.target.value })} disabled={!isEditing} leftIcon={<IoMailOutline />} />
                                    <Input label="Primary Phone" value={guildData.phone} onChange={(e) => setGuildData({ ...guildData, phone: e.target.value })} disabled={!isEditing} leftIcon={<IoCallOutline />} />
                                    <div className="md:col-span-2">
                                        <Input label="Residential Address" value={guildData.address} onChange={(e) => setGuildData({ ...guildData, address: e.target.value })} disabled={!isEditing} leftIcon={<IoLocationOutline />} />
                                    </div>
                                </div>
                            )}

                            {activeTab === "office" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black text-primary-50 uppercase tracking-widest flex items-center gap-2">
                                            <IoKeyOutline className="text-primary-100" />
                                            Security Access
                                        </h3>
                                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-black text-gray-700">Office Key Management</p>
                                                <p className="text-[10px] text-gray-400">Manage biometric for office access</p>
                                            </div>
                                            <button className="bg-white p-3 rounded-xl shadow-sm text-primary-50 hover:text-primary-100 transition-colors">
                                                <IoShieldCheckmarkOutline className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black text-primary-50 uppercase tracking-widest flex items-center gap-2">
                                            <IoSchoolOutline className="text-primary-100" />
                                            Appointment
                                        </h3>
                                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                            <p className="text-xs font-black text-gray-700 capitalize">Campus: {guildData.campus}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Hired: {guildData.joinDate}</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-4">
                                        <h3 className="text-sm font-black text-primary-50 uppercase tracking-widest flex items-center gap-2">
                                            <IoTimeOutline className="text-primary-100" />
                                            Operational Parameters
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                            {["Budget Access", "Global Comms", "Election Oversight"].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-5 bg-primary-50/[0.03] rounded-2xl border border-primary-50/5 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
                                                    <IoCheckmarkCircleOutline className="text-green-500 text-xl" />
                                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "social" && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {achievements.map((a) => (
                                            <div key={a.id} className="p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-primary-100/20 hover:bg-white hover:shadow-xl transition-all group overflow-hidden relative">
                                                <div className={`${a.color} text-white p-3 rounded-xl w-fit shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                                                    {a.icon}
                                                </div>
                                                <p className="text-xs font-black text-gray-700 mb-1">{a.title}</p>
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{a.status}</span>
                                                <div className={`absolute -right-4 -bottom-4 text-6xl ${a.color} opacity-5 group-hover:scale-110 transition-transform`}>{a.icon}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-8">
                                        <h3 className="text-sm font-black text-primary-50 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <IoChatbubbleEllipsesOutline className="text-primary-100" />
                                            Engagement Timeline
                                        </h3>
                                        <div className="space-y-6">
                                            {[
                                                { msg: "Signed the 2024 Welfare Act", time: "2 days ago" },
                                                { msg: "Addressed the General Student Assembly", time: "1 week ago" },
                                                { msg: "Approved the Sports Gala Budget", time: "2 weeks ago" },
                                            ].map((l, i) => (
                                                <div key={i} className="flex gap-4 relative">
                                                    {i !== 2 && <div className="absolute left-[7px] top-6 bottom-[-24px] w-0.5 bg-gray-200" />}
                                                    <div className="w-4 h-4 rounded-full bg-primary-50 border-4 border-white shadow-sm z-10" />
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-700">{l.msg}</p>
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{l.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuildProfile;

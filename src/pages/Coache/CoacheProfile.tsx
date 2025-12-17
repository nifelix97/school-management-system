import React, { useState } from "react";
import {
    IoCallOutline,
    IoCameraOutline,
    IoLocationOutline,
    IoMailOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoRibbonOutline,
    IoSaveOutline,
    IoTrophyOutline
} from "react-icons/io5";

const CoacheProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    
    // Mock Data State
    const [profile, setProfile] = useState({
        name: "Coach Carter",
        role: "Head Coach",
        department: "Athletics",
        email: "coach.carter@school.edu",
        phone: "+1 (555) 123-4567",
        location: "Sports Complex, Office 101",
        bio: "Dedicated coach with over 10 years of experience in high school athletics. Passionate about player development and team building. Led the varsity basketball team to 3 state championships.",
        certifications: [
            "National Coaching Certification Program (NCCP) Level 3",
            "First Aid & CPR Certified",
            "Certified Strength and Conditioning Specialist (CSCS)"
        ],
        specializations: ["Basketball", "Athletic Development", "Sports Psychology"],
        experience: "12 Years"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header / Cover */}
                <div className="relative h-48 rounded-3xl bg-gradient-to-r from-primary-100 to-blue-600 shadow-lg overflow-hidden mb-16">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Profile Card */}
                <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 -mt-24 mb-6 px-6 pb-6 pt-0">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Avatar */}
                        <div className="relative -mt-16 shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center overflow-hidden">
                                <IoPersonOutline className="w-16 h-16 text-gray-400" />
                                {/* <img src="..." alt="Profile" className="w-full h-full object-cover" /> */}
                            </div>
                            <button className="absolute bottom-2 right-0 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-primary-100 transition-colors border border-gray-100">
                                <IoCameraOutline className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 text-center md:text-left pt-4 md:pt-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                            className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-primary-100 focus:outline-none bg-transparent w-full md:w-auto"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                                    )}
                                    <p className="text-gray-500 font-medium">{profile.role} • {profile.department}</p>
                                </div>
                                
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        isEditing 
                                            ? "bg-primary-100 text-white shadow-md" 
                                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {isEditing ? (
                                        <><IoSaveOutline className="w-4 h-4" /> Save Changes</>
                                    ) : (
                                        <><IoPencilOutline className="w-4 h-4" /> Edit Profile</>
                                    )}
                                </button>
                            </div>

                            {/* Contact Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="p-2 bg-white rounded-lg text-primary-100 shadow-sm">
                                        <IoMailOutline className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 font-medium uppercase">Email</p>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleChange}
                                                className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary-100 outline-none w-full"
                                            />
                                        ) : (
                                            <p className="text-sm font-bold text-gray-900 truncate">{profile.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="p-2 bg-white rounded-lg text-primary-100 shadow-sm">
                                        <IoCallOutline className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 font-medium uppercase">Phone</p>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleChange}
                                                className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary-100 outline-none w-full"
                                            />
                                        ) : (
                                            <p className="text-sm font-bold text-gray-900 truncate">{profile.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="p-2 bg-white rounded-lg text-primary-100 shadow-sm">
                                        <IoLocationOutline className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 font-medium uppercase">Office</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={profile.location}
                                                onChange={handleChange}
                                                className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary-100 outline-none w-full"
                                            />
                                        ) : (
                                            <p className="text-sm font-bold text-gray-900 truncate">{profile.location}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Certifications & Expertise */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <IoRibbonOutline className="text-primary-100" /> Certifications
                            </h3>
                            <ul className="space-y-3">
                                {profile.certifications.map((cert, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-100 shrink-0" />
                                        {cert}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <IoTrophyOutline className="text-primary-100" /> Specializations
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.specializations.map((spec, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-bold border border-gray-200">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bio & Experience */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Biography</h3>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200 focus:border-primary-100 outline-none resize-none"
                                />
                            ) : (
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {profile.bio}
                                </p>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Coaching Attributes</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">Experience</p>
                                    <p className="text-xl font-bold text-gray-900">{profile.experience}</p>
                                </div>
                                <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
                                    <p className="text-xs font-bold text-green-600 uppercase mb-1">Teams Managed</p>
                                    <p className="text-xl font-bold text-gray-900">4 Active</p>
                                </div>
                                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                                    <p className="text-xs font-bold text-purple-600 uppercase mb-1">Win Rate</p>
                                    <p className="text-xl font-bold text-gray-900">75%</p>
                                </div>
                                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                                    <p className="text-xs font-bold text-amber-600 uppercase mb-1">Seasons</p>
                                    <p className="text-xl font-bold text-gray-900">12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoacheProfile;

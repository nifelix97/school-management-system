import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoCallOutline,
    IoGlobeOutline,
    IoLocationOutline,
    IoMailOutline,
    IoPencilOutline,
    IoSaveOutline,
    IoShieldCheckmarkOutline,
    IoWalletOutline
} from "react-icons/io5";

const VendorProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    
    // Mock Data
    const [profile, setProfile] = useState({
        companyName: "TechSolutions Inc.",
        contactPerson: "Michael Chang",
        email: "contact@techsolutions.com",
        phone: "+1 (555) 123-4567",
        website: "https://www.techsolutions.com",
        address: "123 Innovation Drive, Tech Valley, CA 94043",
        category: "Electronics & IT Supplies",
        taxId: "US-882910392",
        description: "Leading provider of educational technology hardware and software solutions. We specialize in equipping schools with modern computer labs, smart classroom devices, and reliable networking infrastructure.",
        bankName: "Silicon Valley Bank",
        accountNumber: "**** **** **** 8829"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically make an API call to update the profile
        alert("Profile updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl p-6 sm:p-10 text-white shadow-lg mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0">
                            {/* Placeholder Logo */}
                            <span className="text-4xl font-bold text-primary-100">TS</span>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{profile.companyName}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-primary-50">
                                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-md">
                                    <IoBriefcaseOutline /> {profile.category}
                                </span>
                                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-md">
                                    <IoShieldCheckmarkOutline /> Verified Vendor
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md ${
                                isEditing 
                                    ? "bg-white text-primary-100 hover:bg-gray-50" 
                                    : "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white"
                            }`}
                        >
                            {isEditing ? <><IoSaveOutline className="w-5 h-5" /> Save Changes</> : <><IoPencilOutline className="w-5 h-5" /> Edit Profile</>}
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary-100 rounded-full"></span>
                                Company Overview
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                                    {isEditing ? (
                                        <textarea
                                            name="description"
                                            value={profile.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all"
                                        />
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed">{profile.description}</p>
                                    )}
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Industry Category</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="category"
                                                value={profile.category}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{profile.category}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Tax ID / Registration No.</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="taxId"
                                                value={profile.taxId}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{profile.taxId}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Settings */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary-100 rounded-full"></span>
                                Payment Information
                            </h2>
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="p-3 bg-white rounded-lg shadow-sm text-primary-100">
                                    <IoWalletOutline className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Bank Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="bankName"
                                                    value={profile.bankName}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100"
                                                />
                                            ) : (
                                                <p className="font-medium text-gray-900">{profile.bankName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Account Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="accountNumber"
                                                    value={profile.accountNumber}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100"
                                                />
                                            ) : (
                                                <p className="font-medium text-gray-900 font-mono">{profile.accountNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Contact Details</h3>
                            <ul className="space-y-4">
                                <li>
                                    <div className="flex items-start gap-3">
                                        <IoLocationOutline className="w-5 h-5 text-primary-100 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <span className="block text-xs text-gray-400 mb-0.5">Address</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={profile.address}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100"
                                                />
                                            ) : (
                                                <span className="text-sm font-medium text-gray-700">{profile.address}</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <IoMailOutline className="w-5 h-5 text-primary-100 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <span className="block text-xs text-gray-400 mb-0.5">Email Address</span>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100"
                                                />
                                            ) : (
                                                <span className="text-sm font-medium text-gray-700">{profile.email}</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <IoCallOutline className="w-5 h-5 text-primary-100 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <span className="block text-xs text-gray-400 mb-0.5">Phone Number</span>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={profile.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100"
                                                />
                                            ) : (
                                                <span className="text-sm font-medium text-gray-700">{profile.phone}</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <IoGlobeOutline className="w-5 h-5 text-primary-100 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <span className="block text-xs text-gray-400 mb-0.5">Website</span>
                                            {isEditing ? (
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={profile.website}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100"
                                                />
                                            ) : (
                                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-100 hover:underline">
                                                    {profile.website.replace("https://", "")}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;


import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoLogoLinkedin,
    IoMailOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStar,
    IoStarOutline
} from "react-icons/io5";

// Types
interface Mentor {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    graduationYear: number;
    major: string;
    currentCompany: string;
    currentPosition: string;
    industry: string;
    location: string;
    expertise: string[];
    bio: string;
    linkedInUrl?: string;
    rating: number;
    menteeCount: number;
    isAvailable: boolean;
}

const Mentorship: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterIndustry, setFilterIndustry] = useState<string>("All");
    const [filterExpertise, setFilterExpertise] = useState<string>("All");
    const [filterAvailability, setFilterAvailability] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
    const [requestForm, setRequestForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        graduationYear: "",
        currentStatus: "Student",
        goals: "",
        areasOfInterest: "",
        preferredMeetingFrequency: "Bi-weekly"
    });

    // Mock data
    const mentors: Mentor[] = [
        {
            id: "1",
            firstName: "Sarah",
            lastName: "Johnson",
            profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2015,
            major: "Computer Science",
            currentCompany: "Tech Innovations Inc.",
            currentPosition: "VP of Engineering",
            industry: "Technology",
            location: "San Francisco, CA",
            expertise: ["Software Development", "Leadership", "Career Growth", "Tech Startups"],
            bio: "Passionate about helping early-career engineers navigate the tech industry. 10+ years of experience in software development and team leadership.",
            linkedInUrl: "linkedin.com/in/sarahjohnson",
            rating: 4.9,
            menteeCount: 15,
            isAvailable: true
        },
        {
            id: "2",
            firstName: "Michael",
            lastName: "Chen",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2018,
            major: "Business Administration",
            currentCompany: "Global Consulting Group",
            currentPosition: "Senior Consultant",
            industry: "Consulting",
            location: "New York, NY",
            expertise: ["Business Strategy", "Consulting", "MBA Prep", "Networking"],
            bio: "Helping students and young professionals break into consulting. Former McKinsey analyst with MBA from Harvard.",
            linkedInUrl: "linkedin.com/in/michaelchen",
            rating: 4.8,
            menteeCount: 12,
            isAvailable: true
        },
        {
            id: "3",
            firstName: "Emma",
            lastName: "Williams",
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2017,
            major: "Data Science",
            currentCompany: "Analytics Pro",
            currentPosition: "Lead Data Scientist",
            industry: "Technology",
            location: "Seattle, WA",
            expertise: ["Data Science", "Machine Learning", "Python", "Career Transition"],
            bio: "Transitioned from academia to industry. Happy to guide aspiring data scientists through their career journey.",
            rating: 4.7,
            menteeCount: 10,
            isAvailable: false
        },
        {
            id: "4",
            firstName: "James",
            lastName: "Rodriguez",
            profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2016,
            major: "Marketing",
            currentCompany: "Creative Marketing Solutions",
            currentPosition: "Marketing Director",
            industry: "Marketing",
            location: "Los Angeles, CA",
            expertise: ["Digital Marketing", "Brand Strategy", "Social Media", "Content Creation"],
            bio: "15 years in marketing, specializing in digital transformation and brand building. Love mentoring creative minds.",
            linkedInUrl: "linkedin.com/in/jamesrodriguez",
            rating: 4.9,
            menteeCount: 18,
            isAvailable: true
        },
        {
            id: "5",
            firstName: "David",
            lastName: "Anderson",
            profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2014,
            major: "Finance",
            currentCompany: "Investment Partners LLC",
            currentPosition: "Portfolio Manager",
            industry: "Finance",
            location: "Chicago, IL",
            expertise: ["Investment Banking", "Finance", "CFA Prep", "Portfolio Management"],
            bio: "CFA charterholder with 12+ years in finance. Mentoring students interested in investment banking and asset management.",
            linkedInUrl: "linkedin.com/in/davidanderson",
            rating: 4.8,
            menteeCount: 14,
            isAvailable: true
        },
        {
            id: "6",
            firstName: "Sophia",
            lastName: "Martinez",
            profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2020,
            major: "Biology",
            currentCompany: "BioTech Research",
            currentPosition: "Research Scientist",
            industry: "Healthcare",
            location: "San Diego, CA",
            expertise: ["Biotechnology", "Research", "PhD Guidance", "Lab Management"],
            bio: "PhD in molecular biology. Passionate about mentoring students pursuing careers in biotech and research.",
            rating: 4.6,
            menteeCount: 8,
            isAvailable: true
        }
    ];

    // Statistics
    const totalMentors = mentors.length;
    const availableMentors = mentors.filter(m => m.isAvailable).length;
    const avgRating = (mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length).toFixed(1);
    const totalMentees = mentors.reduce((sum, m) => sum + m.menteeCount, 0);

    const stats = [
        {
            title: "Available Mentors",
            value: availableMentors.toString(),
            subtitle: `${totalMentors} total`,
            icon: <IoPeopleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Active Mentorships",
            value: "156",
            subtitle: "ongoing connections",
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Average Rating",
            value: avgRating,
            subtitle: "mentor satisfaction",
            icon: <IoStar className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
        {
            title: "Total Mentees",
            value: totalMentees.toString(),
            subtitle: "students helped",
            icon: <IoSchoolOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
    ];

    // Filter mentors
    const filteredMentors = mentors.filter(mentor => {
        const matchesSearch = 
            mentor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesIndustry = filterIndustry === "All" || mentor.industry === filterIndustry;
        const matchesExpertise = filterExpertise === "All" || mentor.expertise.includes(filterExpertise);
        const matchesAvailability = !filterAvailability || mentor.isAvailable;

        return matchesSearch && matchesIndustry && matchesExpertise && matchesAvailability;
    });

    // Request handlers
    const handleRequestMentorship = (mentorId: string) => {
        setSelectedMentorId(mentorId);
        setShowRequestModal(true);
    };

    const submitRequest = () => {
        // Validate form
        if (!requestForm.fullName || !requestForm.email || !requestForm.graduationYear || !requestForm.goals) {
            alert("Please fill in all required fields.");
            return;
        }

        // Email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(requestForm.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (selectedMentorId) {
            const mentor = mentors.find(m => m.id === selectedMentorId);
            alert(`✅ Request Sent Successfully!\n\nYour mentorship request has been sent to ${mentor?.firstName} ${mentor?.lastName}.\n\nThey will review your profile and goals. You'll receive an email notification at ${requestForm.email} once they respond.`);
            
            // Reset form and close modal
            setRequestForm({
                fullName: "",
                email: "",
                phone: "",
                graduationYear: "",
                currentStatus: "Student",
                goals: "",
                areasOfInterest: "",
                preferredMeetingFrequency: "Bi-weekly"
            });
            setShowRequestModal(false);
            setSelectedMentorId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                    Mentorship Program
                </h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Connect with experienced alumni mentors to guide your career journey.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md w-fit group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1">{stat.title}</div>
                                <div className="text-xs text-gray-400">{stat.subtitle}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, company, or expertise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-white rounded-lg sm:rounded-xl hover:bg-primary-100 transition-colors font-medium text-sm sm:text-base shadow-sm"
                    >
                        <IoFilterOutline className="w-5 h-5" />
                        <span className="hidden xs:inline">Filters</span>
                        <IoChevronDownOutline className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <select
                                value={filterIndustry}
                                onChange={(e) => setFilterIndustry(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Industries</option>
                                <option value="Technology">Technology</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Expertise</label>
                            <select
                                value={filterExpertise}
                                onChange={(e) => setFilterExpertise(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Expertise</option>
                                <option value="Software Development">Software Development</option>
                                <option value="Leadership">Leadership</option>
                                <option value="Business Strategy">Business Strategy</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filterAvailability}
                                    onChange={(e) => setFilterAvailability(e.target.checked)}
                                    className="w-4 h-4 text-primary-50 border-gray-300 rounded focus:ring-2 focus:ring-primary-100"
                                />
                                <span className="text-sm font-medium text-gray-700">Available only</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Mentor Grid */}
            {filteredMentors.length === 0 ? (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                    <IoPeopleOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No mentors found</h3>
                    <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredMentors.map((mentor) => (
                            <div
                                key={mentor.id}
                                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
                            >
                                {/* Header with gradient */}
                                <div className="relative h-24 sm:h-32 bg-gradient-to-br from-primary-50 to-primary-100">
                                    <img
                                        src={mentor.profileImage}
                                        alt={`${mentor.firstName} ${mentor.lastName}`}
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                    {mentor.isAvailable && (
                                        <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                            <IoCheckmarkCircleOutline className="w-3 h-3" />
                                            Available
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pt-12 sm:pt-14 p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-1 group-hover:text-primary-100 transition-colors">
                                        {mentor.firstName} {mentor.lastName}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">
                                        Class of {mentor.graduationYear} • {mentor.major}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center justify-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.floor(mentor.rating) ? (
                                                <IoStar key={i} className="w-4 h-4 text-amber-400" />
                                            ) : (
                                                <IoStarOutline key={i} className="w-4 h-4 text-gray-300" />
                                            )
                                        ))}
                                        <span className="text-sm font-semibold text-gray-700 ml-1">{mentor.rating}</span>
                                        <span className="text-xs text-gray-500">({mentor.menteeCount} mentees)</span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                                            <IoBriefcaseOutline className="w-4 h-4 text-primary-50 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2">{mentor.currentPosition} at {mentor.currentCompany}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                            <IoLocationOutline className="w-4 h-4 text-primary-50 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">{mentor.location}</span>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3">
                                        {mentor.bio}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-gray-900 mb-2">Expertise:</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {mentor.expertise.slice(0, 3).map((exp, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                                                    {exp}
                                                </span>
                                            ))}
                                            {mentor.expertise.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                                    +{mentor.expertise.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                                        <button 
                                            disabled={!mentor.isAvailable}
                                            onClick={() => handleRequestMentorship(mentor.id)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                mentor.isAvailable
                                                    ? 'bg-primary-50 text-white hover:bg-primary-100'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            Request Mentorship
                                        </button>
                                        <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                                            <IoMailOutline className="w-5 h-5" />
                                        </button>
                                        {mentor.linkedInUrl && (
                                            <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                                                <IoLogoLinkedin className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{filteredMentors.length}</span> of <span className="font-semibold text-gray-900">{totalMentors}</span> mentors
                        </p>
                    </div>
                </>
            )}

            {/* Request Mentorship Modal */}
            {showRequestModal && selectedMentorId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => {
                    setShowRequestModal(false);
                    setSelectedMentorId(null);
                }}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Mentorship</h2>
                        <p className="text-gray-600 mb-6">
                            Requesting mentorship from <span className="font-semibold text-primary-100">{mentors.find(m => m.id === selectedMentorId)?.firstName} {mentors.find(m => m.id === selectedMentorId)?.lastName}</span>
                        </p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={requestForm.fullName}
                                        onChange={(e) => setRequestForm({ ...requestForm, fullName: e.target.value })}
                                        placeholder="Your name"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Graduation Year */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Graduation Year <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={requestForm.graduationYear}
                                        onChange={(e) => setRequestForm({ ...requestForm, graduationYear: e.target.value })}
                                        placeholder="YYYY"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={requestForm.email}
                                        onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        value={requestForm.phone}
                                        onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                                        placeholder="+250..."
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Current Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Status
                                </label>
                                <select
                                    value={requestForm.currentStatus}
                                    onChange={(e) => setRequestForm({ ...requestForm, currentStatus: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Recent Graduate">Recent Graduate</option>
                                    <option value="Working Professional">Working Professional</option>
                                    <option value="Job Seeker">Job Seeker</option>
                                </select>
                            </div>

                            {/* Mentorship Goals */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mentorship Goals <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={requestForm.goals}
                                    onChange={(e) => setRequestForm({ ...requestForm, goals: e.target.value })}
                                    placeholder="What do you hope to achieve from this mentorship? (e.g., career guidance, industry insights, resume review)"
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            {/* Areas of Interest */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Specific Areas of Interest
                                </label>
                                <input
                                    type="text"
                                    value={requestForm.areasOfInterest}
                                    onChange={(e) => setRequestForm({ ...requestForm, areasOfInterest: e.target.value })}
                                    placeholder="e.g., Artificial Intelligence, Project Management, Interview Prep"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                />
                            </div>

                            {/* Preferred Frequency */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Meeting Frequency
                                </label>
                                <select
                                    value={requestForm.preferredMeetingFrequency}
                                    onChange={(e) => setRequestForm({ ...requestForm, preferredMeetingFrequency: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                >
                                    <option value="Weekly">Weekly</option>
                                    <option value="Bi-weekly">Bi-weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="One-time">One-time Meeting</option>
                                </select>
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> Mentors serve on a voluntary basis. Please be respectful of their time and clear about your expectations.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedMentorId(null);
                                    setRequestForm({
                                        fullName: "",
                                        email: "",
                                        phone: "",
                                        graduationYear: "",
                                        currentStatus: "Student",
                                        goals: "",
                                        areasOfInterest: "",
                                        preferredMeetingFrequency: "Bi-weekly"
                                    });
                                }}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitRequest}
                                className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mentorship;

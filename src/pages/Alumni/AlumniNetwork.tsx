
import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoFilterOutline,
    IoGlobeOutline,
    IoLocationOutline,
    IoLogoLinkedin,
    IoMailOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTrendingUpOutline,
} from "react-icons/io5";

// Types
interface AlumniMember {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    graduationYear: number;
    degree: string;
    major: string;
    currentCompany?: string;
    currentPosition?: string;
    industry?: string;
    location?: string;
    linkedInUrl?: string;
    isMentor: boolean;
    isConnected: boolean;
}

const AlumniNetwork: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterYear, setFilterYear] = useState<string>("All");
    const [filterMajor, setFilterMajor] = useState<string>("All");
    const [filterIndustry, setFilterIndustry] = useState<string>("All");
    const [filterMentorOnly, setFilterMentorOnly] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Mock data
    const alumniMembers: AlumniMember[] = [
        {
            id: "1",
            firstName: "Sarah",
            lastName: "Johnson",
            profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2015,
            degree: "Bachelor of Science",
            major: "Computer Science",
            currentCompany: "Tech Innovations Inc.",
            currentPosition: "Senior Software Engineer",
            industry: "Information Technology",
            location: "San Francisco, CA",
            linkedInUrl: "linkedin.com/in/sarahjohnson",
            isMentor: true,
            isConnected: true
        },
        {
            id: "2",
            firstName: "Michael",
            lastName: "Chen",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2018,
            degree: "Bachelor of Business Administration",
            major: "Business Administration",
            currentCompany: "Global Consulting Group",
            currentPosition: "Management Consultant",
            industry: "Consulting",
            location: "New York, NY",
            linkedInUrl: "linkedin.com/in/michaelchen",
            isMentor: true,
            isConnected: false
        },
        {
            id: "3",
            firstName: "Emma",
            lastName: "Williams",
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2017,
            degree: "Master of Science",
            major: "Data Science",
            currentCompany: "Analytics Pro",
            currentPosition: "Lead Data Scientist",
            industry: "Technology",
            location: "Seattle, WA",
            linkedInUrl: "linkedin.com/in/emmawilliams",
            isMentor: false,
            isConnected: true
        },
        {
            id: "4",
            firstName: "James",
            lastName: "Rodriguez",
            profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2016,
            degree: "Bachelor of Arts",
            major: "Marketing",
            currentCompany: "Creative Marketing Solutions",
            currentPosition: "Marketing Director",
            industry: "Marketing",
            location: "Los Angeles, CA",
            linkedInUrl: "linkedin.com/in/jamesrodriguez",
            isMentor: true,
            isConnected: false
        },
        {
            id: "5",
            firstName: "Olivia",
            lastName: "Taylor",
            profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2019,
            degree: "Bachelor of Science",
            major: "Mechanical Engineering",
            currentCompany: "Engineering Innovations",
            currentPosition: "Project Engineer",
            industry: "Engineering",
            location: "Boston, MA",
            isMentor: false,
            isConnected: false
        },
        {
            id: "6",
            firstName: "David",
            lastName: "Anderson",
            profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2014,
            degree: "Master of Business Administration",
            major: "Finance",
            currentCompany: "Investment Partners LLC",
            currentPosition: "Senior Financial Analyst",
            industry: "Finance",
            location: "Chicago, IL",
            linkedInUrl: "linkedin.com/in/davidanderson",
            isMentor: true,
            isConnected: true
        },
        {
            id: "7",
            firstName: "Sophia",
            lastName: "Martinez",
            profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2020,
            degree: "Bachelor of Science",
            major: "Biology",
            currentCompany: "BioTech Research",
            currentPosition: "Research Scientist",
            industry: "Healthcare",
            location: "San Diego, CA",
            isMentor: false,
            isConnected: false
        },
        {
            id: "8",
            firstName: "Daniel",
            lastName: "Lee",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
            graduationYear: 2013,
            degree: "Bachelor of Arts",
            major: "Graphic Design",
            currentCompany: "Creative Studio",
            currentPosition: "Creative Director",
            industry: "Design",
            location: "Austin, TX",
            linkedInUrl: "linkedin.com/in/daniellee",
            isMentor: true,
            isConnected: false
        }
    ];

    // Statistics
    const totalAlumni = alumniMembers.length;
    const mentorCount = alumniMembers.filter(a => a.isMentor).length;
    const connectedCount = alumniMembers.filter(a => a.isConnected).length;
    const industriesCount = new Set(alumniMembers.map(a => a.industry).filter(Boolean)).size;

    const stats = [
        {
            title: "Total Alumni",
            value: "2,847",
            subtitle: `${totalAlumni} shown`,
            icon: <IoPeopleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Available Mentors",
            value: mentorCount.toString(),
            subtitle: "ready to help",
            icon: <IoSchoolOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Your Connections",
            value: connectedCount.toString(),
            subtitle: "in network",
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
        {
            title: "Industries",
            value: industriesCount.toString(),
            subtitle: "represented",
            icon: <IoGlobeOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
    ];

    // Filter alumni
    const filteredAlumni = alumniMembers.filter(alumni => {
        const matchesSearch = 
            alumni.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumni.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumni.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumni.currentPosition?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesYear = filterYear === "All" || alumni.graduationYear.toString() === filterYear;
        const matchesMajor = filterMajor === "All" || alumni.major === filterMajor;
        const matchesIndustry = filterIndustry === "All" || alumni.industry === filterIndustry;
        const matchesMentor = !filterMentorOnly || alumni.isMentor;

        return matchesSearch && matchesYear && matchesMajor && matchesIndustry && matchesMentor;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                    Alumni Network
                </h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Connect with fellow graduates and expand your professional network.
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
                            placeholder="Search by name, company, or position..."
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Years</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Major</label>
                            <select
                                value={filterMajor}
                                onChange={(e) => setFilterMajor(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Majors</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Finance">Finance</option>
                                <option value="Biology">Biology</option>
                                <option value="Graphic Design">Graphic Design</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <select
                                value={filterIndustry}
                                onChange={(e) => setFilterIndustry(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Industries</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Technology">Technology</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filterMentorOnly}
                                    onChange={(e) => setFilterMentorOnly(e.target.checked)}
                                    className="w-4 h-4 text-primary-50 border-gray-300 rounded focus:ring-2 focus:ring-primary-100"
                                />
                                <span className="text-sm font-medium text-gray-700">Mentors only</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Alumni Grid */}
            {filteredAlumni.length === 0 ? (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                    <IoPeopleOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No alumni found</h3>
                    <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredAlumni.map((alumni) => (
                            <div
                                key={alumni.id}
                                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
                            >
                                {/* Profile Image */}
                                <div className="relative h-32 sm:h-40 bg-gradient-to-br from-primary-50 to-primary-100">
                                    <img
                                        src={alumni.profileImage}
                                        alt={`${alumni.firstName} ${alumni.lastName}`}
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                    {alumni.isMentor && (
                                        <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                            <IoCheckmarkCircleOutline className="w-3 h-3" />
                                            Mentor
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pt-12 sm:pt-14 p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-1 group-hover:text-primary-100 transition-colors">
                                        {alumni.firstName} {alumni.lastName}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">
                                        Class of {alumni.graduationYear}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        {alumni.currentPosition && (
                                            <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                                                <IoBriefcaseOutline className="w-4 h-4 text-primary-50 flex-shrink-0 mt-0.5" />
                                                <span className="line-clamp-2">{alumni.currentPosition}</span>
                                            </div>
                                        )}
                                        {alumni.currentCompany && (
                                            <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                                <IoTrendingUpOutline className="w-4 h-4 text-primary-50 flex-shrink-0 mt-0.5" />
                                                <span className="line-clamp-1">{alumni.currentCompany}</span>
                                            </div>
                                        )}
                                        {alumni.location && (
                                            <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                                <IoLocationOutline className="w-4 h-4 text-primary-50 flex-shrink-0 mt-0.5" />
                                                <span className="line-clamp-1">{alumni.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                                        {alumni.isConnected ? (
                                            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                                <IoCheckmarkCircleOutline className="w-4 h-4" />
                                                Connected
                                            </button>
                                        ) : (
                                            <button className="flex-1 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium">
                                                Connect
                                            </button>
                                        )}
                                        <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                                            <IoMailOutline className="w-5 h-5" />
                                        </button>
                                        {alumni.linkedInUrl && (
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
                            Showing <span className="font-semibold text-gray-900">{filteredAlumni.length}</span> of <span className="font-semibold text-gray-900">{totalAlumni}</span> alumni
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default AlumniNetwork;

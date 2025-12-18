
import React, { useState } from "react";
import {
    IoBriefcaseOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoLogoLinkedin,
    IoMailOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStar
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

const MOCK_MENTORS: Mentor[] = [
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
        expertise: ["Software Development", "Leadership", "Career Growth"],
        bio: "Passionate about helping early-career engineers navigate the tech industry.",
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
        currentCompany: "Global Consulting",
        currentPosition: "Senior Consultant",
        industry: "Consulting",
        location: "New York, NY",
        expertise: ["Strategy", "Consulting", "MBA Prep"],
        bio: "Helping students and young professionals break into consulting.",
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
        expertise: ["Machine Learning", "Python", "Data Analysis"],
        bio: "Transitioned from academia to industry. Happy to guide aspiring data scientists.",
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
        currentCompany: "Creative Marketing",
        currentPosition: "Marketing Director",
        industry: "Marketing",
        location: "Los Angeles, CA",
        expertise: ["Digital Marketing", "Brand Strategy", "Content"],
        bio: "15 years in marketing, specializing in digital transformation and brand building.",
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
        currentCompany: "Investment Partners",
        currentPosition: "Portfolio Manager",
        industry: "Finance",
        location: "Chicago, IL",
        expertise: ["Investment Banking", "CFA Prep", "Finance"],
        bio: "CFA charterholder with 12+ years in finance. Mentoring in asset management.",
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
        expertise: ["Biotechnology", "Research", "Lab Mgmt"],
        bio: "PhD in molecular biology. Passionate about research and biotech careers.",
        rating: 4.6,
        menteeCount: 8,
        isAvailable: true
    },
    {
        id: "7",
        firstName: "Robert",
        lastName: "Kim",
        profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        graduationYear: 2013,
        major: "Mechanical Engineering",
        currentCompany: "AutoDrive Systems",
        currentPosition: "VP Construction",
        industry: "Engineering",
        location: "Detroit, MI",
        expertise: ["Product Design", "Team Mgmt", "Robotics"],
        bio: "Focused on bridging the gap between engineering theory and industrial practice.",
        rating: 4.9,
        menteeCount: 22,
        isAvailable: true
    },
    {
        id: "8",
        firstName: "Lisa",
        lastName: "Wang",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        graduationYear: 2019,
        major: "Graphic Design",
        currentCompany: "Studio Bloom",
        currentPosition: "Creative Lead",
        industry: "Design",
        location: "Portland, OR",
        expertise: ["UX Design", "Typography", "Branding"],
        bio: "Passionate about visual storytelling and creating meaningful brand identities.",
        rating: 4.7,
        menteeCount: 9,
        isAvailable: true
    },
    {
        id: "9",
        firstName: "Maria",
        lastName: "Garcia",
        profileImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        graduationYear: 2012,
        major: "Political Science",
        currentCompany: "Corporate Legal Hub",
        currentPosition: "Principal Attorney",
        industry: "Legal",
        location: "Washington, DC",
        expertise: ["Policy", "Corporate Law", "Negotiation"],
        bio: "Guiding aspiring lawyers and policy makers through the complexities of law.",
        rating: 5.0,
        menteeCount: 25,
        isAvailable: false
    },
    {
        id: "10",
        firstName: "Kevin",
        lastName: "Smith",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        graduationYear: 2011,
        major: "Education",
        currentCompany: "National Academy",
        currentPosition: "Program Director",
        industry: "Education",
        location: "Boston, MA",
        expertise: ["Curriculum", "EdTech", "Administration"],
        bio: "Improving educational outcomes through technology and innovative teaching.",
        rating: 4.8,
        menteeCount: 16,
        isAvailable: true
    },
    {
        id: "11",
        firstName: "Rachel",
        lastName: "Green",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        graduationYear: 2021,
        major: "Fashion Merchandising",
        currentCompany: "Style Collective",
        currentPosition: "Trend Analyst",
        industry: "Retail",
        location: "New York, NY",
        expertise: ["Retail Tech", "Trend Analysis", "Sourcing"],
        bio: "Recent grad navigating the fast-paced world of fashion and retail analysis.",
        rating: 4.5,
        menteeCount: 5,
        isAvailable: true
    },
    {
        id: "12",
        firstName: "Alex",
        lastName: "Foster",
        profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
        graduationYear: 2010,
        major: "Journalism",
        currentCompany: "Global News Net",
        currentPosition: "Senior Editor",
        industry: "Media",
        location: "London, UK",
        expertise: ["Media Strategy", "Editing", "Public Relations"],
        bio: "Specializing in digital media transformation and high-impact investigative reporting.",
        rating: 4.9,
        menteeCount: 20,
        isAvailable: true
    }
];

const Mentorship: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterIndustry, setFilterIndustry] = useState<string>("All");
    const [filterExpertise, setFilterExpertise] = useState<string>("All");
    const [filterAvailability, setFilterAvailability] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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

    // Statistics memo
    const stats = React.useMemo(() => {
        const totalMentors = MOCK_MENTORS.length;
        const availableMentors = MOCK_MENTORS.filter(m => m.isAvailable).length;
        const avgRating = (MOCK_MENTORS.reduce((sum, m) => sum + m.rating, 0) / MOCK_MENTORS.length).toFixed(1);
        const totalMentees = MOCK_MENTORS.reduce((sum, m) => sum + m.menteeCount, 0);

        return [
            {
                title: "Available",
                value: availableMentors.toString(),
                subtitle: `${totalMentors} Total`,
                icon: <IoPeopleOutline className="w-5 h-5" />,
                gradient: "from-blue-500 to-blue-600",
            },
            {
                title: "Ongoing",
                value: "156",
                subtitle: "Connections",
                icon: <IoCheckmarkCircleOutline className="w-5 h-5" />,
                gradient: "from-emerald-500 to-emerald-600",
            },
            {
                title: "Rating",
                value: avgRating,
                subtitle: "Satisfaction",
                icon: <IoStar className="w-5 h-5" />,
                gradient: "from-amber-500 to-amber-600",
            },
            {
                title: "Help Given",
                value: totalMentees.toString(),
                subtitle: "Students",
                icon: <IoSchoolOutline className="w-5 h-5" />,
                gradient: "from-purple-500 to-purple-600",
            },
        ];
    }, []);

    // Filtered mentors memo
    const filteredMentors = React.useMemo(() => {
        return MOCK_MENTORS.filter(mentor => {
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
    }, [searchTerm, filterIndustry, filterExpertise, filterAvailability]);

    // Pagination
    const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);
    const paginatedMentors = filteredMentors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset page on search or filter change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterIndustry, filterExpertise, filterAvailability]);

    const handleRequestMentorship = (mentorId: string) => {
        setSelectedMentorId(mentorId);
        setShowRequestModal(true);
    };

    const submitRequest = () => {
        if (!requestForm.fullName || !requestForm.email || !requestForm.goals) {
            alert("Required: Name, Email, Goals");
            return;
        }
        const mentor = MOCK_MENTORS.find(m => m.id === selectedMentorId);
        alert(`Request sent to ${mentor?.firstName}! They will review your goals and respond via email.`);
        setShowRequestModal(false);
        setRequestForm({
            fullName: "", email: "", phone: "", graduationYear: "",
            currentStatus: "Student", goals: "", areasOfInterest: "", preferredMeetingFrequency: "Bi-weekly"
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Mentorship Program</h1>
                    <p className="text-sm text-gray-500">Connect with alumni leaders to accelerate your career growth.</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm`}>
                            {stat.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 truncate">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filters Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-3 overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find a mentor by name, skill, or industry..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-100/20 text-sm transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${showFilters ? 'bg-primary-50 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <IoFilterOutline /> Filters
                        </button>
                        <div className="h-10 w-px bg-gray-100 hidden lg:block" />
                        <div className="flex items-center gap-2 px-3">
                            <input 
                                type="checkbox" 
                                id="avail"
                                checked={filterAvailability} 
                                onChange={(e) => setFilterAvailability(e.target.checked)}
                                className="w-4 h-4 text-primary-50 rounded border-gray-300 focus:ring-primary-50"
                            />
                            <label htmlFor="avail" className="text-[10px] font-black uppercase tracking-widest text-gray-500 cursor-pointer">Available Only</label>
                        </div>
                    </div>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-gray-100 animate-slide-down">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Industry</label>
                            <select 
                                value={filterIndustry} 
                                onChange={(e) => setFilterIndustry(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-lg p-2 text-xs font-bold text-gray-600 focus:ring-1 focus:ring-primary-50/20"
                            >
                                <option value="All">All Industries</option>
                                <option value="Technology">Technology</option>
                                <option value="Finance">Finance</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Key Skill</label>
                            <select 
                                value={filterExpertise} 
                                onChange={(e) => setFilterExpertise(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-lg p-2 text-xs font-bold text-gray-600 focus:ring-1 focus:ring-primary-50/20"
                            >
                                <option value="All">All Expertise</option>
                                <option value="Software Development">Software Dev</option>
                                <option value="Leadership">Leadership</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Data Analysis">Data Analysis</option>
                                <option value="UX Design">UX Design</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedMentors.length > 0 ? (
                    paginatedMentors.map((mentor) => (
                        <div key={mentor.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-primary-50/30 transition-all group flex flex-col">
                            {/* Profile Header */}
                            <div className="relative p-6 pt-10 text-center flex-1">
                                <div className="absolute top-4 right-4">
                                    {mentor.isAvailable ? (
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-100 shadow-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Available
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-wider border border-gray-100">
                                            Busy
                                        </span>
                                    )}
                                </div>
                                <div className="relative inline-block mb-4">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-gray-50 shadow-inner">
                                        <img src={mentor.profileImage} alt={mentor.firstName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-400 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                                        {mentor.rating}
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-50 transition-colors">{mentor.firstName} {mentor.lastName}</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                                    Class of {mentor.graduationYear} • {mentor.major}
                                </p>

                                <div className="bg-gray-50/50 rounded-2xl p-4 space-y-2 mb-4 text-left border border-gray-50">
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                        <IoBriefcaseOutline className="text-primary-50" />
                                        <span className="truncate">{mentor.currentPosition}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                        <IoLocationOutline className="text-primary-50" />
                                        <span className="truncate">{mentor.location}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center mb-4">
                                    {mentor.expertise.slice(0, 3).map((skill, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-primary-50/5 text-primary-50 rounded-lg text-[9px] font-black uppercase tracking-tighter border border-primary-50/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-xs text-gray-500 italic line-clamp-2 px-2">"{mentor.bio}"</p>
                            </div>

                            {/* Actions */}
                            <div className="p-4 pt-0">
                                <button 
                                    disabled={!mentor.isAvailable}
                                    onClick={() => handleRequestMentorship(mentor.id)}
                                    className="w-full py-3 bg-primary-50 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Request Mentorship
                                </button>
                                <div className="flex gap-2 mt-2">
                                    <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-primary-50/10 hover:text-primary-50 transition-all flex items-center justify-center">
                                        <IoMailOutline />
                                    </button>
                                    <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-primary-50/10 hover:text-primary-50 transition-all flex items-center justify-center">
                                        <IoLogoLinkedin />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white p-12 text-center rounded-3xl border-2 border-dashed border-gray-100">
                        <IoPeopleOutline className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest">No mentors found matching your search</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="p-2 rounded-xl bg-white border border-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        <IoChevronBackOutline />
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20' : 'bg-white border border-gray-100 text-gray-400 hover:border-primary-50/50'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className="p-2 rounded-xl bg-white border border-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        <IoChevronForwardOutline />
                    </button>
                </div>
            )}

            {/* Mentorship Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowRequestModal(false)} />
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative animate-slide-up overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary-50/5">
                            <div className="min-w-0">
                                <h2 className="text-xl font-bold text-gray-900 truncate">Mentorship Request</h2>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5 truncate">
                                    To {MOCK_MENTORS.find(m => m.id === selectedMentorId)?.firstName} {MOCK_MENTORS.find(m => m.id === selectedMentorId)?.lastName}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">FullName</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-primary-50/20 text-sm font-medium"
                                    value={requestForm.fullName}
                                    onChange={(e) => setRequestForm({...requestForm, fullName: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="address@email.com" 
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-primary-50/20 text-sm font-medium"
                                        value={requestForm.email}
                                        onChange={(e) => setRequestForm({...requestForm, email: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Graduation Year</label>
                                    <input 
                                        type="text" 
                                        placeholder="2024" 
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-primary-50/20 text-sm font-medium"
                                        value={requestForm.graduationYear}
                                        onChange={(e) => setRequestForm({...requestForm, graduationYear: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Goals</label>
                                <textarea 
                                    placeholder="Tell the mentor what you'd like to achieve..." 
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-primary-50/20 text-sm font-medium resize-none"
                                    value={requestForm.goals}
                                    onChange={(e) => setRequestForm({...requestForm, goals: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button onClick={() => setShowRequestModal(false)} className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-gray-600">Cancel</button>
                            <button onClick={submitRequest} className="flex-[2] py-3 bg-primary-50 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary-50/20 active:scale-95 transition-all">Send Request</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mentorship;


import React, { useState } from "react";
import {
    IoBookmark,
    IoBookmarkOutline,
    IoBriefcaseOutline,
    IoBusinessOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
} from "react-icons/io5";

// Types
interface JobPosting {
    id: string;
    title: string;
    company: string;
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Internship";
    level: "Entry" | "Mid" | "Senior" | "Executive";
    salary?: string;
    postedDate: string;
    description: string;
    requirements: string[];
    postedBy: string;
    industry: string;
    isSaved: boolean;
}

const CareerServices: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("All");
    const [filterLevel, setFilterLevel] = useState<string>("All");
    const [filterIndustry, setFilterIndustry] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [applicationForm, setApplicationForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
        linkedInUrl: "",
        yearsExperience: "",
        availability: "Immediate"
    });

    // Mock data
    const [jobs, setJobs] = useState<JobPosting[]>([
        {
            id: "1",
            title: "Senior Software Engineer",
            company: "Tech Innovations Inc.",
            location: "Remote",
            type: "Full-time",
            level: "Senior",
            salary: "$120,000 - $160,000",
            postedDate: "2025-01-10",
            description: "Join our dynamic team to build cutting-edge software solutions. We're looking for an experienced engineer passionate about innovation.",
            requirements: ["5+ years experience", "React/Node.js", "Cloud platforms (AWS/Azure)", "Team leadership"],
            postedBy: "Sarah Johnson '15",
            industry: "Technology",
            isSaved: false
        },
        {
            id: "2",
            title: "Marketing Director",
            company: "Global Marketing Solutions",
            location: "New York, NY",
            type: "Full-time",
            level: "Executive",
            salary: "$140,000 - $180,000",
            postedDate: "2025-01-12",
            description: "Lead our marketing strategy and team to drive brand growth and market presence.",
            requirements: ["10+ years in marketing", "Strategic planning", "Team management", "Digital marketing expertise"],
            postedBy: "Michael Chen '18",
            industry: "Marketing",
            isSaved: true
        },
        {
            id: "3",
            title: "Data Scientist",
            company: "Analytics Pro",
            location: "San Francisco, CA",
            type: "Full-time",
            level: "Mid",
            salary: "$100,000 - $130,000",
            postedDate: "2025-01-08",
            description: "Analyze complex datasets and build predictive models to drive business insights.",
            requirements: ["Python/R proficiency", "Machine Learning", "Statistical analysis", "3+ years experience"],
            postedBy: "Alumni Network",
            industry: "Technology",
            isSaved: false
        },
        {
            id: "4",
            title: "Financial Analyst",
            company: "Investment Partners LLC",
            location: "Chicago, IL",
            type: "Full-time",
            level: "Entry",
            salary: "$65,000 - $85,000",
            postedDate: "2025-01-14",
            description: "Support our investment team with financial modeling and market analysis.",
            requirements: ["Bachelor's in Finance", "Excel proficiency", "Analytical skills", "CFA Level 1 preferred"],
            postedBy: "David Anderson '14",
            industry: "Finance",
            isSaved: false
        },
        {
            id: "5",
            title: "UX/UI Designer",
            company: "Creative Studio",
            location: "Austin, TX",
            type: "Contract",
            level: "Mid",
            salary: "$80,000 - $100,000",
            postedDate: "2025-01-11",
            description: "Design beautiful and intuitive user experiences for our digital products.",
            requirements: ["Figma/Sketch expertise", "Portfolio required", "User research", "3+ years experience"],
            postedBy: "Daniel Lee '13",
            industry: "Design",
            isSaved: true
        },
        {
            id: "6",
            title: "Project Manager",
            company: "Engineering Innovations",
            location: "Boston, MA",
            type: "Full-time",
            level: "Mid",
            salary: "$90,000 - $120,000",
            postedDate: "2025-01-09",
            description: "Lead cross-functional teams to deliver complex engineering projects on time and within budget.",
            requirements: ["PMP certification", "5+ years PM experience", "Agile/Scrum", "Engineering background"],
            postedBy: "Alumni Network",
            industry: "Engineering",
            isSaved: false
        },
        {
            id: "7",
            title: "Sales Representative",
            company: "Tech Solutions Corp",
            location: "Seattle, WA",
            type: "Full-time",
            level: "Entry",
            salary: "$50,000 + Commission",
            postedDate: "2025-01-13",
            description: "Drive revenue growth by building relationships with clients and closing deals.",
            requirements: ["Excellent communication", "Sales experience preferred", "Self-motivated", "Bachelor's degree"],
            postedBy: "Alumni Network",
            industry: "Sales",
            isSaved: false
        },
        {
            id: "8",
            title: "Research Scientist",
            company: "BioTech Research",
            location: "San Diego, CA",
            type: "Full-time",
            level: "Senior",
            salary: "$110,000 - $140,000",
            postedDate: "2025-01-07",
            description: "Conduct groundbreaking research in biotechnology and contribute to scientific publications.",
            requirements: ["PhD in Biology/Chemistry", "Research experience", "Lab skills", "Publication record"],
            postedBy: "Sophia Martinez '20",
            industry: "Healthcare",
            isSaved: false
        }
    ]);

    // Statistics
    const totalJobs = jobs.length;
    const savedJobs = jobs.filter(j => j.isSaved).length;
    const newJobs = jobs.filter(j => {
        const posted = new Date(j.postedDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return posted >= weekAgo;
    }).length;

    const stats = [
        {
            title: "Total Opportunities",
            value: "247",
            subtitle: `${totalJobs} shown`,
            icon: <IoBriefcaseOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Saved Jobs",
            value: savedJobs.toString(),
            subtitle: "in your list",
            icon: <IoBookmark className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
        {
            title: "New This Week",
            value: newJobs.toString(),
            subtitle: "fresh postings",
            icon: <IoTrendingUpOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Alumni Network",
            value: "2,847",
            subtitle: "connections",
            icon: <IoPeopleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
    ];

    // Filter jobs
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = filterType === "All" || job.type === filterType;
        const matchesLevel = filterLevel === "All" || job.level === filterLevel;
        const matchesIndustry = filterIndustry === "All" || job.industry === filterIndustry;

        return matchesSearch && matchesType && matchesLevel && matchesIndustry;
    });

    // Helper functions
    const toggleSaveJob = (jobId: string) => {
        setJobs(jobs.map(job => 
            job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
        ));
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Full-time": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Part-time": return "bg-purple-50 text-purple-700 border-purple-200";
            case "Contract": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Internship": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Entry": return "bg-green-50 text-green-700";
            case "Mid": return "bg-blue-50 text-blue-700";
            case "Senior": return "bg-purple-50 text-purple-700";
            case "Executive": return "bg-red-50 text-red-700";
            default: return "bg-gray-50 text-gray-700";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Application handlers
    const handleApply = (jobId: string) => {
        setSelectedJobId(jobId);
        setShowApplicationModal(true);
    };

    const submitApplication = () => {
        // Validate form
        if (!applicationForm.fullName || !applicationForm.email || !applicationForm.phone) {
            alert("Please fill in all required fields (Name, Email, Phone).");
            return;
        }

        // Email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(applicationForm.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (selectedJobId) {
            const job = jobs.find(j => j.id === selectedJobId);
            alert(`✅ Application submitted successfully!\n\nYou have applied for: ${job?.title} at ${job?.company}\n\nWe'll send a confirmation email to ${applicationForm.email}`);
            
            // Reset form and close modal
            setApplicationForm({
                fullName: "",
                email: "",
                phone: "",
                resumeUrl: "",
                coverLetter: "",
                linkedInUrl: "",
                yearsExperience: "",
                availability: "Immediate"
            });
            setShowApplicationModal(false);
            setSelectedJobId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                    Career Services
                </h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Explore job opportunities posted by alumni and industry partners.
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
                            placeholder="Search by job title, company, or keywords..."
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
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Job Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                            <select
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Levels</option>
                                <option value="Entry">Entry Level</option>
                                <option value="Mid">Mid Level</option>
                                <option value="Senior">Senior Level</option>
                                <option value="Executive">Executive</option>
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
                                <option value="Technology">Technology</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Design">Design</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Sales">Sales</option>
                                <option value="Healthcare">Healthcare</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Job Listings */}
            {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                    <IoBriefcaseOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4 sm:space-y-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
                            >
                                <div className="flex flex-col lg:flex-row gap-4">
                                    {/* Company Logo Placeholder */}
                                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center text-white shadow-md">
                                        <IoBusinessOutline className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-100 transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-base sm:text-lg text-gray-700 font-medium mb-2">{job.company}</p>
                                                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <IoLocationOutline className="w-4 h-4 text-primary-50" />
                                                        {job.location}
                                                    </span>
                                                    {job.salary && (
                                                        <span className="flex items-center gap-1">
                                                            <IoCashOutline className="w-4 h-4 text-primary-50" />
                                                            {job.salary}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1">
                                                        <IoCalendarOutline className="w-4 h-4 text-primary-50" />
                                                        {formatDate(job.postedDate)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Save Button */}
                                            <button
                                                onClick={() => toggleSaveJob(job.id)}
                                                className={`p-2.5 sm:p-3 rounded-lg transition-all ${
                                                    job.isSaved 
                                                        ? 'bg-primary-50 text-white' 
                                                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                {job.isSaved ? (
                                                    <IoBookmark className="w-5 h-5" />
                                                ) : (
                                                    <IoBookmarkOutline className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${getTypeColor(job.type)}`}>
                                                <IoTimeOutline className="w-3 h-3" />
                                                {job.type}
                                            </span>
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getLevelColor(job.level)}`}>
                                                <IoSchoolOutline className="w-3 h-3 inline mr-1" />
                                                {job.level}
                                            </span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                                                {job.industry}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                                            {job.description}
                                        </p>

                                        {/* Requirements */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {job.requirements.slice(0, 4).map((req, idx) => (
                                                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                                                        <IoCheckmarkCircleOutline className="w-3 h-3" />
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                Posted by <span className="font-semibold text-gray-700">{job.postedBy}</span>
                                            </p>
                                            <button 
                                                onClick={() => handleApply(job.id)}
                                                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> of <span className="font-semibold text-gray-900">{totalJobs}</span> opportunities
                        </p>
                    </div>
                </>
            )}

            {/* Application Modal */}
            {showApplicationModal && selectedJobId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => {
                    setShowApplicationModal(false);
                    setSelectedJobId(null);
                }}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Application</h2>
                        <p className="text-gray-600 mb-6">
                            {jobs.find(j => j.id === selectedJobId)?.title} at {jobs.find(j => j.id === selectedJobId)?.company}
                        </p>

                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={applicationForm.fullName}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={applicationForm.email}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={applicationForm.phone}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                                    placeholder="+250 788 123 456"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Resume URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resume/CV Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={applicationForm.resumeUrl}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, resumeUrl: e.target.value })}
                                    placeholder="https://drive.google.com/your-resume"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                />
                            </div>

                            {/* LinkedIn URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn Profile (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={applicationForm.linkedInUrl}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, linkedInUrl: e.target.value })}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                />
                            </div>

                            {/* Years of Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience
                                </label>
                                <select
                                    value={applicationForm.yearsExperience}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, yearsExperience: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                >
                                    <option value="">Select experience level</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Availability
                                </label>
                                <select
                                    value={applicationForm.availability}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, availability: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                >
                                    <option value="Immediate">Immediate</option>
                                    <option value="2 weeks">2 weeks notice</option>
                                    <option value="1 month">1 month notice</option>
                                    <option value="2+ months">2+ months</option>
                                </select>
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cover Letter (Optional)
                                </label>
                                <textarea
                                    value={applicationForm.coverLetter}
                                    onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                                    placeholder="Tell us why you're a great fit for this position..."
                                    rows={5}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> Your application will be sent directly to the hiring manager. You'll receive a confirmation email shortly.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowApplicationModal(false);
                                    setSelectedJobId(null);
                                    setApplicationForm({
                                        fullName: "",
                                        email: "",
                                        phone: "",
                                        resumeUrl: "",
                                        coverLetter: "",
                                        linkedInUrl: "",
                                        yearsExperience: "",
                                        availability: "Immediate"
                                    });
                                }}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitApplication}
                                className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerServices;


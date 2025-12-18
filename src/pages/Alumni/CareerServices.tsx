import React, { useEffect, useMemo, useState } from "react";
import {
    IoBookmark,
    IoBookmarkOutline,
    IoBriefcaseOutline,
    IoBusinessOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoTimeOutline
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    // Mock data - Expanded
    const [jobs, setJobs] = useState<JobPosting[]>([
        {
            id: "1",
            title: "Senior Software Engineer",
            company: "Tech Innovations Inc.",
            location: "Remote",
            type: "Full-time",
            level: "Senior",
            salary: "$120k - $160k",
            postedDate: "2025-01-10",
            description: "Join our dynamic team to build cutting-edge software solutions. We're looking for an experienced engineer passionate about innovation.",
            requirements: ["5+ years experience", "React/Node.js", "AWS/Azure"],
            postedBy: "Sarah Johnson '15",
            industry: "Technology",
            isSaved: false
        },
        {
            id: "2",
            title: "Marketing Director",
            company: "Global Solutions",
            location: "New York, NY",
            type: "Full-time",
            level: "Executive",
            salary: "$140k - $180k",
            postedDate: "2025-01-12",
            description: "Lead our marketing strategy and team to drive brand growth and market presence.",
            requirements: ["10+ years in marketing", "Strategic planning", "Team management"],
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
            salary: "$100k - $130k",
            postedDate: "2025-01-08",
            description: "Analyze complex datasets and build predictive models to drive business insights.",
            requirements: ["Python/R proficiency", "Machine Learning", "3+ years exp"],
            postedBy: "Alumni Network",
            industry: "Technology",
            isSaved: false
        },
        {
            id: "4",
            title: "Financial Analyst",
            company: "Investment Partners",
            location: "Chicago, IL",
            type: "Full-time",
            level: "Entry",
            salary: "$65k - $85k",
            postedDate: "2025-01-14",
            description: "Support our investment team with financial modeling and market analysis.",
            requirements: ["Bachelor's in Finance", "Excel proficiency", "Analytical skills"],
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
            salary: "$80k - $100k",
            postedDate: "2025-01-11",
            description: "Design beautiful and intuitive user experiences for our digital products. Focus on clean visuals and high accessibility.",
            requirements: ["Figma expertise", "Portfolio required", "3+ years exp"],
            postedBy: "Daniel Lee '13",
            industry: "Design",
            isSaved: true
        },
        {
            id: "6",
            title: "Project Manager",
            company: "Engineering Co.",
            location: "Boston, MA",
            type: "Full-time",
            level: "Mid",
            salary: "$90k - $120k",
            postedDate: "2025-01-09",
            description: "Lead cross-functional teams to deliver complex engineering projects on time and within budget.",
            requirements: ["PMP certification", "5+ years PM exp", "Agile/Scrum"],
            postedBy: "Alumni Network",
            industry: "Engineering",
            isSaved: false
        },
        {
            id: "7",
            title: "Cloud Architect",
            company: "CloudScale Systems",
            location: "Seattle, WA",
            type: "Full-time",
            level: "Senior",
            salary: "$150k - $200k",
            postedDate: "2025-01-15",
            description: "Design and implement scalable cloud infrastructures for enterprise clients.",
            requirements: ["AWS Certified", "Terraform/K8s", "Security focus"],
            postedBy: "Jessica Wu '16",
            industry: "Technology",
            isSaved: false
        },
        {
            id: "8",
            title: "Product Designer",
            company: "Innovate Apps",
            location: "Remote",
            type: "Full-time",
            level: "Mid",
            salary: "$95k - $130k",
            postedDate: "2025-01-16",
            description: "Help us shape the future of mobile education through thoughtful product design.",
            requirements: ["Product strategy", "Visual design", "User testing"],
            postedBy: "Alumni Network",
            industry: "Design",
            isSaved: false
        },
        {
            id: "9",
            title: "HR specialist",
            company: "Talent Hub",
            location: "Miami, FL",
            type: "Part-time",
            level: "Entry",
            salary: "$30/hr - $45/hr",
            postedDate: "2025-01-05",
            description: "Assist with recruitment and employee onboarding processes for a growing startup.",
            requirements: ["Communication skills", "Organizational skills"],
            postedBy: "Sarah Adams '21",
            industry: "Healthcare",
            isSaved: false
        },
        {
            id: "10",
            title: "AI Research Engineer",
            company: "Future Lab",
            location: "London, UK",
            type: "Full-time",
            level: "Senior",
            salary: "£90k - £120k",
            postedDate: "2025-01-17",
            description: "Conduct cutting-edge research in Large Language Models and Generative AI.",
            requirements: ["PhD in CS/AI", "PyTorch/Tensorflow", "Publications"],
            postedBy: "Dr. Robert King '12",
            industry: "Technology",
            isSaved: false
        },
        {
            id: "11",
            title: "Sales Executive",
            company: "Growth Partners",
            location: "Toronto, CA",
            type: "Full-time",
            level: "Mid",
            salary: "$70k + Bonus",
            postedDate: "2025-01-03",
            description: "Drive business growth through B2B sales and strategic partnerships.",
            requirements: ["CRM experience", "Negotiation", "3+ years sales"],
            postedBy: "Alumni Network",
            industry: "Sales",
            isSaved: false
        },
        {
            id: "12",
            title: "Civil Engineer",
            company: "Metro Infrastructure",
            location: "Denver, CO",
            type: "Full-time",
            level: "Senior",
            salary: "$110k - $145k",
            postedDate: "2024-12-28",
            description: "Oversee major urban infrastructure projects including bridges and highways.",
            requirements: ["PE License", "Project Management", "AutoCAD"],
            postedBy: "Mark Stevens '98",
            industry: "Engineering",
            isSaved: false
        }
    ]);

    // Statistics calculations
    const stats = useMemo(() => [
        {
            title: "Total Opportunities",
            value: "247",
            subtitle: "Recent postings",
            icon: <IoBriefcaseOutline className="w-6 h-6" />,
            gradient: "from-blue-500 to-blue-600",
        },
        {
            title: "Saved Jobs",
            value: jobs.filter(j => j.isSaved).length.toString(),
            subtitle: "Watchlist",
            icon: <IoBookmark className="w-6 h-6" />,
            gradient: "from-purple-500 to-purple-600",
        },
        {
            title: "Alumni Network",
            value: "2,847",
            subtitle: "Active connections",
            icon: <IoPeopleOutline className="w-6 h-6" />,
            gradient: "from-emerald-500 to-emerald-600",
        },
        {
            title: "Career Events",
            value: "12",
            subtitle: "Coming soon",
            icon: <IoCalendarOutline className="w-6 h-6" />,
            gradient: "from-amber-500 to-amber-600",
        },
    ], [jobs]);

    // Filtered jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = 
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesType = filterType === "All" || job.type === filterType;
            const matchesLevel = filterLevel === "All" || job.level === filterLevel;
            const matchesIndustry = filterIndustry === "All" || job.industry === filterIndustry;

            return matchesSearch && matchesType && matchesLevel && matchesIndustry;
        });
    }, [jobs, searchTerm, filterType, filterLevel, filterIndustry]);

    // Pagination
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset page on search or filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType, filterLevel, filterIndustry]);

    const toggleSaveJob = (jobId: string) => {
        setJobs(jobs.map(job => 
            job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
        ));
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Full-time": return "bg-blue-50 text-blue-700 border-blue-100";
            case "Part-time": return "bg-purple-50 text-purple-700 border-purple-100";
            case "Contract": return "bg-amber-50 text-amber-700 border-amber-100";
            case "Internship": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            default: return "bg-gray-50 text-gray-700 border-gray-100";
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Entry": return "bg-emerald-50 text-emerald-700";
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
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const handleApply = (jobId: string) => {
        setSelectedJobId(jobId);
        setShowApplicationModal(true);
    };

    const submitApplication = () => {
        if (!applicationForm.fullName || !applicationForm.email || !applicationForm.phone) {
            alert("Required: Name, Email, Phone");
            return;
        }
        const job = jobs.find(j => j.id === selectedJobId);
        alert(`Application sent for ${job?.title} at ${job?.company}! Check your email for confirmation.`);
        setShowApplicationModal(false);
        setApplicationForm({
            fullName: "", email: "", phone: "", resumeUrl: "", 
            coverLetter: "", linkedInUrl: "", yearsExperience: "", availability: "Immediate"
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Career Services</h1>
                <p className="text-sm text-gray-500">Exclusive job opportunities and career resources for our alumni network.</p>
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

            {/* Filters Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-3 overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find your next career move..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-50/20 text-sm transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${showFilters ? 'bg-primary-50 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <IoFilterOutline /> Filters
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-gray-100 animate-slide-down">
                        <select 
                            value={filterType} 
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-gray-50 border-none rounded-lg p-2 text-xs font-bold text-gray-600"
                        >
                            <option value="All">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <select 
                            value={filterLevel} 
                            onChange={(e) => setFilterLevel(e.target.value)}
                            className="bg-gray-50 border-none rounded-lg p-2 text-xs font-bold text-gray-600"
                        >
                            <option value="All">All Levels</option>
                            <option value="Entry">Entry</option>
                            <option value="Mid">Mid</option>
                            <option value="Senior">Senior</option>
                        </select>
                        <select 
                            value={filterIndustry} 
                            onChange={(e) => setFilterIndustry(e.target.value)}
                            className="bg-gray-50 border-none rounded-lg p-2 text-xs font-bold text-gray-600 col-span-2 md:col-span-1"
                        >
                            <option value="All">All Industries</option>
                            <option value="Technology">Technology</option>
                            <option value="Design">Design</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Jobs List */}
            <div className="space-y-3">
                {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                        <div key={job.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-50/30 transition-all group">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary-50/5 text-primary-50 flex items-center justify-center shrink-0 border border-primary-50/10 shadow-inner">
                                    <IoBusinessOutline className="text-2xl sm:text-3xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate group-hover:text-primary-50 transition-colors uppercase tracking-tight">
                                                {job.title}
                                            </h3>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mt-1">{job.company}</p>
                                        </div>
                                        <button 
                                            onClick={() => toggleSaveJob(job.id)}
                                            className={`p-2 rounded-xl transition-all ${job.isSaved ? 'bg-primary-50 text-white' : 'bg-gray-50 text-gray-400 hover:text-primary-50'}`}
                                        >
                                            {job.isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500">
                                            <IoLocationOutline className="text-primary-50 text-sm" /> {job.location}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500">
                                            <IoCashOutline className="text-primary-50 text-sm" /> {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500">
                                            <IoTimeOutline className="text-primary-50 text-sm" /> {formatDate(job.postedDate)}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${getTypeColor(job.type)}`}>{job.type}</span>
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${getLevelColor(job.level)}`}>{job.level}</span>
                                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter bg-gray-50 text-gray-400 border border-gray-100">{job.industry}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-50">
                                        <p className="text-[10px] font-medium text-gray-400 italic">Posted by <span className="font-black text-gray-600 non-italic">{job.postedBy}</span></p>
                                        <button 
                                            onClick={() => handleApply(job.id)}
                                            className="px-6 py-2 bg-primary-50 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary-50/20 active:scale-95 transition-all"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-12 text-center rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold uppercase tracking-widest">No opportunities found match your criteria</p>
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

            {/* Application Modal */}
            {showApplicationModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowApplicationModal(false)} />
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative animate-slide-up overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary-50/5">
                            <div className="min-w-0">
                                <h2 className="text-xl font-bold text-gray-900 truncate">Quick Application</h2>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5 truncate">
                                    For {jobs.find(j => j.id === selectedJobId)?.title}
                                </p>
                            </div>
                            <button onClick={() => setShowApplicationModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><IoCloseOutline className="text-2xl" /></button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-50/10 text-sm font-medium" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-50/10 text-sm font-medium" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                                    <input type="tel" placeholder="+250..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-50/10 text-sm font-medium" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Experience</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-50/10 text-sm font-bold text-gray-600">
                                        <option>0-2 Years</option>
                                        <option>3-5 Years</option>
                                        <option>5+ Years</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resume Link</label>
                                <input type="url" placeholder="https://drive.google.com/..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-50/10 text-sm font-medium" />
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button onClick={() => setShowApplicationModal(false)} className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
                            <button onClick={submitApplication} className="flex-[2] py-3 bg-primary-50 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary-50/20 active:scale-95 transition-all">Submit Application</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerServices;


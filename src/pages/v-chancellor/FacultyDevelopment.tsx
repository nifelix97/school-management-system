import React, { useState } from "react";
import {
    IoBookOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoPersonOutline,
    IoRibbonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface TrainingProgram {
  id: string;
  title: string;
  category: "Pedagogy" | "Technology" | "Research" | "Leadership";
  duration: string;
  enrolled: number;
  capacity: number;
  status: "Ongoing" | "Upcoming" | "Completed";
  startDate: string;
}

interface Workshop {
  id: string;
  title: string;
  facilitator: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  type: "Online" | "In-Person" | "Hybrid";
}

const FacultyDevelopment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "programs" | "certifications" | "workshops">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for Training Programs
  const trainingPrograms: TrainingProgram[] = [
    {
      id: "1",
      title: "Digital Teaching Excellence",
      category: "Technology",
      duration: "8 weeks",
      enrolled: 45,
      capacity: 50,
      status: "Ongoing",
      startDate: "2024-09-01"
    },
    {
      id: "2",
      title: "Advanced Research Methodologies",
      category: "Research",
      duration: "12 weeks",
      enrolled: 28,
      capacity: 30,
      status: "Ongoing",
      startDate: "2024-08-15"
    },
    {
      id: "3",
      title: "Leadership in Higher Education",
      category: "Leadership",
      duration: "6 weeks",
      enrolled: 20,
      capacity: 25,
      status: "Upcoming",
      startDate: "2024-10-01"
    },
    {
      id: "4",
      title: "Student-Centered Learning Strategies",
      category: "Pedagogy",
      duration: "4 weeks",
      enrolled: 38,
      capacity: 40,
      status: "Ongoing",
      startDate: "2024-09-10"
    },
    {
      id: "5",
      title: "AI in Education",
      category: "Technology",
      duration: "6 weeks",
      enrolled: 30,
      capacity: 30,
      status: "Completed",
      startDate: "2024-07-01"
    },
  ];

  // Mock data for Workshops
  const workshops: Workshop[] = [
    {
      id: "1",
      title: "Effective Assessment Techniques",
      facilitator: "Dr. Sarah Johnson",
      date: "2024-09-25",
      time: "10:00 AM - 12:00 PM",
      attendees: 42,
      maxAttendees: 50,
      type: "Hybrid"
    },
    {
      id: "2",
      title: "Grant Writing Masterclass",
      facilitator: "Prof. Michael Chen",
      date: "2024-09-28",
      time: "2:00 PM - 4:00 PM",
      attendees: 35,
      maxAttendees: 40,
      type: "Online"
    },
    {
      id: "3",
      title: "Diversity & Inclusion in Academia",
      facilitator: "Dr. Aisha Patel",
      date: "2024-10-05",
      time: "9:00 AM - 11:00 AM",
      attendees: 28,
      maxAttendees: 35,
      type: "In-Person"
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Active Programs",
      value: "24",
      change: "+3",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoSchoolOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Faculty Enrolled",
      value: "342",
      change: "+18%",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoPersonOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Certifications",
      value: "156",
      change: "+24",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoRibbonOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoCheckmarkCircleOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
      case "Active":
        return "bg-green-100 text-green-600 border-green-200";
      case "Upcoming":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Completed":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pedagogy":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "Technology":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Research":
        return "bg-green-100 text-green-600 border-green-200";
      case "Leadership":
        return "bg-amber-100 text-amber-600 border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Faculty Development
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Empower faculty with training programs, certifications, and professional growth opportunities
            </p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoCheckmarkCircleOutline className="w-5 h-5" />
            Review Proposals
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl text-white shadow-md`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up' ? 'bg-green-50 text-green-600' : 
                    stat.trend === 'down' ? 'bg-red-50 text-red-600' : 
                    'bg-gray-50 text-gray-600'
                }`}>
                  <IoTrendingUpOutline className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-primary-50/60 mb-1 font-medium uppercase tracking-wide">
                {stat.title}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary-50">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto animate-[slideUp_0.6s_ease-out]">
        {[
          { id: "overview", label: "Overview", icon: <IoStatsChartOutline /> },
          { id: "programs", label: "Training Programs", icon: <IoSchoolOutline /> },
          { id: "certifications", label: "Certifications", icon: <IoRibbonOutline /> },
          { id: "workshops", label: "Workshops", icon: <IoCalendarOutline /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-[scaleIn_0.5s_ease-out]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Program Categories</h2>
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 border-b border-gray-100">
                {[
                  { category: "Pedagogy", programs: 8, faculty: 120, color: "bg-purple-500" },
                  { category: "Technology", programs: 6, faculty: 95, color: "bg-blue-500" },
                  { category: "Research", programs: 5, faculty: 68, color: "bg-green-500" },
                  { category: "Leadership", programs: 5, faculty: 59, color: "bg-amber-500" },
                ].map((item, index) => {
                  const maxFaculty = 150;
                  const heightPercentage = (item.faculty / maxFaculty) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 w-full group">
                      <div className="relative w-full flex justify-center items-end h-48">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${item.color} opacity-90 group-hover:opacity-100 relative group-hover:scale-y-105 origin-bottom`}
                          style={{ height: `${heightPercentage}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.faculty} Faculty
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-50">{item.category}</div>
                        <div className="text-[10px] text-primary-50/60">{item.programs} Programs</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {[
                  { activity: "New certification awarded", faculty: "Dr. Emma Wilson", time: "2 hours ago", icon: <IoRibbonOutline />, color: "text-green-600 bg-green-100" },
                  { activity: "Workshop completed", title: "AI in Education", time: "5 hours ago", icon: <IoCheckmarkCircleOutline />, color: "text-blue-600 bg-blue-100" },
                  { activity: "Program enrollment opened", title: "Leadership Training", time: "1 day ago", icon: <IoSchoolOutline />, color: "text-purple-600 bg-purple-100" },
                  { activity: "New workshop scheduled", title: "Research Methods", time: "2 days ago", icon: <IoCalendarOutline />, color: "text-amber-600 bg-amber-100" },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                    <div className={`p-3 rounded-full h-fit ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-50 mb-1">{activity.activity}</h4>
                      <p className="text-sm text-primary-50/70">
                        {activity.faculty || activity.title}
                      </p>
                      <span className="text-xs text-primary-50/50">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["all", "Pedagogy", "Technology", "Research", "Leadership"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedCategory(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedCategory === filter
                          ? "bg-primary-50 text-white shadow-md"
                          : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "all" ? "All Categories" : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(program.category)}`}>
                      {program.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary-50 mb-3 line-clamp-2">{program.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-primary-50/70">
                      <IoTimeOutline className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-50/70">
                      <IoCalendarOutline className="w-4 h-4" />
                      <span>Starts: {new Date(program.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary-50/70">Enrollment</span>
                      <span className="font-bold text-primary-50">{program.enrolled}/{program.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary-50 h-full rounded-full transition-all duration-700"
                        style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProgram(program);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-2 bg-gray-100 hover:bg-primary-50 hover:text-white text-primary-50 rounded-lg font-semibold text-sm transition-all"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronBackOutline className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-primary-50">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronForwardOutline className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Faculty Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Teaching Excellence Certificate", awarded: 45, icon: <IoSchoolOutline />, color: "from-purple-500 to-purple-600" },
                { name: "Digital Pedagogy Certification", awarded: 38, icon: <IoBookOutline />, color: "from-blue-500 to-blue-600" },
                { name: "Research Skills Certificate", awarded: 32, icon: <IoBriefcaseOutline />, color: "from-green-500 to-green-600" },
                { name: "Leadership Certification", awarded: 28, icon: <IoRibbonOutline />, color: "from-amber-500 to-amber-600" },
                { name: "Assessment & Evaluation", awarded: 25, icon: <IoCheckmarkCircleOutline />, color: "from-pink-500 to-pink-600" },
                { name: "Curriculum Design Certificate", awarded: 22, icon: <IoBookOutline />, color: "from-indigo-500 to-indigo-600" },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {cert.icon}
                  </div>
                  <h3 className="text-lg font-bold text-primary-50 mb-2">{cert.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-primary-50/70">
                    <IoPersonOutline className="w-4 h-4" />
                    <span>{cert.awarded} Faculty Certified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "workshops" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Workshop Invitations</h2>
            <div className="space-y-4">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="p-6 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-primary-50">{workshop.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          workshop.type === 'Online' ? 'bg-blue-100 text-blue-600' :
                          workshop.type === 'In-Person' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {workshop.type}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-primary-50/70">
                          <IoPersonOutline className="w-4 h-4" />
                          <span>Facilitator: {workshop.facilitator}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary-50/70">
                          <IoCalendarOutline className="w-4 h-4" />
                          <span>{new Date(workshop.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary-50/70">
                          <IoTimeOutline className="w-4 h-4" />
                          <span>{workshop.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-primary-50/70">
                        <span className="font-bold text-primary-50">{workshop.attendees}</span> / {workshop.maxAttendees} Registered
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary-50 h-full rounded-full transition-all duration-700"
                          style={{ width: `${(workshop.attendees / workshop.maxAttendees) * 100}%` }}
                        />
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedWorkshop(workshop);
                          setIsWorkshopModalOpen(true);
                        }}
                        className="px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold text-sm hover:bg-primary-100 transition-all"
                      >
                        View Invitation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Program Details Modal */}
      {isModalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedProgram.title}</h2>
                <p className="text-white/90 text-sm">{selectedProgram.category} • {selectedProgram.duration}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getCategoryColor(selectedProgram.category)}`}>
                  {selectedProgram.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Duration</div>
                  <div className="font-bold text-primary-50">{selectedProgram.duration}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Start Date</div>
                  <div className="font-bold text-primary-50">{new Date(selectedProgram.startDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary-50 mb-2">Program Overview</h3>
                <p className="text-sm text-primary-50/70 leading-relaxed">
                  This comprehensive {selectedProgram.category.toLowerCase()} program is designed to enhance faculty skills and knowledge. 
                  Currently {selectedProgram.enrolled} faculty members are enrolled out of {selectedProgram.capacity} available spots.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors">
                  View Curriculum
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  View Participants
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Proposals Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold">Pending Program Proposals</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {[
                {
                  title: "Blockchain Technology in Education",
                  category: "Technology",
                  duration: "6 weeks",
                  capacity: 30,
                  submittedBy: "Dr. James Anderson (Faculty Coordinator)",
                  submittedDate: "2024-11-18",
                  startDate: "2025-01-15"
                },
                {
                  title: "Advanced Classroom Management Techniques",
                  category: "Pedagogy",
                  duration: "4 weeks",
                  capacity: 40,
                  submittedBy: "Prof. Linda Martinez (Faculty Coordinator)",
                  submittedDate: "2024-11-22",
                  startDate: "2025-02-01"
                },
                {
                  title: "Strategic Planning for Academic Leaders",
                  category: "Leadership",
                  duration: "8 weeks",
                  capacity: 25,
                  submittedBy: "Dr. Robert Chen (Faculty Coordinator)",
                  submittedDate: "2024-11-28",
                  startDate: "2025-02-20"
                },
              ].map((proposal, index) => (
                <div key={index} className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 bg-gradient-to-br from-white to-gray-50/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1">{proposal.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                          proposal.category === 'Pedagogy' ? 'bg-purple-100 text-purple-600 border-purple-200' :
                          proposal.category === 'Technology' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                          proposal.category === 'Research' ? 'bg-green-100 text-green-600 border-green-200' :
                          'bg-amber-100 text-amber-600 border-amber-200'
                        }`}>
                          {proposal.category}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600 border border-amber-200">
                      Pending Review
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-primary-50/60">Duration:</span>
                      <p className="font-semibold text-primary-50">{proposal.duration}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Capacity:</span>
                      <p className="font-semibold text-primary-50">{proposal.capacity} Faculty</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Submitted By:</span>
                      <p className="font-semibold text-primary-50">{proposal.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Submitted Date:</span>
                      <p className="font-semibold text-primary-50">{new Date(proposal.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-primary-50/60">Proposed Start Date:</span>
                      <p className="font-semibold text-primary-50">{new Date(proposal.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-all">
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-all">
                      Request Changes
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {/* No proposals message */}
              {false && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoCheckmarkCircleOutline className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No pending proposals at the moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Workshop Invitation Modal */}
      {isWorkshopModalOpen && selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-start sticky top-0">
              <div className="flex-1 pr-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-1">Workshop Invitation</h2>
                <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{selectedWorkshop.title}</p>
              </div>
              <button
                onClick={() => setIsWorkshopModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <IoCloseOutline className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <p className="text-sm sm:text-base text-primary-50/70">
                  You have been invited to attend the following professional development workshop:
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary-50/60">Workshop Title:</span>
                  <span className="font-bold text-sm sm:text-base text-primary-50 text-left sm:text-right">{selectedWorkshop.title}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary-50/60">Facilitator:</span>
                  <span className="font-bold text-sm sm:text-base text-primary-50">{selectedWorkshop.facilitator}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary-50/60">Date:</span>
                  <span className="font-bold text-sm sm:text-base text-primary-50">{new Date(selectedWorkshop.date).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary-50/60">Time:</span>
                  <span className="font-bold text-sm sm:text-base text-primary-50">{selectedWorkshop.time}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary-50/60">Format:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                    selectedWorkshop.type === 'Online' ? 'bg-blue-100 text-blue-600' :
                    selectedWorkshop.type === 'In-Person' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {selectedWorkshop.type}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary-50/60">Attendees:</span>
                  <span className="font-bold text-sm sm:text-base text-primary-50">{selectedWorkshop.attendees}/{selectedWorkshop.maxAttendees}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm sm:text-base text-primary-50 mb-2">Workshop Description</h3>
                <p className="text-xs sm:text-sm text-primary-50/70 leading-relaxed">
                  This workshop focuses on enhancing professional skills and knowledge in the field. 
                  As the Vice Chancellor, your attendance would provide valuable leadership perspective and support for faculty development initiatives.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs sm:text-sm font-semibold text-primary-50 mb-3">Please respond to this invitation:</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                    Accept
                  </button>
                  <button className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-colors">
                    Maybe
                  </button>
                  <button className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDevelopment;

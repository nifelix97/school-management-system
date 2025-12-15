import React, { useState } from "react";
import {
    IoAirplaneOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoEarthOutline,
    IoGlobeOutline,
    IoHandRightOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface Partnership {
  id: string;
  institution: string;
  country: string;
  type: "Academic Exchange" | "Research Collaboration" | "Joint Degree" | "Industry Partner";
  status: "Active" | "Pending" | "Expired" | "Draft";
  startDate: string;
  endDate: string;
  studentsExchanged: number;
}

interface ExchangeProgram {
  id: string;
  title: string;
  university: string;
  country: string;
  term: "Spring 2024" | "Fall 2024" | "Summer 2024";
  applicants: number;
  slots: number;
  status: "Open" | "Closed" | "In Progress";
}

const InternationalRelation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "partnerships" | "exchange" | "visits">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for Partnerships
  const partnerships: Partnership[] = [
    {
      id: "1",
      institution: "University of Cambridge",
      country: "United Kingdom",
      type: "Research Collaboration",
      status: "Active",
      startDate: "2022-09-01",
      endDate: "2027-08-31",
      studentsExchanged: 12
    },
    {
      id: "2",
      institution: "National University of Singapore",
      country: "Singapore",
      type: "Academic Exchange",
      status: "Active",
      startDate: "2023-01-15",
      endDate: "2026-01-14",
      studentsExchanged: 25
    },
    {
      id: "3",
      institution: "Stanford University",
      country: "USA",
      type: "Joint Degree",
      status: "Pending",
      startDate: "2024-09-01",
      endDate: "2029-08-31",
      studentsExchanged: 0
    },
    {
      id: "4",
      institution: "University of Melbourne",
      country: "Australia",
      type: "Academic Exchange",
      status: "Active",
      startDate: "2021-07-01",
      endDate: "2024-06-30",
      studentsExchanged: 18
    },
    {
      id: "5",
      institution: "ETH Zurich",
      country: "Switzerland",
      type: "Research Collaboration",
      status: "Active",
      startDate: "2023-03-01",
      endDate: "2026-02-28",
      studentsExchanged: 8
    },
    {
      id: "6",
      institution: "University of Tokyo",
      country: "Japan",
      type: "Industry Partner",
      status: "Expired",
      startDate: "2019-04-01",
      endDate: "2024-03-31",
      studentsExchanged: 45
    },
  ];

  // Mock data for Exchange Programs
  const exchangePrograms: ExchangeProgram[] = [
    {
      id: "1",
      title: "Global Leadership Program",
      university: "Harvard University",
      country: "USA",
      term: "Summer 2024",
      applicants: 156,
      slots: 20,
      status: "Open"
    },
    {
      id: "2",
      title: "Asian Studies Exchange",
      university: "Seoul National University",
      country: "South Korea",
      term: "Fall 2024",
      applicants: 45,
      slots: 10,
      status: "Open"
    },
    {
      id: "3",
      title: "European Architecture Tour",
      university: "Politecnico di Milano",
      country: "Italy",
      term: "Spring 2024",
      applicants: 89,
      slots: 15,
      status: "Closed"
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Global Partners",
      value: "42",
      change: "+5",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoGlobeOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Intl. Students",
      value: "1,245",
      change: "+12.4%",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoPeopleOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Active MOUs",
      value: "38",
      change: "+3",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoHandRightOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Exchange Students",
      value: "156",
      change: "+28%",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoAirplaneOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Open":
        return "bg-green-100 text-green-600 border-green-200";
      case "Pending":
      case "In Progress":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Draft":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Expired":
      case "Closed":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partnership.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || partnership.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedPartnerships = filteredPartnerships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              International Relations
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage global partnerships, exchange programs, and international affairs
            </p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoBriefcaseOutline className="w-5 h-5" />
            New Partnership
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
          { id: "partnerships", label: "Partnerships", icon: <IoHandRightOutline /> },
          { id: "exchange", label: "Exchange Programs", icon: <IoAirplaneOutline /> },
          { id: "visits", label: "Delegation Visits", icon: <IoCalendarOutline /> },
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
              <h2 className="text-xl font-bold text-primary-50 mb-6">Global Presence</h2>
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 border-b border-gray-100">
                {[
                  { region: "North America", partners: 12, students: 450, color: "bg-primary-50" },
                  { region: "Europe", partners: 18, students: 380, color: "bg-primary-100" },
                  { region: "Asia Pacific", partners: 8, students: 250, color: "bg-primary-200" },
                  { region: "Africa", partners: 4, students: 165, color: "bg-primary-300" },
                ].map((region, index) => {
                  const maxStudents = 500;
                  const heightPercentage = (region.students / maxStudents) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 w-full group">
                      <div className="relative w-full flex justify-center items-end h-48">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${region.color} opacity-90 group-hover:opacity-100 relative group-hover:scale-y-105 origin-bottom`}
                          style={{ height: `${heightPercentage}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {region.students} Students
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-50">{region.region}</div>
                        <div className="text-[10px] text-primary-50/60">{region.partners} Partners</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Upcoming International Events</h2>
              <div className="space-y-4">
                {[
                  { title: "Global Education Summit", date: "Oct 15, 2024", location: "London, UK", type: "Conference" },
                  { title: "International Student Orientation", date: "Sep 01, 2024", location: "Main Campus", type: "Event" },
                  { title: "Delegation from Univ. of Tokyo", date: "Nov 10, 2024", location: "VC Office", type: "Visit" },
                  { title: "Study Abroad Fair", date: "Sep 20, 2024", location: "Student Center", type: "Fair" },
                ].map((event, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white border border-gray-200 shadow-sm text-primary-50">
                      <span className="text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary-50">{event.title}</h4>
                        <span className="text-xs font-semibold text-primary-50/60 bg-white px-2 py-1 rounded-full border border-gray-100">{event.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary-50/70">
                        <IoLocationOutline className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "partnerships" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search partnerships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["all", "Active", "Pending", "Expired"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedStatus(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedStatus === filter
                          ? "bg-primary-50 text-white shadow-md"
                          : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "all" ? "All Status" : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Partnerships Grid */}
            {/* Partnerships Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-600 font-semibold text-sm uppercase hidden md:table-header-group">
                    <tr>
                      <th className="p-4 border-b border-gray-100">Institution</th>
                      <th className="p-4 border-b border-gray-100">Type</th>
                      <th className="p-4 border-b border-gray-100">Status</th>
                      <th className="p-4 border-b border-gray-100">Duration</th>
                      <th className="p-4 border-b border-gray-100">Students</th>
                      <th className="p-4 border-b border-gray-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedPartnerships.map((partnership) => (
                      <tr 
                        key={partnership.id} 
                        className="flex flex-col md:table-row hover:bg-gray-50 transition-colors p-4 md:p-0 border-b md:border-b-0 border-gray-100 last:border-0"
                      >
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Institution</span>
                          <div className="flex flex-col">
                            <span className="font-bold text-primary-50 text-base md:text-sm">{partnership.institution}</span>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <IoEarthOutline className="w-3 h-3" />
                              {partnership.country}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Type</span>
                          <span className="text-sm text-gray-700">{partnership.type}</span>
                        </td>
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Status</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(partnership.status)}`}>
                            {partnership.status}
                          </span>
                        </td>
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Duration</span>
                          <div className="text-sm text-gray-600">
                            {new Date(partnership.startDate).getFullYear()} - {new Date(partnership.endDate).getFullYear()}
                          </div>
                        </td>
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Students</span>
                          <span className="text-sm font-semibold text-primary-50">{partnership.studentsExchanged}</span>
                        </td>
                        <td className="p-2 md:p-4 flex justify-center md:table-cell text-right mt-2 md:mt-0">
                          <button 
                            onClick={() => {
                              setSelectedPartnership(partnership);
                              setIsModalOpen(true);
                            }}
                            className="w-full md:w-auto px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-white text-primary-50 rounded-lg font-semibold text-xs transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

        {activeTab === "exchange" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Active Exchange Programs</h2>
            {/* Exchange Programs Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-600 font-semibold text-sm uppercase hidden md:table-header-group">
                    <tr>
                      <th className="p-4 border-b border-gray-100">Program Info</th>
                      <th className="p-4 border-b border-gray-100">Status</th>
                      <th className="p-4 border-b border-gray-100">Applicants</th>
                      <th className="p-4 border-b border-gray-100">Slots</th>
                      <th className="p-4 border-b border-gray-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {exchangePrograms.map((program) => (
                      <tr 
                        key={program.id} 
                        className="flex flex-col md:table-row hover:bg-gray-50 transition-colors p-4 md:p-0 border-b md:border-b-0 border-gray-100 last:border-0"
                      >
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Program</span>
                          <div className="flex flex-col">
                            <span className="font-bold text-primary-50 text-base md:text-sm">{program.title}</span>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <IoSchoolOutline className="w-3 h-3" />
                              {program.university}, {program.country}
                            </div>
                            <span className="text-xs text-primary-50/60 mt-1 md:hidden">{program.term}</span>
                          </div>
                        </td>
                         <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Status</span>
                          <div className="flex items-center gap-2">
                             <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
                            {program.status}
                          </span>
                           <span className="text-xs text-gray-500 hidden md:inline-block">({program.term})</span>
                          </div>
                        </td>
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Demand</span>
                          <div className="flex flex-col w-full md:w-32">
                             <div className="flex justify-between text-xs mb-1">
                                <span>{program.applicants} Applicants</span>
                             </div>
                             <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-primary-50 h-full rounded-full transition-all duration-700"
                                style={{ width: `${Math.min((program.applicants / (program.slots * 5)) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 md:p-4 flex justify-between md:table-cell items-center">
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wide">Availability</span>
                          <span className="text-sm text-gray-700 font-semibold">{program.slots} Slots</span>
                        </td>
                        <td className="p-2 md:p-4 flex justify-center md:table-cell text-right mt-2 md:mt-0">
                          <button className="w-full md:w-auto px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold text-xs hover:bg-primary-100 transition-all">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "visits" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 text-center py-16">
            <div className="w-20 h-20 bg-primary-50/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoCalendarOutline className="w-10 h-10 text-primary-50" />
            </div>
            <h2 className="text-2xl font-bold text-primary-50 mb-2">Delegation Visits Calendar</h2>
            <p className="text-primary-50/60 max-w-md mx-auto mb-6">
              Schedule and manage upcoming visits from international delegations and partner institutions.
            </p>
            <button className="px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              View Calendar
            </button>
          </div>
        )}
      </div>

      {/* Partnership Details Modal */}
      {isModalOpen && selectedPartnership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedPartnership.institution}</h2>
                <p className="text-white/90 text-sm flex items-center gap-2">
                  <IoLocationOutline className="w-4 h-4" />
                  {selectedPartnership.country}
                </p>
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
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedPartnership.status)}`}>
                  {selectedPartnership.status}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                  {selectedPartnership.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Start Date</div>
                  <div className="font-bold text-primary-50">{selectedPartnership.startDate}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">End Date</div>
                  <div className="font-bold text-primary-50">{selectedPartnership.endDate}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary-50 mb-2">Partnership Summary</h3>
                <p className="text-sm text-primary-50/70 leading-relaxed">
                  This partnership with {selectedPartnership.institution} focuses on {selectedPartnership.type.toLowerCase()}. 
                  Since its inception, it has facilitated the exchange of {selectedPartnership.studentsExchanged} students and 
                  numerous collaborative projects.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors">
                  Edit Partnership
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  View Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Partnership Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Partnership</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <form className="p-6 space-y-4" onSubmit={(e) => {
              e.preventDefault();
              // In a real app, you would handle form submission here
              setIsAddModalOpen(false);
            }}>
              <div>
                <label className="block text-sm font-semibold text-primary-50 mb-1">Institution Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  placeholder="e.g. University of Oxford"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-50 mb-1">Country</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  placeholder="e.g. United Kingdom"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-50 mb-1">Partnership Type</label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all">
                  <option>Academic Exchange</option>
                  <option>Research Collaboration</option>
                  <option>Joint Degree</option>
                  <option>Industry Partner</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary-50 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-50 mb-1">End Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors"
                >
                  Create Partnership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternationalRelation;

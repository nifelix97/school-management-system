import React, { useState } from "react";
import {
    IoAddOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const CareerGuidance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  const stats = [
    { 
      title: "Active Students", 
      value: "128", 
      icon: <IoPeopleOutline className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
      change: "+12%"
    },
    { 
      title: "Applications Pending", 
      value: "45", 
      icon: <IoDocumentTextOutline className="w-6 h-6" />,
      gradient: "from-amber-500 to-amber-600",
      change: "-5"
    },
    { 
      title: "University Placements", 
      value: "89", 
      icon: <IoSchoolOutline className="w-6 h-6" />,
      gradient: "from-green-500 to-green-600",
      change: "+24%"
    },
    { 
      title: "Career Events", 
      value: "12", 
      icon: <IoCalendarOutline className="w-6 h-6" />,
      gradient: "from-purple-500 to-purple-600",
      change: "Upcoming"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "University Fair 2025",
      date: "Dec 15, 2025",
      time: "09:00 AM - 04:00 PM",
      location: "Main Hall",
      type: "Fair"
    },
    {
      id: 2,
      title: "Engineering Workshop",
      date: "Dec 18, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Science Lab 1",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Medical Career Talk",
      date: "Dec 20, 2025",
      time: "02:00 PM - 03:30 PM",
      location: "Auditorium",
      type: "Seminar"
    }
  ];

  const students = [
    {
      id: 1,
      name: "John Smith",
      grade: "12",
      interest: "Engineering",
      status: "Applying",
      target: "MIT, Stanford",
      gpa: "3.8"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      grade: "12",
      interest: "Medicine",
      status: "Accepted",
      target: "Harvard Medical",
      gpa: "4.0"
    },
    {
      id: 3,
      name: "Michael Brown",
      grade: "11",
      interest: "Computer Science",
      status: "Exploring",
      target: "Undecided",
      gpa: "3.5"
    },
    {
      id: 4,
      name: "Emily Davis",
      grade: "12",
      interest: "Arts",
      status: "Reviewing",
      target: "RISD, Parsons",
      gpa: "3.7"
    },
    {
      id: 5,
      name: "James Wilson",
      grade: "11",
      interest: "Business",
      status: "Exploring",
      target: "Wharton",
      gpa: "3.6"
    }
  ];

  const resources = [
    {
      tiitle: "University Application Guide 2025",
      type: "PDF",
      size: "2.4 MB",
      downloads: "145"
    },
    {
      tiitle: "SAT Preparation Materials",
      type: "ZIP",
      size: "15.8 MB",
      downloads: "89"
    },
    {
      tiitle: "Scholarship Opportunities List",
      type: "Excel",
      size: "1.2 MB",
      downloads: "230"
    },
    {
      tiitle: "Career Path Planning Template",
      type: "Word",
      size: "0.5 MB",
      downloads: "167"
    }
  ];

  // Helper Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-100 text-green-700";
      case "Applying": return "bg-blue-100 text-blue-700";
      case "Reviewing": return "bg-amber-100 text-amber-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleScheduleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event scheduled successfully!");
    setShowScheduleModal(false);
  };

  const handleUpdateStatus = (student: any) => {
    setSelectedStudent(student);
    setShowStatusModal(true);
  };

  const handleSaveStatus = () => {
    toast.success(`Status updated for ${selectedStudent?.name}`);
    setShowStatusModal(false);
  };

  const handleDownloadResource = (resource: string) => {
    toast.info(`Downloading ${resource}...`);
    setTimeout(() => {
        toast.success("Download complete!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Career Guidance</h1>
          <p className="text-gray-500 mt-1">Manage efficient career counseling and university placements</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            <IoCalendarOutline className="w-5 h-5" />
            Schedule Event
          </button>
          <button className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-100/30">
            <IoAddOutline className="w-5 h-5" />
            Add Resource
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
               <div className={`bg-gradient-to-br ${stat.gradient} w-16 h-16 rounded-full blur-xl`}></div>
            </div>
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${typeof stat.change === 'string' && stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
        {["Overview", "Students", "Applications", "Resources"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
              activeTab === tab.toLowerCase()
                ? "text-primary-100"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-100 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
                <button className="text-primary-100 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex flex-col sm:flex-row sm:items-center p-4 rounded-xl border border-gray-100 hover:border-primary-100 hover:shadow-md transition-all group bg-gray-50/50">
                    <div className="flex-1 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                        <span className="text-xs font-bold text-red-500 uppercase">{event.date.split(" ")[0]}</span>
                        <span className="text-lg font-bold text-gray-900">{event.date.split(" ")[1].replace(",", "")}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-primary-100 transition-colors">{event.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><IoTimeOutline /> {event.time}</span>
                          <span className="flex items-center gap-1"><IoLocationOutline /> {event.location}</span>
                          <span className="px-2 py-0.5 bg-gray-200 rounded-full">{event.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 sm:mt-0 px-4 py-2 text-sm font-medium text-primary-100 bg-white border border-primary-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-50 hover:text-white">
                      Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300"><IoBriefcaseOutline /></div>
                    <span className="font-medium">New Career Plan</span>
                  </div>
                  <IoTrendingUpOutline />
                </button>
                <button 
                    onClick={() => setActiveTab("students")}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300"><IoSchoolOutline /></div>
                    <span className="font-medium">University App</span>
                  </div>
                  <IoAddOutline />
                </button>
                <button 
                  onClick={() => toast.info("Opening placement form...")}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-300"><IoCheckmarkCircleOutline /></div>
                    <span className="font-medium">Log Placement</span>
                  </div>
                  <IoTrendingUpOutline />
                </button>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "students" || activeTab === "applications") && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                  {activeTab === "students" ? "Student Tracking" : "Application Status"}
              </h3>
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 w-full sm:w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="pb-3 text-sm font-semibold text-gray-500 pl-4">Student Name</th>
                    <th className="pb-3 text-sm font-semibold text-gray-500">Grade</th>
                    <th className="pb-3 text-sm font-semibold text-gray-500">Interest</th>
                    <th className="pb-3 text-sm font-semibold text-gray-500">Target Univ.</th>
                    <th className="pb-3 text-sm font-semibold text-gray-500">Status</th>
                    <th className="pb-3 text-sm font-semibold text-gray-500 text-right pr-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                    <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-100 flex items-center justify-center font-bold text-xs">
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{student.name}</p>
                            <p className="text-xs text-gray-500">GPA: {student.gpa}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{student.grade}</td>
                      <td className="py-4 text-sm text-gray-600 font-medium">{student.interest}</td>
                      <td className="py-4 text-sm text-gray-600">{student.target}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-4">
                        <button 
                            onClick={() => handleUpdateStatus(student)}
                            className="text-sm font-medium text-primary-100 hover:text-primary-50 p-2 hover:bg-white rounded-lg transition-all"
                        >
                            Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "resources" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((res, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                            <IoDocumentTextOutline className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 h-12">{res.tiitle}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>{res.type} • {res.size}</span>
                            <span>{res.downloads} downloads</span>
                        </div>
                        <button 
                            onClick={() => handleDownloadResource(res.tiitle)}
                            className="w-full py-2 bg-gray-50 text-gray-700 font-bold text-sm rounded-xl hover:bg-primary-100 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <IoDownloadOutline className="w-4 h-4" /> Download
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Modals */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Career Event</h2>
            <form onSubmit={handleScheduleEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Event Title</label>
                <input type="text" className="w-full px-4 py-2 border rounded-xl focus:border-primary-100 focus:outline-none" placeholder="e.g., University Fair" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-xl focus:border-primary-100 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Time</label>
                  <input type="time" className="w-full px-4 py-2 border rounded-xl focus:border-primary-100 focus:outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                <input type="text" className="w-full px-4 py-2 border rounded-xl focus:border-primary-100 focus:outline-none" placeholder="e.g., Main Hall" required />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-50">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showStatusModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Update Status</h2>
                <p className="text-gray-500 text-sm mb-4">Change application status for <span className="font-bold text-gray-900">{selectedStudent.name}</span></p>
                
                <div className="space-y-2 mb-6">
                    {["Exploring", "Applying", "Reviewing", "Accepted", "Rejected"].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setSelectedStudent({...selectedStudent, status: status});
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                                selectedStudent.status === status 
                                ? "border-primary-100 bg-primary-50/10 text-primary-100 ring-1 ring-primary-100" 
                                : "border-gray-200 hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            <span className="font-medium">{status}</span>
                            {selectedStudent.status === status && <IoCheckmarkCircleOutline className="w-5 h-5" />}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button onClick={() => setShowStatusModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSaveStatus} className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-50">Save Update</button>
                </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;


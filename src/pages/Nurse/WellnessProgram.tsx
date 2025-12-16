import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoFitnessOutline,
    IoLocationOutline,
    IoPencilOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoTimeOutline,
} from "react-icons/io5";

interface WellnessProgram {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants?: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  description: string;
}

const WellnessProgram: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [programs, setPrograms] = useState<WellnessProgram[]>([
    {
      id: "WP-001",
      title: "Mental Health Awareness Workshop",
      category: "Mental Health",
      date: "2024-11-15",
      time: "10:00 AM - 12:00 PM",
      location: "Main Auditorium",
      organizer: "Dr. Sarah Wilson",
      participants: 120,
      maxParticipants: 200,
      status: "Upcoming",
      description: "A workshop focusing on stress management and mental well-being for students.",
    },
    {
      id: "WP-002",
      title: "Nutrition & Healthy Eating",
      category: "Nutrition",
      date: "2024-11-20",
      time: "02:00 PM - 03:30 PM",
      location: "Cafeteria Hall",
      organizer: "Nurse Joy",
      participants: 45,
      maxParticipants: 50,
      status: "Upcoming",
      description: "Learn about balanced diets and healthy eating habits.",
    },
    {
      id: "WP-003",
      title: "Annual Blood Donation Drive",
      category: "Community Service",
      date: "2024-10-05",
      time: "09:00 AM - 04:00 PM",
      location: "Gymnasium",
      organizer: "Red Cross & School Health",
      participants: 85,
      status: "Completed",
      description: "Voluntary blood donation camp for students and staff.",
    },
    {
      id: "WP-004",
      title: "Yoga for Beginners",
      category: "Fitness",
      date: "2024-11-10",
      time: "07:00 AM - 08:00 AM",
      location: "School Garden",
      organizer: "Instructor Mike",
      participants: 15,
      maxParticipants: 20,
      status: "Ongoing",
      description: "Morning yoga sessions to improve flexibility and focus.",
    },
    {
      id: "WP-005",
      title: "First Aid Training",
      category: "Safety",
      date: "2024-12-01",
      time: "01:00 PM - 05:00 PM",
      location: "Science Lab",
      organizer: "Paramadic Team",
      participants: 0,
      maxParticipants: 30,
      status: "Upcoming",
      description: "Basic first aid training and certification.",
    },
  ]);

  const [newProgram, setNewProgram] = useState<Partial<WellnessProgram>>({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    status: "Upcoming",
    description: "",
    maxParticipants: 0,
  });

  const handleCreateProgram = () => {
    if (!newProgram.title || !newProgram.date) return;

    const program: WellnessProgram = {
      id: `WP-${Date.now()}`,
      title: newProgram.title!,
      category: newProgram.category || "General",
      date: newProgram.date!,
      time: newProgram.time || "TBD",
      location: newProgram.location || "TBD",
      organizer: newProgram.organizer || "School Health",
      participants: 0,
      maxParticipants: newProgram.maxParticipants || 0,
      status: newProgram.status as any,
      description: newProgram.description || "",
    };

    setPrograms([program, ...programs]);
    setShowAddModal(false);
    setNewProgram({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      organizer: "",
      status: "Upcoming",
      description: "",
      maxParticipants: 0,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Ongoing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredPrograms = programs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Programs", value: programs.length, icon: <IoFitnessOutline />, color: "bg-purple-500" },
    { label: "Upcoming Events", value: programs.filter(p => p.status === "Upcoming").length, icon: <IoCalendarOutline />, color: "bg-blue-500" },
    { label: "Active Now", value: programs.filter(p => p.status === "Ongoing").length, icon: <IoTimeOutline />, color: "bg-amber-500" },
    { label: "Completed", value: programs.filter(p => p.status === "Completed").length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Wellness Programs</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Organize and track health awareness events and workshops
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Create Program</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-start gap-3">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div className="min-w-0 w-full">
                <div className="text-2xl font-bold text-primary-50">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-50/60 font-medium break-words">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search by title, category, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <IoFilterOutline className="w-5 h-5 text-primary-50/60" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
            >
              <option value="all">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Programs List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Program Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Organizer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrograms.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50/10 flex items-center justify-center text-primary-50 text-xl font-bold">
                        <IoFitnessOutline />
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{item.title}</div>
                        <div className="text-xs text-primary-50/60">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm text-primary-50/80">
                      <div className="flex items-center gap-2">
                        <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-primary-50/60">
                        <IoTimeOutline className="w-3.5 h-3.5" />
                        {item.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-primary-50/80">
                      <IoLocationOutline className="w-4 h-4 text-primary-100" />
                      {item.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-50/80">{item.organizer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-primary-50/80">
                      <IoPeopleOutline className="w-4 h-4 text-primary-100" />
                      {item.participants} {item.maxParticipants ? `/ ${item.maxParticipants}` : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                        <IoEyeOutline className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="Edit">
                        <IoPencilOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredPrograms.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-primary-50/10 flex items-center justify-center text-primary-50 text-xl font-bold shrink-0">
                    <IoFitnessOutline />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-primary-50 truncate">{item.title}</div>
                    <div className="text-xs text-primary-50/60">{item.category}</div>
                  </div>
                </div>
                <span className={`shrink-0 ml-2 px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(item.status)}`}>
                   {item.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="text-sm text-primary-50/80 mb-3 line-clamp-2">{item.description}</div>
                
                <div className="space-y-2 text-xs text-primary-50/60">
                   <div className="flex items-center gap-2">
                     <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                     {item.date} • {item.time}
                   </div>
                   <div className="flex items-center gap-2">
                     <IoLocationOutline className="w-4 h-4 text-primary-100" />
                     {item.location}
                   </div>
                   <div className="flex items-center justify-between pt-1">
                     <div className="flex items-center gap-2">
                       <IoPeopleOutline className="w-4 h-4 text-primary-100" />
                       {item.participants} participants
                     </div>
                     <div className="text-primary-50/70">
                       by {item.organizer}
                     </div>
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                 <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                   View Details
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out] overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-primary-50 mb-6 flex items-center gap-2">
              <IoAddOutline className="w-7 h-7" />
              Create Wellness Program
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Program Title</label>
                  <input
                    type="text"
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                    placeholder="e.g. Mental Health Workshop"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Category</label>
                  <input
                    type="text"
                    value={newProgram.category}
                    onChange={(e) => setNewProgram({ ...newProgram, category: e.target.value })}
                    placeholder="e.g. Mental Health"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Date</label>
                  <input
                    type="date"
                    value={newProgram.date}
                    onChange={(e) => setNewProgram({ ...newProgram, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Time</label>
                  <input
                    type="text"
                    value={newProgram.time}
                    onChange={(e) => setNewProgram({ ...newProgram, time: e.target.value })}
                    placeholder="e.g. 10:00 AM - 12:00 PM"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Location</label>
                  <div className="relative">
                    <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newProgram.location}
                      onChange={(e) => setNewProgram({ ...newProgram, location: e.target.value })}
                      placeholder="Venue or Location"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Organizer</label>
                  <input
                    type="text"
                    value={newProgram.organizer}
                    onChange={(e) => setNewProgram({ ...newProgram, organizer: e.target.value })}
                    placeholder="Organizer Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Max Participants</label>
                  <input
                    type="number"
                    min="1"
                    value={newProgram.maxParticipants}
                    onChange={(e) => setNewProgram({ ...newProgram, maxParticipants: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Status</label>
                  <select
                    value={newProgram.status}
                    onChange={(e) => setNewProgram({ ...newProgram, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Description</label>
                  <textarea
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                    placeholder="Describe the program..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-primary-50 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateProgram}
                className="px-6 py-2.5 bg-primary-50 text-white font-semibold rounded-xl hover:bg-primary-100 transition-colors shadow-lg shadow-primary-50/30 flex items-center gap-2"
              >
                <IoAddOutline className="w-5 h-5" />
                Create Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessProgram;

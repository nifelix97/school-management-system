import React, { useState } from "react";
import {
    IoAddOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMegaphoneOutline,
    IoPencilOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoSendOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: "urgent" | "high" | "normal" | "low";
  status: "published" | "draft" | "scheduled" | "archived";
  targetAudience: string[];
  author: string;
  publishedDate: string;
  scheduledDate?: string;
  views: number;
  reactions: number;
}

const Announcements: React.FC = () => {
  const [activeView, setActiveView] = useState<"all" | "published" | "drafts">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([]);

  // Mock data
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Winter Break Schedule Announcement",
      content: "Dear University Community, we are pleased to announce the winter break schedule for the upcoming holiday season. Classes will conclude on December 20th, and the university will resume operations on January 6th. All administrative offices will be closed during this period except for essential services.",
      category: "Academic",
      priority: "high",
      status: "published",
      targetAudience: ["Students", "Faculty", "Staff"],
      author: "Principal's Office",
      publishedDate: "2024-11-25",
      views: 1245,
      reactions: 89,
    },
    {
      id: "2",
      title: "New Research Grant Opportunities Available",
      content: "The Research Office is excited to announce new grant opportunities for faculty members. Applications are now open for the Spring 2025 research funding cycle. Grants range from $10,000 to $100,000 and support various research initiatives across all departments.",
      category: "Research",
      priority: "normal",
      status: "published",
      targetAudience: ["Faculty"],
      author: "Research Office",
      publishedDate: "2024-11-24",
      views: 567,
      reactions: 45,
    },
    {
      id: "3",
      title: "Campus Safety Protocols Update",
      content: "In our ongoing commitment to campus safety, we have updated our emergency response protocols. All community members are required to review the new guidelines and complete the online safety training module by December 15th.",
      category: "Safety",
      priority: "urgent",
      status: "published",
      targetAudience: ["Students", "Faculty", "Staff"],
      author: "Security Department",
      publishedDate: "2024-11-26",
      views: 2103,
      reactions: 156,
    },
    {
      id: "4",
      title: "Student Mental Health Resources Expansion",
      content: "We are pleased to announce the expansion of our student mental health services. Starting next semester, counseling hours will be extended, and we will be adding three new licensed therapists to our wellness center staff.",
      category: "Student Affairs",
      priority: "high",
      status: "published",
      targetAudience: ["Students"],
      author: "Student Services",
      publishedDate: "2024-11-23",
      views: 892,
      reactions: 134,
    },
    {
      id: "5",
      title: "Faculty Development Workshop Series",
      content: "Join us for our Spring 2025 Faculty Development Workshop Series. Topics include innovative teaching methodologies, digital learning tools, and student engagement strategies. Registration opens December 1st.",
      category: "Professional Development",
      priority: "normal",
      status: "scheduled",
      targetAudience: ["Faculty"],
      author: "Academic Affairs",
      publishedDate: "2024-11-27",
      scheduledDate: "2024-12-01",
      views: 0,
      reactions: 0,
    },
    {
      id: "6",
      title: "Campus Sustainability Initiative Launch",
      content: "We are launching a comprehensive campus sustainability initiative aimed at reducing our carbon footprint by 30% over the next three years. This includes solar panel installation, waste reduction programs, and green transportation options.",
      category: "Campus Life",
      priority: "normal",
      status: "draft",
      targetAudience: ["Students", "Faculty", "Staff"],
      author: "Facilities Management",
      publishedDate: "2024-11-27",
      views: 0,
      reactions: 0,
    },
    {
      id: "7",
      title: "Graduation Ceremony Details - Class of 2025",
      content: "Save the date! The graduation ceremony for the Class of 2025 will be held on May 15th at the University Stadium. Detailed information regarding tickets, guest policies, and ceremony schedule will be shared in January.",
      category: "Events",
      priority: "high",
      status: "published",
      targetAudience: ["Students"],
      author: "Registrar's Office",
      publishedDate: "2024-11-22",
      views: 1567,
      reactions: 203,
    },
    {
      id: "8",
      title: "IT System Maintenance Notice",
      content: "Scheduled maintenance on university IT systems will occur on December 1st from 2:00 AM to 6:00 AM. During this time, email, learning management system, and student portal may be temporarily unavailable.",
      category: "Technology",
      priority: "normal",
      status: "scheduled",
      targetAudience: ["Students", "Faculty", "Staff"],
      author: "IT Department",
      publishedDate: "2024-11-27",
      scheduledDate: "2024-12-01",
      views: 0,
      reactions: 0,
    },
  ];

  const categories = ["all", "Academic", "Research", "Safety", "Student Affairs", "Professional Development", "Campus Life", "Events", "Technology"];

  // Initialize announcements list
  React.useEffect(() => {
    setAnnouncementsList(announcements);
  }, []);

  const filteredAnnouncements = announcementsList.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory;
    const matchesView = activeView === "all" || 
                       (activeView === "published" && announcement.status === "published") ||
                       (activeView === "drafts" && (announcement.status === "draft" || announcement.status === "scheduled"));
    return matchesSearch && matchesCategory && matchesView;
  });

  // Handler functions
  const handleNewAnnouncement = () => {
    alert("Create New Announcement feature would open a form here.\n\nThis would allow you to:\n- Enter announcement title and content\n- Select category and priority\n- Choose target audience\n- Schedule or publish immediately");
  };

  const handleEdit = (announcement: Announcement) => {
    alert(`Edit Announcement: ${announcement.title}\n\nThis would open an edit form with the current announcement data.`);
  };

  const handlePublish = (announcement: Announcement) => {
    const updatedAnnouncements = announcementsList.map(a => 
      a.id === announcement.id 
        ? { ...a, status: "published" as const, publishedDate: new Date().toISOString().split('T')[0] }
        : a
    );
    setAnnouncementsList(updatedAnnouncements);
    
    // Update selected announcement if it's in the modal
    if (selectedAnnouncement?.id === announcement.id) {
      setSelectedAnnouncement({ ...announcement, status: "published", publishedDate: new Date().toISOString().split('T')[0] });
    }
    
    alert(`Successfully published: ${announcement.title}`);
  };

  const handleDelete = (announcement: Announcement) => {
    if (window.confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
      const updatedAnnouncements = announcementsList.filter(a => a.id !== announcement.id);
      setAnnouncementsList(updatedAnnouncements);
      
      // Close modal if the deleted announcement was being viewed
      if (selectedAnnouncement?.id === announcement.id) {
        closeDetailModal();
      }
      
      alert(`Successfully deleted: ${announcement.title}`);
    }
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    if (!showFilterPanel) {
      alert("Filter Panel\n\nAdditional filter options:\n- Date range\n- Author\n- Status\n- Priority level\n- Target audience");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      case "high":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "normal":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "low":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "draft":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "scheduled":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "archived":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = ["primary-50", "primary-100", "primary-200", "primary-300"];
    const index = categories.indexOf(category) % colors.length;
    return colors[index];
  };

  const handleViewDetails = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAnnouncement(null);
  };

  const totalAnnouncements = announcementsList.length;
  const publishedCount = announcementsList.filter(a => a.status === "published").length;
  const draftCount = announcementsList.filter(a => a.status === "draft" || a.status === "scheduled").length;
  const totalViews = announcementsList.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Announcements
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Create and manage university-wide announcements and communications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleFilterPanel}
              className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200"
            >
              <IoFilterOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button 
              onClick={handleNewAnnouncement}
              className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md"
            >
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">New Announcement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoMegaphoneOutline, label: "Total Announcements", value: totalAnnouncements, color: "primary-50" },
          { Icon: IoCheckmarkCircleOutline, label: "Published", value: publishedCount, color: "primary-300" },
          { Icon: IoPencilOutline, label: "Drafts & Scheduled", value: draftCount, color: "primary-100" },
          { Icon: IoEyeOutline, label: "Total Views", value: totalViews.toLocaleString(), color: "primary-200" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color} mb-3 inline-block`}>
              <stat.Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "all", label: "All Announcements" },
          { id: "published", label: "Published" },
          { id: "drafts", label: "Drafts & Scheduled" },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "300ms" }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-primary-50">{announcement.title}</h3>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(announcement.status)}`}>
                      {announcement.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-primary-50/70 line-clamp-2 mb-3">{announcement.content}</p>
                  
                  <div className="flex items-center gap-4 flex-wrap text-xs text-primary-50/60">
                    <div className="flex items-center gap-1">
                      <IoPeopleOutline className="w-4 h-4" />
                      <span>{announcement.targetAudience.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoTimeOutline className="w-4 h-4" />
                      <span>{announcement.publishedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoEyeOutline className="w-4 h-4" />
                      <span>{announcement.views} views</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getCategoryColor(announcement.category)}/10 text-${getCategoryColor(announcement.category)}`}>
                      {announcement.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleViewDetails(announcement)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-primary-50/10 text-primary-50 rounded-lg text-sm font-semibold hover:bg-primary-50/20 transition-colors flex items-center justify-center gap-2"
                >
                  <IoEyeOutline className="w-4 h-4" />
                  View Details
                </button>
                <button 
                  onClick={() => handleEdit(announcement)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-primary-100/10 text-primary-100 rounded-lg text-sm font-semibold hover:bg-primary-100/20 transition-colors flex items-center justify-center gap-2"
                >
                  <IoPencilOutline className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                {announcement.status === "draft" && (
                  <button 
                    onClick={() => handlePublish(announcement)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-primary-300/10 text-primary-300 rounded-lg text-sm font-semibold hover:bg-primary-300/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <IoSendOutline className="w-4 h-4" />
                    <span className="hidden sm:inline">Publish</span>
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(announcement)}
                  className="px-4 py-2 bg-primary-200/10 text-primary-200 rounded-lg text-sm font-semibold hover:bg-primary-200/20 transition-colors"
                >
                  <IoTrashOutline className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
              <IoMegaphoneOutline className="w-12 h-12 text-primary-50/30" />
            </div>
            <h3 className="text-xl font-bold text-primary-50 mb-2">No Announcements Found</h3>
            <p className="text-sm text-primary-50/60">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedAnnouncement && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out_both]"
            onClick={closeDetailModal}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden pointer-events-auto animate-[scaleIn_0.3s_ease-out_both]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(selectedAnnouncement.priority)}`}>
                      {selectedAnnouncement.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(selectedAnnouncement.status)}`}>
                      {selectedAnnouncement.status.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getCategoryColor(selectedAnnouncement.category)}/10 text-${getCategoryColor(selectedAnnouncement.category)}`}>
                      {selectedAnnouncement.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary-50 mb-2">
                    {selectedAnnouncement.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-primary-50/60">
                    <span>By {selectedAnnouncement.author}</span>
                    <span>•</span>
                    <span>{selectedAnnouncement.publishedDate}</span>
                  </div>
                </div>
                <button
                  onClick={closeDetailModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <IoCloseCircleOutline className="w-6 h-6 text-primary-50" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
                <div className="prose max-w-none">
                  <p className="text-base text-primary-50/80 leading-relaxed whitespace-pre-line">
                    {selectedAnnouncement.content}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-primary-50 mb-4">Announcement Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-xs text-primary-50/60 mb-1">Target Audience</div>
                      <div className="font-semibold text-primary-50">
                        {selectedAnnouncement.targetAudience.join(", ")}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-xs text-primary-50/60 mb-1">Published By</div>
                      <div className="font-semibold text-primary-50">{selectedAnnouncement.author}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-xs text-primary-50/60 mb-1">Views</div>
                      <div className="font-semibold text-primary-50">{selectedAnnouncement.views.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-xs text-primary-50/60 mb-1">Reactions</div>
                      <div className="font-semibold text-primary-50">{selectedAnnouncement.reactions}</div>
                    </div>
                    {selectedAnnouncement.scheduledDate && (
                      <div className="p-4 bg-gray-50 rounded-xl sm:col-span-2">
                        <div className="text-xs text-primary-50/60 mb-1">Scheduled For</div>
                        <div className="font-semibold text-primary-50">{selectedAnnouncement.scheduledDate}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center gap-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => handleEdit(selectedAnnouncement)}
                  className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                >
                  <IoPencilOutline className="w-5 h-5" />
                  Edit Announcement
                </button>
                {selectedAnnouncement.status === "draft" && (
                  <button 
                    onClick={() => handlePublish(selectedAnnouncement)}
                    className="flex-1 px-4 py-2.5 bg-primary-300 text-white rounded-xl font-semibold hover:bg-primary-300/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <IoSendOutline className="w-5 h-5" />
                    Publish Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Announcements;

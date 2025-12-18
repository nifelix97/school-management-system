import React, { useEffect, useMemo, useState } from "react";
import {
    IoCalendarOutline,
    IoCashOutline,
    IoCheckmarkDoneOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoMegaphoneOutline,
    IoNotificationsOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoSparklesOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Notification {
  id: string;
  type: "academic" | "finance" | "event" | "notice";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "academic",
    title: "Mid-Term Results Published",
    description: "Academic results for John Doe's mid-term assessments are now available for review.",
    time: "10 mins ago",
    isRead: false,
    priority: "high"
  },
  {
    id: "2",
    type: "finance",
    title: "Fee Payment Reminder",
    description: "The second instalment for the Term 2 tuition fees is due on December 25th.",
    time: "2 hours ago",
    isRead: false,
    priority: "high"
  },
  {
    id: "3",
    type: "event",
    title: "Annual Sports Day 2024",
    description: "Don't forget the upcoming Sports Day this Friday. Please ensure your child has the proper kit.",
    time: "Yesterday",
    isRead: true,
    priority: "medium"
  },
  {
    id: "4",
    type: "notice",
    title: "Holiday Announcement",
    description: "The school will remain closed from December 20th for the winter break.",
    time: "2 days ago",
    isRead: true,
    priority: "low"
  },
  {
    id: "5",
    type: "academic",
    title: "New Assignment Posted",
    description: "Mathematics: Algebra Chapter 5 assignment has been posted. Due date: Dec 15th.",
    time: "3 days ago",
    isRead: true,
    priority: "medium"
  },
  {
    id: "6",
    type: "finance",
    title: "Late Fine Waived",
    description: "The late payment fine for November has been waived following your recent request.",
    time: "4 days ago",
    isRead: true,
    priority: "low"
  },
  {
    id: "7",
    type: "academic",
    title: "Parent-Teacher Meeting",
    description: "Scheduled for next Thursday at 3 PM. Please confirm your attendance.",
    time: "5 days ago",
    isRead: true,
    priority: "high"
  },
  {
    id: "8",
    type: "notice",
    title: "Security Update",
    description: "New ID cards are now required for all parents entering the school premises.",
    time: "1 week ago",
    isRead: true,
    priority: "medium"
  }
];

const ParentNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesFilter = activeFilter === "all" || n.type === activeFilter;
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           n.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [notifications, activeFilter, searchQuery]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read", {
        icon: <IoCheckmarkDoneOutline className="text-primary-50" />
    });
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info("Notification deleted");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "academic": return <IoSchoolOutline />;
      case "finance": return <IoCashOutline />;
      case "event": return <IoCalendarOutline />;
      case "notice": return <IoMegaphoneOutline />;
      default: return <IoNotificationsOutline />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "academic": return "bg-blue-50 text-blue-500 border-blue-100";
      case "finance": return "bg-emerald-50 text-emerald-500 border-emerald-100";
      case "event": return "bg-amber-50 text-amber-500 border-amber-100";
      case "notice": return "bg-purple-50 text-purple-500 border-purple-100";
      default: return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-6 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/parent/dashboard")}
            className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary-50 transition-all active:scale-95"
          >
            <IoChevronBackOutline className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              Notifications
              <span className="bg-primary-50 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                {notifications.filter(n => !n.isRead).length}
              </span>
            </h1>
            <p className="text-sm text-gray-500 font-medium">Stay updated with your child's activities</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-xs font-bold text-gray-600 border border-gray-100 shadow-sm hover:border-primary-50 hover:text-primary-50 transition-all active:scale-95"
          >
            <IoCheckmarkDoneOutline className="text-base" /> Mark all read
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          {["all", "academic", "finance", "event", "notice"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeFilter === filter 
                ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search alerts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-50/10 transition-all"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 min-h-[400px]">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notif, index) => (
            <div 
              key={notif.id}
              onClick={() => handleMarkRead(notif.id)}
              className={`group bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row gap-4 md:items-center ${
                notif.isRead 
                ? 'border-gray-50 opacity-80' 
                : 'border-primary-50/20 bg-primary-50/[0.02] shadow-primary-50/5'
              } hover:shadow-lg hover:border-primary-50/30 animate-slide-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {!notif.isRead && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-50" />
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shrink-0 ${getTypeStyles(notif.type)} shadow-sm`}>
                {getTypeIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-4">
                  <h3 className={`font-bold text-sm md:text-base transition-colors ${notif.isRead ? 'text-gray-700' : 'text-gray-900 group-hover:text-primary-50'}`}>
                    {notif.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter shrink-0">
                    <IoTimeOutline className="text-xs" />
                    {notif.time}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-3xl">
                  {notif.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center">
                {notif.priority === 'high' && !notif.isRead && (
                   <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100 mr-2">
                     <IoSparklesOutline /> Urgent
                   </span>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notif.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                  title="Delete notification"
                >
                  <IoTrashOutline className="text-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-white rounded-3xl border border-gray-50 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <IoNotificationsOutline className="text-4xl text-gray-200" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-800">Clear as a whistle!</h3>
              <p className="text-sm text-gray-500 max-w-[240px]">You don't have any notifications {activeFilter !== 'all' ? `matching "${activeFilter}"` : 'at the moment'}.</p>
            </div>
            {activeFilter !== 'all' && (
              <button 
                onClick={() => setActiveFilter('all')}
                className="text-xs font-black uppercase tracking-widest text-primary-50 hover:underline"
              >
                Show all notifications
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-50 disabled:opacity-30 disabled:hover:text-gray-400 transition-all active:scale-90"
          >
            <IoChevronBackOutline />
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-xs font-black transition-all active:scale-95 ${
                  currentPage === i + 1 
                  ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20' 
                  : 'bg-white text-gray-400 border border-gray-100 hover:border-primary-50/30 hover:text-primary-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-50 disabled:opacity-30 disabled:hover:text-gray-400 transition-all active:scale-90"
          >
            <IoChevronForwardOutline />
          </button>
        </div>
      )}

    </div>
  );
};

export default ParentNotifications;

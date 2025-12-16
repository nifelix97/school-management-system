import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoDocumentTextOutline,
    IoPeopleOutline,
    IoPin,
    IoSearchOutline,
    IoTrashOutline
} from "react-icons/io5";

type Audience = "All" | "Students" | "Staff";
type Priority = "Normal" | "Urgent";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: Audience;
  priority: Priority;
  isPinned: boolean;
  author: string;
}

const Notices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({
    audience: "All",
    priority: "Normal",
    isPinned: false
  });

  // Mock Data
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "N-001",
      title: "Hostel Curfew Timing Update",
      content: "Effective immediately, the hostel main gate will be closed at 10:30 PM instead of 11:00 PM due to security reasons.",
      date: "2024-03-20",
      audience: "Students",
      priority: "Urgent",
      isPinned: true,
      author: "Chief Warden"
    },
    {
      id: "N-002",
      title: "Upcoming Fire Drill",
      content: "A mandatory fire safety drill will be conducted this Friday at 4:00 PM. All students must participate.",
      date: "2024-03-18",
      audience: "All",
      priority: "Normal",
      isPinned: false,
      author: "Safety Officer"
    },
    {
      id: "N-003",
      title: "Maintenance Schedule - Block B",
      content: "Water tank cleaning is scheduled for Block B on Sunday. Water supply may be interrupted from 10 AM to 2 PM.",
      date: "2024-03-15",
      audience: "Students",
      priority: "Normal",
      isPinned: false,
      author: "Estate Manager"
    }
  ]);

  const handleCreateNotice = () => {
    if (!newNotice.title || !newNotice.content) return;
    
    const notice: Notice = {
      id: `N-${Date.now()}`,
      title: newNotice.title,
      content: newNotice.content,
      date: new Date().toISOString().split('T')[0],
      audience: newNotice.audience as Audience,
      priority: newNotice.priority as Priority,
      isPinned: newNotice.isPinned || false,
      author: "Warden"
    };

    setNotices([notice, ...notices]);
    setIsModalOpen(false);
    setNewNotice({ audience: "All", priority: "Normal", isPinned: false });
  };

  const handleDelete = (id: string) => {
    if(confirm("Delete this notice?")) {
        setNotices(prev => prev.filter(n => n.id !== id));
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Notices & Circulars</h1>
          <p className="text-sm sm:text-base text-primary-50/70">Broadcast announcements to hostel residents and staff</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-50 text-white rounded-xl shadow-lg hover:bg-primary-60 transition-all active:scale-95 text-sm font-semibold"
        >
            <IoAddOutline className="w-5 h-5" />
            Post Notice
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="relative">
             <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input 
                 type="text" 
                 placeholder="Search notices..." 
                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
             />
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotices.map((notice) => (
            <div key={notice.id} className={`group relative bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md ${notice.isPinned ? 'border-primary-100/30 bg-gradient-to-br from-white to-primary-50/5' : 'border-gray-100'}`}>
                {notice.isPinned && (
                    <div className="absolute top-4 right-4 text-primary-100 transform rotate-45">
                        <IoPin className="w-5 h-5" />
                    </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider border ${
                        notice.priority === 'Urgent' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                        {notice.priority}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider border bg-gray-50 text-gray-600 border-gray-100 flex items-center gap-1">
                        <IoPeopleOutline className="w-3 h-3" />
                        {notice.audience}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-50 transition-colors">
                    {notice.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {notice.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4 mt-auto">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <IoCalendarOutline />
                            {notice.date}
                        </div>
                        <div className="flex items-center gap-1">
                            <IoDocumentTextOutline />
                            {notice.author}
                        </div>
                    </div>
                    <button 
                        onClick={() => handleDelete(notice.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Delete Notice"
                    >
                        <IoTrashOutline className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl scale-100 animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary-50">Create New Notice</h2>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Notice Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Holiday Announcement"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                            value={newNotice.title || ""}
                            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Content</label>
                        <textarea
                            rows={4}
                            placeholder="Type your announcement here..."
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none resize-none"
                            value={newNotice.content || ""}
                            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Audience</label>
                            <select
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                                value={newNotice.audience}
                                onChange={(e) => setNewNotice({ ...newNotice, audience: e.target.value as Audience })}
                            >
                                <option value="All">All Residents</option>
                                <option value="Students">Students Only</option>
                                <option value="Staff">Staff Only</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Priority</label>
                            <select
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                                value={newNotice.priority}
                                onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as Priority })}
                            >
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                         <input 
                            type="checkbox" 
                            id="pin-notice"
                            className="w-4 h-4 text-primary-50 rounded border-gray-300 focus:ring-primary-50"
                            checked={newNotice.isPinned}
                            onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                         />
                         <label htmlFor="pin-notice" className="text-sm text-gray-700 font-medium flex items-center gap-1">
                            Pin this notice <IoPin className="w-3 h-3 text-gray-400" />
                         </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateNotice}
                            disabled={!newNotice.title || !newNotice.content}
                            className="px-5 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-60 shadow-lg shadow-primary-50/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Post Notice
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Notices;

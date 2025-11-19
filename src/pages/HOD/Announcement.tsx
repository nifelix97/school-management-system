import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  GraduationCap, 
  Send, 
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'students' | 'teachers' | 'both';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  status: 'draft' | 'published';
}

export default function Announcement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<'all' | 'students' | 'teachers'>('all');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'students' as 'students' | 'teachers' | 'both',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Midterm Exam Schedule Released',
      content: 'The midterm examination schedule has been published. Please check your respective course schedules.',
      targetAudience: 'students',
      priority: 'high',
      createdAt: '2024-01-15',
      status: 'published'
    },
    {
      id: '2',
      title: 'Faculty Meeting - Department Updates',
      content: 'Monthly faculty meeting scheduled for next Friday. Agenda includes curriculum updates and new policies.',
      targetAudience: 'teachers',
      priority: 'medium',
      createdAt: '2024-01-14',
      status: 'published'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'published'
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', content: '', targetAudience: 'students', priority: 'medium' });
    setShowCreateModal(false);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  const filteredAnnouncements = announcements.filter(ann => {
    if (filter === 'all') return true;
    return ann.targetAudience === filter || ann.targetAudience === 'both';
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'students': return <GraduationCap size={16} className="text-blue-500" />;
      case 'teachers': return <Users size={16} className="text-purple-500" />;
      case 'both': return <Users size={16} className="text-green-500" />;
      default: return <Users size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div>
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-1">
              Announcements
            </h1>
            <p className="text-xs xs:text-sm text-primary-50/60">
              Create and manage announcements for students and teachers
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-50 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm font-medium"
          >
            <Plus size={16} />
            <span className="hidden xs:inline">Create Announcement</span>
            <span className="xs:hidden">Create</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <GraduationCap size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                Students
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              {
                announcements.filter(
                  (a) =>
                    a.targetAudience === "students" ||
                    a.targetAudience === "both"
                ).length
              }
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                <Users size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                Teachers
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              {
                announcements.filter(
                  (a) =>
                    a.targetAudience === "teachers" ||
                    a.targetAudience === "both"
                ).length
              }
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                <AlertCircle size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                High Priority
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              {announcements.filter((a) => a.priority === "high").length}
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <Send size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                Published
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              {announcements.filter((a) => a.status === "published").length}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 mb-4 xs:mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-primary-50/60" />
            <span className="text-sm font-medium text-primary-50">
              Filter by Audience
            </span>
          </div>
          <div className="flex gap-2">
            {[
              { key: "all", label: "All", count: announcements.length },
              {
                key: "students",
                label: "Students",
                count: announcements.filter(
                  (a) =>
                    a.targetAudience === "students" ||
                    a.targetAudience === "both"
                ).length,
              },
              {
                key: "teachers",
                label: "Teachers",
                count: announcements.filter(
                  (a) =>
                    a.targetAudience === "teachers" ||
                    a.targetAudience === "both"
                ).length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-3 py-2 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-primary-50 text-white"
                    : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3 xs:space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    {getAudienceIcon(announcement.targetAudience)}
                    <div className="flex-1">
                      <h3 className="text-sm xs:text-base font-semibold text-primary-50 mb-1">
                        {announcement.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(
                            announcement.priority
                          )}`}
                        >
                          {announcement.priority} priority
                        </span>
                        <span className="text-xs text-primary-50/60 capitalize">
                          For {announcement.targetAudience}
                        </span>
                        <span className="text-xs text-primary-50/60">
                          {announcement.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs xs:text-sm text-primary-50/70 line-clamp-2">
                    {announcement.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:flex-col sm:gap-2">
                  <button
                    onClick={() => setSelectedAnnouncement(announcement)}
                    className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    <Eye size={14} />
                    <span className="hidden xs:inline">View</span>
                  </button>
                  <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                    <Edit size={14} />
                    <span className="hidden xs:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    <Trash2 size={14} />
                    <span className="hidden xs:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-8 xs:py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base xs:text-lg font-medium text-primary-50 mb-2">
              No announcements found
            </h3>
            <p className="text-xs xs:text-sm text-primary-50/60 mb-4">
              Create your first announcement to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm"
            >
              Create Announcement
            </button>
          </div>
        )}
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto  shadow-lg shadow-primary-50">
            <div className="p-4 xs:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">
                  Create Announcement
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                    placeholder="Enter announcement title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Content *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm resize-none"
                    placeholder="Enter announcement content"
                  />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Target Audience *
                    </label>
                    <select
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                    >
                      <option value="students">Students</option>
                      <option value="teachers">Teachers</option>
                      <option value="both">Both Students & Teachers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Priority *
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm font-medium"
                  >
                    Create Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 xs:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">
                  Announcement Details
                </h2>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base xs:text-lg font-semibold text-primary-50 mb-2">
                    {selectedAnnouncement.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(
                        selectedAnnouncement.priority
                      )}`}
                    >
                      {selectedAnnouncement.priority} priority
                    </span>
                    <span className="text-xs text-primary-50/60 capitalize">
                      For {selectedAnnouncement.targetAudience}
                    </span>
                    <span className="text-xs text-primary-50/60">
                      Created: {selectedAnnouncement.createdAt}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-primary-50 mb-2">
                    Content
                  </h4>
                  <p className="text-sm text-primary-50/70 leading-relaxed">
                    {selectedAnnouncement.content}
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedAnnouncement(null)}
                    className="w-full bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { 
  FileText, 
  Video, 
  Presentation, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Search,
  User,
  BookOpen,
  Calendar
} from 'lucide-react';

interface Resource {
  id: number;
  name: string;
  type: "ppt" | "video" | "document" | "other";
  size: string;
  uploadDate: string;
  courseTitle: string;
  teacherName: string;
  status: 'approved' | 'pending' | 'rejected';
  category: string;
}

export default function ManageResources() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      name: "Introduction to HTML.pptx",
      type: "ppt",
      size: "2.5 MB",
      uploadDate: "2024-01-15",
      courseTitle: "HTML & CSS Fundamentals",
      teacherName: "Dr. Sarah Johnson",
      status: "approved",
      category: "Web Development"
    },
    {
      id: 2,
      name: "CSS Basics Video.mp4",
      type: "video",
      size: "45 MB",
      uploadDate: "2024-01-16",
      courseTitle: "HTML & CSS Fundamentals",
      teacherName: "Dr. Sarah Johnson",
      status: "pending",
      category: "Web Development"
    },
    {
      id: 3,
      name: "JS Variables.pdf",
      type: "document",
      size: "1.2 MB",
      uploadDate: "2024-01-20",
      courseTitle: "JavaScript Basics",
      teacherName: "Prof. Michael Chen",
      status: "approved",
      category: "Programming"
    },
    {
      id: 4,
      name: "Advanced React Concepts.pptx",
      type: "ppt",
      size: "3.8 MB",
      uploadDate: "2024-01-22",
      courseTitle: "React Development",
      teacherName: "Dr. Emily Davis",
      status: "pending",
      category: "Web Development"
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "ppt": return <Presentation className="w-5 h-5 text-orange-500" />;
      case "video": return <Video className="w-5 h-5 text-blue-500" />;
      case "document": return <FileText className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleStatusChange = (resourceId: number, newStatus: 'approved' | 'rejected') => {
    setResources(resources.map(resource =>
      resource.id === resourceId ? { ...resource, status: newStatus } : resource
    ));
  };

  const handleDelete = (resourceId: number) => {
    setResources(resources.filter(resource => resource.id !== resourceId));
  };

  const filteredResources = resources.filter(resource => {
    const matchesFilter = filter === 'all' || resource.status === filter;
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: resources.length,
    approved: resources.filter(r => r.status === 'approved').length,
    pending: resources.filter(r => r.status === 'pending').length,
    rejected: resources.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Manage Resources
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Review and manage resources uploaded by teachers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <FileText size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Total</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.total}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <CheckCircle size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Approved</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.approved}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-yellow-50 text-yellow-600 p-2 rounded-lg">
                <Calendar size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Pending</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.pending}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                <XCircle size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Rejected</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.rejected}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 mb-4 xs:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources, courses, or teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All', count: stats.total },
                { key: 'pending', label: 'Pending', count: stats.pending },
                { key: 'approved', label: 'Approved', count: stats.approved },
                { key: 'rejected', label: 'Rejected', count: stats.rejected }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-3 py-2 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                    filter === tab.key
                      ? 'bg-primary-50 text-white'
                      : 'bg-gray-100 text-primary-50 hover:bg-gray-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="space-y-3 xs:space-y-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 xs:gap-4">
                {/* Resource Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm xs:text-base font-semibold text-primary-50 mb-1 truncate">
                        {resource.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs xs:text-sm text-primary-50/60 mb-2">
                        <div className="flex items-center gap-1">
                          <BookOpen size={12} />
                          <span>{resource.courseTitle}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{resource.teacherName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{resource.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(resource.status)}`}>
                          {resource.status}
                        </span>
                        <span className="text-xs text-primary-50/60">
                          {resource.size} • {resource.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
                  <div className="flex gap-2 lg:flex-col lg:gap-2">
                    <button
                      onClick={() => setSelectedResource(resource)}
                      className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      <Eye size={14} />
                      <span className="hidden xs:inline">View</span>
                    </button>
                    <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100">
                      <Download size={14} />
                      <span className="hidden xs:inline">Download</span>
                    </button>
                  </div>
                  
                  {resource.status === 'pending' && (
                    <div className="flex gap-2 lg:flex-col lg:gap-2">
                      <button
                        onClick={() => handleStatusChange(resource.id, 'approved')}
                        className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                      >
                        <CheckCircle size={14} />
                        <span className="hidden xs:inline">Approve</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(resource.id, 'rejected')}
                        className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                      >
                        <XCircle size={14} />
                        <span className="hidden xs:inline">Reject</span>
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleDelete(resource.id)}
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

        {filteredResources.length === 0 && (
          <div className="text-center py-8 xs:py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base xs:text-lg font-medium text-primary-50 mb-2">No resources found</h3>
            <p className="text-xs xs:text-sm text-primary-50/60">
              {searchTerm ? 'Try adjusting your search terms' : 'No resources match the selected filter'}
            </p>
          </div>
        )}
      </div>

      {/* Resource Details Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 xs:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">Resource Details</h2>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  {getResourceIcon(selectedResource.type)}
                  <div>
                    <h3 className="text-base xs:text-lg font-semibold text-primary-50">
                      {selectedResource.name}
                    </h3>
                    <p className="text-sm text-primary-50/60">{selectedResource.size}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Course</label>
                    <p className="text-sm text-primary-50/70">{selectedResource.courseTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Teacher</label>
                    <p className="text-sm text-primary-50/70">{selectedResource.teacherName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Category</label>
                    <p className="text-sm text-primary-50/70">{selectedResource.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Upload Date</label>
                    <p className="text-sm text-primary-50/70">{selectedResource.uploadDate}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Status</label>
                  <span className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(selectedResource.status)}`}>
                    {selectedResource.status}
                  </span>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 pt-4">
                  {selectedResource.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedResource.id, 'approved');
                          setSelectedResource(null);
                        }}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Approve Resource
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedResource.id, 'rejected');
                          setSelectedResource(null);
                        }}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
                      >
                        Reject Resource
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
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
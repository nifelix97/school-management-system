import { useState } from 'react';
import { 
  AlertTriangle, 
  User, 
  Clock, 
  CheckCircle, 
  Eye, 
  MessageSquare,
  UserX,
  FileText,
  Search,
  Download,
  Send,
  Plus,
  Calendar,
  Users,
  BookOpen,
  Shield,
  XCircle,
  Paperclip
} from 'lucide-react';

interface Complaint {
  id: string;
  type: 'academic' | 'disciplinary' | 'general';
  category: string;
  title: string;
  description: string;
  studentName: string;
  studentId: string;
  status: 'pending' | 'in-review' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface Suspension {
  id: string;
  studentName: string;
  studentId: string;
  reason: string;
  category: 'academic' | 'cheating' | 'misconduct' | 'violation' | 'year-suspension';
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'extended' | 'pending-return' | 'pending-approval' | 'rejected';
  notes: string;
  type: 'disciplinary' | 'student-requested';
  duration?: '1-year' | '2-years';
  returnRequestDate?: string;
  proofDocuments?: string[];
  rejectionReason?: string;
}

export default function HandleComplaints() {
  const [activeTab, setActiveTab] = useState<'complaints' | 'suspensions' | 'year-suspensions'>('complaints');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedSuspension, setSelectedSuspension] = useState<Suspension | null>(null);
  const [showSuspensionModal, setShowSuspensionModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-review' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      type: 'academic',
      category: 'Grade Dispute',
      title: 'Wrong marks in JavaScript exam',
      description: 'My exam score shows 65% but I believe it should be higher based on my answers.',
      studentName: 'John Smith',
      studentId: 'CS2024001',
      status: 'pending',
      priority: 'medium',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      type: 'disciplinary',
      category: 'Cheating',
      title: 'Suspected cheating in midterm exam',
      description: 'Student was observed looking at another student\'s paper during the exam.',
      studentName: 'Sarah Wilson',
      studentId: 'CS2024002',
      status: 'in-review',
      priority: 'high',
      assignedTo: 'Prof. Michael Chen',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-16'
    },
    {
      id: '3',
      type: 'general',
      category: 'Teacher Behavior',
      title: 'Inappropriate comments in class',
      description: 'Teacher made discriminatory remarks during lecture.',
      studentName: 'Mike Johnson',
      studentId: 'CS2024003',
      status: 'resolved',
      priority: 'high',
      assignedTo: 'Dean Office',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    }
  ]);

  const [suspensions] = useState<Suspension[]>([
    {
      id: '1',
      studentName: 'Sarah Wilson',
      studentId: 'CS2024002',
      reason: 'Cheating in midterm examination',
      category: 'cheating',
      startDate: '2024-01-20',
      endDate: '2024-01-27',
      status: 'active',
      notes: 'First offense. Student counseling required before reinstatement.',
      type: 'disciplinary'
    },
    {
      id: '2',
      studentName: 'Alex Brown',
      studentId: 'CS2024004',
      reason: 'Disruptive behavior in multiple classes',
      category: 'misconduct',
      startDate: '2024-01-10',
      endDate: '2024-01-17',
      status: 'completed',
      notes: 'Student showed improvement after counseling session.',
      type: 'disciplinary'
    }
  ]);

  const [yearSuspensions, setYearSuspensions] = useState<Suspension[]>([
    {
      id: '3',
      studentName: 'Emma Davis',
      studentId: 'CS2023001',
      reason: 'Personal health issues requiring extended treatment',
      category: 'year-suspension',
      startDate: '2023-09-01',
      endDate: '2024-09-01',
      status: 'pending-return',
      notes: 'Student requested 1-year suspension for medical treatment. Return application submitted.',
      type: 'student-requested',
      duration: '1-year',
      returnRequestDate: '2024-01-15',
      proofDocuments: ['medical_certificate.pdf', 'doctor_recommendation.pdf']
    },
    {
      id: '4',
      studentName: 'James Wilson',
      studentId: 'CS2022003',
      reason: 'Financial difficulties and family obligations',
      category: 'year-suspension',
      startDate: '2022-12-01',
      endDate: '2024-12-01',
      status: 'active',
      notes: 'Student requested 2-year suspension to work and support family.',
      type: 'student-requested',
      duration: '2-years',
      proofDocuments: ['financial_statement.pdf', 'family_situation_letter.pdf']
    },
    {
      id: '5',
      studentName: 'Lisa Chen',
      studentId: 'CS2024005',
      reason: 'Family emergency requiring immediate attention',
      category: 'year-suspension',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      status: 'pending-approval',
      notes: 'Student submitted year suspension request with supporting documents.',
      type: 'student-requested',
      duration: '1-year',
      proofDocuments: ['emergency_letter.pdf', 'family_documents.pdf']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'in-review': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'active': return 'text-red-600 bg-red-50 border-red-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending-return': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'pending-approval': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return <BookOpen size={16} className="text-blue-500" />;
      case 'disciplinary': return <Shield size={16} className="text-red-500" />;
      case 'general': return <AlertTriangle size={16} className="text-orange-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = filter === 'all' || complaint.status === filter;
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalComplaints: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inReview: complaints.filter(c => c.status === 'in-review').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    activeSuspensions: suspensions.filter(s => s.status === 'active').length
  };

  const handleApproveSuspension = (suspensionId: string) => {
    setYearSuspensions(yearSuspensions.map(suspension => 
      suspension.id === suspensionId 
        ? { ...suspension, status: 'active' as const }
        : suspension
    ));
  };

  const handleRejectSuspension = (suspensionId: string) => {
    setYearSuspensions(yearSuspensions.map(suspension => 
      suspension.id === suspensionId 
        ? { ...suspension, status: 'rejected' as const, rejectionReason: 'Insufficient documentation provided' }
        : suspension
    ));
  };

  const handleApproveReturn = (suspensionId: string) => {
    setYearSuspensions(yearSuspensions.map(suspension => 
      suspension.id === suspensionId 
        ? { ...suspension, status: 'completed' as const }
        : suspension
    ));
  };

  const handleAssignComplaint = (complaintId: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: 'in-review' as const, assignedTo: 'Department Staff' }
        : complaint
    ));
    setSelectedComplaint(null);
  };

  const handleResolveComplaint = (complaintId: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: 'resolved' as const }
        : complaint
    ));
    setSelectedComplaint(null);
  };

  const handleExportReports = () => {
    const reportType = activeTab === 'complaints' ? 'Complaints' : 'Suspensions';
    
    // Create CSV content
    let csvContent = '';
    
    if (activeTab === 'complaints') {
      csvContent = 'ID,Type,Category,Title,Student Name,Student ID,Status,Priority,Created Date,Assigned To\n';
      filteredComplaints.forEach(item => {
        csvContent += `${item.id},${item.type},${item.category},"${item.title}",${item.studentName},${item.studentId},${item.status},${item.priority},${item.createdAt},${item.assignedTo || 'Unassigned'}\n`;
      });
    } else {
      csvContent = 'ID,Student Name,Student ID,Reason,Category,Start Date,End Date,Status,Notes\n';
      suspensions.forEach(item => {
        csvContent += `${item.id},${item.studentName},${item.studentId},"${item.reason}",${item.category},${item.startDate},${item.endDate},${item.status},"${item.notes}"\n`;
      });
    }
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportType}_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Handle Complaints & Disciplinary Actions
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Manage student complaints, disciplinary actions, and suspension cases
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <FileText size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Total</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.totalComplaints}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-yellow-50 text-yellow-600 p-2 rounded-lg">
                <Clock size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Pending</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.pending}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Eye size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">In Review</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.inReview}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <CheckCircle size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Resolved</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.resolved}</div>
          </div>
          
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                <UserX size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">Suspended</span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">{stats.activeSuspensions}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 mb-4 xs:mb-6">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('complaints')}
                className={`px-3 xs:px-4 py-2 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                  activeTab === 'complaints'
                    ? 'bg-primary-50 text-white'
                    : 'bg-gray-100 text-primary-50 hover:bg-gray-200'
                }`}
              >
                Complaints ({stats.totalComplaints})
              </button>
              <button
                onClick={() => setActiveTab('suspensions')}
                className={`px-3 xs:px-4 py-2 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                  activeTab === 'suspensions'
                    ? 'bg-primary-50 text-white'
                    : 'bg-gray-100 text-primary-50 hover:bg-gray-200'
                }`}
              >
                Suspensions ({suspensions.length})
              </button>
              <button
                onClick={() => setActiveTab('year-suspensions')}
                className={`px-3 xs:px-4 py-2 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                  activeTab === 'year-suspensions'
                    ? 'bg-primary-50 text-white'
                    : 'bg-gray-100 text-primary-50 hover:bg-gray-200'
                }`}
              >
                Year Suspensions ({yearSuspensions.length})
              </button>
            </div>
            <button 
              onClick={handleExportReports}
              className="flex items-center gap-2 bg-primary-300 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-gray-700 text-sm font-medium"
            >
              <Download size={16} />
              <span className="hidden xs:inline">Export Reports</span>
              <span className="xs:hidden">Export</span>
            </button>
          </div>
        </div>

        {activeTab === 'complaints' ? (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 mb-4 xs:mb-6">
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search complaints, students, or categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'All', count: stats.totalComplaints },
                    { key: 'pending', label: 'Pending', count: stats.pending },
                    { key: 'in-review', label: 'In Review', count: stats.inReview },
                    { key: 'resolved', label: 'Resolved', count: stats.resolved }
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

            {/* Complaints List */}
            <div className="space-y-3 xs:space-y-4">
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3 xs:gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(complaint.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm xs:text-base font-semibold text-primary-50 mb-1">
                            {complaint.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                              {complaint.status.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority} priority
                            </span>
                            <span className="text-xs text-primary-50/60 capitalize">
                              {complaint.type} • {complaint.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs text-primary-50/60 mb-2">
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>{complaint.studentName} ({complaint.studentId})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{complaint.createdAt}</span>
                            </div>
                            {complaint.assignedTo && (
                              <div className="flex items-center gap-1">
                                <Users size={12} />
                                <span>Assigned to: {complaint.assignedTo}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs xs:text-sm text-primary-50/70 line-clamp-2">
                            {complaint.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        <Eye size={14} />
                        <span className="hidden xs:inline">View</span>
                      </button>
                      <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100">
                        <MessageSquare size={14} />
                        <span className="hidden xs:inline">Message</span>
                      </button>
                      {complaint.status === 'pending' && (
                        <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-primary-50 text-white rounded hover:bg-opacity-90">
                          <CheckCircle size={14} />
                          <span className="hidden xs:inline">Assign</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : activeTab === 'suspensions' ? (
          <>
            {/* Suspensions Header */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-4 xs:mb-6">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">
                Student Suspensions
              </h2>
              <button
                onClick={() => setShowSuspensionModal(true)}
                className="flex items-center gap-2 bg-primary-50 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm font-medium"
              >
                <Plus size={16} />
                <span className="hidden xs:inline">New Suspension</span>
                <span className="xs:hidden">New</span>
              </button>
            </div>

            {/* Suspensions List */}
            <div className="space-y-3 xs:space-y-4">
              {suspensions.map((suspension) => (
                <div key={suspension.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3 xs:gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-1">
                          <UserX size={16} className="text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm xs:text-base font-semibold text-primary-50 mb-1">
                            {suspension.studentName} ({suspension.studentId})
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(suspension.status)}`}>
                              {suspension.status}
                            </span>
                            <span className="text-xs text-primary-50/60 capitalize">
                              {suspension.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs text-primary-50/60 mb-2">
                            <span>Start: {suspension.startDate}</span>
                            <span>End: {suspension.endDate}</span>
                          </div>
                          <p className="text-xs xs:text-sm text-primary-50/70 mb-2">
                            <strong>Reason:</strong> {suspension.reason}
                          </p>
                          <p className="text-xs xs:text-sm text-primary-50/70">
                            <strong>Notes:</strong> {suspension.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
                      <button
                        onClick={() => setSelectedSuspension(suspension)}
                        className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        <Eye size={14} />
                        <span className="hidden xs:inline">View</span>
                      </button>
                      {suspension.status === 'active' && (
                        <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100">
                          <CheckCircle size={14} />
                          <span className="hidden xs:inline">Reinstate</span>
                        </button>
                      )}
                      <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                        <Send size={14} />
                        <span className="hidden xs:inline">Notify</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Year Suspensions Header */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-4 xs:mb-6">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">
                Student Year Suspensions
              </h2>
            </div>

            {/* Year Suspensions List */}
            <div className="space-y-3 xs:space-y-4">
              {yearSuspensions.map((suspension) => (
                <div key={suspension.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3 xs:gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-1">
                          <Calendar size={16} className="text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm xs:text-base font-semibold text-primary-50 mb-1">
                            {suspension.studentName} ({suspension.studentId})
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(suspension.status)}`}>
                              {suspension.status.replace('-', ' ')}
                            </span>
                            <span className="text-xs text-primary-50/60 capitalize">
                              {suspension.type} • {suspension.duration}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs text-primary-50/60 mb-2">
                            <span>Start: {suspension.startDate}</span>
                            <span>End: {suspension.endDate}</span>
                            {suspension.returnRequestDate && (
                              <span>Return Request: {suspension.returnRequestDate}</span>
                            )}
                          </div>
                          <p className="text-xs xs:text-sm text-primary-50/70 mb-2">
                            <strong>Reason:</strong> {suspension.reason}
                          </p>
                          <p className="text-xs xs:text-sm text-primary-50/70 mb-2">
                            <strong>Notes:</strong> {suspension.notes}
                          </p>
                          {suspension.proofDocuments && suspension.proofDocuments.length > 0 && (
                            <div className="text-xs xs:text-sm text-primary-50/70">
                              <strong>Proof Documents:</strong>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {suspension.proofDocuments.map((doc, index) => (
                                  <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                    <Paperclip size={10} />
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
                      <button
                        onClick={() => setSelectedSuspension(suspension)}
                        className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        <Eye size={14} />
                        <span className="hidden xs:inline">View</span>
                      </button>
                      {suspension.status === 'pending-return' && (
                        <button 
                          onClick={() => handleApproveReturn(suspension.id)}
                          className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                        >
                          <CheckCircle size={14} />
                          <span className="hidden xs:inline">Approve Return</span>
                        </button>
                      )}
                      {suspension.status === 'pending-approval' && (
                        <>
                          <button 
                            onClick={() => handleApproveSuspension(suspension.id)}
                            className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                          >
                            <CheckCircle size={14} />
                            <span className="hidden xs:inline">Approve</span>
                          </button>
                          <button 
                            onClick={() => handleRejectSuspension(suspension.id)}
                            className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                          >
                            <XCircle size={14} />
                            <span className="hidden xs:inline">Reject</span>
                          </button>
                        </>
                      )}
                      <button className="flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-2 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                        <Send size={14} />
                        <span className="hidden xs:inline">Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}


      </div>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 xs:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">Complaint Details</h2>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Student</label>
                    <p className="text-sm text-primary-50/70">{selectedComplaint.studentName} ({selectedComplaint.studentId})</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Type & Category</label>
                    <p className="text-sm text-primary-50/70 capitalize">{selectedComplaint.type} - {selectedComplaint.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Priority</label>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Description</label>
                  <p className="text-sm text-primary-50/70 bg-gray-50 p-3 rounded-lg">
                    {selectedComplaint.description}
                  </p>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 pt-4">
                  <button 
                    onClick={() => handleAssignComplaint(selectedComplaint.id)}
                    className="flex-1 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm font-medium"
                  >
                    Assign to Staff
                  </button>
                  <button 
                    onClick={() => handleResolveComplaint(selectedComplaint.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Mark Resolved
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suspension Details Modal */}
      {selectedSuspension && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 xs:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">Suspension Details</h2>
                <button
                  onClick={() => setSelectedSuspension(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Student</label>
                    <p className="text-sm text-primary-50/70">{selectedSuspension.studentName} ({selectedSuspension.studentId})</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Category</label>
                    <p className="text-sm text-primary-50/70 capitalize">{selectedSuspension.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Start Date</label>
                    <p className="text-sm text-primary-50/70">{selectedSuspension.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">End Date</label>
                    <p className="text-sm text-primary-50/70">{selectedSuspension.endDate}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Status</label>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedSuspension.status)}`}>
                    {selectedSuspension.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Reason</label>
                  <p className="text-sm text-primary-50/70 bg-gray-50 p-3 rounded-lg">
                    {selectedSuspension.reason}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Notes</label>
                  <p className="text-sm text-primary-50/70 bg-gray-50 p-3 rounded-lg">
                    {selectedSuspension.notes}
                  </p>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 pt-4">
                  {selectedSuspension.status === 'active' && (
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                      Reinstate Student
                    </button>
                  )}
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                    Send Notification
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Edit Suspension
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Suspension Modal */}
      {showSuspensionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 xs:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">New Student Suspension</h2>
                <button
                  onClick={() => setShowSuspensionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">Student Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">Student ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                      placeholder="Enter student ID"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm">
                    <option value="academic">Academic Misconduct</option>
                    <option value="cheating">Cheating in Exams</option>
                    <option value="misconduct">Disrespect/Violence</option>
                    <option value="violation">Coursework Violations</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Reason</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm resize-none"
                    placeholder="Enter suspension reason"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm resize-none"
                    placeholder="Additional notes or requirements"
                  />
                </div>

                <div className="flex flex-col xs:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSuspensionModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm font-medium"
                  >
                    Create Suspension
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
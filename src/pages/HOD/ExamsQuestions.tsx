import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Eye, 
  Check, 
  X, 
  MessageSquare, 
  Upload, 
  Download,
  AlertTriangle,
  Clock,
} from 'lucide-react';

interface ExamQuestion {
  id: string;
  title: string;
  course: string;
  courseId: string;
  teacher: string;
  teacherId: string;
  examType: 'Quiz' | 'Midterm' | 'Final';
  semester: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Revision Required';
  submittedDate: string;
  reviewDate?: string;
  totalQuestions: number;
  totalMarks: number;
  duration: string;
  comments?: string;
  hasMarkingScheme: boolean;
}

const ExamsQuestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [selectedExamType, setSelectedExamType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamQuestion | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | 'revise' | null>(null);
  const [reviewComments, setReviewComments] = useState('');

  // Mock data
  const [examQuestions] = useState<ExamQuestion[]>([
    {
      id: '1',
      title: 'Data Structures Midterm Exam',
      course: 'Data Structures',
      courseId: 'CS102',
      teacher: 'Dr. Smith',
      teacherId: 'T001',
      examType: 'Midterm',
      semester: 'Fall 2024',
      status: 'Pending',
      submittedDate: '2024-12-10',
      totalQuestions: 25,
      totalMarks: 100,
      duration: '2 hours',
      hasMarkingScheme: true
    },
    {
      id: '2',
      title: 'Programming Fundamentals Quiz 1',
      course: 'Programming Fundamentals',
      courseId: 'CS101',
      teacher: 'Prof. Johnson',
      teacherId: 'T002',
      examType: 'Quiz',
      semester: 'Fall 2024',
      status: 'Approved',
      submittedDate: '2024-12-08',
      reviewDate: '2024-12-09',
      totalQuestions: 10,
      totalMarks: 50,
      duration: '1 hour',
      hasMarkingScheme: true
    },
    {
      id: '3',
      title: 'Database Systems Final Exam',
      course: 'Database Systems',
      courseId: 'CS201',
      teacher: 'Dr. Wilson',
      teacherId: 'T003',
      examType: 'Final',
      semester: 'Fall 2024',
      status: 'Revision Required',
      submittedDate: '2024-12-05',
      reviewDate: '2024-12-07',
      totalQuestions: 30,
      totalMarks: 150,
      duration: '3 hours',
      comments: 'Question 15 needs revision - too similar to previous year',
      hasMarkingScheme: false
    }
  ]);

  const courses = ['All Courses', 'Data Structures', 'Programming Fundamentals', 'Database Systems'];
  const teachers = ['All Teachers', 'Dr. Smith', 'Prof. Johnson', 'Dr. Wilson'];
  const examTypes = ['All Types', 'Quiz', 'Midterm', 'Final'];
  const statuses = ['All Status', 'Pending', 'Approved', 'Rejected', 'Revision Required'];
  const semesters = ['All Semesters', 'Fall 2024', 'Spring 2024'];

  const filteredExams = examQuestions.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || exam.course === selectedCourse;
    const matchesTeacher = selectedTeacher === 'all' || exam.teacher === selectedTeacher;
    const matchesExamType = selectedExamType === 'all' || exam.examType === selectedExamType;
    const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
    const matchesSemester = selectedSemester === 'all' || exam.semester === selectedSemester;
    
    return matchesSearch && matchesCourse && matchesTeacher && matchesExamType && matchesStatus && matchesSemester;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Revision Required': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <Check className="w-4 h-4 text-green-600" />;
      case 'Rejected': return <X className="w-4 h-4 text-red-600" />;
      case 'Revision Required': return <MessageSquare className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-primary-50" />;
    }
  };

  const handleReviewExam = (exam: ExamQuestion) => {
    setSelectedExam(exam);
    setShowReviewModal(true);
    setReviewAction(null);
    setReviewComments('');
  };

  const handleSubmitReview = () => {
    if (reviewAction && selectedExam) {
      // Mock review submission
      console.log('Review submitted:', {
        examId: selectedExam.id,
        action: reviewAction,
        comments: reviewComments
      });
      setShowReviewModal(false);
      setSelectedExam(null);
      setReviewAction(null);
      setReviewComments('');
    }
  };

  const stats = {
    total: examQuestions.length,
    pending: examQuestions.filter(e => e.status === 'Pending').length,
    approved: examQuestions.filter(e => e.status === 'Approved').length,
    needsRevision: examQuestions.filter(e => e.status === 'Revision Required').length
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Exam Questions Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Review and manage exam questions submitted by teachers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <FileText size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              {stats.total}
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">
              Total Exams
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-yellow-600 text-white p-2 rounded-lg">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              {stats.pending}
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">
              Pending Review
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <Check size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              {stats.approved}
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">
              Approved
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-orange-600 text-white p-2 rounded-lg">
                <AlertTriangle size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              {stats.needsRevision}
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">
              Need Revision
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 xs:gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-50" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-primary-50 rounded-lg  text-sm w-full text-primary-50"
              />
            </div>

            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 border border-primary-50 rounded-lg  text-sm text-primary-50"
            >
              {courses.map((course) => (
                <option
                  key={course}
                  value={course === "All Courses" ? "all" : course}
                >
                  {course}
                </option>
              ))}
            </select>

            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="px-4 py-2 border border-primary-50 rounded-lg  text-sm text-primary-50"
            >
              {teachers.map((teacher) => (
                <option
                  key={teacher}
                  value={teacher === "All Teachers" ? "all" : teacher}
                >
                  {teacher}
                </option>
              ))}
            </select>

            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="px-4 py-2 border border-primary-50 rounded-lg  text-sm text-primary-50"
            >
              {examTypes.map((type) => (
                <option key={type} value={type === "All Types" ? "all" : type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-primary-50 rounded-lg  text-sm text-primary-50"
            >
              {statuses.map((status) => (
                <option
                  key={status}
                  value={status === "All Status" ? "all" : status}
                >
                  {status}
                </option>
              ))}
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 border border-primary-50 rounded-lg  text-sm text-primary-50"
            >
              {semesters.map((semester) => (
                <option
                  key={semester}
                  value={semester === "All Semesters" ? "all" : semester}
                >
                  {semester}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Questions List */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 xs:p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">
                Exam Questions ({filteredExams.length})
              </h2>
              <button className="bg-primary-50 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-primary-100 flex items-center gap-2 text-xs xs:text-sm">
                <Upload className="w-4 h-4" />
                Upload Exam
              </button>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-primary-50 text-sm">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-primary-50/60 mt-1">
                      {exam.course} • {exam.teacher}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(exam.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        exam.status
                      )}`}
                    >
                      {exam.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-primary-50/60 mb-3">
                  <div>Type: {exam.examType}</div>
                  <div>Questions: {exam.totalQuestions}</div>
                  <div>Marks: {exam.totalMarks}</div>
                  <div>Duration: {exam.duration}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleReviewExam(exam)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-xs"
                  >
                    <Eye className="w-3 h-3" />
                    Review
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 text-xs">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Exam Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-primary-50">
                          {exam.title}
                        </div>
                        <div className="text-sm text-primary-50/60">
                          {exam.course} ({exam.courseId})
                        </div>
                        <div className="text-xs text-primary-50/40 mt-1">
                          {exam.totalMarks} marks • {exam.duration}
                          {!exam.hasMarkingScheme && (
                            <span className="text-red-500 ml-2">
                              • No marking scheme
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-50">
                      {exam.teacher}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {exam.examType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-50">
                      {exam.totalQuestions}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(exam.status)}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            exam.status
                          )}`}
                        >
                          {exam.status}
                        </span>
                      </div>
                      {exam.comments && (
                        <div className="text-xs text-gray-500 mt-1">
                          {exam.comments}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-50/60">
                      {exam.submittedDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReviewExam(exam)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Review Exam"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && selectedExam && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg xs:rounded-xl p-4 xs:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg shadow-primary-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-50">
                  Review Exam
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium text-primary-50">
                    {selectedExam.title}
                  </h4>
                  <p className="text-sm text-primary-50/60">
                    {selectedExam.course} • {selectedExam.teacher} •{" "}
                    {selectedExam.examType}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-primary-50">
                  <div>
                    <span className="font-medium">Questions:</span>{" "}
                    {selectedExam.totalQuestions}
                  </div>
                  <div>
                    <span className="font-medium">Total Marks:</span>{" "}
                    {selectedExam.totalMarks}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {selectedExam.duration}
                  </div>
                  <div>
                    <span className="font-medium">Marking Scheme:</span>
                    {selectedExam.hasMarkingScheme ? (
                      <span className="text-green-600 ml-1">Available</span>
                    ) : (
                      <span className="text-red-600 ml-1">Missing</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Review Action
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReviewAction("approve")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        reviewAction === "approve"
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      <Check className="w-4 h-4 inline mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => setReviewAction("revise")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        reviewAction === "revise"
                          ? "bg-yellow-600 text-white"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Request Revision
                    </button>
                    <button
                      onClick={() => setReviewAction("reject")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        reviewAction === "reject"
                          ? "bg-red-600 text-white"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      <X className="w-4 h-4 inline mr-2" />
                      Reject
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    placeholder="Add your review comments..."
                    className="w-full px-3 py-2 border border-primary-50/40 rounded-lg  text-sm text-primary-50"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-primary-300 border border-primary-300/30 rounded-lg hover:bg-primary-300/10 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!reviewAction}
                  className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsQuestions;
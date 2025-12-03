import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoCloudUploadOutline,
    IoDocumentTextOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";

interface MarksAppeal {
  id: string;
  courseCode: string;
  courseName: string;
  examType: string;
  currentMarks: number;
  expectedMarks?: number;
  reason: string;
  status: "pending" | "under-review" | "approved" | "rejected";
  submittedDate: string;
  reviewedDate?: string;
  reviewerComments?: string;
  attachments?: string[];
}

const MarksAppealPage: React.FC = () => {
  const [showNewAppeal, setShowNewAppeal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    yearOfStudy: "",
    department: "",
    courseCode: "",
    courseName: "",
    examType: "",
    currentMarks: "",
    expectedMarks: "",
    reason: "",
  });

  // Mock data for existing appeals
  const [appeals] = useState<MarksAppeal[]>([
    {
      id: "APP-2024-001",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      examType: "Final Exam",
      currentMarks: 65,
      expectedMarks: 75,
      reason:
        "I believe there was an error in grading Question 3. I provided the correct algorithm implementation but received partial marks.",
      status: "approved",
      submittedDate: "2024-11-15",
      reviewedDate: "2024-11-20",
      reviewerComments:
        "After review, we found a grading error. Your marks have been updated to 72.",
      attachments: ["exam_paper.pdf", "answer_sheet.pdf"],
    },
    {
      id: "APP-2024-002",
      courseCode: "MATH201",
      courseName: "Calculus II",
      examType: "Midterm Exam",
      currentMarks: 58,
      expectedMarks: 70,
      reason:
        "My solution for the integration problem was correct but marked wrong. I used a different method than the one taught in class.",
      status: "under-review",
      submittedDate: "2024-11-25",
      attachments: ["solution_steps.pdf"],
    },
    {
      id: "APP-2024-003",
      courseCode: "PHY301",
      courseName: "Quantum Physics",
      examType: "Assignment 2",
      currentMarks: 45,
      reason:
        "I submitted the assignment on time but it was marked as late. I have email confirmation of submission.",
      status: "pending",
      submittedDate: "2024-12-01",
      attachments: ["email_confirmation.pdf"],
    },
  ]);

  const courses = [
    { code: "CS101", name: "Introduction to Computer Science" },
    { code: "MATH201", name: "Calculus II" },
    { code: "PHY301", name: "Quantum Physics" },
    { code: "ENG102", name: "English Literature" },
    { code: "CHEM201", name: "Organic Chemistry" },
  ];

  const examTypes = [
    "Final Exam",
    "Midterm Exam",
    "Quiz",
    "Assignment",
    "Project",
    "Lab Work",
  ];

  const academicDepartments = [
    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Business Administration",
    "Accounting",
    "Economics",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Medicine",
    "Nursing",
    "Pharmacy",
  ];

  const yearsOfStudy = [
    { value: "1", label: "Year 1" },
    { value: "2", label: "Year 2" },
    { value: "3", label: "Year 3" },
    { value: "4", label: "Year 4" },
    { value: "5", label: "Year 5" },
    { value: "6", label: "Year 6" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmitAppeal = () => {
    // Validate form
    if (
      !formData.yearOfStudy ||
      !formData.department ||
      !formData.courseCode ||
      !formData.examType ||
      !formData.currentMarks ||
      !formData.reason
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle appeal submission
    alert("Marks appeal submitted successfully!");
    setShowNewAppeal(false);
    setUploadedFiles([]);
    setFormData({
      yearOfStudy: "",
      department: "",
      courseCode: "",
      courseName: "",
      examType: "",
      currentMarks: "",
      expectedMarks: "",
      reason: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "under-review":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <IoCloseCircleOutline className="w-5 h-5 text-red-600" />;
      case "under-review":
        return <IoDocumentTextOutline className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <IoTimeOutline className="w-5 h-5 text-yellow-600" />;
      default:
        return <IoAlertCircleOutline className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredAppeals = appeals.filter(
    (appeal) => filterStatus === "all" || appeal.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoAlertCircleOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              Marks Appeal
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Submit appeals for marks you believe need review
            </p>
          </div>

          <button
            onClick={() => setShowNewAppeal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            New Appeal
          </button>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <IoAlertCircleOutline className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Important Information
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Appeals must be submitted within 7 days of marks publication
              </li>
              <li>
                • Provide clear evidence and explanation for your appeal
              </li>
              <li>• Review process typically takes 5-10 working days</li>
              <li>• You will be notified via email once review is complete</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-primary-50 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
            >
              <option value="all">All Appeals</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appeals List */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50">
            My Appeals
            <span className="text-sm font-normal text-primary-50/60 ml-2">
              ({filteredAppeals.length} appeals)
            </span>
          </h2>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {filteredAppeals.map((appeal) => (
            <div
              key={appeal.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-50/30 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    {getStatusIcon(appeal.status)}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-primary-50">
                          {appeal.id}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            appeal.status
                          )}`}
                        >
                          {appeal.status}
                        </span>
                      </div>
                      <p className="text-sm text-primary-50 font-medium">
                        {appeal.courseCode} - {appeal.courseName}
                      </p>
                      <p className="text-xs text-primary-50/60">
                        {appeal.examType}
                      </p>
                    </div>
                  </div>

                  {/* Marks Info */}
                  <div className="flex gap-4 mb-3 bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="text-xs text-primary-50/60 mb-1">
                        Current Marks
                      </p>
                      <p className="text-lg font-bold text-red-600">
                        {appeal.currentMarks}%
                      </p>
                    </div>
                    {appeal.expectedMarks && (
                      <>
                        <div className="border-l border-gray-300"></div>
                        <div>
                          <p className="text-xs text-primary-50/60 mb-1">
                            Expected Marks
                          </p>
                          <p className="text-lg font-bold text-green-600">
                            {appeal.expectedMarks}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Reason */}
                  <div className="mb-3">
                    <p className="text-xs text-primary-50/60 mb-1 font-medium">
                      Reason for Appeal:
                    </p>
                    <p className="text-sm text-primary-50 bg-gray-50 p-3 rounded-lg">
                      {appeal.reason}
                    </p>
                  </div>

                  {/* Reviewer Comments */}
                  {appeal.reviewerComments && (
                    <div className="mb-3">
                      <p className="text-xs text-primary-50/60 mb-1 font-medium">
                        Reviewer Comments:
                      </p>
                      <p className="text-sm text-primary-50 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        {appeal.reviewerComments}
                      </p>
                    </div>
                  )}

                  {/* Attachments */}
                  {appeal.attachments && appeal.attachments.length > 0 && (
                    <div>
                      <p className="text-xs text-primary-50/60 mb-2 font-medium">
                        Attachments:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {appeal.attachments.map((file, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-primary-50 rounded-full text-xs flex items-center gap-2"
                          >
                            <IoDocumentTextOutline className="w-3 h-3" />
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Section - Dates */}
                <div className="text-sm text-primary-50/60 lg:text-right space-y-1">
                  <p>Submitted: {appeal.submittedDate}</p>
                  {appeal.reviewedDate && (
                    <p>Reviewed: {appeal.reviewedDate}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredAppeals.length === 0 && (
            <div className="text-center py-12">
              <IoAlertCircleOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
              <p className="text-primary-50/60">No appeals found</p>
            </div>
          )}
        </div>
      </div>

      {/* New Appeal Modal */}
      {showNewAppeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary-50 flex items-center gap-2">
                  <IoAlertCircleOutline className="w-6 h-6" />
                  Submit Marks Appeal
                </h2>
                <button
                  onClick={() => {
                    setShowNewAppeal(false);
                    setUploadedFiles([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IoCloseCircleOutline className="w-6 h-6 text-primary-50/60" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Year of Study */}
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Year of Study <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) =>
                      setFormData({ ...formData, yearOfStudy: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                  >
                    <option value="">Select year</option>
                    {yearsOfStudy.map((year) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                  >
                    <option value="">Select department</option>
                    {academicDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courseCode}
                  onChange={(e) => {
                    const course = courses.find((c) => c.code === e.target.value);
                    setFormData({
                      ...formData,
                      courseCode: e.target.value,
                      courseName: course?.name || "",
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exam Type */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Exam/Assessment Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.examType}
                  onChange={(e) =>
                    setFormData({ ...formData, examType: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                >
                  <option value="">Select exam type</option>
                  {examTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marks */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Current Marks (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.currentMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, currentMarks: e.target.value })
                    }
                    placeholder="e.g., 65"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Expected Marks (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.expectedMarks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectedMarks: e.target.value,
                      })
                    }
                    placeholder="e.g., 75"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Reason for Appeal <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  placeholder="Provide a detailed explanation of why you believe your marks should be reviewed. Include specific questions or sections you're appealing..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Supporting Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-50 transition-colors">
                  <IoCloudUploadOutline className="w-12 h-12 text-primary-50/40 mx-auto mb-2" />
                  <p className="text-sm text-primary-50/60 mb-2">
                    Upload exam papers, answer sheets, or other evidence
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="appeal-file-upload"
                  />
                  <label
                    htmlFor="appeal-file-upload"
                    className="inline-block px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <IoDocumentTextOutline className="w-4 h-4 text-primary-50 flex-shrink-0" />
                          <span className="text-sm text-primary-50 truncate">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                        >
                          <IoTrashOutline className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => {
                  setShowNewAppeal(false);
                  setUploadedFiles([]);
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAppeal}
                className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
              >
                Submit Appeal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarksAppealPage;

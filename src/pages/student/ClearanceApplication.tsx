import React, { useState } from "react";
import {
    IoAddOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoCloudUploadOutline,
    IoDocumentTextOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";

interface ClearanceItem {
  id: string;
  department: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  approvedDate?: string;
  remarks?: string;
}

interface ClearanceApplication {
  id: string;
  academicYear: string;
  semester: string;
  status: "draft" | "submitted" | "in-progress" | "completed" | "rejected";
  submittedDate?: string;
  completedDate?: string;
  items: ClearanceItem[];
}

const ClearanceApplicationPage: React.FC = () => {
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [yearOfStudy, setYearOfStudy] = useState("1");
  const [department, setDepartment] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Mock data for existing applications
  const [applications] = useState<ClearanceApplication[]>([
    {
      id: "CLR-2024-001",
      academicYear: "2023-2024",
      semester: "2",
      status: "completed",
      submittedDate: "2024-06-15",
      completedDate: "2024-06-25",
      items: [
        {
          id: "1",
          department: "Library",
          status: "approved",
          submittedDate: "2024-06-15",
          approvedDate: "2024-06-18",
          remarks: "No outstanding books",
        },
        {
          id: "2",
          department: "Finance",
          status: "approved",
          submittedDate: "2024-06-15",
          approvedDate: "2024-06-20",
          remarks: "All fees paid",
        },
        {
          id: "3",
          department: "Hostel",
          status: "approved",
          submittedDate: "2024-06-15",
          approvedDate: "2024-06-22",
          remarks: "Room cleared",
        },
        {
          id: "4",
          department: "Academic Registry",
          status: "approved",
          submittedDate: "2024-06-15",
          approvedDate: "2024-06-25",
          remarks: "All requirements met",
        },
      ],
    },
  ]);

  const clearanceDepartments = [
    "Library",
    "Finance",
    "Hostel",
    "Academic Registry",
    "IT Department",
    "Sports Department",
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

  const handleSubmitApplication = () => {
    // Handle application submission
    alert("Clearance application submitted successfully!");
    setShowNewApplication(false);
    setUploadedFiles([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
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
      case "pending":
      case "in-progress":
        return <IoTimeOutline className="w-5 h-5 text-yellow-600" />;
      default:
        return <IoDocumentTextOutline className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoDocumentTextOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              Clearance Application
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Apply for clearance and track your application status
            </p>
          </div>

          <button
            onClick={() => setShowNewApplication(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            New Application
          </button>
        </div>
      </div>

      {/* Application History */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50">
            Application History
          </h2>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-50/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-primary-50">{app.id}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-primary-50/60">
                    Academic Year: {app.academicYear} - Semester {app.semester}
                  </p>
                </div>
                <div className="text-sm text-primary-50/60">
                  {app.submittedDate && (
                    <p>Submitted: {app.submittedDate}</p>
                  )}
                  {app.completedDate && (
                    <p>Completed: {app.completedDate}</p>
                  )}
                </div>
              </div>

              {/* Clearance Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {app.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <p className="font-medium text-primary-50 text-sm">
                          {item.department}
                        </p>
                        {item.remarks && (
                          <p className="text-xs text-primary-50/60">
                            {item.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-12">
              <IoDocumentTextOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
              <p className="text-primary-50/60">No applications yet</p>
            </div>
          )}
        </div>
      </div>

      {/* New Application Modal */}
      {showNewApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary-50 flex items-center gap-2">
                  <IoDocumentTextOutline className="w-6 h-6" />
                  New Clearance Application
                </h2>
                <button
                  onClick={() => {
                    setShowNewApplication(false);
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
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
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
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
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

              {/* Academic Year Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>

                {/* Semester Selection */}
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                  </select>
                </div>
              </div>

              {/* Departments Checklist */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-3">
                  Departments for Clearance <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {clearanceDepartments.map((dept) => (
                    <label
                      key={dept}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-50 border-gray-300 rounded focus:ring-primary-50"
                        defaultChecked
                      />
                      <span className="text-sm text-primary-50">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Supporting Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-50 transition-colors">
                  <IoCloudUploadOutline className="w-12 h-12 text-primary-50/40 mx-auto mb-2" />
                  <p className="text-sm text-primary-50/60 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
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
                        <span className="text-sm text-primary-50 truncate">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <IoTrashOutline className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter any additional information..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => {
                  setShowNewApplication(false);
                  setUploadedFiles([]);
                }}
                className="flex-1 px-4 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearanceApplicationPage;

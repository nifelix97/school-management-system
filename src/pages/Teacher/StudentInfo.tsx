import { useState } from "react";
import {
  ChevronLeft,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  Award,
  TrendingUp,
  X,
} from "lucide-react";

interface Student {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  guardianName: string;
  guardianPhone: string;
  enrollmentDate: string;
  class: string;
  avatar?: string;
  attendance: number;
  gpa: number;
  subjects: { name: string; grade: string; }[];
}

export default function StudentInfo() {
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const classes = ["Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B", "Grade 12-A"];

  const students: Student[] = [
    {
      id: "1",
      code: "STU001",
      name: "John Smith",
      email: "john.smith@school.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "2008-05-15",
      gender: "Male",
      guardianName: "Robert Smith",
      guardianPhone: "+1 234-567-8900",
      enrollmentDate: "2023-09-01",
      class: "Grade 10-A",
      attendance: 95,
      gpa: 3.8,
      subjects: [
        { name: "Mathematics", grade: "A" },
        { name: "Physics", grade: "A-" },
        { name: "Chemistry", grade: "B+" },
        { name: "English", grade: "A" },
      ],
    },
    {
      id: "2",
      code: "STU002",
      name: "Emma Johnson",
      email: "emma.johnson@school.com",
      phone: "+1 234-567-8902",
      address: "456 Oak Ave, City, State 12345",
      dateOfBirth: "2008-08-22",
      gender: "Female",
      guardianName: "Sarah Johnson",
      guardianPhone: "+1 234-567-8903",
      enrollmentDate: "2023-09-01",
      class: "Grade 10-A",
      attendance: 92,
      gpa: 3.9,
      subjects: [
        { name: "Mathematics", grade: "A" },
        { name: "Physics", grade: "A" },
        { name: "Chemistry", grade: "A-" },
        { name: "English", grade: "A+" },
      ],
    },
    {
      id: "3",
      code: "STU003",
      name: "Michael Brown",
      email: "michael.brown@school.com",
      phone: "+1 234-567-8904",
      address: "789 Pine Rd, City, State 12345",
      dateOfBirth: "2008-03-10",
      gender: "Male",
      guardianName: "David Brown",
      guardianPhone: "+1 234-567-8905",
      enrollmentDate: "2023-09-01",
      class: "Grade 10-A",
      attendance: 88,
      gpa: 3.5,
      subjects: [
        { name: "Mathematics", grade: "B+" },
        { name: "Physics", grade: "B" },
        { name: "Chemistry", grade: "B+" },
        { name: "English", grade: "A-" },
      ],
    },
    {
      id: "4",
      code: "STU004",
      name: "Sophia Davis",
      email: "sophia.davis@school.com",
      phone: "+1 234-567-8906",
      address: "321 Elm St, City, State 12345",
      dateOfBirth: "2008-11-30",
      gender: "Female",
      guardianName: "Jennifer Davis",
      guardianPhone: "+1 234-567-8907",
      enrollmentDate: "2023-09-01",
      class: "Grade 10-A",
      attendance: 97,
      gpa: 4.0,
      subjects: [
        { name: "Mathematics", grade: "A+" },
        { name: "Physics", grade: "A+" },
        { name: "Chemistry", grade: "A" },
        { name: "English", grade: "A+" },
      ],
    },
    {
      id: "5",
      code: "STU005",
      name: "William Wilson",
      email: "william.wilson@school.com",
      phone: "+1 234-567-8908",
      address: "654 Maple Dr, City, State 12345",
      dateOfBirth: "2008-07-18",
      gender: "Male",
      guardianName: "Thomas Wilson",
      guardianPhone: "+1 234-567-8909",
      enrollmentDate: "2023-09-01",
      class: "Grade 10-A",
      attendance: 90,
      gpa: 3.6,
      subjects: [
        { name: "Mathematics", grade: "B+" },
        { name: "Physics", grade: "A-" },
        { name: "Chemistry", grade: "B+" },
        { name: "English", grade: "B+" },
      ],
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.class === selectedClass &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-2 xxs:px-3 xs:px-4 sm:px-6 md:px-8 py-2 xxs:py-3 xs:py-4 sm:py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-3 xxs:mb-4 xs:mb-5 sm:mb-6 transition-colors"
          style={{ color: "var(--color-primary-50)" }}
        >
          <ChevronLeft className="w-4 h-4 xxs:w-5 xxs:h-5" />
          <span className="text-xs xxs:text-sm sm:text-base font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xxs:gap-3 mb-3 xxs:mb-4 xs:mb-5 sm:mb-6">
          <h1 className="text-lg xxs:text-xl xs:text-2xl sm:text-3xl font-bold text-primary-50">
            👥 Student Information
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xxs:rounded-xl shadow-sm p-2 xxs:p-3 sm:p-6 mb-3 xxs:mb-4 xs:mb-5 sm:mb-6 max-w-sm xxs:max-w-md sm:max-w-none mx-auto sm:mx-0">
          <div className="grid grid-cols-2 gap-1.5 xxs:gap-2 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-primary-50 mb-1 sm:mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-1.5 xxs:px-2 py-1 xxs:py-1.5 sm:px-3 sm:py-2.5 border border-primary-50 text-primary-50 rounded text-xs sm:text-sm"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-primary-50 mb-1 sm:mb-2">
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-1.5 xxs:left-2 sm:left-3 top-1/2 -translate-y-1/2 text-primary-50"
                  size={12}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-5 xxs:pl-6 pr-1.5 xxs:pr-2 py-1 xxs:py-1.5 sm:pl-10 sm:pr-4 sm:py-2.5 border border-primary-50 text-primary-50 rounded text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-lg xxs:rounded-xl shadow-lg overflow-hidden">
            <table className="w-full table-fixed">
              <thead
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))",
                }}
              >
                <tr>
                  <th className="w-2/5 px-2 py-2 text-left text-xs font-bold text-white">
                    Student
                  </th>
                  <th className="w-1/6 px-1 py-2 text-left text-xs font-bold text-white">
                    Code
                  </th>
                  <th className="w-1/6 px-1 py-2 text-center text-xs font-bold text-white">
                    Attend
                  </th>
                  <th className="w-1/6 px-1 py-2 text-center text-xs font-bold text-white">
                    GPA
                  </th>
                  <th className="w-1/6 px-1 py-2 text-center text-xs font-bold text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: "var(--color-primary-50)" }}
                        >
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-xs font-medium text-primary-50 truncate">
                          {student.name.split(' ')[0]}
                        </span>
                      </div>
                    </td>
                    <td className="px-1 py-2 text-xs text-primary-50">
                      {student.code.replace('STU', '')}
                    </td>
                    <td className="px-1 py-2 text-center">
                      <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-1 py-2 text-center">
                      <span
                        className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: "var(--color-primary-100)",
                          color: "var(--color-primary-50)",
                        }}
                      >
                        {student.gpa.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-1 py-2 text-center">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-2 py-1 rounded text-xs font-medium text-white transition-colors hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: "var(--color-primary-50)" }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-6 xxs:py-8 sm:py-12">
              <p className="text-primary-50 text-xs xxs:text-sm">No students found</p>
            </div>
          )}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div
              className="sticky top-0 p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between z-10"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))",
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-base sm:text-xl font-bold"
                  style={{ color: "var(--color-primary-50)" }}
                >
                  {selectedStudent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {selectedStudent.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-white opacity-90">
                    {selectedStudent.code} • {selectedStudent.class}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors active:scale-95"
              >
                <X size={22} className="text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="text-green-600" size={18} />
                    <p className="text-xs sm:text-sm text-primary-50">
                      Attendance
                    </p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    {selectedStudent.attendance}%
                  </p>
                </div>

                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: "var(--color-primary-100)",
                    borderColor: "var(--color-primary-50)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Award
                      size={18}
                      style={{ color: "var(--color-primary-50)" }}
                    />
                    <p className="text-xs sm:text-sm text-primary-50">GPA</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-primary-50">
                    {selectedStudent.gpa.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <User size={18} />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail
                      size={16}
                      className="text-primary-50 mt-0.5 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-primary-50">Email</p>
                      <p className="text-sm font-medium text-primary-50 break-words">
                        {selectedStudent.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      size={16}
                      className="text-primary-50 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-primary-50">Phone</p>
                      <p className="text-sm font-medium text-primary-50">
                        {selectedStudent.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="text-primary-50 mt-0.5 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-primary-50">Address</p>
                      <p className="text-sm font-medium text-primary-50 break-words">
                        {selectedStudent.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar
                      size={16}
                      className="text-primary-50 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-primary-50">Date of Birth</p>
                      <p className="text-sm font-medium text-primary-50">
                        {new Date(
                          selectedStudent.dateOfBirth
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User
                      size={16}
                      className="text-primary-50 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-primary-50">Gender</p>
                      <p className="text-sm font-medium text-primary-50">
                        {selectedStudent.gender}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <User size={18} />
                  Guardian Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-primary-50">Guardian Name</p>
                    <p className="text-sm font-medium text-primary-50">
                      {selectedStudent.guardianName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50">Guardian Phone</p>
                    <p className="text-sm font-medium text-primary-50">
                      {selectedStudent.guardianPhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Performance */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <BookOpen size={18} />
                  Academic Performance
                </h3>
                <div className="space-y-2">
                  {selectedStudent.subjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white rounded-lg"
                    >
                      <span className="text-sm text-primary-50">
                        {subject.name}
                      </span>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-primary-100)",
                          color: "var(--color-primary-50)",
                        }}
                      >
                        {subject.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enrollment Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3">
                  Enrollment Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-primary-50">Enrollment Date</p>
                    <p className="text-sm font-medium text-primary-50">
                      {new Date(
                        selectedStudent.enrollmentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50">Current Class</p>
                    <p className="text-sm font-medium text-primary-50">
                      {selectedStudent.class}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

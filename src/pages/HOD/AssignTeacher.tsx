import {
  Award,
  Clock,
  Eye,
  Search
} from "lucide-react";
import { useState } from "react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string;
  qualification: string;
  status: "Active" | "Busy" | "Unavailable";
  workload: number;
  maxWorkload: number;
  experience: number;
  rating: number;
}

export default function AssignTeacher() {
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);



  const teachers: Teacher[] = [
    { id: "1", name: "Dr. Smith", email: "smith@university.edu", specialization: "Data Structures", qualification: "PhD Computer Science", status: "Active", workload: 2, maxWorkload: 4, experience: 8, rating: 4.5 },
    { id: "2", name: "Dr. Johnson", email: "johnson@university.edu", specialization: "Machine Learning", qualification: "PhD AI", status: "Busy", workload: 4, maxWorkload: 4, experience: 12, rating: 4.8 },
    { id: "3", name: "Dr. Brown", email: "brown@university.edu", specialization: "Programming", qualification: "PhD Software Engineering", status: "Active", workload: 1, maxWorkload: 4, experience: 5, rating: 4.2 }
  ];



  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) || teacher.specialization.toLowerCase().includes(teacherSearch.toLowerCase());
    const matchesFilter = teacherFilter === "all" || teacher.status === teacherFilter;
    return matchesSearch && matchesFilter;
  });



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Department Teachers
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            View teachers in your department
          </p>
        </div>

        {/* Teachers Section */}
            {/* Teacher Filters */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
                <div className="relative flex-1 sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  />
                </div>
                <select
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Busy">Busy</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            {/* Teacher Cards - Mobile */}
            <div className="lg:hidden space-y-3 xs:space-y-4">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                        {teacher.name}
                      </h3>
                      <p className="text-xs xs:text-sm text-primary-50/60">{teacher.specialization}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      teacher.status === "Active" ? "text-green-600 bg-green-50" :
                      teacher.status === "Busy" ? "text-yellow-600 bg-yellow-50" :
                      "text-red-600 bg-red-50"
                    }`}>
                      {teacher.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <Clock size={12} />
                      <span>{teacher.workload}/{teacher.maxWorkload} courses</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <Award size={12} />
                      <span>{teacher.rating}/5.0 rating</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowProfileModal(true);
                    }}
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Eye size={14} className="inline mr-1" />
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            {/* Teacher Table - Desktop */}
            <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Specialization</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Workload</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Rating</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-primary-50">{teacher.name}</div>
                          <div className="text-sm text-primary-50/60">{teacher.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary-50">{teacher.specialization}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-primary-50">{teacher.workload}/{teacher.maxWorkload}</div>
                        <div className="text-xs text-primary-50/60">courses</div>
                      </td>
                      <td className="px-4 py-3 text-center text-primary-50">{teacher.rating}/5.0</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          teacher.status === "Active" ? "text-green-600 bg-green-50" :
                          teacher.status === "Busy" ? "text-yellow-600 bg-yellow-50" :
                          "text-red-600 bg-red-50"
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setShowProfileModal(true);
                          }}
                          className="px-3 py-1 border border-primary-50 text-primary-50 rounded text-xs hover:bg-gray-50"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


        {/* Teacher Profile Modal */}
        {showProfileModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary-50">{selectedTeacher.name}</h2>
                <p className="text-sm text-primary-50/60">{selectedTeacher.email}</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Qualifications</h3>
                  <p className="text-sm text-primary-50/70">{selectedTeacher.qualification}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Specialization</h3>
                  <p className="text-sm text-primary-50/70">{selectedTeacher.specialization}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-primary-50 mb-1">Experience</h3>
                    <p className="text-sm text-primary-50/70">{selectedTeacher.experience} years</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-50 mb-1">Rating</h3>
                    <p className="text-sm text-primary-50/70">{selectedTeacher.rating}/5.0</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-50 mb-1">Current Workload</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-50 h-2 rounded-full" 
                        style={{ width: `${(selectedTeacher.workload / selectedTeacher.maxWorkload) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-primary-50/70">
                      {selectedTeacher.workload}/{selectedTeacher.maxWorkload}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setSelectedTeacher(null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
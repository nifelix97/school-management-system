import {
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  Mail,
  MapPin,
  Search,
  Star,
  Users
} from "lucide-react";
import { useState } from "react";
import { useGetTeachersQuery } from "../../app/api/courses";
import type { Teacher } from "../../types/course";

export default function TeacherPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: teachersData, isLoading, error } = useGetTeachersQuery();

  const teachers = teachersData?.data || [];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfdfe] relative overflow-hidden">
        {/* Advanced Background Ambient Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-50/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

        <div className="z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
          {/* Custom Orbital Loader */}
          <div className="relative w-32 h-32 mb-12">
            {/* Outer Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border border-primary-50/10 animate-[ping_3s_linear_infinite]" />
            
            {/* Middle Rotating Ring */}
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary-50/20 animate-[spin_10s_linear_infinite]" />
            
            {/* Main Content Container */}
            <div className="absolute inset-4 bg-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-primary-50/5 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-50/5 to-transparent animate-pulse" />
              <Users className="w-8 h-8 text-primary-50 relative z-10 animate-bounce" />
            </div>

            {/* Orbiting Particles */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-50 rounded-full shadow-[0_0_12px_rgba(30,41,59,0.4)]" />
            </div>
          </div>

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-3xl font-extrabold text-primary-50 tracking-tight leading-tight">
              Loading Teachers
            </h2>
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-50 animate-[shimmer_1.5s_infinite] w-full origin-left" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary-50/30">
                Wait shortly
              </span>
              <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-50 animate-[shimmer_1.5s_infinite] w-full origin-left [animation-delay:0.2s]" />
              </div>
            </div>
            <p className="text-sm text-primary-50/50 font-medium">
              We&apos;re preparing your personalized Teacher list wait a moment please.
            </p>
          </div>
        </div>

        {/* CSS for custom animations if needed, but Tailwind 4.0 handles most */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer {
            0% { transform: scaleX(0); opacity: 0; transform-origin: left; }
            50% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(0); opacity: 0; transform-origin: right; }
          }
          .animate-spin-slow {
            animation: spin 6s linear infinite;
          }
        `}} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <p className="text-red-500 font-bold mb-4">Error loading teachers??</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:opacity-90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedTeacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <button
            onClick={() => setSelectedTeacher(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Teachers</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedTeacher.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTeacher.name)}&background=random`}
                    alt={selectedTeacher.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-50/10"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-primary-50 mb-1">
                        {selectedTeacher.name}
                      </h1>
                      <p className="text-lg text-primary-50 font-medium mb-3">
                        {selectedTeacher.specialization || "Teacher"}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-primary-50">
                          {selectedTeacher.rating || "N/A"}
                        </span>
                        {selectedTeacher.rating && <span className="text-primary-50/60 text-sm">/ 5.0</span>}
                      </div>
                    </div>
                    {selectedTeacher.yearsOfExperience && (
                      <div className="flex items-center gap-2 text-sm text-primary-50 bg-primary-50/5 px-3 py-1 rounded-full">
                        <Award size={16} />
                        <span>{selectedTeacher.yearsOfExperience} years exp.</span>
                      </div>
                    )}
                  </div>

                  <p className="text-primary-50/80 mb-6 italic">{selectedTeacher.bio || "No biography available."}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-gray-50">
                    <div>
                      <h3 className="font-semibold text-primary-50 mb-3 flex items-center gap-2">
                        <Mail size={18} className="text-primary-50" />
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-primary-50/60 w-12">Email:</span>
                          <span className="text-primary-50 truncate">
                            {selectedTeacher.email}
                          </span>
                        </div>
                        {selectedTeacher.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-primary-50/60 w-12">Phone:</span>
                            <span className="text-primary-50 font-mono">
                              {selectedTeacher.phone}
                            </span>
                          </div>
                        )}
                        {selectedTeacher.office && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-primary-50/60 w-12">Office:</span>
                            <span className="text-primary-50">
                              {selectedTeacher.office}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary-50 mb-3 flex items-center gap-2">
                        <Calendar size={18} className="text-primary-50" />
                        Schedule
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-primary-50/60" />
                          <span className="text-primary-50">
                            {selectedTeacher.officeHours || "By appointment"}
                          </span>
                        </div>
                        {selectedTeacher.nextClass && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={16} className="text-primary-50/60" />
                            <span className="text-primary-50">
                              Next class: {selectedTeacher.nextClass}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedTeacher.education && selectedTeacher.education.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-semibold text-primary-50 mb-3 flex items-center gap-2">
                        <BookOpen size={18} className="text-primary-50" />
                        Education
                      </h3>
                      <ul className="space-y-2">
                        {selectedTeacher.education.map((edu, index) => (
                          <li
                            key={index}
                            className="text-sm text-primary-50/80 bg-gray-50 px-3 py-2 rounded-lg"
                          >
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedTeacher.qualification && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-primary-50/60 uppercase tracking-wider mb-2">Qualification</h3>
                      <p className="text-primary-50">{selectedTeacher.qualification}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-50">My Teachers</h1>
            <p className="text-primary-50/60 mt-1">Manage and view information about your instructors</p>
          </div>
          <div className="relative flex-1 sm:flex-initial">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-10 pr-4 py-2 bg-white border border-gray-200 text-primary-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 transition-all"
            />
          </div>
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200 shadow-sm">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-primary-50">No teachers found</h3>
            <p className="text-primary-50/60 mt-2">Try adjusting your search terms or contact support if you believe this is an error.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer group overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={teacher.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`}
                      alt={teacher.name}
                      className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary-50 truncate group-hover:text-primary-50/80 transition-colors">
                        {teacher.name}
                      </h3>
                      <p className="text-primary-50/60 text-sm font-medium truncate mb-1">
                        {teacher.specialization || "Instructor"}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-primary-50">{teacher.rating || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-primary-50/70 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-primary-50/40" />
                      <span className="truncate">{teacher.office || "No office assigned"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-primary-50/40" />
                      <span className="truncate">Next: {teacher.nextClass || "No upcoming class"}</span>
                    </div>
                    {teacher.yearsOfExperience && (
                      <div className="flex items-center gap-3">
                        <Award size={16} className="text-primary-50/40" />
                        <span>{teacher.yearsOfExperience} years experience</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-primary-50 flex items-center justify-end gap-1">
                    View Details <ChevronLeft size={14} className="rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
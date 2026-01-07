import {
  AlertCircle,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Clock,
  Loader2,
  Users,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { useGetClassesQuery } from "../../app/api/classes";
import {
  useEnrollInCourseMutation,
  useGetAvailableCoursesQuery,
  useGetEnrolledCoursesQuery
} from "../../app/api/courses";
import { useGetDepartmentsQuery } from "../../app/api/departments";
import CourseAssignmentsTab from "../../components/student/CourseAssignmentsTab";
import CourseCertificateTab from "../../components/student/CourseCertificateTab";
import CourseContentTab from "../../components/student/CourseContentTab";
import CourseDiscussionsTab from "../../components/student/CourseDiscussionsTab";
import CourseQuizzesTab from "../../components/student/CourseQuizzesTab";
import type { Class } from "../../types/class";
import type { Course, Enrollment } from "../../types/course";

interface EnrollableCourse extends Omit<Course, "status"> {
  className: string;
  classId: string;
  instructorName: string;
  image: string;
  status: string;
  progress: number;
}

interface UIClassItem extends Class {
  instructorName: string;
  studentsCount: number;
  courses: Partial<Course>[];
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [filter, setFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<EnrollableCourse | null>(null);
  const [selectedClass, setSelectedClass] = useState<UIClassItem | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
 const [courseToEnroll, setCourseToEnroll] = useState<EnrollableCourse | null>(
   null
 );
  const [courseTab, setCourseTab] = useState("content");




  // API Queries
  const { data: enrolledData, isLoading: enrolledLoading, error: enrolledError } = useGetEnrolledCoursesQuery();
  const { data: availableData, isLoading: availableLoading, error: availableError } = useGetAvailableCoursesQuery();
  const { data: classesData, isLoading: classesLoading, error: classesError } = useGetClassesQuery();
  const { data: departmentsData } = useGetDepartmentsQuery();

  const [enrollInCourse, { isLoading: enrolling }] = useEnrollInCourseMutation();

  // Data Transformation for Courses Tab
  const processedCourses = useMemo(() => {
    if (!enrolledData?.data || !availableData?.data || !classesData?.data) return [];

    const enrolledCourses = (enrolledData.data || []).map((enrollment: Enrollment) => ({
      ...enrollment.course,
      status: enrollment.status,
      progress: enrollment.progress,
      className: classesData.data!.find((c: Class) => c.id === enrollment.course?.classCohortId)?.name || "Unknown Class",
      classId: enrollment.course?.classCohortId || "",
      instructorName: enrollment.course?.instructor?.name || "Multiple Instructors",
      image: enrollment.course?.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop"
    })) as EnrollableCourse[];

    const availableCourses = availableData.data!
      .filter((course: Course) => !(enrolledData.data || []).some((e: Enrollment) => e.courseId === course.id))
      .map((course: Course) => ({
        ...course,
        status: "not_enrolled",
        progress: 0,
        className: classesData.data!.find((c: Class) => c.id === course.classCohortId)?.name || "Unknown Class",
        classId: course.classCohortId || "",
        instructorName: course.instructor?.name || "TBA",
        image: course.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop"
      })) as EnrollableCourse[];

    return [...enrolledCourses, ...availableCourses];
  }, [enrolledData, availableData, classesData]);

  // Data Transformation for Classes Tab
  const processedClasses = useMemo(() => {
    if (!classesData?.data) return [];

    return classesData.data.map((cls: Class) => ({
      ...cls,
      instructorName: "Lead Instructor",
      studentsCount: 120,
      courses: (enrolledData?.data || []).map(e => e.course!).filter((c: Course) => c && c.classCohortId === cls.id)
    })) as UIClassItem[];
  }, [classesData, enrolledData]);

  const getFilteredCourses = () => {
    return processedCourses.filter((course) => {
      if (filter === "all") return course.status !== "not_enrolled";
      if (filter === "ongoing") return course.status === "enrolled";
      if (filter === "completed") return course.status === "completed";
      if (filter === "catalog") return course.status === "not_enrolled";
      return true;
    });
  };

  const handleCourseClick = (course: EnrollableCourse) => {
    if (course.status === "not_enrolled") {
      setCourseToEnroll(course);
      setShowEnrollModal(true);
    } else {
      setSelectedCourse(course);
    }
  };

  const handleEnroll = async () => {
    if (!courseToEnroll) return;
    try {
      await enrollInCourse(courseToEnroll.id).unwrap();
      setShowEnrollModal(false);
      setCourseToEnroll(null);
    } catch (err) {
      console.error("Failed to enroll:", err);
    }
  };

  const isLoading = enrolledLoading || availableLoading || classesLoading;
  const hasError = enrolledError || availableError || classesError;

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
                <BookOpen className="w-8 h-8 text-primary-50 relative z-10 animate-bounce" />
              </div>
  
              {/* Orbiting Particles */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-50 rounded-full shadow-[0_0_12px_rgba(30,41,59,0.4)]" />
              </div>
            </div>
  
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-3xl font-extrabold text-primary-50 tracking-tight leading-tight">
                Loading Courses
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
                We&apos;re preparing your available Courses list wait a moment please.
              </p>
            </div>
          </div>
        </div>
      );
    }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-primary-50 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load your courses. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }






  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Courses</span>
          </button>

          {/* Course Header */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-primary-50 mb-2">
                    {selectedCourse.title}
                  </h1>
                  <p className="text-primary-50">
                    Part of: {selectedCourse.className}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Instructor: {selectedCourse.instructorName}
                  </p>
                </div>
                {selectedCourse.status === "completed" && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✓ Completed
                  </span>
                )}
              </div>

              {selectedCourse.progress > 0 && selectedCourse.progress < 100 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-primary-50">Progress</span>
                    <span className="font-semibold text-primary-50">
                      {selectedCourse.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-50 h-3 rounded-full transition-all"
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex items-center gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
                <button
                  onClick={() => setCourseTab("content")}
                  className={`pb-3 px-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                    courseTab === "content"
                      ? "text-primary-50"
                      : "text-primary-50/40 hover:text-primary-100"
                  }`}
                >
                  Content
                  {courseTab === "content" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
                  )}
                </button>
                <button
                  onClick={() => setCourseTab("assignments")}
                  className={`pb-3 px-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                    courseTab === "assignments"
                      ? "text-primary-50"
                      : "text-primary-50/40 hover:text-primary-100"
                  }`}
                >
                  Assignments
                  {courseTab === "assignments" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
                  )}
                </button>
                <button
                  onClick={() => setCourseTab("quizzes")}
                  className={`pb-3 px-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                    courseTab === "quizzes"
                      ? "text-primary-50"
                      : "text-primary-50/40 hover:text-primary-100"
                  }`}
                >
                  Quizzes
                  {courseTab === "quizzes" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
                  )}
                </button>
                <button
                  onClick={() => setCourseTab("discussions")}
                  className={`pb-3 px-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                    courseTab === "discussions"
                      ? "text-primary-50"
                      : "text-primary-50/40 hover:text-primary-100"
                  }`}
                >
                  Discussions
                  {courseTab === "discussions" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
                  )}
                </button>
                <button
                  onClick={() => setCourseTab("certificate")}
                  className={`pb-3 px-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                    courseTab === "certificate"
                      ? "text-primary-50"
                      : "text-primary-50/40 hover:text-primary-100"
                  }`}
                >
                  Certificate
                  {courseTab === "certificate" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {courseTab === "content" && <CourseContentTab courseId={selectedCourse.id} />}
            {courseTab === "assignments" && (
              <CourseAssignmentsTab courseId={selectedCourse.id} assignments={[]} />
            )}
            {courseTab === "quizzes" && (
              <CourseQuizzesTab courseId={selectedCourse.id} quizzes={[]} />
            )}
            {courseTab === "discussions" && (
              <CourseDiscussionsTab courseId={selectedCourse.id} />
            )}
            {courseTab === "certificate" && (
              <CourseCertificateTab
                courseId={selectedCourse.id}
                courseName={selectedCourse.title}
                isCompleted={selectedCourse.status === "completed"}
                progress={selectedCourse.progress}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedClass) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <button
            onClick={() => setSelectedClass(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Classes</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={selectedClass.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop"}
              alt={selectedClass.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-primary-50">
                  {selectedClass.name}
                </h1>
                {selectedClass.status === "retaking" && (
                  <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                    🔄 Retaking Class
                  </span>
                )}
                {selectedClass.status === "suspended" && (
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    ⏸️ Suspended
                  </span>
                )}
                {selectedClass.status === "completed" && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✓ Completed
                  </span>
                )}
                {selectedClass.status === "ongoing" && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    ▶️ Ongoing
                  </span>
                )}
                {selectedClass.status === "current" && (
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    📚 Current Class
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span className="text-sm">
                    {selectedClass.studentsCount} students
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span className="text-sm">Starts: {new Date(selectedClass.startDate || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span className="text-sm">{selectedClass.duration}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-primary-50 mb-4">
                  Courses in this Class
                </h2>
                  {selectedClass.courses.length > 0 ? (
                    <div className="space-y-3">
                      {selectedClass.courses.map((course) => (
                        <div
                          key={course?.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-primary-50 transition-all cursor-pointer"
                          onClick={() => {
                            const fullCourse = processedCourses.find(pc => pc.id === course?.id);
                            if (fullCourse) handleCourseClick(fullCourse);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-primary-50 mb-1">
                                {course?.title}
                              </h3>
                              <p className="text-xs text-gray-500">ID: {course?.code}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No enrolled courses in this class cohort yet.</p>
                  )}
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
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-primary-50">
            My Courses
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === "courses"
                ? "text-primary-50"
                : "text-primary-50/40 hover:text-primary-100"
            }`}
          >
            Courses
            {activeTab === "courses" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === "classes"
                ? "text-primary-50"
                : "text-primary-50/40 hover:text-primary-100"
            }`}
          >
            Classes
            {activeTab === "classes" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-50" />
            )}
          </button>
        </div>

        {activeTab === "courses" ? (
          <>
            <div className="flex items-start sm:items-center flex-wrap gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    filter === "all"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-primary-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("ongoing")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    filter === "ongoing"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-primary-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Ongoing
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    filter === "completed"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-primary-50 border border-gray-200 hover:border-primary-100"
                  }`}
                >
                  Completed
                </button>
                <button
                   onClick={() => setFilter("catalog")}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    filter === "catalog"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-primary-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                   Explore Catalog
                   <span className="bg-primary-50/10 text-primary-50 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {processedCourses.filter(c => c.status === "not_enrolled").length}
                  </span>
                </button>
              </div>
              <div className="sm:ml-auto flex items-center gap-2 text-sm text-primary-50 whitespace-nowrap">
                <span>Sort: Last Active</span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {getFilteredCourses().map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    {course.status === "retaking" && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-orange-400 text-orange-900">
                        🔄
                      </div>
                    )}
                    {course.progress > 0 && course.progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-1">
                        <div
                          className="bg-primary-50 h-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary-50 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                      {course.title}
                    </h3>
                    <p className="text-xs text-primary-50/40 mb-3">
                      Class: {course.className}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-primary-10/10 flex items-center justify-center text-[10px] text-primary-50 font-bold border border-primary-50/20">
                        {course.instructorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-primary-50">
                        {course.instructorName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start sm:items-center flex-wrap gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setClassFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    classFilter === "all"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-primary-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  All Classes
                </button>
                {departmentsData?.data?.map(dept => (
                   <button
                    key={dept.id}
                    onClick={() => setClassFilter(dept.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      classFilter === dept.id
                        ? "bg-primary-50 text-white"
                        : "bg-white text-primary-50 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {processedClasses.filter(c => classFilter === "all" || c.departmentId === classFilter).map((classItem) => (
                <div
                  key={classItem.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedClass(classItem)}
                >
                  <div className="relative">
                    <img
                      src={classItem.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop"}
                      alt={classItem.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-white shadow-lg capitalize">
                      {classItem.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary-50 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                      {classItem.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">
                        🎓
                      </div>
                      <span className="text-xs text-gray-600">
                        {classItem.instructorName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{classItem.studentsCount} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{classItem.courses.length} courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showEnrollModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary-50">
                Enroll in Course
              </h2>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-primary-50/40 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-primary-50 mb-4">
              Would you like to enroll in{" "}
              <strong>{courseToEnroll?.title}</strong>?
            </p>
            <p className="text-sm text-primary-50 mb-6">
              This course is part of the{" "}
              <strong>{courseToEnroll?.className}</strong> class.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEnrollModal(false)}
                className="flex-1 py-2 border border-gray-300 text-primary-50 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="flex-1 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {enrolling && <Loader2 className="w-4 h-4 animate-spin" />}
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

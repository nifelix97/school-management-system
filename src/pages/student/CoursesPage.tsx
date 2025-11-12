import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  X,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  status: string;
  progress: number;
}

interface ClassItem {
  id: number;
  name: string;
  instructor: string;
  students: number;
  startDate: string;
  schedule: string;
  duration: string;
  image: string;
  badge?: string;
  status: "current" | "retaking" | "suspended" | "ongoing" | "completed";
  courses: Course[];
}

interface CalendarEvent {
  classId: number;
  title: string;
  time: string;
  color: string;
}

interface EnrollableCourse extends Course {
  className: string;
  classId: number;
  instructor: string;
  image: string;
}

interface EnrollableClass {
  id: number;
  name: string;
  instructor: string;
  students: number;
  startDate: string;
  schedule: string;
  duration: string;
  image: string;
  badge?: string;
  courses: EnrollableCourse[];
}

interface DateObject {
  getFullYear(): number;
  getMonth(): number;
  getDate(): number;
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [filter, setFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 10));
  const [selectedCourse, setSelectedCourse] = useState<EnrollableCourse | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
 const [courseToEnroll, setCourseToEnroll] = useState<EnrollableCourse | null>(
   null
 );



  const classes = [
    {
      id: 1,
      name: "Web Development Bootcamp 2025",
      instructor: "Herman Wong",
      students: 8216,
      startDate: "Sep 18",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      duration: "12 weeks",
      status: "current" as const,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop",
      courses: [
        {
          id: 1,
          title: "HTML & CSS Fundamentals",
          status: "completed",
          progress: 100,
        },
        { id: 2, title: "JavaScript Basics", status: "ongoing", progress: 45 },
        { id: 3, title: "React Framework", status: "waiting", progress: 0 },
        {
          id: 4,
          title: "Backend with Node.js",
          status: "waiting",
          progress: 0,
        },
      ],
    },
    {
      id: 2,
      name: "UX/UI Design Masterclass",
      instructor: "Herman Wong",
      students: 10180,
      startDate: "Dec 15",
      schedule: "Tue, Thu - 2:00 PM",
      duration: "8 weeks",
      status: "ongoing" as const,
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop",
      courses: [
        {
          id: 5,
          title: "Design Thinking Principles",
          status: "ongoing",
          progress: 78,
        },
        { id: 6, title: "Figma Mastery", status: "ongoing", progress: 60 },
        {
          id: 7,
          title: "User Research Methods",
          status: "waiting",
          progress: 0,
        },
      ],
    },
    {
      id: 3,
      name: "Mobile App Development",
      instructor: "Herman Wong",
      students: 10192,
      startDate: "Jan 10",
      schedule: "Mon, Wed - 3:00 PM",
      duration: "10 weeks",
      status: "current" as const,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      badge: "popular",
      courses: [
        {
          id: 8,
          title: "iOS Development Swift",
          status: "not_enrolled",
          progress: 0,
        },
        {
          id: 9,
          title: "Android Development Kotlin",
          status: "not_enrolled",
          progress: 0,
        },
      ],
    },
    {
      id: 4,
      name: "Data Science Fundamentals (Retaking)",
      instructor: "Herman Wong",
      students: 9321,
      startDate: "Sep 30",
      schedule: "Tue, Thu - 11:00 AM",
      duration: "14 weeks",
      status: "retaking" as const,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
      courses: [
        {
          id: 10,
          title: "Python for Data Science",
          status: "completed",
          progress: 100,
        },
        {
          id: 11,
          title: "Statistics & Probability",
          status: "completed",
          progress: 100,
        },
        {
          id: 12,
          title: "Machine Learning Basics",
          status: "retaking",
          progress: 35,
        },
      ],
    },
    {
      id: 5,
      name: "Advanced Physics (Suspended)",
      instructor: "Dr. Johnson",
      students: 5432,
      startDate: "Aug 15",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      duration: "16 weeks",
      status: "suspended" as const,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      courses: [
        {
          id: 13,
          title: "Quantum Mechanics",
          status: "ongoing",
          progress: 25,
        },
        {
          id: 14,
          title: "Thermodynamics",
          status: "waiting",
          progress: 0,
        },
      ],
    },
    {
      id: 6,
      name: "Computer Science Fundamentals (Completed)",
      instructor: "Prof. Smith",
      students: 12000,
      startDate: "Feb 1",
      schedule: "Tue, Thu - 1:00 PM",
      duration: "12 weeks",
      status: "completed" as const,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      courses: [
        {
          id: 15,
          title: "Programming Basics",
          status: "completed",
          progress: 100,
        },
        {
          id: 16,
          title: "Data Structures",
          status: "completed",
          progress: 100,
        },
      ],
    },
  ];

  const allCourses = classes.flatMap((classItem) =>
    classItem.courses.map((course) => ({
      ...course,
      className: classItem.name,
      classId: classItem.id,
      instructor: classItem.instructor,
      image: classItem.image,
    }))
  );

  const getFilteredCourses = () => {
    return allCourses.filter((course) => {
      if (filter === "all") return course.status !== "not_enrolled";
      if (filter === "ongoing")
        return course.status === "ongoing" || course.status === "retaking";
      if (filter === "completed") return course.status === "completed";
      if (filter === "waiting") return course.status === "waiting";
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

 const handleEnroll = () => {
   // Simulate enrollment
   const classItem = classes.find((c) => c.id === courseToEnroll?.classId);
   const courseIndex = classItem?.courses.findIndex(
     (c) => c.id === courseToEnroll?.id
   );
   if (
     courseIndex !== undefined &&
     classItem &&
     classItem.courses[courseIndex]
   ) {
     classItem.courses[courseIndex].status = "waiting";
     setShowEnrollModal(false);
     setCourseToEnroll((prevCourseToEnroll) => {
       if (prevCourseToEnroll && prevCourseToEnroll.id === courseToEnroll?.id) {
         return courseToEnroll;
       }
       return null;
     });
     const enrolledCourse = {
       ...classItem.courses[courseIndex],
       className: classItem.name,
       classId: classItem.id,
       instructor: classItem.instructor,
       image: classItem.image,
     };
     setSelectedCourse(enrolledCourse);
   }
 };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarEvents: Record<number, CalendarEvent[]> = {
    8: [
      {
        classId: 1,
        title: "Web Dev Bootcamp",
        time: "10:00 AM",
        color: "bg-blue-100 text-blue-700",
      },
    ],
    11: [
      {
        classId: 2,
        title: "UX/UI Masterclass",
        time: "2:00 PM",
        color: "bg-purple-100 text-purple-700",
      },
    ],
    13: [
      {
        classId: 1,
        title: "Web Dev Bootcamp",
        time: "10:00 AM",
        color: "bg-blue-100 text-blue-700",
      },
    ],
    15: [
      {
        classId: 2,
        title: "UX/UI Masterclass",
        time: "2:00 PM",
        color: "bg-purple-100 text-purple-700",
      },
    ],
    18: [
      {
        classId: 1,
        title: "Web Dev Bootcamp",
        time: "10:00 AM",
        color: "bg-blue-100 text-blue-700",
      },
    ],
    20: [
      {
        classId: 1,
        title: "Web Dev Bootcamp",
        time: "10:00 AM",
        color: "bg-blue-100 text-blue-700",
      },
    ],
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 10;
      const hasEvent = calendarEvents[day];

      days.push(
        <div
          key={day}
          className={`aspect-square border border-gray-200 p-2 transition-all hover:bg-gray-50 cursor-pointer ${
            isToday ? "bg-primary-50 bg-opacity-10 border-primary-50" : ""
          }`}
          onClick={() => {
            if (hasEvent) {
              const foundClass = classes.find((c) => c.id === hasEvent[0].classId);
              setSelectedClass(foundClass || null);
            }
          }}
        >
          <div
            className={`text-sm font-semibold mb-1 ${
              isToday ? "text-primary-50" : "text-gray-700"
            }`}
          >
            {day}
          </div>
          {hasEvent &&
            hasEvent.map((event: CalendarEvent, idx: number) => (
              <div
                key={idx}
                className={`text-xs p-1 rounded mb-1 ${event.color} truncate`}
              >
                <div className="font-medium">{event.time}</div>
              </div>
            ))}
        </div>
      );
    }

    return days;
  };

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

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedCourse.title}
                  </h1>
                  <p className="text-gray-600">
                    Part of: {selectedCourse.className}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Instructor: {selectedCourse.instructor}
                  </p>
                </div>
                {selectedCourse.status === "retaking" && (
                  <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                    🔄 Retaking
                  </span>
                )}
                {selectedCourse.status === "completed" && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✓ Completed
                  </span>
                )}
              </div>

              {selectedCourse.progress > 0 && selectedCourse.progress < 100 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                  <div className="font-semibold text-gray-900">24 Modules</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">⏱️</div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold text-gray-900">8 Hours</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm text-gray-600">Level</div>
                  <div className="font-semibold text-gray-900">
                    Intermediate
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                {selectedCourse.status === "completed"
                  ? "Review Course"
                  : selectedCourse.status === "retaking"
                  ? "Continue Retaking"
                  : "Continue Learning"}
              </button>
            </div>
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
              src={selectedClass.image}
              alt={selectedClass.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
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
                    {selectedClass.students.toLocaleString()} students
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span className="text-sm">{selectedClass.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span className="text-sm">{selectedClass.duration}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Courses in this Class
                </h2>
                <div className="space-y-3">
                  {selectedClass.courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-50 transition-all cursor-pointer"
                      onClick={() =>
                        handleCourseClick({
                          ...course,
                          className: selectedClass.name,
                          classId: selectedClass.id,
                          instructor: selectedClass.instructor,
                          image: selectedClass.image,
                        })
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          {course.status === "retaking" && (
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                              🔄 Retaking Course
                            </span>
                          )}
                          {course.status === "completed" && (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              ✓ Completed
                            </span>
                          )}
                          {course.status === "ongoing" && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary-50 h-2 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 mt-1">
                                {course.progress}% complete
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Courses
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === "courses"
                ? "text-primary-50"
                : "text-gray-500 hover:text-gray-700"
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
                : "text-gray-500 hover:text-gray-700"
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
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("ongoing")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    filter === "ongoing"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
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
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter("waiting")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    filter === "waiting"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Waiting Enrollment
                </button>
              </div>
              <div className="sm:ml-auto flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
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
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Class: {course.className}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        👤
                      </div>
                      <span className="text-xs text-gray-600">
                        {course.instructor}
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
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  All Classes
                </button>
                <button
                  onClick={() => setClassFilter("current")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    classFilter === "current"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Current Classes
                </button>
                <button
                  onClick={() => setClassFilter("retaking")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    classFilter === "retaking"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Retaking
                </button>
                <button
                  onClick={() => setClassFilter("suspended")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    classFilter === "suspended"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Suspended
                </button>
                <button
                  onClick={() => setClassFilter("ongoing")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    classFilter === "ongoing"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Ongoing
                </button>
                <button
                  onClick={() => setClassFilter("completed")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    classFilter === "completed"
                      ? "bg-primary-50 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {classes.filter(classItem => classFilter === "all" || classItem.status === classFilter).map((classItem) => (
                <div
                  key={classItem.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedClass(classItem)}
                >
                  <div className="relative">
                    <img
                      src={classItem.image}
                      alt={classItem.name}
                      className="w-full h-40 object-cover"
                    />
                    {classItem.badge && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900">
                        🔥
                      </div>
                    )}
                    {classItem.status === "retaking" && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-orange-400 text-orange-900">
                        🔄 Retaking
                      </div>
                    )}
                    {classItem.status === "suspended" && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-red-400 text-red-900">
                        ⏸️ Suspended
                      </div>
                    )}
                    {classItem.status === "completed" && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-400 text-green-900">
                        ✓ Completed
                      </div>
                    )}
                    {classItem.status === "ongoing" && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-400 text-blue-900">
                        ▶️ Ongoing
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                      {classItem.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        👤
                      </div>
                      <span className="text-xs text-gray-600">
                        {classItem.instructor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{classItem.students.toLocaleString()}</span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Enroll in Course
              </h2>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Would you like to enroll in{" "}
              <strong>{courseToEnroll?.title}</strong>?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This course is part of the{" "}
              <strong>{courseToEnroll?.className}</strong> class.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEnrollModal(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                className="flex-1 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

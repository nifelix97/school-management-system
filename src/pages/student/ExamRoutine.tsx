import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Calendar,
  BookOpen,
  X,
} from "lucide-react";

interface ExamSession {
  id: number;
  subject: string;
  examiner: string;
  room: string;
  time: string;
  duration: string;
  type: "midterm" | "final" | "quiz" | "practical";
  color: string;
}

export default function ExamRoutine() {
  const [currentMonth, setCurrentMonth] = useState(11);
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const examSchedule: Record<string, ExamSession[]> = {
    "2024-12-02": [
      {
        id: 1,
        subject: "Mathematics",
        examiner: "Dr. Smith",
        room: "Hall A",
        time: "9:00 AM",
        duration: "3h",
        type: "final",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-03": [
      {
        id: 2,
        subject: "Physics",
        examiner: "Prof. Johnson",
        room: "Hall B",
        time: "10:00 AM",
        duration: "2h",
        type: "final",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-04": [
      {
        id: 3,
        subject: "Chemistry",
        examiner: "Dr. Wilson",
        room: "Lab 301",
        time: "9:00 AM",
        duration: "2h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-05": [
      {
        id: 4,
        subject: "English",
        examiner: "Ms. Davis",
        room: "Hall C",
        time: "2:00 PM",
        duration: "2h",
        type: "final",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-06": [
      {
        id: 5,
        subject: "Biology",
        examiner: "Dr. Garcia",
        room: "Lab 501",
        time: "11:00 AM",
        duration: "3h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-09": [
      {
        id: 6,
        subject: "History",
        examiner: "Mr. Brown",
        room: "Hall A",
        time: "1:00 PM",
        duration: "2h",
        type: "final",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-10": [
      {
        id: 7,
        subject: "Computer Science",
        examiner: "Ms. Taylor",
        room: "Lab 401",
        time: "9:00 AM",
        duration: "3h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-11": [
      {
        id: 8,
        subject: "Geography",
        examiner: "Mr. Anderson",
        room: "Hall B",
        time: "3:00 PM",
        duration: "2h",
        type: "final",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-12": [
      {
        id: 9,
        subject: "Art",
        examiner: "Ms. Lee",
        room: "Studio 1",
        time: "10:00 AM",
        duration: "4h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-12-13": [
      {
        id: 10,
        subject: "Music",
        examiner: "Mr. Clark",
        room: "Music Room",
        time: "2:00 PM",
        duration: "2h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-09-15": [
      {
        id: 11,
        subject: "Mathematics",
        examiner: "Dr. Smith",
        room: "Hall A",
        time: "9:00 AM",
        duration: "3h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-09-18": [
      {
        id: 12,
        subject: "Physics",
        examiner: "Prof. Johnson",
        room: "Hall B",
        time: "10:00 AM",
        duration: "2h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-09-20": [
      {
        id: 13,
        subject: "Chemistry",
        examiner: "Dr. Wilson",
        room: "Lab 301",
        time: "9:00 AM",
        duration: "2h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-10-05": [
      {
        id: 14,
        subject: "English",
        examiner: "Ms. Davis",
        room: "Hall C",
        time: "9:00 AM",
        duration: "2h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-10-12": [
      {
        id: 15,
        subject: "Biology",
        examiner: "Dr. Garcia",
        room: "Lab 501",
        time: "10:00 AM",
        duration: "3h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-10-25": [
      {
        id: 16,
        subject: "History",
        examiner: "Mr. Brown",
        room: "Hall A",
        time: "2:00 PM",
        duration: "2h",
        type: "quiz",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-11-08": [
      {
        id: 17,
        subject: "Computer Science",
        examiner: "Ms. Taylor",
        room: "Lab 401",
        time: "9:00 AM",
        duration: "3h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2024-11-22": [
      {
        id: 18,
        subject: "Geography",
        examiner: "Mr. Anderson",
        room: "Hall B",
        time: "1:00 PM",
        duration: "2h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-01-15": [
      {
        id: 19,
        subject: "History",
        examiner: "Mr. Brown",
        room: "Hall C",
        time: "10:00 AM",
        duration: "2h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-01-20": [
      {
        id: 20,
        subject: "Computer Science",
        examiner: "Ms. Taylor",
        room: "Lab 401",
        time: "9:00 AM",
        duration: "2h",
        type: "quiz",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-03-10": [
      {
        id: 21,
        subject: "Mathematics",
        examiner: "Dr. Smith",
        room: "Hall A",
        time: "9:00 AM",
        duration: "2h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-03-15": [
      {
        id: 22,
        subject: "Physics",
        examiner: "Prof. Johnson",
        room: "Hall B",
        time: "10:00 AM",
        duration: "2h",
        type: "midterm",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-05-05": [
      {
        id: 23,
        subject: "Geography",
        examiner: "Mr. Anderson",
        room: "Hall A",
        time: "9:00 AM",
        duration: "3h",
        type: "final",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-05-08": [
      {
        id: 24,
        subject: "Art",
        examiner: "Ms. Lee",
        room: "Studio 1",
        time: "2:00 PM",
        duration: "4h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
    "2025-05-12": [
      {
        id: 25,
        subject: "Music",
        examiner: "Mr. Clark",
        room: "Music Room",
        time: "1:00 PM",
        duration: "2h",
        type: "practical",
        color: "bg-blue-100 border-l-4 border-primary-50 text-white",
      },
    ],
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getExamForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return examSchedule[dateKey] || [];
  };

  const getExamTypeIcon = (type: string) => {
    switch (type) {
      case "final":
        return "🎓";
      case "midterm":
        return "📝";
      case "quiz":
        return "❓";
      case "practical":
        return "🔬";
      default:
        return "📋";
    }
  };

  const getExamTypeBadge = (type: string) => {
    const badges = {
      final: "bg-primary-50 white",
      midterm: "bg-blue-100 text-blue-700",
      quiz: "bg-yellow-100 text-yellow-700",
      practical: "bg-green-100 text-green-700",
    };
    return badges[type as keyof typeof badges] || "bg-gray-100 text-gray-700";
  };

  const calculateEndTime = (startTime: string, duration: string) => {
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const durationHours = parseInt(duration.replace('h', ''));
    
    let totalHours = hours;
    if (period === 'PM' && hours !== 12) totalHours += 12;
    if (period === 'AM' && hours === 12) totalHours = 0;
    
    totalHours += durationHours;
    
    const endHours = totalHours % 24;
    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
    const displayHours = endHours === 0 ? 12 : endHours > 12 ? endHours - 12 : endHours;
    
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${endPeriod}`;
  };

  const handleDateClick = (date: Date, exams: ExamSession[]) => {
    if (exams.length > 0) {
      setSelectedDate(date);
      setShowModal(true);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const exams = getExamForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const hasExams = exams.length > 0;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date, exams)}
          className={`aspect-square border border-primary-50/20 p-0.5 xs:p-1 sm:p-2 transition-all ${
            hasExams ? "cursor-pointer hover:shadow-lg hover:scale-105" : ""
          } ${
            isToday ? "border-2" : ""
          } ${hasExams ? "bg-gradient-to-br from-white to-blue-50" : ""}`}
          style={{
            backgroundColor: isToday ? 'var(--color-primary-100)' : undefined,
            borderColor: isToday ? 'var(--color-primary-50)' : undefined
          }}
        >
          <div
            className={`text-xs sm:text-sm font-semibold mb-1`}
            style={{
              color: isToday ? 'var(--color-primary-50)' : '#374151'
            }}
          >
            {day}
          </div>
          {exams.length > 0 && (
            <div className="space-y-0.5">
              {exams.slice(0, 2).map((exam, idx) => (
                <div
                  key={idx}
                  className={`text-[10px] sm:text-xs p-0.5 sm:p-1 rounded ${exam.color
                    .replace("border-l-4", "")
                    .replace("border-", "bg-")} truncate`}
                >
                  <div className="font-medium flex items-center gap-0.5">
                    <span className="text-xs">
                      {getExamTypeIcon(exam.type)}
                    </span>
                    <span className="truncate">{exam.subject}</span>
                  </div>
                </div>
              ))}
              {exams.length > 2 && (
                <div className="text-[10px] text-blue-600 font-semibold text-center">
                  +{exams.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedExams = selectedDate ? getExamForDate(selectedDate) : [];

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-3 xs:mb-4 transition-colors"
          style={{color: 'var(--color-primary-50)'}}
        >
          <ChevronLeft size={16} className="xs:w-5 xs:h-5" />
          <span className="text-xs xs:text-sm sm:text-base font-medium">Back</span>
        </button>

        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary-50">
            📚 Exam Calendar
          </h1>
          <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-1.5 xs:gap-2 text-xs sm:text-sm shadow-sm">
            <Calendar size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" style={{color: 'var(--color-primary-50)'}} />
            <span className="font-medium text-primary-50">
              <span className="hidden xs:inline">Academic Year 2024-25</span>
              <span className="xs:hidden">2024-25</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center mb-3 xs:mb-4 sm:mb-6 bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-6">
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={16} className="xs:w-5 xs:h-5 text-primary-50" />
            </button>
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-primary-50 min-w-[140px] xs:min-w-[180px] sm:min-w-[200px] text-center">
              <span className="hidden xs:inline">{monthNames[currentMonth]} {currentYear}</span>
              <span className="xs:hidden">{monthNames[currentMonth].slice(0, 3)} {currentYear}</span>
            </h2>
            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={16} className="xs:w-5 xs:h-5 text-primary-50" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-3 xs:mb-4 sm:mb-6">
          <div className="grid grid-cols-7 gap-0" style={{background: 'linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))'}}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-1.5 xs:p-2 sm:p-3 lg:p-4 text-center font-bold text-white text-xs sm:text-sm"
              >
                <span className="hidden xs:inline">{day}</span>
                <span className="xs:hidden">{day[0]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
        </div>
{/* 
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg p-3 xs:p-4 sm:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-5">
            <AlertCircle className="text-orange-500 xs:w-5 xs:h-5" size={16} />
            <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900">
              🔔 Upcoming Exams
            </h3>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className={`${exam.color} rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer`}
                onClick={() => handleDateClick(exam.date, [exam])}
              >
                <div className="flex items-start justify-between mb-2 xs:mb-3 gap-2">
                  <h4 className="font-bold text-gray-900 flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base">
                    <span className="text-base xs:text-lg sm:text-xl">
                      {getExamTypeIcon(exam.type)}
                    </span>
                    <span className="truncate">{exam.subject}</span>
                  </h4>
                  <span
                    className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[9px] xs:text-[10px] sm:text-xs font-bold ${getExamTypeBadge(
                      exam.type
                    )} whitespace-nowrap`}
                  >
                    {exam.type}
                  </span>
                </div>
                <div className="space-y-1 xs:space-y-2 text-[10px] xs:text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <Calendar
                      size={12}
                      className="xs:w-3.5 xs:h-3.5 flex-shrink-0"
                      style={{color: 'var(--color-primary-50)'}}
                    />
                    <span className="font-medium">
                      {exam.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <Clock size={12} className="xs:w-3.5 xs:h-3.5 text-green-600 flex-shrink-0" />
                    <span>
                      {exam.time} ({exam.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <MapPin size={12} className="xs:w-3.5 xs:h-3.5 text-red-600 flex-shrink-0" />
                    <span className="truncate">{exam.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg p-3 xs:p-4 sm:p-5 lg:p-6 border" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderColor: 'var(--color-primary-50)'}}>
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-primary-50 mb-3 xs:mb-4 sm:mb-5 flex items-center gap-1.5 xs:gap-2 sm:gap-3">
            <BookOpen size={16} className="xs:w-5 xs:h-5" style={{color: 'var(--color-primary-50)'}} />
            📖 Exam Types Guide
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
            {[
              {
                icon: "🎓",
                title: "Final Exams",
                desc: "End of semester",
                color: "from-primary-50 to-primary-50",
              },
              {
                icon: "📝",
                title: "Midterm Exams",
                desc: "Mid-semester",
                color: "from-primary-50 to-primary-50",
              },
              {
                icon: "❓",
                title: "Quizzes",
                desc: "Short assessments",
                color: "from-primary-50 to-primary-50",
              },
              {
                icon: "🔬",
                title: "Practical Exams",
                desc: "Lab & hands-on",
                color: "from-primary-50 to-primary-50",
              },
            ].map((type) => (
              <div
                key={type.title}
                className={`bg-gradient-to-br ${type.color} rounded-xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">{type.icon}</span>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm lg:text-base">
                      {type.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-100">
                      {type.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal/Popup */}
      {showModal && selectedDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-100/45 bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-50 p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50">
                      {selectedDate.getDate()}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 uppercase text-center">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                      {selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h2>
                    <p className="text-sm sm:text-base text-blue-100 mt-1">
                      {selectedExams.length}{" "}
                      {selectedExams.length === 1 ? "exam" : "exams"} scheduled
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-4 sm:space-y-6">
                {selectedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className={`${exam.color} rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl">
                          {getExamTypeIcon(exam.type)}
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
                            {exam.subject}
                          </h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getExamTypeBadge(
                              exam.type
                            )} mt-2`}
                          >
                            {exam.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div className="bg-white bg-opacity-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} style={{color: 'var(--color-primary-50)'}} />
                          <span className="text-xs sm:text-sm font-semibold text-primary-50">
                            Time
                          </span>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg font-bold text-primary-50">
                          {exam.time} - {calculateEndTime(exam.time, exam.duration)}
                        </p>
                        <p className="text-xs sm:text-sm text-primary-50">
                          Duration: {exam.duration}
                        </p>
                      </div>

                      <div className="bg-white bg-opacity-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={18} className="text-red-600" />
                          <span className="text-xs sm:text-sm font-semibold text-primary-50">
                            Location
                          </span>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg font-bold text-primary-50">
                          {exam.room}
                        </p>
                      </div>

                      <div className="bg-white bg-opacity-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User size={18} className="text-primary-50" />
                          <span className="text-xs sm:text-sm font-semibold text-primary-50">
                            Examiner
                          </span>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg font-bold text-primary-50">
                          {exam.examiner}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-6 py-3 bg-primary-50 hover:bg-primary-100 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

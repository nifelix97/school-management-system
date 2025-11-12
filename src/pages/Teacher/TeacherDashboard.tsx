import React, { useState } from "react";
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: React.ReactElement<LucideProps>;
  title: string;
  value: string | number;
  gradient: string;
  subtitle: string;
}

interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

interface LineChartData {
  month: string;
  attendance: number;
  performance: number;
}

interface LineChartProps {
  data: LineChartData[];
}

interface DonutChartProps {
  present: number;
  absent: number;
}

interface Subject {
  subject: string;
  students: number;
  color: string;
  bgColor: string;
}

interface BarChartProps {
  subjects: Subject[];
}

const TeacherDashboard = () => {
  const [teacherInfo] = useState({
    name: "Dr. Sarah Wilson",
    department: "Mathematics",
    teacherId: "TCH-2024-0892",
    avatar: "SW",
  });

  const [stats] = useState({
    totalStudents: 156,
    totalClasses: 8,
    todayClasses: 4,
    avgAttendance: 92,
  });

  // Monthly class data
  const classData = [
    { month: "Jul", attendance: 88, performance: 82 },
    { month: "Aug", attendance: 91, performance: 85 },
    { month: "Sep", attendance: 89, performance: 87 },
    { month: "Oct", attendance: 94, performance: 89 },
    { month: "Nov", attendance: 92, performance: 91 },
    { month: "Dec", attendance: 95, performance: 93 },
  ];

  // Subject classes
  const subjectClasses = [
    {
      subject: "Algebra",
      students: 32,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      subject: "Geometry",
      students: 28,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      subject: "Calculus",
      students: 24,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
    },
    {
      subject: "Statistics",
      students: 35,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      subject: "Trigonometry",
      students: 37,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        {/* Header with Teacher Info */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-50 to-primary-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl font-bold shadow-lg shrink-0">
              {teacherInfo.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary-50 mb-1 truncate">
                Welcome {teacherInfo.name}
              </h1>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base text-primary-50">
                <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap">
                  <BookOpen size={12} className="sm:w-4 sm:h-4 text-primary-50" />
                  {teacherInfo.department}
                </span>
                <span className="bg-gray-100 text-primary-50 px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                  ID: {teacherInfo.teacherId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          <StatCard
            icon={<Users />}
            title="Total Students"
            value={stats.totalStudents}
            gradient="from-white to-white"
            subtitle="Across all classes"
          />
          <StatCard
            icon={<BookOpen />}
            title="Total Classes"
            value={stats.totalClasses}
            gradient="from-white to-white"
            subtitle="This semester"
          />
          <StatCard
            icon={<Calendar />}
            title="Today's Classes"
            value={stats.todayClasses}
            gradient="from-white to-white"
            subtitle="Scheduled"
          />
          <StatCard
            icon={<TrendingUp />}
            title="Avg Attendance"
            value={`${stats.avgAttendance}%`}
            gradient="from-white to-white"
            subtitle="This month"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {/* Class Performance Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border border-gray-100">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-primary-50 mb-3 sm:mb-4 md:mb-6">
              Class Performance Trend
            </h2>
            <LineChartComponent data={classData} />
          </div>

          {/* Today's Attendance */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border border-gray-100">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-primary-50 mb-3 sm:mb-4 md:mb-6">
              Today's Attendance
            </h2>
            <DonutChart present={142} absent={14} />
          </div>
        </div>

        {/* Subject Classes Bar Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border border-gray-100">
          <h2 className="text-sm sm:text-lg md:text-xl font-bold text-primary-50 mb-3 sm:mb-4 md:mb-6">
            Students per Subject
          </h2>
          <BarChartComponent subjects={subjectClasses} />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  gradient,
  subtitle,
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl p-2.5 sm:p-4 md:p-5 lg:p-6 text-primary-50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20`}
    >
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <p className="text-[10px] sm:text-xs md:text-sm opacity-90 font-medium leading-tight">
          {title}
        </p>
        <div className="opacity-90 bg-gray-200 p-1 sm:p-1.5 md:p-2 rounded">
          {React.cloneElement(icon, {
            size: 12,
            className: "sm:w-4 sm:h-4 md:w-5 md:h-5",
          })}
        </div>
      </div>
      <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-0.5">
        {value}
      </p>
      <p className="text-[9px] sm:text-xs opacity-90 font-medium">{subtitle}</p>
    </div>
  );
};

const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
  const maxValue = 100;
  const svgWidth = 800;
  const svgHeight = 200;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 min-w-[280px]">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent rounded-lg"></div>

        <div className="absolute left-0 top-0 bottom-8 w-6 sm:w-8 flex flex-col justify-between text-[9px] sm:text-xs text-primary-50 font-medium">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        <div className="absolute left-7 sm:left-10 right-0 top-0 bottom-8 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full border-t border-gray-200/60"></div>
          ))}
        </div>

        <div className="absolute left-7 sm:left-10 right-0 top-0 bottom-8">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            <polygon
              fill="url(#attendanceGradient)"
              points={`0,100 ${data
                .map(
                  (d, i) =>
                    `${(i / (data.length - 1)) * 100},${
                      100 - (d.attendance / maxValue) * 100
                    }`
                )
                .join(" ")} 100,100`}
            />

            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data
                .map((d, i) => {
                  const x = (i / (data.length - 1)) * svgWidth;
                  const y = svgHeight - (d.attendance / maxValue) * svgHeight;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data
                .map((d, i) => {
                  const x = (i / (data.length - 1)) * svgWidth;
                  const y = svgHeight - (d.performance / maxValue) * svgHeight;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {data.map((d, i) => (
              <circle
                key={`attendance-${i}`}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${100 - (d.attendance / maxValue) * 100}%`}
                r="3"
                fill="white"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            ))}

            {data.map((d, i) => (
              <circle
                key={`performance-${i}`}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${100 - (d.performance / maxValue) * 100}%`}
                r="3"
                fill="white"
                stroke="#10b981"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="absolute left-7 sm:left-10 right-0 bottom-0 flex justify-between text-[9px] sm:text-xs text-primary-50 font-medium">
          {data.map((d, i) => (
            <span key={i} className="bg-white px-1 py-0.5 rounded text-center">
              {d.month}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
          <span className="text-[10px] sm:text-xs text-primary-50 font-medium">
            Attendance %
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          <span className="text-[10px] sm:text-xs text-primary-50 font-medium">
            Performance %
          </span>
        </div>
      </div>
    </div>
  );
};

const DonutChart: React.FC<DonutChartProps> = ({ present, absent }) => {
  const total = present + absent;
  const presentPercent = (present / total) * 100;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const presentDash = (presentPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-3 sm:mb-4 md:mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-red-200/20 rounded-full blur-lg"></div>

        <svg className="w-full h-full transform -rotate-90 relative" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="18"
          />

          <defs>
            <linearGradient id="presentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="absentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#presentGradient)"
            strokeWidth="18"
            strokeDasharray={`${presentDash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: "all 1s" }}
          />

          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#absentGradient)"
            strokeWidth="18"
            strokeDasharray={`${circumference - presentDash} ${circumference}`}
            strokeDashoffset={-presentDash}
            strokeLinecap="round"
            style={{ transition: "all 1s" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-50">
            {total}
          </span>
          <span className="text-[10px] sm:text-xs text-primary-50 font-medium">
            Students
          </span>
        </div>
      </div>

      <div className="space-y-2 w-full">
        <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-primary-50">
              Present
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
            {present}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 bg-red-50 rounded-lg border border-red-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600"></div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-primary-50">
              Absent
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-primary-50">
            {absent}
          </span>
        </div>
      </div>
    </div>
  );
};

const BarChartComponent: React.FC<BarChartProps> = ({ subjects }) => {
  const maxStudents = Math.max(...subjects.map(s => s.students));

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-end justify-between gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 h-48 sm:h-56 md:h-64 lg:h-72 px-1 min-w-[280px]">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-2 group min-w-0"
          >
            <div className="w-full flex flex-col items-center justify-end h-full relative">
              <div className="absolute -top-6 sm:-top-8 bg-primary-50 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs md:text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {subject.students} students
              </div>

              <div
                className={`w-full ${subject.bgColor} rounded-t-lg p-0.5 transition-all duration-500`}
                style={{ height: `${(subject.students / maxStudents) * 100}%` }}
              >
                <div
                  className={`w-full h-full bg-gradient-to-t ${subject.color} rounded-t-md shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>
                </div>
              </div>

              <div className="absolute -bottom-4 sm:-bottom-5 text-[10px] sm:text-xs md:text-sm font-bold text-primary-50">
                {subject.students}
              </div>
            </div>

            <div className="mt-5 sm:mt-6 md:mt-7 text-center w-full">
              <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-primary-50 bg-gray-100 px-1.5 sm:px-2 md:px-3 py-1 rounded-full inline-block truncate max-w-full">
                {subject.subject}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
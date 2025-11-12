import React, { useState } from "react";
import { BookOpen, Award, Calendar, TrendingUp } from "lucide-react";

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
  grade: number;
  attendance: number;
}

interface LineChartProps {
  data: LineChartData[];
}

interface DonutChartProps {
  completed: number;
  pending: number;
}

interface Subject {
  subject: string;
  score: number;
  color: string;
  bgColor: string;
}

interface BarChartProps {
  subjects: Subject[];
}

interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

const Dashboard = () => {
  // Personal student data
  const [studentInfo] = useState({
    name: "Alex Johnson",
    grade: "Grade 10",
    studentId: "STU-2024-1542",
    avatar: "AJ",
  });

  const [stats] = useState({
    attendance: 60,
    completedAssignments: 65,
    pendingAssignments: 3,
    overallGrade: 87,
  });

  // Monthly performance data
  const performanceData = [
    { month: "Jul", grade: 68, attendance: 62 },
    { month: "Aug", grade: 82, attendance: 95 },
    { month: "Sep", grade: 85, attendance: 93 },
    { month: "Oct", grade: 88, attendance: 96 },
    { month: "Nov", grade: 87, attendance: 94 },
    { month: "Dec", grade: 89, attendance: 97 },
  ];

  // Courses performance
  const subjectScores = [
    {
      subject: "Math",
      score: 70,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-primary-50",
    },
    {
      subject: "Science",
      score: 88,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      subject: "English",
      score: 85,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      subject: "History",
      score: 90,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
    },
    {
      subject: "Art",
      score: 95,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        {/* Header with Student Info */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-50 to-primary-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl font-bold shadow-lg shrink-0">
              {studentInfo.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary-50 mb-1 truncate">
               Hello {studentInfo.name}
              </h1>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base text-primary-50">
                <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap">
                  <BookOpen size={12} className="sm:w-4 sm:h-4 text-primary-50" />
                  {studentInfo.grade}
                </span>
                <span className="bg-gray-100 text-primary-50 px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                  ID: {studentInfo.studentId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          <StatCard
            icon={<TrendingUp />}
            title="Overall Grade"
            value={`${stats.overallGrade}%`}
            gradient="from-white to-white"
            subtitle="Excellent"
          />
          <StatCard
            icon={<Calendar />}
            title="Attendance"
            value={`${stats.attendance}%`}
            gradient="from-white to-white"
            subtitle="Above Average"
          />
          <StatCard
            icon={<Award />}
            title="Completed"
            value={stats.completedAssignments}
            gradient="from-white to-white"
            subtitle="Courses"
          />
          <StatCard
            icon={<BookOpen />}
            title="Pending"
            value={stats.pendingAssignments}
            gradient="from-white to-white"
            subtitle="Courses"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {/* Performance Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border border-gray-100">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-primary-50 mb-3 sm:mb-4 md:mb-6">
              Performance Trend
            </h2>
            <LineChartComponent data={performanceData} />
          </div>

          {/* Assignment Status */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border border-gray-100">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-primary-50 mb-3 sm:mb-4 md:mb-6">
              Exams
            </h2>
            <DonutChart
              completed={stats.completedAssignments}
              pending={stats.pendingAssignments}
            />
          </div>
        </div>

        {/* Subject Performance Bar Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border border-gray-100">
          <h2 className="text-sm sm:text-lg md:text-xl font-bold text-primary-50 mb-3 sm:mb-4 md:mb-6">
            Courses Performance
          </h2>
          <BarChartComponent subjects={subjectScores} />
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
  const svgWidth = 800; // Or container width
  const svgHeight = 200;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      {/* Chart Area */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 min-w-[280px]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent rounded-lg"></div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-6 sm:w-8 flex flex-col justify-between text-[9px] sm:text-xs text-primary-50 font-medium">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-7 sm:left-10 right-0 top-0 bottom-8 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full border-t border-gray-200/60"></div>
          ))}
        </div>

        {/* Chart content */}
        <div className="absolute left-7 sm:left-10 right-0 top-0 bottom-8">
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Gradients */}
            <defs>
              <linearGradient
                id="gradeGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grade area */}
            <polygon
              fill="url(#gradeGradient)"
              points={`0,100 ${data
                .map(
                  (d, i) =>
                    `${(i / (data.length - 1)) * 100},${
                      100 - (d.grade / maxValue) * 100
                    }`
                )
                .join(" ")} 100,100`}
            />

            {/* Grade line */}
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data
                .map((d, i) => {
                  const x = (i / (data.length - 1)) * svgWidth;
                  const y = svgHeight - (d.grade / maxValue) * svgHeight;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {/* Attendance line */}
            <polyline
              fill="none"
              stroke="#10b981"
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

            {/* Grade dots */}
            {data.map((d, i) => (
              <circle
                key={`grade-${i}`}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${100 - (d.grade / maxValue) * 100}%`}
                r="3"
                fill="white"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            ))}

            {/* Attendance dots */}
            {data.map((d, i) => (
              <circle
                key={`attendance-${i}`}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${100 - (d.attendance / maxValue) * 100}%`}
                r="3"
                fill="white"
                stroke="#10b981"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-7 sm:left-10 right-0 bottom-0 flex justify-between text-[9px] sm:text-xs text-primary-50 font-medium">
          {data.map((d, i) => (
            <span key={i} className="bg-white px-1 py-0.5 rounded text-center">
              {d.month}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
          <span className="text-[10px] sm:text-xs text-primary-50 font-medium">
            Grade %
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          <span className="text-[10px] sm:text-xs text-primary-50 font-medium">
            Attendance %
          </span>
        </div>
      </div>
    </div>
  );
};

const DonutChart: React.FC<DonutChartProps> = ({ completed, pending }) => {
  const total = completed + pending;
  const completedPercent = (completed / total) * 100;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const completedDash = (completedPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-3 sm:mb-4 md:mb-6">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-amber-200/20 rounded-full blur-lg"></div>

        <svg
          className="w-full h-full transform -rotate-90 relative"
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="18"
          />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="completedGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="primary-300" />
              <stop offset="50%" stopColor="#059669" />
            </linearGradient>
            <linearGradient
              id="pendingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="primary-100" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#completedGradient)"
            strokeWidth="18"
            strokeDasharray={`${completedDash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: "all 1s" }}
          />

          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#pendingGradient)"
            strokeWidth="18"
            strokeDasharray={`${
              circumference - completedDash
            } ${circumference}`}
            strokeDashoffset={-completedDash}
            strokeLinecap="round"
            style={{ transition: "all 1s" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-50">
            {total}
          </span>
          <span className="text-[10px] sm:text-xs text-primary-50 font-medium">
            Total
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 w-full">
        <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-primary-50 to-primary-300"></div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-primary-50">
              Completed
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
            {completed}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-primary-100 to-amber-600"></div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-primary-50">
              Pending
            </span>
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-primary-50">
            {pending}
          </span>
        </div>
      </div>
    </div>
  );
};

const BarChartComponent: React.FC<BarChartProps> = ({ subjects }) => {
  const maxScore = 100;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-end justify-between gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 h-48 sm:h-56 md:h-64 lg:h-72 px-1 min-w-[280px]">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-2 group min-w-0"
          >
            <div className="w-full flex flex-col items-center justify-end h-full relative">
              {/* Score label on hover */}
              <div className="absolute -top-6 sm:-top-8 bg-primary-50 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs md:text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {subject.score}%
              </div>

              {/* Bar container */}
              <div
                className={`w-full ${subject.bgColor} rounded-t-lg p-0.5 transition-all duration-500`}
                style={{ height: `${(subject.score / maxScore) * 100}%` }}
              >
                {/* Gradient bar */}
                <div
                  className={`w-full h-full bg-gradient-to-t ${subject.color} rounded-t-md shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>
                </div>
              </div>

              {/* Score display */}
              <div className="absolute -bottom-4 sm:-bottom-5 text-[10px] sm:text-xs md:text-sm font-bold text-primary-50">
                {subject.score}
              </div>
            </div>

            {/* Subject label */}
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

export default Dashboard;

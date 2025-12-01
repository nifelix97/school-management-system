import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoArrowForwardOutline,
    IoBookOutline,
    IoBookmarksOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoDocumentTextOutline,
    IoLibraryOutline,
    IoPeopleOutline,
    IoQrCodeOutline,
    IoSearchOutline,
    IoSwapHorizontalOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info";
}

interface QuickStat {
  label: string;
  value: number;
  total: number;
  color: string;
  gradient: string;
}

const LibrarianDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activityPage, setActivityPage] = useState(1);
  const itemsPerPage = 3;

  // Library-specific statistics
  const stats: StatCard[] = [
    {
      title: "Total Books",
      value: "12,458",
      change: "+5.2%",
      trend: "up",
      icon: <IoBookOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-50 to-primary-50/80",
      iconBg: "bg-gradient-to-br from-primary-50 to-primary-50/90",
    },
    {
      title: "Active Borrowers",
      value: "1,847",
      change: "+12.8%",
      trend: "up",
      icon: <IoPeopleOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-100 to-primary-100/80",
      iconBg: "bg-gradient-to-br from-primary-100 to-primary-100/90",
    },
    {
      title: "Books Checked Out",
      value: "3,124",
      change: "+8.4%",
      trend: "up",
      icon: <IoSwapHorizontalOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-200 to-primary-200/80",
      iconBg: "bg-gradient-to-br from-primary-200 to-primary-200/90",
    },
    {
      title: "Overdue Items",
      value: "87",
      change: "-23.5%",
      trend: "down",
      icon: <IoWarningOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-300 to-primary-300/80",
      iconBg: "bg-gradient-to-br from-primary-300 to-primary-300/90",
    },
  ];

  // Recent library activities
  const recentActivities: Activity[] = [
    {
      id: "1",
      type: "Book Return",
      description: "Student ID #2345 returned 'Introduction to Algorithms' - 2 days early",
      time: "5 minutes ago",
      status: "success",
    },
    {
      id: "2",
      type: "Overdue Notice",
      description: "Automated reminder sent to 15 borrowers with overdue books",
      time: "30 minutes ago",
      status: "warning",
    },
    {
      id: "3",
      type: "New Acquisition",
      description: "25 new books added to Computer Science section",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: "4",
      type: "Reservation Request",
      description: "Faculty member reserved 'Advanced Database Systems' - Available in 3 days",
      time: "2 hours ago",
      status: "info",
    },
    {
      id: "5",
      type: "Book Checkout",
      description: "Student ID #4567 checked out 'Data Structures and Algorithms'",
      time: "3 hours ago",
      status: "success",
    },
    {
      id: "6",
      type: "Damaged Book Report",
      description: "Book ID #7890 reported damaged - needs assessment",
      time: "4 hours ago",
      status: "warning",
    },
  ];

  // Library performance metrics
  const performanceMetrics: QuickStat[] = [
    {
      label: "Collection Utilization",
      value: 78,
      total: 100,
      color: "bg-primary-50",
      gradient: "from-primary-50 to-primary-50/70",
    },
    {
      label: "User Satisfaction",
      value: 92,
      total: 100,
      color: "bg-primary-100",
      gradient: "from-primary-100 to-primary-100/70",
    },
    {
      label: "Return Rate",
      value: 95,
      total: 100,
      color: "bg-primary-200",
      gradient: "from-primary-200 to-primary-200/70",
    },
    {
      label: "Digital Resources",
      value: 68,
      total: 100,
      color: "bg-primary-300",
      gradient: "from-primary-300 to-primary-300/70",
    },
  ];

  // Category statistics
  const categoryStats = [
    { name: "Computer Science", books: 2145, borrowed: 856, available: 1289, color: "bg-primary-50" },
    { name: "Engineering", books: 1876, borrowed: 723, available: 1153, color: "bg-primary-100" },
    { name: "Business", books: 1654, borrowed: 612, available: 1042, color: "bg-primary-200" },
    { name: "Medicine", books: 1432, borrowed: 534, available: 898, color: "bg-primary-300" },
    { name: "Arts & Literature", books: 1298, borrowed: 487, available: 811, color: "bg-primary-50" },
    { name: "Natural Sciences", books: 1543, borrowed: 598, available: 945, color: "bg-primary-100" },
  ];

  // Popular books this week
  const popularBooks = [
    { title: "Introduction to Algorithms", author: "Cormen et al.", checkouts: 45, category: "Computer Science" },
    { title: "Clean Code", author: "Robert Martin", checkouts: 38, category: "Software Engineering" },
    { title: "Design Patterns", author: "Gang of Four", checkouts: 32, category: "Computer Science" },
    { title: "The Lean Startup", author: "Eric Ries", checkouts: 28, category: "Business" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-green-500" />;
      case "warning":
        return <IoAlertCircleOutline className="w-5 h-5 text-amber-500" />;
      default:
        return <IoTimeOutline className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Library Dashboard
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Comprehensive overview of library operations and statistics
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-primary-50/60">Last updated</p>
            <p className="text-sm sm:text-base font-semibold text-primary-50">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className={`${stat.iconBg} p-3.5 rounded-xl text-white shadow-md`}>
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    stat.trend === "up" 
                      ? "bg-green-50 text-green-600" 
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <IoTrendingUpOutline className="w-4 h-4" />
                  ) : (
                    <IoTrendingDownOutline className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-primary-50/60 mb-2 font-medium uppercase tracking-wide">
                {stat.title}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-primary-50">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Library Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-50">
              Library Performance
            </h2>
            <button className="text-primary-100 hover:text-primary-50 text-sm font-medium flex items-center gap-1 transition-colors">
              View Details
              <IoArrowForwardOutline className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12">
            {/* Large Circular Progress */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                {performanceMetrics.map((metric, index) => {
                  const radius = 120 - index * 25;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (metric.value / 100) * circumference;
                  
                  return (
                    <React.Fragment key={index}>
                      {/* Background Circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        className="text-gray-50"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        style={{ 
                          color: index === 0 ? '#1e3a8a' :
                                 index === 1 ? '#3b82f6' :
                                 index === 2 ? '#60a5fa' :
                                 '#93c5fd'
                        }}
                      >
                        <animate 
                          attributeName="stroke-dashoffset" 
                          from={circumference} 
                          to={strokeDashoffset} 
                          dur="1.5s" 
                          fill="freeze" 
                        />
                      </circle>
                    </React.Fragment>
                  );
                })}
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-bold text-primary-50">
                  {Math.round(performanceMetrics.reduce((acc, curr) => acc + curr.value, 0) / performanceMetrics.length)}%
                </span>
                <span className="text-sm text-primary-50/60 font-medium uppercase tracking-wider mt-2">
                  Overall Score
                </span>
              </div>
            </div>

            {/* Legend / Metrics List */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-primary-100/20 transition-all duration-300">
                  <div 
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                    style={{ 
                      backgroundColor: index === 0 ? '#1e3a8a' :
                                     index === 1 ? '#3b82f6' :
                                     index === 2 ? '#60a5fa' :
                                     '#93c5fd'
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-base font-semibold text-primary-50">{metric.label}</span>
                      <span className="text-lg font-bold text-primary-50">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${metric.value}%`,
                          backgroundColor: index === 0 ? '#1e3a8a' :
                                         index === 1 ? '#3b82f6' :
                                         index === 2 ? '#60a5fa' :
                                         '#93c5fd'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
            Recent Activities
          </h2>
          <div className="space-y-5">
            {recentActivities
              .slice((activityPage - 1) * itemsPerPage, activityPage * itemsPerPage)
              .map((activity) => (
              <div
                key={activity.id}
                className="group flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-gray-50/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-semibold text-primary-50 mb-1.5">
                    {activity.type}
                  </div>
                  <div className="text-xs sm:text-sm text-primary-50/70 mb-2 line-clamp-2">
                    {activity.description}
                  </div>
                  <div className="text-xs text-primary-50/50 font-medium">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActivityPage(p => Math.max(1, p - 1))}
              disabled={activityPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoChevronBackOutline className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-primary-50">
              Page {activityPage} of {Math.ceil(recentActivities.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setActivityPage(p => Math.min(Math.ceil(recentActivities.length / itemsPerPage), p + 1))}
              disabled={activityPage === Math.ceil(recentActivities.length / itemsPerPage)}
              className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoChevronForwardOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Statistics */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
          Collection by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((category, index) => (
            <div key={index} className="group p-5 rounded-xl border-2 border-gray-100 hover:border-primary-100/30 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-primary-50 text-base">{category.name}</div>
                <div className="text-xs font-semibold text-primary-50/60 bg-gray-100 px-2.5 py-1 rounded-full">
                  {category.books} books
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-primary-50/70 font-medium">
                      Borrowed
                    </span>
                    <span className="text-sm sm:text-base font-bold text-primary-50">
                      {category.borrowed}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${category.color} h-full rounded-full transition-all duration-700 shadow-sm`}
                      style={{ width: `${(category.borrowed / category.books) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-primary-50/70 font-medium">
                      Available
                    </span>
                    <span className="text-sm sm:text-base font-bold text-primary-50">
                      {category.available}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-200 to-primary-300 h-full rounded-full transition-all duration-700 shadow-sm"
                      style={{ width: `${(category.available / category.books) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid - Popular Books and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Books */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
            Popular Books This Week
          </h2>
          <div className="space-y-4">
            {popularBooks.map((book, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-primary-50/5 hover:to-primary-100/5 border border-gray-100 hover:border-primary-100/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="text-sm sm:text-base font-semibold text-primary-50 mb-1.5">
                    {book.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-primary-50/60">
                    <span>{book.author}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-50/10 text-primary-50 text-xs font-semibold">
                      {book.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-50">{book.checkouts}</div>
                  <div className="text-xs text-primary-50/60">checkouts</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "400ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <IoLibraryOutline />, label: "Catalog", color: "from-primary-50 to-primary-50/80", path: "/librarian/catalog" },
              { icon: <IoSwapHorizontalOutline />, label: "Circulation", color: "from-primary-100 to-primary-100/80", path: "/librarian/circulation" },
              { icon: <IoBookmarksOutline />, label: "Reservations", color: "from-primary-200 to-primary-200/80", path: "/librarian/reservations" },
              { icon: <IoQrCodeOutline />, label: "Scan Book", color: "from-primary-300 to-primary-300/80", path: "/librarian/barcode" },
              { icon: <IoSearchOutline />, label: "Search", color: "from-primary-50 to-primary-50/80", path: "/librarian/search" },
              { icon: <IoDocumentTextOutline />, label: "Reports", color: "from-primary-100 to-primary-100/80", path: "/librarian/reports" },
            ].map((action, index) => (
              <button 
                key={index}
                onClick={() => navigate(action.path)}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
              >
                <div className={`bg-gradient-to-br ${action.color} p-3.5 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {React.cloneElement(action.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-primary-50 text-center group-hover:text-primary-100 transition-colors">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;

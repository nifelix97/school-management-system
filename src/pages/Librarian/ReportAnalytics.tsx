import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCheckmarkCircleOutline,
    IoDownloadOutline,
    IoPeopleOutline,
    // IoStatsChartOutline,
    IoSwapHorizontalOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

const ReportAnalytic: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const periods = [
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
    { value: "quarter", label: "Last 3 Months" },
    { value: "year", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ];

  // Mock analytics data
  const stats = {
    totalCirculation: 1245,
    circulationChange: 12.5,
    activeLoans: 342,
    activeLoansChange: -3.2,
    newMembers: 89,
    newMembersChange: 8.7,
    overdueItems: 45,
    overdueChange: -15.3,
    totalFines: 1250.50,
    finesChange: -8.2,
    booksAdded: 156,
    booksAddedChange: 22.1,
  };

  const categoryData = [
    { category: "Computer Science", count: 450, percentage: 28 },
    { category: "Literature", count: 380, percentage: 24 },
    { category: "Science", count: 320, percentage: 20 },
    { category: "Mathematics", count: 250, percentage: 16 },
    { category: "History", count: 180, percentage: 11 },
    { category: "Others", count: 20, percentage: 1 },
  ];

  const monthlyData = [
    { month: "Jan", checkouts: 320, returns: 280, overdue: 40 },
    { month: "Feb", checkouts: 380, returns: 340, overdue: 35 },
    { month: "Mar", checkouts: 420, returns: 390, overdue: 30 },
    { month: "Apr", checkouts: 390, returns: 370, overdue: 28 },
    { month: "May", checkouts: 450, returns: 410, overdue: 32 },
    { month: "Jun", checkouts: 480, returns: 450, overdue: 25 },
  ];

  const topBooks = [
    { title: "Introduction to Algorithms", checkouts: 45, author: "Thomas H. Cormen" },
    { title: "Clean Code", checkouts: 38, author: "Robert C. Martin" },
    { title: "Design Patterns", checkouts: 35, author: "Erich Gamma" },
    { title: "The Great Gatsby", checkouts: 32, author: "F. Scott Fitzgerald" },
    { title: "Artificial Intelligence", checkouts: 28, author: "Stuart Russell" },
  ];

  const handleExportReport = () => {
    alert("Exporting analytics report...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Reports & Analytics
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Library performance metrics and insights
            </p>
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoDownloadOutline className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <IoCalendarOutline className="w-5 h-5 text-primary-50" />
          <h2 className="text-lg font-bold text-primary-50">Time Period</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedPeriod === period.value
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
          {selectedPeriod === "custom" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">From Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <IoSwapHorizontalOutline className="w-5 h-5 text-white" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${stats.circulationChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.circulationChange >= 0 ? <IoTrendingUpOutline className="w-4 h-4" /> : <IoTrendingDownOutline className="w-4 h-4" />}
              {Math.abs(stats.circulationChange)}%
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Total Circulation</p>
          <p className="text-2xl font-bold text-primary-50">{stats.totalCirculation}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <IoBookOutline className="w-5 h-5 text-white" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${stats.activeLoansChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.activeLoansChange >= 0 ? <IoTrendingUpOutline className="w-4 h-4" /> : <IoTrendingDownOutline className="w-4 h-4" />}
              {Math.abs(stats.activeLoansChange)}%
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Active Loans</p>
          <p className="text-2xl font-bold text-primary-50">{stats.activeLoans}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <IoPeopleOutline className="w-5 h-5 text-white" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${stats.newMembersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.newMembersChange >= 0 ? <IoTrendingUpOutline className="w-4 h-4" /> : <IoTrendingDownOutline className="w-4 h-4" />}
              {Math.abs(stats.newMembersChange)}%
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">New Members</p>
          <p className="text-2xl font-bold text-primary-50">{stats.newMembers}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
              <IoAlertCircleOutline className="w-5 h-5 text-white" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${stats.overdueChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {stats.overdueChange >= 0 ? <IoTrendingUpOutline className="w-4 h-4" /> : <IoTrendingDownOutline className="w-4 h-4" />}
              {Math.abs(stats.overdueChange)}%
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Overdue Items</p>
          <p className="text-2xl font-bold text-primary-50">{stats.overdueItems}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
              <IoCashOutline className="w-5 h-5 text-white" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${stats.finesChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {stats.finesChange >= 0 ? <IoTrendingUpOutline className="w-4 h-4" /> : <IoTrendingDownOutline className="w-4 h-4" />}
              {Math.abs(stats.finesChange)}%
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Total Fines</p>
          <p className="text-2xl font-bold text-primary-50">${stats.totalFines.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <IoCheckmarkCircleOutline className="w-5 h-5 text-white" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${stats.booksAddedChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.booksAddedChange >= 0 ? <IoTrendingUpOutline className="w-4 h-4" /> : <IoTrendingDownOutline className="w-4 h-4" />}
              {Math.abs(stats.booksAddedChange)}%
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Books Added</p>
          <p className="text-2xl font-bold text-primary-50">{stats.booksAdded}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Circulation Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary-50 mb-6">Monthly Circulation Trends</h3>
          
          {/* Bar Chart */}
          <div className="relative h-80 pt-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-4 bottom-16 flex flex-col justify-between text-xs text-primary-50/60 w-10 text-right pr-2">
              <span>500</span>
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="absolute left-12 right-4 top-4 bottom-16 border-l border-b border-gray-200">
              {/* Grid lines */}
              <div className="absolute inset-0">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: `${i * 25}%` }}
                  />
                ))}
              </div>

              {/* Bars container */}
              <div className="absolute inset-0 flex items-end justify-around px-4">
                {monthlyData.map((data, index) => {
                  const checkoutHeight = (data.checkouts / 500) * 100;
                  const returnHeight = (data.returns / 500) * 100;
                  
                  return (
                    <div key={index} className="flex items-end justify-center gap-1 h-full" style={{ width: '12%' }}>
                      {/* Checkout bar */}
                      <div className="relative flex-1 h-full flex items-end group">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-300 hover:from-blue-600 hover:to-blue-500 relative"
                          style={{ height: `${checkoutHeight}%`, minHeight: checkoutHeight > 0 ? '2px' : '0' }}
                        >
                          {/* Hover tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                            {data.checkouts}
                          </div>
                          {/* Value label */}
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-blue-600 whitespace-nowrap">
                            {data.checkouts}
                          </span>
                        </div>
                      </div>
                      
                      {/* Return bar */}
                      <div className="relative flex-1 h-full flex items-end group">
                        <div
                          className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-300 hover:from-green-600 hover:to-green-500 relative"
                          style={{ height: `${returnHeight}%`, minHeight: returnHeight > 0 ? '2px' : '0' }}
                        >
                          {/* Hover tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                            {data.returns}
                          </div>
                          {/* Value label */}
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-green-600 whitespace-nowrap">
                            {data.returns}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="absolute left-12 right-4 bottom-8 flex justify-around text-xs text-primary-50/70 font-semibold">
              {monthlyData.map((d, i) => (
                <span key={i} className="text-center" style={{ width: '12%' }}>{d.month}</span>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm" />
              <span className="text-primary-50/70">Checkouts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-400 rounded-sm" />
              <span className="text-primary-50/70">Returns</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary-50 mb-6">Books by Category</h3>
          <div className="space-y-4">
            {categoryData.map((cat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary-50">{cat.category}</span>
                  <span className="text-sm text-primary-50/70">{cat.count} books ({cat.percentage}%)</span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Books */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-primary-50 mb-6">Most Borrowed Books</h3>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider hidden sm:table-cell">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                  Checkouts
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider hidden md:table-cell">
                  Popularity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topBooks.map((book, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                      'bg-gradient-to-br from-primary-50 to-primary-100'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-primary-50">{book.title}</div>
                    <div className="text-sm text-primary-50/70 sm:hidden">{book.author}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-primary-50/70 hidden sm:table-cell">{book.author}</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                      {book.checkouts}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="w-full max-w-xs">
                      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full"
                          style={{ width: `${(book.checkouts / topBooks[0].checkouts) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Circulation Rate</h3>
            <IoStatsChartOutline className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold mb-2">87%</p>
          <p className="text-blue-100 text-sm">Books actively circulating</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Return Rate</h3>
            <IoCheckmarkCircleOutline className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold mb-2">94%</p>
          <p className="text-green-100 text-sm">On-time returns this month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Member Growth</h3>
            <IoPeopleOutline className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-4xl font-bold mb-2">+15%</p>
          <p className="text-purple-100 text-sm">New members this quarter</p>
        </div>
      </div> */}
    </div>
  );
};

export default ReportAnalytic;

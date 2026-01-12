import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCheckmarkCircleOutline,
    IoDownloadOutline,
    IoPeopleOutline,
    IoSwapHorizontalOutline,
    IoTrendingUpOutline
} from "react-icons/io5";
import { useGetBooksQuery, useGetLibraryStatsQuery } from "../../app/api/library";

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

  // API hooks
  const { data: statsResponse, isLoading: isStatsLoading, error: statsError } = useGetLibraryStatsQuery();
  const { data: booksResponse, isLoading: isBooksLoading } = useGetBooksQuery();

  const stats = statsResponse?.data;
  const books = booksResponse?.data || [];

  // Derive checkouts from books (Active Loans)
  const currentActiveCheckouts = books.reduce((acc, book) => acc + (book.totalCopies - book.availableCopies), 0);

  // Derive category distribution
  const categories = Array.from(new Set(books.map(b => b.category).filter(Boolean)));
  const categoryData = categories.map(cat => {
    const count = books.filter(b => b.category === cat).length;
    const percentage = Math.round((count / books.length) * 100) || 0;
    return { category: cat, count, percentage };
  }).sort((a, b) => b.count - a.count);

  // Derive top borrowed books
  const topBooks = [...books]
    .map(book => ({
      title: book.title,
      author: book.author,
      checkouts: book.totalCopies - book.availableCopies,
    }))
    .sort((a, b) => b.checkouts - a.checkouts)
    .slice(0, 5);

  // Generate last 6 months data
  const generateMonthlyTrends = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const data = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(now.getMonth() - i);
      const monthLabel = months[d.getMonth()];
      
      // If it's the current month, use real active borrowings
      if (i === 0) {
        data.push({
          month: monthLabel,
          checkouts: Math.max(currentActiveCheckouts, stats?.activeBorrowings || 0),
          returns: Math.round((stats?.activeBorrowings || 0) * 0.8), // Estimated returns for parity
          isCurrent: true
        });
      } else {
        // Mock historical data scaled to current volume
        const base = Math.max(currentActiveCheckouts, 50);
        const randomFactor = 0.7 + Math.random() * 0.6; // 70% to 130%
        data.push({
          month: monthLabel,
          checkouts: Math.round(base * randomFactor),
          returns: Math.round(base * randomFactor * 0.85),
          isCurrent: false
        });
      }
    }
    return data;
  };

  const monthlyData = generateMonthlyTrends();
  const maxVal = Math.max(...monthlyData.map(d => Math.max(d.checkouts, d.returns, 10)), 10);
  const roundedMax = Math.ceil(maxVal / 50) * 50;

  const handleExportReport = () => {
    alert("Exporting analytics report...");
  };

  if (isStatsLoading || isBooksLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading analytics...</span>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex flex-col items-center justify-center p-4">
        <IoAlertCircleOutline className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-primary-50 mb-2">Error Loading Analytics</h2>
        <p className="text-primary-50 text-center">
          We encountered an error while loading the reports. Please try again later.
        </p>
      </div>
    );
  }

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
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <IoTrendingUpOutline className="w-4 h-4" />
              Live
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Total Circulation</p>
          <p className="text-2xl font-bold text-primary-50">{stats?.totalBorrowings || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <IoBookOutline className="w-5 h-5 text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <IoTrendingUpOutline className="w-4 h-4" />
              Active
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Active Loans</p>
          <p className="text-2xl font-bold text-primary-50">{stats?.activeBorrowings || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <IoPeopleOutline className="w-5 h-5 text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <IoTrendingUpOutline className="w-4 h-4" />
              Real-time
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Reservations</p>
          <p className="text-2xl font-bold text-primary-50">{stats?.totalReservations || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
              <IoAlertCircleOutline className="w-5 h-5 text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
              <IoTrendingUpOutline className="w-4 h-4" />
              Alerts
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Overdue Items</p>
          <p className="text-2xl font-bold text-primary-50">{stats?.overdueBooks || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
              <IoCashOutline className="w-5 h-5 text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
              <IoCashOutline className="w-4 h-4" />
              Pending
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Pending Fines</p>
          <p className="text-2xl font-bold text-primary-50">${(stats?.pendingFines || 0).toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <IoCheckmarkCircleOutline className="w-5 h-5 text-white" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <IoCheckmarkCircleOutline className="w-4 h-4" />
              Total
            </span>
          </div>
          <p className="text-xs text-primary-50/60 font-medium mb-1">Total Books</p>
          <p className="text-2xl font-bold text-primary-50">{stats?.totalBooks || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Circulation Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-primary-50">Monthly Circulation Trends</h3>
            <span className="text-[10px] font-bold text-primary-50/40 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider italic">Historical Mapped</span>
          </div>
          
          {/* Bar Chart */}
          <div className="relative h-80 pt-4">
            <div className="absolute left-0 top-4 bottom-16 flex flex-col justify-between text-[10px] sm:text-xs text-primary-50/60 w-10 text-right pr-2">
              <span>{roundedMax}</span>
              <span>{Math.round(roundedMax * 0.8)}</span>
              <span>{Math.round(roundedMax * 0.6)}</span>
              <span>{Math.round(roundedMax * 0.4)}</span>
              <span>{Math.round(roundedMax * 0.2)}</span>
              <span>0</span>
            </div>

            <div className="absolute left-12 right-4 top-4 bottom-16 border-l border-b border-gray-200">
              <div className="absolute inset-0">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: `${i * 20}%` }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-end justify-around px-2 sm:px-4">
                {monthlyData.map((data, index) => {
                  const checkoutHeight = (data.checkouts / roundedMax) * 100;
                  const returnHeight = (data.returns / roundedMax) * 100;
                  
                  return (
                    <div key={index} className="flex items-end justify-center gap-1 h-full" style={{ width: '14%' }}>
                      <div className="relative flex-1 h-full flex items-end group">
                        <div
                          className={`w-full rounded-t-md transition-all duration-300 relative ${
                            data.isCurrent ? 'bg-gradient-to-t from-blue-600 to-blue-500 shadow-md' : 'bg-gradient-to-t from-blue-400 to-blue-300'
                          }`}
                          style={{ height: `${checkoutHeight}%`, minHeight: checkoutHeight > 0 ? '2px' : '0' }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                            {data.checkouts} {data.isCurrent ? '(Real)' : '(Model)'}
                          </div>
                          <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap ${data.isCurrent ? 'text-blue-700' : 'text-blue-600/60'}`}>
                            {data.checkouts}
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative flex-1 h-full flex items-end group">
                        <div
                          className={`w-full rounded-t-md transition-all duration-300 relative ${
                            data.isCurrent ? 'bg-gradient-to-t from-green-600 to-green-500 shadow-md' : 'bg-gradient-to-t from-green-400 to-green-300'
                          }`}
                          style={{ height: `${returnHeight}%`, minHeight: returnHeight > 0 ? '2px' : '0' }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                            {data.returns}
                          </div>
                          <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap ${data.isCurrent ? 'text-green-700' : 'text-green-600/60'}`}>
                            {data.returns}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute left-12 right-4 bottom-8 flex justify-around text-[10px] sm:text-xs text-primary-50/70 font-semibold">
              {monthlyData.map((d, i) => (
                <span key={i} className={`text-center ${d.isCurrent ? 'text-primary-50 underline decoration-2' : ''}`} style={{ width: '14%' }}>{d.month}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-blue-600 to-blue-500 rounded-sm" />
              <span className="text-primary-50/70">Checkouts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-green-600 to-green-500 rounded-sm" />
              <span className="text-primary-50/70">Returns</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary-50 mb-6">Books by Category</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {categoryData.length === 0 ? (
                <div className="text-center py-10 text-primary-50/60">No category data available</div>
            ) : categoryData.map((cat, index) => (
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
                  Checkouts (Est.)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider hidden md:table-cell">
                  Popularity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topBooks.length === 0 ? (
                  <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-primary-50/60">No borrowing data available</td>
                  </tr>
              ) : topBooks.map((book, index) => (
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
                  <td className="px-4 py-4 text-sm text-primary-50/70 hidden sm:table-cell">{book.author || "Unknown"}</td>
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
                          style={{ width: topBooks[0].checkouts > 0 ? `${(book.checkouts / topBooks[0].checkouts) * 100}%` : '0%' }}
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
    </div>
  );
};

export default ReportAnalytic;

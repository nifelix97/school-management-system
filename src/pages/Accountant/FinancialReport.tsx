import {
    ArrowDownRight,
    ArrowUpRight,
    Calendar,
    DollarSign,
    Download,
    FileText,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import React, { useState } from "react";

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  refunds: number;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const FinancialReport: React.FC = () => {
  const [dateRange, setDateRange] = useState("thisMonth");
  const [reportType, setReportType] = useState("summary");

  // Mock monthly data for the past 6 months
  const monthlyData: MonthlyData[] = [
    { month: "Aug 2024", income: 45000000, expenses: 38000000, refunds: 2500000 },
    { month: "Sep 2024", income: 52000000, expenses: 41000000, refunds: 1800000 },
    { month: "Oct 2024", income: 48000000, expenses: 39000000, refunds: 2200000 },
    { month: "Nov 2024", income: 55000000, expenses: 42000000, refunds: 1500000 },
    { month: "Dec 2024", income: 58000000, expenses: 45000000, refunds: 3000000 },
    { month: "Jan 2025", income: 62000000, expenses: 48000000, refunds: 2000000 },
  ];

  // Income breakdown by category
  const incomeBreakdown: CategoryBreakdown[] = [
    { category: "Tuition Fees", amount: 45000000, percentage: 72.5, color: "bg-primary-100" },
    { category: "Registration Fees", amount: 8000000, percentage: 12.9, color: "bg-primary-200" },
    { category: "Accommodation", amount: 6000000, percentage: 9.7, color: "bg-primary-300" },
    { category: "Library Fees", amount: 2000000, percentage: 3.2, color: "bg-primary-50" },
    { category: "Other", amount: 1000000, percentage: 1.7, color: "bg-gray-400" },
  ];

  // Expense breakdown by category
  const expenseBreakdown: CategoryBreakdown[] = [
    { category: "Salaries", amount: 30000000, percentage: 62.5, color: "bg-red-500" },
    { category: "Utilities", amount: 8000000, percentage: 16.7, color: "bg-orange-500" },
    { category: "Maintenance", amount: 5000000, percentage: 10.4, color: "bg-yellow-500" },
    { category: "Supplies", amount: 3000000, percentage: 6.2, color: "bg-green-500" },
    { category: "Technology", amount: 2000000, percentage: 4.2, color: "bg-blue-500" },
  ];

  // Calculate totals
  const totalIncome = monthlyData.reduce((sum, data) => sum + data.income, 0);
  const totalExpenses = monthlyData.reduce((sum, data) => sum + data.expenses, 0);
  const totalRefunds = monthlyData.reduce((sum, data) => sum + data.refunds, 0);
  const netProfit = totalIncome - totalExpenses - totalRefunds;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  // Current month data
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const incomeGrowth = ((currentMonth.income - previousMonth.income) / previousMonth.income * 100).toFixed(1);
  const expenseGrowth = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1);

  const formatCurrency = (amount: number) => {
    return `FRW ${amount.toLocaleString()}`;
  };

  const handleExportPDF = () => {
    console.log("Exporting report as PDF...");
    // TODO: Implement PDF export
  };

  const handleExportExcel = () => {
    // Create CSV content
    let csvContent = "Financial Report\n";
    csvContent += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Summary
    csvContent += "Summary\n";
    csvContent += "Metric,Amount\n";
    csvContent += `Total Income,${totalIncome}\n`;
    csvContent += `Total Expenses,${totalExpenses}\n`;
    csvContent += `Total Refunds,${totalRefunds}\n`;
    csvContent += `Net Profit,${netProfit}\n`;
    csvContent += `Profit Margin,${profitMargin}%\n\n`;
    
    // Monthly Summary
    csvContent += "Monthly Summary\n";
    csvContent += "Month,Income,Expenses,Refunds,Net Profit,Margin %\n";
    monthlyData.forEach(data => {
      const monthNetProfit = data.income - data.expenses - data.refunds;
      const margin = ((monthNetProfit / data.income) * 100).toFixed(1);
      csvContent += `${data.month},${data.income},${data.expenses},${data.refunds},${monthNetProfit},${margin}%\n`;
    });
    csvContent += `Total,${totalIncome},${totalExpenses},${totalRefunds},${netProfit},${profitMargin}%\n\n`;
    
    // Income Breakdown
    csvContent += "Income Breakdown\n";
    csvContent += "Category,Amount,Percentage\n";
    incomeBreakdown.forEach(item => {
      csvContent += `${item.category},${item.amount},${item.percentage}%\n`;
    });
    csvContent += "\n";
    
    // Expense Breakdown
    csvContent += "Expense Breakdown\n";
    csvContent += "Category,Amount,Percentage\n";
    expenseBreakdown.forEach(item => {
      csvContent += `${item.category},${item.amount},${item.percentage}%\n`;
    });

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Financial_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Financial Reports
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Comprehensive financial analysis and insights
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-col xs:flex-row gap-3">
            {/* Date Range Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full xs:w-auto pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white"
              >
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
                <option value="last6Months">Last 6 Months</option>
                <option value="thisYear">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Report Type Filter */}
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full xs:w-auto pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white"
              >
                <option value="summary">Summary Report</option>
                <option value="detailed">Detailed Report</option>
                <option value="comparative">Comparative Analysis</option>
              </select>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleExportPDF}
              className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-primary-100 text-primary-100 rounded-lg hover:bg-primary-100/10 transition-colors"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {/* Total Income */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Income
            </div>
            <div className="bg-primary-100/10 p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-100" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50 mb-2">
            {formatCurrency(totalIncome)}
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            <span className="text-green-600 font-medium">+{incomeGrowth}%</span>
            <span className="text-primary-50/60">vs last month</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Expenses
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50 mb-2">
            {formatCurrency(totalExpenses)}
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
            <span className="text-red-600 font-medium">+{expenseGrowth}%</span>
            <span className="text-primary-50/60">vs last month</span>
          </div>
        </div>

        {/* Total Refunds */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Refunds
            </div>
            <div className="bg-orange-100 p-2 rounded-lg">
              <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50 mb-2">
            {formatCurrency(totalRefunds)}
          </div>
          <div className="text-xs sm:text-sm text-primary-50/60">
            Last 6 months
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Net Profit
            </div>
            <div
              className={`p-2 rounded-lg ${
                netProfit >= 0 ? "bg-primary-100/10" : "bg-red-100"
              }`}
            >
              <DollarSign
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  netProfit >= 0 ? "text-primary-100" : "text-red-600"
                }`}
              />
            </div>
          </div>
          <div
            className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${
              netProfit >= 0 ? "text-primary-50" : "text-red-600"
            }`}
          >
            {formatCurrency(Math.abs(netProfit))}
          </div>
          <div className="text-xs sm:text-sm text-primary-50/60">
            Margin: {profitMargin}%
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
          Expense Breakdown
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {expenseBreakdown.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3">
                {/* Circular Progress */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${item.percentage * 2.51} 251`}
                    className={item.color.replace("bg-", "text-")}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-bold text-primary-50">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-medium text-primary-50 mb-1">
                {item.category}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-primary-50/80">
                {formatCurrency(item.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
            Monthly Trend
          </h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const maxValue = Math.max(
                ...monthlyData.map((d) => Math.max(d.income, d.expenses))
              );
              const incomeWidth = (data.income / maxValue) * 100;
              const expenseWidth = (data.expenses / maxValue) * 100;

              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm font-medium text-primary-50">
                      {data.month}
                    </span>
                    <span className="text-xs sm:text-sm text-primary-50/60">
                      Net:{" "}
                      {formatCurrency(
                        data.income - data.expenses - data.refunds
                      )}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {/* Income Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary-50/60 w-16">
                        Income
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary-100 h-full rounded-full transition-all duration-500"
                          style={{ width: `${incomeWidth}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary-50 w-24 text-right">
                        {formatCurrency(data.income)}
                      </span>
                    </div>
                    {/* Expense Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary-50/60 w-16">
                        Expenses
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-red-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${expenseWidth}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary-50 w-24 text-right">
                        {formatCurrency(data.expenses)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Income Breakdown */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
            Income Breakdown
          </h2>
          <div className="space-y-4">
            {incomeBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium text-primary-50">
                    {item.category}
                  </span>
                  <span className="text-xs sm:text-sm text-primary-50/60">
                    {item.percentage}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-primary-50 w-28 text-right">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
          Monthly Summary
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Month
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Income
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Expenses
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Refunds
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Net Profit
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Margin
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => {
                const netProfit = data.income - data.expenses - data.refunds;
                const margin = ((netProfit / data.income) * 100).toFixed(1);

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-primary-50">
                      {data.month}
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-primary-100 font-semibold">
                      {formatCurrency(data.income)}
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-red-600 font-semibold">
                      {formatCurrency(data.expenses)}
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-orange-600 font-semibold">
                      {formatCurrency(data.refunds)}
                    </td>
                    <td
                      className={`py-4 px-4 text-sm text-right font-bold ${
                        netProfit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Math.abs(netProfit))}
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-primary-50">
                      {margin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td className="py-4 px-4 text-sm text-primary-50">Total</td>
                <td className="py-4 px-4 text-sm text-right text-primary-100">
                  {formatCurrency(totalIncome)}
                </td>
                <td className="py-4 px-4 text-sm text-right text-red-600">
                  {formatCurrency(totalExpenses)}
                </td>
                <td className="py-4 px-4 text-sm text-right text-orange-600">
                  {formatCurrency(totalRefunds)}
                </td>
                <td
                  className={`py-4 px-4 text-sm text-right ${
                    netProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(Math.abs(netProfit))}
                </td>
                <td className="py-4 px-4 text-sm text-right text-primary-50">
                  {profitMargin}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {monthlyData.map((data, index) => {
            const netProfit = data.income - data.expenses - data.refunds;
            const margin = ((netProfit / data.income) * 100).toFixed(1);

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="text-sm font-bold text-primary-50 mb-3">
                  {data.month}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-primary-50/60 mb-1">Income</div>
                    <div className="text-primary-100 font-semibold">
                      {formatCurrency(data.income)}
                    </div>
                  </div>
                  <div>
                    <div className="text-primary-50/60 mb-1">Expenses</div>
                    <div className="text-red-600 font-semibold">
                      {formatCurrency(data.expenses)}
                    </div>
                  </div>
                  <div>
                    <div className="text-primary-50/60 mb-1">Refunds</div>
                    <div className="text-orange-600 font-semibold">
                      {formatCurrency(data.refunds)}
                    </div>
                  </div>
                  <div>
                    <div className="text-primary-50/60 mb-1">Net Profit</div>
                    <div
                      className={`font-bold ${
                        netProfit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Math.abs(netProfit))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-primary-50/60 mb-1">Profit Margin</div>
                    <div className="text-primary-50 font-semibold">
                      {margin}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;

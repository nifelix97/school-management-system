import React, { useState } from "react";
import {
    IoAddOutline,
    IoArrowDownOutline,
    IoArrowUpOutline,
    IoCashOutline,
    IoDownloadOutline,
    IoGridOutline,
    IoListOutline,
    IoReceiptOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWalletOutline
} from "react-icons/io5";

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  status: "on-track" | "warning" | "critical" | "excellent";
  trend: "up" | "down" | "stable";
  percentage: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  status: "completed" | "pending" | "scheduled";
}

const BudgetsFinance: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "allocation" | "transactions">("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2024");

  // Mock data
  const budgetCategories: BudgetCategory[] = [
    {
      id: "1",
      name: "Academic Programs",
      allocated: 5000000,
      spent: 3750000,
      remaining: 1250000,
      status: "on-track",
      trend: "stable",
      percentage: 75,
    },
    {
      id: "2",
      name: "Research & Development",
      allocated: 3000000,
      spent: 2100000,
      remaining: 900000,
      status: "on-track",
      trend: "up",
      percentage: 70,
    },
    {
      id: "3",
      name: "Infrastructure",
      allocated: 4000000,
      spent: 3600000,
      remaining: 400000,
      status: "warning",
      trend: "up",
      percentage: 90,
    },
    {
      id: "4",
      name: "Student Services",
      allocated: 2000000,
      spent: 1400000,
      remaining: 600000,
      status: "excellent",
      trend: "down",
      percentage: 70,
    },
    {
      id: "5",
      name: "Administration",
      allocated: 1500000,
      spent: 1350000,
      remaining: 150000,
      status: "warning",
      trend: "stable",
      percentage: 90,
    },
    {
      id: "6",
      name: "Technology & IT",
      allocated: 2500000,
      spent: 2450000,
      remaining: 50000,
      status: "critical",
      trend: "up",
      percentage: 98,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2024-11-25",
      description: "Faculty Salaries - November",
      amount: 450000,
      type: "expense",
      category: "Academic Programs",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-11-24",
      description: "Research Grant - NSF",
      amount: 150000,
      type: "income",
      category: "Research & Development",
      status: "completed",
    },
    {
      id: "3",
      date: "2024-11-23",
      description: "Library Renovation Phase 2",
      amount: 280000,
      type: "expense",
      category: "Infrastructure",
      status: "completed",
    },
    {
      id: "4",
      date: "2024-11-22",
      description: "Student Scholarships Q4",
      amount: 120000,
      type: "expense",
      category: "Student Services",
      status: "completed",
    },
    {
      id: "5",
      date: "2024-11-21",
      description: "Tuition Revenue - Fall Semester",
      amount: 850000,
      type: "income",
      category: "Revenue",
      status: "completed",
    },
    {
      id: "6",
      date: "2024-11-20",
      description: "IT Infrastructure Upgrade",
      amount: 95000,
      type: "expense",
      category: "Technology & IT",
      status: "pending",
    },
  ];

  const totalBudget = budgetCategories.reduce((acc, cat) => acc + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((acc, cat) => acc + cat.spent, 0);
  const totalRemaining = budgetCategories.reduce((acc, cat) => acc + cat.remaining, 0);
  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "on-track": return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "warning": return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "critical": return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return "from-red-500 to-rose-500";
    if (percentage >= 85) return "from-amber-500 to-orange-500";
    if (percentage >= 70) return "from-blue-500 to-cyan-500";
    return "from-green-500 to-emerald-500";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <IoTrendingUpOutline className="w-4 h-4 text-primary-200" />;
      case "down": return <IoTrendingDownOutline className="w-4 h-4 text-primary-300" />;
      default: return <div className="w-4 h-4 border-t-2 border-gray-400" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Budget & Finance
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Financial overview and budget management for {selectedPeriod}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all shadow-sm"
            >
              <option value="2024">FY 2024</option>
              <option value="2023">FY 2023</option>
              <option value="2022">FY 2022</option>
            </select>
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoWalletOutline, label: "Total Budget", value: formatCurrency(totalBudget), color: "primary-50", trend: null },
          { Icon: IoCashOutline, label: "Total Spent", value: formatCurrency(totalSpent), color: "primary-200", trend: "up" },
          { Icon: IoReceiptOutline, label: "Remaining", value: formatCurrency(totalRemaining), color: "primary-300", trend: "down" },
          { Icon: IoArrowUpOutline, label: "Total Income", value: formatCurrency(totalIncome), color: "primary-100", trend: "up" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color}`}>
                <stat.Icon className="w-6 h-6" />
              </div>
              {stat.trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === "up" ? "bg-primary-200/10 text-primary-200" : "bg-primary-300/10 text-primary-300"
                }`}>
                  {stat.trend === "up" ? <IoArrowUpOutline className="w-3 h-3" /> : <IoArrowDownOutline className="w-3 h-3" />}
                  {stat.trend === "up" ? "8%" : "12%"}
                </div>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "overview", label: "Overview", icon: IoGridOutline },
          { id: "allocation", label: "Budget Allocation", icon: IoStatsChartOutline },
          { id: "transactions", label: "Transactions", icon: IoListOutline },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            <view.icon className="w-5 h-5" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Overview View */}
      {activeView === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Summary */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Budget Summary by Category</h2>
            
            {/* Circular Chart */}
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              {/* Donut Chart */}
              <div className="shrink-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 200 200" className="transform -rotate-90">
                    {(() => {
                      let currentAngle = 0;
                      const colors = ["primary-50", "primary-100", "primary-50", "primary-100", "primary-50", "primary-100"];
                      const opacities = [1, 1, 0.8, 0.8, 0.6, 0.6];
                      return budgetCategories.map((category, index) => {
                        const percentage = (category.spent / totalSpent) * 100;
                        const angle = (percentage / 100) * 360;
                        const radius = 80;
                        const innerRadius = 50;
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        
                        currentAngle = endAngle;
                        
                        const startX = 100 + radius * Math.cos((startAngle * Math.PI) / 180);
                        const startY = 100 + radius * Math.sin((startAngle * Math.PI) / 180);
                        const endX = 100 + radius * Math.cos((endAngle * Math.PI) / 180);
                        const endY = 100 + radius * Math.sin((endAngle * Math.PI) / 180);
                        
                        const innerStartX = 100 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
                        const innerStartY = 100 + innerRadius * Math.sin((startAngle * Math.PI) / 180);
                        const innerEndX = 100 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
                        const innerEndY = 100 + innerRadius * Math.sin((endAngle * Math.PI) / 180);
                        
                        const largeArc = angle > 180 ? 1 : 0;
                        
                        const pathData = [
                          `M ${startX} ${startY}`,
                          `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
                          `L ${innerEndX} ${innerEndY}`,
                          `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartX} ${innerStartY}`,
                          'Z'
                        ].join(' ');
                        
                        return (
                          <path
                            key={category.id}
                            d={pathData}
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                            style={{ 
                              fill: `var(--color-${colors[index]})`,
                              opacity: opacities[index],
                              transition: 'opacity 0.3s'
                            }}
                          />
                        );
                      });
                    })()}
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-primary-50">{formatCurrency(totalSpent)}</div>
                    <div className="text-xs text-primary-50/60 mt-1">Total Spent</div>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
                {budgetCategories.map((category, index) => {
                  const percentage = Math.round((category.spent / totalSpent) * 100);
                  const colors = ["primary-50", "primary-100", "primary-50", "primary-100", "primary-50", "primary-100"];
                  const opacities = [1, 1, 0.8, 0.8, 0.6, 0.6];
                  return (
                    <div key={category.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                      <div 
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{ 
                          backgroundColor: `var(--color-${colors[index]})`,
                          opacity: opacities[index]
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-primary-50 truncate">{category.name}</div>
                        <div className="text-xs text-primary-50/60">{percentage}% • {formatCurrency(category.spent)} spent</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Details */}
            <div className="space-y-6">
              {budgetCategories.map((category, index) => (
                <div key={category.id} className="animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 400}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-primary-50 text-sm">{category.name}</h3>
                      {getTrendIcon(category.trend)}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary-50">{formatCurrency(category.spent)}</div>
                      <div className="text-xs text-primary-50/60">of {formatCurrency(category.allocated)}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getProgressColor(category.percentage)} transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${getStatusColor(category.status)}`}>
                      {category.status.replace("-", " ").toUpperCase()}
                    </span>
                    <span className="text-xs text-primary-50/60">{category.percentage}% utilized</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Financial Health</h2>
              <div className="space-y-4">
                {[
                  { label: "Budget Utilization", value: `${Math.round((totalSpent / totalBudget) * 100)}%`, status: "on-track" },
                  { label: "Categories On Track", value: `${budgetCategories.filter(c => c.status === "on-track" || c.status === "excellent").length}/${budgetCategories.length}`, status: "excellent" },
                  { label: "Critical Categories", value: budgetCategories.filter(c => c.status === "critical").length, status: budgetCategories.filter(c => c.status === "critical").length > 0 ? "critical" : "excellent" },
                  { label: "Avg. Spending Rate", value: "75%", status: "on-track" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${idx * 100 + 200}ms` }}>
                    <span className="text-sm font-semibold text-primary-50/70">{item.label}</span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(item.status)}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {transactions.slice(0, 4).map((transaction, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${idx * 100 + 400}ms` }}>
                    <div className={`p-2 rounded-lg ${transaction.type === "income" ? "bg-primary-300/10 text-primary-300" : "bg-primary-200/10 text-primary-200"}`}>
                      {transaction.type === "income" ? <IoArrowDownOutline className="w-4 h-4" /> : <IoArrowUpOutline className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-primary-50 text-sm truncate">{transaction.description}</h4>
                      <p className="text-xs text-primary-50/60">{transaction.category}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${transaction.type === "income" ? "text-primary-300" : "text-primary-200"}`}>
                        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-[10px] text-primary-50/50">{transaction.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocation View */}
      {activeView === "allocation" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detailed Allocation */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Budget Allocation Details</h2>
            <div className="space-y-6">
              {budgetCategories.map((category, index) => (
                <div key={category.id} className="p-5 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all animate-[scaleIn_0.4s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary-50">{category.name}</h3>
                      <p className="text-xs text-primary-50/60 mt-1">Fiscal Year {selectedPeriod}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(category.status)}`}>
                      {category.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-primary-50/60 mb-1">Allocated</div>
                      <div className="text-sm font-bold text-primary-50">{formatCurrency(category.allocated)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-primary-50/60 mb-1">Spent</div>
                      <div className="text-sm font-bold text-primary-200">{formatCurrency(category.spent)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-primary-50/60 mb-1">Remaining</div>
                      <div className="text-sm font-bold text-primary-300">{formatCurrency(category.remaining)}</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getProgressColor(category.percentage)} transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary-50/70">Utilization:</span>
                      {getTrendIcon(category.trend)}
                    </div>
                    <span className="text-xs font-bold text-primary-50">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Chart */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Budget Distribution</h2>
            <div className="space-y-4">
              {budgetCategories
                .sort((a, b) => b.allocated - a.allocated)
                .map((category, index) => {
                  const percentage = Math.round((category.allocated / totalBudget) * 100);
                  return (
                    <div key={category.id} className="animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-primary-50 text-sm">{category.name}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary-50">{formatCurrency(category.allocated)}</div>
                          <div className="text-xs text-primary-50/60">{percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary-50 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-primary-50 mb-4">Spending Trends</h3>
              <div className="space-y-3">
                {[
                  { label: "Highest Spending", value: budgetCategories.sort((a, b) => b.spent - a.spent)[0].name, color: "primary-200" },
                  { label: "Most Efficient", value: budgetCategories.sort((a, b) => a.percentage - b.percentage)[0].name, color: "primary-300" },
                  { label: "Needs Attention", value: budgetCategories.filter(c => c.status === "critical" || c.status === "warning").length + " categories", color: "primary-100" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span className="text-sm font-semibold text-primary-50/70">{item.label}</span>
                    <span className={`text-sm font-bold text-${item.color}-600`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions View */}
      {activeView === "transactions" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out_both]">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-xl font-bold text-primary-50">Recent Transactions</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary-50 text-white shadow-md">
                  All
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200">
                  Income
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200">
                  Expenses
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden p-4 space-y-4">
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className="p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${transaction.type === "income" ? "bg-primary-300/10 text-primary-300" : "bg-primary-200/10 text-primary-200"}`}>
                      {transaction.type === "income" ? <IoArrowDownOutline className="w-5 h-5" /> : <IoArrowUpOutline className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-50">{transaction.description}</h3>
                      <p className="text-xs text-primary-50/60 mt-1">{transaction.category}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-primary-50/60">{transaction.date}</span>
                  <span className={`text-lg font-bold ${transaction.type === "income" ? "text-primary-300" : "text-primary-200"}`}>
                    {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-primary-50 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors animate-[slideUp_0.4s_ease-out_both]" style={{ animationDelay: `${index * 50}ms` }}>
                    <td className="px-6 py-4 text-sm text-primary-50/70">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary-50">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-50/70">{transaction.category}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === "income" ? "bg-primary-300/10 text-primary-300" : "bg-primary-200/10 text-primary-200"
                      }`}>
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-bold ${transaction.type === "income" ? "text-primary-300" : "text-primary-200"}`}>
                        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === "completed" ? "bg-primary-300/10 text-primary-300" :
                        transaction.status === "pending" ? "bg-primary-100/10 text-primary-100" :
                        "bg-primary-50/10 text-primary-50"
                      }`}>
                        {transaction.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetsFinance;

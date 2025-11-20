import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoWalletOutline,
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-primary-50 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-2xl font-bold text-primary-50 mb-1">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-primary-100' : 'text-primary-200'}`}>
              <IoTrendingUpOutline className={trendUp ? '' : 'rotate-180'} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface RecentActivityProps {
  studentName: string;
  amount: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'rejected';
}

const RecentActivity: React.FC<RecentActivityProps> = ({ studentName, amount, type, date, status }) => {
  const statusColors = {
    completed: 'bg-primary-100/20 text-primary-100',
    pending: 'bg-primary-200/20 text-primary-200',
    rejected: 'bg-primary-300/20 text-primary-300',
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-primary-50">{studentName}</p>
        <p className="text-sm text-primary-50/40">{type}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-primary-50">{amount}</p>
        <p className="text-xs text-primary-50/40">{date}</p>
      </div>
      <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
};

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-all border border-gray-200 hover:border-primary-50 w-full text-left group"
    >
      <div className="text-primary-50 text-2xl">{icon}</div>
      <span className="font-medium text-primary-50 flex-1">{title}</span>
      <IoArrowForwardOutline className="text-gray-400 group-hover:text-primary-50 transition-colors" />
    </button>
  );
};

const AccountantDashBoard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Revenue (This Month)",
      value: "UGX 45,250,000",
      icon: <IoWalletOutline className="text-2xl text-primary-100" />,
      trend: "+12.5% from last month",
      trendUp: true,
      bgColor: "bg-primary-100/10",
    },
    {
      title: "Pending Payments",
      value: "UGX 8,500,000",
      icon: <IoTimeOutline className="text-2xl text-primary-200" />,
      trend: "156 students",
      trendUp: false,
      bgColor: "bg-primary-200/10",
    },
    {
      title: "Outstanding Balances",
      value: "UGX 12,750,000",
      icon: <IoCardOutline className="text-2xl text-primary-300" />,
      trend: "89 students",
      trendUp: false,
      bgColor: "bg-primary-300/10",
    },
    {
      title: "Cleared Students",
      value: "1,245",
      icon: <IoCheckmarkCircleOutline className="text-2xl text-primary-100" />,
      trend: "+8.3% this week",
      trendUp: true,
      bgColor: "bg-primary-100/10",
    },
  ];

  const recentActivities: RecentActivityProps[] = [
    {
      studentName: "Nakato Sarah",
      amount: "UGX 1,500,000",
      type: "Tuition Fee Payment",
      date: "2 hours ago",
      status: "completed",
    },
    {
      studentName: "Okello James",
      amount: "UGX 750,000",
      type: "Registration Fee",
      date: "5 hours ago",
      status: "pending",
    },
    {
      studentName: "Namukasa Grace",
      amount: "UGX 2,000,000",
      type: "Accommodation Fee",
      date: "1 day ago",
      status: "completed",
    },
    {
      studentName: "Musoke David",
      amount: "UGX 500,000",
      type: "Library Fine",
      date: "2 days ago",
      status: "rejected",
    },
    {
      studentName: "Atim Betty",
      amount: "UGX 1,200,000",
      type: "Retake Module Fee",
      date: "3 days ago",
      status: "completed",
    },
  ];

  const pendingApprovals = [
    { student: "Kamya Peter", amount: "UGX 1,500,000", type: "Bank Slip" },
    { student: "Nabirye Joan", amount: "UGX 850,000", type: "Mobile Money" },
    { student: "Ssemakula John", amount: "UGX 2,100,000", type: "Bank Slip" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-50 mb-2">Accountant Dashboard</h1>
        <p className="text-primary-50/40">Welcome back! Here's your financial overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-primary-50">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary-50">Recent Payment Activities</h2>
            <button className="text-primary-50 hover:text-primary-100 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <RecentActivity key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <IoCloudUploadOutline className="text-2xl text-primary-50" />
            <h2 className="text-xl font-bold text-primary-50">Pending Approvals</h2>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((item, index) => (
              <div key={index} className="p-4 bg-primary-200/10 rounded-lg border border-primary-200/30">
                <p className="font-medium text-primary-50 mb-1">{item.student}</p>
                <p className="text-sm text-primary-50/40 mb-2">{item.amount}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary-50/40">{item.type}</span>
                  <button className="text-xs bg-primary-50 text-white px-3 py-1 rounded hover:bg-primary-100 transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-primary-50 hover:text-primary-100 text-sm font-medium py-2">
              View All Pending
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-primary-50 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Record Payment"
            icon={<IoWalletOutline />}
            onClick={() => navigate("/accountant/student-payments")}
          />
          <QuickAction
            title="Generate Invoice"
            icon={<IoDocumentTextOutline />}
            onClick={() => navigate("/accountant/invoices")}
          />
          <QuickAction
            title="Financial Clearance"
            icon={<IoCheckmarkCircleOutline />}
            onClick={() => navigate("/accountant/financial-clearance")}
          />
          <QuickAction
            title="View Reports"
            icon={<IoDocumentTextOutline />}
            onClick={() => navigate("/accountant/financial-reports")}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountantDashBoard;
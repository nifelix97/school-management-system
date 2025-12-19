import React, { useEffect, useState } from "react";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCloudUploadOutline,
    IoFlashOutline,
    IoLockClosedOutline,
    IoPeopleOutline,
    IoPulseOutline,
    IoSettingsOutline,
    IoShieldCheckmarkOutline,
    IoStatsChartOutline,
    IoSyncOutline,
} from "react-icons/io5";

interface MetricCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, icon, color, iconBg }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`${iconBg} p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
        <IoSyncOutline className="animate-spin-slow" />
        Live
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-primary-50">{value}</p>
      <p className="text-xs text-gray-400">{subValue}</p>
    </div>
  </div>
);

const SuperAdminDashboard: React.FC = () => {
  const [uptime, setUptime] = useState("99.98%");
  
  // Real-time update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random variations to simulate live data
      setUptime(`99.${90 + Math.floor(Math.random() * 9)}%`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: "Global Users",
      value: "12,482",
      subValue: "+124 in last 24h",
      icon: <IoPeopleOutline className="w-6 h-6" />,
      color: "text-primary-50",
      iconBg: "bg-primary-50/10",
    },
    {
      title: "Security Score",
      value: "98/100",
      subValue: "A+ Rated Infrastructure",
      icon: <IoShieldCheckmarkOutline className="w-6 h-6" />,
      color: "text-primary-300",
      iconBg: "bg-primary-300/10",
    },
    {
      title: "System Uptime",
      value: uptime,
      subValue: "Last incident: 42 days ago",
      icon: <IoPulseOutline className="w-6 h-6" />,
      color: "text-primary-100",
      iconBg: "bg-primary-100/10",
    },
    {
      title: "Active Sessions",
      value: "1,245",
      subValue: "Across 4 regions",
      icon: <IoFlashOutline className="w-6 h-6" />,
      color: "text-primary-200",
      iconBg: "bg-primary-200/10",
    },
  ];

  const logs = [
    { id: 1, action: "Backup Executed", user: "System", time: "10 mins ago", status: "success" },
    { id: 2, action: "Role Escalation", user: "Admin_John", time: "1 hour ago", status: "warning" },
    { id: 3, action: "DDoS Mitigation", user: "Firewall", time: "3 hours ago", status: "success" },
    { id: 4, action: "Config Updated", user: "S_Admin_Zee", time: "5 hours ago", status: "info" },
    { id: 5, action: "New Role Created", user: "S_Admin_Zee", time: "1 day ago", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight">Super Admin Hub</h1>
          <p className="text-gray-500 mt-1">Enterprise-grade monitoring and system control center.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <IoCloudUploadOutline className="text-lg" />
            Export Audit
          </button>
          <button className="flex items-center gap-2 bg-primary-50 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary-50/20">
            <IoSyncOutline className="text-lg" />
            Global Sync
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-50 flex items-center gap-2">
                <IoStatsChartOutline />
                Infrastructure Health
              </h2>
              <select className="bg-gray-50 border-none text-xs font-semibold text-gray-500 rounded-lg px-2 py-1 outline-none">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "CPU Usage", val: 34, color: "bg-primary-300" },
                { label: "Memory Allocation", val: 56, color: "bg-primary-100" },
                { label: "Database Latency", val: 12, color: "bg-primary-50" },
                { label: "Network IO", val: 82, color: "bg-primary-200" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="text-primary-50">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${item.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary-50">Global Audit Log</h2>
              <button className="text-primary-50 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Initiated By</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-primary-50">{log.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{log.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{log.time}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full w-fit ${
                          log.status === 'success' ? 'bg-green-50 text-green-600' :
                          log.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {log.status === 'success' && <IoCheckmarkCircleOutline />}
                          {log.status === 'warning' && <IoAlertCircleOutline />}
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Actions & Info */}
        <div className="space-y-6">
          <div className="bg-primary-50 rounded-2xl p-6 text-white shadow-xl shadow-primary-50/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">System Broadcast</h3>
              <p className="text-blue-100 text-sm mb-6">Send urgent messages to all users globally across every role.</p>
              <textarea 
                placeholder="Type your alert here..."
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none h-24"
              />
              <button className="w-full mt-4 bg-white text-primary-50 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                Broadcast Now
              </button>
            </div>
            <IoLockClosedOutline className="absolute -bottom-4 -right-4 text-8xl text-white/5 group-hover:scale-110 transition-transform" />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-primary-50 mb-4 flex items-center gap-2">
              <IoSettingsOutline className="text-lg" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Trigger Backup", sub: "Manual DB Snapshot" },
                { label: "Clear Cache", sub: "Production CDN Flush" },
                { label: "Maintenance Mode", sub: "Toggle System Access" },
                { label: "Refresh tokens", sub: "Force user logout" },
              ].map((act, i) => (
                <button key={i} className="flex flex-col text-left px-4 py-3 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:bg-primary-50/5 transition-all group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-primary-50">{act.label}</span>
                  <span className="text-xs text-gray-400">{act.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;


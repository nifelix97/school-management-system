import React, { useState } from "react";
import {
    IoBarChartOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoDownloadOutline,
    IoPeopleOutline,
    IoPieChartOutline,
    IoPulseOutline,
    IoSchoolOutline,
    IoServerOutline,
    IoShieldCheckmarkOutline,
    IoSpeedometerOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

const ReportsAnalytic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"institutional" | "performance">("institutional");
  const [period, setPeriod] = useState("month");

  // Aligned with SuperAdminDashboard data
  const metrics = [
    { title: "Total Institutions", value: "142", trend: "+14", up: true, icon: <IoSchoolOutline />, color: "bg-blue-500" },
    { title: "Global Users", value: "12,482", trend: "+124", up: true, icon: <IoPeopleOutline />, color: "bg-purple-500" },
    { title: "Revenue (ARR)", value: "$5.2M", trend: "+8.2%", up: true, icon: <IoCashOutline />, color: "bg-green-500" },
    { title: "Security Score", value: "98/100", trend: "A+ Rated", up: true, icon: <IoShieldCheckmarkOutline />, color: "bg-orange-500" },
  ];

  const chartData = [
    { month: "Jan", growth: 12 },
    { month: "Feb", growth: 18 },
    { month: "Mar", growth: 15 },
    { month: "Apr", growth: 22 },
    { month: "May", growth: 28 },
    { month: "Jun", growth: 35 },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
            <IoBarChartOutline className="text-primary-100" />
            Platform Intelligence
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Global cross-institutional analytics and infrastructure reporting.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
            {["week", "month", "year"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  period === p ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "text-gray-400 hover:text-primary-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-primary-100 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all">
            <IoDownloadOutline className="text-lg" />
            Global Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-4 ${m.color} text-white rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                <span className="text-2xl">{m.icon}</span>
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                m.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {m.up ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                {m.trend}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{m.title}</h3>
            <p className="text-3xl font-black text-primary-50 tracking-tight">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs Switcher */}
      <div className="flex bg-white/50 p-1.5 rounded-2xl border border-gray-100 w-fit backdrop-blur-sm shadow-sm">
        <button
          onClick={() => setActiveTab("institutional")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "institutional" ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "text-gray-500 hover:bg-white"
          }`}
        >
          <IoSchoolOutline />
          Institutional Growth
        </button>
        <button
          onClick={() => setActiveTab("performance")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "performance" ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "text-gray-500 hover:bg-white"
          }`}
        >
          <IoSpeedometerOutline />
          Infrastructure Health
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          {activeTab === "institutional" ? (
            <div className="animate-slideIn">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-xl font-black text-primary-50 flex items-center gap-2">
                    <IoPulseOutline className="text-primary-100" />
                    Market Expansion Trends
                  </h2>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase">New Institution Signups (Q1-Q2 2024)</p>
                </div>
              </div>
              
              <div className="h-[300px] flex items-end justify-between gap-2 sm:gap-4 px-2">
                {chartData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full">
                    <div className="w-full flex items-end h-[260px] relative bg-gray-50/50 rounded-xl overflow-hidden">
                      <div 
                        className="w-full bg-gradient-to-t from-primary-100 to-primary-50 rounded-t-xl transition-all duration-1000 ease-out group-hover:from-primary-50 group-hover:to-primary-100 relative shadow-inner"
                        style={{ height: `${(d.growth / 35) * 100}%`, transitionDelay: `${i * 100}ms` }}
                      >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary-50 text-white text-[10px] font-black py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl pointer-events-none whitespace-nowrap z-20">
                          <span className="block text-[8px] opacity-60 uppercase mb-0.5">Institutions</span>
                          {d.growth} UNITS
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-slideIn space-y-10">
               <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-black text-primary-50 flex items-center gap-2">
                    <IoServerOutline className="text-primary-100" />
                    Global Node Latency
                  </h2>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase">Server response times by month (ms)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { region: "US-East", latency: "24ms", health: 98, status: "Optimal" },
                  { region: "EU-West", latency: "42ms", health: 96, status: "Healthy" },
                  { region: "ASIA-South", latency: "112ms", health: 85, status: "Degraded" },
                ].map((r, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-primary-100/20 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{r.region}</p>
                      <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase ${
                        r.health > 95 ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                      }`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-black text-primary-50 group-hover:text-primary-100 transition-colors">{r.latency}</p>
                      <span className="text-[10px] font-bold text-gray-400">RTT</span>
                    </div>
                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                          <span>Node Health</span>
                          <span>{r.health}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full transition-all duration-1000 ease-out ${
                                r.health > 95 ? "bg-green-500" : "bg-orange-500"
                            }`} 
                            style={{ width: `${r.health}%` }} 
                          />
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary-50 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-50/20 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 text-[10rem] opacity-5 transition-transform group-hover:scale-110">
              <IoPieChartOutline />
            </div>
            <h3 className="text-lg font-black mb-4 flex items-center gap-3">
              <IoPieChartOutline />
              Global User Base
            </h3>
            <div className="space-y-4 relative z-10">
              {[
                { label: "Institutional Admins", val: "12%", color: "bg-white/40" },
                { label: "Educators", val: "28%", color: "bg-white/20" },
                { label: "Active Students", val: "60%", color: "bg-white/10" },
              ].map((r, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>{r.label}</span>
                    <span>{r.val}</span>
                  </div>
                  <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                    <div className={`${r.color} h-full rounded-full transition-all duration-1000`} style={{ width: r.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-primary-50 flex items-center gap-3">
              <IoCalendarOutline className="text-primary-100" />
              Intelligence Hub
            </h3>
            <div className="space-y-3">
              {[
                { title: "System Audit Report", time: "Every Monday" },
                { title: "Revenue Forecast Q3", time: "Monthly" },
                { title: "Security Vector Scan", time: "Daily" },
              ].map((report, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 bg-gray-100/50 rounded-2xl border border-transparent hover:border-primary-100/30 hover:bg-white transition-all text-left">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{report.time}</p>
                    <p className="text-xs font-black text-gray-700">{report.title}</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <IoDownloadOutline className="text-primary-50 text-sm" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytic;

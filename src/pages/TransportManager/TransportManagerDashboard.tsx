import {
  IoBusOutline,
  IoCashOutline,
  IoConstructOutline,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoWarningOutline,
} from "react-icons/io5";

const TransportManagerDashboard = () => {
  const stats = [
    {
      title: "Active Vehicles",
      value: "14",
      subtext: "Total Fleet: 16",
      icon: <IoBusOutline className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Drivers",
      value: "18",
      subtext: "2 on leave",
      icon: <IoPeopleOutline className="w-6 h-6" />,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-600",
    },
    {
      title: "Maintenance Alert",
      value: "3",
      subtext: "Vehicles due soon",
      icon: <IoConstructOutline className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "Monthly Revenue",
      value: "$45.2k",
      subtext: "+12% vs last month",
      icon: <IoCashOutline className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-6 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transport Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of fleet operations and logistics</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-50 transition-colors shadow-lg shadow-primary-50/30 text-sm font-medium">
                Generate Report
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.lightColor}`}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                Live
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <p className="text-xs text-green-600 font-medium">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Fleet Activity</h2>
            <select className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none">
                <option>This Week</option>
                <option>This Month</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[
              { label: "Mon", value: 45 },
              { label: "Tue", value: 52 },
              { label: "Wed", value: 49 },
              { label: "Thu", value: 60 },
              { label: "Fri", value: 55 },
              { label: "Sat", value: 22 },
              { label: "Sun", value: 18 },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-full group h-full justify-end">
                 <div className="relative w-full max-w-[50px] bg-gray-100 rounded-t-lg flex items-end overflow-hidden h-full">
                    <div 
                        className="w-full bg-blue-500 rounded-t-lg group-hover:bg-blue-600 transition-all duration-300 relative"
                        style={{ height: `${(item.value / 70) * 100}%` }}
                    >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.value} Trips
                        </div>
                    </div>
                 </div>
                 <span className="text-xs font-medium text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Operations Feed</h2>
          <div className="space-y-4">
            {[
                { title: "Bus #14 Maintenance Due", time: "2 hours ago", type: "warning", icon: <IoWarningOutline /> },
                { title: "Route A-12 Completed", time: "4 hours ago", type: "success", icon: <IoTrendingUpOutline /> },
                { title: "New Driver Added", time: "Yesterday", type: "info", icon: <IoPeopleOutline /> },
            ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${item.type === 'warning' ? 'bg-amber-100 text-amber-600' : item.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {item.icon}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                        <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportManagerDashboard;

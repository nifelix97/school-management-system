import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCashOutline,
    IoChatbubbleEllipsesOutline,
    IoCheckmarkCircleOutline,
    IoCloudDownloadOutline,
    IoHeartOutline,
    IoMegaphoneOutline,
    IoPeopleOutline,
    IoPulseOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon, color, bg }) => (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group overflow-hidden relative">
        <div className="flex items-start justify-between relative z-10">
            <div className={`${bg} ${color} p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                <IoTrendingUpOutline />
                {trend}
            </div>
        </div>
        <div className="mt-6 relative z-10">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h3>
            <p className="text-3xl font-black text-primary-50 tracking-tight">{value}</p>
        </div>
        {/* Subtle background icon */}
        <div className={`absolute -right-4 -bottom-4 text-8xl ${color} opacity-5 transition-transform group-hover:scale-110 group-hover:rotate-12`}>
            {icon}
        </div>
    </div>
);

const GuildDashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("This Semester");

    const metrics = [
        {
            title: "Student Registry",
            value: "14,284",
            trend: "+4.2%",
            icon: <IoPeopleOutline />,
            color: "text-primary-50",
            bg: "bg-primary-50/10",
        },
        {
            title: "Association Fund",
            value: "FRW 52.4M",
            trend: "+12.5%",
            icon: <IoCashOutline />,
            color: "text-primary-100",
            bg: "bg-primary-100/10",
        },
        {
            title: "Welfare Cases",
            value: "28 Active",
            trend: "-15%",
            icon: <IoHeartOutline />,
            color: "text-primary-200",
            bg: "bg-primary-200/10",
        },
        {
            title: "Academic Liaison",
            value: "94% Resolved",
            trend: "+2.1%",
            icon: <IoSchoolOutline />,
            color: "text-primary-300",
            bg: "bg-primary-300/10",
        },
    ];

    const grievances = [
        { id: "G-1024", student: "Namulinda Sarah", type: "Security", status: "Priority", time: "10m ago" },
        { id: "G-1025", student: "Kato Ivan", type: "Academics", status: "Open", time: "1h ago" },
        { id: "G-1026", student: "Mugerwa Paul", type: "Financial", status: "Resolved", time: "3h ago" },
        { id: "G-1027", student: "Akello Mary", type: "Health", status: "Escalated", time: "5h ago" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoMegaphoneOutline className="text-primary-100" />
                        Guild Presidential Hub
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Empowering students through leadership, advocacy, and service.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                        {["Today", "This Week", "This Semester"].map((p) => (
                            <button
                                key={p}
                                onClick={() => setSelectedPeriod(p)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    selectedPeriod === p ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "text-gray-400 hover:text-primary-50"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-100 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all active:scale-95">
                        <IoCloudDownloadOutline className="text-base" />
                        Treasury Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoMegaphoneOutline className="text-base" />
                        Release Communiqué
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <MetricCard key={i} {...m} />
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Section - Grievances */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-primary-50/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-100/10 text-primary-100 rounded-2xl">
                                <IoChatbubbleEllipsesOutline className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-primary-50">Student Grievances</h2>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Live Desk Monitoring</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-primary-100 uppercase tracking-widest hover:text-primary-50 transition-colors">View All Desk</button>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student / ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Urgency</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {grievances.map((g) => (
                                    <tr key={g.id} className="hover:bg-gray-50/50 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-50/5 rounded-xl flex items-center justify-center text-primary-50 font-black text-xs border border-primary-50/5">
                                                    {g.student.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-primary-50 group-hover:text-primary-100 transition-colors">{g.student}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{g.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary-100 animate-pulse" />
                                                <span className="text-xs font-black text-gray-600 uppercase tracking-wider">{g.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                                g.status === 'Priority' ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' :
                                                g.status === 'Escalated' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                                g.status === 'Resolved' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                                {g.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                                                <IoTimeOutline className="text-xs" />
                                                {g.time}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-primary-50 hover:text-white transition-all">
                                                <IoPulseOutline />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Section - Quick Actions & Stats */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Presidential Status */}
                    <div className="bg-primary-50 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-50/20 relative overflow-hidden group">
                        <div className="absolute -right-5 -bottom-5 text-8xl opacity-10 transition-transform group-hover:scale-110">
                            <IoPulseOutline />
                        </div>
                        <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                            <IoPulseOutline className="text-primary-100" />
                            Office Health
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                { label: "Advocacy Rating", val: 92, color: "bg-primary-100" },
                                { label: "Treasury Health", val: 78, color: "bg-green-400" },
                                { label: "Grievance Response", val: 96, color: "bg-blue-400" },
                            ].map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
                                        <span>{s.label}</span>
                                        <span>{s.val}%</span>
                                    </div>
                                    <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                                        <div className={`h-full ${s.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${s.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-primary-50 flex items-center gap-3">
                            <IoCalendarOutline className="text-primary-100" />
                            Social Calendar
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: "Freshers' Ball 2024", date: "24 Dec, 2024", icon: <IoPeopleOutline />, color: "bg-blue-500" },
                                { title: "Guild Budget Defense", date: "05 Jan, 2024", icon: <IoSchoolOutline />, color: "bg-purple-500" },
                                { title: "Sports Gala Kickoff", date: "12 Jan, 2024", icon: <IoStatsChartOutline />, color: "bg-orange-500" },
                            ].map((e, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-white border border-transparent hover:border-primary-100/20 transition-all cursor-pointer group">
                                    <div className={`w-12 h-12 ${e.color} text-white rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                                        {e.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-gray-700">{e.title}</p>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{e.date}</span>
                                    </div>
                                    <IoCheckmarkCircleOutline className="text-gray-200 text-xl group-hover:text-green-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-[10px] font-black text-primary-50 uppercase tracking-widest border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
                            Manage Full Schedule
                        </button>
                    </div>

                    {/* Critical Alert */}
                    <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 flex items-start gap-4">
                        <div className="p-3 bg-red-600 text-white rounded-xl shadow-lg shadow-red-600/20">
                            <IoWarningOutline className="text-xl" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Office Alert</p>
                            <p className="text-xs font-bold text-gray-700 leading-relaxed">System identified a 12% drop in student engagement at Faculty of Law. Meeting required.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuildDashboard;

import React from "react";
import {
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoGiftOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoStarOutline,
    IoTimeOutline,
    IoTrophyOutline
} from "react-icons/io5";

const AlumniDashboard: React.FC = () => {
    // Statistics Data
    const stats = [
        {
            title: "Alumni Network",
            value: "2,847",
            change: "+124",
            trend: "up",
            icon: <IoPeopleOutline className="w-5 h-5 sm:w-6 sm:h-6" />,
            gradient: "from-blue-500 to-blue-600",
        },
        {
            title: "Upcoming Events",
            value: "8",
            change: "+3",
            trend: "up",
            icon: <IoCalendarOutline className="w-5 h-5 sm:w-6 sm:h-6" />,
            gradient: "from-purple-500 to-purple-600",
        },
        {
            title: "Active Mentorships",
            value: "156",
            change: "+12",
            trend: "up",
            icon: <IoSchoolOutline className="w-5 h-5 sm:w-6 sm:h-6" />,
            gradient: "from-emerald-500 to-emerald-600",
        },
        {
            title: "Total Donations",
            value: "$45.2K",
            change: "+$8.5K",
            trend: "up",
            icon: <IoGiftOutline className="w-5 h-5 sm:w-6 sm:h-6" />,
            gradient: "from-amber-500 to-amber-600",
        },
    ];

    // Upcoming Events
    const upcomingEvents = [
        {
            id: 1,
            title: "Annual Alumni Reunion 2025",
            date: "Jan 15, 2025",
            time: "6:00 PM",
            location: "Main Campus",
            attendees: 245,
            type: "Reunion",
            color: "bg-blue-500",
        },
        {
            id: 2,
            title: "Networking Mixer",
            date: "Jan 22, 2025",
            time: "7:00 PM",
            location: "Downtown Center",
            attendees: 89,
            type: "Networking",
            color: "bg-purple-500",
        },
    ];

    // Recent Achievements
    const recentAchievements = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            achievement: "Published research in AI ethics",
            year: "Class of 2015",
            icon: <IoTrophyOutline className="w-4 h-4" />,
            color: "text-amber-600",
        },
        {
            id: 2,
            name: "Michael Chen",
            achievement: "Promoted to VP of Engineering",
            year: "Class of 2018",
            icon: <IoBriefcaseOutline className="w-4 h-4" />,
            color: "text-blue-600",
        },
        {
            id: 3,
            name: "Emma Williams",
            achievement: "Founded EdTech startup",
            year: "Class of 2017",
            icon: <IoStarOutline className="w-4 h-4" />,
            color: "text-purple-600",
        },
    ];

    // Career Opportunities
    const careerOpportunities = [
        {
            id: 1,
            title: "Senior Software Engineer",
            company: "Tech Innovations Inc.",
            location: "Remote",
            type: "Full-time",
            postedBy: "Alumni Network",
        },
        {
            id: 2,
            title: "Marketing Director",
            company: "Global Solutions",
            location: "New York, NY",
            type: "Full-time",
            postedBy: "Sarah Johnson '15",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto overflow-x-hidden">
            {/* Header & Quick Actions Bar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        Welcome Back, Alumni!
                    </h1>
                    <p className="text-sm text-gray-500">
                        Stay connected with your alma mater and fellow graduates.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                        { icon: <IoPeopleOutline />, label: "Find Alumni", bg: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
                        { icon: <IoSchoolOutline />, label: "Mentorship", bg: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
                        { icon: <IoGiftOutline />, label: "Donations", bg: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
                        { icon: <IoCheckmarkCircleOutline />, label: "Profile", bg: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
                    ].map((action, i) => (
                        <button key={i} className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm border border-transparent hover:border-black/5 ${action.bg}`}>
                            {action.icon}
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                        <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm shrink-0`}>
                            {stat.icon}
                        </div>
                        <div className="min-w-0">
                            <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 font-black uppercase tracking-widest truncate">{stat.title}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                {/* Left Content - Events & Career */}
                <div className="xl:col-span-8 space-y-4">
                    {/* Events Grid */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoCalendarOutline className="text-primary-50" />
                                Upcoming Events
                            </h2>
                            <button className="text-[10px] font-black uppercase tracking-widest text-primary-100 hover:text-primary-50">View Calendar</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {upcomingEvents.map(event => (
                                <div key={event.id} className="p-3 bg-gray-50/50 rounded-xl border border-gray-100 flex gap-3 group hover:border-primary-50/30 transition-all cursor-pointer">
                                    <div className={`w-12 h-12 ${event.color} rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-sm shadow-black/10`}>
                                        <span className="text-[9px] font-black uppercase leading-tight opacity-80">{event.date.split(' ')[0]}</span>
                                        <span className="text-lg font-bold leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                                    </div>
                                    <div className="min-w-0 flex-1 py-0.5">
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-primary-50 transition-colors uppercase tracking-tight">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold mt-1">
                                            <span className="flex items-center gap-1 uppercase tracking-tighter"><IoTimeOutline className="text-xs" /> {event.time}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span className="flex items-center gap-1 uppercase tracking-tighter truncate"><IoLocationOutline className="text-xs" /> {event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career Summary */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoBriefcaseOutline className="text-primary-50" />
                                Carrier Hub
                            </h2>
                            <button className="text-[10px] font-black uppercase tracking-widest text-primary-100 hover:text-primary-50">Job Board</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {careerOpportunities.map(job => (
                                <div key={job.id} className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-sm hover:border-primary-50/20 transition-all group">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-primary-50 transition-colors">{job.title}</h3>
                                        <p className="text-[10px] text-gray-500 font-bold tracking-tight uppercase mt-0.5">{job.company} • {job.location}</p>
                                    </div>
                                    <button className="px-3 py-1.5 bg-primary-50/5 text-primary-50 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary-50 hover:text-white transition-all shadow-sm">
                                        Apply
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content - Spotlight */}
                <div className="xl:col-span-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-full flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <IoTrophyOutline className="text-primary-50" />
                            Alumni Spotlight
                        </h2>
                        <div className="space-y-6 flex-1">
                            {recentAchievements.map(achievement => (
                                <div key={achievement.id} className="flex gap-3 group relative">
                                    <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${achievement.color} shrink-0 border border-gray-100 shadow-sm group-hover:scale-110 transition-transform`}>
                                        {achievement.icon}
                                    </div>
                                    <div className="min-w-0 pt-0.5">
                                        <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-primary-50 transition-colors">
                                            {achievement.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium leading-tight my-1 line-clamp-2">
                                            {achievement.achievement}
                                        </p>
                                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{achievement.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-50 hover:text-white transition-all shadow-sm">
                            Submit Achievement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniDashboard;

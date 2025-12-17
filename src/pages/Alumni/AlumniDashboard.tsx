
import React from "react";
import {
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoGiftOutline,
    IoHeartOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoStarOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoTrophyOutline,
} from "react-icons/io5";

const AlumniDashboard: React.FC = () => {
    // Statistics Data
    const stats = [
        {
            title: "Alumni Network",
            value: "2,847",
            change: "+124",
            trend: "up",
            icon: <IoPeopleOutline className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Upcoming Events",
            value: "8",
            change: "+3",
            trend: "up",
            icon: <IoCalendarOutline className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
        {
            title: "Active Mentorships",
            value: "156",
            change: "+12",
            trend: "up",
            icon: <IoSchoolOutline className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Total Donations",
            value: "$45.2K",
            change: "+$8.5K",
            trend: "up",
            icon: <IoGiftOutline className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
    ];

    // Upcoming Events
    const upcomingEvents = [
        {
            id: 1,
            title: "Annual Alumni Reunion 2025",
            date: "Jan 15, 2025",
            time: "6:00 PM",
            location: "Main Campus Auditorium",
            attendees: 245,
            type: "Reunion",
            color: "bg-blue-500",
        },
        {
            id: 2,
            title: "Career Networking Mixer",
            date: "Jan 22, 2025",
            time: "7:00 PM",
            location: "Downtown Conference Center",
            attendees: 89,
            type: "Networking",
            color: "bg-purple-500",
        },
        {
            id: 3,
            title: "Alumni Awards Ceremony",
            date: "Feb 5, 2025",
            time: "5:30 PM",
            location: "Grand Hall",
            attendees: 312,
            type: "Awards",
            color: "bg-amber-500",
        },
    ];

    // Recent Achievements
    const recentAchievements = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            achievement: "Published groundbreaking research in AI ethics",
            year: "Class of 2015",
            icon: <IoTrophyOutline className="w-5 h-5" />,
            color: "text-amber-600",
        },
        {
            id: 2,
            name: "Michael Chen",
            achievement: "Promoted to VP of Engineering at Tech Corp",
            year: "Class of 2018",
            icon: <IoBriefcaseOutline className="w-5 h-5" />,
            color: "text-blue-600",
        },
        {
            id: 3,
            name: "Emma Williams",
            achievement: "Founded successful EdTech startup",
            year: "Class of 2017",
            icon: <IoStarOutline className="w-5 h-5" />,
            color: "text-purple-600",
        },
        {
            id: 4,
            name: "James Rodriguez",
            achievement: "Received Community Service Award",
            year: "Class of 2016",
            icon: <IoHeartOutline className="w-5 h-5" />,
            color: "text-emerald-600",
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
            company: "Global Marketing Solutions",
            location: "New York, NY",
            type: "Full-time",
            postedBy: "Sarah Johnson '15",
        },
        {
            id: 3,
            title: "Data Scientist",
            company: "Analytics Pro",
            location: "San Francisco, CA",
            type: "Contract",
            postedBy: "Alumni Network",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                    Welcome Back, Alumni!
                </h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Stay connected with your alma mater and fellow graduates.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md w-fit group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-2">
                                    {stat.title}
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                                    <span>{stat.change} this month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Upcoming Events */}
                <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                            <IoCalendarOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                            Upcoming Events
                        </h2>
                        <button className="text-sm text-primary-100 hover:text-primary-50 font-medium">
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className="group bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-primary-100 transition-all duration-300"
                            >
                                <div className="flex gap-4">
                                    <div className={`flex-shrink-0 w-16 h-16 ${event.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                                        <IoCalendarOutline className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-100 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mb-2">
                                            <span className="flex items-center gap-1">
                                                <IoCalendarOutline className="w-4 h-4" />
                                                {event.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IoTimeOutline className="w-4 h-4" />
                                                {event.time}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <IoLocationOutline className="w-4 h-4" />
                                                {event.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IoPeopleOutline className="w-4 h-4" />
                                                {event.attendees} attending
                                            </span>
                                        </div>
                                    </div>
                                    <button className="hidden sm:block px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium self-start">
                                        Register
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <IoTrophyOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                        Recent Achievements
                    </h2>

                    <div className="space-y-4">
                        {recentAchievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                            >
                                <div className="flex gap-3">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${achievement.color}`}>
                                        {achievement.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                                            {achievement.name}
                                        </h4>
                                        <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                                            {achievement.achievement}
                                        </p>
                                        <span className="text-xs text-gray-500">{achievement.year}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View All Achievements
                    </button>
                </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                        <IoBriefcaseOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                        Career Opportunities
                    </h2>
                    <button className="text-sm text-primary-100 hover:text-primary-50 font-medium">
                        View All Jobs
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {careerOpportunities.map((job) => (
                        <div
                            key={job.id}
                            className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
                        >
                            <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary-100 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-gray-700 font-medium mb-3">{job.company}</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <IoLocationOutline className="w-4 h-4 text-primary-50" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
                                        {job.type}
                                    </span>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-3">Posted by {job.postedBy}</p>
                                <button className="w-full px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all group">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            <IoPeopleOutline className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Find Alumni</span>
                    </div>
                </button>

                <button className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all group">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                            <IoSchoolOutline className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Become Mentor</span>
                    </div>
                </button>

                <button className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all group">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                            <IoGiftOutline className="w-6 h-6 text-amber-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Make Donation</span>
                    </div>
                </button>

                <button className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all group">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                            <IoCheckmarkCircleOutline className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Update Profile</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default AlumniDashboard;

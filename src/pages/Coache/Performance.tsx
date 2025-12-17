import React, { useState } from "react";
import {
    IoCheckmarkCircleOutline,
    IoFootballOutline,
    IoPodiumOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface PlayerStat {
    id: number;
    name: string;
    position: string;
    matchesPlayed: number;
    goals: number; // or points
    assists: number;
    rating: number; // 0-10
    trend: "up" | "down" | "stable";
    avatar?: string;
}

interface TeamStat {
    title: string;
    value: string | number;
    change: number; // percentage
    icon: React.ReactNode;
}

const CoachPerformance: React.FC = () => {
    const [selectedTeam, setSelectedTeam] = useState("Varsity Soccer");
    
    // Mock Data
    const teamStats: TeamStat[] = [
        { title: "Win Rate", value: "72%", change: 5.4, icon: <IoTrophyOutline /> },
        { title: "Goals Scored", value: 45, change: 12.1, icon: <IoFootballOutline /> },
        { title: "Avg. Possession", value: "58%", change: -2.3, icon: <IoStatsChartOutline /> },
        { title: "Clean Sheets", value: 8, change: 0, icon: <IoCheckmarkCircleOutline /> }
    ];

    const players: PlayerStat[] = [
        { id: 1, name: "Alex Johnson", position: "Striker", matchesPlayed: 12, goals: 15, assists: 4, rating: 9.2, trend: "up" },
        { id: 2, name: "Sam Smith", position: "Midfielder", matchesPlayed: 11, goals: 3, assists: 12, rating: 8.8, trend: "stable" },
        { id: 3, name: "Jordan Lee", position: "Defender", matchesPlayed: 12, goals: 1, assists: 2, rating: 7.5, trend: "down" },
        { id: 4, name: "Casey West", position: "Goalkeeper", matchesPlayed: 12, goals: 0, assists: 1, rating: 8.5, trend: "up" },
        { id: 5, name: "Jamie Doe", position: "Winger", matchesPlayed: 10, goals: 5, assists: 6, rating: 8.1, trend: "stable" },
    ];

    const upcomingMatches = [
        { opponent: "St. Mary's", date: "Oct 24", prediction: 65 },
        { opponent: "North High", date: "Oct 28", prediction: 45 },
        { opponent: "City College", date: "Nov 02", prediction: 80 },
    ];

    const getTrendIcon = (trend: string) => {
        switch(trend) {
            case "up": return <IoTrendingUpOutline className="text-green-500" />;
            case "down": return <IoTrendingDownOutline className="text-red-500" />;
            default: return <div className="w-4 h-0.5 bg-gray-400"></div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <IoPodiumOutline className="text-primary-100" /> Team Performance
                        </h1>
                        <p className="text-gray-500 mt-1">Analyze statistics and track player development.</p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-gray-200 overflow-x-auto no-scrollbar max-w-full">
                        {["Varsity Soccer", "Varsity Basketball", "JV Volleyball"].map((team) => (
                            <button
                                key={team}
                                onClick={() => setSelectedTeam(team)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
                                    selectedTeam === team 
                                    ? "bg-gray-900 text-white" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {team}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {teamStats.map((stat, index) => (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-primary-100 text-xl">
                                    {stat.icon}
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.change > 0 ? "bg-green-50 text-green-600" : stat.change < 0 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                                    {stat.change > 0 ? "+" : ""}{stat.change}%
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Player Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <h3 className="text-lg font-bold text-gray-900">Top Performers</h3>
                            <div className="relative w-full sm:w-auto">
                                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search player..." 
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary-100"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Player</th>
                                        <th className="px-6 py-4 text-center">Matches</th>
                                        <th className="px-6 py-4 text-center">Goals/Pts</th>
                                        <th className="px-6 py-4 text-center">Rating</th>
                                        <th className="px-6 py-4 text-center">Trend</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {players.map((player) => (
                                        <tr key={player.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary-100/10 flex items-center justify-center text-primary-100 font-bold">
                                                        {player.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">{player.name}</p>
                                                        <p className="text-xs text-gray-500">{player.position}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-gray-600">{player.matchesPlayed}</td>
                                            <td className="px-6 py-4 text-center text-sm font-bold text-gray-900">{player.goals}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                                    player.rating >= 9 ? "bg-green-100 text-green-700" :
                                                    player.rating >= 7 ? "bg-blue-100 text-blue-700" :
                                                    "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                    {player.rating}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center">{getTrendIcon(player.trend)}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Side Widgets */}
                    <div className="space-y-6">
                        {/* Match Predictions */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Win Probability</h3>
                            <div className="space-y-4">
                                {upcomingMatches.map((match, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm font-medium mb-1">
                                            <span className="text-gray-700">vs {match.opponent}</span>
                                            <span className="text-gray-500">{match.date}</span>
                                        </div>
                                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`absolute left-0 top-0 h-full rounded-full ${
                                                    match.prediction > 60 ? "bg-green-500" : 
                                                    match.prediction > 40 ? "bg-yellow-500" : "bg-red-500"
                                                }`}
                                                style={{ width: `${match.prediction}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-right text-xs font-bold mt-1 text-gray-500">{match.prediction}% Chance</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="bg-primary-100 p-6 rounded-2xl text-white shadow-lg shadow-primary-100/30">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold">Recent Impact</h3>
                                    <p className="text-white/80 text-sm">Last 5 Matches</p>
                                </div>
                                <IoTrophyOutline className="w-8 h-8 text-white/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                    <p className="text-xs text-white/70 uppercase font-bold">Goals</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                    <p className="text-xs text-white/70 uppercase font-bold">Conc. Goals</p>
                                    <p className="text-2xl font-bold">4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachPerformance;

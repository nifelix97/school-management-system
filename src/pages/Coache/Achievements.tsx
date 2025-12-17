import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCloseOutline,
    IoMedalOutline,
    IoPodiumOutline,
    IoRibbonOutline,
    IoSearchOutline,
    IoStarOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface Achievement {
    id: number;
    title: string;
    description: string;
    team: string; // or Player Name
    date: string;
    type: "Trophy" | "Medal" | "Certificate";
    icon?: React.ReactNode;
}

const CoachAchievements: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("All");
    const [showAddModal, setShowAddModal] = useState(false);

    // Mock Data
    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: 1,
            title: "State Championship Winner",
            description: "Varsity Soccer Team secured 1st place in the regional finals.",
            team: "Varsity Soccer",
            date: "2024-05-20",
            type: "Trophy"
        },
        {
            id: 2,
            title: "MVP of the Season",
            description: "Awarded to Alex Johnson for outstanding performance.",
            team: "Alex Johnson",
            date: "2024-06-15",
            type: "Medal"
        },
        {
            id: 3,
            title: "Fair Play Award",
            description: "Team demonstrated exceptional sportsmanship throughout the league.",
            team: "JV Volleyball",
            date: "2024-04-10",
            type: "Certificate"
        },
        {
            id: 4,
            title: "District Runners-Up",
            description: "Varsity Basketball Team reached the finals.",
            team: "Varsity Basketball",
            date: "2024-03-12",
            type: "Trophy"
        }
    ]);

    const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({
        type: "Trophy"
    });

    const handleAddAchievement = (e: React.FormEvent) => {
        e.preventDefault();
        const achievement: Achievement = {
            id: Math.random(),
            title: newAchievement.title!,
            description: newAchievement.description!,
            team: newAchievement.team!,
            date: newAchievement.date || new Date().toISOString().split('T')[0],
            type: newAchievement.type as any
        };
        setAchievements([achievement, ...achievements]);
        setShowAddModal(false);
        setNewAchievement({ type: "Trophy" });
    };

    const filteredAchievements = achievements.filter(item => 
        (filterType === "All" || item.type === filterType) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         item.team.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getIcon = (type: string) => {
        switch(type) {
            case "Trophy": return <IoTrophyOutline className="w-8 h-8 text-yellow-500" />;
            case "Medal": return <IoMedalOutline className="w-8 h-8 text-orange-400" />;
            case "Certificate": return <IoRibbonOutline className="w-8 h-8 text-blue-500" />;
            default: return <IoStarOutline className="w-8 h-8 text-primary-100" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case "Trophy": return "bg-yellow-50 text-yellow-700 border-yellow-200";
            case "Medal": return "bg-orange-50 text-orange-700 border-orange-200";
            case "Certificate": return "bg-blue-50 text-blue-700 border-blue-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${showAddModal ? "filter blur-sm pointer-events-none" : ""}`}>
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <IoStarOutline className="text-primary-100" /> Achievements
                        </h1>
                        <p className="text-gray-500 mt-1">Celebrate victories and honor player milestones.</p>
                    </div>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-100 text-white rounded-xl hover:bg-primary-100/90 font-bold transition-colors shadow-lg shadow-primary-100/30 whitespace-nowrap"
                    >
                        <IoAddOutline className="w-5 h-5" /> Add Achievement
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search awards, teams, or players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 focus:ring-1 focus:ring-primary-100 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        {(["All", "Trophy", "Medal", "Certificate"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors whitespace-nowrap ${
                                    filterType === type 
                                    ? "bg-primary-100 text-white border-primary-100" 
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group p-6 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                {getIcon(item.type)}
                            </div>
                            
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border mb-3 ${getTypeColor(item.type)}`}>
                                {item.type}
                            </span>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                            
                            <div className="w-full border-t border-gray-100 pt-4 mt-auto flex justify-between items-center text-xs font-medium text-gray-500">
                                <span className="flex items-center gap-1">
                                    <IoPodiumOutline /> {item.team}
                                </span>
                                <span className="flex items-center gap-1">
                                    <IoCalendarOutline /> {item.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAchievements.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <IoTrophyOutline className="w-12 h-12" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No achievements found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Add Achievement Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 animate-scaleIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Add New Achievement</h3>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddAchievement} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newAchievement.title || ""}
                                    onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    placeholder="e.g. Regional Champions"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    required
                                    value={newAchievement.description || ""}
                                    onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none resize-none h-24" 
                                    placeholder="Brief details about the achievement..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Team / Player</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newAchievement.team || ""}
                                        onChange={(e) => setNewAchievement({...newAchievement, team: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                        placeholder="e.g. Varsity Soccer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={newAchievement.date || ""}
                                        onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Award Type</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(["Trophy", "Medal", "Certificate"] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setNewAchievement({...newAchievement, type})}
                                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                                                newAchievement.type === type
                                                ? "bg-primary-100 text-white border-primary-100"
                                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                            }`}
                                        >
                                            <span className="text-xl">
                                                {type === "Trophy" && <IoTrophyOutline />}
                                                {type === "Medal" && <IoMedalOutline />}
                                                {type === "Certificate" && <IoRibbonOutline />}
                                            </span>
                                            <span className="text-xs font-bold">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-100/90 transition-colors shadow-lg shadow-primary-100/20 mt-4">
                                Save Achievement
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoachAchievements;

import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoFilterOutline,
    IoPencilOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoStatsChartOutline,
    IoTrashOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface Player {
    id: number;
    name: string;
    position: string;
    number: number;
    status: "Active" | "Injured" | "Suspended";
    avatar?: string;
}

interface Team {
    id: number;
    name: string;
    sport: string;
    season: "Fall" | "Winter" | "Spring" | "Year-round";
    members: number;
    wins: number;
    losses: number;
    draws: number;
    nextMatch: {
        opponent: string;
        date: string;
        time: string;
    };
    roster: Player[];
    color: string;
}

const MyTeams: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    
    // Modal States
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showEditTeamModal, setShowEditTeamModal] = useState(false);

    // Form States
    const [newTeam, setNewTeam] = useState({ name: "", sport: "Basketball", season: "Winter" });
    const [newPlayer, setNewPlayer] = useState({ name: "", position: "", number: "" });
    const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);

    // Mock Data State - Moved to state to allow updates
    const [teams, setTeams] = useState<Team[]>([
        {
            id: 1,
            name: "Varsity Basketball (Boys)",
            sport: "Basketball",
            season: "Winter",
            members: 12,
            wins: 8,
            losses: 2,
            draws: 0,
            nextMatch: { opponent: "St. Patrick's", date: "Dec 18", time: "16:00" },
            color: "bg-orange-600",
            roster: [
                { id: 1, name: "Michael Jordan", position: "Guard", number: 23, status: "Active" },
                { id: 2, name: "LeBron James", position: "Forward", number: 6, status: "Active" },
                { id: 3, name: "Steph Curry", position: "Guard", number: 30, status: "Injured" },
            ]
        },
        {
            id: 2,
            name: "Varsity Soccer (Girls)",
            sport: "Soccer",
            season: "Fall",
            members: 18,
            wins: 10,
            losses: 1,
            draws: 2,
            nextMatch: { opponent: "North High", date: "Dec 19", time: "14:30" },
            color: "bg-emerald-600",
            roster: [
                { id: 4, name: "Mia Hamm", position: "Forward", number: 9, status: "Active" },
                { id: 5, name: "Alex Morgan", position: "Striker", number: 13, status: "Active" },
            ]
        },
        {
            id: 3,
            name: "JV Volleyball (Mixed)",
            sport: "Volleyball",
            season: "Spring",
            members: 10,
            wins: 4,
            losses: 4,
            draws: 0,
            nextMatch: { opponent: "City College", date: "Jan 12", time: "15:00" },
            color: "bg-purple-600",
            roster: [
                { id: 6, name: "Karch Kiraly", position: "Setter", number: 1, status: "Active" },
            ]
        },
        {
            id: 4,
            name: "Swimming Squad",
            sport: "Swimming",
            season: "Year-round",
            members: 24,
            wins: 5,
            losses: 0,
            draws: 0,
            nextMatch: { opponent: "Inter-High Meet", date: "Dec 22", time: "09:00" },
            color: "bg-blue-600",
            roster: [
                { id: 7, name: "Michael Phelps", position: "Freestyle", number: 1, status: "Active" },
            ]
        }
    ]);

    const handleCreateTeam = (e: React.FormEvent) => {
        e.preventDefault();
        const team: Team = {
            id: teams.length + 1,
            name: newTeam.name,
            sport: newTeam.sport,
            season: newTeam.season as any,
            members: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            nextMatch: { opponent: "TBD", date: "TBD", time: "TBD" },
            color: "bg-indigo-600",
            roster: []
        };
        setTeams([...teams, team]);
        setShowCreateModal(false);
        setNewTeam({ name: "", sport: "Basketball", season: "Winter" });
    };

    const handleSavePlayer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeam) return;

        let updatedRoster;
        
        if (editingPlayerId) {
            // Edit existing player
            updatedRoster = selectedTeam.roster.map(p => 
                p.id === editingPlayerId 
                ? { ...p, name: newPlayer.name, position: newPlayer.position, number: parseInt(newPlayer.number) || 0 }
                : p
            );
        } else {
            // Add new player
            const player: Player = {
                id: Math.random(),
                name: newPlayer.name,
                position: newPlayer.position,
                number: parseInt(newPlayer.number) || 0,
                status: "Active"
            };
            updatedRoster = [...selectedTeam.roster, player];
        }

        const updatedTeam = {
            ...selectedTeam,
            members: updatedRoster.length,
            roster: updatedRoster
        };

        // Update local selected team state (for immediate UI update)
        setSelectedTeam(updatedTeam);

        // Update main teams list state
        setTeams(teams.map(t => t.id === selectedTeam.id ? updatedTeam : t));

        setShowAddPlayerModal(false);
        setNewPlayer({ name: "", position: "", number: "" });
        setEditingPlayerId(null);
    };

    const handleEditPlayerClick = (player: Player) => {
        setNewPlayer({
            name: player.name,
            position: player.position,
            number: player.number.toString()
        });
        setEditingPlayerId(player.id);
        setShowAddPlayerModal(true);
    };

    const handleDeletePlayer = (playerId: number) => {
        if (!selectedTeam || !window.confirm("Are you sure you want to remove this player?")) return;

        const updatedRoster = selectedTeam.roster.filter(p => p.id !== playerId);
        
        const updatedTeam = {
            ...selectedTeam,
            members: updatedRoster.length,
            roster: updatedRoster
        };

        setSelectedTeam(updatedTeam);
        setTeams(teams.map(t => t.id === selectedTeam.id ? updatedTeam : t));
    };

    const filteredTeams = teams.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.sport.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${selectedTeam || showCreateModal || showAddPlayerModal || showScheduleModal || showEditTeamModal ? "filter blur-sm pointer-events-none" : ""}`}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            My Teams <span className="text-gray-400 text-lg font-medium">({teams.length})</span>
                        </h1>
                        <p className="text-gray-500 mt-1">Manage your team rosters, schedules, and performance.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md"
                    >
                        <IoAddOutline className="w-5 h-5" /> Create New Team
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search teams or sports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 focus:ring-1 focus:ring-primary-100 transition-all"
                        />
                    </div>
                    <button 
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                    >
                        <IoFilterOutline className="w-5 h-5" /> Filter
                    </button>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                        <div key={team.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                            {/* Card Header */}
                            <div className={`h-24 ${team.color} relative p-6`}>
                                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl">
                                    {team.sport === "Basketball" ? "🏀" : 
                                     team.sport === "Soccer" ? "⚽" : 
                                     team.sport === "Volleyball" ? "🏐" : "🏊"}
                                </div>
                                <span className="absolute top-4 right-4 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20">
                                    {team.season}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="pt-8 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{team.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{team.sport}</p>

                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Wins</p>
                                        <p className="text-lg font-bold text-green-600">{team.wins}</p>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Losses</p>
                                        <p className="text-lg font-bold text-red-500">{team.losses}</p>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Draws</p>
                                        <p className="text-lg font-bold text-gray-700">{team.draws}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-6 bg-blue-50/50 p-3 rounded-xl border border-blue-50">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <IoCalendarOutline />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-0.5">Next Match</p>
                                        <p className="font-medium text-gray-900">vs {team.nextMatch.opponent}</p>
                                        <p className="text-xs text-gray-500">{team.nextMatch.date} • {team.nextMatch.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                        <IoPeopleOutline className="w-4 h-4" />
                                        {team.members} Players
                                    </div>
                                    <button 
                                        onClick={() => setSelectedTeam(team)}
                                        className="text-primary-100 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all hover:text-primary-100/80"
                                    >
                                        View Details <IoChevronForwardOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Team Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 animate-scaleIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Create New Team</h3>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTeam} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newTeam.name}
                                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    placeholder="e.g. Varsity Basketball"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                                <select 
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                                    value={newTeam.sport}
                                    onChange={(e) => setNewTeam({...newTeam, sport: e.target.value})}
                                >
                                    <option>Basketball</option>
                                    <option>Soccer</option>
                                    <option>Volleyball</option>
                                    <option>Swimming</option>
                                    <option>Football</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                                <select 
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                                    value={newTeam.season}
                                    onChange={(e) => setNewTeam({...newTeam, season: e.target.value})}
                                >
                                    <option>Fall</option>
                                    <option>Winter</option>
                                    <option>Spring</option>
                                    <option>Year-round</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-3 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-100/90 transition-colors">
                                Create Team
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Team Details Modal */}
            {selectedTeam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedTeam(null)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                        {/* Modal Header */}
                        <div className={`p-8 ${selectedTeam.color} relative overflow-hidden`}>
                            <button 
                                onClick={() => setSelectedTeam(null)}
                                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors z-50"
                            >
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20 mb-3">
                                    {selectedTeam.season} Season
                                </span>
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedTeam.name}</h2>
                                <div className="flex items-center gap-6 text-white/90 text-sm font-medium">
                                    <span className="flex items-center gap-2"><IoShirtOutline /> {selectedTeam.sport}</span>
                                    <span className="flex items-center gap-2"><IoPeopleOutline /> {selectedTeam.members} Members</span>
                                    <span className="flex items-center gap-2"><IoTrophyOutline /> Record: {selectedTeam.wins}-{selectedTeam.losses}-{selectedTeam.draws}</span>
                                </div>
                            </div>
                            
                            {/* Decorational circles */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-black/10 blur-3xl"></div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left: Roster */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <IoPeopleOutline className="text-primary-100" /> Team Roster
                                        </h3>
                                        <button 
                                            onClick={() => {
                                                setNewPlayer({ name: "", position: "", number: "" });
                                                setEditingPlayerId(null);
                                                setShowAddPlayerModal(true);
                                            }}
                                            className="text-sm font-bold text-primary-100 hover:underline flex items-center gap-1"
                                        >
                                            <IoAddOutline /> Add Player
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedTeam.roster.length > 0 ? (
                                            selectedTeam.roster.map((player) => (
                                                <div key={player.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary-50 hover:bg-primary-50/5 transition-colors group">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-white group-hover:text-primary-100 group-hover:shadow-sm transition-all border border-gray-200">
                                                        {player.number}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900">{player.name}</h4>
                                                        <p className="text-xs text-gray-500">{player.position}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        player.status === "Active" ? "bg-green-100 text-green-700" :
                                                        player.status === "Injured" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                                                    }`}>
                                                        {player.status}
                                                    </span>
                                                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all">
                                                        <button 
                                                            onClick={() => handleEditPlayerClick(player)}
                                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit Player"
                                                        >
                                                            <IoPencilOutline className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeletePlayer(player.id)}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Player"
                                                        >
                                                            <IoTrashOutline className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-gray-400">
                                                No players yet. Add one to get started!
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Stats & Actions */}
                                <div className="w-full lg:w-80 space-y-6">
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <IoStatsChartOutline /> Performance
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                                                    <span>Win Rate</span>
                                                    <span>80%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                                                    <span>Attendance</span>
                                                    <span>92%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setShowScheduleModal(true)}
                                        className="w-full py-3 bg-primary-100 text-white rounded-xl font-bold shadow-md hover:bg-primary-100/90 transition-colors"
                                    >
                                        Manage Schedule
                                    </button>
                                    <button 
                                        onClick={() => setShowEditTeamModal(true)}
                                        className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Edit Team Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Player Modal */}
            {showAddPlayerModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setShowAddPlayerModal(false); setEditingPlayerId(null); setNewPlayer({ name: "", position: "", number: "" }); }}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 animate-scaleIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{editingPlayerId ? "Edit Player" : "Add Player to " + selectedTeam?.name}</h3>
                            <button onClick={() => { setShowAddPlayerModal(false); setEditingPlayerId(null); setNewPlayer({ name: "", position: "", number: "" }); }} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSavePlayer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newPlayer.name}
                                    onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Jersey Number</label>
                                    <input 
                                        type="number" 
                                        required
                                        value={newPlayer.number}
                                        onChange={(e) => setNewPlayer({...newPlayer, number: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                        placeholder="#"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newPlayer.position}
                                        onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                        placeholder="e.g. Guard"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-100/90 transition-colors">
                                {editingPlayerId ? "Save Changes" : "Add Player"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Simple Modals for Other Actions */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl p-6">
                        <div className="text-center py-6">
                            <IoCalendarOutline className="w-16 h-16 text-primary-100 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Management</h3>
                            <p className="text-gray-500 mb-6">Calendar and event features would appear here.</p>
                            <button onClick={() => setShowScheduleModal(false)} className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditTeamModal && (
                 <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEditTeamModal(false)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl p-6">
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Edit Team</h3>
                             <button onClick={() => setShowEditTeamModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-500 text-sm">Update settings for <strong>{selectedTeam?.name}</strong></p>
                            <input type="text" defaultValue={selectedTeam?.name} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" />
                             <button onClick={() => setShowEditTeamModal(false)} className="w-full py-3 bg-primary-100 text-white rounded-xl font-bold">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyTeams;

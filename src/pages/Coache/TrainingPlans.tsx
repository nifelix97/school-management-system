import React, { useState } from "react";
import {
    IoAddOutline,
    IoBarbellOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    // IoFilterOutline,
    IoFitnessOutline,
    IoSearchOutline,
    IoTimerOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: string;
    notes?: string;
}

interface TrainingPlan {
    id: number;
    title: string;
    team: string;
    focus: "Strength" | "Endurance" | "Strategy" | "Skill" | "Recovery";
    duration: string;
    status: "Active" | "Draft" | "Completed";
    progress: number;
    exercises: number;
    startDate: string;
    exerciseList: Exercise[]; // Added exercise list
}

const TrainingPlans: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterFocus, setFilterFocus] = useState<string>("All");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null); // Track selected plan for details
    
    // Mock Data
    const [plans, setPlans] = useState<TrainingPlan[]>([
        {
            id: 1,
            title: "Pre-Season Conditioning",
            team: "Varsity Basketball",
            focus: "Endurance",
            duration: "6 Weeks",
            status: "Active",
            progress: 65,
            exercises: 12,
            startDate: "2024-11-01",
            exerciseList: [
                { id: 101, name: "Sprint Intervals", sets: 10, reps: "30s sprint/30s rest", notes: "High intensity" },
                { id: 102, name: "Box Jumps", sets: 4, reps: "12", notes: "Focus on explosive power" },
                { id: 103, name: "Lateral Shuffles", sets: 3, reps: "1 min", notes: "Stay low" }
            ]
        },
        {
            id: 2,
            title: "Offensive Plays Drill",
            team: "Varsity Soccer",
            focus: "Strategy",
            duration: "2 Weeks",
            status: "Active",
            progress: 30,
            exercises: 8,
            startDate: "2024-12-10",
            exerciseList: [
                { id: 201, name: "Corner Kick Setups", sets: 5, reps: "10 mins", notes: "Rotate kickers" },
                { id: 202, name: "Through Ball Drills", sets: 4, reps: "15 mins", notes: "Timing is key" }
            ]
        },
        {
            id: 3,
            title: "Post-Game Recovery",
            team: "Swimming Squad",
            focus: "Recovery",
            duration: "3 Days",
            status: "Draft",
            progress: 0,
            exercises: 5,
            startDate: "TBD",
            exerciseList: [
                 { id: 301, name: "Light Swim", sets: 1, reps: "20 mins", notes: "Easy pace" },
                 { id: 302, name: "Dynamic Stretching", sets: 1, reps: "15 mins", notes: "Full body" }
            ]
        },
        {
            id: 4,
            title: "Strength & Power",
            team: "JV Volleyball",
            focus: "Strength",
            duration: "8 Weeks",
            status: "Completed",
            progress: 100,
            exercises: 15,
            startDate: "2024-09-01",
            exerciseList: []
        }
    ]);

    const [newPlan, setNewPlan] = useState<Partial<TrainingPlan>>({
        focus: "Strength",
        status: "Draft",
        progress: 0
    });

    const handleCreatePlan = (e: React.FormEvent) => {
        e.preventDefault();
        const plan: TrainingPlan = {
            id: Math.random(),
            title: newPlan.title!,
            team: newPlan.team!,
            focus: newPlan.focus as any,
            duration: newPlan.duration || "TBD",
            status: "Draft",
            progress: 0,
            exercises: 0,
            startDate: new Date().toISOString().split('T')[0],
            exerciseList: []
        };
        setPlans([plan, ...plans]);
        setShowCreateModal(false);
        setNewPlan({ focus: "Strength", status: "Draft", progress: 0 });
    };

    const filteredPlans = plans.filter(plan => 
        (filterFocus === "All" || plan.focus === filterFocus) &&
        (plan.title.toLowerCase().includes(searchTerm.toLowerCase()) || plan.team.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusColor = (status: string) => {
        switch(status) {
            case "Active": return "bg-green-100 text-green-700 border-green-200";
            case "Draft": return "bg-gray-100 text-gray-700 border-gray-200";
            case "Completed": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getFocusIcon = (focus: string) => {
        switch(focus) {
            case "Strength": return <IoBarbellOutline />;
            case "Endurance": return <IoFitnessOutline />;
            case "Strategy": return <IoTrendingUpOutline />;
            case "Timer": return <IoTimerOutline />;
            default: return <IoFitnessOutline />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${showCreateModal || selectedPlan ? "filter blur-sm pointer-events-none" : ""}`}>
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <IoFitnessOutline className="text-primary-100" /> Training Plans
                        </h1>
                        <p className="text-gray-500 mt-1">Design and track training regimens for your teams.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-100 text-white rounded-xl hover:bg-primary-100/90 font-bold transition-colors shadow-lg shadow-primary-100/30 whitespace-nowrap"
                    >
                        <IoAddOutline className="w-5 h-5" /> Create New Plan
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search plans or teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 focus:ring-1 focus:ring-primary-100 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        {(["All", "Strength", "Endurance", "Strategy", "Skill", "Recovery"] as const).map((focus) => (
                            <button
                                key={focus}
                                onClick={() => setFilterFocus(focus)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors whitespace-nowrap ${
                                    filterFocus === focus 
                                    ? "bg-primary-100 text-white border-primary-100" 
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {focus}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(plan.status)}`}>
                                        {plan.status}
                                    </span>
                                    <div className="p-2 bg-gray-50 text-gray-400 rounded-lg group-hover:text-primary-100 transition-colors">
                                        {getFocusIcon(plan.focus)}
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{plan.title}</h3>
                                <p className="text-gray-500 text-sm mb-4">{plan.team}</p>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                                            <IoCalendarOutline /> Duration
                                        </p>
                                        <p className="text-sm font-bold text-gray-900">{plan.duration}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Focus</p>
                                        <p className="text-sm font-bold text-gray-900">{plan.focus}</p>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                                        <span>Progress</span>
                                        <span>{plan.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-primary-100 h-2 rounded-full transition-all duration-500" 
                                            style={{ width: `${plan.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                    <IoCheckmarkCircleOutline className="w-4 h-4" /> {plan.exercises} Exercises
                                </span>
                                <button 
                                    onClick={() => setSelectedPlan(plan)}
                                    className="text-sm font-bold text-primary-100 hover:text-primary-100/80 flex items-center gap-1 transition-colors"
                                >
                                    View Details <IoChevronForwardOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Plan Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 animate-scaleIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Create Training Plan</h3>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreatePlan} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newPlan.title || ""}
                                    onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    placeholder="e.g. Winter Strength Cycle"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                                    <select 
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                                        required
                                        value={newPlan.team || ""}
                                        onChange={(e) => setNewPlan({...newPlan, team: e.target.value})}
                                    >
                                        <option value="">Select Team</option>
                                        <option value="Varsity Basketball">Varsity Basketball</option>
                                        <option value="Varsity Soccer">Varsity Soccer</option>
                                        <option value="JV Volleyball">JV Volleyball</option>
                                        <option value="Swimming Squad">Swimming Squad</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <input 
                                        type="text" 
                                        value={newPlan.duration || ""}
                                        onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                        placeholder="e.g. 4 Weeks"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Focus</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(["Strength", "Endurance", "Strategy", "Skill", "Recovery"] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setNewPlan({...newPlan, focus: type})}
                                            className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                                                newPlan.focus === type
                                                ? "bg-primary-100 text-white border-primary-100"
                                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-100/90 transition-colors shadow-lg shadow-primary-100/20 mt-4">
                                Create Draft Plan
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Plan Details Modal */}
            {selectedPlan && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPlan(null)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-6 animate-scaleIn overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.title}</h3>
                                <p className="text-gray-500">{selectedPlan.team} • {selectedPlan.focus}</p>
                            </div>
                            <button onClick={() => setSelectedPlan(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto pr-2 no-scrollbar">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <IoBarbellOutline className="text-primary-100" /> Exercises
                            </h4>
                            {selectedPlan.exerciseList && selectedPlan.exerciseList.length > 0 ? (
                                <div className="space-y-3">
                                    {selectedPlan.exerciseList.map((ex) => (
                                        <div key={ex.id} className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <h5 className="font-bold text-gray-900">{ex.name}</h5>
                                                <span className="text-sm font-medium text-primary-100 px-3 py-1 bg-primary-100/10 rounded-lg">
                                                    {ex.sets} x {ex.reps}
                                                </span>
                                            </div>
                                            {ex.notes && <p className="text-sm text-gray-500 mt-1 italic">"{ex.notes}"</p>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p>No exercises added to this plan yet.</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setSelectedPlan(null)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingPlans;

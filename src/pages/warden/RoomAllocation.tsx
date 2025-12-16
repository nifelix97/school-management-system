import React, { useState } from "react";
import {
    IoAddOutline,
    IoBedOutline,
    IoCheckmarkCircleOutline,
    IoFilterOutline,
    IoGridOutline,
    IoListOutline,
    IoPersonAddOutline,
    IoSearchOutline,
    IoWarningOutline
} from "react-icons/io5";

type RoomStatus = "Available" | "Occupied" | "Maintenance";

interface Room {
  id: string;
  number: string;
  block: string;
  capacity: number;
  occupants: number;
  status: RoomStatus;
  type: "Single" | "Double" | "Dormitory";
}

const RoomAllocation: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [filterBlock, setFilterBlock] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkBlock, setBulkBlock] = useState("Block A");
  const [bulkCount, setBulkCount] = useState(1);

  // Mock Room Data
  const [rooms, setRooms] = useState<Room[]>([
    { id: "101", number: "101", block: "Block A", capacity: 2, occupants: 1, status: "Available", type: "Double" },
    { id: "102", number: "102", block: "Block A", capacity: 2, occupants: 2, status: "Occupied", type: "Double" },
    { id: "103", number: "103", block: "Block A", capacity: 1, occupants: 0, status: "Available", type: "Single" },
    { id: "104", number: "104", block: "Block A", capacity: 2, occupants: 0, status: "Maintenance", type: "Double" },
    { id: "105", number: "101", block: "Block B", capacity: 4, occupants: 3, status: "Available", type: "Dormitory" },
    { id: "106", number: "102", block: "Block B", capacity: 4, occupants: 4, status: "Occupied", type: "Dormitory" },
    { id: "107", number: "201", block: "Block A", capacity: 2, occupants: 1, status: "Available", type: "Double" },
    { id: "108", number: "202", block: "Block A", capacity: 2, occupants: 2, status: "Occupied", type: "Double" },
  ]);

  const stats = {
    total: rooms.reduce((acc, r) => acc + r.capacity, 0),
    occupied: rooms.reduce((acc, r) => acc + r.occupants, 0),
    vacant: rooms.reduce((acc, r) => acc + (r.status === "Available" ? (r.capacity - r.occupants) : 0), 0),
    maintenance: rooms.filter(r => r.status === "Maintenance").length,
  };

  const filteredRooms = rooms.filter(room => {
    const matchesBlock = filterBlock === "All" || room.block === filterBlock;
    const matchesStatus = filterStatus === "All" || 
      (filterStatus === "Available" ? room.status === "Available" : 
       filterStatus === "Full" ? room.status === "Occupied" : 
       room.status === "Maintenance");
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBlock && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-700 border-green-200";
      case "Occupied": return "bg-red-100 text-red-700 border-red-200";
      case "Maintenance": return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Room Allocation</h1>
          <p className="text-sm sm:text-base text-primary-50/70">Manage hostel occupancy and assign rooms to students</p>
        </div>
        <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-50 text-white rounded-xl shadow-lg hover:bg-primary-60 transition-all active:scale-95 text-sm font-semibold"
            onClick={() => setIsBulkModalOpen(true)}
        >
            <IoAddOutline className="w-5 h-5" />
            Bulk Allocate
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Capacity", value: stats.total, icon: <IoBedOutline />, color: "bg-blue-50 text-blue-600" },
          { label: "Occupied Beds", value: stats.occupied, icon: <IoPersonAddOutline />, color: "bg-purple-50 text-purple-600" },
          { label: "Vacant Beds", value: stats.vacant, icon: <IoCheckmarkCircleOutline />, color: "bg-green-50 text-green-600" },
          { label: "Maintenance", value: stats.maintenance, icon: <IoWarningOutline />, color: "bg-amber-50 text-amber-600" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-50">{stat.value}</h3>
             </div>
             <div className={`p-3 rounded-xl ${stat.color} text-xl`}>
                {stat.icon}
             </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative">
                <select 
                    className="w-full sm:w-40 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none appearance-none cursor-pointer"
                    value={filterBlock}
                    onChange={(e) => setFilterBlock(e.target.value)}
                >
                    <option value="All">All Blocks</option>
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                </select>
                <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             </div>
             <div className="relative">
                <select 
                    className="w-full sm:w-40 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none appearance-none cursor-pointer"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Full">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
                <IoCheckmarkCircleOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             </div>
        </div>
        <div className="relative w-full md:w-64">
             <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input 
                 type="text" 
                 placeholder="Search Room Number..." 
                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
             />
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
            <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow text-primary-50" : "text-gray-400 hover:text-gray-600"}`}
                title="Grid View"
            >
                <IoGridOutline className="w-5 h-5" />
            </button>
            <button 
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-white shadow text-primary-50" : "text-gray-400 hover:text-gray-600"}`}
                title="Table View"
            >
                <IoListOutline className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Content View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRooms.map((room) => (
                <div 
                    key={room.id} 
                    className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-50/30 transition-all cursor-pointer relative"
                    onClick={() => { setSelectedRoom(room); setIsModalOpen(true); }}
                >
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-primary-50">Room {room.number}</h3>
                            <p className="text-xs text-gray-500 font-medium">{room.block} • {room.type}</p>
                        </div>
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getStatusColor(room.status)}`}>
                            {room.status}
                        </span>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Occupancy</span>
                            <span className="font-semibold">{room.occupants} / {room.capacity}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    room.status === "Maintenance" ? "bg-amber-400" : 
                                    room.occupants >= room.capacity ? "bg-red-500" : "bg-green-500"
                                }`}
                                style={{ width: `${(room.occupants / room.capacity) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                        <span className="text-xs font-semibold text-primary-50 group-hover:text-primary-100 transition-colors">Manage Bed &rarr;</span>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                    <tr>
                        <th className="px-6 py-4">Room</th>
                        <th className="px-6 py-4">Block</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Occupancy</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {filteredRooms.map(room => (
                        <tr key={room.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 font-semibold text-primary-50">{room.number}</td>
                        <td className="px-6 py-4 text-gray-600">{room.block}</td>
                        <td className="px-6 py-4 text-gray-600">{room.type}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${room.status === "Maintenance" ? "bg-amber-400" : room.occupants >= room.capacity ? "bg-red-500" : "bg-green-500"}`} 
                                    style={{ width: `${(room.occupants / room.capacity) * 100}%` }}
                                ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-600">{room.occupants}/{room.capacity}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-bold rounded ${getStatusColor(room.status)}`}>
                            {room.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => { setSelectedRoom(room); setIsModalOpen(true); }}
                                className="px-3 py-1.5 text-xs font-semibold text-primary-100 bg-primary-50/10 hover:bg-primary-50 hover:text-white rounded-lg transition-all"
                            >
                                Manage
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {filteredRooms.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
             <div className="bg-gray-50 p-4 rounded-full inline-block mb-3">
                <IoSearchOutline className="w-8 h-8 text-gray-400" />
             </div>
             <p className="text-gray-500 font-medium">No rooms found matching your criteria</p>
             <button 
                className="mt-3 text-sm text-primary-100 font-semibold hover:underline"
                onClick={() => { setFilterBlock("All"); setFilterStatus("All"); setSearchQuery(""); }}
             >
                Clear Filters
             </button>
        </div>
      )}

      {/* Allocation Modal (Mock) */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary-50">Room {selectedRoom.number} Details</h2>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="space-y-4 mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                         <span className="text-sm font-medium text-gray-600">Current Status</span>
                         <span className={`px-2 py-1 text-xs font-bold rounded ${getStatusColor(selectedRoom.status)}`}>
                            {selectedRoom.status}
                         </span>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Assign Student</label>
                        <div className="flex gap-2">
                             <input 
                                type="text" 
                                placeholder="Enter Student ID or Name" 
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                             />
                             <button 
                                onClick={() => {
                                    if (selectedRoom.occupants >= selectedRoom.capacity) {
                                        alert("Room is already full!");
                                        return;
                                    }
                                    const updatedRooms = rooms.map(r => {
                                        if (r.id === selectedRoom.id) {
                                            const newOccupants = r.occupants + 1;
                                            const updatedRoom = { 
                                                ...r, 
                                                occupants: newOccupants, 
                                                status: newOccupants >= r.capacity ? "Occupied" : "Available" 
                                            } as Room;
                                            setSelectedRoom(updatedRoom);
                                            return updatedRoom;
                                        }
                                        return r;
                                    });
                                    setRooms(updatedRooms);
                                    alert("Student assigned successfully!");
                                }}
                                className="px-4 py-2 bg-primary-50 text-white rounded-lg text-sm font-semibold hover:bg-primary-60 shadow-md active:scale-95 transition-all"
                             >
                                Assign
                             </button>
                        </div>
                        <p className="text-xs text-gray-400">Search for students waiting for room allocation.</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-sm font-bold text-primary-50 mb-2">Current Occupants</h4>
                        {selectedRoom.occupants > 0 ? (
                            <ul className="space-y-2">
                                {[...Array(selectedRoom.occupants)].map((_, i) => (
                                    <li key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-primary-100/20 flex items-center justify-center text-xs font-bold text-primary-100">
                                                S
                                            </div>
                                            <span className="text-gray-700">Student Name {i+1}</span>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const updatedRooms = rooms.map(r => {
                                                    if (r.id === selectedRoom.id) {
                                                        const newOccupants = r.occupants - 1;
                                                        const updatedRoom = { 
                                                            ...r, 
                                                            occupants: newOccupants, 
                                                            status: "Available" 
                                                        } as Room;
                                                        setSelectedRoom(updatedRoom);
                                                        return updatedRoom;
                                                    }
                                                    return r;
                                                });
                                                setRooms(updatedRooms);
                                                alert("Student vacated successfully!");
                                            }}
                                            className="text-xs text-red-500 hover:text-red-700 hover:underline font-medium transition-colors"
                                        >
                                            Vacate
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400 italic">No students assigned yet.</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Bulk Allocation Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary-50">Bulk Room Allocation</h2>
                    <button 
                        onClick={() => setIsBulkModalOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <IoPersonAddOutline className="w-5 h-5" />
                             </div>
                             <div>
                                <h4 className="font-bold text-gray-800">Auto-Assign</h4>
                                <p className="text-xs text-gray-500">Automatically fill available spots in selected block</p>
                             </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Target Block</label>
                            <select 
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none cursor-pointer"
                                value={bulkBlock}
                                onChange={(e) => setBulkBlock(e.target.value)}
                            >
                                <option value="Block A">Block A</option>
                                <option value="Block B">Block B</option>
                            </select>
                        </div>
                         
                        <div className="space-y-2">
                             <label className="text-sm font-semibold text-gray-700">Number of Students to Assign</label>
                             <div className="flex items-center gap-4">
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="20" 
                                    value={bulkCount}
                                    onChange={(e) => setBulkCount(parseInt(e.target.value))}
                                    className="flex-1 accent-primary-50 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-lg font-bold text-primary-50 w-8 text-center">{bulkCount}</span>
                             </div>
                             <p className="text-xs text-gray-400">Simulates assigning {bulkCount} students from waiting list</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => setIsBulkModalOpen(false)}
                            className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {

                                let remaining = bulkCount;
                                const newRooms = rooms.map(r => {
                                    if (remaining > 0 && r.block === bulkBlock && r.status === "Available") {
                                        const space = r.capacity - r.occupants;
                                        const take = Math.min(space, remaining);
                                        remaining -= take;
                                        const newOccupants = r.occupants + take;
                                        return { 
                                            ...r, 
                                            occupants: newOccupants,
                                            status: newOccupants >= r.capacity ? "Occupied" : "Available" 
                                        } as Room;
                                    }
                                    return r;
                                });
                                
                                setRooms(newRooms);
                                setIsBulkModalOpen(false);
                                alert(`Successfully assigned ${bulkCount - remaining} students to ${bulkBlock}!`);
                            }}
                            className="px-5 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-60 shadow-lg shadow-primary-50/20 active:scale-95 transition-all"
                        >
                            Confirm Allocation
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;

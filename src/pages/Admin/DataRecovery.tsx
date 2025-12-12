import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoFilterOutline,
    IoPersonOutline,
    IoRefreshOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashBinOutline,
    IoTrashOutline
} from "react-icons/io5";

interface DeletedItem {
  id: string;
  type: "student" | "teacher" | "course" | "invoice" | "staff";
  name: string;
  identifier: string; // ID number, code, etc.
  deletedBy: string;
  deletedAt: string;
  daysRemaining: number;
  reason: string;
}

const DataRecovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedItem, setSelectedItem] = useState<DeletedItem | null>(null);
  const [actionType, setActionType] = useState<"restore" | "delete" | null>(null);

  // Mock Data
  const [items, setItems] = useState<DeletedItem[]>([
    {
      id: "DEL-001",
      type: "student",
      name: "John Doe",
      identifier: "ST-2024-001",
      deletedBy: "Dr. Sarah Admin",
      deletedAt: "2024-03-14 10:30 AM",
      daysRemaining: 29,
      reason: "Registered by mistake",
    },
    {
      id: "DEL-002",
      type: "course",
      name: "Advanced Physics",
      identifier: "PHY-301",
      deletedBy: "Mr. James Smith",
      deletedAt: "2024-03-13 02:15 PM",
      daysRemaining: 28,
      reason: "Curriculum change",
    },
    {
      id: "DEL-003",
      type: "teacher",
      name: "Mrs. Emily Davis",
      identifier: "TCH-089",
      deletedBy: "Dr. Sarah Admin",
      deletedAt: "2024-03-12 09:00 AM",
      daysRemaining: 27,
      reason: "Resigned",
    },
    {
      id: "DEL-004",
      type: "invoice",
      name: "Tuition Fee - Mar 2024",
      identifier: "INV-2024-999",
      deletedBy: "System",
      deletedAt: "2024-03-10 11:45 PM",
      daysRemaining: 25,
      reason: "Duplicate generation",
    },
    {
      id: "DEL-005",
      type: "student",
      name: "Michael Brown",
      identifier: "ST-2024-045",
      deletedBy: "Registrar Office",
      deletedAt: "2024-03-08 04:20 PM",
      daysRemaining: 23,
      reason: "Transferred out",
    },
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "student":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "teacher":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "course":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "invoice":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAction = () => {
    if (selectedItem && actionType) {
      // Simulate action
      setItems(items.filter((i) => i.id !== selectedItem.id));
      setSelectedItem(null);
      setActionType(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoTrashBinOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              Data Recovery
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Restore deleted items or permanently remove them from the system.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100 text-orange-700 text-sm">
             <IoAlertCircleOutline className="w-5 h-5 flex-shrink-0" />
             <span>Items are permanently deleted after 30 days.</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative col-span-1 sm:col-span-2">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
            />
          </div>

          <div className="relative col-span-1 sm:col-span-2">
            <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="course">Courses</option>
              <option value="invoice">Finance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">Item Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">Deleted By</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">Deleted Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.length === 0 ? (
                 <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-primary-50/50">
                    Bin is empty.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-primary-50">{item.name}</div>
                      <div className="text-xs text-primary-50/50 font-mono mt-0.5">{item.identifier}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                             <IoPersonOutline className="w-4 h-4 text-gray-400" />
                             <span className="text-sm text-primary-50">{item.deletedBy}</span>
                        </div>
                        <div className="text-xs text-primary-50/40 mt-0.5 pl-6">Reason: {item.reason}</div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <IoTimeOutline className="w-4 h-4 text-gray-400" />
                             <span className="text-sm text-primary-50">{item.deletedAt}</span>
                        </div>
                         <div className="text-xs text-orange-600 mt-0.5 pl-6">{item.daysRemaining} days left</div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => { setSelectedItem(item); setActionType("restore"); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded hover:bg-green-100 transition-colors"
                      >
                        <IoRefreshOutline className="w-4 h-4" />
                        Restore
                      </button>
                      <button
                        onClick={() => { setSelectedItem(item); setActionType("delete"); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded hover:bg-red-100 transition-colors"
                      >
                         <IoTrashOutline className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
         {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-primary-50/50 border border-gray-100">
            Bin is empty.
          </div>
        ) : (
            filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                             <div className="text-sm font-bold text-primary-50">{item.name}</div>
                             <div className="text-xs text-primary-50/50 font-mono">{item.identifier}</div>
                        </div>
                        <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                             <span className="text-primary-50/60">Deleted By</span>
                             <span className="text-primary-50">{item.deletedBy}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                             <span className="text-primary-50/60">Deleted On</span>
                             <div className="text-right">
                                 <div className="text-primary-50">{item.deletedAt}</div>
                                 <div className="text-xs text-orange-600">{item.daysRemaining} days left</div>
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                         <button
                            onClick={() => { setSelectedItem(item); setActionType("restore"); }}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100"
                        >
                            <IoRefreshOutline className="w-4 h-4" />
                            Restore
                        </button>
                        <button
                            onClick={() => { setSelectedItem(item); setActionType("delete"); }}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100"
                        >
                            <IoTrashOutline className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedItem && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
             <div className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    actionType === "restore" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                    {actionType === "restore" ? <IoRefreshOutline className="w-7 h-7" /> : <IoAlertCircleOutline className="w-7 h-7" />}
                </div>
                
                <h3 className="text-xl font-bold text-primary-50 mb-2">
                    {actionType === "restore" ? "Restore Item?" : "Permanently Delete?"}
                </h3>
                <p className="text-primary-50/60 mb-6">
                    {actionType === "restore" 
                        ? `Are you sure you want to restore ${selectedItem.name}? This will make it active again.` 
                        : `This action cannot be undone. ${selectedItem.name} will be removed forever.`
                    }
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => { setSelectedItem(null); setActionType(null); }}
                        className="flex-1 px-4 py-2 bg-white border border-gray-200 text-primary-50 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAction}
                        className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                             actionType === "restore" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                        {actionType === "restore" ? "Confirm Restore" : "Delete Forever"}
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataRecovery;

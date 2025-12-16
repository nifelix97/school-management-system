import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCubeOutline,
    IoEllipsisVerticalOutline,
    IoFilterOutline,
    IoMedkitOutline,
    IoPencilOutline,
    IoSearchOutline,
    IoTrashOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface InventoryItem {
  id: string;
  name: string;
  category: "Medicine" | "Equipment" | "Consumables" | "First Aid";
  stock: number;
  unit: string;
  minStock: number;
  expiryDate?: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  location: string;
}

const MedicalInventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "INV-001",
      name: "Paracetamol 500mg",
      category: "Medicine",
      stock: 450,
      unit: "tablets",
      minStock: 100,
      expiryDate: "2025-12-31",
      status: "In Stock",
      location: "Cabinet A-1",
    },
    {
      id: "INV-002",
      name: "Amoxicillin 250mg",
      category: "Medicine",
      stock: 25,
      unit: "capsules",
      minStock: 50,
      expiryDate: "2024-06-30",
      status: "Low Stock",
      location: "Cabinet A-2",
    },
    {
      id: "INV-003",
      name: "Sterile Gauze Pads",
      category: "Consumables",
      stock: 200,
      unit: "packs",
      minStock: 50,
      status: "In Stock",
      location: "Shelf B-3",
    },
    {
      id: "INV-004",
      name: "Digital Thermometer",
      category: "Equipment",
      stock: 0,
      unit: "pieces",
      minStock: 5,
      status: "Out of Stock",
      location: "Drawer C-1",
    },
    {
      id: "INV-005",
      name: "Band-Aids (Assorted)",
      category: "First Aid",
      stock: 85,
      unit: "boxes",
      minStock: 20,
      status: "In Stock",
      location: "Shelf B-1",
    },
    {
      id: "INV-006",
      name: "Surgical Masks",
      category: "Consumables",
      stock: 15,
      unit: "boxes",
      minStock: 30,
      status: "Low Stock",
      location: "Shelf B-2",
    },
  ]);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "Medicine",
    stock: 0,
    unit: "",
    minStock: 0,
    location: "",
    status: "In Stock",
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.unit || !newItem.location) return;

    const item: InventoryItem = {
      id: `INV-${Date.now()}`,
      name: newItem.name,
      category: newItem.category as any,
      stock: Number(newItem.stock),
      unit: newItem.unit,
      minStock: Number(newItem.minStock),
      expiryDate: newItem.expiryDate,
      status: newItem.status as any,
      location: newItem.location,
    };

    setInventory([...inventory, item]);
    setShowAddModal(false);
    setNewItem({
      name: "",
      category: "Medicine",
      stock: 0,
      unit: "",
      minStock: 0,
      location: "",
      status: "In Stock",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700 border-green-200";
      case "Low Stock":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Out of Stock":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: "Total Items", value: inventory.length, icon: <IoCubeOutline />, color: "bg-blue-500" },
    { label: "Low Stock", value: inventory.filter(i => i.status === "Low Stock").length, icon: <IoWarningOutline />, color: "bg-amber-500" },
    { label: "Out of Stock", value: inventory.filter(i => i.status === "Out of Stock").length, icon: <IoAlertCircleOutline />, color: "bg-red-500" },
    { label: "Medicines", value: inventory.filter(i => i.category === "Medicine").length, icon: <IoMedkitOutline />, color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Medical Inventory</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage medical supplies, medicines, and equipment stock
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-50/60 font-medium">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <IoFilterOutline className="w-5 h-5 text-primary-50/60" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
            >
              <option value="all">All Categories</option>
              <option value="Medicine">Medicine</option>
              <option value="Equipment">Equipment</option>
              <option value="Consumables">Consumables</option>
              <option value="First Aid">First Aid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-primary-50">{item.name}</div>
                    {item.expiryDate && (
                      <div className="text-xs text-primary-50/60 mt-0.5">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-primary-50/5 text-primary-50 text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-bold text-primary-50">{item.stock}</div>
                      <div className="text-xs text-primary-50/60">{item.unit}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-50/80">{item.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="Edit Item">
                        <IoPencilOutline className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Item">
                        <IoTrashOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredInventory.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary-50/5 text-primary-50">
                    <IoMedkitOutline className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-primary-50">{item.name}</div>
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="text-xs text-primary-50/60 mb-1">Stock Level</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-primary-50 text-lg">{item.stock}</span>
                    <span className="text-xs text-primary-50/60">{item.unit}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="text-xs text-primary-50/60 mb-1">Status</div>
                  <div className={`text-xs font-bold ${
                    item.status === "In Stock" ? "text-green-600" :
                    item.status === "Out of Stock" ? "text-red-600" :
                    "text-amber-600"
                  }`}>
                    {item.status}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                 <div className="text-xs text-primary-50/60">
                    Loc: {item.location}
                 </div>
                 {item.expiryDate && (
                   <div className="text-xs text-primary-50/60 flex items-center gap-1">
                     <span>Exp: {new Date(item.expiryDate).toLocaleDateString()}</span>
                   </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out] overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-primary-50 mb-6">Add Inventory Item</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="e.g. Paracetamol 500mg"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
                  >
                    <option value="Medicine">Medicine</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Consumables">Consumables</option>
                    <option value="First Aid">First Aid</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Stock Level</label>
                  <input
                    type="number"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Unit</label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    placeholder="e.g. tablets, boxes"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Minimum Stock</label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({ ...newItem, minStock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Location</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    placeholder="e.g. Cabinet A-1"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Expiry Date</label>
                  <input
                    type="date"
                    value={newItem.expiryDate || ""}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Status</label>
                  <select
                    value={newItem.status}
                    onChange={(e) => setNewItem({ ...newItem, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-primary-50 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddItem}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalInventory;

import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoBuildOutline,
    IoCubeOutline,
    IoFilterOutline,
    IoPencilOutline,
    IoSearchOutline,
    IoTrashOutline,
    IoWarningOutline
} from "react-icons/io5";

type Category = "Furniture" | "Electrical" | "Plumbing" | "Cleaning" | "Other";
type Status = "In Stock" | "Low Stock" | "Out of Stock";

interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  minQuantity: number;
  location: string;
  lastUpdated: string;
}

const HostelInventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    category: "Furniture",
    quantity: 0,
    minQuantity: 5
  });

  // Mock Data
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "INV-001",
      name: "Study Chairs",
      category: "Furniture",
      quantity: 45,
      minQuantity: 10,
      location: "Store Room A",
      lastUpdated: "2024-03-15"
    },
    {
      id: "INV-002",
      name: "LED Tubelights",
      category: "Electrical",
      quantity: 8,
      minQuantity: 15,
      location: "Maintenance Room",
      lastUpdated: "2024-03-10"
    },
    {
      id: "INV-003",
      name: "Floor Cleaner (5L)",
      category: "Cleaning",
      quantity: 2,
      minQuantity: 5,
      location: "Janitor Closet",
      lastUpdated: "2024-03-18"
    },
    {
      id: "INV-004",
      name: "Mattresses",
      category: "Furniture",
      quantity: 12,
      minQuantity: 5,
      location: "Store Room B",
      lastUpdated: "2024-02-28"
    }
  ]);

  const getStatus = (qty: number, min: number): Status => {
    if (qty === 0) return "Out of Stock";
    if (qty <= min) return "Low Stock";
    return "In Stock";
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-700 border-green-200";
      case "Low Stock": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Out of Stock": return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSave = () => {
    if (!formData.name || formData.quantity === undefined) return;

    if (editingItem) {
        setItems(prev => prev.map(item => item.id === editingItem.id ? { 
            ...item, 
            ...formData as InventoryItem, 
            lastUpdated: new Date().toISOString().split('T')[0] 
        } : item));
    } else {
        const newItem: InventoryItem = {
            id: `INV-${Date.now()}`,
            name: formData.name,
            category: formData.category as Category,
            quantity: formData.quantity,
            minQuantity: formData.minQuantity || 5,
            location: formData.location || "Store Room",
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        setItems([newItem, ...items]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to remove this item from inventory?")) {
        setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const openModal = (item?: InventoryItem) => {
    if (item) {
        setEditingItem(item);
        setFormData(item);
    } else {
        setEditingItem(null);
        setFormData({ category: "Furniture", quantity: 0, minQuantity: 5 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Hostel Inventory</h1>
          <p className="text-sm sm:text-base text-primary-50/70">Track supplies and manage stock levels</p>
        </div>
        <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-50 text-white rounded-xl shadow-lg hover:bg-primary-60 transition-all active:scale-95 text-sm font-semibold"
        >
            <IoAddOutline className="w-5 h-5" />
            Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Items", value: items.length, icon: <IoCubeOutline />, color: "bg-blue-50 text-blue-600" },
          { label: "Low Stock", value: items.filter(i => i.quantity <= i.minQuantity && i.quantity > 0).length, icon: <IoWarningOutline />, color: "bg-amber-50 text-amber-600" },
          { label: "Out of Stock", value: items.filter(i => i.quantity === 0).length, icon: <IoAlertCircleOutline />, color: "bg-red-50 text-red-600" },
          { label: "Categories", value: new Set(items.map(i => i.category)).size, icon: <IoBuildOutline />, color: "bg-purple-50 text-purple-600" },
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
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
             <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input 
                 type="text" 
                 placeholder="Search inventory..." 
                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
             />
        </div>
        <div className="relative w-full md:w-64">
            <select 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none appearance-none cursor-pointer"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option value="Furniture">Furniture</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Other">Other</option>
            </select>
            <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block md:hidden">
            {filteredItems.map(item => (
                <div key={item.id} className="p-4 border-b border-gray-50 last:border-none">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.category} • {item.location}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-bold rounded border ${getStatusColor(getStatus(item.quantity, item.minQuantity))}`}>
                            {getStatus(item.quantity, item.minQuantity)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div className="text-sm">
                            <span className="text-gray-500">Qty: </span>
                            <span className="font-bold text-gray-800">{item.quantity}</span>
                            <span className="text-xs text-gray-400 ml-1">(Min: {item.minQuantity})</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModal(item)} className="p-2 bg-gray-50 text-primary-50 rounded-lg">
                                <IoPencilOutline />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-500 rounded-lg">
                                <IoTrashOutline />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                    <tr>
                        <th className="px-6 py-4">Item Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {filteredItems.map(item => {
                        const status = getStatus(item.quantity, item.minQuantity);
                        return (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-gray-800">{item.name}</div>
                                    <div className="text-xs text-gray-400">ID: {item.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-700">{item.quantity}</span>
                                        <span className="text-xs text-gray-400">/ Min {item.minQuantity}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded border ${getStatusColor(status)}`}>
                                        {status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => openModal(item)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <IoPencilOutline className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <IoTrashOutline className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        
        {filteredItems.length === 0 && (
            <div className="text-center py-12">
                 <p className="text-gray-500">No inventory items found</p>
            </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl scale-100 animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary-50">
                        {editingItem ? "Edit Item" : "Add New Item"}
                    </h2>
                    <button 
                        onClick={closeModal}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Item Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Category</label>
                            <select
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                            >
                                <option value="Furniture">Furniture</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Location</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                                value={formData.location || ""}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Quantity</label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Min. Quantity</label>
                            <input
                                type="number"
                                min="1"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                                value={formData.minQuantity}
                                onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button 
                            onClick={closeModal}
                            className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!formData.name}
                            className="px-5 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-60 shadow-lg shadow-primary-50/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HostelInventory;

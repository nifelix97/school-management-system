import React, { useState } from "react";
import {
    IoAddOutline,
    IoArchiveOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoCubeOutline,
    IoFilterOutline,
    IoMailOutline,
    IoPersonOutline,
    IoQrCodeOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";

interface MailItem {
  id: string;
  recipientName: string;
  sender: string;
  type: "Package" | "Letter" | "Document";
  dateReceived: string;
  location: string;
  status: "Pending Collection" | "Collected";
  collectedBy?: string;
  collectedAt?: string;
  trackingNumber?: string;
}

const MailPackages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // Mock Data
  const [mailItems, setMailItems] = useState<MailItem[]>([
    {
      id: "PKG-001",
      recipientName: "Dr. Alan Grant",
      sender: "Lab Supplies Co.",
      type: "Package",
      dateReceived: "2024-05-20 09:30 AM",
      location: "Shelf A-1",
      status: "Pending Collection",
      trackingNumber: "TRRw345678",
    },
    {
      id: "LTR-002",
      recipientName: "Registrar Office",
      sender: "Ministry of Education",
      type: "Document",
      dateReceived: "2024-05-20 11:15 AM",
      location: "File Bin 2",
      status: "Pending Collection",
    },
    {
      id: "PKG-003",
      recipientName: "Jane Doe (Student)",
      sender: "Amazon",
      type: "Package",
      dateReceived: "2024-05-19 02:00 PM",
      location: "Shelf B-3",
      status: "Collected",
      collectedBy: "Jane Doe",
      collectedAt: "2024-05-19 04:30 PM",
    },
    {
      id: "LTR-004",
      recipientName: "HR Dept",
      sender: "Insurance Co.",
      type: "Letter",
      dateReceived: "2024-05-18 10:00 AM",
      location: "Mail Slot 5",
      status: "Collected",
      collectedBy: "HR Assistant",
      collectedAt: "2024-05-18 01:00 PM",
    },
  ]);

  const [newItem, setNewItem] = useState<Partial<MailItem>>({
    recipientName: "",
    sender: "",
    type: "Package",
    location: "",
    status: "Pending Collection",
    trackingNumber: "",
  });

  const handleLogItem = () => {
    if (!newItem.recipientName || !newItem.sender) return;

    const item: MailItem = {
      id: `ITEM-${Date.now()}`,
      recipientName: newItem.recipientName!,
      sender: newItem.sender!,
      type: newItem.type as any,
      dateReceived: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      location: newItem.location || "General Storage",
      status: "Pending Collection",
      trackingNumber: newItem.trackingNumber || "-",
    };

    setMailItems([item, ...mailItems]);
    setShowModal(false);
    setNewItem({
      recipientName: "",
      sender: "",
      type: "Package",
      location: "",
      status: "Pending Collection",
      trackingNumber: "",
    });
  };

  const handleMarkCollected = (id: string) => {
    setMailItems(mailItems.map(item => 
      item.id === id 
        ? { ...item, status: "Collected", collectedBy: "Recipient", collectedAt: new Date().toLocaleString() } 
        : item
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Package": return <IoCubeOutline />;
      case "Letter": return <IoMailOutline />;
      case "Document": return <IoArchiveOutline />;
      default: return <IoMailOutline />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Package": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Letter": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Document": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Collected": return "bg-green-100 text-green-700 border-green-200";
      case "Pending Collection": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredItems = mailItems.filter(item => {
    const matchesSearch = item.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.trackingNumber && item.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Received Today", value: mailItems.filter(i => i.dateReceived.includes("2024-05-20")).length, icon: <IoMailOutline />, color: "bg-blue-500" },
    { label: "Pending Collection", value: mailItems.filter(i => i.status === "Pending Collection").length, icon: <IoTimeOutline />, color: "bg-red-500" },
    { label: "Packages", value: mailItems.filter(i => i.type === "Package").length, icon: <IoCubeOutline />, color: "bg-amber-500" },
    { label: "Letters/Docs", value: mailItems.filter(i => i.type !== "Package").length, icon: <IoArchiveOutline />, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Mail & Packages</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Track incoming mail, packages, and courier deliveries
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Log Incoming</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-md`}>
                <div className="w-6 h-6">{stat.icon}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 sticky top-0 z-10 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 relative w-full">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recipient, sender, tracking..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto mt-2 sm:mt-0">
             <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
              <IoFilterOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Status:</span>
            </div>
            {["all", "Pending Collection", "Collected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "Pending Collection" ? "Pending" : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mail List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoCubeOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No items found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Mobile View - Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.recipientName}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            From: {item.sender}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status === "Pending Collection" ? "Pending" : "Collected"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Location</span>
                      <span className="font-medium text-gray-900">{item.location}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Received</span>
                      <span className="font-medium text-gray-900 truncate">{item.dateReceived.split(' ')[0]}</span>
                    </div>
                     {item.trackingNumber && (
                        <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                            <span className="block text-xs text-gray-500 mb-1">Tracking #</span>
                            <span className="font-medium text-gray-900 flex items-center gap-1">
                                <IoQrCodeOutline /> {item.trackingNumber}
                            </span>
                        </div>
                     )}
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    {item.status === "Pending Collection" && (
                         <button 
                            onClick={() => handleMarkCollected(item.id)}
                            className="flex-1 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                         >
                            <IoCheckmarkCircleOutline /> Mark Collected
                        </button>
                    )}
                     <button className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-auto">
                        <IoTrashOutline className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipient</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type & Sender</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location & Tracking</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                             <IoPersonOutline />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{item.recipientName}</div>
                            <div className="text-xs text-gray-500">{item.dateReceived}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-lg ${getTypeColor(item.type)}`}>
                                {getTypeIcon(item.type)}
                            </span>
                             <div className="flex flex-col">
                                <span className="text-sm text-gray-900 font-medium">{item.sender}</span>
                                <span className="text-xs text-gray-500">{item.type}</span>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900">{item.location}</span>
                            {item.trackingNumber && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <IoQrCodeOutline /> {item.trackingNumber}
                                </span>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.status === "Pending Collection" && (
                                <button 
                                    onClick={() => handleMarkCollected(item.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Mark as Collected"
                                >
                                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                                </button>
                            )}
                           <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <IoTrashOutline className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Log Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Log Incoming Item</h2>
                <p className="text-sm text-gray-500">Record mail or package details</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newItem.recipientName}
                  onChange={(e) => setNewItem({...newItem, recipientName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Who is this for?"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sender <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newItem.sender}
                  onChange={(e) => setNewItem({...newItem, sender: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="From whom?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="Package">Package</option>
                        <option value="Letter">Letter</option>
                        <option value="Document">Document</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                    <input
                      type="text"
                      value={newItem.location}
                      onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                      placeholder="e.g. Shelf A"
                    />
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                <input
                  type="text"
                  value={newItem.trackingNumber}
                  onChange={(e) => setNewItem({...newItem, trackingNumber: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none font-mono"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogItem}
                disabled={!newItem.recipientName || !newItem.sender}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-50 hover:bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Log Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailPackages;

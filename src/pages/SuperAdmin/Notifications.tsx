import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoArchiveOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoMegaphoneOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoSendOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

interface SystemNotification {
  id: number;
  type: "security" | "system" | "update" | "billing";
  title: string;
  message: string;
  timestamp: string;
  status: "unread" | "read" | "archived";
}

const Notifications: React.FC = () => {
  const [activeView, setActiveView] = useState<"feed" | "broadcast">("feed");
  const [filterType, setFilterType] = useState("all");

  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: 1,
      type: "security",
      title: "Suspicious Login Attempt",
      message: "Multiple failed login attempts detected on Institutional Admin account (ID: 552).",
      timestamp: "2 mins ago",
      status: "unread",
    },
    {
      id: 2,
      type: "system",
      title: "Backup Completed",
      message: "Global database backup was successfully executed and stored on AWS S3.",
      timestamp: "1 hour ago",
      status: "unread",
    },
    {
      id: 3,
      type: "update",
      title: "System Maintenance Scheduled",
      message: "Version 2.4.0 update is scheduled for Sunday at 02:00 UTC.",
      timestamp: "5 hours ago",
      status: "read",
    },
    {
      id: 4,
      type: "billing",
      title: "Subscription Renewal Failed",
      message: "Payment for 'Metropolis Boarding School' was declined by Stripe.",
      timestamp: "1 day ago",
      status: "archived",
    },
  ]);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("All Institutions");
  const [broadcastContent, setBroadcastContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "security": return <IoAlertCircleOutline className="text-red-500" />;
      case "system": return <IoShieldCheckmarkOutline className="text-green-500" />;
      case "update": return <IoInformationCircleOutline className="text-blue-500" />;
      case "billing": return <IoAlertCircleOutline className="text-orange-500" />;
      default: return <IoNotificationsOutline className="text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filterType === "all") return n.status !== "archived";
    return n.type === filterType && n.status !== "archived";
  });

  // Handlers
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: "read" })));
    toast.success("All notifications marked as read");
  };

  const handleArchive = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "archived" } : n));
    toast.info("Notification archived");
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.error("Notification deleted payload confirmed");
  };

  const handleTakeAction = (notif: SystemNotification) => {
    toast.info(`Redirecting to manage ${notif.type} incident...`, {
        icon: getIcon(notif.type)
    });
  };

  const handleSendBroadcast = () => {
    if (!broadcastTitle || !broadcastContent) {
        toast.warning("Please provide both title and content for the broadcast.");
        return;
    }

    setIsSending(true);
    const broadcastToast = toast.loading("Initializing global broadcast protocols...");

    setTimeout(() => {
        toast.update(broadcastToast, { render: "Synchronizing with institutional nodes (4.2k active)..." });
        setTimeout(() => {
            toast.update(broadcastToast, { render: "Relaying encrypted payloads to target clusters..." });
            setTimeout(() => {
                toast.update(broadcastToast, { 
                    render: "Global Broadcast dispatched successfully!", 
                    type: "success", 
                    isLoading: false,
                    autoClose: 5000 
                });
                setBroadcastTitle("");
                setBroadcastContent("");
                setIsSending(false);
            }, 3000);
        }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
            <IoNotificationsOutline className="text-primary-100" />
            Notification Center
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">Manage global alerts and institutional broadcasts.</p>
        </div>
        
        {/* View Switcher */}
        <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm w-fit">
          <button
            onClick={() => setActiveView("feed")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeView === "feed" ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "text-gray-400 hover:text-primary-50"
            }`}
          >
            <IoNotificationsOutline />
            Alert Feed
          </button>
          <button
            onClick={() => setActiveView("broadcast")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeView === "broadcast" ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "text-gray-400 hover:text-primary-50"
            }`}
          >
            <IoMegaphoneOutline />
            Global Broadcast
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Workspace Area */}
        <div className="lg:col-span-8 space-y-6">
          {activeView === "feed" ? (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-slideIn">
              <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <IoFilterOutline className="text-gray-400" />
                  </div>
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-transparent text-sm font-bold text-gray-500 focus:outline-none"
                  >
                    <option value="all">All Active Alerts</option>
                    <option value="security">Security Alerts</option>
                    <option value="system">System Updates</option>
                    <option value="billing">Billing Issues</option>
                  </select>
                </div>
                <button 
                    onClick={handleMarkAllRead}
                    className="text-xs font-black text-primary-100 uppercase tracking-widest hover:text-primary-50 transition-colors"
                >
                  Mark all as read
                </button>
              </div>

              <div className="divide-y divide-gray-50">
                {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-6 flex flex-col sm:flex-row items-start gap-5 hover:bg-gray-50/50 transition-all group ${
                      notif.status === 'unread' ? 'border-l-4 border-l-primary-100' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold ${notif.status === 'unread' ? 'text-gray-900' : 'text-gray-500'}`}>
                          {notif.title}
                        </h3>
                        <span className="text-[10px] font-black text-gray-300 uppercase flex items-center gap-1">
                          <IoTimeOutline />
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">{notif.message}</p>
                      
                      <div className="flex items-center gap-4 mt-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => handleTakeAction(notif)}
                            className="text-[10px] font-bold text-primary-100 uppercase tracking-tighter flex items-center gap-1.5 px-3 py-1.5 bg-primary-100/5 rounded-lg border border-primary-100/10 hover:bg-primary-100 hover:text-white transition-all active:scale-95"
                        >
                          Take Action
                        </button>
                        <button 
                            onClick={() => handleArchive(notif.id)}
                            className="text-gray-400 hover:text-primary-50 transition-colors tooltip flex items-center gap-1" title="Archive"
                        >
                          <IoArchiveOutline />
                          <span className="text-[8px] font-bold uppercase">Archive</span>
                        </button>
                        <button 
                            onClick={() => handleDelete(notif.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors tooltip flex items-center gap-1" title="Delete"
                        >
                          <IoTrashOutline />
                          <span className="text-[8px] font-bold uppercase">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200 text-4xl">
                            <IoNotificationsOutline />
                        </div>
                        <p className="text-sm font-bold text-gray-400">No active alerts found.</p>
                    </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10 animate-slideIn">
              <div className="max-w-xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary-50/10 text-primary-50 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-sm">
                    <IoMegaphoneOutline />
                  </div>
                  <h2 className="text-xl font-black text-primary-50">Global Announcement</h2>
                  <p className="text-xs text-gray-400 font-medium">Broadcast a message to every user across all institutions.</p>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Message Title</label>
                    <input 
                      type="text" 
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      placeholder="e.g. Critical System Upgrade Tonight" 
                      className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm font-bold placeholder:font-normal"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Target Audience</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["All Institutions", "Principals Only", "Super Admins", "Premium Tier"].map(target => (
                        <button 
                            key={target} 
                            onClick={() => setBroadcastTarget(target)}
                            className={`px-4 py-3 border rounded-xl text-xs font-bold transition-all text-left ${
                                broadcastTarget === target 
                                ? "bg-primary-100/10 border-primary-100 text-primary-100 shadow-sm" 
                                : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                            }`}
                        >
                          {target}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Announcement Content</label>
                    <textarea 
                      value={broadcastContent}
                      onChange={(e) => setBroadcastContent(e.target.value)}
                      placeholder="Enter your global message here..." 
                      className="w-full h-32 px-5 py-4 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-100 outline-none transition-all text-sm leading-loose resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    disabled={isSending}
                    onClick={handleSendBroadcast}
                    className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary-50 text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-50/20 hover:opacity-90 transition-all ${isSending ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
                  >
                    <IoSendOutline className="text-lg" />
                    {isSending ? 'PROCESSING...' : 'SEND GLOBAL BROADCAST'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Status Area */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary-50 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-50/20 relative overflow-hidden group">
            <div className="absolute -right-5 -bottom-5 text-8xl opacity-10 transition-transform group-hover:scale-110">
              <IoShieldCheckmarkOutline />
            </div>
            <h3 className="text-lg font-black mb-6 flex items-center gap-3">
              <IoShieldCheckmarkOutline />
              System Status
            </h3>
            <div className="space-y-6 relative z-10">
              {[
                { label: "Notification Node", status: "Healthy", up: true },
                { label: "Broadcast Engine", status: "Active", up: true },
                { label: "Alert Latency", status: "24ms", up: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">{s.label}</span>
                  <span className="text-xs font-black">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-primary-50 flex items-center gap-3">
              <IoMegaphoneOutline className="text-primary-100" />
              Broadcast History
            </h3>
            <div className="space-y-4">
              {[
                { title: "Service Interruption", date: "12 Dec, 2024", users: "4.2k" },
                { title: "Holiday Schedule", date: "05 Dec, 2024", users: "12.8k" },
              ].map((h, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-primary-100/20 transition-all cursor-pointer">
                  <p className="text-xs font-black text-gray-700">{h.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase">{h.date}</span>
                    <span className="text-[10px] font-black text-primary-100 flex items-center gap-1">
                      <IoPersonOutline />
                      {h.users}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-[10px] font-black text-primary-50 uppercase tracking-widest border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

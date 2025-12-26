import React, { useState } from "react";
import {
    IoAddOutline,
    IoCallOutline,
    IoEllipsisVertical,
    IoFilterOutline,
    IoMailOutline,
    IoSearchOutline
} from "react-icons/io5";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
}

const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: "STAFF001", name: "John Doe", role: "Math Teacher", department: "Science", email: "john.doe@school.edu", phone: "+256 701 123456", status: "Active", joinDate: "2023-01-15" },
    { id: "STAFF002", name: "Jane Smith", role: "HR Assistant", department: "Administration", email: "jane.smith@school.edu", phone: "+256 701 234567", status: "Active", joinDate: "2023-03-20" },
    { id: "STAFF003", name: "Robert Musoke", role: "Physics Teacher", department: "Science", email: "robert.m@school.edu", phone: "+256 701 345678", status: "On Leave", joinDate: "2022-09-10" },
    { id: "STAFF004", name: "Sarah Nakato", role: "Librarian", department: "Library", email: "sarah.n@school.edu", phone: "+256 701 456789", status: "Active", joinDate: "2023-05-12" },
    { id: "STAFF005", name: "David Okello", role: "Security Head", department: "Security", email: "david.o@school.edu", phone: "+256 701 567890", status: "Active", joinDate: "2022-11-05" },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    department: "Science",
    email: "",
    phone: "",
    status: "Active" as const
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `STAFF${String(staff.length + 1).padStart(3, '0')}`;
    const entry: StaffMember = {
      ...newStaff,
      id,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setStaff([entry, ...staff]);
    setIsModalOpen(false);
    setNewStaff({ name: "", role: "", department: "Science", email: "", phone: "", status: "Active" });
    alert("New staff member added successfully!");
  };

  const toggleStatus = (id: string) => {
    setStaff(staff.map(member => {
      if (member.id === id) {
        const nextStatus = member.status === 'Active' ? 'On Leave' : 
                          member.status === 'On Leave' ? 'Terminated' : 'Active';
        return { ...member, status: nextStatus };
      }
      return member;
    }));
  };

  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'On Leave': return 'bg-yellow-100 text-yellow-700';
      case 'Terminated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-50">Staff Management</h1>
          <p className="text-primary-50/40 font-medium">Manage your school's faculty and administrative staff.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-50 text-white px-5 py-2.5 rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <IoAddOutline className="text-xl" />
          <span className="font-bold">Add New Staff</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-50/20 bg-gray-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold text-primary-50 shadow-sm">
            <IoFilterOutline />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Staff ID</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-primary-50/70">{member.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary-50 leading-tight">{member.name}</span>
                      <span className="text-[11px] font-bold text-primary-50/30 uppercase tracking-wide">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-primary-50/60 uppercase">{member.department}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(member.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${getStatusColor(member.status)} hover:shadow-sm`}
                    >
                      {member.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                       <button 
                        onClick={() => alert(`Opening email to ${member.email}`)}
                        className="p-2 hover:bg-primary-100/10 rounded-xl text-primary-100 transition-colors" title="Email Staff">
                        <IoMailOutline />
                      </button>
                      <button 
                        onClick={() => alert(`Calling ${member.phone}`)}
                        className="p-2 hover:bg-primary-50/10 rounded-xl text-primary-50 transition-colors" title="Call Staff">
                        <IoCallOutline />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                        <IoEllipsisVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-black text-primary-50 mb-1">Add New Staff</h2>
              <p className="text-sm text-primary-50/40 font-medium">Enter details for the new member.</p>
            </div>
            
            <form onSubmit={handleAddStaff} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm"
                  placeholder="e.g. John Doe"
                  value={newStaff.name}
                  onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Role</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm"
                    placeholder="e.g. Teacher"
                    value={newStaff.role}
                    onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Department</label>
                  <select
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm appearance-none cursor-pointer"
                    value={newStaff.department}
                    onChange={e => setNewStaff({ ...newStaff, department: e.target.value })}
                  >
                    <option>Science</option>
                    <option>Arts</option>
                    <option>Administration</option>
                    <option>Security</option>
                    <option>Library</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm"
                  placeholder="name@school.edu"
                  value={newStaff.email}
                  onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
                />
              </div>

              <div className="space-y-1 pb-4">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm"
                  placeholder="+256 7xx xxxxxx"
                  value={newStaff.phone}
                  onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 rounded-2xl text-sm font-black text-primary-50/40 hover:bg-gray-50 transition-colors uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl bg-primary-50 text-white text-sm font-black hover:bg-primary-100 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                >
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;

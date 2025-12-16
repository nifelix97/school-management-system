import React, { useState } from "react";
import {
    IoAddOutline,
    IoBriefcaseOutline,
    IoCallOutline,
    IoCreateOutline,
    IoFilterOutline,
    IoMailOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTrashOutline,
    IoEllipsisVerticalOutline
} from "react-icons/io5";

type StaffStatus = "Active" | "On Leave" | "Terminated";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: StaffStatus;
  joinDate: string;
}

const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock Data
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      role: "Professor",
      department: "Science",
      email: "sarah.wilson@uni.edu",
      phone: "+1 (555) 001-1234",
      status: "Active",
      joinDate: "2018-05-15",
    },
    {
      id: "2",
      name: "Mr. James Carter",
      role: "Lecturer",
      department: "Arts",
      email: "james.carter@uni.edu",
      phone: "+1 (555) 002-5678",
      status: "On Leave",
      joinDate: "2020-03-10",
    },
    {
      id: "3",
      name: "Ms. Emily Davis",
      role: "Admin Officer",
      department: "Administration",
      email: "emily.davis@uni.edu",
      phone: "+1 (555) 003-9012",
      status: "Active",
      joinDate: "2019-11-20",
    },
    {
      id: "4",
      name: "Prof. Robert Brown",
      role: "Head of Dept",
      department: "Mathematics",
      email: "robert.brown@uni.edu",
      phone: "+1 (555) 004-3456",
      status: "Active",
      joinDate: "2015-08-01",
    },
    {
      id: "5",
      name: "Mrs. Linda Taylor",
      role: "Lab Assistant",
      department: "Science",
      email: "linda.taylor@uni.edu",
      phone: "+1 (555) 005-7890",
      status: "Active",
      joinDate: "2021-02-14",
    },
  ]);

  // Derived filters
  const departments = ["All", ...Array.from(new Set(staffList.map(s => s.department)))];

  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDepartment === "All" || staff.department === filterDepartment;
    const matchesStatus = filterStatus === "All" || staff.status === filterStatus;
    
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  const handleEdit = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedStaff({
      id: Date.now().toString(),
      name: "",
      role: "",
      department: "Science", // default
      email: "",
      phone: "",
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0],
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStaff) {
      if (isEditing) {
        setStaffList(staffList.map(s => s.id === selectedStaff.id ? selectedStaff : s));
      } else {
        setStaffList([...staffList, selectedStaff]);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-50 to-primary-100 mb-2">
            Staff Management
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your faculty and staff with ease and precision.
          </p>
        </div>
        <button 
          onClick={handleAdd}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
            <IoAddOutline className="w-5 h-5" />
          </div>
          Add Staff Member
        </button>
      </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
            { label: "Total Staff", value: staffList.length, icon: <IoPeopleOutline />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Active", value: staffList.filter(s => s.status === 'Active').length, icon: <IoBriefcaseOutline />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "On Leave", value: staffList.filter(s => s.status === 'On Leave').length, icon: <IoCallOutline />, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "New This Month", value: "3", icon: <IoPersonOutline />, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" }
        ].map((stat, index) => (
            <div key={index} className={`bg-white p-5 rounded-2xl shadow-sm border ${stat.border} flex items-center gap-4 hover:shadow-md transition-all duration-300 group`}>
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
                </div>
            </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96 p-2">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                 <IoSearchOutline className="w-5 h-5" />
            </div>
            <input 
                type="text" 
                placeholder="Search staff..." 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex w-full md:w-auto gap-2 p-2 overflow-x-auto">
             <div className="min-w-[140px]">
                <div className="relative">
                    <select 
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 hover:bg-gray-100 border-none rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-primary-100 cursor-pointer transition-colors"
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept} Dept</option>
                        ))}
                    </select>
                    <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
             </div>
             <div className="min-w-[140px]">
                <div className="relative">
                    <select 
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 hover:bg-gray-100 border-none rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-primary-100 cursor-pointer transition-colors"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                    <IoEllipsisVerticalOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
             </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/50">
        {filteredStaff.length > 0 ? (
          <>
             {/* Desktop Table View */}
             <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                            <th className="p-6">Staff Member</th>
                            <th className="p-6">Department</th>
                            <th className="p-6">Contact Info</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredStaff.map((staff) => (
                            <tr key={staff.id} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-primary-500/20">
                                            {staff.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-base">{staff.name}</div>
                                            <div className="text-sm text-gray-500">{staff.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold">
                                        {staff.department}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-col gap-1.5 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <IoMailOutline className="w-4 h-4 text-primary-400" /> 
                                            {staff.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <IoCallOutline className="w-4 h-4 text-primary-400" /> 
                                            {staff.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                        staff.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                        staff.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                                        'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            staff.status === 'Active' ? 'bg-emerald-500' : 
                                            staff.status === 'On Leave' ? 'bg-amber-500' : 
                                            'bg-red-500'
                                        }`} />
                                        {staff.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEdit(staff)}
                                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                            title="Edit"
                                        >
                                            <IoCreateOutline className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(staff.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            title="Delete"
                                        >
                                            <IoTrashOutline className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

             {/* Mobile Card View */}
             <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                 {filteredStaff.map((staff) => (
                     <div key={staff.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-bl-full -mr-4 -mt-4 transition-colors ${
                            staff.status === 'Active' ? 'from-emerald-500 to-emerald-600' : 
                            staff.status === 'On Leave' ? 'from-amber-500 to-amber-600' : 
                            'from-red-500 to-red-600'
                        }`} />
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 flex items-center justify-center text-lg font-bold">
                                    {staff.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{staff.name}</h3>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{staff.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <IoBriefcaseOutline className="text-primary-400" />
                                <span className="font-medium">{staff.department} Dept</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm text-gray-600">
                                <IoMailOutline className="text-primary-400" />
                                <span className="truncate">{staff.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50 relative z-10">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                staff.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                                staff.status === 'On Leave' ? 'bg-amber-50 text-amber-700' : 
                                'bg-red-50 text-red-700'
                            }`}>
                                {staff.status}
                            </span>
                            <div className="flex gap-1">
                                <button 
                                    onClick={() => handleEdit(staff)}
                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                                >
                                    <IoCreateOutline className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(staff.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <IoTrashOutline className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                     </div>
                 ))}
             </div>
          </>
        ) : (
            <div className="text-center py-24">
                <div className="inline-flex p-6 rounded-full bg-gray-50 mb-6 text-gray-300">
                    <IoSearchOutline className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No staff members found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    We couldn't find any staff members matching your search. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={() => {setSearchTerm(""); setFilterDepartment("All"); setFilterStatus("All");}}
                  className="mt-6 text-primary-600 font-bold hover:underline"
                >
                    Clear All Filters
                </button>
            </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-scale-up border border-gray-100">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{isEditing ? "Edit Staff" : "Add New Staff"}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        {isEditing ? "Update staff member details and permissions" : "Enter details for the new team member"}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all shadow-sm border border-gray-100"
                  >
                        &times;
                  </button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium placeholder-gray-400 transition-all"
                            placeholder="e.g. Dr. John Doe"
                            value={selectedStaff.name}
                            onChange={(e) => setSelectedStaff({...selectedStaff, name: e.target.value})}
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Role Title</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium placeholder-gray-400 transition-all"
                             placeholder="e.g. Professor"
                            value={selectedStaff.role}
                            onChange={(e) => setSelectedStaff({...selectedStaff, role: e.target.value})}
                          />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium placeholder-gray-400 transition-all"
                        placeholder="john.doe@university.edu"
                        value={selectedStaff.email}
                        onChange={(e) => setSelectedStaff({...selectedStaff, email: e.target.value})}
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Department</label>
                          <div className="relative">
                            <select 
                                className="w-full appearance-none px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium cursor-pointer transition-all"
                                value={selectedStaff.department}
                                onChange={(e) => setSelectedStaff({...selectedStaff, department: e.target.value})}
                            >
                                <option value="Science">Science</option>
                                <option value="Arts">Arts</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Administration">Administration</option>
                            </select>
                            <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Status</label>
                          <div className="relative">
                            <select 
                                className="w-full appearance-none px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium cursor-pointer transition-all"
                                value={selectedStaff.status}
                                onChange={(e) => setSelectedStaff({...selectedStaff, status: e.target.value as StaffStatus})}
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Terminated">Terminated</option>
                            </select>
                            <IoEllipsisVerticalOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                          </div>
                      </div>
                  </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone</label>
                          <input 
                            type="tel" 
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium placeholder-gray-400 transition-all"
                            value={selectedStaff.phone}
                            onChange={(e) => setSelectedStaff({...selectedStaff, phone: e.target.value})}
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Join Date</label>
                          <input 
                            type="date" 
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-100 text-gray-900 font-medium placeholder-gray-400 transition-all"
                            value={selectedStaff.joinDate}
                            onChange={(e) => setSelectedStaff({...selectedStaff, joinDate: e.target.value})}
                          />
                      </div>
                   </div>

                  <div className="pt-6 flex justify-end gap-3 border-t border-gray-100">
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                      >
                        {isEditing ? "Save Changes" : "Create Member"}
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

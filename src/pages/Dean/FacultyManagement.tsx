import React, { useState } from "react";
import { IoAddCircleOutline, IoPencilOutline, IoSearchOutline, IoTrashOutline} from "react-icons/io5";
import { VscChecklist } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation
} from "../../app/api/departments";
import type { CreateDepartmentDto, Department } from "../../types/department";

const FacultyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState<CreateDepartmentDto>({
    name: "",
    code: "",
    description: "",
    headId: ""
  });

  const { data: departmentsResponse, isLoading, error } = useGetDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const departments = departmentsResponse?.data || [];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (dept: Department | null = null) => {
    if (dept) {
      setEditingDepartment(dept);
      setFormData({
        name: dept.name,
        code: dept.code,
        description: dept.description,
        headId: dept.headId
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        name: "",
        code: "",
        description: "",
        headId: ""
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDepartment) {
        await updateDepartment({ 
          id: editingDepartment.id || editingDepartment._id || "", 
          data: formData 
        }).unwrap();
        toast.success("Department updated successfully");
      } else {
        await createDepartment(formData).unwrap();
        toast.success("Department created successfully");
      }
      setShowModal(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id).unwrap();
        toast.success("Department deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete department");
      }
    }
  };

   if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfdfe] relative overflow-hidden">
          {/* Advanced Background Ambient Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-50/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
  
          <div className="z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
            {/* Custom Orbital Loader */}
            <div className="relative w-32 h-32 mb-12">
              {/* Outer Pulsing Ring */}
              <div className="absolute inset-0 rounded-full border border-primary-50/10 animate-[ping_3s_linear_infinite]" />
              
              {/* Middle Rotating Ring */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary-50/20 animate-[spin_10s_linear_infinite]" />
              
              {/* Main Content Container */}
              <div className="absolute inset-4 bg-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-primary-50/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-50/5 to-transparent animate-pulse" />
                <VscChecklist className="w-8 h-8 text-primary-50 relative z-10 animate-bounce" />
              </div>
  
              {/* Orbiting Particles */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-50 rounded-full shadow-[0_0_12px_rgba(30,41,59,0.4)]" />
              </div>
            </div>
  
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-3xl font-extrabold text-primary-50 tracking-tight leading-tight">
                Loading Departments
              </h2>
              <div className="flex items-center justify-center gap-3 py-2">
                <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-50 animate-[shimmer_1.5s_infinite] w-full origin-left" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary-50/30">
                  Wait shortly
                </span>
                <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-50 animate-[shimmer_1.5s_infinite] w-full origin-left [animation-delay:0.2s]" />
                </div>
              </div>
              <p className="text-sm text-primary-50/50 font-medium">
                We&apos;re preparing your available Departments list wait a moment please.
              </p>
            </div>
          </div>
        </div>
      );
    }
  if (error) return <div className="p-8 text-center text-red-500">Error loading departments</div>;

  return (
    <div className="p-4 sm:p-6 text-primary-50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-primary-50 to-primary-100 bg-clip-text text-transparent">Department Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage departmental structures and leadership</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-50/90 transition-colors w-full sm:w-auto shadow-md"
        >
          <IoAddCircleOutline className="w-5 h-5" />
          Add Department
        </button>
      </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 sm:p-4 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search departments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-50/20"
            />
          </div>
        </div>
        
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                <th className="px-3 sm:px-6 py-3 sm:py-4">Department Name</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Code</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Head ID</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">Description</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDepartments.map((dept, index) => (
                <tr key={dept.id || dept._id || index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold shrink-0 text-sm sm:text-base">
                        {dept.name.charAt(0)}
                      </div>
                      <p className="font-medium text-primary-50 text-sm sm:text-base">{dept.name}</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">{dept.code}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-sm text-gray-600">
                    {dept.headId}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                    <p className="text-sm text-gray-500 max-w-xs truncate">{dept.description}</p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(dept)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <IoPencilOutline className="w-4 h-4" />
                      </button>
                      <button 
                         onClick={() => handleDelete(dept.id || dept._id || "")}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDepartments.length === 0 && (
            <div className="p-6 sm:p-12 text-center text-gray-500 text-sm sm:text-base">
              <div className="mb-2">No departments found.</div>
              <button 
                onClick={() => handleOpenModal()}
                className="text-primary-50 font-semibold hover:underline"
              >
                Create your first department
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scaleIn">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-primary-50">
                {editingDepartment ? "Edit Department" : "Add New Department"}
              </h2>
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base" 
                  placeholder="e.g. Computer Science" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input 
                  type="text" 
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base" 
                  placeholder="e.g. CS" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department (User ID)</label>
                <input 
                  type="text" 
                  required
                  value={formData.headId}
                  onChange={(e) => setFormData({...formData, headId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base" 
                  placeholder="Enter User ID" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base resize-none" 
                  placeholder="Brief description of the department..."
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary-50 text-white hover:bg-primary-50/90 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto shadow-md"
              >
                {editingDepartment ? "Save Changes" : "Create Department"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { EmergencyContact } from "../types/StudentProfile";
import Input from "./ui/Input";

interface EmergencyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<EmergencyContact>) => Promise<void> | void;
  contact?: EmergencyContact | null;
  isLoading?: boolean;
}

const EmergencyContactModal: React.FC<EmergencyContactModalProps> = ({
  isOpen,
  onClose,
  onSave,
  contact,
  isLoading,
}) => {
  const [form, setForm] = useState<Partial<EmergencyContact>>({
    name: "",
    priority: "Primary",
    email: "",
    phone: "",
    mobilePhone: "",
    workPhone: "",
    relation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contact) {
      setForm(contact);
    } else {
      setForm({
        name: "",
        priority: "Primary",
        email: "",
        phone: "",
        mobilePhone: "",
        workPhone: "",
        relation: "",
      });
    }
    setErrors({});
  }, [contact, isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.phone && !form.mobilePhone) e.phone = "At least one phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary-50">
            {contact ? "Edit Emergency Contact" : "Add Emergency Contact"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary-50">Priority</label>
              <select
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all outline-none"
                value={typeof form.priority === 'string' ? form.priority : 'Primary'}
                onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
              >
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              label="Relation"
              placeholder="e.g. Parent, Sibling"
              value={form.relation || ""}
              onChange={(e) => setForm({ ...form, relation: e.target.value })}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. john@example.com"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Landline Phone"
              placeholder="e.g. 0123456789"
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={errors.phone}
            />
            <Input
              label="Mobile Phone"
              placeholder="e.g. 0987654321"
              value={form.mobilePhone || ""}
              onChange={(e) => setForm({ ...form, mobilePhone: e.target.value })}
            />
          </div>

          <Input
            label="Work Phone"
            placeholder="e.g. 0555444333"
            value={form.workPhone || ""}
            onChange={(e) => setForm({ ...form, workPhone: e.target.value })}
          />
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-primary-50 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-primary-100 text-primary-50 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all font-semibold"
          >
            {isLoading ? "Saving..." : contact ? "Update Contact" : "Add Contact"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactModal;

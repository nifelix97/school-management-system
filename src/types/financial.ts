export interface IncomeRecord {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  paymentType: string;
  date: string;
  status: "completed" | "pending" | "failed";
  method: string;
  receiptNumber: string;
}

export interface ExpenseRecord {
  id: string;
  category: string;
  vendor: string;
  amount: number;
  date: string;
  description: string;
  status: "approved" | "pending" | "rejected";
  paymentMethod: string;
  invoiceNumber: string;
}

export type IncomeStatus = "completed" | "pending" | "failed";
export type ExpenseStatus = "approved" | "pending" | "rejected";
export type PaymentMethod = "Bank Transfer" | "Mobile Money" | "Cash" | "Cheque";
export type PaymentType = "Tuition Fee" | "Registration Fee" | "Accommodation Fee" | "Library Fee" | "Exam Fee" | "Other";
export type ExpenseCategory = "Utilities" | "Supplies" | "Maintenance" | "Salaries" | "Technology" | "Infrastructure" | "Other";

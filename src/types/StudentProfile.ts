export type AcademicYear = number | `${number}/${number}`;

export interface EmergencyContact {
  id: string;
  name: string;
  priority: "Primary" | "Secondary" | "Other";
  email: string;
  phone?: string;
  mobilePhone?: string;
  workPhone?: string;
  relation?: string;
}

export interface StudentProfile {
  profileImageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  registrationNumber: string;
  currentYear: AcademicYear;

  // Optional enrichments useful for profile header/tabs
  title?: string;              // e.g., "Computer Science - Year 2"
  role?: string;               // e.g., "Student"
  program?: string;            // e.g., "BSc Computer Science"
  department?: string;

  emergencyContacts?: EmergencyContact[];
}

export interface StudentProfileUpdate {
  profileImageFile?: File | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  telephoneNumber?: string;
  registrationNumber?: string;
  currentYear?: AcademicYear;
  newPassword?: string;
}
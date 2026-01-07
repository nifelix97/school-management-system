// Certificate API Type Definitions

// --- Core Interfaces ---

export interface Certificate {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  verificationCode: string;
  issueDate: string;
  certificateUrl?: string;
  createdAt?: string;
}

export interface CertificateVerification {
  valid: boolean;
  certificate?: Certificate;
  message?: string;
}

// --- DTOs (Data Transfer Objects) ---

export interface GenerateCertificateDto {
  courseId: string;
}

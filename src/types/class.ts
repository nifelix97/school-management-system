// Class API Type Definitions

// --- Core Interface ---

export interface Class {
  id: string;
  _id?: string; // MongoDB ID format
  name: string;
  departmentId: string;
  instructorId: string;
  startDate: string; // ISO date string (YYYY-MM-DD)
  duration: string;
  status: 'current' | 'ongoing' | 'completed' | 'suspended' | 'retaking';
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateClassDto {
  name: string;
  departmentId: string;
  instructorId: string;
  startDate: string;
  duration: string;
  status: 'current' | 'ongoing' | 'completed' | 'suspended' | 'retaking';
  imageUrl?: string;
}

export interface UpdateClassDto extends Partial<CreateClassDto> {}

export interface ClassFilters {
  departmentId?: string;
}

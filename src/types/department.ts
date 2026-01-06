// Department API Type Definitions

// --- Core Interface ---

export interface Department {
  id: string;
  _id?: string; // MongoDB ID format
  name: string;
  code: string;
  description: string;
  headId: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateDepartmentDto {
  name: string;
  code: string;
  description: string;
  headId: string;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}

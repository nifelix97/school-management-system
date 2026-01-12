// Library API Type Definitions based on Swagger Documentation

// --- Enums and Literal Types ---

export type BookStatus = 'active' | 'damaged' | 'lost' | 'maintenance' | 'archived';
export type BorrowingStatus = 'issued' | 'returned' | 'overdue';
export type ReservationStatus = 'pending' | 'completed' | 'cancelled';
export type BookCondition = 'good' | 'damaged' | 'lost';

// --- Core Interfaces ---

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  subcategory?: string;
  publisher?: string;
  publicationYear?: number;
  edition?: string;
  language?: string;
  pages?: number;
  description?: string;
  coverImage?: string;
  totalCopies: number;
  availableCopies: number;
  status: BookStatus;
  location?: string; // e.g., "A-12"
  createdAt?: string;
  updatedAt?: string;
}

export interface Borrowing {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string; // ISO date
  dueDate: string; // ISO date
  returnDate?: string; // ISO date
  status: BorrowingStatus;
  fineAmount?: number;
  condition?: BookCondition;
  book?: Book;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Reservation {
  id: string;
  bookId: string;
  userId: string;
  reservationDate: string; // ISO date
  status: ReservationStatus;
  book?: Book;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  category: string;
  subcategory?: string;
  publisher?: string;
  publicationYear?: number;
  edition?: string;
  language?: string;
  pages?: number;
  description?: string;
  coverImage?: string;
  totalCopies: number;
  location?: string;
  status?: BookStatus;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}

export interface IssueBookDto {
  bookId: string;
  userId: string;
  dueDate: string; // ISO date
}

export interface ReturnBookDto {
  condition: BookCondition;
  fineAmount?: number;
}

export interface RenewBorrowingDto {
  newDueDate: string; // ISO date
}

export interface CreateReservationDto {
  bookId: string;
}

export interface BookFilters {
  category?: string;
  author?: string;
  status?: BookStatus;
  search?: string; // Search in title, author, isbn
  page?: number;
  limit?: number;
}

// --- Fines ---

export type FineStatus = 'pending' | 'paid' | 'waived';
export type FineReason = 'overdue' | 'damaged' | 'lost';

export interface Fine {
  id: string;
  userId: string;
  borrowingId?: string;
  amount: number;
  reason: FineReason;
  status: FineStatus;
  daysOverdue?: number;
  remarks?: string;
  paidAmount?: number;
  waiveReason?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  borrowing?: Borrowing;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFineDto {
  userId: string;
  amount: number;
  reason: FineReason;
  borrowingId?: string;
  daysOverdue?: number;
  remarks?: string;
}

export interface PayFineDto {
  paidAmount: number;
}

export interface WaiveFineDto {
  reason: string;
}

export interface FineFilters {
  userId?: string;
  status?: FineStatus;
}

// --- Digital Content ---

export interface DigitalBookAccess {
  bookId: string;
  title?: string;
  author?: string;
  accessUrl: string;
  digitalFileUrl?: string;
  digitalFileType?: string;
  digitalFileSize?: number;
  expiresAt?: string;
  allowOnlineReading: boolean;
  downloadable: boolean;
  hasBorrowed?: boolean;
}

export interface UploadDigitalDto {
  bookFile: File | Blob; // Used for multipart upload
  allowOnlineReading?: boolean;
  downloadable?: boolean;
}

// --- Statistics ---

export interface LibraryStats {
  totalBooks: number;
  activeBooks: number;
  borrowedBooks: number;
  overdueBooks: number;
  totalBorrowings: number;
  activeBorrowings: number;
  totalReservations: number;
  totalFines: number;
  collectedFines: number;
  pendingFines: number;
}


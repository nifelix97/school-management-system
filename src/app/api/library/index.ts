import type {
    Book,
    BookFilters,
    Borrowing,
    CreateBookDto,
    CreateFineDto,
    CreateReservationDto,
    DigitalBookAccess,
    Fine,
    FineFilters,
    IssueBookDto,
    LibraryStats,
    PayFineDto,
    RenewBorrowingDto,
    Reservation,
    ReturnBookDto,
    UpdateBookDto,
    UploadDigitalDto,
    WaiveFineDto
} from '../../../types/library';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    Book,
    BookFilters,
    Borrowing,
    CreateBookDto,
    CreateFineDto,
    CreateReservationDto,
    DigitalBookAccess,
    Fine,
    FineFilters,
    IssueBookDto,
    LibraryStats,
    PayFineDto,
    RenewBorrowingDto,
    Reservation,
    ReturnBookDto,
    UpdateBookDto,
    UploadDigitalDto,
    WaiveFineDto
};

// --- API Slice Injection ---

export const libraryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ========== Book Management ==========
    
    // Get all books with optional filters
    getBooks: builder.query<ApiResponse<Book[]>, BookFilters | void>({
      query: (filters) => ({
        url: '/library/books',
        params: filters || {},
      }),
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          category: book.category,
          subcategory: book.subcategory,
          publisher: book.publisher,
          publicationYear: book.publication_year || book.publicationYear,
          edition: book.edition,
          language: book.language,
          pages: book.pages,
          description: book.description,
          coverImage: book.cover_image || book.coverImage,
          totalCopies: book.total_copies || book.totalCopies,
          availableCopies: book.available_copies || book.availableCopies,
          status: book.status,
          location: book.location,
          createdAt: book.created_at || book.createdAt,
          updatedAt: book.updated_at || book.updatedAt,
        })) as Book[]
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Library' as const, id })),
              { type: 'Library', id: 'BOOKS' },
            ]
          : [{ type: 'Library', id: 'BOOKS' }],
    }),

    // Get a single book by ID
    getBookById: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/library/books/${id}`,
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: response.data ? {
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          isbn: response.data.isbn,
          category: response.data.category,
          subcategory: response.data.subcategory,
          publisher: response.data.publisher,
          publicationYear: response.data.publication_year || response.data.publicationYear,
          edition: response.data.edition,
          language: response.data.language,
          pages: response.data.pages,
          description: response.data.description,
          coverImage: response.data.cover_image || response.data.coverImage,
          totalCopies: response.data.total_copies || response.data.totalCopies,
          availableCopies: response.data.available_copies || response.data.availableCopies,
          status: response.data.status,
          location: response.data.location,
          createdAt: response.data.created_at || response.data.createdAt,
          updatedAt: response.data.updated_at || response.data.updatedAt,
        } as Book : undefined
      }),
      providesTags: (_result, _error, id) => [{ type: 'Library', id }],
    }),

    // Create a new book (Librarian only)
    createBook: builder.mutation<ApiResponse<Book>, CreateBookDto>({
      query: (data) => ({
        url: '/library/books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Library', id: 'BOOKS' }],
    }),

    // Update a book (Librarian only)
    updateBook: builder.mutation<ApiResponse<Book>, { id: string; data: UpdateBookDto }>({
      query: ({ id, data }) => ({
        url: `/library/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Library', id },
        { type: 'Library', id: 'BOOKS' },
      ],
    }),

    // ========== Borrowing Management ==========

    // Issue book to user (Librarian only)
    issueBook: builder.mutation<ApiResponse<Borrowing>, IssueBookDto>({
      query: (data) => ({
        url: '/library/borrowings/issue',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Library', id: 'BOOKS' },
        { type: 'Library', id: 'BORROWINGS' },
      ],
    }),

    // Return book (Librarian only)
    returnBook: builder.mutation<ApiResponse<Borrowing>, { borrowingId: string; data: ReturnBookDto }>({
      query: ({ borrowingId, data }) => ({
        url: `/library/borrowings/${borrowingId}/return`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Library', id: 'BOOKS' },
        { type: 'Library', id: 'BORROWINGS' },
      ],
    }),

    // Renew book borrowing
    renewBorrowing: builder.mutation<ApiResponse<Borrowing>, { borrowingId: string; data: RenewBorrowingDto }>({
      query: ({ borrowingId, data }) => ({
        url: `/library/borrowings/${borrowingId}/renew`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Library', id: 'BORROWINGS' }],
    }),

    // Get user's borrowing history
    getUserBorrowings: builder.query<ApiResponse<Borrowing[]>, string>({
      query: (userId) => `/library/borrowings/user/${userId}`,
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(borrowing => ({
          id: borrowing.id,
          bookId: borrowing.book_id || borrowing.bookId,
          userId: borrowing.user_id || borrowing.userId,
          issueDate: borrowing.issue_date || borrowing.issueDate,
          dueDate: borrowing.due_date || borrowing.dueDate,
          returnDate: borrowing.return_date || borrowing.returnDate,
          status: borrowing.status,
          fineAmount: borrowing.fine_amount || borrowing.fineAmount,
          condition: borrowing.condition,
          book: borrowing.book,
          user: borrowing.user,
          createdAt: borrowing.created_at || borrowing.createdAt,
          updatedAt: borrowing.updated_at || borrowing.updatedAt,
        })) as Borrowing[]
      }),
      providesTags: (_result, _error, userId) => [
        { type: 'Library', id: `USER_BORROWINGS-${userId}` },
        { type: 'Library', id: 'BORROWINGS' },
      ],
    }),

    // Get all active borrowings (Librarian only)
    getActiveBorrowings: builder.query<ApiResponse<Borrowing[]>, void>({
      query: () => '/library/borrowings/active',
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(borrowing => ({
          id: borrowing.id,
          bookId: borrowing.book_id || borrowing.bookId,
          userId: borrowing.user_id || borrowing.userId,
          issueDate: borrowing.borrowed_date || borrowing.issue_date || borrowing.issueDate,
          dueDate: borrowing.due_date || borrowing.dueDate,
          returnDate: borrowing.returned_date || borrowing.return_date || borrowing.returnDate,
          status: borrowing.status === 'borrowed' ? 'issued' : borrowing.status, // Map 'borrowed' to 'issued'
          fineAmount: borrowing.fine_amount ? parseFloat(borrowing.fine_amount) : (borrowing.fineAmount || 0),
          condition: borrowing.condition,
          // Construct book object from flattened data
          book: borrowing.title ? {
            id: borrowing.book_id,
            title: borrowing.title,
            author: borrowing.author,
            isbn: borrowing.isbn,
            category: borrowing.category || '',
            totalCopies: 0,
            availableCopies: 0,
            status: 'active' as const,
          } : borrowing.book,
          // Construct user object from flattened data
          user: borrowing.user_name ? {
            id: borrowing.user_id,
            firstName: borrowing.user_name?.split(' ')[0] || '',
            lastName: borrowing.user_name?.split(' ').slice(1).join(' ') || '',
            email: borrowing.user_email || '',
          } : borrowing.user,
          createdAt: borrowing.created_at || borrowing.createdAt,
          updatedAt: borrowing.updated_at || borrowing.updatedAt,
        })) as Borrowing[]
      }),
      providesTags: [{ type: 'Library', id: 'BORROWINGS' }],
    }),

    // ========== Reservations ==========

    // Reserve a book
    createReservation: builder.mutation<ApiResponse<Reservation>, CreateReservationDto>({
      query: (data) => ({
        url: '/library/reservations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Library', id: 'RESERVATIONS' }],
    }),

    // Get all reservations (Librarian only)
    getReservations: builder.query<ApiResponse<Reservation[]>, void>({
      query: () => '/library/reservations',
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(reservation => ({
          id: reservation.id,
          bookId: reservation.book_id || reservation.bookId,
          userId: reservation.user_id || reservation.userId,
          reservationDate: reservation.reservation_date || reservation.reservationDate,
          status: reservation.status,
          // Construct book object from flattened data if available
          book: reservation.book_title ? {
            id: reservation.book_id,
            title: reservation.book_title,
            author: reservation.book_author || '',
            isbn: reservation.book_isbn || '',
            category: '',
            totalCopies: 0,
            availableCopies: 0,
            status: 'active' as const,
          } : reservation.book,
          // Construct user object from flattened data if available
          user: reservation.user_name ? {
            id: reservation.user_id,
            firstName: reservation.user_name?.split(' ')[0] || '',
            lastName: reservation.user_name?.split(' ').slice(1).join(' ') || '',
            email: reservation.user_email || '',
          } : reservation.user,
          createdAt: reservation.created_at || reservation.createdAt,
          updatedAt: reservation.updated_at || reservation.updatedAt,
        })) as Reservation[]
      }),
      providesTags: [{ type: 'Library', id: 'RESERVATIONS' }],
    }),

    // Get user's reservations
    getUserReservations: builder.query<ApiResponse<Reservation[]>, string>({
      query: (userId) => `/library/reservations/user/${userId}`,
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(reservation => ({
          id: reservation.id,
          bookId: reservation.book_id || reservation.bookId,
          userId: reservation.user_id || reservation.userId,
          reservationDate: reservation.reservation_date || reservation.reservationDate,
          status: reservation.status,
          book: reservation.book,
          user: reservation.user,
          createdAt: reservation.created_at || reservation.createdAt,
          updatedAt: reservation.updated_at || reservation.updatedAt,
        })) as Reservation[]
      }),
      providesTags: (_result, _error, userId) => [
        { type: 'Library', id: `USER_RESERVATIONS-${userId}` },
        { type: 'Library', id: 'RESERVATIONS' },
      ],
    }),

    // Approve reservation (Librarian only)
    approveReservation: builder.mutation<ApiResponse<void>, string>({
      query: (reservationId) => ({
        url: `/library/reservations/${reservationId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Library', id: 'RESERVATIONS' }],
    }),

    // Fulfill reservation (Librarian only)
    fulfillReservation: builder.mutation<ApiResponse<void>, string>({
      query: (reservationId) => ({
        url: `/library/reservations/${reservationId}/fulfill`,
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Library', id: 'RESERVATIONS' },
        { type: 'Library', id: 'BORROWINGS' },
        { type: 'Library', id: 'BOOKS' },
      ],
    }),

    // Cancel reservation
    cancelReservation: builder.mutation<ApiResponse<void>, string>({
      query: (reservationId) => ({
        url: `/library/reservations/${reservationId}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Library', id: 'RESERVATIONS' }],
    }),

    // ========== Fines (Librarian/User) ==========

    // Create a fine (Librarian only)
    createFine: builder.mutation<ApiResponse<Fine>, CreateFineDto>({
      query: (data) => ({
        url: '/library/fines',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Library', id: 'FINES' }],
    }),

    // Get fines for a specific user
    getUserFines: builder.query<ApiResponse<Fine[]>, { userId: string; filters?: FineFilters }>({
      query: ({ userId, filters }) => ({
        url: `/library/fines/user/${userId}`,
        params: filters || {},
      }),
      providesTags: (_result, _error, { userId }) => [
        { type: 'Library', id: `USER_FINES-${userId}` },
        { type: 'Library', id: 'FINES' },
      ],
    }),

    // Pay a fine (Librarian only)
    payFine: builder.mutation<ApiResponse<Fine>, { fineId: string; data: PayFineDto }>({
      query: ({ fineId, data }) => ({
        url: `/library/fines/${fineId}/pay`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { fineId }) => [
        { type: 'Library', id: `FINE-${fineId}` },
        { type: 'Library', id: 'FINES' },
      ],
    }),

    // Waive a fine (Librarian only)
    waiveFine: builder.mutation<ApiResponse<Fine>, { fineId: string; data: WaiveFineDto }>({
      query: ({ fineId, data }) => ({
        url: `/library/fines/${fineId}/waive`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { fineId }) => [
        { type: 'Library', id: `FINE-${fineId}` },
        { type: 'Library', id: 'FINES' },
      ],
    }),

    // ========== Digital Content ==========

    // Upload digital book (Librarian only)
    uploadDigitalBook: builder.mutation<ApiResponse<void>, { bookId: string; data: UploadDigitalDto }>({
      query: ({ bookId, data }) => {
        const formData = new FormData();
        formData.append('bookFile', data.bookFile);
        if (data.allowOnlineReading !== undefined) formData.append('allowOnlineReading', String(data.allowOnlineReading));
        if (data.downloadable !== undefined) formData.append('downloadable', String(data.downloadable));
        
        return {
          url: `/library/books/${bookId}/digital`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { bookId }) => [
        { type: 'Library', id: bookId },
        { type: 'Library', id: 'BOOKS' },
        { type: 'Library', id: 'DIGITAL_BOOKS' },
      ],
    }),

    // Get all digital books
    getDigitalBooks: builder.query<ApiResponse<Book[]>, BookFilters | void>({
      query: (filters) => ({
        url: '/library/digital-books',
        params: filters || {},
      }),
      providesTags: [{ type: 'Library', id: 'DIGITAL_BOOKS' }],
    }),

    // Get digital book access
    getDigitalBookAccess: builder.query<ApiResponse<DigitalBookAccess>, string>({
      query: (bookId) => `/library/books/${bookId}/digital/access`,
      providesTags: (_result, _error, bookId) => [{ type: 'Library', id: `DIGITAL_ACCESS-${bookId}` }],
    }),

    // ========== Statistics ==========

    // Get general library statistics (Librarian only)
    getLibraryStats: builder.query<ApiResponse<LibraryStats>, void>({
      query: () => '/library/stats',
      providesTags: [{ type: 'Library', id: 'STATS' }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Books
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  // Borrowing
  useIssueBookMutation,
  useReturnBookMutation,
  useRenewBorrowingMutation,
  useGetUserBorrowingsQuery,
  useGetActiveBorrowingsQuery,
  // Reservations
  useCreateReservationMutation,
  useGetReservationsQuery,
  useGetUserReservationsQuery,
  useApproveReservationMutation,
  useCancelReservationMutation,
  useFulfillReservationMutation,
  // Fines
  useCreateFineMutation,
  useGetUserFinesQuery,
  usePayFineMutation,
  useWaiveFineMutation,
  // Digital Content
  useUploadDigitalBookMutation,
  useGetDigitalBooksQuery,
  useGetDigitalBookAccessQuery,
  // Statistics
  useGetLibraryStatsQuery,
} = libraryApi;

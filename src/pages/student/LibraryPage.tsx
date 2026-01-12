import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  Heart,
  Loader2,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";
import {
  useCreateReservationMutation,
  useGetBookByIdQuery,
  useGetBooksQuery,
  useGetDigitalBookAccessQuery,
  type Book,
} from "../../app/api/library";
import { toast } from "react-toastify";


export default function LibraryPage() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showReserveModal, setShowReserveModal] = useState(false);

  // Get current user from localStorage
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  // Fetch all books with filters
  const { data: booksResponse, isLoading: booksLoading, error: booksError } = useGetBooksQuery({
    search: searchTerm || undefined,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
  });

  // Fetch selected book details
  const { data: bookDetailResponse, isLoading: bookDetailLoading } = useGetBookByIdQuery(
    selectedBookId!,
    { skip: !selectedBookId }
  );

  // Fetch digital book access when reading
  const { data: digitalAccessResponse, isLoading: digitalAccessLoading } = useGetDigitalBookAccessQuery(
    selectedBookId!,
    { skip: !selectedBookId || !isReading }
  );

  // Reservation mutation
  const [createReservation, { isLoading: reservationLoading }] = useCreateReservationMutation();

  const books: Book[] = booksResponse?.data || [];
  const selectedBook = bookDetailResponse?.data;

  // Get unique categories from books
  const categories = ["all", ...Array.from(new Set(books.map(book => book.category)))];

  const handleRateBook = (rating: number) => {
    // TODO: Implement rating API when available
    setUserRating(rating);
    setShowRatingModal(false);
    console.log("Rating book:", selectedBookId, "with rating:", rating);
  };

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(bookId)) {
        newFavorites.delete(bookId);
      } else {
        newFavorites.add(bookId);
      }
      return newFavorites;
    });
  };

  const handleReserveBook = async () => {
    if (!selectedBookId) return;
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("Please log in to reserve books.");
      return;
    }

    try {
      await createReservation({ bookId: selectedBookId }).unwrap();
      setShowReserveModal(false);
      toast.success("Book reserved successfully!");
    } catch (error) {
      console.error("Failed to reserve book:", error);
      toast.error(`Book is available. Please borrow directly.`);
    }
  };

  const handleReadNow = () => {
    setIsReading(true);
  };

  // Loading state for books list
  if (booksLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading library...</span>
      </div>
    );
  }

  // Error state for books list
  if (booksError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-primary-50 mb-2">ops</h2>
        <p className="text-primary-50 text-center">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  // Reading view
  if (isReading && selectedBook) {
    if (digitalAccessLoading) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
          <span className="ml-2 text-primary-50">Loading book content...</span>
        </div>
      );
    }

    if (!digitalAccessResponse?.data) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-primary-50 mb-2">Digital Content Unavailable</h2>
          <p className="text-primary-50 text-center mb-6">
            This book does not have digital content available for online reading.
          </p>
          <button
            onClick={() => setIsReading(false)}
            className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90"
          >
            Back to Book Details
          </button>
        </div>
      );
    }

    const digitalAccess = digitalAccessResponse.data;
    const isPDF = digitalAccess.digitalFileType === 'pdf' || digitalAccess.accessUrl?.toLowerCase().endsWith('.pdf');

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <button
              onClick={() => setIsReading(false)}
              className="flex items-center gap-2 text-primary-50 hover:text-opacity-80"
            >
              <ChevronLeft size={20} />
              <span>Back to Book Details</span>
            </button>
            <div className="flex items-center gap-4">
              {digitalAccess.downloadable && (
                <a
                  href={digitalAccess.accessUrl}
                  download={`${selectedBook.title}.${digitalAccess.digitalFileType || 'pdf'}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Download Book
                </a>
              )}
              <div className="text-sm text-primary-50">
                {selectedBook.pages ? `${selectedBook.pages} pages` : 'Digital Book'}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <h1 className="text-2xl font-bold text-primary-50 p-4 bg-white border-b">
              {selectedBook.title}
              <span className="text-sm font-normal text-gray-600 ml-2">by {selectedBook.author}</span>
            </h1>
            
            {digitalAccess.allowOnlineReading ? (
  <div className="w-full" style={{ height: 'calc(100vh - 200px)' }}>
    {isPDF ? (
      // For PDFs - Use Google Docs Viewer as fallback
      <iframe 
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(digitalAccess.accessUrl)}&embedded=true`}
        className="w-full h-full border-0"
        title={selectedBook.title}
      />
    ) : (
      // For other formats - direct link
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-primary-50 mb-4">
          {digitalAccess.digitalFileType?.toUpperCase()} files require a dedicated reader
        </p>
        <a
          href={digitalAccess.accessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-opacity-90"
        >
          Open in New Tab
        </a>
      </div>
    )}
  </div>
) : (
  <div className="text-center py-16 bg-white">
    <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
    <p className="text-primary-50 mb-2 text-lg font-semibold">
      Online reading is not available for this book
    </p>
    <p className="text-gray-600 mb-6">
      You can download the book to read it offline
    </p>
    {digitalAccess.downloadable && (
      <a 
        href={digitalAccess.accessUrl}
        download={`${selectedBook.title}.${digitalAccess.digitalFileType || 'pdf'}`}
        className="px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 inline-flex items-center gap-2"
      >
        <BookOpen size={20} />
        Download Book ({digitalAccess.digitalFileType?.toUpperCase() || 'PDF'})
      </a>
    )}
  </div>
)}

          </div>
        </div>
      </div>
    );
  }

  // Book detail view
  if (selectedBook) {
    if (bookDetailLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
          <span className="ml-2 text-primary-50">Loading book details...</span>
        </div>
      );
    }

    const isAvailable = selectedBook.availableCopies > 0 && selectedBook.status === 'active';
    const isFavorite = favorites.has(selectedBook.id);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedBookId(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Library</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 xs:p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedBook.coverImage || 'https://via.placeholder.com/192x256?text=No+Cover'}
                    alt={selectedBook.title}
                    className="w-48 h-64 object-cover rounded-lg mx-auto md:mx-0"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">
                        {selectedBook.title}
                      </h1>
                      <p className="text-lg text-primary-50 mb-2">by {selectedBook.author}</p>
                      <div className="flex items-center gap-4 text-sm text-primary-50 mb-4">
                        <span>{selectedBook.category}</span>
                        {selectedBook.pages && <span>{selectedBook.pages} pages</span>}
                        {selectedBook.publicationYear && <span>{selectedBook.publicationYear}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(selectedBook.id)}
                      className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {selectedBook.isbn && (
                    <p className="text-sm text-primary-50 mb-4">ISBN: {selectedBook.isbn}</p>
                  )}

                  {selectedBook.description && (
                    <p className="text-primary-50 mb-6 leading-relaxed">
                      {selectedBook.description}
                    </p>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-primary-50">Availability:</span>
                      <span className={`font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {isAvailable 
                          ? `${selectedBook.availableCopies} of ${selectedBook.totalCopies} available`
                          : 'Currently Unavailable'
                        }
                      </span>
                    </div>
                    {selectedBook.location && (
                      <p className="text-sm text-primary-50">Location: {selectedBook.location}</p>
                    )}
                  </div>

                  <div className="flex flex-col xs:flex-row gap-3">
                    <button
                      onClick={handleReadNow}
                      className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2"
                    >
                      <BookOpen size={20} />
                      <span>Read Now</span>
                    </button>
                    <button
                      onClick={() => setShowReserveModal(true)}
                      disabled={!isAvailable || reservationLoading}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {reservationLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Star size={20} />
                          <span>Reserve Book</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reserve Confirmation Modal */}
        {showReserveModal && (
          <div className="fixed inset-0 bg-primary-50/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-primary-50 mb-4">Reserve this book?</h3>
              <p className="text-primary-50 mb-6">
                You are about to reserve "{selectedBook.title}". You will be notified when it's available for pickup.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReserveModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-primary-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReserveBook}
                  disabled={reservationLoading}
                  className="flex-1 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-300"
                >
                  {reservationLoading ? 'Reserving...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-primary-50 mb-4">Rate this book</h3>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`p-1 ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star size={32} fill={star <= userRating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-primary-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRateBook(userRating)}
                  className="flex-1 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90"
                  disabled={userRating === 0}
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main library view (books list)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-3 xs:mb-4"
        >
          <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl xs:text-2xl font-bold text-primary-50">Digital Library</h1>
          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50"
                size={18}
              />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-primary-50 rounded-lg "
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-primary-50"
            >
              {categories.map(category => (
                <option key={category} value={category} className="text-primary-50">
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary-50 mb-2">No books found</h3>
            <p className="text-primary-50">
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "The library is currently empty"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6">
            {books.map((book) => {
              const isAvailable = book.availableCopies > 0 && book.status === 'active';
              const isFavorite = favorites.has(book.id);

              return (
                <div
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover'}
                      alt={book.title}
                      className="w-full h-48 object-cover"
                    />
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Unavailable</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(book.id);
                      }}
                      className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${
                        isFavorite ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-primary-50 mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-primary-50 mb-2">{book.author}</p>
                    <p className="text-xs text-primary-50/40 mb-3">{book.category}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-primary-50">
                        {isAvailable 
                          ? `${book.availableCopies} available`
                          : 'Not available'
                        }
                      </div>
                      {book.pages && (
                        <span className="text-xs text-primary-50">{book.pages} pages</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
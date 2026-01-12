import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  IoAddOutline,
  IoAlertCircleOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoFilterOutline,
  IoGridOutline,
  IoListOutline,
  IoQrCodeOutline,
  IoSaveOutline,
  IoSearchOutline,
  IoTrashOutline
} from "react-icons/io5";
import {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetLibraryStatsQuery,
  useUpdateBookMutation,
  type Book,
  type CreateBookDto,
  type UpdateBookDto
} from "../../app/api/library";
import Input from "../../components/ui/Input";

const BookCatalog: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // API hooks
  const { data: booksResponse, isLoading: isBooksLoading, error: booksError } = useGetBooksQuery();
  const { data: statsResponse, isLoading: isStatsLoading } = useGetLibraryStatsQuery();
  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const books = booksResponse?.data || [];
  const stats = statsResponse?.data;

  // Form state for adding/editing books
  const initialFormState = {
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    publicationYear: "",
    edition: "",
    totalCopies: "",
    location: "",
    description: "",
  };

  const [bookForm, setBookForm] = useState(initialFormState);

  // Sync form when editing
  useEffect(() => {
    if (editingBook) {
      setBookForm({
        title: editingBook.title || "",
        author: editingBook.author || "",
        isbn: editingBook.isbn || "",
        category: editingBook.category || "",
        publisher: editingBook.publisher || "",
        publicationYear: editingBook.publicationYear?.toString() || "",
        edition: editingBook.edition || "",
        totalCopies: editingBook.totalCopies?.toString() || "",
        location: editingBook.location || "",
        description: editingBook.description || "",
      });
      setShowAddModal(true);
    } else {
      setBookForm(initialFormState);
    }
  }, [editingBook]);

  const categories = ["all", ...Array.from(new Set(books.map(b => b.category).filter(Boolean)))];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "archived", label: "Archived" },
  ];

  // Filter books based on search and filters
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || book.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-600 border-green-200";
      case "inactive":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "archived":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "inactive":
      case "archived":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (confirm("Are you sure you want to archive this book?")) {
      try {
        await updateBook({ id: bookId, data: { status: 'archived' } }).unwrap();
        alert("Book archived successfully.");
      } catch (err) {
        console.error("Failed to archive book:", err);
        alert("Failed to archive book. Please try again.");
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setBookForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookData: CreateBookDto = {
      title: bookForm.title,
      author: bookForm.author,
      isbn: bookForm.isbn,
      category: bookForm.category,
      publisher: bookForm.publisher,
      publicationYear: bookForm.publicationYear ? parseInt(bookForm.publicationYear) : undefined,
      edition: bookForm.edition,
      totalCopies: parseInt(bookForm.totalCopies) || 1,
      location: bookForm.location,
      description: bookForm.description,
      status: 'active'
    };

    try {
      if (editingBook) {
        await updateBook({ id: editingBook.id, data: bookData as UpdateBookDto }).unwrap();
        alert("Book updated successfully!");
      } else {
        await createBook(bookData).unwrap();
        alert("Book added successfully!");
      }
      setShowAddModal(false);
      setEditingBook(null);
      setBookForm(initialFormState);
    } catch (err) {
      console.error("Failed to save book:", err);
      alert("Failed to save book. Please check your inputs and try again.");
    }
  };

  if (isBooksLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading catalog...</span>
      </div>
    );
  }

  if (booksError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex flex-col items-center justify-center p-4">
        <IoAlertCircleOutline className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-primary-50 mb-2">Error Loading Catalog</h2>
        <p className="text-primary-50 text-center">
          We encountered an error while loading the book catalog. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Book Catalog
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage and organize your library collection
            </p>
          </div>
          <button
            onClick={() => {
                setEditingBook(null);
                setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
          >
            <IoAddOutline className="w-5 h-5" />
            Add New Book
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Books</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-50">
                    {isStatsLoading ? "..." : stats?.totalBooks || books.length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
                <IoBookOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Available</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {isStatsLoading ? "..." : stats?.activeBooks || books.filter(b => b.availableCopies > 0).length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <IoCheckmarkCircleOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Borrowed</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                  {isStatsLoading ? "..." : stats?.borrowedBooks || books.reduce((acc, b) => acc + (b.totalCopies - b.availableCopies), 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <IoCheckmarkOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Categories</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {categories.length - 1}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <IoFilterOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<IoSearchOutline className="w-5 h-5" />}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <IoFilterOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40 z-10" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all appearance-none bg-gray-50 cursor-pointer min-w-[200px]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-4 pr-8 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all appearance-none bg-gray-50 cursor-pointer min-w-[150px]"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-primary-50 shadow-sm"
                    : "text-primary-50/60 hover:text-primary-50"
                }`}
              >
                <IoGridOutline className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white text-primary-50 shadow-sm"
                    : "text-primary-50/60 hover:text-primary-50"
                }`}
              >
                <IoListOutline className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Books Display */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <IoBookOutline className="w-16 h-16 text-primary-50/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-primary-50 mb-2">No Books Found</h3>
          <p className="text-primary-50/60">
            {searchQuery || selectedCategory !== "all" || selectedStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Start by adding your first book to the catalog"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-[fadeIn_0.5s_ease-out_both]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Book Cover */}
              <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover relative z-10" />
                ) : (
                    <IoBookOutline className="w-20 h-20 text-white/80 relative z-10" />
                )}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(book.status)}`}>
                  {getStatusIcon(book.status)}
                  {book.status}
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <h3 className="font-bold text-primary-50 mb-1 line-clamp-2 group-hover:text-primary-100 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-primary-50/60 mb-3 line-clamp-1">{book.author}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-50/60">ISBN:</span>
                    <span className="font-semibold text-primary-50">{book.isbn}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-50/60">Category:</span>
                    <span className="px-2 py-0.5 bg-primary-50/10 text-primary-50 rounded-full font-semibold">
                      {book.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-50/60">Available:</span>
                    <span className={`font-bold ${book.availableCopies === 0 ? 'text-red-500' : 'text-primary-50'}`}>
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(book)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                  >
                    <IoEyeOutline className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    onClick={() => handleEditBook(book)}
                    className="p-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors">
                    <IoCreateOutline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-primary-50">{book.title}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{book.author}</td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{book.isbn}</td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-primary-50/10 text-primary-50 rounded-full text-xs font-semibold">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-primary-50">
                      {book.availableCopies}/{book.totalCopies}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(book.status)}`}>
                        {getStatusIcon(book.status)}
                        {book.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(book)}
                          className="p-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors"
                          title="View Details"
                        >
                          <IoEyeOutline className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditBook(book)}
                          className="p-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors"
                          title="Edit"
                        >
                          <IoCreateOutline className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {showDetailsModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Book Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Title</label>
                    <p className="text-base font-semibold text-primary-50">{selectedBook.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Author</label>
                    <p className="text-base text-primary-50">{selectedBook.author}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">ISBN</label>
                    <p className="text-base text-primary-50">{selectedBook.isbn}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Category</label>
                    <span className="px-3 py-1 bg-primary-50/10 text-primary-50 rounded-full text-sm font-semibold inline-block">
                      {selectedBook.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Publisher</label>
                    <p className="text-base text-primary-50">{selectedBook.publisher || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Publish Year</label>
                    <p className="text-base text-primary-50">{selectedBook.publicationYear || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Edition</label>
                    <p className="text-base text-primary-50">{selectedBook.edition || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Location</label>
                    <p className="text-base text-primary-50">{selectedBook.location || "N/A"}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Description</label>
                    <p className="text-base text-primary-50 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {selectedBook.description || "No description available."}
                    </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-primary-50/60 mb-1">Total Copies</p>
                    <p className="text-2xl font-bold text-primary-50">{selectedBook.totalCopies}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-green-600/80 mb-1">Available</p>
                    <p className="text-2xl font-bold text-green-600">{selectedBook.availableCopies}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-amber-600/80 mb-1">Borrowed</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {selectedBook.totalCopies - selectedBook.availableCopies}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-semibold">
                  <IoQrCodeOutline className="w-5 h-5" />
                  Generate Barcode
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold">
                  <IoDownloadOutline className="w-5 h-5" />
                  Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">
                {editingBook ? "Edit Book" : "Add New Book"}
              </h2>
              <button
                onClick={() => {
                    setShowAddModal(false);
                    setEditingBook(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>
            
            <form onSubmit={handleSaveBook} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Book Title"
                  type="text"
                  placeholder="Enter book title"
                  value={bookForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
                <Input
                  label="Author"
                  type="text"
                  placeholder="Enter author name"
                  value={bookForm.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
                <Input
                  label="ISBN"
                  type="text"
                  placeholder="Enter ISBN"
                  value={bookForm.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  required
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={bookForm.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c !== "all").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {!categories.includes("Computer Science") && <option value="Computer Science">Computer Science</option>}
                    {!categories.includes("Software Engineering") && <option value="Software Engineering">Software Engineering</option>}
                    {!categories.includes("Mathematics") && <option value="Mathematics">Mathematics</option>}
                    {!categories.includes("Physics") && <option value="Physics">Physics</option>}
                    {!categories.includes("Literature") && <option value="Literature">Literature</option>}
                  </select>
                </div>
                <Input
                  label="Publisher"
                  type="text"
                  placeholder="Enter publisher"
                  value={bookForm.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                />
                <Input
                  label="Publication Year"
                  type="number"
                  placeholder="Enter year"
                  value={bookForm.publicationYear}
                  onChange={(e) => handleInputChange('publicationYear', e.target.value)}
                />
                <Input
                  label="Edition"
                  type="text"
                  placeholder="e.g., 1st Edition"
                  value={bookForm.edition}
                  onChange={(e) => handleInputChange('edition', e.target.value)}
                />
                <Input
                  label="Total Copies"
                  type="number"
                  placeholder="Enter number of copies"
                  value={bookForm.totalCopies}
                  onChange={(e) => handleInputChange('totalCopies', e.target.value)}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Location"
                    type="text"
                    placeholder="e.g., Section A, Shelf 12"
                    value={bookForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-primary-50 mb-2">Description</label>
                    <textarea
                      value={bookForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter book description..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50 resize-none"
                    />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                      setShowAddModal(false);
                      setEditingBook(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50"
                >
                  {isCreating || isUpdating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                      <IoSaveOutline className="w-5 h-5" />
                  )}
                  {editingBook ? "Update Book" : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;

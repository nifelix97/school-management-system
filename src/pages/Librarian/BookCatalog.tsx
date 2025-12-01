import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoBookOutline,
    IoCheckmarkCircleOutline,
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
    IoTrashOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publishYear: number;
  edition: string;
  totalCopies: number;
  availableCopies: number;
  status: "available" | "low-stock" | "out-of-stock";
  location: string;
  coverImage?: string;
}

const BookCatalog: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Form state for adding books
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    publishYear: "",
    edition: "",
    totalCopies: "",
    location: "",
  });

  // Mock data - in a real app, this would come from an API
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen, Charles E. Leiserson",
      isbn: "978-0262033848",
      category: "Computer Science",
      publisher: "MIT Press",
      publishYear: 2009,
      edition: "3rd Edition",
      totalCopies: 15,
      availableCopies: 8,
      status: "available",
      location: "Section A, Shelf 12",
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Software Engineering",
      publisher: "Prentice Hall",
      publishYear: 2008,
      edition: "1st Edition",
      totalCopies: 10,
      availableCopies: 2,
      status: "low-stock",
      location: "Section A, Shelf 15",
    },
    {
      id: "3",
      title: "Design Patterns",
      author: "Erich Gamma, Richard Helm",
      isbn: "978-0201633612",
      category: "Software Engineering",
      publisher: "Addison-Wesley",
      publishYear: 1994,
      edition: "1st Edition",
      totalCopies: 8,
      availableCopies: 0,
      status: "out-of-stock",
      location: "Section A, Shelf 14",
    },
    {
      id: "4",
      title: "The Lean Startup",
      author: "Eric Ries",
      isbn: "978-0307887894",
      category: "Business",
      publisher: "Crown Business",
      publishYear: 2011,
      edition: "1st Edition",
      totalCopies: 12,
      availableCopies: 7,
      status: "available",
      location: "Section B, Shelf 5",
    },
    {
      id: "5",
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell, Peter Norvig",
      isbn: "978-0136042594",
      category: "Computer Science",
      publisher: "Pearson",
      publishYear: 2020,
      edition: "4th Edition",
      totalCopies: 20,
      availableCopies: 12,
      status: "available",
      location: "Section A, Shelf 10",
    },
    {
      id: "6",
      title: "Database System Concepts",
      author: "Abraham Silberschatz, Henry F. Korth",
      isbn: "978-0078022159",
      category: "Computer Science",
      publisher: "McGraw-Hill",
      publishYear: 2019,
      edition: "7th Edition",
      totalCopies: 18,
      availableCopies: 3,
      status: "low-stock",
      location: "Section A, Shelf 11",
    },
  ]);

  const categories = ["all", "Computer Science", "Software Engineering", "Business", "Engineering", "Medicine", "Arts & Literature"];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "available", label: "Available" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
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
      case "available":
        return "bg-green-50 text-green-600 border-green-200";
      case "low-stock":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "out-of-stock":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "low-stock":
      case "out-of-stock":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleDeleteBook = (bookId: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== bookId));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewBook(prev => ({ ...prev, [field]: value }));
  };

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
            onClick={() => setShowAddModal(true)}
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
                <p className="text-2xl sm:text-3xl font-bold text-primary-50">{books.length}</p>
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
                  {books.filter((b) => b.status === "available").length}
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
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Low Stock</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                  {books.filter((b) => b.status === "low-stock").length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <IoAlertCircleOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Out of Stock</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {books.filter((b) => b.status === "out-of-stock").length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <IoAlertCircleOutline className="w-6 h-6 text-white" />
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
                <IoBookOutline className="w-20 h-20 text-white/80 relative z-10" />
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(book.status)}`}>
                  {getStatusIcon(book.status)}
                  {book.status.replace("-", " ")}
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
                    <span className="font-bold text-primary-50">
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
                  <button className="p-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors">
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
                        {book.status.replace("-", " ")}
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
                    <p className="text-base text-primary-50">{selectedBook.publisher}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Publish Year</label>
                    <p className="text-base text-primary-50">{selectedBook.publishYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Edition</label>
                    <p className="text-base text-primary-50">{selectedBook.edition}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Location</label>
                    <p className="text-base text-primary-50">{selectedBook.location}</p>
                  </div>
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

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Add New Book</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Book Title"
                  type="text"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
                <Input
                  label="Author"
                  type="text"
                  placeholder="Enter author name"
                  value={newBook.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
                <Input
                  label="ISBN"
                  type="text"
                  placeholder="Enter ISBN"
                  value={newBook.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  required
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={newBook.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c !== "all").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Publisher"
                  type="text"
                  placeholder="Enter publisher"
                  value={newBook.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                />
                <Input
                  label="Publish Year"
                  type="number"
                  placeholder="Enter year"
                  value={newBook.publishYear}
                  onChange={(e) => handleInputChange('publishYear', e.target.value)}
                />
                <Input
                  label="Edition"
                  type="text"
                  placeholder="e.g., 1st Edition"
                  value={newBook.edition}
                  onChange={(e) => handleInputChange('edition', e.target.value)}
                />
                <Input
                  label="Total Copies"
                  type="number"
                  placeholder="Enter number of copies"
                  value={newBook.totalCopies}
                  onChange={(e) => handleInputChange('totalCopies', e.target.value)}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Location"
                    type="text"
                    placeholder="e.g., Section A, Shelf 12"
                    value={newBook.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                  <IoSaveOutline className="w-5 h-5" />
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;

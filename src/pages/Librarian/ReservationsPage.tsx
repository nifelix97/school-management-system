import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookmarkOutline,
    IoBookOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseCircleOutline,
    IoCloseOutline,
    IoEyeOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";
import {
    useApproveReservationMutation,
    useCancelReservationMutation,
    useFulfillReservationMutation,
    useGetReservationsQuery,
    type Reservation as BaseReservation
} from "../../app/api/library";
import Input from "../../components/ui/Input";

// Extended interface for UI display
interface ReservationUI {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  bookTitle: string;
  bookIsbn: string;
  reservationDate: string;
  expiryDate: string;
  status: "pending" | "ready" | "fulfilled" | "expired" | "cancelled";
  priority: "normal" | "high";
  original: BaseReservation;
}

const ReservationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationUI | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // API hooks
  const { data: reservationsResponse, isLoading, error } = useGetReservationsQuery();
  const [approveReservation, { isLoading: isApproving }] = useApproveReservationMutation();
  const [cancelReservation, { isLoading: isCancelling }] = useCancelReservationMutation();
  const [fulfillReservation, { isLoading: isFulfilling }] = useFulfillReservationMutation();

  const rawReservations = reservationsResponse?.data || [];

  // Map backend data to UI format
  const mappedReservations: ReservationUI[] = rawReservations.map((res) => {
    // Determine priority based on creation time or just default to normal
    const isOld = new Date().getTime() - new Date(res.reservationDate).getTime() > 3 * 24 * 60 * 60 * 1000;
    
    // Calculate an expiry date (e.g., 7 days after reservation)
    const expiryDate = new Date(res.reservationDate);
    expiryDate.setDate(expiryDate.getDate() + 7);

    return {
      id: res.id,
      studentId: res.user?.id || res.userId || "N/A",
      studentName: res.user ? `${res.user.firstName} ${res.user.lastName}` : "Unknown Student",
      studentEmail: res.user?.email || "N/A",
      bookTitle: res.book?.title || "Unknown Book",
      bookIsbn: res.book?.isbn || "N/A",
      reservationDate: res.reservationDate,
      expiryDate: expiryDate.toISOString().split('T')[0],
      status: mapStatus(res.status),
      priority: isOld ? "high" : "normal",
      original: res
    };
  });

  function mapStatus(status: string): "pending" | "ready" | "fulfilled" | "expired" | "cancelled" {
    switch (status) {
      case "pending": return "pending";
      case "ready": return "ready";
      case "completed": 
      case "fulfilled": return "fulfilled";
      case "cancelled": return "cancelled";
      case "expired": return "expired";
      default: return "pending";
    }
  }

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "ready", label: "Ready for Pickup" },
    { value: "fulfilled", label: "Fulfilled" },
    { value: "expired", label: "Expired" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Filter reservations
  const filteredReservations = mappedReservations.filter((res) => {
    const matchesSearch =
      res.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.bookIsbn.includes(searchQuery);
    const matchesStatus = selectedStatus === "all" || res.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "ready":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "fulfilled":
        return "bg-green-50 text-green-600 border-green-200";
      case "expired":
        return "bg-red-50 text-red-600 border-red-200";
      case "cancelled":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <IoTimeOutline className="w-4 h-4" />;
      case "ready":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "fulfilled":
        return <IoCheckmarkOutline className="w-4 h-4" />;
      case "expired":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      case "cancelled":
        return <IoCloseCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleApprove = async (reservationId: string) => {
    try {
      await approveReservation(reservationId).unwrap();
      alert("Reservation approved and marked as ready for pickup!");
    } catch (err) {
      console.error("Failed to approve reservation:", err);
      alert("Failed to approve reservation. Please try again.");
    }
  };

  const handleCancel = async (reservationId: string) => {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await cancelReservation(reservationId).unwrap();
        alert("Reservation cancelled successfully.");
      } catch (err) {
        console.error("Failed to cancel reservation:", err);
        alert("Failed to cancel reservation. Please try again.");
      }
    }
  };

  const handleFulfill = async (reservationId: string) => {
    try {
      await fulfillReservation(reservationId).unwrap();
      alert("Reservation fulfilled successfully!");
    } catch (err) {
      console.error("Failed to fulfill reservation:", err);
      alert("Failed to fulfill reservation. Please try again.");
    }
  };

  const handleViewDetails = (reservation: ReservationUI) => {
    setSelectedReservation(reservation);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading reservations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex flex-col items-center justify-center p-4">
        <IoAlertCircleOutline className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-primary-50 mb-2">Error Loading Reservations</h2>
        <p className="text-primary-50 text-center">
          We encountered an error while loading the reservations. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Book Reservations
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          Manage and track book reservations from students
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-50">{mappedReservations.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
              <IoBookmarkOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Pending</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                {mappedReservations.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
              <IoTimeOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Ready</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {mappedReservations.filter((r) => r.status === "ready").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <IoCheckmarkCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Fulfilled</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {mappedReservations.filter((r) => r.status === "fulfilled").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <IoCheckmarkOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Expired</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {mappedReservations.filter((r) => r.status === "expired").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
              <IoAlertCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by student, book, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reservations Display */}
      {paginatedReservations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoBookmarkOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">
            {searchQuery || selectedStatus !== "all" 
              ? "No reservations found matching your search" 
              : "No reservations yet"}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-50 mb-1">{reservation.bookTitle}</h3>
                    <p className="text-sm text-primary-50/60">{reservation.studentName}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(reservation.status)}`}>
                    {getStatusIcon(reservation.status)}
                    {reservation.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Student ID:</span>
                    <span className="font-medium text-primary-50">{reservation.studentId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Reserved:</span>
                    <span className="font-medium text-primary-50">{formatDate(reservation.reservationDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Expires:</span>
                    <span className="font-medium text-primary-50">{formatDate(reservation.expiryDate)}</span>
                  </div>
                  {reservation.priority === "high" && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <IoAlertCircleOutline className="w-4 h-4" />
                      <span className="font-semibold">High Priority</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  {reservation.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(reservation.id)}
                        disabled={isApproving}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold disabled:opacity-50"
                      >
                        {isApproving ? <Loader2 className="w-4 h-4 animate-spin" /> : <IoCheckmarkCircleOutline className="w-4 h-4" />}
                        Approve
                      </button>
                      <button
                        onClick={() => handleCancel(reservation.id)}
                        disabled={isCancelling}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold disabled:opacity-50"
                      >
                        {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <IoCloseCircleOutline className="w-4 h-4" />}
                        Cancel
                      </button>
                    </>
                  )}
                  {reservation.status === "ready" && (
                    <button
                      onClick={() => handleFulfill(reservation.id)}
                      disabled={isFulfilling}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold disabled:opacity-50"
                    >
                      {isFulfilling ? <Loader2 className="w-4 h-4 animate-spin" /> : <IoCheckmarkOutline className="w-4 h-4" />}
                      Mark as Fulfilled
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetails(reservation)}
                    className="px-3 py-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <IoEyeOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Req ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Reserved
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary-50">#{reservation.id.slice(0, 8)}</span>
                        {reservation.priority === "high" && (
                          <IoAlertCircleOutline className="w-4 h-4 text-red-600" title="High Priority" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-primary-50">{reservation.studentName}</div>
                        <div className="text-sm text-primary-50/60">{reservation.studentId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-primary-50 truncate" title={reservation.bookTitle}>{reservation.bookTitle}</div>
                        <div className="text-sm text-primary-50/60">{reservation.bookIsbn}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{formatDate(reservation.reservationDate)}</td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{formatDate(reservation.expiryDate)}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(reservation.id)}
                              disabled={isApproving}
                              className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold disabled:opacity-50"
                              title="Approve"
                            >
                              {isApproving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
                            </button>
                            <button
                              onClick={() => handleCancel(reservation.id)}
                              disabled={isCancelling}
                              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold disabled:opacity-50"
                              title="Cancel"
                            >
                              {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancel"}
                            </button>
                          </>
                        )}
                        {reservation.status === "ready" && (
                          <button
                            onClick={() => handleFulfill(reservation.id)}
                            disabled={isFulfilling}
                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold disabled:opacity-50"
                            title="Fulfill"
                          >
                            {isFulfilling ? <Loader2 className="w-4 h-4 animate-spin" /> : "Fulfill"}
                          </button>
                        )}
                        <button
                          onClick={() => handleViewDetails(reservation)}
                          className="p-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors"
                          title="View Details"
                        >
                          <IoEyeOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-primary-50/70">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredReservations.length)} of {filteredReservations.length} reservations
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IoChevronBackOutline className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-primary-50 text-white"
                        : "hover:bg-gray-100 text-primary-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IoChevronForwardOutline className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Details Modal */}
      {showDetailsModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Reservation Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              {/* Reservation Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoBookmarkOutline className="w-5 h-5" />
                  Reservation Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Reservation ID</label>
                    <p className="text-base font-semibold text-primary-50">#{selectedReservation.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Status</label>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1 ${getStatusColor(selectedReservation.status)}`}>
                      {getStatusIcon(selectedReservation.status)}
                      {selectedReservation.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Reserved Date</label>
                    <p className="text-base text-primary-50">{formatDate(selectedReservation.reservationDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Expiry Date</label>
                    <p className="text-base text-primary-50">{formatDate(selectedReservation.expiryDate)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Priority</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                      selectedReservation.priority === "high" 
                        ? "bg-red-50 text-red-600 border border-red-200" 
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>
                      {selectedReservation.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoPersonOutline className="w-5 h-5" />
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Name</label>
                    <p className="text-base font-semibold text-primary-50">{selectedReservation.studentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Student ID</label>
                    <p className="text-base text-primary-50">{selectedReservation.studentId}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Email</label>
                    <p className="text-base text-primary-50">{selectedReservation.studentEmail}</p>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoBookOutline className="w-5 h-5" />
                  Book Information
                </h3>
                <div className="grid grid-cols-1 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Title</label>
                    <p className="text-base font-semibold text-primary-50">{selectedReservation.bookTitle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">ISBN</label>
                    <p className="text-base text-primary-50">{selectedReservation.bookIsbn}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedReservation.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(selectedReservation.id);
                        setShowDetailsModal(false);
                      }}
                      disabled={isApproving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50"
                    >
                      {isApproving ? <Loader2 className="w-5 h-5 animate-spin" /> : <IoCheckmarkCircleOutline className="w-5 h-5" />}
                      Approve Reservation
                    </button>
                    <button
                      onClick={() => {
                        handleCancel(selectedReservation.id);
                        setShowDetailsModal(false);
                      }}
                      disabled={isCancelling}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold disabled:opacity-50"
                    >
                      {isCancelling ? <Loader2 className="w-5 h-5 animate-spin" /> : <IoCloseCircleOutline className="w-5 h-5" />}
                      Cancel Reservation
                    </button>
                  </>
                )}
                {selectedReservation.status === "ready" && (
                  <button
                    onClick={() => {
                      handleFulfill(selectedReservation.id);
                      setShowDetailsModal(false);
                    }}
                    disabled={isFulfilling}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold disabled:opacity-50"
                  >
                    {isFulfilling ? <Loader2 className="w-5 h-5 animate-spin" /> : <IoCheckmarkOutline className="w-5 h-5" />}
                    Mark as Fulfilled
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;

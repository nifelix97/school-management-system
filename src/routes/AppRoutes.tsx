import { Route, Routes } from "react-router-dom";
import AccountantLayout from "../components/AccountantLayout";
import AdminLayout from "../components/AdminLayout";
import HODLayout from "../components/HODLayout";
import Layout from "../components/Layout";
import PrincipalLayout from "../components/PrincipalLayout";
import RegistrarLayout from "../components/RegistrarLayout";
import StudentLayout from "../components/StudentLayout";
import TeacherLayout from "../components/TeacherLayout";
import AccountantDashBoard from "../pages/Accountant/AccountantDashBoard";
import AccountantProfilePage from "../pages/Accountant/AccountantProfilePage";
import FinancialClearance from "../pages/Accountant/FinancialClearance";
import FinancialReport from "../pages/Accountant/FinancialReport";
import IncomeRecords from "../pages/Accountant/IncomeRecords";
import Invoices from "../pages/Accountant/Invoices";
import RefundPage from "../pages/Accountant/RefundPage";
import StudentPayments from "../pages/Accountant/StudentPayments";
import AdminDashboard from "../pages/Admin/AdminDashBoard";
import AdminNotifications from "../pages/Admin/AdminNotifications";
import AdminProfile from "../pages/Admin/AdminProfile";
import CoursesManagement from "../pages/Admin/CourseManagement";
import DepartmentsManagement from "../pages/Admin/DepartmentsManagement";
import ReportsAnalytics from "../pages/Admin/ReportsAnalytics";
import RolesPermission from "../pages/Admin/Roles-Permission";
import StudentManagement from "../pages/Admin/StudentManagement";
import SystemSetting from "../pages/Admin/SystemSetting";
import TeacherManagement from "../pages/Admin/TeacherManagement";
import AdmissionPage from "../pages/AdmissionPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Announcement from "../pages/HOD/Announcement";
import AssignTeacher from "../pages/HOD/AssignTeacher";
import CourseManagement from "../pages/HOD/CourseManagement";
import DepartmentCourses from "../pages/HOD/DepartmentCourses";
import ExamsQuestions from "../pages/HOD/ExamsQuestions";
import GenerateReport from "../pages/HOD/GenerateReport";
import HODProfilePage from "../pages/HOD/HODProfilePage";
import HandleComplaints from "../pages/HOD/HandleComplaints";
import HODDashboard from "../pages/HOD/HoDDashBoard";
import ManageResources from "../pages/HOD/ManageResources";
import MonitorExams from "../pages/HOD/MonitorExams";
import StudentsPerformance from "../pages/HOD/StudentsPerformance";
import TeachersAccount from "../pages/HOD/TeachersAccount";
import TeachersActivity from "../pages/HOD/TeachersActivity";
import TimeTableExams from "../pages/HOD/TimeTableExams";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import PrincipalDashboard from "../pages/Principal/PrincipalDashBoard";
import PrincipalProfile from "../pages/Principal/PrincipalProfile";
import RegisterPage from "../pages/RegisterPage";
import AdmissionLetters from "../pages/Registrar/AdmissionLetters";
import IDManagement from "../pages/Registrar/IDManagement";
import PendingRegistration from "../pages/Registrar/PendingRegistration";
import PromotionPage from "../pages/Registrar/PromotionPage";
import RegistrarDashboard from "../pages/Registrar/RegistrarDashBoard";
import RegistrarProfilePage from "../pages/Registrar/RegistrarProfilePage";
import StudentRecords from "../pages/Registrar/StudentRecords";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import StudentDashBoard from "../pages/StudentDashBoard";
import AcademicCalendar from "../pages/Teacher/AcademicCalendar";
import CreateAssignment from "../pages/Teacher/CreateAssignment";
import ExamAttendance from "../pages/Teacher/ExamAttendance";
import Grading from "../pages/Teacher/Grading";
import ManageAttendance from "../pages/Teacher/ManageAttendance";
import MarkSheet from "../pages/Teacher/MarkSheet";
import SetCourse from "../pages/Teacher/SetCourse";
import StudentInfo from "../pages/Teacher/StudentInfo";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherMessage from "../pages/Teacher/TeacherMessage";
import TeacherNotification from "../pages/Teacher/TeacherNotification";
import TeacherProfilePage from "../pages/Teacher/TeacherProfilePage";
import TeacherRoutine from "../pages/Teacher/TeacherRoutine";
import VerifyOTPPage from "../pages/VerifyOTPPage";
import AttendancePage from "../pages/student/AttendancePage";
import CalendarPage from "../pages/student/Calendar";
import ClassRoutine from "../pages/student/ClassRoutine";
import CoursesPage from "../pages/student/CoursesPage";
import Dashboard from "../pages/student/Dashboard";
import ExamRoutine from "../pages/student/ExamRoutine";
import GradingPage from "../pages/student/GradingPage";
import LeaveRequestsPage from "../pages/student/LeaveRequestsPage";
import LibraryPage from "../pages/student/LibraryPage";
import MessagePage from "../pages/student/MessagePage";
import NotificationsPage from "../pages/student/NotificationsPage";
import StudentMarks from "../pages/student/StudentMarks";
import TeacherPage from "../pages/student/TeacherPage";
import StrategicPlanning from "../pages/Principal/StrategicPlanning";
import AcademicOversight from "../pages/Principal/AcademiOversight";
import FacultyManagement from "../pages/Principal/FacultManagement";
import DepartmentsHeads from "../pages/Principal/DepartmentsHeads";
import BudgetsFinance from "../pages/Principal/BudgetsFinance";
import PoliciesGovernance from "../pages/Principal/Policies&Governonce";
import EventsCalendar from "../pages/Principal/Events&Calendar";
import Announcements from "../pages/Principal/Announcements";
import PerformanceReports from "../pages/Principal/PerformanceReports";
import ReportAnalytics from "../pages/Principal/Reports&Analytic";
import PrincipalNotifications from "../pages/Principal/PrincipalNotifications";
import LibrarianLayout from "../components/LibrarianLayout";
import LibrarianDashboard from "../pages/Librarian/LibrarianDashboard";
import LibrarianProfile from "../pages/Librarian/LibrarianProfile";
import BookCatalog from "../pages/Librarian/BookCatalog";
import ManageBooks from "../pages/Librarian/ManageBooks";
import Circulation from "../pages/Librarian/Circulation";
import BorrowersPage from "../pages/Librarian/BorrowersPage";
import ReservationsPage from "../pages/Librarian/ReservationsPage";
import OverdueItems from "../pages/Librarian/OverdueItems";
import AdvancedSearch from "../pages/Librarian/AdvancedSearch";
import TransactionHistory from "../pages/Librarian/TransactionHistory";
import LibraryEvents from "../pages/Librarian/LibraryEvents";
import ReportAnalytic from "../pages/Librarian/ReportAnalytics";






export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes WITHOUT layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Routes WITH layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admissions" element={<AdmissionPage />} />

        {/* add more layout-wrapped routes here */}
      </Route>

      <Route element={<StudentLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<StudentDashBoard />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/class-routine" element={<ClassRoutine />} />
        <Route path="/teachers" element={<TeacherPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/grading" element={<GradingPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/exam-routine" element={<ExamRoutine />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave-requests" element={<LeaveRequestsPage />} />
        <Route path="/results" element={<StudentMarks />} />
      </Route>
      <Route element={<TeacherLayout />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfilePage />} />
        <Route path="/teacher/calendar" element={<AcademicCalendar />} />
        <Route path="/teacher/attendance" element={<ManageAttendance />} />
        <Route path="/teacher/student-info" element={<StudentInfo />} />
        <Route path="/teacher/class-routine" element={<TeacherRoutine />} />
        <Route path="/teacher/course" element={<SetCourse />} />
        <Route
          path="/teacher/notifications"
          element={<TeacherNotification />}
        />
        <Route path="/teacher/grading" element={<Grading />} />
        <Route
          path="/teacher/create-assignment"
          element={<CreateAssignment />}
        />
        <Route path="/teacher/mark-sheets" element={<MarkSheet />} />
        <Route path="/teacher/exam-attendance" element={<ExamAttendance />} />
        <Route path="/teacher/messages" element={<TeacherMessage />} />
      </Route>
      <Route element={<HODLayout />}>
        <Route path="/hod/dashboard" element={<HODDashboard />} />
        <Route path="/hod/profile" element={<HODProfilePage />} />
        <Route path="/hod/department-courses" element={<DepartmentCourses />} />
        <Route path="/hod/approve-courses" element={<CourseManagement />} />
        <Route path="/hod/assign-teachers" element={<AssignTeacher />} />
        <Route path="/hod/teachers-activity" element={<TeachersActivity />} />
        <Route
          path="/hod/students-performance"
          element={<StudentsPerformance />}
        />
        <Route path="/hod/teachers-account" element={<TeachersAccount />} />
        <Route path="/hod/time-table-exams" element={<TimeTableExams />} />
        <Route path="/hod/exams-questions" element={<ExamsQuestions />} />
        <Route path="/hod/monitor-exams" element={<MonitorExams />} />
        <Route path="/hod/announcement" element={<Announcement />} />
        <Route path="/hod/manage-resources" element={<ManageResources />} />
        <Route path="/hod/generate-report" element={<GenerateReport />} />
        <Route path="/hod/handle-complaints" element={<HandleComplaints />} />
      </Route>
      <Route element={<RegistrarLayout />}>
        <Route path="/registrar/dashboard" element={<RegistrarDashboard />} />
        <Route path="/registrar/profile" element={<RegistrarProfilePage />} />
        <Route
          path="/registrar/pending-registrations"
          element={<PendingRegistration />}
        />
        <Route
          path="/registrar/manage-student-ids"
          element={<IDManagement />}
        />
        <Route
          path="/registrar/student-promotions"
          element={<PromotionPage />}
        />
        <Route
          path="/registrar/admission-letters"
          element={<AdmissionLetters />}
        />
        <Route path="/registrar/student-records" element={<StudentRecords />} />
      </Route>
      <Route element={<AccountantLayout />}>
        <Route path="/accountant/dashboard" element={<AccountantDashBoard />} />
        <Route
          path="/accountant/student-payments"
          element={<StudentPayments />}
        />
        <Route path="/accountant/invoices" element={<Invoices />} />
        <Route
          path="/accountant/financial-clearance"
          element={<FinancialClearance />}
        />
        <Route path="/accountant/profile" element={<AccountantProfilePage />} />
        <Route path="/accountant/income-records" element={<IncomeRecords />} />
        <Route path="/accountant/refunds" element={<RefundPage />} />
        <Route
          path="/accountant/financial-reports"
          element={<FinancialReport />}
        />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/students" element={<StudentManagement />} />
        <Route path="/admin/teachers" element={<TeacherManagement />} />
        <Route path="/admin/courses" element={<CoursesManagement />} />
        <Route path="/admin/departments" element={<DepartmentsManagement />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/user-roles" element={<RolesPermission />} />
        <Route path="/admin/settings" element={<SystemSetting />} />
      </Route>
      <Route element={<PrincipalLayout />}>
        <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
        <Route path="/principal/profile" element={<PrincipalProfile />} />
        <Route
          path="/principal/strategic-planning"
          element={<StrategicPlanning />}
        />
        <Route
          path="/principal/academic-oversight"
          element={<AcademicOversight />}
        />
        <Route
          path="/principal/faculty-management"
          element={<FacultyManagement />}
        />
        <Route
          path="/principal/department-heads"
          element={<DepartmentsHeads />}
        />
        <Route path="/principal/budget-finance" element={<BudgetsFinance />} />
        <Route path="/principal/policies" element={<PoliciesGovernance />} />
        <Route path="/principal/events" element={<EventsCalendar />} />
        <Route path="/principal/announcements" element={<Announcements />} />
        <Route path="/principal/performance" element={<PerformanceReports />} />
        <Route path="/principal/reports" element={<ReportAnalytics />} />
        <Route path="/principal/notifications" element={<PrincipalNotifications />} />
      </Route>
      <Route element={<LibrarianLayout />}>
        <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
        <Route path="/librarian/profile" element={<LibrarianProfile />} />
        <Route path="/librarian/catalog" element={<BookCatalog />} />
        <Route path="/librarian/books" element={<ManageBooks />} />
        <Route path="/librarian/circulation" element={<Circulation />} />
        <Route path="/librarian/borrowers" element={<BorrowersPage />} />
        <Route path="/librarian/reservations" element={<ReservationsPage />} />
        <Route path="/librarian/overdue" element={<OverdueItems />} />
        <Route path="/librarian/search" element={<AdvancedSearch />} />
        <Route path="/librarian/history" element={<TransactionHistory />} />
        <Route path="/librarian/events" element={<LibraryEvents />} />
        <Route path="/librarian/reports" element={<ReportAnalytic />} />
      </Route>
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
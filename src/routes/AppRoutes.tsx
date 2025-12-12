import { Route, Routes } from "react-router-dom";
import AccountantLayout from "../components/AccountantLayout";
import AdminLayout from "../components/AdminLayout";
import HODLayout from "../components/HODLayout";
import Layout from "../components/Layout";
import LibrarianLayout from "../components/LibrarianLayout";
import PrincipalLayout from "../components/PrincipalLayout";
import RegistrarLayout from "../components/RegistrarLayout";
import StudentLayout from "../components/StudentLayout";
import TeacherLayout from "../components/TeacherLayout";
import ViceChancellorLayout from "../components/ViceChancellorLayout";
import AboutUs from "../pages/AboutUs";
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
import AuditLogs from "../pages/Admin/AuditLogs";
import CoursesManagement from "../pages/Admin/CourseManagement";
import DataRecovery from "../pages/Admin/DataRecovery";
import DepartmentsManagement from "../pages/Admin/DepartmentsManagement";
import ReportsAnalytics from "../pages/Admin/ReportsAnalytics";
import StudentManagement from "../pages/Admin/StudentManagement";
import SystemSetting from "../pages/Admin/SystemSetting";
import TeacherManagement from "../pages/Admin/TeacherManagement";
import AdmissionPage from "../pages/AdmissionPage";
import BlogPage from "../pages/BlogPage";
import ContactUs from "../pages/ContactUs";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Announcement from "../pages/HOD/Announcement";
import AssignTeacher from "../pages/HOD/AssignTeacher";
import CourseManagement from "../pages/HOD/CourseManagement";
import RolesPermission from "../pages/Principal/Roles-Permission";

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
import AdvancedSearch from "../pages/Librarian/AdvancedSearch";
import BookCatalog from "../pages/Librarian/BookCatalog";
import BorrowersPage from "../pages/Librarian/BorrowersPage";
import Circulation from "../pages/Librarian/Circulation";
import LibrarianDashboard from "../pages/Librarian/LibrarianDashboard";
import LibrarianNotification from "../pages/Librarian/LibrarianNotification";
import LibrarianProfile from "../pages/Librarian/LibrarianProfile";
import LibraryEvents from "../pages/Librarian/LibraryEvents";
import ManageBooks from "../pages/Librarian/ManageBooks";
import OverdueItems from "../pages/Librarian/OverdueItems";
import ReportAnalytic from "../pages/Librarian/ReportAnalytics";
import ReservationsPage from "../pages/Librarian/ReservationsPage";
import TransactionHistory from "../pages/Librarian/TransactionHistory";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import AcademicOversight from "../pages/Principal/AcademiOversight";
import Announcements from "../pages/Principal/Announcements";
import AssignTeachers from "../pages/Principal/AssignTeachers";
import BudgetsFinance from "../pages/Principal/BudgetsFinance";
import DepartmentsHeads from "../pages/Principal/DepartmentsHeads";
import EventsCalendar from "../pages/Principal/Events&Calendar";
import FacultyManagement from "../pages/Principal/FacultManagement";
import PerformanceReports from "../pages/Principal/PerformanceReports";
import PoliciesGovernance from "../pages/Principal/Policies&Governonce";
import PrincipalDashboard from "../pages/Principal/PrincipalDashBoard";
import PrincipalNotifications from "../pages/Principal/PrincipalNotifications";
import PrincipalProfile from "../pages/Principal/PrincipalProfile";
import ReportAnalytics from "../pages/Principal/Reports&Analytic";
import StrategicPlanning from "../pages/Principal/StrategicPlanning";
import RegisterPage from "../pages/RegisterPage";
import AdmissionLetters from "../pages/Registrar/AdmissionLetters";
import CertificateGenerator from "../pages/Registrar/CertificateGenerator";
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
import ManageExamsPage from "../pages/Teacher/ManageExams";
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
import ClearanceApplicationPage from "../pages/student/ClearanceApplication";
import CoursesPage from "../pages/student/CoursesPage";
import Dashboard from "../pages/student/Dashboard";
import ExamRoutine from "../pages/student/ExamRoutine";
import GradingPage from "../pages/student/GradingPage";
import LeaveRequestsPage from "../pages/student/LeaveRequestsPage";
import LibraryPage from "../pages/student/LibraryPage";
import MarksAppealPage from "../pages/student/MarksAppeal";
import MessagePage from "../pages/student/MessagePage";
import NotificationsPage from "../pages/student/NotificationsPage";
import OnlineExamPage from "../pages/student/OnlineExam";
import StudentMarks from "../pages/student/StudentMarks";
import TeacherPage from "../pages/student/TeacherPage";
import AcademicAffairs from "../pages/v-chancellor/AccademicAffairs";
import Accreditation from "../pages/v-chancellor/Accreditation";
import CurriculumReview from "../pages/v-chancellor/CurriculumReview";
import EventsConferences from "../pages/v-chancellor/Events&Conferances";
import FacultyDevelopment from "../pages/v-chancellor/FacultyDevelopment";
import GlobalRanking from "../pages/v-chancellor/GrobalRanking";
import InternationalRelation from "../pages/v-chancellor/InternationalRelation";
import PartnershipCollaboration from "../pages/v-chancellor/Partnership&Collaboration";
import PerformanceMetrics from "../pages/v-chancellor/PerformanceMetrics";
import PoliciesCompliance from "../pages/v-chancellor/Policies&Compliance";
import QualityAssurance from "../pages/v-chancellor/QualityAssurance";
import VChancellorReportAnalytic from "../pages/v-chancellor/Reports&Analytics";
import ResearchDevelopment from "../pages/v-chancellor/Research&Development";
import StrategicInitiative from "../pages/v-chancellor/StrategicInitiative";
import VcNotification from "../pages/v-chancellor/Vc-Notification";
import ViceChancellorDashboard from "../pages/v-chancellor/ViceChancellorDashboard";
import ViceChancellorProfile from "../pages/v-chancellor/v-ChancellorProfile";






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
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<BlogPage />} />

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
        <Route path="/clearance" element={<ClearanceApplicationPage />} />
        <Route path="/marks-appeal" element={<MarksAppealPage />} />
        <Route path="/online-exam" element={<OnlineExamPage />} />
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
        <Route path="/teacher/manage-exams" element={<ManageExamsPage />} />
      </Route>
      <Route element={<HODLayout />}>
        <Route path="/hod/dashboard" element={<HODDashboard />} />
        <Route path="/hod/profile" element={<HODProfilePage />} />

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
        <Route path="/registrar/certificates" element={<CertificateGenerator />} />
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
        <Route path="/admin/settings" element={<SystemSetting />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
        <Route path="/admin/data-recovery" element={<DataRecovery />} />
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
        <Route path="/principal/roles-permissions" element={<RolesPermission />} />
        <Route path="/principal/assign-teachers" element={<AssignTeachers />} />
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
        <Route path="/librarian/notifications" element={<LibrarianNotification />} />
      </Route>
      <Route element={<ViceChancellorLayout />}>
        <Route path="/vice-chancellor/dashboard" element={<ViceChancellorDashboard />} />
        <Route path="/vice-chancellor/profile" element={<ViceChancellorProfile />} />
        <Route path="/vice-chancellor/academic-affairs" element={<AcademicAffairs />} />
        <Route path="/vice-chancellor/research-development" element={<ResearchDevelopment />} />
        <Route path="/vice-chancellor/quality-assurance" element={<QualityAssurance />} />
        <Route path="/vice-chancellor/international-relations" element={<InternationalRelation />} />
        <Route path="/vice-chancellor/faculty-development" element={<FacultyDevelopment />} />
        <Route path="/vice-chancellor/accreditation" element={<Accreditation />} />
        <Route path="/vice-chancellor/partnerships" element={<PartnershipCollaboration />} />
        <Route path="/vice-chancellor/curriculum-review" element={<CurriculumReview />} />
        <Route path="/vice-chancellor/strategic-initiatives" element={<StrategicInitiative />} />
        <Route path="/vice-chancellor/policies" element={<PoliciesCompliance />} />
        <Route path="/vice-chancellor/events" element={<EventsConferences />} />
        <Route path="/vice-chancellor/global-rankings" element={<GlobalRanking />} />
        <Route path="/vice-chancellor/reports" element={<VChancellorReportAnalytic />} />
        <Route path="/vice-chancellor/performance-metrics" element={<PerformanceMetrics />} />
        <Route path="/vice-chancellor/notifications" element={<VcNotification />} />
      </Route>
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
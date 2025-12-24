import { Route, Routes } from "react-router-dom";
import AccountantLayout from "../components/AccountantLayout";
import AdminLayout from "../components/AdminLayout";
import GuildPresidentLayout from "../components/GuildPresidentLayout";
import HODLayout from "../components/HODLayout";
import Layout from "../components/Layout";
import LibrarianLayout from "../components/LibrarianLayout";
import ParentLayout from "../components/ParentLayout";
import PrincipalLayout from "../components/PrincipalLayout";
import RegistrarLayout from "../components/RegistrarLayout";
import StudentLayout from "../components/StudentLayout";
import SuperAdminLayout from "../components/SuperAdminLayout";
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

import ChancellorLayout from "../components/ChancellorLayout";
import VicePrincipalLayout from "../components/VicePLayout";
import ChancellorDashboard from "../pages/Chancellor/ChancellorDashboard";
import ChancellorNotification from "../pages/Chancellor/ChancellorNotification";
import ChancellorProfile from "../pages/Chancellor/ChancellorProfile";
import ChancellorReportAnalytic from "../pages/Chancellor/Reports&Analytics";
import AcademicAffairs from "../pages/Guild-president/AcademicAffairs";
import ClubsAndAssociations from "../pages/Guild-president/ClubsAndAssociations";
import GuildAnnouncements from "../pages/Guild-president/GuildAnnouncements";
import GuildBudgetAndFunds from "../pages/Guild-president/GuildBudgetAndFunds";
import GuildDashboard from "../pages/Guild-president/GuildDashboard";
import GuildProfile from "../pages/Guild-president/GuildProfile";
import SocialsAndEvents from "../pages/Guild-president/SocialsAndEvents";
import StudentGrievances from "../pages/Guild-president/StudentGrievances";
import StudentWelfare from "../pages/Guild-president/StudentWelfare";
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
import OnlineMeeting from "../pages/OnlineMeeting";
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
import ResourcesPage from "../pages/ResourcesPage";
import StudentDashBoard from "../pages/StudentDashBoard";
import DatasRecovery from "../pages/SuperAdmin/DataRecovery";
import GeneralSettings from "../pages/SuperAdmin/GeneralSettings";
import Notifications from "../pages/SuperAdmin/Notifications";
import SuperAdminReports from "../pages/SuperAdmin/ReportsAnalytics";
import RolesPermissions from "../pages/SuperAdmin/RolesPermissions";
import SecuritySettings from "../pages/SuperAdmin/SecuritySettings";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminProfile from "../pages/SuperAdmin/SuperAdminProfile";
import SystemConfiguration from "../pages/SuperAdmin/SystemConfiguration";
import UserManagement from "../pages/SuperAdmin/UserManagement";
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
import CoursePlayerPage from "../pages/student/CoursePlayerPage";
import CoursesPage from "../pages/student/CoursesPage";
import Dashboard from "../pages/student/Dashboard";
import ExamResultTemplate from "../pages/student/ExamResultTemplate";
import ExamRoutine from "../pages/student/ExamRoutine";
import GradingPage from "../pages/student/GradingPage";
import LeaveRequestsPage from "../pages/student/LeaveRequestsPage";
import LibraryPage from "../pages/student/LibraryPage";
import MarksAppealPage from "../pages/student/MarksAppeal";
import MessagePage from "../pages/student/MessagePage";
import NotificationsPage from "../pages/student/NotificationsPage";
import OnlineExamPage from "../pages/student/OnlineExam";
import StudentMarks from "../pages/student/StudentMarks";
import StudentTranscript from "../pages/student/StudentTranscript";
import TeacherPage from "../pages/student/TeacherPage";
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
import VicePrincipalPerformanceReports from "../pages/vice-principal/PerformanceReports";
import VicePrincipalNotifications from "../pages/vice-principal/PrincipalNotifications";
import VicePrincipalDashboard from "../pages/vice-principal/VicePrincipalDashboard";
import VicePrincipalProfile from "../pages/vice-principal/VicePrincipalProfile";

import DeanLayout from "../components/DeanLayout";
import C_AcademicAffairs from "../pages/Chancellor/AccademicAffairs";
import C_CurriculumReview from "../pages/Chancellor/CurriculumReview";
import C_EventsConferences from "../pages/Chancellor/Events&Conferances";
import C_GlobalRanking from "../pages/Chancellor/GrobalRanking";
import C_InternationalRelation from "../pages/Chancellor/InternationalRelation";
import C_PartnershipCollaboration from "../pages/Chancellor/Partnership&Collaboration";
import C_PerformanceMetrics from "../pages/Chancellor/PerformanceMetrics";
import C_PoliciesCompliance from "../pages/Chancellor/Policies&Compliance";
import C_ResearchDevelopment from "../pages/Chancellor/Research&Development";
import C_StrategicInitiative from "../pages/Chancellor/StrategicInitiative";




import NurseLayout from "../components/NurseLayout";
import AssessmentsGrading from "../pages/Dean/AssessmentsGrading";
import CurriculumPlanning from "../pages/Dean/CurriculumPlanning";
import DeanDashboard from "../pages/Dean/DeanDashboard";
import DeanDepartmentEvents from "../pages/Dean/DeanDepartmentEvents";
import DeanNotifications from "../pages/Dean/DeanNotifications";
import DeanProfile from "../pages/Dean/DeanProfile";
import DeanReports from "../pages/Dean/DeanReports";
import DeanFacultyManagement from "../pages/Dean/FacultyManagement";
import StudentOversight from "../pages/Dean/StudentOversight";
import EmergencyCase from "../pages/Nurse/EmergencyCase";
import HealthRecord from "../pages/Nurse/HealthRecord";
import HealthReport from "../pages/Nurse/HealthReport";
import LabTests from "../pages/Nurse/LabTests";
import MedicalInventory from "../pages/Nurse/MedicalInventory";
import NurseAppointment from "../pages/Nurse/NurseAppointment";
import NurseDashboard from "../pages/Nurse/NurseDashboard";
import NurseNotifications from "../pages/Nurse/NurseNotifications";
import NurseProfile from "../pages/Nurse/NurseProfile";
import Prescriptions from "../pages/Nurse/Prescriptions";
import Vaccinations from "../pages/Nurse/Vaccinations";
import WellnessProgram from "../pages/Nurse/WellnessProgram";

import AlumniLayout from "../components/AlumniLayout";
import AuditorLayout from "../components/AuditorLayout";
import CoacheLayout from "../components/CoacheLayout";
import CounselorLayout from "../components/CounselorLayout";
import ManagerLayout from "../components/ManagerLayout";
import ReceptionistLayout from "../components/ReceptionistLayout";
import TransportManagerLayout from "../components/TransportManagerLayout";
import VendorLayout from "../components/VendorLayout";
import WardenLayout from "../components/wardenLayout";
import Achievements from "../pages/Alumni/Achievements";
import AlumniDashboard from "../pages/Alumni/AlumniDashboard";
import AlumniNetwork from "../pages/Alumni/AlumniNetwork";
import AlumniNotifications from "../pages/Alumni/AlumniNotifications";
import AlumniProfile from "../pages/Alumni/AlumniProfile";
import CareerServices from "../pages/Alumni/CareerServices";
import AlumniEvents from "../pages/Alumni/Events";
import Mentorship from "../pages/Alumni/Mentorship";
import NewsAndUpdates from "../pages/Alumni/NewsAndUpdates";
import AuditReport from "../pages/Auditor/AuditReport";
import AuditorDashboard from "../pages/Auditor/AuditorDashboard";
import AuditorNotification from "../pages/Auditor/AuditorNotification";
import AuditorProfile from "../pages/Auditor/AuditorProfile";
import Compliance from "../pages/Auditor/Compliance";
import FinancialAudits from "../pages/Auditor/FinancialAudits";
import SystemLogs from "../pages/Auditor/SystemLogs";
import CoachAchievements from "../pages/Coache/Achievements";
import CoachDashboard from "../pages/Coache/CoachDashboard";
import CoacheNotifications from "../pages/Coache/CoacheNotifications";
import CoacheProfile from "../pages/Coache/CoacheProfile";
import CoacheReport from "../pages/Coache/CoacheReport";
import MyTeams from "../pages/Coache/MyTeams";
import CoachPerformance from "../pages/Coache/Performance";
import Schedules from "../pages/Coache/Schedules";
import TrainingPlans from "../pages/Coache/TrainingPlans";
import CareerGuidance from "../pages/Counselor/CareerGuidance";
import CounselingRecords from "../pages/Counselor/CounselingRecords";
import CounselorDashboard from "../pages/Counselor/CounselorDashboard";
import CounselorProfile from "../pages/Counselor/CounselorProfile";
import GenerateReports from "../pages/Counselor/GenerateReports";
import ScheduleSessions from "../pages/Counselor/ScheduleSessions";
import StudentBehavior from "../pages/Counselor/StudentBehavior";
import Events from "../pages/Manager/Events";
import Financials from "../pages/Manager/Financials";
import ManagerDashboard from "../pages/Manager/ManagerDashboard";
import ManagerNotifications from "../pages/Manager/ManagerNotifications";
import ManagerProfile from "../pages/Manager/ManagerProfile";
import Reports from "../pages/Manager/Reports";
import StaffManagement from "../pages/Manager/StaffManagement";
import StudentOverview from "../pages/Manager/StudentOverview";
import Attendance from "../pages/Parent/Attendance";
import MyChildren from "../pages/Parent/MyChildren";
import ParentCalendar from "../pages/Parent/ParentCalendar";
import ParentDashboard from "../pages/Parent/ParentDashboard";
import ParentFees from "../pages/Parent/ParentFees";
import ParentHelp from "../pages/Parent/ParentHelp";
import ParentMessages from "../pages/Parent/ParentMessages";
import ParentNotifications from "../pages/Parent/ParentNotifications";
import ParentProfile from "../pages/Parent/ParentProfile";
import ParentProgress from "../pages/Parent/ParentProgress";
import Appointments from "../pages/Receptionist/Appointments";
import CallLogs from "../pages/Receptionist/CallLogs";
import Enquiries from "../pages/Receptionist/Enquiries";
import FrontDeskReports from "../pages/Receptionist/FrontDeskReports";
import MailPackages from "../pages/Receptionist/MailPackages";
import ReceptionistDashboard from "../pages/Receptionist/ReceptionistDashboard";
import ReceptionistNotifications from "../pages/Receptionist/ReceptionistNotifications";
import ReceptionistProfile from "../pages/Receptionist/ReceptionistProfile";
import StaffDirectory from "../pages/Receptionist/StaffDirectory";
import VisitorLog from "../pages/Receptionist/VisitorLog";
import AssignRoutes from "../pages/TransportManager/AssignRoutes";
import DriverSchedules from "../pages/TransportManager/DriverSchedules";
import Maintenance from "../pages/TransportManager/Maintenance";
import TransportFees from "../pages/TransportManager/TransportFees";
import TransportManagerDashboard from "../pages/TransportManager/TransportManagerDashboard";
import TransportManagerProfile from "../pages/TransportManager/TransportManagerProfile";
import VehicleFleet from "../pages/TransportManager/VehicleFleet";
import VendorInvoices from "../pages/Vendor/Invoices";
import Orders from "../pages/Vendor/Orders";
import ProductsServices from "../pages/Vendor/ProductsServices";
import VendorDashboard from "../pages/Vendor/VendorDashboard";
import VendorNotifications from "../pages/Vendor/VendorNotifications";
import VendorProfile from "../pages/Vendor/VendorProfile";
import Complaints from "../pages/warden/Complaints";
import HostelInventory from "../pages/warden/HostelInventory";
import Notices from "../pages/warden/Notices";
import Report from "../pages/warden/Report";
import RoomAllocation from "../pages/warden/RoomAllocation";
import WardenDashboard from "../pages/warden/WardenDashboard";
import WardenNotifications from "../pages/warden/WardenNotifications";
import WardenProfile from "../pages/warden/WardenProfile";




export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes WITHOUT layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/transcript" element={<StudentTranscript />} />
      <Route path="/online-exam/result" element={<ExamResultTemplate />} />

      {/* Routes WITH layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admissions" element={<AdmissionPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<BlogPage />} />

        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/online-meeting" element={<OnlineMeeting />} />
        <Route path="/course-player/:id" element={<CoursePlayerPage />} />
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

      <Route element={<ParentLayout />}>
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/profile" element={<ParentProfile />} />
        <Route path="/parent/children" element={<MyChildren />} />
        <Route path="/parent/progress" element={<ParentProgress />} />
        <Route path="/parent/calendar" element={<ParentCalendar />} />
        <Route path="/parent/help" element={<ParentHelp />} />
        {/* Remaining placeholder routes */}
        <Route path="/parent/attendance" element={<Attendance />} />
        <Route path="/parent/finances" element={<ParentFees />} />
        <Route path="/parent/messages" element={<ParentMessages />} />
        <Route path="/parent/notifications" element={<ParentNotifications />} />
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
      <Route element={<VicePrincipalLayout />}>
        <Route path="/vice-principal/dashboard" element={<VicePrincipalDashboard />} />
        <Route path="/vice-principal/profile" element={<VicePrincipalProfile />} />
        <Route path="/vice-principal/notifications" element={<VicePrincipalNotifications />} />
        <Route
          path="/vice-principal/strategic-planning"
          element={<StrategicPlanning />}
        />
        <Route
          path="/vice-principal/academic-oversight"
          element={<AcademicOversight />}
        />
        <Route
          path="/vice-principal/faculty-management"
          element={<FacultyManagement />}
        />
        <Route
          path="/vice-principal/department-heads"
          element={<DepartmentsHeads />}
        />
        <Route path="/vice-principal/policies" element={<PoliciesGovernance />} />
        <Route path="/vice-principal/events" element={<EventsCalendar />} />
        <Route path="/vice-principal/announcements" element={<Announcements />} />
        <Route path="/vice-principal/performance" element={<VicePrincipalPerformanceReports />} />
        <Route path="/vice-principal/reports" element={<ReportAnalytics />} />
        <Route path="/vice-principal/roles-permissions" element={<RolesPermission />} />
        <Route path="/vice-principal/assign-teachers" element={<AssignTeachers />} />
      </Route>
      <Route element={<ChancellorLayout />}>
        <Route path="/chancellor/dashboard" element={<ChancellorDashboard />} />
        <Route path="/chancellor/profile" element={<ChancellorProfile />} />
        <Route path="/chancellor/academic-affairs" element={<C_AcademicAffairs />} />
        <Route path="/chancellor/research-development" element={<C_ResearchDevelopment />} />
        {/* Placeholder for missing Qual. Assurance in Chancellor folder */}
        <Route path="/chancellor/quality-assurance" element={<QualityAssurance />} />
        <Route path="/chancellor/international-relations" element={<C_InternationalRelation />} />
        {/* Placeholder for missing Faculty Dev in Chancellor folder */}
        <Route path="/chancellor/faculty-development" element={<FacultyDevelopment />} />
        {/* Placeholder for missing Accreditation in Chancellor folder */}
        <Route path="/chancellor/accreditation" element={<Accreditation />} />
        <Route path="/chancellor/partnerships" element={<C_PartnershipCollaboration />} />
        <Route path="/chancellor/curriculum-review" element={<C_CurriculumReview />} />
        <Route path="/chancellor/strategic-initiatives" element={<C_StrategicInitiative />} />
        <Route path="/chancellor/policies" element={<C_PoliciesCompliance />} />
        <Route path="/chancellor/events" element={<C_EventsConferences />} />
        <Route path="/chancellor/global-rankings" element={<C_GlobalRanking />} />
        <Route path="/chancellor/reports" element={<ChancellorReportAnalytic />} />
        <Route path="/chancellor/performance-metrics" element={<C_PerformanceMetrics />} />
        <Route path="/chancellor/notifications" element={<ChancellorNotification />} />
      </Route>

      <Route element={<DeanLayout />}>
        <Route path="/dean/dashboard" element={<DeanDashboard />} />
        <Route path="/dean/profile" element={<DeanProfile />} />
        <Route path="/dean/faculty-management" element={<DeanFacultyManagement />} />
        <Route path="/dean/student-oversight" element={<StudentOversight />} />
        <Route path="/dean/curriculum-planning" element={<CurriculumPlanning />} />
        <Route path="/dean/assessments" element={<AssessmentsGrading />} />
        <Route path="/dean/department-events" element={<DeanDepartmentEvents />} />
        <Route path="/dean/reports" element={<DeanReports />} />
        <Route path="/dean/notifications" element={<DeanNotifications />} />
      </Route>

      <Route element={<NurseLayout />}>
        <Route path="/nurse/dashboard" element={<NurseDashboard />} />
        <Route path="/nurse/profile" element={<NurseProfile />} />
        <Route path="/nurse/appointments" element={<NurseAppointment />} />
        <Route path="/nurse/health-records" element={<HealthRecord />} />
        <Route path="/nurse/medical-inventory" element={<MedicalInventory />} />
        <Route path="/nurse/prescriptions" element={<Prescriptions />} />
        <Route path="/nurse/emergency-cases" element={<EmergencyCase />} />
        <Route path="/nurse/vaccinations" element={<Vaccinations />} />
        <Route path="/nurse/lab-tests" element={<LabTests />} />
        <Route path="/nurse/wellness-programs" element={<WellnessProgram />} />
        <Route path="/nurse/health-reports" element={<HealthReport />} />
        <Route path="/nurse/notifications" element={<NurseNotifications />} />
      </Route>

      <Route element={<ReceptionistLayout />}>
        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
        <Route path="/receptionist/profile" element={<ReceptionistProfile />} />
        <Route path="/receptionist/visitors" element={<VisitorLog />} />
        <Route path="/receptionist/calls" element={<CallLogs />} />
        <Route path="/receptionist/inquiries" element={<Enquiries />} />
        <Route path="/receptionist/appointments" element={<Appointments />} />
        <Route path="/receptionist/mail" element={<MailPackages />} />
        <Route path="/receptionist/directory" element={<StaffDirectory />} />
        <Route path="/receptionist/reports" element={<FrontDeskReports />} />
        <Route path="/receptionist/notifications" element={<ReceptionistNotifications />} />
      </Route>

       {/* Warden Routes */}
       <Route element={<WardenLayout />}>
        <Route path="/warden/dashboard" element={<WardenDashboard />} />
        <Route path="/warden/profile" element={<WardenProfile />} />
        <Route path="/warden/rooms" element={<RoomAllocation />} />
        <Route path="/warden/complaints" element={<Complaints />} />
        <Route path="/warden/notices" element={<Notices />} />
        <Route path="/warden/inventory" element={<HostelInventory />} />
        <Route path="/warden/reports" element={<Report />} />
        <Route path="/warden/notifications" element={<WardenNotifications />} />
      </Route>

      {/* Guild President Routes */}
      <Route element={<GuildPresidentLayout />}>
        {/* Placeholder for now - each link in sidebar should have a page */}
        <Route path="/guild/dashboard" element={<GuildDashboard />} />
        <Route path="/guild/profile" element={<GuildProfile />} />
        <Route path="/guild/welfare" element={<StudentWelfare />} />
        <Route path="/guild/academics" element={<AcademicAffairs />} />
        <Route path="/guild/financials" element={<GuildBudgetAndFunds />} />
        <Route path="/guild/associations" element={<ClubsAndAssociations />} />
        <Route path="/guild/events" element={<SocialsAndEvents />} />
        <Route path="/guild/grievances" element={<StudentGrievances />} />
        <Route path="/guild/announcements" element={<GuildAnnouncements />} />
      </Route>

      {/* Manager Routes */}
      <Route path="/manager" element={<ManagerLayout />}>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="profile" element={<ManagerProfile />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="students" element={<StudentOverview />} />
        <Route path="finance" element={<Financials />} />
        <Route path="events" element={<Events />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<ManagerNotifications />} />
      </Route>

      {/* Auditor Routes */}
      <Route element={<AuditorLayout />}>
        <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
        <Route path="/auditor/profile" element={<AuditorProfile />} />
        <Route path="/auditor/financial-audits" element={<FinancialAudits />} />
        <Route path="/auditor/compliance" element={<Compliance />} />
        <Route path="/auditor/reports" element={<AuditReport />} />
        <Route path="/auditor/logs" element={<SystemLogs />} />
        <Route path="/auditor/notifications" element={<AuditorNotification />} />
      </Route>

      {/* Alumni Routes */}
      <Route element={<AlumniLayout />}>
        <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
        <Route path="/alumni/profile" element={<AlumniProfile />} />
        <Route path="/alumni/network" element={<AlumniNetwork />} />
        <Route path="/alumni/events" element={<AlumniEvents />} />
        <Route path="/alumni/career" element={<CareerServices />} />
        <Route path="/alumni/mentorship" element={<Mentorship />} />
        <Route path="/alumni/achievements" element={<Achievements />} />
        <Route path="/alumni/news" element={<NewsAndUpdates />} />
        <Route path="/alumni/notifications" element={<AlumniNotifications />} />
      </Route>

      {/* Vendor Routes */}
      <Route element={<VendorLayout />}>
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />
        <Route path="/vendor/products" element={<ProductsServices />} />
        <Route path="/vendor/orders" element={<Orders />} />
        <Route path="/vendor/invoices" element={<VendorInvoices />} />
        <Route path="/vendor/notifications" element={<VendorNotifications />} />
      </Route>

      {/* Coach Routes */}
      <Route element={<CoacheLayout />}>
        <Route path="/coach/dashboard" element={<CoachDashboard />} />
        <Route path="/coach/profile" element={<CoacheProfile />} />
        <Route path="/coach/teams" element={<MyTeams />} />
        <Route path="/coach/schedules" element={<Schedules />} />
        <Route path="/coach/training" element={<TrainingPlans />} />
        <Route path="/coach/performance" element={<CoachPerformance />} />
        <Route path="/coach/achievements" element={<CoachAchievements />} />
        <Route path="/coach/report" element={<CoacheReport />} />
        <Route path="/coach/notifications" element={<CoacheNotifications />} />
      </Route>

      {/* Super Admin Routes */}
      <Route element={<SuperAdminLayout />}>
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/profile" element={<SuperAdminProfile />} />
        <Route path="/super-admin/users" element={<UserManagement />} />
        <Route path="/super-admin/roles-permissions" element={<RolesPermissions />} />
        <Route path="/super-admin/system-config" element={<SystemConfiguration />} />
        <Route path="/super-admin/reports" element={<SuperAdminReports />} />
        <Route path="/super-admin/notifications" element={<Notifications />} />
        <Route path="/super-admin/security" element={<SecuritySettings />} />
        <Route path="/super-admin/settings" element={<GeneralSettings />} />
        <Route path="/super-admin/data-recovery" element={<DatasRecovery />} />
        {/* Add more super admin specific pages here */}
      </Route>

      {/* Counselor Routes */}
      <Route element={<CounselorLayout />}>
        <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
        <Route path="/counselor/profile" element={<CounselorProfile />} />
        <Route path="/counselor/behavior" element={<StudentBehavior />} />
        <Route path="/counselor/sessions" element={<ScheduleSessions />} />
        <Route path="/counselor/records" element={<CounselingRecords />} />
        <Route path="/counselor/reports" element={<GenerateReports />} />
      <Route path="/counselor/career" element={<CareerGuidance />} />
      </Route>

      {/* Transport Manager Routes */}
      <Route element={<TransportManagerLayout />}>
         <Route path="/transport-manager/dashboard" element={<TransportManagerDashboard />} />
        <Route path="/transport-manager/fees" element={<TransportFees />} />
        <Route path="/transport-manager/maintenance" element={<Maintenance />} />
        <Route path="/transport-manager/fleet" element={<VehicleFleet />} />
        <Route path="/transport-manager/schedule" element={<DriverSchedules />} />
        <Route path="/transport-manager/routes" element={<AssignRoutes />} />
        <Route path="/transport-manager/profile" element={<TransportManagerProfile />} />
      </Route>
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
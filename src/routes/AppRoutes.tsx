import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import StudentLayout from "../components/StudentLayout";
import StudentDashBoard from "../pages/StudentDashBoard";
import Dashboard from "../pages/student/Dashboard";
import CoursesPage from "../pages/student/CoursesPage";
import CalendarPage from "../pages/student/Calendar";
import ClassRoutine from "../pages/student/ClassRoutine";
import TeacherPage from "../pages/student/TeacherPage";
import NotificationsPage from "../pages/student/NotificationsPage";
import GradingPage from "../pages/student/GradingPage";
import LibraryPage from "../pages/student/LibraryPage";
import MessagePage from "../pages/student/MessagePage";
import ExamRoutine from "../pages/student/ExamRoutine";
import AttendancePage from "../pages/student/AttendancePage";
import LeaveRequestsPage from "../pages/student/LeaveRequestsPage";
import TeacherLayout from "../components/TeacherLayout";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherProfilePage from "../pages/Teacher/TeacherProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes WITHOUT layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Routes WITH layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
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
      </Route>
      <Route element={<TeacherLayout />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfilePage />} />
        <Route path="/teacher/calendar" element={<div className="p-6"><h1 className="text-2xl font-bold">Personal Calendar</h1></div>} />
        <Route path="/teacher/attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Manage Attendance</h1></div>} />
        <Route path="/teacher/class-info" element={<div className="p-6"><h1 className="text-2xl font-bold">Class & Student Info</h1></div>} />
        <Route path="/teacher/class-routine" element={<div className="p-6"><h1 className="text-2xl font-bold">View Class Routine</h1></div>} />
        <Route path="/teacher/parents" element={<div className="p-6"><h1 className="text-2xl font-bold">View Parents</h1></div>} />
        <Route path="/teacher/subjects" element={<div className="p-6"><h1 className="text-2xl font-bold">Subjects & Notifications</h1></div>} />
        <Route path="/teacher/grading" element={<div className="p-6"><h1 className="text-2xl font-bold">View Grading System</h1></div>} />
        <Route path="/teacher/mark-sheets" element={<div className="p-6"><h1 className="text-2xl font-bold">Submit Mark Sheets</h1></div>} />
        <Route path="/teacher/library" element={<div className="p-6"><h1 className="text-2xl font-bold">Manage Library</h1></div>} />
        <Route path="/teacher/exam-attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Manage Exam Attendance</h1></div>} />
        <Route path="/teacher/notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">View Notifications</h1></div>} />
        <Route path="/teacher/messages" element={<div className="p-6"><h1 className="text-2xl font-bold">Manage Messages</h1></div>} />
      </Route>  
    </Routes>
  );
}
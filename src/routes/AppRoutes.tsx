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
import AcademicCalendar from "../pages/Teacher/AcademicCalendar";
import ManageAttendance from "../pages/Teacher/ManageAttendance";
import StudentInfo from "../pages/Teacher/StudentInfo";
import TeacherRoutine from "../pages/Teacher/TeacherRoutine";
import SetCourse from "../pages/Teacher/SetCourse";
import TeacherNotification from "../pages/Teacher/TeacherNotification";
import Grading from "../pages/Teacher/Grading";
import CreateAssignment from "../pages/Teacher/CreateAssignment";
import MarkSheet from "../pages/Teacher/MarkSheet";
import ExamAttendance from "../pages/Teacher/ExamAttendance";
import TeacherMessage from "../pages/Teacher/TeacherMessage";
import StudentMarks from "../pages/student/StudentMarks";
import HODLayout from "../components/HODLayout";
import HODDashboard from "../pages/HOD/HoDDashBoard";
import NotFound from "../pages/NotFound";
import HODProfilePage from "../pages/HOD/HODProfilePage";
import DepartmentCourses from "../pages/HOD/DepartmentCourses";
import CourseManagement from "../pages/HOD/CourseManagement";
import AssignTeacher from "../pages/HOD/AssignTeacher";
import TeachersActivity from "../pages/HOD/TeachersActivity";
import StudentsPerformance from "../pages/HOD/StudentsPerformance";
import TeachersAccount from "../pages/HOD/TeachersAccount";
import TimeTableExams from "../pages/HOD/TimeTableExams";
import ExamsQuestions from "../pages/HOD/ExamsQuestions";
import MonitorExams from "../pages/HOD/MonitorExams";
import AdmissionPage from "../pages/AdmissionPage";










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
        <Route path="/hod/students-performance" element={<StudentsPerformance />} />
        <Route path="/hod/teachers-account" element={<TeachersAccount />} />
        <Route path="/hod/time-table-exams" element={<TimeTableExams />} />
        <Route path="/hod/exams-questions" element={<ExamsQuestions />} />
        <Route path="/hod/monitor-exams" element={<MonitorExams />} />
        <Route path="/admissions" element={<AdmissionPage />} />
      </Route>
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
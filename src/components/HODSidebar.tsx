import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoPersonCircleOutline,
  // IoCalendarOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoBookOutline,
  IoAlertCircleOutline,
  IoChatbubbleEllipsesOutline,
  IoClipboardOutline,
  IoCheckmarkDoneOutline,
  IoStatsChartOutline,
  IoDocumentTextOutline,
  IoMenuOutline,
  IoChevronBackOutline,
  // IoSchoolOutline,
  // IoSettingsOutline,
  IoEyeOutline,
  IoFolderOutline,
} from "react-icons/io5";

type SidebarProps = {
  className?: string;
};

const links = [
  {
    to: "/hod/dashboard",
    label: "Dashboard",
    icon: <IoStatsChartOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/profile",
    label: "Profile",
    icon: <IoPersonCircleOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/department-courses",
    label: "Department Courses",
    icon: <IoBookOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/approve-courses",
    label: "Courses Management",
    icon: <IoCheckmarkDoneOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/assign-Teachers",
    label: "Assign Teachers",
    icon: <IoPeopleOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/teachers-activity",
    label: "Teachers Activity",
    icon: <IoEyeOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/students-performance",
    label: "Student Performance",
    icon: <IoStatsChartOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/teachers-account",
    label: "Approve Accounts",
    icon: <IoPersonCircleOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/timetable-exams",
    label: "Timetable & Exams",
    icon: <IoTimeOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/approve-exam-questions",
    label: "Exam Questions",
    icon: <IoClipboardOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/monitor-exams",
    label: "Monitor Exams",
    icon: <IoEyeOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/announcements",
    label: "Send Announcements",
    icon: <IoChatbubbleEllipsesOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/department-resources",
    label: "Manage Resources",
    icon: <IoFolderOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/reports",
    label: "Generate Reports",
    icon: <IoDocumentTextOutline className="w-5 h-5" />,
  },
  {
    to: "/hod/complaints",
    label: "Handle Complaints",
    icon: <IoAlertCircleOutline className="w-5 h-5" />,
  },
];

const HODSidebar = ({ className = "" }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const [collapsedDesktop, setCollapsedDesktop] = useState(false);
  const [collapsedMobile, setCollapsedMobile] = useState(false);

  const collapsed = isDesktop ? collapsedDesktop : collapsedMobile;

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  const widthDesktop = collapsedDesktop ? "w-20" : "w-64";
  const widthMobile = collapsedMobile ? "w-16" : "w-72";

  const labelCls = collapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100";
  const itemBase = "flex items-center gap-3 rounded-lg px-3 py-2 no-underline transition-colors";
  const itemNormal = "text-white hover:text-primary-100 hover:bg-primary-50/10";
  const itemActive = "text-primary-100 bg-primary-50/15";

  return (
    <>
      {/* Top bar for mobile */}
      {!isDesktop && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-primary-50 backdrop-blur-md shadow">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="bg-transparent border-none text-primary-100 text-2xl"
            >
              <IoMenuOutline />
            </button>
            <div className="font-heading text-white text-xl">HOD</div>
            <span className="w-6" />
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {!isDesktop && (
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed top-0 left-0 z-50 h-full bg-primary-50 shadow-lg border-r border-gray-100",
          isDesktop ? widthDesktop : widthMobile,
          !isDesktop && (mobileOpen ? "translate-x-0" : "-translate-x-full"),
          !isDesktop ? "transition-transform duration-300" : "",
          className,
        ].join(" ")}
        aria-label="HOD sidebar"
      >
        {/* Header + collapse/close */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          <span className={`font-heading text-white text-lg ${collapsed ? "opacity-0 w-0" : ""}`}>
            HOD Panel
          </span>

          {isDesktop ? (
            <button
              onClick={() => setCollapsedDesktop((v) => !v)}
              aria-label="Toggle collapse"
              className="bg-transparent border-none text-white text-xl"
              title={collapsedDesktop ? "Expand" : "Collapse"}
            >
              <IoChevronBackOutline className={collapsedDesktop ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsedMobile((v) => !v)}
                aria-label="Toggle collapse"
                className="bg-transparent border-none text-white text-xl"
                title={collapsedMobile ? "Expand" : "Collapse"}
              >
                <IoChevronBackOutline className={collapsedMobile ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="bg-transparent border-none text-primary-100 text-2xl"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="p-3 overflow-y-auto h-[calc(100%-56px)] no-scrollbar">
          <ul className="m-0 p-0 flex flex-col gap-1 list-none">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    [
                      itemBase,
                      isActive ? itemActive : itemNormal,
                      collapsed ? "justify-center" : "",
                    ].join(" ")
                  }
                  onClick={() => !isDesktop && setMobileOpen(false)}
                >
                  <span className="text-primary-100">{l.icon}</span>
                  <span className={`whitespace-nowrap ${labelCls}`}>{l.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Desktop spacer so content sits beside sidebar */}
      {isDesktop && <div className={`${widthDesktop} shrink-0`} />}
      {/* Mobile top bar spacer */}
      {!isDesktop && <div className="h-[56px]" />}
    </>
  );
};

export default HODSidebar;
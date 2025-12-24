import { useEffect, useState } from "react";
import { BsSendCheck } from "react-icons/bs";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoChatbubbleEllipsesOutline,
    IoCheckmarkDoneOutline,
    IoChevronBackOutline,
    IoClipboardOutline,
    IoMenuOutline,
    IoPeopleOutline,
    IoPersonCircleOutline,
    IoPlayOutline,
    IoShieldCheckmarkSharp,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrophyOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";


type SidebarProps = {
  className?: string;
};

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <IoStatsChartOutline className="w-5 h-5" />,
  },
  {
    to: "/student",
    label: "Profile",
    icon: <IoPersonCircleOutline className="w-5 h-5" />,
  },
  {
    to: "/courses",
    label: "Courses",
    icon: <IoPersonCircleOutline className="w-5 h-5" />,
  },
  {
    to: "/calendar",
    label: "Calendar",
    icon: <IoCalendarOutline className="w-5 h-5" />,
  },
  {
    to: "/class-routine",
    label: "Class Routine",
    icon: <IoTimeOutline className="w-5 h-5" />,
  },
  {
    to: "/teachers",
    label: "Teacher Info",
    icon: <IoPeopleOutline className="w-5 h-5" />,
  },
  {
    to: "/notifications",
    label: "Notifications",
    icon: <IoBookOutline className="w-5 h-5" />,
    badge: 3, // Mock number of new notifications
  },
  {
    to: "/grading",
    label: "Grading",
    icon: <IoAlertCircleOutline className="w-5 h-5" />,
  },
  {
    to: "/library",
    label: "Library",
    icon: <IoBookOutline className="w-5 h-5" />,
  },
  {
    to: "/messages",
    label: "Messages",
    icon: <IoChatbubbleEllipsesOutline className="w-5 h-5" />,
  },
  {
    to: "/exam-routine",
    label: "Exam Routine",
    icon: <IoClipboardOutline className="w-5 h-5" />,
  },
  {
    to: "/results",
    label: "Mark sheets",
    icon: <IoTrophyOutline className="w-5 h-5" />,
  },
  {
    to: "/attendance",
    label: "Attendance",
    icon: <IoCheckmarkDoneOutline className="w-5 h-5" />,
  },
  {
    to: "/clearance",
    label: "Clearance",
    icon: <BsSendCheck className="w-5 h-5" />,
  },
  {
    to: "/marks-appeal",
    label: "Marks Appeal",
    icon: <IoShieldCheckmarkSharp className="w-5 h-5" />,
  },
  {
    to: "/online-exam",
    label: "Online Exam",
    icon: <IoPlayOutline className="w-5 h-5" />,
  },
];

const StudentSidebar = ({ className = "" }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // lg breakpoint

  // independent collapsed states
  const [collapsedDesktop, setCollapsedDesktop] = useState(false);
  const [collapsedMobile, setCollapsedMobile] = useState(false);

  const collapsed = isDesktop ? collapsedDesktop : collapsedMobile;

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // basic close on history changes
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  // widths for each mode
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
            <div className="font-heading text-white text-xl">Student</div>
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
        aria-label="Student sidebar"
      >
        {/* Header + collapse/close */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          <span className={`font-heading text-white text-lg ${collapsed ? "opacity-0 w-0" : ""}`}>
            Student Panel
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
                  <div className="relative flex items-center">
                    <span className="text-primary-100">{l.icon}</span>
                    {"badge" in l && l.badge && (
                      <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-primary-50 transition-all ${collapsed ? "scale-75" : "scale-100"}`}>
                        {l.badge}
                      </span>
                    )}
                  </div>
                  <span className={`whitespace-nowrap transition-all duration-300 ${labelCls}`}>{l.label}</span>
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

export default StudentSidebar;
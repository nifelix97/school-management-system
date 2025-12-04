import { useEffect, useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoMdHome, IoMdPerson } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import sanlogo from "../assets/sanverse.png";
import FloatingLanguageSelector from "./FloatingLanguageSelector";
import LoginDropdown from "./LoginPopUp";







// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import type { RootState } from "../app/store";
// import { logout } from "../app/feature/authSlice";




const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [loginOpen, setLoginOpen] = useState(false);
  const [loginSheetOpen, setLoginSheetOpen] = useState(false);

  // const dropdownRef = useRef<HTMLDivElement>(null);
  

  //   const { user, isAuthenticated } = useSelector(
  //     (state: RootState) => state.auth
  //   );
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

 


  // const handleLogout = () => {
  //    dispatch(logout());
  //   toast.success("Logged out successfully. See you soon!");
  //   navigate("/");
  //   setShowUserMenu(false);
  // };

  //   const isAdmin = user?.role === "admin";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-2 px-4 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center no-underline">
          <img
            src={sanlogo}
            alt="SANVERSE"
            className="h-12 md:h-30 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="flex gap-8 items-center">
            <Link
              to="/"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span className="font-bold ">
                <IoMdHome className="size-5  " />
              </span>
              Home
            </Link>
            <Link
              to="/admissions"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span>
                <IoMdPerson className="size-5  " />
              </span>
              Admissions
            </Link>
            {/* <Link
              to="/login"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span>
                <IoMdPerson className="size-5  " />
              </span>
              Teachers
            </Link> */}
            <Link
              to="#"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span>
                <FaRegFileLines className="size-5  " />
              </span>
              Blog
            </Link>
            <Link
              to="#"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span>
                <IoIosCheckmarkCircle className="size-5  " />
              </span>
              About
            </Link>
            <Link
              to="#"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span>
                <MdEmail className="size-5  " />
              </span>
              Contact
            </Link>
            {/* <Link
              to="/login"
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex align-items-center gap-1"
            >
              <span>
                <IoChevronForward className="size-5  " />
              </span>
              SANVERSE
            </Link> */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="no-underline text-primary-50 font-medium hover:text-primary-100 flex items-center gap-1 bg-transparent border-none cursor-pointer"
              aria-label="Go to login"
            >
              <IoLogInOutline className="size-5" />
              Login
            </button>

            <div className="relative">
              <FloatingLanguageSelector />
            </div>

            {/* {isAdmin && (
              <Link
                to="/dashboard"
                className="no-underline text-primary-400 font-medium hover:text-primary-200"
              >
                Dashboard
              </Link>
            )} */}
            {/* <LoginDropdown
              open={loginOpen}
              onClose={() => setLoginOpen(false)}
            /> */}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="lg:hidden bg-transparent border-none text-2xl text-primary-100 cursor-pointer"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <>
          {/* Login Roles Sidebar (mobile) */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-primary-50 text-white shadow-2xl z-[60] transform transition-transform duration-300 ${
              loginSheetOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="m-0 text-white text-lg font-bold">Login as</h3>
              <button
                onClick={() => setLoginSheetOpen(false)}
                className="bg-transparent border-none text-2xl text-primary-100"
                aria-label="Close login roles"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Student",
                  "Parent",
                  "Teacher",
                  "Librarian",
                  "Accountant",
                  "Registrar",
                  "Nurse",
                  "Alumni",
                  "Manager",
                  "Warden",
                  "Auditor",
                  "Vendors",
                  "Coaches",
                  "Receptionist",
                  "Admin",
                  "Vice Principal",
                  "HOD",
                  "Vice Chancellor",
                  "Chancellor",
                ].map((role, idx) => (
                  <Link
                    key={`${role}-${idx}`}
                    to={`/login?role=${encodeURIComponent(role)}`}
                    onClick={() => {
                      setLoginSheetOpen(false);
                      setIsOpen(false);
                    }}
                    className="no-underline rounded-lg px-4 py-3 text-center border border-gray-200 bg-primary-50/20 hover:bg-gray-100 text-white font-medium"
                  >
                    {role}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Overlay for login sidebar */}
          <div
            className={`fixed inset-0 bg-black/30 z-[50] transition-opacity ${
              loginSheetOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setLoginSheetOpen(false)}
          />
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/30 transition-opacity ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
          />
          {/* Slide-in sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-primary-50 text-white shadow-2xl transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="px-5 py-4 flex items-center justify-between">
              <h2 className="m-0 font-heading text-xl text-primary-100">
                Menu
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-transparent border-none text-2xl text-white/90"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-2 flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <IoMdHome className="size-5 text-primary-100" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <IoMdPerson className="size-5 text-primary-100" />
                <span className="font-medium">Admissions</span>
              </Link>
              {/* <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <IoMdPerson className="size-5 text-primary-100" />
                <span className="font-medium">Teachers</span>
              </Link> */}
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <FaRegFileLines className="size-5 text-primary-100" />
                <span className="font-medium">Blog</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <IoIosCheckmarkCircle className="size-5 text-primary-100" />
                <span className="font-medium">About</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <MdEmail className="size-5 text-primary-100" />
                <span className="font-medium">Contact</span>
              </Link>

              {/* <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10"
              >
                <IoChevronForward className="size-5 text-primary-100" />
                <span className="font-medium">SANVERSE</span>
              </Link> */}
              <button
                type="button"
                onClick={() => setLoginSheetOpen(true)}
                className="w-full no-underline rounded-lg px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 bg-transparent border-none text-left"
              >
                <IoLogInOutline className="size-5 text-primary-100" />
                <span className="font-medium">Login</span>
              </button>
              <div className="rounded-lg px-4 py-3 bg-white text-center">
                <FloatingLanguageSelector inline={true} />
              </div>
            </div>
            <LoginDropdown
              open={loginOpen}
              onClose={() => setLoginOpen(false)}
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;

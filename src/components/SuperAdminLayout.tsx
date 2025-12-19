import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { isSystemLocked } from "../utils/roles";
import NavBar from "./NavBar";
import SuperAdminSidebar from "./SuperAdminSidebar";

const SuperAdminLayout: React.FC = () => {
  const locked = isSystemLocked();

  return (
    <div className="bg-primary-50/10"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 0,
      }}
    >
      <NavBar />

      {locked && (
        <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-4 flex items-center justify-center gap-4 fixed top-[64px] left-0 right-0 z-[60] animate-pulse">
          <IoAlertCircleOutline className="text-sm" />
          Platform Hard-Lock Active: Restrictive Access Enforcement Enabled
          <IoAlertCircleOutline className="text-sm" />
        </div>
      )}

      {/* Content area below fixed NavBar */}
      <div style={{ flex: 1, paddingTop: "64px" }}>
        <div className="flex">
          {/* Fixed/collapsible sidebar (handles its own spacers) */}
          <SuperAdminSidebar />

          {/* Page content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

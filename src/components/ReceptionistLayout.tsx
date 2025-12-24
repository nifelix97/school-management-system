import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ReceptionistSidebar from "./ReceptionistSidebar";

const ReceptionistLayout: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-primary-50/5 to-primary-50/10"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
      <NavBar />

      {/* Content area below fixed NavBar */}
      <div style={{ flex: 1, paddingTop: "64px" }}>
        <div className="flex">
          {/* Fixed/collapsible sidebar (handles its own spacers) */}
          <ReceptionistSidebar />

          {/* Page content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ParentSidebar from "./ParentSidebar";

const ParentLayout: React.FC = () => {
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

      {/* Content area below fixed NavBar */}
      <div className="flex-1 w-full" style={{ paddingTop: "64px" }}>
        <div className="flex w-full min-w-0">
          {/* Fixed/collapsible sidebar (handles its own spacers) */}
          <ParentSidebar />

          {/* Page content */}
          <main className="flex-1 min-w-0 px-2 sm:px-6 lg:px-8 py-4 md:py-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParentLayout;

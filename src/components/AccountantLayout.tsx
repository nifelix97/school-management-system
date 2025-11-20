import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AccountantSidebar from "./AccountantSidebar";

const AccountantLayout: React.FC = () => {
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
      <div style={{ flex: 1, paddingTop: "64px" }}>
        <div className="flex">
          {/* Fixed/collapsible sidebar (handles its own spacers) */}
          <AccountantSidebar />

          {/* Page content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountantLayout;
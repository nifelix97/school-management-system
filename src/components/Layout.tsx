import React from "react";
import { Outlet } from "react-router-dom";
import { isSystemLocked } from "../utils/roles";
import Footer from "./Footer";
import NavBar from "./NavBar";
import SystemLockScreen from "./SystemLockScreen";
// import FloatingLanguageSelector from "./FloatingLanguageSelector";

const Layout: React.FC = () => {
  if (isSystemLocked()) {
    return <SystemLockScreen />;
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 0 }}
    >
      <NavBar />
      <main style={{ flex: 1, paddingTop: "64px" }}>
        <Outlet />
      </main>
      <Footer />
      {/* <FloatingLanguageSelector /> */}
    </div>
  );
};

export default Layout;
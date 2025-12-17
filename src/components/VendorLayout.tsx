
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import VendorSidebar from "./VendorSidebar";

const VendorLayout = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col relative z-0">
            <NavBar />
            
            {/* Content area below fixed NavBar */}
            <div style={{ flex: 1, paddingTop: "64px" }}>
                <div className="flex">
                    <VendorSidebar />
                    <main className="flex-1 min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VendorLayout;

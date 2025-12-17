import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import CoacheSidebar from "./CoacheSidebar";

const CoacheLayout = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col relative z-0">
            <NavBar />
            
            {/* Content area below fixed NavBar */}
            <div style={{ flex: 1, paddingTop: "64px" }}>
                <div className="flex">
                    <CoacheSidebar />
                    <main className="flex-1 min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CoacheLayout;

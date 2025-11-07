import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import DashboardSidebar from "../components/layout/DashboardSidebar";

const DashboardLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Auto-collapse sidebar on medium screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                // Medium screens (md)
                setIsSidebarCollapsed(true);
                setIsSidebarOpen(false);
            } else if (window.innerWidth >= 1024) {
                // Large screens (lg)
                setIsSidebarCollapsed(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleCollapseSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleCollapseToggle = () => {
        toggleCollapseSidebar();
        if (window.innerWidth < 768 && isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    // Function to handle menu item clicks
    const handleMenuItemClick = () => {
        // Close sidebar on mobile and medium screens when menu item is clicked
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Dashboard Navbar (Fixed top) */}
            <DashboardNavbar
                isSidebarCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                toggleCollapseSidebar={handleCollapseToggle}
            />

            {/* Main Content Area with Sidebar */}
            <div className="flex pt-15 h-screen">
                {/* Dashboard Sidebar */}
                <DashboardSidebar
                    isSidebarCollapsed={isSidebarCollapsed}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    onMenuItemClick={handleMenuItemClick}
                />

                {/* Main Content Area */}
                <main className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'backdrop-blur-xs md:backdrop-blur-0' : ''
                    }`}>
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

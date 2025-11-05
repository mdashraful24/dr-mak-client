import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        // Close sidebar when pressing Escape key
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when sidebar is open on mobile
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-[#e0e5ec] shadow-[5px_5px_6px_#babecc,-5px_-5px_5px_#ffffff] px-4 py-2.5">
                <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200"
                        >
                            <Menu size={22} />
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-10 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                {/* <span className="text-blue-600 font-semibold text-lg">MAK</span> */}
                            </div>
                            <div className="hidden md:block">
                                {/* <h1 className="text-xl font-bold">MediCare</h1>
                                <p className="text-sm">Doctors Care</p> */}
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {/* Bell */}
                        <button className="relative p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {/* Profile */}
                        <div className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#e0e5ec]" />
                            </div>

                            <div className="hidden lg:block text-right">
                                {/* <p className="font-semibold">Dr. Md. Abul Kashem Anik</p>
                                <p className="text-sm">Neurologist & Surgeon</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#e0e5ec] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-[6px_6px_8px_#babecc,-2px_-2px_2px_#ffffff]' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="px-5 py-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-11 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                {/* <span className="text-blue-600 font-semibold text-xl">MAK</span> */}
                            </div>
                            <div>
                                {/* <h1 className="text-xl font-semibold">MediCare</h1>
                                <p className="text-sm">Doctors Care</p> */}
                            </div>
                        </div>
                    </div>
                    <div className='border-b border-gray-300 drop-shadow'></div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div onClick={closeSidebar}>
                            <ul className="space-y-3 cursor-pointer">
                                <Sidebar />
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-300">
                        <button
                            onClick={closeSidebar}
                            className="w-full text-left px-4 py-3 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 font-medium transition duration-200 flex items-center gap-3 cursor-pointer"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-xs z-40"
                    onClick={closeSidebar}
                />
            )}
        </>
    );
};

export default Navbar;

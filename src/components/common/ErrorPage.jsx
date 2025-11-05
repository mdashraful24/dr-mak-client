import Lottie from "lottie-react";
import errorAnimation from "../../assets/404/404";
import { Link } from "react-router";
import { Home, Phone } from "lucide-react";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-blue-50 px-4 space-y-10">
            {/* Page Title */}
            <title>Page Not Found | MediCare System</title>

            {/* Error Content Card */}
            <div className="space-y-10">
                {/* Animation Container */}
                <div className="max-w-md mx-auto">
                    <div className="bg-linear-to-br from-gray-100 to-blue-50 rounded-2xl p-6 shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
                        <Lottie
                            animationData={errorAnimation}
                            loop={true}
                            className="rounded-xl"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-4 md:gap-8 justify-between items-center">
                    {/* Home Button */}
                    <Link
                        to="/"
                        className="max-w-full w-full flex items-center justify-center gap-3 bg-linear-to-br from-cyan-600 to-blue-600 text-sm md:text-base text-white p-4 rounded-2xl shadow-[8px_8px_16px_#1a6a96,-5px_-5px_8px_#4ca1cf] hover:shadow-[4px_4px_8px_#1a6a96,-4px_-4px_8px_#4ca1cf] transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                    >
                        <Home className="hidden md:block w-5 h-5" />
                        <span>Return to Clinic</span>
                    </Link>

                    {/* Emergency Contact */}
                    <Link
                        to="/emergency"
                        className="max-w-full w-full flex items-center justify-center gap-3 bg-linear-to-br from-gray-100 to-blue-50 text-sm md:text-base p-4 rounded-2xl shadow-[8px_8px_16px_#bebebe,-5px_-5px_8px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] transition-all duration-300 transform hover:-translate-y-1 font-semibold border border-white/50"
                    >
                        <Phone className="hidden md:block w-5 h-5 text-red-500" />
                        <span>Emergency Help</span>
                    </Link>
                </div>
            </div>

            {/* Support Section */}
            {/* <div className="text-center max-w-md">
                <div className="bg-linear-to-br from-gray-100 to-blue-50 rounded-2xl p-4 shadow-[10px_10px_10px_#bebebe,-10px_-10px_10px_#ffffff]">
                    <h3 className="text-lg font-bold mb-2">
                        Need Medical Assistance?
                    </h3>
                    <p className="text-sm mb-2">
                        Our medical team is available 24/7 to help you
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-blue-700 font-semibold transition-colors duration-200 group"
                    >
                        <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:underline">Contact Medical Support</span>
                    </Link>
                </div>
            </div> */}
        </div>
    );
};

export default ErrorPage;

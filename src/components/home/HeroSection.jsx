import { Link } from "react-router";
import heropic from "../../assets/dr/dr.png"

const HeroSection = () => {
    return (
        <div className="min-h-[90vh] container mx-auto flex flex-col lg:flex-row justify-between items-center gap-5 px-4">

            {/* Left Text Section */}
            <div className="space-y-4 lg:space-y-8 max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Trusted Healthcare Since 2010</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Exceptional
                        <span className="text-blue-600"> Medical Care</span>
                        {" "}for Your Entire Family
                    </h1>

                    <p className="md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
                        Our team of board-certified physicians provides comprehensive,
                        personalized healthcare with cutting-edge technology and compassionate service.
                    </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 py-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">50+</div>
                        <div className="text-sm text-gray-500">Expert Doctors</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">10K+</div>
                        <div className="text-sm text-gray-500">Happy Patients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-500">Support</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row justify-center md:justify-start gap-4">
                    <Link to="/appointments">
                        <button className="flex-1 md:flex-none p-4 rounded-2xl bg-blue-700 text-white font-semibold shadow-neumorphic-soft hover:shadow-neumorphic-soft-inset transition-all duration-300 transform hover:-translate-y-1">
                            <span className="flex justify-center items-center gap-0 md:gap-1">
                                <span className="hidden md:block">Book</span>
                                <span>Appointment Now</span>
                            </span>
                        </button>
                    </Link>
                    <button className="flex-1 md:flex-none p-4 rounded-2xl bg-neumorphic shadow-neumorphic-soft hover:shadow-neumorphic-soft-inset transition-all duration-300 hover:-translate-y-1 font-semibold">
                        All Service
                    </button>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="flex justify-center items-center">
                <div>
                    <img src={heropic} alt="" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

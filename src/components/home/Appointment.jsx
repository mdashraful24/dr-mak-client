const Appointment = () => {
    return (
        <div className="bg-gray-100 py-20 px-4">
            <div className="container mx-auto">
                <div className="md:rounded-3xl md:p-6 md:shadow-neumorphic md:border-l md:border-t md:border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Information */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    Book Your <span className="text-blue-600">Appointment</span>
                                </h1>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Schedule your visit with our experienced healthcare professionals.
                                    We provide comprehensive medical care with a personal touch.
                                    Your health is our priority.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center p-6 rounded-2xl bg-gray-100 shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-300">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 shadow-neumorphic mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Call us</p>
                                        <p className="font-semibold text-lg">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-6 rounded-2xl bg-gray-100 shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-300">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 shadow-neumorphic mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Visit us</p>
                                        <p className="font-semibold text-lg">123 Healthcare St, Medical City</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-gray-100 shadow-neumorphic">
                                <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        Experienced medical professionals
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        State-of-the-art facilities
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        Personalized care approach
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                        Flexible appointment scheduling
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Side - Appointment Form */}
                        <div className="p-6 rounded-3xl bg-gray-100 shadow-neumorphic">
                            {/* <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                                Schedule Appointment
                            </h2> */}

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        placeholder="Enter your mobile number"
                                    />
                                </div>

                                {/* Custom Doctor Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-2">
                                        Select Doctor
                                    </label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer custom-select">
                                            <option value="">Choose a doctor</option>
                                            <option value="dr-smith">Dr. Sarah Smith - Cardiologist</option>
                                            <option value="dr-johnson">Dr. Mike Johnson - Neurologist</option>
                                            <option value="dr-wilson">Dr. Emily Wilson - Pediatrician</option>
                                            <option value="dr-brown">Dr. James Brown - Orthopedic</option>
                                            <option value="dr-garcia">Dr. Maria Garcia - Dermatologist</option>
                                            <option value="dr-chen">Dr. David Chen - Ophthalmologist</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none transform transition-transform duration-300 custom-select-arrow">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Custom Date Picker */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium mb-2">
                                            Preferred Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer custom-date"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Custom Time Picker */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium mb-2">
                                            Preferred Time
                                        </label>
                                        <div className="relative">
                                            <select className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer custom-select">
                                                <option value="">Select time</option>
                                                <optgroup label="Evening" className="text-gray-700">
                                                    <option value="16:00">4:00 PM</option>
                                                    <option value="16:30">4:30 PM</option>
                                                    <option value="17:00">5:00 PM</option>
                                                    <option value="17:30">5:30 PM</option>
                                                    <option value="18:00">6:00 PM</option>
                                                </optgroup>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none transform transition-transform duration-300 custom-select-arrow">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Custom Service Required Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-2">
                                        Service Required
                                    </label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer custom-select">
                                            <option value="">Select service type</option>
                                            <option value="consultation">General Consultation</option>
                                            <option value="checkup">Routine Check-up</option>
                                            <option value="followup">Follow-up Visit</option>
                                            <option value="emergency">Emergency Care</option>
                                            <option value="specialist">Specialist Consultation</option>
                                            <option value="surgery">Surgical Procedure</option>
                                            <option value="therapy">Therapy Session</option>
                                            <option value="diagnostic">Diagnostic Tests</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none transform transition-transform duration-300 custom-select-arrow">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl shadow-neumorphic-blue hover:shadow-neumorphic-blue-inset hover:bg-blue-700 transition-all duration-300 font-semibold text-lg mt-6"
                                >
                                    Book Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;

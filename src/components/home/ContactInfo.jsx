import Button from "../common/Button";

const ContactInfo = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Get In Touch</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                        We're Here to <span className="text-blue-600">Help You</span>
                    </h2>

                    <p className="md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Conveniently located and ready to provide you with exceptional neurosurgical care.
                        Contact us today to schedule your consultation.
                    </p>
                </div>

                {/* Information Boxes Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Opening Hours Box */}
                    <div className="bg-white rounded-3xl shadow-soft p-8 text-center group hover:shadow-softInset transition-all duration-300 border border-gray-200 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-green-50 to-green-100 border border-green-200 shadow-neumorphic-inset flex items-center justify-center text-green-600 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span className="font-semibold">8:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday</span>
                                <span className="font-semibold">9:00 AM - 2:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span className="font-semibold text-red-500">Closed</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between font-semibold text-green-600">
                                    <span>Emergency</span>
                                    <span>24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Location Box */}
                    <div className="bg-white rounded-3xl shadow-soft p-8 text-center group hover:shadow-softInset transition-all duration-300 border border-gray-200 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-neumorphic-inset flex items-center justify-center text-blue-600 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Our Location</h3>
                        <div className="space-y-4 mb-8 grow">
                            <p className="leading-relaxed">
                                Neuroscience Center<br />
                                123 Medical Plaza Drive<br />
                                Suite 500<br />
                                San Francisco, CA 94107
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Button text="Get Directions" />
                        </div>
                    </div>

                    {/* Contact Us Box */}
                    <div className="bg-white rounded-3xl shadow-soft p-8 text-center group hover:shadow-softInset transition-all duration-300 border border-gray-200 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-neumorphic-inset flex items-center justify-center text-orange-600 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <div className="space-y-4 mb-8 grow">
                            <div className="text-left space-y-3">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="font-semibold">(555) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>info@neurosciencecenter.com</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Emergency: (555) 987-6543</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <Button text="Book Appointment" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
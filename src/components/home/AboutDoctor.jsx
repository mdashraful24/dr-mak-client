// import { HashLink as Link } from 'react-router-hash-link';
import { Link } from "react-router";
import dr from "../../assets/dr/dr.png"
import Button from "../common/Button";

const AboutDoctor = () => {
    const specialties = [
        "Brain Tumor Surgery",
        "Minimally Invasive Neurosurgery",
        "Spinal Surgery",
        "Pediatric Neurosurgery",
        "Neurotrauma",
        "Functional Neurosurgery",
        "Deep Brain Stimulation",
        "Skull Base Surgery",
        "Neuro-endoscopy",
        "Trauma Surgery"
    ];

    const education = [
        {
            degree: "MD, Neurological Surgery",
            institution: "Johns Hopkins University School of Medicine",
            year: "2008"
        },
        {
            degree: "Residency in Neurosurgery",
            institution: "Massachusetts General Hospital",
            year: "2013"
        },
        {
            degree: "Fellowship in Skull Base Surgery",
            institution: "Cleveland Clinic",
            year: "2015"
        }
    ];

    const awards = [
        "Top Doctor Award 2023",
        "Excellence in Neurosurgical Innovation",
        "Patient Choice Award 2022",
        "Research Excellence Medal"
    ];

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-blue-700">Meet Our Expert</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-linear-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                        Dr. MAK
                    </h2>

                    <p className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                        Pioneering minimally invasive neurosurgical techniques with over 12 years of specialized experience
                        in complex brain and spinal procedures.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="rounded-3xl shadow-soft p-8 text-center border border-gray-200 bg-white transition-all duration-500">
                            {/* Profile Image */}
                            <div className="relative mb-6">
                                <div className="w-60 h-60 mx-auto rounded-2xl shadow-neumorphic-inset p-4 bg-linear-to-br from-blue-50 to-gray-100">
                                    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-200">
                                        <img
                                            src={dr}
                                            alt="Dr. MAK"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Verification Badge */}
                                <div className="absolute bottom-4 right-1/4 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-2">Dr. MAK</h3>
                            <p className="text-blue-600 font-semibold mb-4">Chief of Neurosurgery</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>San Francisco Medical Center</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>12+ Years Experience</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-4 shadow-neumorphic-inset border border-blue-100">
                                    <div className="text-2xl font-bold text-blue-600">850+</div>
                                    <div className="text-xs">Surgeries</div>
                                </div>
                                <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-4 shadow-neumorphic-inset border border-green-100">
                                    <div className="text-2xl font-bold text-green-600">99%</div>
                                    <div className="text-xs">Success Rate</div>
                                </div>
                            </div>

                            <Link to="/appointments" smooth>
                                <Button text="Book Appointment" />
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Right Column - Content */}
                        <div className="space-y-8">
                            {/* Introduction */}
                            <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-200">
                                <h3 className="text-2xl font-bold mb-4">Professional Overview</h3>
                                <p className="leading-relaxed mb-6">
                                    Dr. Michael Chen is a renowned neurosurgeon specializing in complex brain and spinal
                                    procedures. With over 15 years of experience, he has dedicated his career to advancing
                                    neurosurgical techniques and providing compassionate care to patients with neurological disorders.
                                </p>
                                <p className="leading-relaxed">
                                    His expertise includes minimally invasive approaches that reduce recovery time and
                                    improve surgical outcomes, making him a trusted choice for patients seeking
                                    cutting-edge neurological care.
                                </p>
                            </div>

                            {/* Specialties */}
                            <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-200">
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 shadow-neumorphic-soft flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    Surgical Expertise
                                </h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {specialties.map((specialty, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 rounded-2xl bg-blue-50 border border-blue-100 shadow-neumorphic-inset group hover:shadow-soft transition-all duration-300"
                                        >
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                                            <span className="font-medium text-sm">{specialty}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Education & Awards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Education */}
                            <div className="bg-white rounded-3xl shadow-soft p-6 border border-gray-200">
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 shadow-neumorphic-soft flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M12 14l6.16-3.422A12.083 12.083 0 0118 20H6a12.083 12.083 0 01-.16-9.422L12 14z" />
                                        </svg>
                                    </div>
                                    Education
                                </h3>
                                <div className="space-y-4">
                                    {education.map((edu, index) => (
                                        <div key={index} className="p-4 rounded-2xl bg-linear-to-br from-blue-50 to-gray-50 shadow-neumorphic-inset border border-blue-100">
                                            <div className="font-semibold">{edu.degree}</div>
                                            <div className="text-sm mt-1">{edu.institution}</div>
                                            <div className="text-xs text-blue-600 font-medium mt-2">{edu.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Awards & Recognition */}
                            <div className="bg-white rounded-3xl shadow-soft p-6 border border-gray-200">
                                <h3 className="text-xl font-bold mb-4">Awards & Recognition</h3>
                                <div className="space-y-3">
                                    {awards.map((award, index) => (
                                        <div key={index} className="flex items-center p-3 rounded-2xl bg-linear-to-br from-purple-50 to-pink-50 shadow-neumorphic-inset border border-purple-100 transition-all duration-300">
                                            <svg className="w-5 h-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="font-medium text-sm">{award}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Philosophy Section */}
                <div className="mt-16 bg-white rounded-3xl p-8 shadow-soft border border-gray-200">
                    <div className="text-center max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold mb-6">Medical Philosophy</h3>
                        <p className="text-xl leading-relaxed mb-8">
                            "I believe in treating every patient with the same care and compassion I would offer my own family.
                            Neurosurgery is not just about technical expertise; it's about understanding the human behind
                            every condition and working together to achieve the best possible outcome."
                        </p>
                        <div className="flex items-center justify-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold">- Dr. Michael Chen</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutDoctor;

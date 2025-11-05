const ServicesOverview = () => {
    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: "Brain Tumor Surgery",
            description: "Advanced surgical techniques for benign and malignant brain tumors including glioma, meningioma, and metastatic tumors.",
            procedures: ["Craniotomy", "Awake Brain Surgery", "Minimally Invasive"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
            title: "Spinal Surgery",
            description: "Comprehensive spine care including disc herniation, spinal stenosis, deformities, and spinal cord tumors.",
            procedures: ["Microdiscectomy", "Spinal Fusion", "Laminectomy"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Minimally Invasive Neurosurgery",
            description: "State-of-the-art endoscopic and keyhole procedures for faster recovery and minimal tissue disruption.",
            procedures: ["Endoscopic Surgery", "Keyhole Craniotomy", "Navigation-guided"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Pediatric Neurosurgery",
            description: "Specialized care for children with congenital and acquired neurological conditions.",
            procedures: ["Hydrocephalus", "Spina Bifida", "Pediatric Brain Tumors"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Neurotrauma",
            description: "Emergency and critical care for head injuries, traumatic brain injuries, and spinal cord injuries.",
            procedures: ["ICP Monitoring", "Decompressive Craniectomy", "Trauma Surgery"]
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Functional Neurosurgery",
            description: "Advanced procedures for movement disorders, epilepsy, and chronic pain conditions.",
            procedures: ["Deep Brain Stimulation", "Epilepsy Surgery", "Pain Management"]
        }
    ];

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-blue-700">Specialized Neurosurgical Care</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Comprehensive <span className="text-blue-600">Neurosurgical</span> Services
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Offering advanced surgical solutions for complex neurological conditions with precision,
                        expertise, and compassionate patient care.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl border border-gray-200 shadow-soft hover:shadow-softInset transition-all duration-500 transform hover:-translate-y-2 p-6"
                        >
                            {/* Icon Container */}
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-neumorphic-inset flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>

                            {/* Service Title */}
                            <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                {service.title}
                            </h3>

                            {/* Service Description */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Procedures List */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold uppercase tracking-wide">
                                    Common Procedures:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {service.procedures.map((procedure, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 shadow-neumorphic-inset"
                                        >
                                            {procedure}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesOverview;
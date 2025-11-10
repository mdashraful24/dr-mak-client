import { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How do I book an appointment?",
            answer: "You can book an appointment through our online booking system, by calling our clinic directly at +1 (555) 123-4567, or by visiting our facility in person. Our online system is available 24/7 for your convenience."
        },
        {
            question: "What should I bring to my first appointment?",
            answer: "Please bring your government-issued ID, insurance card, list of current medications, any relevant medical records or test results, and a list of questions you may have for the doctor."
        },
        {
            question: "How far in advance should I book appointments?",
            answer: "We recommend booking routine appointments 2-3 weeks in advance. For urgent matters, we try to accommodate same-day or next-day appointments whenever possible. Specialist consultations may require longer waiting periods."
        },
        {
            question: "Can I reschedule or cancel my appointment?",
            answer: "Yes, you can reschedule or cancel your appointment up to 24 hours in advance without any charges. Please use our online portal or call our office to make changes to your appointment."
        },
        {
            question: "How do I access my medical records?",
            answer: "You can access your medical records through our patient portal. If you need assistance, please contact our medical records department during business hours, and we'll be happy to help you."
        },
        {
            question: "What are your payment options?",
            answer: "We accept cash, credit cards, debit cards, and personal checks. We also offer payment plans for larger medical bills. Co-pays are due at the time of service."
        },
        {
            question: "Do you provide specialist referrals?",
            answer: "Yes, our primary care physicians can provide referrals to specialists within our network when medically necessary. We'll help coordinate your care and ensure smooth communication between providers."
        }
    ];

    return (
        <div className="bg-gray-50 py-20 px-4">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-blue-700">FAQ</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                        Frequently Asked <span className="text-blue-600">Questions</span>
                    </h1>

                    <p className="md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Find answers to common questions about our services, appointments,
                        and healthcare procedures. Can't find what you're looking for?
                        Contact us directly.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden transition-all duration-300"
                        >
                            <button
                                className="w-full p-3 md:px-6 md:py-3 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-4">
                                    {faq.question}
                                </h3>
                                <div className="shrink-0">
                                    <svg
                                        className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            <div
                                className={`px-6 transition-all duration-300 overflow-hidden ${activeIndex === index ? 'pb-6' : 'max-h-0'
                                    }`}
                            >
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;

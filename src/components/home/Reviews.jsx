import { useState, useEffect } from 'react';

const Reviews = () => {
    const [activeIndex, setActiveIndex] = useState(2);

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            date: "Jan 15, 2024",
            comment: "Dr. Smith provided exceptional care. His attention to detail and compassionate approach made all the difference in my recovery journey.",
            doctor: "Dr. Michael Smith",
            specialty: "Cardiology",
            avatar: "👩‍💼"
        },
        {
            id: 2,
            name: "Robert Chen",
            rating: 4,
            date: "Jan 12, 2024",
            comment: "Very professional and knowledgeable. The consultation was thorough and all my concerns were addressed properly.",
            doctor: "Dr. Emily Davis",
            specialty: "Dermatology",
            avatar: "👨‍💻"
        },
        {
            id: 3,
            name: "Maria Garcia",
            rating: 5,
            date: "Jan 10, 2024",
            comment: "Outstanding care and attention. Dr. Wilson made me feel comfortable throughout the entire treatment process. Highly recommended!",
            doctor: "Dr. James Wilson",
            specialty: "Pediatrics",
            avatar: "👩‍🏫"
        },
        {
            id: 4,
            name: "David Kim",
            rating: 4,
            date: "Jan 8, 2024",
            comment: "Excellent doctor with great bedside manner. The follow-up care was exceptional and showed genuine concern for my wellbeing.",
            doctor: "Dr. Sarah Brown",
            specialty: "Orthopedics",
            avatar: "👨‍🔬"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            rating: 5,
            date: "Jan 5, 2024",
            comment: "Exceptional service! Dr. Anderson was patient, thorough, and really cared about my long-term health outcomes.",
            doctor: "Dr. Mark Anderson",
            specialty: "Neurology",
            avatar: "👩‍🎨"
        }
    ];

    const StarRating = ({ rating }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-lg ${star <= rating ? 'text-amber-400' : 'text-gray-400'
                            } transition-colors duration-300`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    // Auto-rotate reviews
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    const handleCardClick = (index) => {
        setActiveIndex(index);
    };

    const getCardStyle = (index) => {
        const distance = Math.abs(index - activeIndex);

        // For small screens, only show the active card
        if (window.innerWidth < 768) {
            return index === activeIndex
                ? "scale-100 opacity-100 z-20 block"
                : "scale-95 opacity-0 z-0 hidden";
        }

        if (distance === 0) {
            // Center card - focused
            return "scale-110 opacity-100 z-20";
        } else if (distance === 1) {
            // Adjacent cards
            return "scale-105 opacity-90 z-10";
        } else if (distance === 2) {
            // Outer cards
            return "scale-100 opacity-70 z-0";
        }
        return "scale-95 opacity-50 z-0";
    };

    const getTransform = (index) => {
        // For small screens, center the active card
        if (window.innerWidth < 768) {
            return "translate-x-0";
        }

        const distance = index - activeIndex;

        if (distance === -2) return "translate-x-[-80%]";
        if (distance === -1) return "translate-x-[-40%]";
        if (distance === 0) return "translate-x-0";
        if (distance === 1) return "translate-x-[40%]";
        if (distance === 2) return "translate-x-[80%]";
        return "translate-x-0";
    };

    return (
        <div className="bg-linear-to-br from-gray-100 to-gray-200 py-20">
            <div className="container mx-auto">

                {/* Header */}
                <div className="text-center lg:mb-12 px-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xs md:text-sm font-medium">Our Patients Experiences</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                        Patient Experiences
                    </h1>
                    <p className="md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover what our patients say about their healthcare journey with our dedicated medical team
                    </p>
                </div>

                <div className='px-0 md:px-2 lg:px-0'>
                    {/* Carousel Container */}
                    <div className="relative h-80 md:h-96 lg:h-100 lg:mb-12">
                        <div className="absolute inset-0 flex items-center justify-center overflow-x-hidden">
                            {reviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className={`absolute w-[95%] md:max-w-sm lg:max-w-md transition-all duration-500 ease-in-out cursor-pointer ${getCardStyle(index)} ${getTransform(index)}`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className={`rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 transition-all duration-500 
                                    ${index === activeIndex
                                            ? 'bg-linear-to-br from-white to-gray-100 shadow-soft-active md:scale-110'
                                            : 'bg-linear-to-br from-gray-100 to-gray-200 shadow-soft-inactive'
                                        }`}>

                                        {/* User Header */}
                                        <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4 lg:mb-6">
                                            <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-neumorphic-inset transition-all duration-500`}>
                                                {review.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1 md:mb-2">
                                                    <h3 className="font-bold text-sm md:text-base truncate">{review.name}</h3>
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg shadow-soft-inner border-b border-gray-200 whitespace-nowrap ml-2">
                                                        {review.date}
                                                    </span>
                                                </div>
                                                <StarRating rating={review.rating} />
                                            </div>
                                        </div>

                                        {/* Doctor Info */}
                                        <div className={`mb-3 md:mb-4 lg:mb-6 p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl transition-all duration-500 border-b border-gray-200
                                        ${index === activeIndex
                                                ? 'bg-linear-to-br from-blue-50 to-purple-50 shadow-soft-inner'
                                                : 'bg-linear-to-br from-gray-100 to-gray-200 shadow-soft-inner'
                                            }`}>
                                            <h4 className="font-bold text-xs md:text-sm">{review.doctor}</h4>
                                            <p className="text-xs">
                                                {review.specialty}
                                            </p>
                                        </div>

                                        {/* Review Text */}
                                        <p className={`text-gray-700 leading-relaxed transition-all duration-500 text-xs md:text-sm line-clamp-4 md:line-clamp-none`}>
                                            {review.comment}
                                        </p>

                                        {/* Active indicator */}
                                        {index === activeIndex && (
                                            <div className="absolute top-2 right-2 md:top-3 md:right-3 lg:top-4 lg:right-4">
                                                <div className="relative">
                                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-linear-to-r from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse"></div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-linear-to-r from-green-400 to-emerald-500 rounded-full opacity-75 animate-ping"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center space-x-3 md:space-x-4">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 shadow-soft-inner
                                ${index === activeIndex
                                        ? 'bg-linear-to-br from-blue-500 to-blue-600 shadow-lg scale-110 md:scale-125'
                                        : 'bg-linear-to-br from-gray-300 to-gray-400 hover:scale-105 md:hover:scale-110'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Navigation Arrows */}
                <div className="md:hidden flex justify-between items-center mt-6 px-4">
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                        className="w-10 h-10 rounded-full bg-linear-to-br from-white to-gray-100 shadow-soft-active flex items-center justify-center"
                    >
                        <span className="text-lg">←</span>
                    </button>
                    <span className="text-sm font-medium">
                        {activeIndex + 1} / {reviews.length}
                    </span>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)}
                        className="w-10 h-10 rounded-full bg-linear-to-br from-white to-gray-100 shadow-soft-active flex items-center justify-center"
                    >
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;

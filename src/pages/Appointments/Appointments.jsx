import Button from '../../components/common/Button';
import { useState } from 'react';

const Appointments = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        doctor: '',
        service: '',
        date: '',
        time: ''
    });

    // Calendar functions
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        return (
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        );
    };

    const isPastDate = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isAvailable = (day) => {
        if (isPastDate(day)) return false;

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = date.getDay();

        return dayOfWeek !== 0 && dayOfWeek !== 6;
    };

    const handleDateSelect = (day) => {
        if (!isAvailable(day) || isPastDate(day)) return;

        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(selected);
        setSelectedTime(null);
        setFormData(prev => ({
            ...prev,
            date: selected.toISOString().split('T')[0]
        }));
    };

    const generateTimeSlots = () => {
        const slots = [];
        const startHour = 9;
        const endHour = 17;

        for (let hour = startHour; hour < endHour; hour++) {
            slots.push(`${hour}:00`);
            if (hour < endHour - 1) {
                slots.push(`${hour}:30`);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="text-center p-2 rounded-xl text-gray-300"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const available = isAvailable(day);
            const today = isToday(day);
            const selected = isSelected(day);
            const pastDate = isPastDate(day);

            let className = "text-center p-2 rounded-xl transition-all duration-200 ";

            if (pastDate) {
                className += "text-gray-400 cursor-not-allowed ";
            } else if (selected) {
                className += "neumorphic-pressed bg-blue-100 text-blue-600 font-bold ";
            } else if (today) {
                className += "neumorphic-pressed bg-green-100 text-green-600 font-bold ";
            } else if (available) {
                className += "neumorphic-btn hover:bg-blue-50 text-gray-700 cursor-pointer ";
            } else {
                className += "text-gray-400 cursor-not-allowed ";
            }

            days.push(
                <div
                    key={day}
                    className={className}
                    onClick={() => handleDateSelect(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handleFormChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Appointment booked:', { ...formData, selectedDate, selectedTime });
        // Add your form submission logic here
    };

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-neumorphic shadow-neumorphic-soft mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-blue-700">Contact Our Expert</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                        Book Your <span className="text-blue-600">Appointment</span>
                    </h1>
                    <p className="md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Schedule your appointment and visit our modern healthcare facility.
                        We're committed to providing you with the best medical care.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column - Contact Info */}
                    <div className="space-y-8">
                        {/* Contact Information Card */}
                        <div className="shadow-soft border border-gray-200 bg-white p-6 rounded-3xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Contact Info
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 p-4 neumorphic-inset rounded-2xl">
                                    <div className="neumorphic-icon">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Phone Numbers</p>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                        <p className="text-gray-600 text-sm">Emergency: +1 (555) 123-4568</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 neumorphic-inset rounded-2xl">
                                    <div className="neumorphic-icon">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-gray-600">info@doctorclinic.com</p>
                                        <p className="text-gray-600 text-sm">appointments@doctorclinic.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 neumorphic-inset rounded-2xl">
                                    <div className="neumorphic-icon mt-1">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Address</p>
                                        <p className="text-gray-600">
                                            123 Medical Center Drive<br />
                                            Suite 400<br />
                                            Healthcare City, HC 12345
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Notice */}
                        <div className="bg-red-50 shadow-soft p-6 rounded-2xl border-l-4 border-red-500">
                            <div className="flex items-center space-x-3">
                                <div className="neumorphic-icon bg-red-100">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-800">Medical Emergency</h3>
                                    <p className="text-red-700 text-sm">
                                        For urgent medical concerns, call 911 or visit the nearest emergency room immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Calendar */}
                    <div className="space-y-8">
                        <div className="shadow-soft border border-gray-200 bg-white p-6 rounded-3xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                                <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book Appointment
                            </h2>

                            <div className="bg-white rounded-2xl p-6 neumorphic-inset">
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        className="p-2 neumorphic-btn rounded-lg"
                                        onClick={() => navigateMonth(-1)}
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className="text-lg font-bold">
                                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </h3>
                                    <button
                                        className="p-2 neumorphic-btn rounded-lg"
                                        onClick={() => navigateMonth(1)}
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-3">
                                    {renderCalendar()}
                                </div>
                            </div>

                            {(selectedDate || selectedTime) && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold mt-6">Available Time Slots</h4>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {timeSlots.map(time => (
                                            <div
                                                key={time}
                                                className="p-2 md:p-3 neumorphic-time-slots rounded-xl text-sm md:text-base text-center bg-gray-100 text-gray-600 border border-gray-200"
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Visiting Schedule & Appointment Form */}
                    <div className="space-y-8">
                        {/* Visiting Schedule Card */}
                        <div className="shadow-soft border border-gray-200 bg-white p-6 rounded-3xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                                <svg className="w-6 h-6 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Visiting Hours
                            </h2>

                            <div className="space-y-5">
                                {[
                                    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM', type: 'Regular' },
                                    { day: 'Saturday', hours: '9:00 AM - 2:00 PM', type: 'Limited' },
                                    { day: 'Sunday', hours: 'Emergency Only', type: 'Emergency' },
                                    { day: 'Holidays', hours: 'By Appointment', type: 'Appointment' },
                                ].map((schedule, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 neumorphic-inset rounded-2xl">
                                        <div>
                                            <p className="font-semibold">{schedule.day}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${schedule.type === 'Regular' ? 'bg-green-100 text-green-800 border border-green-300' :
                                                schedule.type === 'Limited' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                                                    schedule.type === 'Emergency' ? 'bg-red-100 text-red-800 border border-red-300' :
                                                        'bg-blue-100 text-blue-800 border border-blue-300'
                                                }`}>
                                                {schedule.type}
                                            </span>
                                        </div>
                                        <p className="font-medium">{schedule.hours}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row justify-center items-stretch gap-10 mt-12'>
                    {/* Map Section */}
                    <div className="w-full neumorphic-inset border border-gray-200 rounded-2xl overflow-hidden p-4">
                        <div className="mb-5">
                            <h2 className="text-xl md:text-2xl font-bold flex items-center">
                                <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Find Our Location
                            </h2>
                        </div>
                        <div className="h-80 lg:h-142 relative rounded-b-3xl overflow-hidden">
                            {/* Google Map */}
                            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    title="clinic-location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.00828238102!2d90.41251877594135!3d23.81033247873302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjIiTiA5MMKwMjQnNTIuOSJF!5e0!3m2!1sen!2sbd!4v1700000000000"
                                    width="100%" height="100%" allowFullScreen loading="lazy"
                                ></iframe>
                            </div>

                            {/* Map Controls */}
                            <div className="absolute top-4 right-4 space-y-3">
                                <button className="w-10 h-10 neumorphic-btn rounded-xl flex items-center justify-center border border-gray-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 neumorphic-btn rounded-xl flex items-center justify-center border border-gray-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Form Card */}
                    <div id="appointment-section" className="w-full shadow-soft border border-gray-200 bg-white p-6 rounded-3xl neumorphic-card-inset">
                        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Quick Appointment
                        </h2>

                        <div className='space-y-8'>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleFormChange}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                        placeholder="Enter your mobile number"
                                        required
                                    />
                                </div>

                                {/* Custom Doctor Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-2">
                                        Select Doctor
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="doctor"
                                            value={formData.doctor}
                                            onChange={handleFormChange}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer custom-select"
                                            required
                                        >
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

                                {/* Custom Service Required Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-2">
                                        Service Required
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleFormChange}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer custom-select"
                                            required
                                        >
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Custom Date Picker */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium mb-2">
                                            Preferred Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer custom-date"
                                                min={new Date().toISOString().split('T')[0]}
                                                required
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
                                            <select
                                                name="time"
                                                value={formData.time}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-100 shadow-neumorphic-inset border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer custom-select"
                                                required
                                            >
                                                <option value="">Select time</option>
                                                <optgroup label="Morning" className="text-gray-700">
                                                    <option value="09:00">9:00 AM</option>
                                                    <option value="09:30">9:30 AM</option>
                                                    <option value="10:00">10:00 AM</option>
                                                    <option value="10:30">10:30 AM</option>
                                                    <option value="11:00">11:00 AM</option>
                                                    <option value="11:30">11:30 AM</option>
                                                </optgroup>
                                                <optgroup label="Afternoon" className="text-gray-700">
                                                    <option value="13:00">1:00 PM</option>
                                                    <option value="13:30">1:30 PM</option>
                                                    <option value="14:00">2:00 PM</option>
                                                    <option value="14:30">2:30 PM</option>
                                                    <option value="15:00">3:00 PM</option>
                                                    <option value="15:30">3:30 PM</option>
                                                </optgroup>
                                                <optgroup label="Evening" className="text-gray-700">
                                                    <option value="16:00">4:00 PM</option>
                                                    <option value="16:30">4:30 PM</option>
                                                    <option value="17:00">5:00 PM</option>
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

                                <Button text="Book Appointment" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;

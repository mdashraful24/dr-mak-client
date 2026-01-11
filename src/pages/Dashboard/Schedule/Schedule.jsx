import { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, User, Stethoscope } from 'lucide-react';

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock appointments data
    const appointments = [
        {
            id: 1,
            time: '09:00',
            patient: 'John Doe',
            doctor: 'Dr. Sarah Chen',
            type: 'Consultation',
            status: 'Confirmed'
        },
        {
            id: 2,
            time: '10:30',
            patient: 'Jane Smith',
            doctor: 'Dr. Michael Rodriguez',
            type: 'Follow-up',
            status: 'Confirmed'
        },
        {
            id: 3,
            time: '14:00',
            patient: 'Mike Johnson',
            doctor: 'Dr. Emily Johnson',
            type: 'Surgery',
            status: 'Pending'
        },
        {
            id: 4,
            time: '15:30',
            patient: 'Sarah Wilson',
            doctor: 'Dr. David Kim',
            type: 'Consultation',
            status: 'Confirmed'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Consultation': return 'bg-blue-100 text-blue-800';
            case 'Follow-up': return 'bg-purple-100 text-purple-800';
            case 'Surgery': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Schedule Management</h1>
                <p className="text-gray-600">Manage appointments and schedules</p>
            </div>

            {/* Date Selector and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="px-3 py-2 bg-[#e0e5ec] border border-gray-300 rounded-xl shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-600">
                        {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <button className="px-4 py-2 bg-[#e0e5ec] text-blue-700 rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 flex items-center gap-2">
                    <Plus size={20} />
                    Add Appointment
                </button>
            </div>

            {/* Schedule Timeline */}
            <div className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Appointments</h2>

                <div className="space-y-4">
                    {appointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center p-4 bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mr-4">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-lg font-semibold text-gray-900">{appointment.time}</span>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(appointment.type)}`}>
                                        {appointment.type}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-700">{appointment.patient}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Stethoscope className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-700">{appointment.doctor}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                <button className="p-2 bg-[#e0e5ec] text-blue-700 rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                    <Edit size={16} />
                                </button>
                                <button className="p-2 bg-[#e0e5ec] text-red-700 rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {appointments.length === 0 && (
                    <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No appointments scheduled for this date</p>
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Clock className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Confirmed</p>
                            <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'Confirmed').length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Unique Patients</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Stethoscope className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Doctors Involved</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
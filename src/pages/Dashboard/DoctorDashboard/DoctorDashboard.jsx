import { useState } from 'react';
import { Calendar, Users, FileText, TrendingUp, TrendingDown, Activity, Clock, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    // Mock data for dashboard
    const stats = [
        {
            title: 'Total Patients',
            value: '1,247',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'blue'
        },
        {
            title: 'Appointments Today',
            value: '24',
            change: '+8%',
            trend: 'up',
            icon: Calendar,
            color: 'green'
        },
        {
            title: 'Pending Reports',
            value: '7',
            change: '-3%',
            trend: 'down',
            icon: FileText,
            color: 'orange'
        },
        {
            title: 'Completed Surgeries',
            value: '156',
            change: '+15%',
            trend: 'up',
            icon: Activity,
            color: 'purple'
        }
    ];

    const recentAppointments = [
        {
            id: 1,
            patient: 'John Doe',
            time: '09:00 AM',
            type: 'Consultation',
            status: 'completed'
        },
        {
            id: 2,
            patient: 'Jane Smith',
            time: '10:30 AM',
            type: 'Follow-up',
            status: 'in-progress'
        },
        {
            id: 3,
            patient: 'Mike Johnson',
            time: '02:00 PM',
            type: 'Surgery',
            status: 'scheduled'
        },
        {
            id: 4,
            patient: 'Sarah Wilson',
            time: '03:30 PM',
            type: 'Consultation',
            status: 'scheduled'
        }
    ];

    const upcomingTasks = [
        'Review lab results for Patient #1234',
        'Prepare surgery notes for tomorrow',
        'Update patient records',
        'Team meeting at 4 PM',
        'Review medication prescriptions'
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'scheduled': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor's Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. Leo! Here's your overview for today.</p>
            </div>

            {/* Period Selector */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {['today', 'week', 'month'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                selectedPeriod === period
                                    ? 'bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] text-blue-600'
                                    : 'bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] text-gray-700'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6 hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <div className="flex items-center mt-2">
                                        {stat.trend === 'up' ? (
                                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                        )}
                                        <span className={`text-sm font-medium ${
                                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
                                    </div>
                                </div>
                                <div className={`w-12 h-12 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center`}>
                                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Appointments */}
                <div className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Today's Appointments</h2>
                        <Clock className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="space-y-3">
                        {recentAppointments.map((appointment) => (
                            <div key={appointment.id} className="flex items-center justify-between p-3 bg-[#e0e5ec] rounded-xl shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff]">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-[#e0e5ec] rounded-xl shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center mr-3">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{appointment.patient}</p>
                                        <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 text-blue-600 font-medium">
                        View All Appointments
                    </button>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h2>
                        <AlertCircle className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="space-y-3">
                        {upcomingTasks.map((task, index) => (
                            <div key={index} className="flex items-center p-3 bg-[#e0e5ec] rounded-xl shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff]">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                <span className="text-gray-700">{task}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 text-gray-700 font-medium">
                        Add New Task
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">New Patient</span>
                    </button>
                    <button className="p-4 bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">Schedule Appointment</span>
                    </button>
                    <button className="p-4 bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">Write Report</span>
                    </button>
                    <button className="p-4 bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">View Analytics</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
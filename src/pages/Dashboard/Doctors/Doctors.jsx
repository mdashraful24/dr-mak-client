import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, User, Phone, Mail, Stethoscope, Award } from 'lucide-react';

const Doctors = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock doctors data
    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Chen',
            specialty: 'Neurosurgery',
            experience: '12 years',
            phone: '+1 (555) 111-2222',
            email: 'sarah.chen@hospital.com',
            patients: 245,
            rating: 4.8,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Dr. Michael Rodriguez',
            specialty: 'Neurology',
            experience: '8 years',
            phone: '+1 (555) 222-3333',
            email: 'michael.rodriguez@hospital.com',
            patients: 189,
            rating: 4.6,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Dr. Emily Johnson',
            specialty: 'Pediatric Neurosurgery',
            experience: '15 years',
            phone: '+1 (555) 333-4444',
            email: 'emily.johnson@hospital.com',
            patients: 156,
            rating: 4.9,
            status: 'Active'
        },
        {
            id: 4,
            name: 'Dr. David Kim',
            specialty: 'Spine Surgery',
            experience: '10 years',
            phone: '+1 (555) 444-5555',
            email: 'david.kim@hospital.com',
            patients: 98,
            rating: 4.7,
            status: 'On Leave'
        }
    ];

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctors Management</h1>
                <p className="text-gray-600">Manage doctor profiles and specializations</p>
            </div>

            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search doctors by name, specialty, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] border-none focus:ring-0 focus:shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                    />
                </div>
                <button className="px-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 flex items-center gap-2 text-blue-600 font-medium">
                    <Plus size={20} />
                    Add Doctor
                </button>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                    <div key={doctor.id} className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6 hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-[#e0e5ec] rounded-xl shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                    <Stethoscope className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                                    <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doctor.status)}`}>
                                {doctor.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Award className="w-4 h-4 mr-2" />
                                {doctor.experience} experience
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <User className="w-4 h-4 mr-2" />
                                {doctor.patients} patients
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Phone className="w-4 h-4 mr-2" />
                                {doctor.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                {doctor.email}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-2">Rating:</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-blue-600 hover:bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                    <Eye size={16} />
                                </button>
                                <button className="p-2 text-yellow-600 hover:bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                    <Edit size={16} />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Stethoscope className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                            <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Doctors</p>
                            <p className="text-2xl font-bold text-gray-900">{doctors.filter(d => d.status === 'Active').length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Award className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Specialties</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Mail className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                            <p className="text-2xl font-bold text-gray-900">4.8</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;
import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Hospital, Users, Stethoscope, Bed } from 'lucide-react';

const Departments = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock departments data
    const departments = [
        {
            id: 1,
            name: 'Neurosurgery',
            head: 'Dr. Sarah Chen',
            doctors: 8,
            nurses: 15,
            beds: 25,
            patients: 18,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Neurology',
            head: 'Dr. Michael Rodriguez',
            doctors: 6,
            nurses: 12,
            beds: 20,
            patients: 14,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Pediatric Neurosurgery',
            head: 'Dr. Emily Johnson',
            doctors: 4,
            nurses: 8,
            beds: 15,
            patients: 9,
            status: 'Active'
        },
        {
            id: 4,
            name: 'Spine Surgery',
            head: 'Dr. David Kim',
            doctors: 5,
            nurses: 10,
            beds: 18,
            patients: 12,
            status: 'Active'
        },
        {
            id: 5,
            name: 'Emergency Neurology',
            head: 'Dr. Lisa Wang',
            doctors: 7,
            nurses: 14,
            beds: 22,
            patients: 16,
            status: 'Active'
        }
    ];

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Departments Management</h1>
                <p className="text-gray-600">Manage hospital departments and specializations</p>
            </div>

            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search departments by name or head..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] border-none focus:ring-0 focus:shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                    />
                </div>
                <button className="px-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 flex items-center gap-2 text-blue-600 font-medium">
                    <Plus size={20} />
                    Add Department
                </button>
            </div>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDepartments.map((dept) => (
                    <div key={dept.id} className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6 hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-[#e0e5ec] rounded-xl shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                    <Hospital className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                                    <p className="text-sm text-gray-600">Head: {dept.head}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dept.status)}`}>
                                {dept.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <Stethoscope className="w-4 h-4 text-blue-600 mr-1" />
                                    <span className="text-sm text-gray-600">Doctors</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{dept.doctors}</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <Users className="w-4 h-4 text-green-600 mr-1" />
                                    <span className="text-sm text-gray-600">Nurses</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{dept.nurses}</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <Bed className="w-4 h-4 text-purple-600 mr-1" />
                                    <span className="text-sm text-gray-600">Beds</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{dept.beds}</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <Users className="w-4 h-4 text-orange-600 mr-1" />
                                    <span className="text-sm text-gray-600">Patients</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{dept.patients}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Occupancy: {Math.round((dept.patients / dept.beds) * 100)}%
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
                        <Hospital className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Departments</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Stethoscope className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.reduce((sum, dept) => sum + dept.doctors, 0)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Bed className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Beds</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.reduce((sum, dept) => sum + dept.beds, 0)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Users className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Current Patients</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.reduce((sum, dept) => sum + dept.patients, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Departments;
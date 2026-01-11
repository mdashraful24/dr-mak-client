import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, User, Phone, Mail, Calendar } from 'lucide-react';

const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Mock patient data
    const patients = [
        {
            id: 1,
            name: 'John Doe',
            age: 35,
            gender: 'Male',
            phone: '+1 (555) 123-4567',
            email: 'john.doe@email.com',
            lastVisit: '2024-01-15',
            condition: 'Hypertension',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 28,
            gender: 'Female',
            phone: '+1 (555) 234-5678',
            email: 'jane.smith@email.com',
            lastVisit: '2024-01-10',
            condition: 'Diabetes',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            age: 42,
            gender: 'Male',
            phone: '+1 (555) 345-6789',
            email: 'mike.johnson@email.com',
            lastVisit: '2024-01-08',
            condition: 'Back Pain',
            status: 'Inactive'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            age: 31,
            gender: 'Female',
            phone: '+1 (555) 456-7890',
            email: 'sarah.wilson@email.com',
            lastVisit: '2024-01-12',
            condition: 'Migraine',
            status: 'Active'
        }
    ];

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Patients Management</h1>
                <p className="text-gray-600">Manage patient records and information</p>
            </div>

            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search patients by name, email, or condition..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] border-none focus:ring-0 focus:shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                    />
                </div>
                <button className="px-4 py-2 bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 flex items-center gap-2 text-blue-600 font-medium">
                    <Plus size={20} />
                    Add Patient
                </button>
            </div>

            {/* Patients Table */}
            <div className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#e0e5ec]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#e0e5ec] divide-y divide-gray-300">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-[#e0e5ec] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-[#e0e5ec] rounded-xl shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                                <User className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                                <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{patient.phone}</div>
                                        <div className="text-sm text-gray-500">{patient.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{patient.condition}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {patient.lastVisit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button className="text-blue-600 hover:text-blue-900 p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                                <Eye size={16} />
                                            </button>
                                            <button className="text-yellow-600 hover:text-yellow-900 p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                                <Edit size={16} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Patients</p>
                            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Calendar className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Patients</p>
                            <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.status === 'Active').length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Phone className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">New This Month</p>
                            <p className="text-2xl font-bold text-gray-900">2</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Mail className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                            <p className="text-2xl font-bold text-gray-900">1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patients;
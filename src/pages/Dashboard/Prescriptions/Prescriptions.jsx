import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Pill, User, Calendar, Clock } from 'lucide-react';

const Prescriptions = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock prescriptions data
    const prescriptions = [
        {
            id: 1,
            patientName: 'John Doe',
            medication: 'Ibuprofen 400mg',
            dosage: '400mg every 6 hours',
            duration: '7 days',
            prescribedBy: 'Dr. Sarah Chen',
            prescribedDate: '2024-01-15',
            status: 'Active'
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            medication: 'Metformin 500mg',
            dosage: '500mg twice daily',
            duration: '30 days',
            prescribedBy: 'Dr. Michael Rodriguez',
            prescribedDate: '2024-01-10',
            status: 'Active'
        },
        {
            id: 3,
            patientName: 'Mike Johnson',
            medication: 'Oxycodone 5mg',
            dosage: '5mg every 4-6 hours as needed',
            duration: '5 days',
            prescribedBy: 'Dr. Emily Johnson',
            prescribedDate: '2024-01-08',
            status: 'Completed'
        },
        {
            id: 4,
            patientName: 'Sarah Wilson',
            medication: 'Sumatriptan 100mg',
            dosage: '100mg at onset of migraine',
            duration: 'As needed',
            prescribedBy: 'Dr. David Kim',
            prescribedDate: '2024-01-12',
            status: 'Active'
        }
    ];

    const filteredPrescriptions = prescriptions.filter(prescription =>
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'Expired': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Prescriptions Management</h1>
                <p className="text-gray-600">Manage patient prescriptions and medications</p>
            </div>

            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search prescriptions by patient, medication, or doctor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={20} />
                    Add Prescription
                </button>
            </div>

            {/* Prescriptions Table */}
            <div className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribed By</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#e0e5ec] divide-y divide-gray-300">
                            {filteredPrescriptions.map((prescription) => (
                                <tr key={prescription.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{prescription.patientName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Pill className="w-4 h-4 text-green-600 mr-2" />
                                            <span className="text-sm font-medium text-gray-900">{prescription.medication}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {prescription.dosage}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {prescription.duration}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {prescription.prescribedBy}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {prescription.prescribedDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                                            {prescription.status}
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
                        <Pill className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Prescriptions</p>
                            <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Clock className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
                            <p className="text-2xl font-bold text-gray-900">{prescriptions.filter(p => p.status === 'Active').length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Calendar className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Unique Patients</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prescriptions;
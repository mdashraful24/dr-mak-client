import { useState } from 'react';
import { Search, Plus, Edit, Eye, FileText, User, Calendar, Download } from 'lucide-react';

const MedicalRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock medical records data
    const records = [
        {
            id: 1,
            patientName: 'John Doe',
            recordType: 'Consultation',
            date: '2024-01-15',
            doctor: 'Dr. Sarah Chen',
            diagnosis: 'Hypertension',
            notes: 'Patient reports occasional headaches. Blood pressure monitored.',
            attachments: 2
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            recordType: 'Lab Results',
            date: '2024-01-10',
            doctor: 'Dr. Michael Rodriguez',
            diagnosis: 'Diabetes Type 2',
            notes: 'Blood glucose levels elevated. Starting metformin treatment.',
            attachments: 1
        },
        {
            id: 3,
            patientName: 'Mike Johnson',
            recordType: 'Surgery Report',
            date: '2024-01-08',
            doctor: 'Dr. Emily Johnson',
            diagnosis: 'Herniated Disc',
            notes: 'Successful microdiscectomy performed. Patient recovering well.',
            attachments: 3
        },
        {
            id: 4,
            patientName: 'Sarah Wilson',
            recordType: 'Follow-up',
            date: '2024-01-12',
            doctor: 'Dr. David Kim',
            diagnosis: 'Migraine',
            notes: 'Migraine frequency reduced with new medication regimen.',
            attachments: 1
        }
    ];

    const filteredRecords = records.filter(record =>
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRecordTypeColor = (type) => {
        switch (type) {
            case 'Consultation': return 'bg-blue-100 text-blue-800';
            case 'Lab Results': return 'bg-green-100 text-green-800';
            case 'Surgery Report': return 'bg-red-100 text-red-800';
            case 'Follow-up': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Medical Records</h1>
                <p className="text-gray-600">Access and manage patient medical records</p>
            </div>

            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search records by patient, diagnosis, or doctor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button className="px-4 py-2 bg-[#e0e5ec] text-blue-700 rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 flex items-center gap-2">
                    <Plus size={20} />
                    Add Record
                </button>
            </div>

            {/* Records Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecords.map((record) => (
                    <div key={record.id} className="bg-[#e0e5ec] rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] p-6 hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-semibold text-gray-900">{record.patientName}</h3>
                                    <p className="text-sm text-gray-600">{record.doctor}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRecordTypeColor(record.recordType)}`}>
                                {record.recordType}
                            </span>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                {record.date}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Diagnosis:</span>
                                <span className="ml-2 text-gray-600">{record.diagnosis}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Notes:</span>
                                <p className="mt-1 text-gray-600">{record.notes}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Download className="w-4 h-4 mr-2" />
                                {record.attachments} attachment{record.attachments !== 1 ? 's' : ''}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 text-sm bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 text-blue-700">
                                    <Eye size={14} />
                                    View
                                </button>
                                <button className="px-3 py-1 text-sm bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 text-green-700">
                                    <Download size={14} />
                                    Download
                                </button>
                            </div>
                            <button className="p-2 text-yellow-600 hover:bg-[#e0e5ec] rounded-xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                                <Edit size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Records</p>
                            <p className="text-2xl font-bold text-gray-900">{records.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <User className="w-8 h-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Unique Patients</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Calendar className="w-8 h-8 text-purple-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]">
                    <div className="flex items-center">
                        <Download className="w-8 h-8 text-orange-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Attachments</p>
                            <p className="text-2xl font-bold text-gray-900">{records.reduce((sum, record) => sum + record.attachments, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecords;
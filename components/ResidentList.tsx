import React, { useState } from 'react';
import { Resident, Gender, MaritalStatus, UserRole } from '../types';
import { Search, Plus, Trash2, Edit2, MapPin, Phone, FileSpreadsheet, IdCard, User as UserIcon } from 'lucide-react';
import { exportToExcel, formatResidentsForExport } from '../services/exportService';

interface ResidentListProps {
  residents: Resident[];
  onDelete: (id: string) => void;
  onAdd: () => void;
  onEdit: (resident: Resident) => void;
  onViewCard: (resident: Resident) => void;
  userRole: UserRole;
}

export const ResidentList: React.FC<ResidentListProps> = ({ residents, onDelete, onAdd, onEdit, onViewCard, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = residents.filter(r => 
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.nik.includes(searchTerm) ||
    r.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const dataToExport = formatResidentsForExport(filteredResidents); // Export filtered results
    const dateStr = new Date().toISOString().split('T')[0];
    exportToExcel(dataToExport, `Data_Warga_RT_${dateStr}`, 'Warga');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Data Warga</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari nama, NIK, alamat..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </button>
          <button 
            onClick={onAdd}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama & NIK</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Info Kontak</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pekerjaan</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredResidents.length > 0 ? (
              filteredResidents.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {resident.photo ? (
                        <img src={resident.photo} alt={resident.fullName} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <UserIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{resident.fullName}</span>
                        <span className="text-xs text-gray-500 font-mono">{resident.nik}</span>
                        <span className="text-xs text-gray-400">{resident.gender} • {resident.birthDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{resident.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{resident.phoneNumber}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resident.maritalStatus === MaritalStatus.MARRIED 
                        ? 'bg-green-100 text-green-700' 
                        : resident.maritalStatus === MaritalStatus.SINGLE 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {resident.maritalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {resident.occupation}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onViewCard(resident)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Kartu Anggota"
                      >
                        <IdCard className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit(resident)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {userRole === 'ADMIN' && (
                        <button 
                          onClick={() => onDelete(resident.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Tidak ada data warga yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
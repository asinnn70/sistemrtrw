import React, { useState, useEffect } from 'react';
import { Resident, Gender, MaritalStatus } from '../types';
import { X, Upload, User as UserIcon, Trash2 } from 'lucide-react';

interface ResidentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Resident, 'id'>) => void;
  initialData?: Resident;
}

export const ResidentForm: React.FC<ResidentFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    nik: '',
    fullName: '',
    gender: Gender.MALE,
    birthDate: '',
    address: '',
    occupation: '',
    maritalStatus: MaritalStatus.SINGLE,
    phoneNumber: '',
    photo: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nik: initialData.nik,
        fullName: initialData.fullName,
        gender: initialData.gender,
        birthDate: initialData.birthDate,
        address: initialData.address,
        occupation: initialData.occupation,
        maritalStatus: initialData.maritalStatus,
        phoneNumber: initialData.phoneNumber,
        photo: initialData.photo || ''
      });
    } else {
      setFormData({
        nik: '',
        fullName: '',
        gender: Gender.MALE,
        birthDate: '',
        address: '',
        occupation: '',
        maritalStatus: MaritalStatus.SINGLE,
        phoneNumber: '',
        photo: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit 2MB
        alert('Ukuran foto maksimal 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Data Warga' : 'Tambah Warga Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center mb-6">
             <div className="relative group">
                <div className="w-32 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <UserIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500">Upload Foto</span>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-2 right-2 flex gap-2">
                   {formData.photo && (
                     <button
                       type="button"
                       onClick={removePhoto}
                       className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm"
                       title="Hapus Foto"
                     >
                       <Trash2 className="w-3 h-3" />
                     </button>
                   )}
                   <label className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoChange}
                      />
                   </label>
                </div>
             </div>
             <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG (Max 2MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
              <input
                required
                type="text"
                pattern="\d{16}"
                title="NIK harus 16 digit angka"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.nik}
                onChange={e => setFormData({...formData, nik: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value as Gender})}
              >
                {Object.values(Gender).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
              <input
                required
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.birthDate}
                onChange={e => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea
                required
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.occupation}
                onChange={e => setFormData({...formData, occupation: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Perkawinan</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.maritalStatus}
                onChange={e => setFormData({...formData, maritalStatus: e.target.value as MaritalStatus})}
              >
                {Object.values(MaritalStatus).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.phoneNumber}
                onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
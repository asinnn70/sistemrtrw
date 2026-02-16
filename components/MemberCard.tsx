import React, { useRef } from 'react';
import { Resident, Gender } from '../types';
import { X, Printer, MapPin, Building2, User } from 'lucide-react';

interface MemberCardProps {
  isOpen: boolean;
  onClose: () => void;
  resident: Resident | undefined;
}

export const MemberCard: React.FC<MemberCardProps> = ({ isOpen, onClose, resident }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !resident) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 backdrop-blur-sm print:p-0 print:bg-white print:static print:block">
      {/* Container for Screen (Modal) */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col print:shadow-none print:w-full print:max-w-none">
        
        {/* Modal Header - Hidden on Print */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between print:hidden">
          <h2 className="text-lg font-bold text-gray-800">Kartu Anggota Warga</h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak Kartu
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Card Preview Area */}
        <div className="p-8 bg-gray-50 flex justify-center print:p-0 print:bg-white">
          {/* THE CARD */}
          <div 
            ref={cardRef}
            className="printable-card w-[500px] h-[315px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative flex flex-col print:shadow-none print:border-2 print:border-gray-800 print:rounded-none"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 100%)' 
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full" style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0, #3b82f6 1px, transparent 0, transparent 50%)',
                backgroundSize: '10px 10px'
              }}></div>
            </div>

            {/* Header */}
            <div className="h-16 bg-gradient-to-r from-blue-700 to-blue-500 flex items-center px-6 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-sm font-bold tracking-wider uppercase opacity-90">KARTU TANDA WARGA</h1>
                <p className="text-xs font-medium opacity-75">RT 05 / RW 03 KELURAHAN MENTENG</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex gap-6 relative z-10">
              {/* Photo Area */}
              <div className="w-24 flex flex-col gap-2">
                <div className="w-24 h-32 bg-gray-200 border-2 border-white shadow-sm rounded-lg overflow-hidden flex items-center justify-center relative">
                   {resident.photo ? (
                    <img src={resident.photo} alt="Foto Warga" className="w-full h-full object-cover" />
                   ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <User className="w-8 h-8 mb-1" />
                      <span className="text-[10px]">Foto 3x4</span>
                    </div>
                   )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-1.5">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">Nama Lengkap</label>
                  <p className="text-sm font-bold text-gray-800 uppercase leading-tight">{resident.fullName}</p>
                </div>
                
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">Nomor Induk Kependudukan</label>
                  <p className="text-sm font-mono font-bold text-blue-700 leading-tight">{resident.nik}</p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">Jenis Kelamin</label>
                    <p className="text-xs font-medium text-gray-800">{resident.gender}</p>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">Status</label>
                    <p className="text-xs font-medium text-gray-800">{resident.maritalStatus}</p>
                  </div>
                </div>

                <div>
                   <label className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">Alamat</label>
                   <div className="flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                      <p className="text-xs font-medium text-gray-800 leading-tight">{resident.address}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="h-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between px-6 relative z-10">
              <p className="text-[10px] text-gray-400 italic">Kartu ini berlaku selama menjadi warga RT 05/03</p>
              <div className="text-right">
                <p className="text-[8px] text-gray-500">Mengetahui,</p>
                <p className="text-[10px] font-bold text-gray-700">KETUA RT 05</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 print:hidden">
          Tekan tombol cetak di atas untuk menyimpan sebagai PDF atau mencetak langsung.
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-card, .printable-card * {
            visibility: visible;
          }
          .printable-card {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          /* Hide the modal overlay background */
          .fixed {
            position: static;
            background: white;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};
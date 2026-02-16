import React, { useState } from 'react';
import { FileText, Users, Building, HeartHandshake, UserPlus, FileCheck, ClipboardList, Printer, Search, X, ChevronRight } from 'lucide-react';
import { Resident } from '../types';

interface ServicesMenuProps {
  residents: Resident[];
  onAddResident: () => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ residents, onAddResident }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Service Configuration
  const categories = [
    {
      title: "Surat Pengantar",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      items: [
        { id: "ktp_kk", label: "Pengantar KTP / KK" },
        { id: "domisili", label: "Surat Domisili" },
        { id: "skck", label: "Pengantar SKCK" },
        { id: "nikah", label: "Pengantar Nikah" },
        { id: "pindah", label: "Pengantar Pindah Masuk/Keluar" },
      ]
    },
    {
      title: "Pendataan Warga",
      icon: Users,
      color: "bg-green-100 text-green-600",
      items: [
        { id: "new_resident", label: "Data Penduduk Baru", action: "FORM" },
        { id: "birth_death", label: "Data Kelahiran & Kematian" },
        { id: "vote", label: "Pendataan Pemilih (Pemilu)" },
      ]
    },
    {
      title: "Legalitas Lingkungan",
      icon: Building,
      color: "bg-purple-100 text-purple-600",
      items: [
        { id: "umkm", label: "Surat Keterangan Usaha (UMKM)" },
        { id: "sktm", label: "Surat Tidak Mampu (Bansos)" },
      ]
    }
  ];

  const handleServiceClick = (item: any) => {
    if (item.action === "FORM" && item.id === "new_resident") {
      onAddResident();
      return;
    }
    
    setSelectedService(item.label);
    setSelectedResident(null);
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const filteredResidents = residents.filter(r => 
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.nik.includes(searchQuery)
  );

  const getLetterContent = (resident: Resident, serviceName: string) => {
    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    
    let specificContent = "";

    switch (serviceName) {
      case "Surat Domisili":
        specificContent = `Menerangkan bahwa orang tersebut di atas adalah benar-benar warga kami yang berdomisili di lingkungan RT 05 RW 03 Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat.`;
        break;
      case "Pengantar SKCK":
        specificContent = `Menerangkan bahwa orang tersebut adalah warga kami yang berkelakuan baik dan tidak pernah terlibat tindak pidana di lingkungan kami. Surat ini diberikan sebagai pengantar untuk pengurusan Surat Keterangan Catatan Kepolisian (SKCK).`;
        break;
      case "Surat Keterangan Usaha (UMKM)":
        specificContent = `Menerangkan bahwa yang bersangkutan benar memiliki usaha di lingkungan RT 05 RW 03. Surat ini diberikan untuk keperluan administrasi UMKM.`;
        break;
      case "Surat Tidak Mampu (Bansos)":
        specificContent = `Menerangkan bahwa yang bersangkutan tergolong keluarga kurang mampu (Pra-Sejahtera) di lingkungan kami. Surat ini dibuat untuk keperluan pengajuan Bantuan Sosial / Keringanan Biaya Pendidikan.`;
        break;
      default:
        specificContent = `Menerangkan bahwa orang tersebut adalah benar warga RT 05 RW 03 Kelurahan Menteng. Surat ini diberikan untuk keperluan: ${serviceName}.`;
    }

    return (
      <div className="space-y-6 text-justify">
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-lg font-bold uppercase">RUKUN TETANGGA 05 RUKUN WARGA 03</h1>
          <h2 className="text-md font-bold uppercase">KELURAHAN MENTENG KECAMATAN MENTENG</h2>
          <p className="text-sm">Sekretariat: Jl. Merpati No. 1, Jakarta Pusat</p>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-bold underline uppercase">SURAT PENGANTAR</h3>
          <p>Nomor: ... / RT.05 / ... / 2024</p>
        </div>

        <p>Yang bertanda tangan di bawah ini Ketua RT 05 RW 03 Kelurahan Menteng, Kecamatan Menteng, menerangkan bahwa:</p>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-40 py-1">Nama Lengkap</td>
              <td>: <strong>{resident.fullName}</strong></td>
            </tr>
            <tr>
              <td className="w-40 py-1">NIK</td>
              <td>: {resident.nik}</td>
            </tr>
            <tr>
              <td className="w-40 py-1">Tempat/Tgl Lahir</td>
              <td>: {resident.birthDate}</td>
            </tr>
            <tr>
              <td className="w-40 py-1">Jenis Kelamin</td>
              <td>: {resident.gender}</td>
            </tr>
            <tr>
              <td className="w-40 py-1">Pekerjaan</td>
              <td>: {resident.occupation}</td>
            </tr>
            <tr>
              <td className="w-40 py-1">Agama</td>
              <td>: Islam</td>
            </tr>
            <tr>
              <td className="w-40 py-1 align-top">Alamat</td>
              <td>: {resident.address}</td>
            </tr>
          </tbody>
        </table>

        <p>{specificContent}</p>

        <p>Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>

        <div className="flex justify-end mt-12 pt-8">
          <div className="text-center w-48">
            <p>Jakarta, {today}</p>
            <p className="mb-20">Ketua RT 05</p>
            <p className="font-bold underline">Budi Santoso</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Layanan Warga</h2>
        <p className="text-gray-500">Pilih layanan surat menyurat atau pendataan administratif.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`p-4 flex items-center gap-3 border-b border-gray-100 ${cat.color} bg-opacity-20`}>
                <div className={`p-2 rounded-lg ${cat.color.replace('text', 'bg').replace('100', '200')}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-800">{cat.title}</h3>
              </div>
              <div className="p-2">
                {cat.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => handleServiceClick(item)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Generator Surat */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 backdrop-blur-sm print:p-0 print:bg-white print:static print:block">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden print:shadow-none print:w-full print:h-auto print:max-w-none">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 print:hidden">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Buat {selectedService}</h3>
                <p className="text-xs text-gray-500">Pilih warga untuk membuat surat otomatis.</p>
              </div>
              <div className="flex gap-2">
                {selectedResident && (
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <Printer className="w-4 h-4" /> Cetak
                  </button>
                )}
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden print:block">
              {/* Sidebar Selection (Hidden on Print) */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col bg-white print:hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Cari Nama Warga / NIK..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredResidents.length > 0 ? (
                    filteredResidents.map(r => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedResident(r)}
                        className={`w-full text-left p-4 border-b border-gray-50 hover:bg-blue-50 transition-colors ${selectedResident?.id === r.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                      >
                        <p className="font-bold text-gray-800 text-sm">{r.fullName}</p>
                        <p className="text-xs text-gray-500 font-mono">{r.nik}</p>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-400 text-sm">
                      Warga tidak ditemukan
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 bg-gray-100 overflow-y-auto p-8 print:p-0 print:bg-white print:overflow-visible">
                {selectedResident ? (
                  <div className="bg-white shadow-lg p-12 min-h-[800px] w-full max-w-[210mm] mx-auto print:shadow-none print:p-0">
                    {getLetterContent(selectedResident, selectedService || '')}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 print:hidden">
                    <FileCheck className="w-16 h-16 mb-4 opacity-20" />
                    <p>Pilih warga dari daftar di sebelah kiri</p>
                    <p>untuk melihat pratinjau surat.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .fixed, .fixed * {
            visibility: visible;
          }
          .fixed {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: white;
            padding: 0;
            z-index: 9999;
          }
          /* Hide scrollbars and UI elements */
          ::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
import { Resident, Gender, MaritalStatus, Transaction, User } from './types';

export const GEMINI_MODEL_ID = 'gemini-3-flash-preview';

export const SYSTEM_INSTRUCTION = 'Anda adalah asisten virtual untuk sistem manajemen kependudukan RT. Jawab pertanyaan berdasarkan data warga yang diberikan dalam format JSON. Bersikaplah profesional, membantu, dan gunakan Bahasa Indonesia yang baik.';

export const MOCK_USERS: User[] = [
  {
    username: 'admin',
    name: 'Pak RT',
    role: 'ADMIN'
  },
  {
    username: 'staff',
    name: 'Sekretaris',
    role: 'STAFF'
  }
];

export const INITIAL_RESIDENTS: Resident[] = [
  {
    id: '1',
    nik: '3171012001900001',
    fullName: 'Budi Santoso',
    gender: Gender.MALE,
    birthDate: '1980-05-15',
    address: 'Jl. Merpati No. 4',
    occupation: 'Wiraswasta',
    maritalStatus: MaritalStatus.MARRIED,
    phoneNumber: '081234567890'
  },
  {
    id: '2',
    nik: '3171015505920002',
    fullName: 'Siti Aminah',
    gender: Gender.FEMALE,
    birthDate: '1982-12-20',
    address: 'Jl. Merpati No. 4',
    occupation: 'Ibu Rumah Tangga',
    maritalStatus: MaritalStatus.MARRIED,
    phoneNumber: '081298765432'
  },
  {
    id: '3',
    nik: '3171011001100003',
    fullName: 'Andi Pratama',
    gender: Gender.MALE,
    birthDate: '2010-01-10',
    address: 'Jl. Merpati No. 4',
    occupation: 'Pelajar',
    maritalStatus: MaritalStatus.SINGLE,
    phoneNumber: '-'
  },
  {
    id: '4',
    nik: '3201012003850004',
    fullName: 'Rina Kartika',
    gender: Gender.FEMALE,
    birthDate: '1995-03-25',
    address: 'Jl. Kutilang No. 10',
    occupation: 'Guru',
    maritalStatus: MaritalStatus.SINGLE,
    phoneNumber: '085678901234'
  },
  {
    id: '5',
    nik: '3201011508750005',
    fullName: 'Joko Widodo (Bukan Presiden)',
    gender: Gender.MALE,
    birthDate: '1975-08-17',
    address: 'Jl. Elang No. 8',
    occupation: 'PNS',
    maritalStatus: MaritalStatus.DIVORCED,
    phoneNumber: '081345678901'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2023-10-01',
    description: 'Saldo Awal Bulan',
    amount: 5000000,
    type: 'INCOME',
    category: 'Saldo Awal'
  },
  {
    id: '2',
    date: '2023-10-05',
    description: 'Iuran Kebersihan & Keamanan (Bpk. Budi)',
    amount: 100000,
    type: 'INCOME',
    category: 'Iuran Warga'
  },
  {
    id: '3',
    date: '2023-10-10',
    description: 'Perbaikan Lampu Jalan Merpati',
    amount: 350000,
    type: 'EXPENSE',
    category: 'Perbaikan Fasilitas'
  },
  {
    id: '4',
    date: '2023-10-15',
    description: 'Konsumsi Rapat Bulanan',
    amount: 150000,
    type: 'EXPENSE',
    category: 'Operasional'
  }
];
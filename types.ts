export enum Gender {
  MALE = 'Laki-laki',
  FEMALE = 'Perempuan'
}

export enum MaritalStatus {
  SINGLE = 'Belum Kawin',
  MARRIED = 'Kawin',
  DIVORCED = 'Cerai'
}

export interface Resident {
  id: string;
  nik: string;
  fullName: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  address: string;
  occupation: string;
  maritalStatus: MaritalStatus;
  phoneNumber: string;
  photo?: string; // Base64 image string
}

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string; // e.g., 'Iuran Warga', 'Perbaikan', 'Lain-lain'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface DashboardStats {
  totalResidents: number;
  totalMale: number;
  totalFemale: number;
  totalFamilies: number;
}

export type ViewState = 'DASHBOARD' | 'RESIDENTS' | 'FINANCE' | 'SETTINGS';

export type UserRole = 'ADMIN' | 'STAFF';

export interface User {
  username: string;
  name: string;
  role: UserRole;
}
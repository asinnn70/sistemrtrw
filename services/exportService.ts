import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[], fileName: string, sheetName: string = 'Sheet1') => {
  // 1. Create a new Workbook
  const wb = XLSX.utils.book_new();

  // 2. Convert JSON data to Worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // 3. Append Worksheet to Workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // 4. Generate and download Excel file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const formatResidentsForExport = (residents: any[]) => {
  return residents.map(r => ({
    'NIK': r.nik,
    'Nama Lengkap': r.fullName,
    'Jenis Kelamin': r.gender,
    'Tanggal Lahir': r.birthDate,
    'Alamat': r.address,
    'Pekerjaan': r.occupation,
    'Status Perkawinan': r.maritalStatus,
    'No. Telepon': r.phoneNumber
  }));
};

export const formatTransactionsForExport = (transactions: any[]) => {
  return transactions.map(t => ({
    'Tanggal': t.date,
    'Keterangan': t.description,
    'Kategori': t.category,
    'Jenis': t.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran',
    'Jumlah (Rp)': t.amount
  }));
};
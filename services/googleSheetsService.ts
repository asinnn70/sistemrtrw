import { Resident } from '../types';

export const syncResidentsToSheets = async (scriptUrl: string, residents: Resident[]) => {
  try {
    // Format data to simple JSON structure for the sheet
    const payload = {
      timestamp: new Date().toISOString(),
      data: residents.map(r => ({
        nik: r.nik,
        nama: r.fullName,
        jenis_kelamin: r.gender,
        tgl_lahir: r.birthDate,
        alamat: r.address,
        pekerjaan: r.occupation,
        status: r.maritalStatus,
        no_hp: r.phoneNumber
      }))
    };

    // Google Apps Script usually requires 'no-cors' for simple POST requests from client-side
    // However, to get a response, the script must handle CORS headers correctly.
    // We will try standard POST first.
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Use text/plain to avoid preflight OPTIONS check issues in some GAS setups
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Sync Error:", error);
    throw error;
  }
};
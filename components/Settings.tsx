import React, { useState, useEffect } from 'react';
import { Save, Link, HelpCircle } from 'lucide-react';

interface SettingsProps {
  onSave: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [scriptUrl, setScriptUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem('googleSheetScriptUrl');
    if (savedUrl) {
      setScriptUrl(savedUrl);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('googleSheetScriptUrl', scriptUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Link className="w-5 h-5 text-blue-600" />
          Integrasi Google Sheets
        </h2>
        
        <p className="text-gray-600 mb-6">
          Fitur ini memungkinkan Anda melakukan sinkronisasi satu arah (Upload) data warga dari aplikasi ini ke Google Spreadsheet Anda.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Apps Script Web App URL
            </label>
            <input
              type="url"
              value={scriptUrl}
              onChange={(e) => setScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Masukkan URL hasil deployment Web App dari Google Apps Script.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaved ? 'Tersimpan!' : 'Simpan Konfigurasi'}
          </button>
        </form>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
        <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4" />
          Panduan Singkat
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Buat Google Sheet baru di Google Drive Anda.</li>
          <li>Pergi ke <strong>Extensions</strong> &gt; <strong>Apps Script</strong>.</li>
          <li>Paste kode script untuk menangani <code>doPost(e)</code>.</li>
          <li>Klik <strong>Deploy</strong> &gt; <strong>New Deployment</strong>.</li>
          <li>Pilih type: <strong>Web App</strong>.</li>
          <li>Set "Who has access" menjadi <strong>Anyone</strong>.</li>
          <li>Copy URL yang diberikan dan paste di form di atas.</li>
        </ol>
      </div>
    </div>
  );
};
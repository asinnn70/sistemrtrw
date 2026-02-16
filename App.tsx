import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ResidentList } from './components/ResidentList';
import { ResidentForm } from './components/ResidentForm';
import { FinanceDashboard } from './components/FinanceDashboard';
import { TransactionForm } from './components/TransactionForm';
import { Login } from './components/Login';
import { INITIAL_RESIDENTS, INITIAL_TRANSACTIONS } from './constants';
import { Resident, ViewState, Transaction, User } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  
  // Residents State
  const [residents, setResidents] = useState<Resident[]>(INITIAL_RESIDENTS);
  const [editingResident, setEditingResident] = useState<Resident | undefined>(undefined);
  const [isResidentFormOpen, setIsResidentFormOpen] = useState(false);

  // Transactions State
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auth Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('DASHBOARD');
  };

  // Resident Handlers
  const handleDeleteResident = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data warga ini?')) {
      setResidents(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleAddResident = () => {
    setEditingResident(undefined);
    setIsResidentFormOpen(true);
  };

  const handleEditResident = (resident: Resident) => {
    setEditingResident(resident);
    setIsResidentFormOpen(true);
  };

  const handleResidentFormSubmit = (data: Omit<Resident, 'id'>) => {
    if (editingResident) {
      setResidents(prev => prev.map(r => 
        r.id === editingResident.id ? { ...data, id: r.id } : r
      ));
    } else {
      const newId = (Math.max(...residents.map(r => parseInt(r.id)), 0) + 1).toString();
      setResidents(prev => [...prev, { ...data, id: newId }]);
    }
  };

  // Transaction Handlers
  const handleAddTransaction = () => {
    setIsTransactionFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Hapus transaksi ini?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleTransactionFormSubmit = (data: Omit<Transaction, 'id'>) => {
    const newId = (Math.max(...transactions.map(t => parseInt(t.id)), 0) + 1).toString();
    setTransactions(prev => [...prev, { ...data, id: newId }]);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Render Login if not authenticated
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => {
          setCurrentView(view);
          setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">Sistem RT/RW</h1>
          <button onClick={toggleSidebar} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === 'DASHBOARD' && (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Dashboard Utama</h2>
                  <p className="text-gray-500">Ringkasan data kependudukan terkini.</p>
                </div>
                <Dashboard residents={residents} />
              </div>
            )}
            
            {currentView === 'RESIDENTS' && (
              <div className="animate-fade-in">
                <ResidentList 
                  residents={residents} 
                  onDelete={handleDeleteResident}
                  onAdd={handleAddResident}
                  onEdit={handleEditResident}
                  userRole={currentUser.role}
                />
              </div>
            )}

            {currentView === 'FINANCE' && currentUser.role === 'ADMIN' && (
              <div className="animate-fade-in">
                 <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Kas RT/RW</h2>
                  <p className="text-gray-500">Kelola pemasukan dan pengeluaran kas lingkungan.</p>
                </div>
                <FinanceDashboard 
                  transactions={transactions}
                  onAddTransaction={handleAddTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <ResidentForm 
        isOpen={isResidentFormOpen}
        onClose={() => setIsResidentFormOpen(false)}
        onSubmit={handleResidentFormSubmit}
        initialData={editingResident}
      />

      <TransactionForm
        isOpen={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleTransactionFormSubmit}
      />
    </div>
  );
};

export default App;
import React from 'react';
import { ViewState, User } from '../types';
import { LayoutDashboard, Users, Building2, Wallet, LogOut, UserCircle, Settings, FileText } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  user: User;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, user, onLogout }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'STAFF'] },
    { id: 'RESIDENTS', label: 'Data Warga', icon: Users, roles: ['ADMIN', 'STAFF'] },
    { id: 'SERVICES', label: 'Layanan Surat', icon: FileText, roles: ['ADMIN', 'STAFF'] },
    { id: 'FINANCE', label: 'Kas RT/RW', icon: Wallet, roles: ['ADMIN'] }, // Only Admin
    { id: 'SETTINGS', label: 'Pengaturan', icon: Settings, roles: ['ADMIN'] }, // Only Admin
  ];

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out flex flex-col ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Building2 className="w-8 h-8 text-blue-600 mr-2" />
        <h1 className="text-xl font-bold text-gray-800">Sistem RT/RW</h1>
      </div>
      
      <div className="p-4 space-y-1 flex-1">
        {menuItems
          .filter(item => item.roles.includes(user.role))
          .map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
             <UserCircle className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{user.role.toLowerCase()}</p>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};
import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Users, Building2, Wallet } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'RESIDENTS', label: 'Data Warga', icon: Users },
    { id: 'FINANCE', label: 'Kas RT/RW', icon: Wallet },
  ];

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Building2 className="w-8 h-8 text-blue-600 mr-2" />
        <h1 className="text-xl font-bold text-gray-800">Sistem RT/RW</h1>
      </div>
      
      <div className="p-4 space-y-1">
        {menuItems.map((item) => {
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
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-blue-600 font-semibold mb-1">RT 05 / RW 03</p>
          <p className="text-xs text-gray-500">Kel. Menteng, Jakarta Pusat</p>
        </div>
      </div>
    </div>
  );
};
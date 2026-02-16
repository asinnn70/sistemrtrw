import React, { useMemo } from 'react';
import { Resident, Gender } from '../types';
import { StatsCard } from './StatsCard';
import { Users, User, Baby, Briefcase } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

interface DashboardProps {
  residents: Resident[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard: React.FC<DashboardProps> = ({ residents }) => {
  
  const stats = useMemo(() => {
    const total = residents.length;
    const males = residents.filter(r => r.gender === Gender.MALE).length;
    const females = residents.filter(r => r.gender === Gender.FEMALE).length;
    
    // Simple logic: Unique addresses roughly equals families for this demo
    const families = new Set(residents.map(r => r.address)).size;

    return { total, males, females, families };
  }, [residents]);

  const ageData = useMemo(() => {
    const now = new Date();
    const groups = { '0-17': 0, '18-40': 0, '41-60': 0, '>60': 0 };
    
    residents.forEach(r => {
      const birth = new Date(r.birthDate);
      const age = now.getFullYear() - birth.getFullYear();
      if (age <= 17) groups['0-17']++;
      else if (age <= 40) groups['18-40']++;
      else if (age <= 60) groups['41-60']++;
      else groups['>60']++;
    });

    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [residents]);

  const genderData = [
    { name: 'Laki-laki', value: stats.males },
    { name: 'Perempuan', value: stats.females },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Warga" 
          value={stats.total} 
          icon={Users} 
          colorClass="bg-blue-500 text-blue-500" 
        />
        <StatsCard 
          title="Kepala Keluarga (Est)" 
          value={stats.families} 
          icon={Briefcase} 
          colorClass="bg-indigo-500 text-indigo-500" 
        />
        <StatsCard 
          title="Laki-laki" 
          value={stats.males} 
          icon={User} 
          colorClass="bg-green-500 text-green-500" 
        />
        <StatsCard 
          title="Perempuan" 
          value={stats.females} 
          icon={Baby} 
          colorClass="bg-pink-500 text-pink-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Usia</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Gender</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
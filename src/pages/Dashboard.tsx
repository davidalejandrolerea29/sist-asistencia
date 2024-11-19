import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, BarChart2, Users, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Asistencia Hoy', value: '95%', icon: ClipboardCheck },
    { label: 'Total Estudiantes', value: '150', icon: Users },
    { label: 'Días Lectivos', value: '180', icon: Calendar },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p className="mt-2 text-gray-600">Bienvenido al sistema de control de asistencia</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/asistencia"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <ClipboardCheck className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Tomar Asistencia</h3>
              <p className="text-gray-600">Registra la asistencia diaria de los estudiantes</p>
            </div>
          </div>
        </Link>

        <Link
          to="/reportes"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Ver Reportes</h3>
              <p className="text-gray-600">Consulta y genera informes de asistencia</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
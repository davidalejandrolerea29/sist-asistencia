import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ClipboardCheck, BarChart2, LogOut, Users } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Sistema de Asistencia
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/asistencia" 
              className="flex items-center space-x-2 hover:text-indigo-200 transition"
            >
              <ClipboardCheck size={20} />
              <span>Asistencia</span>
            </Link>
            
            <Link 
              to="/reportes" 
              className="flex items-center space-x-2 hover:text-indigo-200 transition"
            >
              <BarChart2 size={20} />
              <span>Reportes</span>
            </Link>

            <Link 
              to="/gestion" 
              className="flex items-center space-x-2 hover:text-indigo-200 transition"
            >
              <Users size={20} />
              <span>Gestión</span>
            </Link>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 hover:text-indigo-200 transition"
            >
              <LogOut size={20} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
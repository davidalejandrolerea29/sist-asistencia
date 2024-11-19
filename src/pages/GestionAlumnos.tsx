import React, { useState, useRef } from 'react';
import { Upload, UserPlus, Users, FileSpreadsheet } from 'lucide-react';
import Papa from 'papaparse';
import type { Student, Course } from '../types';

interface PreceptorAssignment {
  preceptorId: string;
  name: string;
  courses: string[];
}

const mockPreceptors: PreceptorAssignment[] = [
  { preceptorId: 'P1', name: 'María López', courses: ['1A'] },
];

const mockCourses: Course[] = [
  { id: '1A', name: '1er Año', preceptorId: 'P1', year: '1', division: 'A' },
  { id: '1B', name: '1er Año', preceptorId: '', year: '1', division: 'B' },
];

const GestionAlumnos = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    dni: '',
    parentPhone: '',
  });
  const [newPreceptor, setNewPreceptor] = useState({
    name: '',
    email: '',
    selectedCourses: [] as string[],
  });

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          console.log('Parsed CSV:', results.data);
          // Here you would process and validate the CSV data
          // Format expected: Nombre,DNI,Teléfono,Curso
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding student:', { ...newStudent, courseId: selectedCourse });
    setNewStudent({ name: '', dni: '', parentPhone: '' });
    setShowAddForm(false);
  };

  const handleAddPreceptor = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding preceptor:', newPreceptor);
    setNewPreceptor({ name: '', email: '', selectedCourses: [] });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Alumnos y Preceptores</h1>
        <p className="mt-2 text-gray-600">Administra la información de alumnos y asignaciones</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Management Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" />
            Gestión de Alumnos
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center space-x-2"
            >
              <UserPlus size={20} />
              <span>Agregar Alumno Manualmente</span>
            </button>

            <div className="relative">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <FileSpreadsheet size={20} />
                <span>Importar desde CSV</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleCSVUpload}
                accept=".csv"
                className="hidden"
              />
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddStudent} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Curso</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seleccionar Curso</option>
                  {mockCourses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name} - División {course.division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">DNI</label>
                <input
                  type="text"
                  value={newStudent.dni}
                  onChange={(e) => setNewStudent({ ...newStudent, dni: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono del Tutor</label>
                <input
                  type="tel"
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Preceptor Management Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Asignación de Preceptores</h2>

          <form onSubmit={handleAddPreceptor} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Preceptor</label>
              <input
                type="text"
                value={newPreceptor.name}
                onChange={(e) => setNewPreceptor({ ...newPreceptor, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                value={newPreceptor.email}
                onChange={(e) => setNewPreceptor({ ...newPreceptor, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cursos Asignados</label>
              <div className="mt-2 space-y-2">
                {mockCourses.map(course => (
                  <label key={course.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={course.id}
                      checked={newPreceptor.selectedCourses.includes(course.id)}
                      onChange={(e) => {
                        const courses = e.target.checked
                          ? [...newPreceptor.selectedCourses, course.id]
                          : newPreceptor.selectedCourses.filter(id => id !== course.id);
                        setNewPreceptor({ ...newPreceptor, selectedCourses: courses });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{course.name} - División {course.division}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Asignar Preceptor
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Preceptores Actuales</h3>
            <div className="space-y-4">
              {mockPreceptors.map(preceptor => (
                <div key={preceptor.preceptorId} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{preceptor.name}</p>
                  <p className="text-sm text-gray-600">
                    Cursos: {preceptor.courses.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionAlumnos;
import React, { useState } from 'react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarChart2, Download, Send, Users } from 'lucide-react';
import type { Course, Student, AttendanceRecord } from '../types';

// Mock data - replace with Firebase data
const mockCourses: Course[] = [
  { id: '1A', name: '1er Año', preceptorId: 'P1', year: '1', division: 'A' },
];

const mockStudents: Student[] = [
  { id: '1', name: 'Ana García', courseId: '1A', dni: '12345678', parentPhone: '+5491123456789' },
];

const Reportes = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>(mockCourses[0].id);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedMonth] = useState(new Date());

  const handleGenerateCoursePDF = () => {
    // Implement PDF generation for course report
    console.log('Generating course PDF report...');
  };

  const handleSendStudentReport = () => {
    // Implement WhatsApp sending logic
    console.log('Sending student report via WhatsApp...');
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes de Asistencia</h1>
          <p className="mt-2 text-gray-600">
            {format(selectedMonth, "MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Report Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="mr-2" />
              Reporte por Curso
            </h2>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name} - División {course.division}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Media de Asistencia</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>

            <button
              onClick={handleGenerateCoursePDF}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center space-x-2"
            >
              <Download size={20} />
              <span>Descargar Reporte del Curso</span>
            </button>
          </div>
        </div>

        {/* Individual Student Report Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart2 className="mr-2" />
              Reporte Individual
            </h2>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccionar Estudiante</option>
              {mockStudents
                .filter(student => student.courseId === selectedCourse)
                .map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Inasistencias Totales</p>
                  <p className="text-2xl font-bold text-gray-900">2.5</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Tardanzas</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>

              <button
                onClick={handleSendStudentReport}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Enviar Reporte por WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;
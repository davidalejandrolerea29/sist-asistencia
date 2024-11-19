import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, X, Clock, PersonStanding, Save } from 'lucide-react';
import type { Student, Course, AttendanceRecord } from '../types';

// Mock data - replace with Firebase data
const mockStudents: Student[] = [
  { id: '1', name: 'Ana García', courseId: '1A', dni: '12345678', parentPhone: '+5491123456789' },
  { id: '2', name: 'Carlos López', courseId: '1A', dni: '23456789', parentPhone: '+5491123456790' },
];

const mockCourses: Course[] = [
  { id: '1A', name: '1er Año', preceptorId: 'P1', year: '1', division: 'A' },
];

const Asistencia = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>(mockCourses[0].id);
  const [selectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>({});

  const calculateAttendanceValue = (record: AttendanceRecord['status']): number => {
    let value = 0;
    if (!record.classPresent) value += 1;
    if (!record.pePresent) value += 0.5;
    if (record.isLate) value += 0.25;
    return value;
  };

  const handleAttendanceChange = (studentId: string, type: keyof AttendanceRecord['status']) => {
    setAttendance(prev => {
      const current = prev[studentId] || {
        id: `${studentId}-${format(selectedDate, 'yyyy-MM-dd')}`,
        studentId,
        date: format(selectedDate, 'yyyy-MM-dd'),
        status: {
          classPresent: true,
          pePresent: true,
          isLate: false
        },
        totalValue: 0
      };

      const newStatus = {
        ...current.status,
        [type]: !current.status[type]
      };

      return {
        ...prev,
        [studentId]: {
          ...current,
          status: newStatus,
          totalValue: calculateAttendanceValue(newStatus)
        }
      };
    });
  };

  const handleSaveAttendance = async () => {
    // Here you would save to Firebase
    console.log('Saving attendance:', Object.values(attendance));
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Asistencia</h1>
          <p className="mt-2 text-gray-600">
            {format(selectedDate, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div className="flex space-x-4">
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
          <button
            onClick={handleSaveAttendance}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Guardar Asistencia</span>
          </button>
        </div>
      </header>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estudiante
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clase
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ed. Física
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tardanza
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockStudents
              .filter(student => student.courseId === selectedCourse)
              .map((student) => {
                const record = attendance[student.id]?.status || {
                  classPresent: true,
                  pePresent: true,
                  isLate: false
                };
                const totalValue = attendance[student.id]?.totalValue || 0;

                return (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">DNI: {student.dni}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'classPresent')}
                        className={`inline-flex items-center p-2 rounded-full ${
                          record.classPresent
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {record.classPresent ? <Check size={20} /> : <X size={20} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'pePresent')}
                        className={`inline-flex items-center p-2 rounded-full ${
                          record.pePresent
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        <PersonStanding size={20} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'isLate')}
                        className={`inline-flex items-center p-2 rounded-full ${
                          record.isLate
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Clock size={20} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        totalValue === 0
                          ? 'bg-green-100 text-green-800'
                          : totalValue <= 0.5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {totalValue}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Asistencia;
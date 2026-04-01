"use client";

import { motion } from "framer-motion";
import { Users, Search, Plus, Filter, Download } from "lucide-react";
import { useState } from "react";

export default function TeacherClassesPage() {
  const [selectedClass, setSelectedClass] = useState<string>("10А");

  const classes = [
    { id: "10А", name: "10\"А\"", students: 25, avgGpa: 4.2, attendance: 94 },
    { id: "10Б", name: "10\"Б\"", students: 23, avgGpa: 3.9, attendance: 91 },
    { id: "9А", name: "9\"А\"", students: 27, avgGpa: 4.0, attendance: 96 },
    { id: "11А", name: "11\"А\"", students: 21, avgGpa: 4.5, attendance: 98 },
  ];

  const students = [
    { id: 1, name: "Алишер Иманалиев", gpa: 4.8, attendance: 98, status: "good" },
    { id: 2, name: "Темуров Али", gpa: 3.2, attendance: 85, status: "risk" },
    { id: 3, name: "Ким Дмитрий", gpa: 3.5, attendance: 90, status: "warning" },
    { id: 4, name: "Иванова Мария", gpa: 4.5, attendance: 100, status: "good" },
    { id: 5, name: "Петров Сергей", gpa: 4.0, attendance: 95, status: "good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-700";
      case "warning": return "bg-yellow-100 text-yellow-700";
      case "risk": return "bg-red-100 text-red-700";
      default: return "bg-neutral-100 text-neutral-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "good": return "Отлично";
      case "warning": return "Внимание";
      case "risk": return "Риск";
      default: return "Норма";
    }
  };

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Мои классы
          </h1>
          <p className="text-neutral-600 mt-1">
            Управление классами и учениками
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Фильтр</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Добавить</span>
          </button>
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedClass === cls.id
                ? "bg-secondary-500 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            {cls.name} • {cls.students} уч.
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {classes.filter(c => c.id === selectedClass).map((cls) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-neutral-200 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-secondary-600" />
              <span className="text-sm text-neutral-600">Учеников</span>
            </div>
            <p className="text-3xl font-bold font-headline text-neutral-900">{cls.students}</p>
          </motion.div>
        ))}
        {classes.filter(c => c.id === selectedClass).map((cls) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-neutral-200 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-secondary-600" />
              <span className="text-sm text-neutral-600">Средний балл</span>
            </div>
            <p className="text-3xl font-bold font-headline text-neutral-900">{cls.avgGpa}</p>
          </motion.div>
        ))}
        {classes.filter(c => c.id === selectedClass).map((cls) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-neutral-200 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-secondary-600" />
              <span className="text-sm text-neutral-600">Посещаемость</span>
            </div>
            <p className="text-3xl font-bold font-headline text-neutral-900">{cls.attendance}%</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Поиск ученика..."
              className="bg-transparent border-none outline-none text-sm w-64"
            />
          </div>
          <button className="text-sm font-medium text-secondary-600 hover:text-secondary-700 flex items-center gap-1">
            <Download className="w-4 h-4" />
            Экспорт
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Ученик</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Средний балл</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Посещаемость</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Статус</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-neutral-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-neutral-900">{student.gpa}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-neutral-600">{student.attendance}%</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(student.status)}`}>
                      {getStatusLabel(student.status)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
                      Подробнее →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
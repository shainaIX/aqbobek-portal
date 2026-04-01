"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Mail, Phone, Edit2, BookOpen, Award } from "lucide-react";

export default function TeacherProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Профиль
          </h1>
          <p className="text-neutral-600 mt-1">
            Управление личной информацией
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
          <Edit2 className="w-4 h-4" />
          Редактировать
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >

        <div className="h-32 bg-gradient-to-r from-secondary-400 to-secondary-600" />

        <div className="px-6 pb-6">
          <div className="flex items-end -mt-12 mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.avatar || "ИП"}
            </div>
            <div className="ml-4 mb-2">
              <h2 className="text-xl font-bold font-headline text-neutral-900">
                {user?.name}
              </h2>
              <p className="text-sm text-neutral-500">Учитель математики</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <Mail className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Email</p>
                <p className="text-sm font-medium text-neutral-900">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <Phone className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Телефон</p>
                <p className="text-sm font-medium text-neutral-900">+7 (777) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Предметы</p>
                <p className="text-sm font-medium text-neutral-900">Алгебра, Геометрия</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <Award className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Стаж</p>
                <p className="text-sm font-medium text-neutral-900">12 лет</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Мои классы
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {["10\"А\"", "10\"Б\"", "9\"А\"", "11\"А\""].map((cls, index) => (
            <motion.div
              key={cls}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              className="p-4 bg-neutral-50 rounded-lg text-center hover:bg-secondary-50 transition-colors cursor-pointer"
            >
              <p className="text-lg font-bold text-neutral-900">{cls}</p>
              <p className="text-sm text-neutral-500 mt-1">Классный руководитель</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
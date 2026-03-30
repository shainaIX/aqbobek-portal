"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Edit2, Bell, Shield } from "lucide-react";

export default function ParentProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <button className="flex items-center gap-2 px-4 py-2 bg-tertiary-500 text-white rounded-lg hover:bg-tertiary-600 transition-colors">
          <Edit2 className="w-4 h-4" />
          Редактировать
        </button>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-tertiary-400 to-tertiary-600" />
        
        {/* Avatar & Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-12 mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-2xl border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.avatar || "P"}
            </div>
            <div className="ml-4 mb-2">
              <h2 className="text-xl font-bold font-headline text-neutral-900">
                {user?.name}
              </h2>
              <p className="text-sm text-neutral-500">Родитель</p>
            </div>
          </div>

          {/* Info Grid */}
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
              <MapPin className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Адрес</p>
                <p className="text-sm font-medium text-neutral-900">г. Алматы, ул. Абая 150</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <User className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Дети</p>
                <p className="text-sm font-medium text-neutral-900">2 ребенка</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Настройки
          </h3>
        </div>
        <div className="divide-y divide-neutral-100">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="font-medium text-neutral-900">Уведомления</p>
                <p className="text-sm text-neutral-500">Получать уведомления об оценках и пропусках</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tertiary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="font-medium text-neutral-900">Безопасность</p>
                <p className="text-sm text-neutral-500">Изменить пароль и настройки безопасности</p>
              </div>
            </div>
            <button className="text-sm font-medium text-tertiary-600 hover:text-tertiary-700">
              Изменить →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
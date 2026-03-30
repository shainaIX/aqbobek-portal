"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Save,
  Globe,
  Clock
} from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Настройки системы
        </h1>
        <p className="text-neutral-600 mt-1">
          Конфигурация портала Aqbobek Lyceum
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 space-y-1">
              {[
                { icon: Settings, label: "Общие", active: true },
                { icon: Bell, label: "Уведомления", active: false },
                { icon: Shield, label: "Безопасность", active: false },
                { icon: Database, label: "Данные", active: false },
                { icon: Palette, label: "Внешний вид", active: false },
                { icon: Globe, label: "Язык", active: false },
                { icon: Clock, label: "Время", active: false },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.active
                        ? "bg-purple-50 text-purple-700"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* General Settings */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200">
              <h3 className="font-headline text-lg font-semibold text-neutral-900">
                Общие настройки
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Название школы
                </label>
                <input
                  type="text"
                  defaultValue="Aqbobek Lyceum"
                  className="w-full px-4 py-2.5 bg-neutral-50 rounded-lg border-2 border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email администрации
                </label>
                <input
                  type="email"
                  defaultValue="admin@aqbobek.kz"
                  className="w-full px-4 py-2.5 bg-neutral-50 rounded-lg border-2 border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Часовой пояс
                </label>
                <select className="w-full px-4 py-2.5 bg-neutral-50 rounded-lg border-2 border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-sm">
                  <option>Asia/Almaty (UTC+6)</option>
                  <option>Asia/Aqtobe (UTC+5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200">
              <h3 className="font-headline text-lg font-semibold text-neutral-900">
                Статус системы
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-900">Сервер работает</span>
                </div>
                <span className="text-xs text-green-700">99.9% uptime</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-900">База данных</span>
                </div>
                <span className="text-xs text-neutral-600">2.4 GB использовано</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-900">Активных пользователей</span>
                </div>
                <span className="text-xs text-neutral-600">342 онлайн</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3">
            <button className="px-6 py-2.5 bg-white border border-neutral-200 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors">
              Отмена
            </button>
            <button className="px-6 py-2.5 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Сохранить изменения
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
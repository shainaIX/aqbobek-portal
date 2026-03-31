"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "@/components/dashboard/shared/NotificationBell";

export default function Header() {
  const { user, logout } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-neutral-700" />
                ) : (
                  <Menu className="w-5 h-5 text-neutral-700" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                <span className="hidden sm:block font-headline text-xl font-bold text-neutral-900">
                  Aqbobek Lyceum
                </span>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <motion.div
                animate={{ width: isSearchFocused ? 400 : 320 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Поиск уроков, оценок..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent 
                           focus:border-primary-500 focus:bg-white focus:outline-none transition-all text-sm"
                />
              </motion.div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg">
                <Search className="w-5 h-5 text-neutral-700" />
              </button>

              <NotificationBell />

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {user?.avatar || "U"}
                  </div>
                  <ChevronDown className="w-4 h-4 text-neutral-600 hidden sm:block" />
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden"
                    >
                      <div className="p-4 border-b border-neutral-200">
                        <p className="font-headline text-sm font-semibold text-neutral-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                          <User className="w-4 h-4" />
                          Профиль
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                          Настройки
                        </button>
                        <hr className="my-2 border-neutral-200" />
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Выйти
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-neutral-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all text-sm"
                />
                <nav className="space-y-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                  >
                    Дашборд
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                  >
                    Расписание
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                  >
                    Оценки
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                  >
                    Профиль
                  </a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
}

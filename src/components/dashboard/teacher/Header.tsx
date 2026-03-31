"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Search,
    Bell,
    Menu,
    X,
    User,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TeacherHeader() {
    const { user, logout } = useAuth();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const notifications = [
        {
            id: 1,
            type: "risk",
            message: "⚠️ Ученик Иванов А. — падение успеваемости",
            time: "10 мин назад",
        },
        {
            id: 2,
            type: "report",
            message: "✅ Отчёт для 10\"А\" сгенерирован",
            time: "1 час назад",
        },
        {
            id: 3,
            type: "schedule",
            message: "📅 Замена урока: Физика → 14:00",
            time: "2 часа назад",
        },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo + Mobile Menu */}
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
                                    className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg"
                                >
                                    <Zap className="w-5 h-5 text-white" />
                                </motion.div>
                                <span className="hidden sm:block font-headline text-xl font-bold text-neutral-900">
                  Aqbobek Lyceum
                </span>
                            </div>
                        </div>

                        {/* Center: Search (Desktop) */}
                        <div className="hidden lg:flex flex-1 max-w-md mx-8">
                            <motion.div
                                animate={{ width: isSearchFocused ? 400 : 320 }}
                                className="relative"
                            >
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Поиск учеников, классов..."
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
                                />
                            </motion.div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Mobile Search */}
                            <button className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg">
                                <Search className="w-5 h-5 text-neutral-700" />
                            </button>

                            {/* Notifications */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <Bell className="w-5 h-5 text-neutral-700" />
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {notifications.length}
                  </span>
                                </motion.button>

                                {/* Notifications Dropdown */}
                                <AnimatePresence>
                                    {isNotificationsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-neutral-200">
                                                <h3 className="font-headline text-sm font-semibold text-neutral-900">
                                                    Уведомления
                                                </h3>
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className="p-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-0 cursor-pointer"
                                                    >
                                                        <p className="text-sm text-neutral-800">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-neutral-500 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 bg-neutral-50 text-center">
                                                <button className="text-xs font-medium text-secondary-600 hover:text-secondary-700">
                                                    Показать все
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                                        {user?.avatar || "ИП"}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-neutral-600 hidden sm:block" />
                                </motion.button>

                                {/* Profile Dropdown */}
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

                {/* Mobile Menu */}
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
                                    className="w-full px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
                                />
                                <nav className="space-y-2">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                                    >
                                        📊 Дашборд
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                                    >
                                        ⚠️ Риски
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                                    >
                                        📚 Классы
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                                    >
                                        📝 Отчёты
                                    </a>
                                </nav>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Click outside to close dropdowns */}
            {(isNotificationsOpen || isProfileOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsNotificationsOpen(false);
                        setIsProfileOpen(false);
                    }}
                />
            )}
        </>
    );
}
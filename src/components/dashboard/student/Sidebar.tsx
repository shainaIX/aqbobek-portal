"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Award,
  User,
  Settings,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
  MessageSquare,

} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      label: "Дашборд",
      href: "/student",
    },
    {
      icon: Calendar,
      label: "Расписание",
      href: "/student/schedule",
      badge: 2,
    },
    {
      icon: Zap,
      label: "AI-рекомендации",
      href: "/student/ai",
      badge: 2,
    },

    {
      icon: BookOpen,
      label: "Оценки",
      href: "/student/grades",
    },
    {
      icon: Award,
      label: "Достижения",
      href: "/student/achievements",
      badge: 3,
    },
    {
      icon: MessageSquare,
      label: "Сообщения",
      href: "/student/messages",
      badge: 3,
    },
    {
      icon: User,
      label: "Профиль",
      href: "/student/profile",
    },
  ];

  return (
    <>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-neutral-200 z-40 ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300`}
      >

        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-headline text-sm font-bold text-neutral-900">
                Aqbobek
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                    : "text-neutral-700 hover:bg-neutral-100"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-neutral-600"
                }`} />

                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-neutral-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && ` (${item.badge})`}
                  </div>
                )}
              </motion.a>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.avatar || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                Настройки
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </div>
        )}
      </motion.aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50 safe-area-pb">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-3 relative ${
                  isActive ? "text-primary-600" : "text-neutral-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
                {item.badge && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Monitor,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      label: "Обзор",
      href: "/admin",
    },
    {
      icon: Calendar,
      label: "Расписание",
      href: "/admin/schedule",
      badge: 2,
    },
    {
      icon: Users,
      label: "Пользователи",
      href: "/admin/users",
    },
    {
      icon: Monitor,
      label: "Kiosk",
      href: "/admin/kiosk",
    },
    {
      icon: MessageSquare,
      label: "Сообщения",
      href: "/admin/messages",
      badge: 8,
    },
    {
      icon: Bell,
      label: "Уведомления",
      href: "/admin/notifications",
      badge: 5,
    },
    {
      icon: BarChart3,
      label: "Аналитика",
      href: "/admin/analytics",
    },
  ];

  return (
    <>
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-neutral-200 bg-white lg:flex ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300`}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-700">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-headline text-sm font-bold text-neutral-900">
                Aqbobek
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-neutral-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-neutral-600" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
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
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md"
                    : "text-neutral-700 hover:bg-neutral-100"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-neutral-600"
                  }`}
                />

                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge ? (
                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">
                        {item.badge}
                      </span>
                    ) : null}
                  </>
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="px-3 pb-3">
          <a
            href="/admin/kiosk"
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-all ${
              isCollapsed
                ? "justify-center border-amber-200 bg-amber-50 text-amber-700"
                : "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 hover:from-amber-100 hover:to-orange-100"
            }`}
          >
            <Monitor className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold">Запустить kiosk</p>
                <p className="text-xs text-amber-700">Экран для холла и ресепшена</p>
              </div>
            )}
          </a>
        </div>

        {!isCollapsed && (
          <div className="border-t border-neutral-200 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 font-bold text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-900">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-neutral-500">Администратор</p>
              </div>
            </div>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100">
                <Settings className="h-4 w-4" />
                Настройки
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </button>
            </div>
          </div>
        )}
      </motion.aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white safe-area-pb lg:hidden">
        <div className="grid grid-cols-5">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-3 ${
                  isActive ? "text-purple-600" : "text-neutral-500"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-1 text-[10px] font-medium">{item.label}</span>
                {item.badge ? (
                  <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}

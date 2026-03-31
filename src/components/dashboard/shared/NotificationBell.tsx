"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import type { Notification } from "@/types/messaging";

function formatRelativeTime(value: string) {
  const timestamp = new Date(value).getTime();

  if (Number.isNaN(timestamp)) {
    return "Только что";
  }

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "Только что";
  if (diffMinutes < 60) return `${diffMinutes} мин назад`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} ч назад`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} дн назад`;
}

function getNotificationText(notification: Notification) {
  if (notification.body?.trim()) {
    return notification.body;
  }

  return notification.title;
}

export default function NotificationBell() {
  const { notifications, unreadCount, isLoading, markAllRead, markOneRead } =
    useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const hasNotifications = notifications.length > 0;

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        aria-label="Открыть уведомления"
      >
        <Bell className="w-5 h-5 text-neutral-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-primary-500 text-white text-[10px] rounded-full flex items-center justify-center font-semibold shadow-sm">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden z-50"
          >
            <div className="flex items-center justify-between gap-3 p-4 border-b border-neutral-200">
              <div>
                <h3 className="font-headline text-sm font-semibold text-neutral-900">
                  Уведомления
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {unreadCount > 0
                    ? `${unreadCount} непрочитанных`
                    : "Все уведомления прочитаны"}
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={() => void markAllRead()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Прочитать все
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {isLoading && (
                <div className="p-4 text-sm text-neutral-500">
                  Загрузка уведомлений...
                </div>
              )}

              {!isLoading && !hasNotifications && (
                <div className="p-4 text-sm text-neutral-500">
                  Новых уведомлений нет.
                </div>
              )}

              {!isLoading &&
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => void markOneRead(notification.id)}
                    className="w-full text-left p-4 hover:bg-neutral-50 border-b border-neutral-100 last:border-0 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                          notification.is_read
                            ? "bg-neutral-300"
                            : "bg-primary-500"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-neutral-600 mt-1">
                          {getNotificationText(notification)}
                        </p>
                        <p className="text-xs text-neutral-500 mt-2">
                          {formatRelativeTime(notification.created_at)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

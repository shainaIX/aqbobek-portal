"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Loader2,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Shield,
  Users,
  User,
  X,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/context/AuthContext";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { useUserSearch } from "@/hooks/useUserSearch";
import type { Conversation, SearchUser } from "@/types/messaging";

type Accent = "primary" | "secondary";

interface CategoryConfig {
  id: string;
  label: string;
  roles?: UserRole[];
}

interface RoleConfig {
  label: string;
  icon: LucideIcon;
  color: string;
}

interface MessagingWorkspaceProps {
  title: string;
  subtitle: string;
  accent: Accent;
  categories: CategoryConfig[];
  roleConfig: Partial<Record<UserRole, RoleConfig>>;
  composeRoles: UserRole[];
  composeTitle: string;
  composeDescription: string;
}

const accentTheme = {
  primary: {
    accentBg: "bg-primary-500",
    accentHover: "hover:bg-primary-600",
    accentTint: "bg-primary-50",
    accentBorder: "border-primary-500",
    accentText: "text-primary-600",
    focusBorder: "focus:border-primary-500",
    bubbleText: "text-primary-100",
  },
  secondary: {
    accentBg: "bg-secondary-500",
    accentHover: "hover:bg-secondary-600",
    accentTint: "bg-secondary-50",
    accentBorder: "border-secondary-500",
    accentText: "text-secondary-600",
    focusBorder: "focus:border-secondary-500",
    bubbleText: "text-secondary-100",
  },
} as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatRelativeTime(iso: string) {
  if (!iso) return "";

  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.round(diffMs / 1000 / 60);
  const diffHours = diffMs / 1000 / 60 / 60;

  if (diffMinutes < 1) return "только что";
  if (diffMinutes < 60) return `${diffMinutes} мин назад`;
  if (diffHours < 24) return `${Math.round(diffHours)} ч назад`;
  if (diffHours < 48) return "вчера";

  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}

function formatMessageTime(iso: string) {
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Avatar({
  name,
  image,
  color,
  size = "md",
}: {
  name: string;
  image: string | null | undefined;
  color: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "w-10 h-10 text-sm" : "w-12 h-12 text-sm";

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size === "sm" ? 40 : 48}
        height={size === "sm" ? 40 : 48}
        className={`${sizeClass} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

function ComposeModal({
  isOpen,
  onClose,
  title,
  description,
  roles,
  onSelectUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  roles: UserRole[];
  onSelectUser: (user: SearchUser) => Promise<void>;
}) {
  const { query, setQuery, results, isLoading, error } = useUserSearch(roles, isOpen);
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSubmittingId(null);
    }
  }, [isOpen, setQuery]);

  if (!isOpen) {
    return null;
  }

  const roleLabel = (role: UserRole) => {
    switch (role) {
      case "teacher":
        return "Учитель";
      case "student":
        return "Ученик";
      case "parent":
        return "Родитель";
      case "admin":
        return "Администратор";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
        >
          <div className="p-5 border-b border-neutral-200 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-headline text-neutral-900">{title}</h2>
              <p className="text-sm text-neutral-600 mt-1">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          <div className="p-5 border-b border-neutral-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Введите имя пользователя..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 rounded-xl border-2 border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {isLoading ? (
              <div className="py-16 flex justify-center">
                <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
              </div>
            ) : error ? (
              <div className="p-5 text-sm text-red-600">{error}</div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-sm text-neutral-500">
                Подходящие пользователи не найдены.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={async () => {
                      setSubmittingId(result.id);
                      try {
                        await onSelectUser(result);
                        onClose();
                      } catch {
                        // Error state is handled in the parent workspace.
                      } finally {
                        setSubmittingId(null);
                      }
                    }}
                    disabled={submittingId === result.id}
                    className="w-full px-5 py-4 text-left hover:bg-neutral-50 transition-colors disabled:opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={result.name}
                        image={result.avatar_url}
                        color="from-primary-400 to-primary-600"
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">{result.name}</p>
                        <p className="text-xs text-neutral-500">{roleLabel(result.role)}</p>
                      </div>
                      {submittingId === result.id ? (
                        <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                      ) : (
                        <span className="text-xs font-medium text-primary-600">Открыть чат</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ChatWindow({
  conversation,
  accent,
  roleConfig,
}: {
  conversation: Conversation;
  accent: Accent;
  roleConfig: Partial<Record<UserRole, RoleConfig>>;
}) {
  const { user } = useAuth();
  const theme = accentTheme[accent];
  const { messages, isLoading, hasMore, loadMore, sendMessage } = useMessages(conversation.id);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const partnerRole = conversation.partner_role;
  const partnerDisplay = roleConfig[partnerRole] ?? {
    label: "Пользователь",
    icon: User,
    color: "from-neutral-400 to-neutral-600",
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    void fetch(`/api/conversations/${conversation.id}/read`, { method: "POST" });
  }, [conversation.id]);

  const handleSend = async () => {
    const nextDraft = draft.trim();
    if (!nextDraft || isSending) return;

    setDraft("");
    setIsSending(true);

    try {
      await sendMessage(nextDraft);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            name={conversation.partner_name}
            image={conversation.partner_avatar}
            color={partnerDisplay.color}
            size="sm"
          />
          <div className="min-w-0">
            <p className="font-medium text-neutral-900 truncate">{conversation.partner_name}</p>
            <p className="text-xs text-neutral-500">{partnerDisplay.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Позвонить">
            <Phone className="w-4 h-4 text-neutral-600" />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Email">
            <Mail className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-neutral-50">
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700 bg-white border border-neutral-200 rounded-full transition-colors"
            >
              <ChevronUp className="w-3 h-3" />
              Загрузить ранее
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center py-8">
            <p className="text-sm text-neutral-400">Сообщений пока нет. Начните диалог первым.</p>
          </div>
        ) : (
          messages.map((message) => {
            const isPending = Boolean(message._pending);
            const isMine = isPending || message.sender_id === user?.id;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-xl ${
                    isMine
                      ? `${theme.accentBg} text-white`
                      : "bg-white text-neutral-900 border border-neutral-200"
                  } ${isPending ? "opacity-70" : ""}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-2 flex items-center gap-1 ${
                      isMine ? theme.bubbleText : "text-neutral-500"
                    }`}
                  >
                    {formatMessageTime(message.created_at)}
                    {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-neutral-200 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-neutral-500" />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void handleSend();
              }
            }}
            placeholder="Напишите сообщение..."
            disabled={isSending}
            className={`flex-1 px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent ${theme.focusBorder} focus:bg-white focus:outline-none transition-all text-sm disabled:opacity-50`}
          />
          <button
            onClick={() => void handleSend()}
            disabled={!draft.trim() || isSending}
            className={`p-2.5 ${theme.accentBg} ${theme.accentHover} text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-2">Enter отправляет сообщение, Shift+Enter переносит строку.</p>
      </div>
    </>
  );
}

export default function MessagingWorkspace({
  title,
  subtitle,
  accent,
  categories,
  roleConfig,
  composeRoles,
  composeTitle,
  composeDescription,
}: MessagingWorkspaceProps) {
  const theme = accentTheme[accent];
  const { conversations, isLoading, startConversation } = useConversations();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterId, setFilterId] = useState<string>(categories[0]?.id ?? "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composerError, setComposerError] = useState<string | null>(null);

  const effectiveSelectedId = selectedId ?? conversations[0]?.id ?? null;
  const selectedConversation =
    conversations.find((conversation) => conversation.id === effectiveSelectedId) ?? null;

  const conversationCounts = useMemo(() => {
    return Object.fromEntries(
      categories.map((category) => {
        if (!category.roles || category.roles.length === 0) {
          return [category.id, conversations.length];
        }

        const count = conversations.filter((conversation) =>
          category.roles?.includes(conversation.partner_role)
        ).length;
        return [category.id, count];
      })
    ) as Record<string, number>;
  }, [categories, conversations]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const category = categories.find((item) => item.id === filterId);
      const matchesCategory =
        !category?.roles || category.roles.length === 0
          ? true
          : category.roles.includes(conversation.partner_role);
      const matchesSearch = conversation.partner_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categories, conversations, filterId, searchQuery]);

  async function handleSelectUser(user: SearchUser) {
    setComposerError(null);
    try {
      const conversationId = await startConversation(user.id);
      setSelectedId(conversationId);
    } catch (error) {
      setComposerError(error instanceof Error ? error.message : "Не удалось открыть диалог");
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">{title}</h1>
          <p className="text-neutral-600 mt-1">{subtitle}</p>
        </div>
        <button
          onClick={() => {
            setComposerError(null);
            setIsComposeOpen(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 ${theme.accentBg} ${theme.accentHover} text-white rounded-lg transition-colors`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Новый чат</span>
        </button>
      </motion.div>

      {composerError && (
        <div className="px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-600">
          {composerError}
        </div>
      )}

      <div className="flex gap-2 border-b border-neutral-200 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilterId(category.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              filterId === category.id
                ? `${theme.accentBorder} ${theme.accentText}`
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {category.label}
            <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
              {conversationCounts[category.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          <div className="border-r border-neutral-200 lg:col-span-1">
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Поиск по диалогам..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className={`w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent ${theme.focusBorder} focus:bg-white focus:outline-none transition-all text-sm`}
                />
              </div>
            </div>

            <div className="divide-y divide-neutral-100 max-h-[530px] overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="py-12 text-center px-6">
                  <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500">Совпадающих диалогов пока нет.</p>
                </div>
              ) : (
                filteredConversations.map((conversation, index) => {
                  const partnerDisplay = roleConfig[conversation.partner_role] ?? {
                    label: "Пользователь",
                    icon: User,
                    color: "from-neutral-400 to-neutral-600",
                  };
                  const Icon = partnerDisplay.icon;

                  return (
                    <motion.button
                      key={conversation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 + 0.15 }}
                      onClick={() => setSelectedId(conversation.id)}
                      className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                        effectiveSelectedId === conversation.id ? theme.accentTint : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={conversation.partner_name}
                          image={conversation.partner_avatar}
                          color={partnerDisplay.color}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <p className="font-medium text-neutral-900 truncate">
                              {conversation.partner_name}
                            </p>
                            {conversation.unread_count > 0 && (
                              <span
                                className={`px-2 py-0.5 ${theme.accentBg} text-white text-xs font-bold rounded-full`}
                              >
                                {conversation.unread_count}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <Icon className="w-3 h-3 text-neutral-400" />
                            <p className="text-xs text-neutral-500">{partnerDisplay.label}</p>
                          </div>
                          {conversation.last_message ? (
                            <>
                              <p className="text-sm text-neutral-600 truncate">
                                {conversation.last_message.content}
                              </p>
                              <p className="text-xs text-neutral-400 mt-1">
                                {formatRelativeTime(conversation.last_message.created_at)}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-neutral-400">Диалог без сообщений</p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <AnimatePresence mode="wait">
              {selectedConversation ? (
                <motion.div
                  key={selectedConversation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col flex-1"
                >
                  <ChatWindow
                    conversation={selectedConversation}
                    accent={accent}
                    roleConfig={roleConfig}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex items-center justify-center text-neutral-400"
                >
                  <div className="text-center px-6">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Выберите диалог или создайте новый чат.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        title={composeTitle}
        description={composeDescription}
        roles={composeRoles}
        onSelectUser={handleSelectUser}
      />
    </div>
  );
}

export const teacherRoleConfig: Partial<Record<UserRole, RoleConfig>> = {
  parent: {
    label: "Родитель",
    icon: Users,
    color: "from-blue-400 to-blue-600",
  },
  student: {
    label: "Ученик",
    icon: GraduationCap,
    color: "from-green-400 to-green-600",
  },
  teacher: {
    label: "Коллега",
    icon: User,
    color: "from-purple-400 to-purple-600",
  },
  admin: {
    label: "Администратор",
    icon: Shield,
    color: "from-slate-500 to-slate-700",
  },
};

export const studentRoleConfig: Partial<Record<UserRole, RoleConfig>> = {
  teacher: {
    label: "Учитель",
    icon: BookOpen,
    color: "from-primary-400 to-primary-600",
  },
  student: {
    label: "Ученик",
    icon: GraduationCap,
    color: "from-tertiary-400 to-tertiary-600",
  },
  admin: {
    label: "Администратор",
    icon: Shield,
    color: "from-slate-500 to-slate-700",
  },
};

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useAuth, type UserRole } from "@/context/AuthContext";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  submit?: string;
}

const roles: { id: UserRole; label: string; color: string }[] = [
  { id: "student", label: "Ученик", color: "from-primary-400 to-primary-600" },
  { id: "parent", label: "Родитель", color: "from-tertiary-400 to-tertiary-600" },
];

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setErrors({ submit: "Заполните все поля" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Не удалось зарегистрироваться");
      }

      const user = await login(formData.email.trim(), formData.password);
      router.push(`/${user.role}`);
      router.refresh();
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "Не удалось зарегистрироваться",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-3">
        <label className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
          Роль
        </label>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              type="button"
              onClick={() => setSelectedRole(role.id)}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedRole === role.id
                  ? `border-transparent bg-gradient-to-br ${role.color} text-white shadow-md`
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  selectedRole === role.id ? "text-white" : "text-neutral-900"
                }`}
              >
                {role.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600"
          htmlFor="name"
        >
          Имя
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 transition-all outline-none"
            placeholder="Имя и фамилия"
            autoComplete="name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 transition-all outline-none"
            placeholder="user@aqbobek.kz"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 transition-all outline-none"
            placeholder="Не менее 6 символов"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-label flex items-start gap-2"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errors.submit}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.01 }}
        whileTap={{ scale: isLoading ? 1 : 0.99 }}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-label text-sm font-bold uppercase tracking-wider py-4 rounded-lg shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Регистрация...</span>
          </>
        ) : (
          <>
            <span>Создать аккаунт</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      <p className="text-sm text-neutral-500 text-center">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Войти
        </Link>
      </p>
    </form>
  );
}

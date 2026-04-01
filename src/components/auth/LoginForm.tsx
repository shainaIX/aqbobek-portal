"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setErrors({ submit: "Заполните все поля" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const user = await login(formData.email.trim(), formData.password);
      router.push(`/${user.role}`);
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ошибка авторизации";
      setErrors({ submit: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
            className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all outline-none ${
              errors.email
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-neutral-200 focus:border-primary-500"
            }`}
            id="email"
            name="email"
            placeholder="user@aqbobek.kz"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end px-1">
          <label
            className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600"
            htmlFor="password"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all outline-none ${
              errors.password
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-neutral-200 focus:border-primary-500"
            }`}
            id="password"
            name="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
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
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white
                   font-label text-sm font-bold uppercase tracking-wider py-4 rounded-lg
                   shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30
                   transition-all flex items-center justify-center gap-2 group
                   disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Вход...</span>
          </>
        ) : (
          <>
            <span>Войти в портал</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      <p className="text-sm text-neutral-500 text-center">
        Нет аккаунта?{" "}
        <Link href="/register" className="font-medium text-primary-600 hover:text-primary-700">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}

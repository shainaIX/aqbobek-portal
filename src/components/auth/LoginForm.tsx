"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";

interface FormData {
  studentId: string;
  password: string;
}

interface FormErrors {
  studentId?: string;
  password?: string;
  submit?: string;
  role?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({ studentId: "", password: "" });
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const roles: { id: UserRole; label: string; color: string }[] = [
    { id: 'student', label: 'Ученик', color: 'from-primary-400 to-primary-600' },
    { id: 'teacher', label: 'Учитель', color: 'from-secondary-400 to-secondary-600' },
    { id: 'parent', label: 'Родитель', color: 'from-tertiary-400 to-tertiary-600' },
    { id: 'admin', label: 'Админ', color: 'from-neutral-700 to-neutral-900' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.studentId.trim() || !formData.password) {
      setErrors({ submit: "Заполните все поля" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.studentId, formData.password, selectedRole);
      router.push(`/${selectedRole}`);
      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка авторизации';
      setErrors({ submit: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      
      {/* Role Selection */}
      <div className="space-y-3">
        <label className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
          Выберите роль
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
                  : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700'
              }`}
            >
              <span className={`text-sm font-medium ${
                selectedRole === role.id ? 'text-white' : 'text-neutral-900'
              }`}>
                {role.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Email / Student ID */}
      <div className="space-y-2">
        <label className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600" htmlFor="studentId">
          Email / Student ID
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all outline-none
              ${errors.studentId 
                ? 'border-red-300 bg-red-50 focus:border-red-500' 
                : 'border-neutral-200 focus:border-primary-500'
              }`}
            id="studentId"
            name="studentId"
            placeholder="id.username@lyceum.edu"
            type="text"
            value={formData.studentId}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-end px-1">
          <label className="block font-label text-xs font-bold uppercase tracking-wider text-neutral-600" htmlFor="password">
            Password
          </label>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all outline-none
              ${errors.password 
                ? 'border-red-300 bg-red-50 focus:border-red-500' 
                : 'border-neutral-200 focus:border-primary-500'
              }`}
            id="password"
            name="password"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Global error */}
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

      {/* Submit Button */}
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

      {/* Demo hint */}
      <div className="pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 text-center">
          💡 Демо: <span className="font-medium text-neutral-700">любой email / пароль (мин. 6 символов)</span>
        </p>
      </div>
    </form>
  );
}
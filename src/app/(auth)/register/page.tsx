"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(`/${user.role}`);
    }
  }, [isLoading, router, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-tertiary-50">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="font-headline text-xl font-bold text-neutral-900">
          Aqbobek Lyceum
        </span>
      </Link>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold font-headline text-neutral-900 mb-2">
              Регистрация
            </h1>
            <p className="text-neutral-600">
              Создайте аккаунт для доступа к образовательному порталу
            </p>
          </motion.div>

          <RegisterForm />
        </motion.div>
      </div>
    </div>
  );
}

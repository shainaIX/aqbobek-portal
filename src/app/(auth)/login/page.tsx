"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-tertiary-50">
      {/* Header Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="font-headline text-xl font-bold text-neutral-900">
          Aqbobek Lyceum
        </span>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold font-headline text-neutral-900 mb-2">
              Добро пожаловать
            </h1>
            <p className="text-neutral-600">
              Войдите в единый образовательный портал
            </p>
          </motion.div>

          {/* Login Form */}
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Zap,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Target,
  Calendar,
  ChevronDown,
  Play,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import { useAuth } from "@/context/AuthContext";

export default function WelcomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const cabinetPath = user ? `/${user.role}` : "/login";

  const features = [
    {
      icon: Zap,
      title: "AI-аналитика",
      description:
        "Персональные рекомендации для каждого ученика на основе успеваемости и динамики обучения.",
      color: "from-primary-400 to-primary-600",
    },
    {
      icon: BookOpen,
      title: "Цифровой портфель",
      description:
        "Все достижения, сертификаты и олимпиады собраны в одном месте.",
      color: "from-secondary-400 to-secondary-600",
    },
    {
      icon: Users,
      title: "Единая среда",
      description:
        "Ученики, учителя и родители работают в общей цифровой экосистеме.",
      color: "from-tertiary-400 to-tertiary-600",
    },
    {
      icon: Target,
      title: "Геймификация",
      description:
        "Ачивки, лидерборды и мотивационные механики для лучших результатов.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Calendar,
      title: "Умное расписание",
      description:
        "Автоматическое построение расписания без конфликтов и лишних окон.",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: TrendingUp,
      title: "Раннее предупреждение",
      description:
        "AI заранее замечает риски снижения успеваемости и помогает реагировать вовремя.",
      color: "from-orange-400 to-orange-600",
    },
  ];

  const stats = [
    { value: "1200+", label: "Учеников" },
    { value: "85", label: "Учителей" },
    { value: "98%", label: "Поступление в вузы" },
    { value: "15+", label: "Лет опыта" },
  ];

  const galleryImages = [
    { src: "/images/school-1.jpg", alt: "Школьный корпус", span: "col-span-2 row-span-2" },
    { src: "/images/school-2.jpg", alt: "Классная комната", span: "col-span-1 row-span-1" },
    { src: "/images/school-3.jpg", alt: "Лаборатория", span: "col-span-1 row-span-1" },
    { src: "/images/school-4.jpg", alt: "Спортзал", span: "col-span-1 row-span-1" },
    { src: "/images/school-5.jpg", alt: "Библиотека", span: "col-span-1 row-span-1" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <LandingHeader />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-tertiary-50" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-100/30 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-tertiary-100/30 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-neutral-200"
            >
              <Star className="w-4 h-4 text-secondary-500 fill-secondary-500" />
              <span className="text-sm font-medium text-neutral-700">
                Лучшая школа года 2025
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-neutral-900 leading-tight">
                Образование
                <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 bg-clip-text text-transparent">
                  нового поколения
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Интеллектуальная платформа с AI-аналитикой, персональным подходом
                и цифровой экосистемой для учеников, учителей и родителей.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(cabinetPath)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Личный кабинет
              </motion.button>
              {!user && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/register")}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 font-medium rounded-xl shadow-md hover:shadow-lg border border-neutral-200 transition-all flex items-center justify-center gap-2"
                >
                  Регистрация
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 font-medium rounded-xl shadow-md hover:shadow-lg border border-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Смотреть видео
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl sm:text-4xl font-bold font-headline text-primary-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-neutral-400"
          >
            <span className="text-xs font-medium">Листайте вниз</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-neutral-900 mb-4">
              Преимущества платформы
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Все необходимое для современного образования в одной системе.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold font-headline text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 sm:py-32 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="col-span-2 row-span-2 aspect-square bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white p-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium opacity-90">Фото школы</p>
                  <p className="text-sm opacity-75">800x800px</p>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center text-white p-4">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium opacity-90">Ученики</p>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center text-white p-4">
                  <Award className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium opacity-90">Достижения</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-neutral-900">
                О нашей школе
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Aqbobek Lyceum это современное образовательное учреждение, где
                традиции качественного образования сочетаются с инновационными
                технологиями обучения.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Мы используем передовые AI-технологии для персонализации обучения,
                отслеживания прогресса каждого ученика и создания оптимальных
                образовательных траекторий.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-lg">
                  <Check className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">Аккредитовано</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary-100 rounded-lg">
                  <Check className="w-5 h-5 text-secondary-700" />
                  <span className="text-sm font-medium text-secondary-700">Опытные учителя</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-tertiary-100 rounded-lg">
                  <Check className="w-5 h-5 text-tertiary-700" />
                  <span className="text-sm font-medium text-tertiary-700">Современное оборудование</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-neutral-900 mb-4">
              Галерея
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Жизнь нашей школы в фотографиях.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${image.span} relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center`}
              >
                <div className="text-center text-neutral-500 p-8">
                  <div className="w-16 h-16 bg-neutral-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-sm font-medium">{image.alt}</p>
                  <p className="text-xs opacity-75 mt-1">Загрузите фото</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="admissions"
        className="py-20 sm:py-32 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-white">
              Готовы начать обучение?
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Присоединяйтесь к нашей цифровой экосистеме уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(cabinetPath)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Личный кабинет
              </motion.button>
              {!user && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/register")}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Зарегистрироваться
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-medium rounded-xl border-2 border-white/30 hover:bg-primary-700 transition-all"
              >
                Связаться с нами
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 sm:py-32 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-neutral-900 mb-4">
              Контакты
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Адрес", value: "г. Алматы, ул. Абая 150" },
              { icon: Phone, title: "Телефон", value: "+7 (727) 123-45-67" },
              { icon: Mail, title: "Email", value: "info@aqbobek.kz" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-neutral-200 text-center hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold font-headline text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

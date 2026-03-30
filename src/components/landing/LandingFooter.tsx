"use client";
import { motion } from "framer-motion";
import { Zap, MapPin, Phone, Mail, Clock, Globe, Share2, Link } from "lucide-react";

export default function LandingFooter() {
    const currentYear = new Date().getFullYear();

    const contactInfo = [
        {
            icon: MapPin,
            label: "Адрес",
            value: "г. Алматы, ул. Абая 150",
        },
        {
            icon: Phone,
            label: "Телефон",
            value: "+7 (727) 123-45-67",
        },
        {
            icon: Mail,
            label: "Email",
            value: "info@aqbobek.kz",
        },
        {
            icon: Clock,
            label: "Режим работы",
            value: "Пн-Пт: 8:00 - 18:00",
        },
    ];

    const quickLinks = [
        { label: "О школе", href: "#about" },
        { label: "Преимущества", href: "#features" },
        { label: "Галерея", href: "#gallery" },
        { label: "Поступление", href: "#admissions" },
    ];

    const socialLinks = [
        { icon: Globe, href: "#", label: "Facebook" },
        { icon: Share2, href: "#", label: "Instagram" },
        { icon: Link, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="bg-neutral-900 text-white">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-headline text-xl font-bold">
                Aqbobek Lyceum
              </span>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Интеллектуальная образовательная платформа нового поколения
                            с AI-аналитикой и персональным подходом к каждому ученику.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-headline text-lg font-semibold mb-4">
                            Навигация
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-headline text-lg font-semibold mb-4">
                            Контакты
                        </h3>
                        <ul className="space-y-3">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <motion.li
                                        key={info.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <Icon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-neutral-500">{info.label}</p>
                                            <p className="text-sm text-neutral-300">{info.value}</p>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="font-headline text-lg font-semibold mb-4">
                            Подписаться на новости
                        </h3>
                        <p className="text-sm text-neutral-400 mb-4">
                            Получайте последние новости школы на email
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                            >
                                Подписаться
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-neutral-800"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-neutral-500">
                            © {currentYear} Aqbobek Lyceum. Все права защищены.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                                Политика конфиденциальности
                            </a>
                            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                                Условия использования
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingHeader() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "О школе", href: "#about" },
        { label: "Преимущества", href: "#features" },
        { label: "Галерея", href: "#gallery" },
        { label: "Контакты", href: "#contact" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-headline text-xl font-bold text-neutral-900">
                Aqbobek Lyceum
              </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <button
                                onClick={() => router.push("/login")}
                                className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                            >
                                Войти
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push("/login")}
                                className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                Личный кабинет
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 text-neutral-700" />
                            ) : (
                                <Menu className="w-5 h-5 text-neutral-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden border-t border-neutral-200 bg-white"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <hr className="border-neutral-200" />
                            <button
                                onClick={() => {
                                    router.push("/login");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg"
                            >
                                Личный кабинет
                            </button>
                        </div>
                    </motion.div>
                )}
            </header>
        </>
    );
}
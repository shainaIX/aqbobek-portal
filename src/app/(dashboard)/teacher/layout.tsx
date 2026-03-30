"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TeacherSidebar from "@/components/dashboard/teacher/Sidebar";
import TeacherHeader from "@/components/dashboard/teacher/Header";

export default function TeacherLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading, user } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (!isLoading && user && user.role !== "teacher") {
            router.push(`/${user.role}`);
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Sidebar */}
            <TeacherSidebar />
            {/* Main Content Area */}
            <div className="lg:ml-64 transition-all duration-300">
                {/* Header */}
                <TeacherHeader />
                {/* Page Content */}
                <main className="px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
                    <div className="max-w-[1440px] mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
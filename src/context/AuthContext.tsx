"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock данные для демонстрации
const mockUsers: Record<UserRole, User> = {
  student: {
    id: '1',
    name: 'Алишер Иманалиев',
    email: 'student@aqbobek.kz',
    role: 'student',
    avatar: 'АИ',
  },
  teacher: {
    id: '2',
    name: 'Иванова Анна Петровна',
    email: 'teacher@aqbobek.kz',
    role: 'teacher',
    avatar: 'ИП',
  },
  parent: {
    id: '3',
    name: 'Иманалиев Марат',
    email: 'parent@aqbobek.kz',
    role: 'parent',
    avatar: 'ИМ',
  },
  admin: {
    id: '4',
    name: 'Администратор',
    email: 'admin@aqbobek.kz',
    role: 'admin',
    avatar: 'AD',
  },
};

// Функция для получения пользователя из localStorage
function getUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedUser = localStorage.getItem('aqbobek_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch (e) {
    localStorage.removeItem('aqbobek_user');
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Инициализация состояния с проверкой localStorage
  const [user, setUser] = useState<User | null>(getUserFromStorage);
  const [isLoading, setIsLoading] = useState(false);

  // В функции login добавьте:
const login = async (email: string, password: string, role: UserRole) => {
  setIsLoading(true);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (password.length < 6) {
      throw new Error('Пароль должен быть не менее 6 символов');
    }

    const userData = mockUsers[role];
    setUser(userData);
    localStorage.setItem('aqbobek_user', JSON.stringify(userData));
  } finally {
    setIsLoading(false);
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aqbobek_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
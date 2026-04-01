"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, User, CheckCircle, Circle } from "lucide-react";

interface Lesson {
  id: string;
  time: string;
  endTime: string;
  subject: string;
  room: string;
  teacher: string;
  status: 'completed' | 'current' | 'upcoming';
  color?: string;
}

interface ScheduleListProps {
  lessons?: Lesson[];
}

export default function ScheduleList({ lessons }: ScheduleListProps) {

  const defaultLessons: Lesson[] = [
    {
      id: '1',
      time: '08:30',
      endTime: '09:15',
      subject: 'Алгебра',
      room: 'Кабинет 305',
      teacher: 'Иванова А.П.',
      status: 'completed',
      color: 'bg-primary-500',
    },
    {
      id: '2',
      time: '09:25',
      endTime: '10:10',
      subject: 'Физика',
      room: 'Лаборатория 201',
      teacher: 'Петров С.М.',
      status: 'current',
      color: 'bg-tertiary-500',
    },
    {
      id: '3',
      time: '10:30',
      endTime: '11:15',
      subject: 'Литература',
      room: 'Кабинет 412',
      teacher: 'Сидорова Е.В.',
      status: 'upcoming',
      color: 'bg-secondary-500',
    },
    {
      id: '4',
      time: '11:35',
      endTime: '12:20',
      subject: 'История',
      room: 'Кабинет 308',
      teacher: 'Алиев Р.К.',
      status: 'upcoming',
      color: 'bg-purple-500',
    },
    {
      id: '5',
      time: '12:40',
      endTime: '13:25',
      subject: 'Английский язык',
      room: 'Кабинет 215',
      teacher: 'Johnson M.',
      status: 'upcoming',
      color: 'bg-pink-500',
    },
  ];

  const displayLessons = lessons || defaultLessons;

  const getStatusIcon = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-3 bg-red-500 rounded-full"
          />
        );
      case 'upcoming':
        return <Circle className="w-5 h-5 text-neutral-300" />;
    }
  };

  const getStatusStyles = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-neutral-50 opacity-60 border-neutral-200';
      case 'current':
        return 'bg-primary-50 border-primary-500 shadow-md';
      case 'upcoming':
        return 'bg-white border-neutral-200 hover:border-primary-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >

      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              Расписание
            </h3>
            <p className="text-xs text-neutral-500">
              {new Date().toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Полная неделя →
        </button>
      </div>

      <div className="divide-y divide-neutral-100">
        {displayLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 transition-all ${getStatusStyles(lesson.status)}`}
          >
            <div className="flex items-start gap-4">

              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(lesson.status)}
              </div>

              <div className="flex-shrink-0 w-20">
                <p className={`text-sm font-bold font-headline ${
                  lesson.status === 'current' ? 'text-primary-600' : 'text-neutral-900'
                }`}>
                  {lesson.time}
                </p>
                <p className="text-xs text-neutral-500">{lesson.endTime}</p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1 h-4 rounded-full ${lesson.color}`} />
                  <h4 className={`font-medium truncate ${
                    lesson.status === 'current' ? 'text-primary-900' : 'text-neutral-900'
                  }`}>
                    {lesson.subject}
                  </h4>
                  {lesson.status === 'current' && (
                    <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full">
                      СЕЙЧАС
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{lesson.room}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{lesson.teacher}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-600">
            {displayLessons.filter(l => l.status === 'completed').length} из {displayLessons.length} уроков завершено
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-neutral-500">Завершено</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-neutral-500">Сейчас</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
              <span className="text-neutral-500">Предстоит</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
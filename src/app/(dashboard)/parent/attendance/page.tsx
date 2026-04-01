"use client";

import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function AttendancePage() {
  const attendanceData = [
    { date: "26.01", status: "present", notes: "" },
    { date: "25.01", status: "present", notes: "" },
    { date: "24.01", status: "present", notes: "" },
    { date: "23.01", status: "present", notes: "" },
    { date: "22.01", status: "absent", notes: "Без уважительной причины" },
    { date: "21.01", status: "present", notes: "" },
    { date: "20.01", status: "present", notes: "" },
    { date: "19.01", status: "weekend", notes: "" },
    { date: "18.01", status: "weekend", notes: "" },
    { date: "17.01", status: "present", notes: "" },
    { date: "16.01", status: "present", notes: "" },
    { date: "15.01", status: "absent", notes: "Без уважительной причины" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "absent": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Calendar className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "present": return "Присутствовал";
      case "absent": return "Пропустил";
      default: return "Выходной";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "present": return "bg-green-50";
      case "absent": return "bg-red-50";
      default: return "bg-neutral-50";
    }
  };

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Посещаемость
        </h1>
        <p className="text-neutral-600 mt-1">
          История посещений уроков
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-sm text-neutral-600">Присутствовал</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">18</p>
          <p className="text-sm text-neutral-500 mt-1">дней в январе</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <span className="text-sm text-neutral-600">Пропустил</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">2</p>
          <p className="text-sm text-neutral-500 mt-1">дней в январе</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-neutral-500" />
            <span className="text-sm text-neutral-600">Посещаемость</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">90%</p>
          <p className="text-sm text-neutral-500 mt-1">за январь</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-yellow-900">Внимание: 2 пропуска без уважительной причины</p>
          <p className="text-sm text-yellow-700 mt-1">
            Пожалуйста, свяжитесь с классным руководителем для объяснения причин отсутствия
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            История посещений
          </h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {attendanceData.map((item, index) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.5 }}
              className={`flex items-center justify-between p-4 ${getStatusBg(item.status)}`}
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium text-neutral-900">{item.date}</p>
                  {item.notes && (
                    <p className="text-sm text-red-600 mt-0.5">{item.notes}</p>
                  )}
                </div>
              </div>
              <span className="text-sm text-neutral-600">
                {getStatusText(item.status)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BellRing,
  CalendarClock,
  GraduationCap,
  MonitorPlay,
  Trophy,
} from "lucide-react";
import {
  kioskAnnouncements,
  kioskHighlights,
  kioskScheduleReplacements,
  kioskTopStudents,
} from "@/lib/mock-data/kiosk";

const AUTO_SCROLL_STEP = 1.2;
const AUTO_SCROLL_TICK_MS = 28;
const AUTO_SCROLL_PAUSE_MS = 2200;

function formatDateParts(now: Date) {
  const date = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return { date, time };
}

export default function KioskDisplay() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => new Date());

  const { date, time } = useMemo(() => formatDateParts(now), [now]);

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    let direction = 1;
    let pauseUntil = 0;

    const scrollTimer = window.setInterval(() => {
      const maxScrollTop = viewport.scrollHeight - viewport.clientHeight;

      if (maxScrollTop <= 0) {
        return;
      }

      const currentTime = Date.now();
      if (currentTime < pauseUntil) {
        return;
      }

      if (direction > 0 && viewport.scrollTop >= maxScrollTop - 2) {
        direction = -1;
        pauseUntil = currentTime + AUTO_SCROLL_PAUSE_MS;
        return;
      }

      if (direction < 0 && viewport.scrollTop <= 2) {
        direction = 1;
        pauseUntil = currentTime + AUTO_SCROLL_PAUSE_MS;
        return;
      }

      viewport.scrollTop += AUTO_SCROLL_STEP * direction;
    }, AUTO_SCROLL_TICK_MS);

    return () => {
      window.clearInterval(scrollTimer);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_34%),linear-gradient(160deg,_#052b2f_0%,_#0b1f35_52%,_#071019_100%)] text-white cursor-none select-none">
      <div
        ref={viewportRef}
        className="h-screen overflow-y-auto px-6 py-6 sm:px-10 lg:px-14 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <section className="min-h-screen rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl shadow-black/30 backdrop-blur md:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-300/25 bg-amber-300/12 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">
                <MonitorPlay className="h-4 w-4" />
                Kiosk Mode
              </div>
              <h1 className="max-w-5xl font-headline text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-8xl">
                Aqbobek Lyceum
                <span className="block text-amber-300">School Board</span>
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-200 sm:text-2xl">
                Автоскролл включен. На экране только ключевая информация: топ-ученики,
                актуальные замены и анонсы дня.
              </p>
            </div>

            <div className="grid gap-4 text-right">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                {date}
              </p>
              <p className="font-headline text-6xl font-bold text-white sm:text-7xl">
                {time}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {kioskHighlights.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.6rem] border border-white/10 bg-slate-950/35 p-6 shadow-lg shadow-black/20"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                  {item.label}
                </p>
                <p className="mt-4 font-headline text-5xl font-bold text-white">
                  {item.value}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-slate-200">
                  {item.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 min-h-screen rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/25 backdrop-blur md:p-10 lg:p-12">
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-2xl bg-amber-300 p-3 text-slate-950">
                  <Trophy className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                    Top Students
                  </p>
                  <h2 className="font-headline text-4xl font-bold text-white sm:text-5xl">
                    Лучшие ученики дня
                  </h2>
                </div>
              </div>

              <div className="grid gap-5">
                {kioskTopStudents.map((student, index) => (
                  <article
                    key={student.id}
                    className="grid gap-5 rounded-[1.7rem] border border-amber-300/16 bg-white/8 p-6 md:grid-cols-[auto_1fr_auto]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-300 text-3xl font-bold text-slate-950">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-3xl font-semibold text-white">
                        {student.name}
                      </h3>
                      <p className="mt-2 text-lg text-amber-200">
                        {student.className}
                      </p>
                      <p className="mt-3 text-lg leading-relaxed text-slate-200">
                        {student.achievement}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                        Балл дня
                      </p>
                      <p className="mt-3 font-headline text-5xl font-bold text-white">
                        {student.score}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-300 p-3 text-slate-950">
                  <CalendarClock className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                    Replacements
                  </p>
                  <h2 className="font-headline text-4xl font-bold text-white sm:text-5xl">
                    Замены в расписании
                  </h2>
                </div>
              </div>

              <div className="grid gap-4">
                {kioskScheduleReplacements.map((replacement) => (
                  <article
                    key={replacement.id}
                    className="rounded-[1.6rem] border border-emerald-300/16 bg-emerald-300/10 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-emerald-100/80">
                          {replacement.time} • {replacement.className}
                        </p>
                        <h3 className="mt-3 text-3xl font-semibold text-white">
                          {replacement.subject}
                        </h3>
                      </div>
                      <span className="rounded-full bg-white/10 px-4 py-2 text-base font-semibold text-emerald-100">
                        Каб. {replacement.room}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-2 text-lg text-slate-100">
                      <p>Основной учитель: {replacement.teacher}</p>
                      <p>Замена: {replacement.replacementTeacher}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 min-h-screen rounded-[2rem] border border-white/10 bg-white/7 p-8 shadow-2xl shadow-black/25 backdrop-blur md:p-10 lg:p-12">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-sky-300 p-3 text-slate-950">
              <BellRing className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                Announcements
              </p>
              <h2 className="font-headline text-4xl font-bold text-white sm:text-5xl">
                Анонсы и важные объявления
              </h2>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5">
              {kioskAnnouncements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="rounded-[1.6rem] border border-white/10 bg-slate-950/32 p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-3xl font-semibold text-white">
                      {announcement.title}
                    </h3>
                    <span className="rounded-full bg-sky-300/20 px-4 py-2 text-base font-semibold text-sky-100">
                      {announcement.time}
                    </span>
                  </div>
                  <p className="mt-4 text-xl leading-relaxed text-slate-100">
                    {announcement.body}
                  </p>
                  <p className="mt-4 text-base uppercase tracking-[0.16em] text-slate-300">
                    {announcement.audience}
                  </p>
                </article>
              ))}
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(251,191,36,0.18),_rgba(15,23,42,0.28))] p-7">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/12 p-3">
                  <GraduationCap className="h-8 w-8 text-amber-200" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                    Screen Rules
                  </p>
                  <h3 className="font-headline text-3xl font-bold text-white">
                    Режим табло
                  </h3>
                </div>
              </div>

              <div className="mt-8 grid gap-4 text-xl leading-relaxed text-slate-100">
                <p>Экран работает без интерактивных действий и подходит для холла или ресепшена.</p>
                <p>Контент автоматически прокручивается и циклически возвращается к началу.</p>
                <p>Для отдельного устройства можно открыть страницу в полноэкранном режиме браузера.</p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

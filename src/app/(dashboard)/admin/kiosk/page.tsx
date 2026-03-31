import Link from "next/link";
import { ExternalLink, Monitor, Presentation, Sparkles } from "lucide-react";

const features = [
  "Автоскролл по всем блокам без участия оператора.",
  "Крупная типографика и fullscreen-макет для общего экрана.",
  "Топ-ученики дня, актуальные замены и анонсы в одном режиме.",
];

export default function AdminKioskPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.20),_transparent_30%),linear-gradient(140deg,_#0f172a_0%,_#10253f_55%,_#09111d_100%)] p-8 text-white shadow-xl sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em]">
              <Monitor className="h-4 w-4" />
              Kiosk Mode
            </div>
            <h1 className="font-headline text-4xl font-bold sm:text-5xl">
              Экран для холла и общих зон
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-200 sm:text-xl">
              Режим табло запускается из админки, открывается отдельно от рабочего интерфейса
              и показывает ключевые события школы без мыши и клавиатуры.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/kiosk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-300 px-5 py-3 text-base font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
            >
              <Presentation className="h-5 w-5" />
              Запустить kiosk
            </Link>
            <Link
              href="/kiosk"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-base font-semibold text-white hover:bg-white/15"
            >
              <ExternalLink className="h-5 w-5" />
              Предпросмотр
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-neutral-900 p-3 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-headline text-2xl font-bold text-neutral-900">
              Что уже включено
            </h2>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-lg text-neutral-700"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-headline text-2xl font-bold text-neutral-900">
            Как использовать
          </h2>
          <div className="mt-5 grid gap-4 text-lg leading-relaxed text-neutral-700">
            <p>Откройте kiosk на отдельном мониторе или TV и переведите браузер в полноэкранный режим.</p>
            <p>Экран не зависит от кликов: контент прокручивается сам и снова возвращается к началу.</p>
            <p>Следующий шаг можно сделать уже на данных Supabase, если захотите вывести живые рейтинги и реальные замены.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

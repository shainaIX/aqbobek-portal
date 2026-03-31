/**
 * Maps topic IDs to curated learning resources.
 * For unmapped topics, YouTube / Wikipedia search URLs are auto-generated.
 *
 * All URLs use public search pages — no specific content is hardcoded,
 * so links stay valid regardless of content changes.
 */

import type { Resource } from './types';

type ResourceMap = Record<string, Resource[]>;

const ytSearch = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

const wikiRu = (article: string) =>
  `https://ru.wikipedia.org/wiki/${encodeURIComponent(article)}`;

const khanEn = (path: string) => `https://www.khanacademy.org${path}`;

/** Pre-mapped resources per topicId. */
const resourceMap: ResourceMap = {
  // ── Алгебра ──────────────────────────────────────────────────────────────
  algebra_quadratic: [
    { type: 'video', title: 'Квадратные уравнения — объяснение', url: ytSearch('квадратные уравнения объяснение 10 класс'), duration: '12 мин' },
    { type: 'video', title: 'Теорема Виета — примеры', url: ytSearch('теорема Виета квадратные уравнения'), duration: '8 мин' },
    { type: 'theory', title: 'Квадратное уравнение — Википедия', url: wikiRu('Квадратное_уравнение') },
    { type: 'practice', title: 'Khan Academy — Quadratics', url: khanEn('/math/algebra/x2f8bb11595b61c86:quadratics-multiplying-factoring') },
  ],
  algebra_functions: [
    { type: 'video', title: 'Функции и графики — урок', url: ytSearch('функции и графики алгебра 10 класс'), duration: '15 мин' },
    { type: 'theory', title: 'Функция (математика) — Википедия', url: wikiRu('Функция_(математика)') },
    { type: 'practice', title: 'Задачи на функции', url: ytSearch('задачи на функции алгебра решение') },
  ],
  algebra_trig: [
    { type: 'video', title: 'Тригонометрия с нуля', url: ytSearch('тригонометрия с нуля синус косинус'), duration: '20 мин' },
    { type: 'video', title: 'Тригонометрические уравнения', url: ytSearch('тригонометрические уравнения решение'), duration: '14 мин' },
    { type: 'theory', title: 'Тригонометрия — Википедия', url: wikiRu('Тригонометрия') },
    { type: 'practice', title: 'Khan Academy — Trigonometry', url: khanEn('/math/trigonometry') },
  ],
  algebra_log: [
    { type: 'video', title: 'Логарифмы — полный курс', url: ytSearch('логарифмы 10 класс урок'), duration: '18 мин' },
    { type: 'theory', title: 'Логарифм — Википедия', url: wikiRu('Логарифм') },
    { type: 'practice', title: 'Khan Academy — Logarithms', url: khanEn('/math/algebra2/x2ec2f6f830c9fb89:logs') },
  ],
  algebra_progressions: [
    { type: 'video', title: 'Арифметическая и геометрическая прогрессии', url: ytSearch('прогрессии арифметическая геометрическая 10 класс'), duration: '12 мин' },
    { type: 'theory', title: 'Арифметическая прогрессия — Википедия', url: wikiRu('Арифметическая_прогрессия') },
    { type: 'practice', title: 'Задачи на прогрессии', url: ytSearch('задачи на прогрессии ЕНТ решение') },
  ],

  // ── Физика ───────────────────────────────────────────────────────────────
  physics_mechanics: [
    { type: 'video', title: 'Механика — кинематика и динамика', url: ytSearch('механика физика 10 класс кинематика'), duration: '22 мин' },
    { type: 'theory', title: 'Классическая механика — Википедия', url: wikiRu('Классическая_механика') },
    { type: 'practice', title: 'Задачи по механике', url: ytSearch('задачи по механике физика решение') },
  ],
  physics_newton: [
    { type: 'video', title: 'Законы Ньютона — объяснение', url: ytSearch('законы Ньютона физика объяснение'), duration: '15 мин' },
    { type: 'video', title: 'Применение второго закона F=ma', url: ytSearch('второй закон Ньютона задачи решение'), duration: '10 мин' },
    { type: 'theory', title: 'Законы Ньютона — Википедия', url: wikiRu('Законы_Ньютона') },
    { type: 'practice', title: 'Khan Academy — Newton\'s Laws', url: khanEn('/science/physics/forces-newtons-laws') },
  ],
  physics_thermo: [
    { type: 'video', title: 'Термодинамика — первое начало', url: ytSearch('термодинамика первое начало физика урок'), duration: '18 мин' },
    { type: 'theory', title: 'Термодинамика — Википедия', url: wikiRu('Термодинамика') },
    { type: 'practice', title: 'Задачи по термодинамике', url: ytSearch('задачи термодинамика физика ЕНТ') },
  ],
  physics_optics: [
    { type: 'video', title: 'Оптика — геометрическая и волновая', url: ytSearch('оптика физика 10 класс линзы'), duration: '16 мин' },
    { type: 'theory', title: 'Оптика — Википедия', url: wikiRu('Оптика') },
    { type: 'practice', title: 'Khan Academy — Geometric Optics', url: khanEn('/science/physics/geometric-optics') },
  ],
  physics_electro: [
    { type: 'video', title: 'Электростатика — закон Кулона', url: ytSearch('электростатика закон Кулона физика'), duration: '14 мин' },
    { type: 'theory', title: 'Электростатика — Википедия', url: wikiRu('Электростатика') },
    { type: 'practice', title: 'Задачи по электростатике', url: ytSearch('задачи электростатика физика решение') },
  ],

  // ── Литература ────────────────────────────────────────────────────────────
  lit_analysis: [
    { type: 'video', title: 'Анализ литературного произведения', url: ytSearch('как анализировать литературное произведение'), duration: '12 мин' },
    { type: 'practice', title: 'Примеры анализа текстов', url: ytSearch('анализ произведения пример литература') },
  ],
  lit_essay: [
    { type: 'video', title: 'Как написать сочинение — структура', url: ytSearch('как написать сочинение структура аргументы'), duration: '10 мин' },
    { type: 'theory', title: 'Эссе — Википедия', url: wikiRu('Эссе') },
    { type: 'practice', title: 'Примеры сочинений ЕНТ', url: ytSearch('сочинение ЕНТ пример образец литература') },
  ],
  lit_poetry: [
    { type: 'video', title: 'Анализ лирического стихотворения', url: ytSearch('анализ стихотворения план литература'), duration: '12 мин' },
    { type: 'theory', title: 'Поэзия — Википедия', url: wikiRu('Поэзия') },
    { type: 'practice', title: 'Разбор стихов — примеры', url: ytSearch('разбор стихотворения тропы размер') },
  ],
  lit_romanticism: [
    { type: 'video', title: 'Романтизм в литературе', url: ytSearch('романтизм литература объяснение признаки'), duration: '11 мин' },
    { type: 'theory', title: 'Романтизм — Википедия', url: wikiRu('Романтизм') },
  ],

  // ── История ───────────────────────────────────────────────────────────────
  history_kz20: [
    { type: 'video', title: 'История Казахстана в XX веке', url: ytSearch('история Казахстана XX век советский период'), duration: '20 мин' },
    { type: 'theory', title: 'Казахстан в советский период — Википедия', url: wikiRu('Казахская_Советская_Социалистическая_Республика') },
    { type: 'practice', title: 'Тесты по истории Казахстана', url: ytSearch('тест история Казахстана XX век ЕНТ') },
  ],
  history_wars: [
    { type: 'video', title: 'Первая и Вторая мировые войны — кратко', url: ytSearch('мировые войны история кратко'), duration: '18 мин' },
    { type: 'theory', title: 'Первая мировая война — Википедия', url: wikiRu('Первая_мировая_война') },
    { type: 'practice', title: 'Задачи и тесты по мировым войнам', url: ytSearch('тест первая вторая мировая война история') },
  ],
  history_medieval: [
    { type: 'video', title: 'Средневековье — феодализм и культура', url: ytSearch('средневековье история феодализм урок'), duration: '16 мин' },
    { type: 'video', title: 'Крестовые походы', url: ytSearch('крестовые походы история кратко'), duration: '10 мин' },
    { type: 'theory', title: 'Средневековье — Википедия', url: wikiRu('Средние_века') },
    { type: 'practice', title: 'Тест по Средневековью', url: ytSearch('тест средневековье история ЕНТ') },
  ],
  history_modern: [
    { type: 'video', title: 'Новое время — эпоха Просвещения', url: ytSearch('новое время Просвещение история урок'), duration: '14 мин' },
    { type: 'theory', title: 'Новое время — Википедия', url: wikiRu('Новое_время') },
  ],

  // ── Английский ────────────────────────────────────────────────────────────
  english_grammar: [
    { type: 'video', title: 'English Tenses — полный гайд', url: ytSearch('english tenses explained all 12 tenses'), duration: '25 мин' },
    { type: 'video', title: 'Conditionals 0 1 2 3', url: ytSearch('english conditionals 0 1 2 3 explained'), duration: '12 мин' },
    { type: 'theory', title: 'Khan Academy — Grammar', url: khanEn('/humanities/grammar') },
    { type: 'practice', title: 'Grammar practice exercises', url: ytSearch('english grammar exercises intermediate') },
  ],
  english_reading: [
    { type: 'video', title: 'Reading Comprehension strategies', url: ytSearch('reading comprehension strategies english'), duration: '10 мин' },
    { type: 'practice', title: 'Тексты для чтения B2', url: ytSearch('english reading comprehension B2 practice') },
  ],
  english_writing: [
    { type: 'video', title: 'Essay writing guide', url: ytSearch('how to write an essay english structure'), duration: '14 мин' },
    { type: 'practice', title: 'Formal letter examples', url: ytSearch('formal letter english example') },
  ],
  english_vocab: [
    { type: 'video', title: 'Academic vocabulary — top 500 words', url: ytSearch('academic vocabulary english top words'), duration: '20 мин' },
    { type: 'practice', title: 'Word formation exercises', url: ytSearch('word formation english B2 exercises') },
  ],

  // ── Химия ─────────────────────────────────────────────────────────────────
  chem_organic: [
    { type: 'video', title: 'Органическая химия — углеводороды', url: ytSearch('органическая химия углеводороды урок'), duration: '18 мин' },
    { type: 'video', title: 'Спирты и кислоты — реакции', url: ytSearch('спирты кислоты органическая химия реакции'), duration: '14 мин' },
    { type: 'theory', title: 'Органическая химия — Википедия', url: wikiRu('Органическая_химия') },
    { type: 'practice', title: 'Задачи по органической химии', url: ytSearch('задачи органическая химия ЕНТ решение') },
  ],
  chem_inorganic: [
    { type: 'video', title: 'Неорганическая химия — кислоты и основания', url: ytSearch('кислоты основания соли химия урок'), duration: '15 мин' },
    { type: 'theory', title: 'Неорганическая химия — Википедия', url: wikiRu('Неорганическая_химия') },
    { type: 'practice', title: 'Тесты по неорганической химии', url: ytSearch('тест неорганическая химия ЕНТ') },
  ],
  chem_reactions: [
    { type: 'video', title: 'Типы химических реакций', url: ytSearch('типы химических реакций химия урок'), duration: '12 мин' },
    { type: 'video', title: 'Окисление и восстановление — ОВР', url: ytSearch('окислительно восстановительные реакции химия'), duration: '16 мин' },
    { type: 'theory', title: 'Химическая реакция — Википедия', url: wikiRu('Химическая_реакция') },
    { type: 'practice', title: 'Задачи на ОВР', url: ytSearch('ОВР задачи решение химия') },
  ],
  chem_periodic: [
    { type: 'video', title: 'Периодическая таблица — закономерности', url: ytSearch('периодическая таблица Менделеева закономерности'), duration: '12 мин' },
    { type: 'theory', title: 'Периодический закон — Википедия', url: wikiRu('Периодический_закон_Менделеева') },
    { type: 'practice', title: 'Khan Academy — Periodic Table', url: khanEn('/science/ap-chemistry-beta/x2eef969c74e0d802:atomic-structure-and-properties/x2eef969c74e0d802:the-periodic-table-and-electron-configuration') },
  ],
};

/**
 * Returns resources for a given topicId.
 * Falls back to auto-generated search links if the topic is not in the map.
 */
export function getResources(topicId: string, topicName: string): Resource[] {
  const mapped = resourceMap[topicId];
  if (mapped && mapped.length > 0) return mapped;

  // Auto-generate fallback resources
  return [
    {
      type: 'video',
      title: `${topicName} — видео-уроки`,
      url: ytSearch(`${topicName} объяснение урок`),
      duration: '~15 мин',
    },
    {
      type: 'theory',
      title: `${topicName} — Википедия`,
      url: wikiRu(topicName),
    },
    {
      type: 'practice',
      title: `${topicName} — задачи и тесты`,
      url: ytSearch(`${topicName} задачи решение ЕНТ`),
    },
  ];
}

/** Count resources by type for display in cards. */
export function countByType(resources: Resource[]) {
  return {
    videos: resources.filter((r) => r.type === 'video').length,
    theory: resources.filter((r) => r.type === 'theory').length,
    practice: resources.filter((r) => r.type === 'practice').length,
  };
}

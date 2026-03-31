/**
 * AI Learning – local mock database.
 *
 * All student performance data lives here.
 * Replace the `studentRecords` array (or the helper functions below) with
 * real Supabase queries when you are ready to go live.
 */

import type {
  Subject,
  StudentRecord,
  SubjectSummary,
  RecentGradeRow,
} from './types';

// ─── Curriculum ───────────────────────────────────────────────────────────────

export const subjects: Subject[] = [
  {
    id: 'algebra',
    name: 'Алгебра',
    color: 'bg-primary-500',
    gradientFrom: 'from-primary-400',
    gradientTo: 'to-primary-600',
    topics: [
      {
        id: 'algebra_quadratic',
        name: 'Квадратные уравнения',
        subtopics: ['Дискриминант', 'Теорема Виета', 'Неполные квадратные уравнения'],
      },
      {
        id: 'algebra_functions',
        name: 'Функции и графики',
        subtopics: ['Линейные функции', 'Парабола', 'Область определения'],
      },
      {
        id: 'algebra_trig',
        name: 'Тригонометрия',
        subtopics: ['Синус и косинус', 'Тангенс', 'Тригонометрические уравнения'],
      },
      {
        id: 'algebra_log',
        name: 'Логарифмы',
        subtopics: ['Свойства логарифмов', 'Логарифмические уравнения', 'Натуральный логарифм'],
      },
      {
        id: 'algebra_progressions',
        name: 'Прогрессии',
        subtopics: ['Арифметическая прогрессия', 'Геометрическая прогрессия', 'Формула суммы'],
      },
    ],
  },
  {
    id: 'physics',
    name: 'Физика',
    color: 'bg-tertiary-500',
    gradientFrom: 'from-tertiary-400',
    gradientTo: 'to-tertiary-600',
    topics: [
      {
        id: 'physics_mechanics',
        name: 'Механика',
        subtopics: ['Кинематика', 'Динамика', 'Законы сохранения'],
      },
      {
        id: 'physics_newton',
        name: 'Законы Ньютона',
        subtopics: ['Первый закон', 'Второй закон (F=ma)', 'Третий закон', 'Применение'],
      },
      {
        id: 'physics_thermo',
        name: 'Термодинамика',
        subtopics: ['Температура и теплота', 'Первое начало', 'Тепловые машины'],
      },
      {
        id: 'physics_optics',
        name: 'Оптика',
        subtopics: ['Геометрическая оптика', 'Линзы', 'Волновая оптика'],
      },
      {
        id: 'physics_electro',
        name: 'Электростатика',
        subtopics: ['Закон Кулона', 'Электрическое поле', 'Потенциал'],
      },
    ],
  },
  {
    id: 'literature',
    name: 'Литература',
    color: 'bg-secondary-500',
    gradientFrom: 'from-secondary-400',
    gradientTo: 'to-secondary-600',
    topics: [
      {
        id: 'lit_analysis',
        name: 'Анализ произведений',
        subtopics: ['Идея и тема', 'Образы героев', 'Художественные приёмы'],
      },
      {
        id: 'lit_essay',
        name: 'Сочинение',
        subtopics: ['Структура эссе', 'Аргументация', 'Стиль'],
      },
      {
        id: 'lit_poetry',
        name: 'Поэзия',
        subtopics: ['Размер и ритм', 'Тропы', 'Лирические жанры'],
      },
      {
        id: 'lit_romanticism',
        name: 'Романтизм',
        subtopics: ['Черты романтизма', 'Представители', 'Произведения'],
      },
    ],
  },
  {
    id: 'history',
    name: 'История',
    color: 'bg-purple-500',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-purple-600',
    topics: [
      {
        id: 'history_kz20',
        name: 'Казахстан в XX веке',
        subtopics: ['Советский период', 'Независимость', 'Экономика'],
      },
      {
        id: 'history_wars',
        name: 'Мировые войны',
        subtopics: ['Причины WWI', 'Причины WWII', 'Итоги и последствия'],
      },
      {
        id: 'history_medieval',
        name: 'Средневековье',
        subtopics: ['Феодализм', 'Крестовые походы', 'Культура средневековья'],
      },
      {
        id: 'history_modern',
        name: 'Новое время',
        subtopics: ['Великие географические открытия', 'Реформация', 'Просвещение'],
      },
    ],
  },
  {
    id: 'english',
    name: 'Английский язык',
    color: 'bg-pink-500',
    gradientFrom: 'from-pink-400',
    gradientTo: 'to-pink-600',
    topics: [
      {
        id: 'english_grammar',
        name: 'Grammar',
        subtopics: ['Tenses', 'Conditionals', 'Passive Voice', 'Modal verbs'],
      },
      {
        id: 'english_reading',
        name: 'Reading Comprehension',
        subtopics: ['Skimming & scanning', 'Inference', 'Vocabulary in context'],
      },
      {
        id: 'english_writing',
        name: 'Writing',
        subtopics: ['Essay structure', 'Formal letters', 'Cohesive devices'],
      },
      {
        id: 'english_vocab',
        name: 'Vocabulary',
        subtopics: ['Academic word list', 'Collocations', 'Word formation'],
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Химия',
    color: 'bg-orange-500',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-600',
    topics: [
      {
        id: 'chem_organic',
        name: 'Органическая химия',
        subtopics: ['Углеводороды', 'Спирты и эфиры', 'Карбоновые кислоты', 'Реакции'],
      },
      {
        id: 'chem_inorganic',
        name: 'Неорганическая химия',
        subtopics: ['Кислоты и основания', 'Соли', 'Оксиды'],
      },
      {
        id: 'chem_reactions',
        name: 'Химические реакции',
        subtopics: ['Типы реакций', 'Окисление и восстановление', 'Скорость реакций'],
      },
      {
        id: 'chem_periodic',
        name: 'Периодическая таблица',
        subtopics: ['Периоды и группы', 'Свойства элементов', 'Закономерности'],
      },
    ],
  },
];

// ─── Student performance data ─────────────────────────────────────────────────

/**
 * The current student (Алишер Иманалиев, id '1') performance per topic.
 * Grades match the existing grades page data:
 *   Алгебра/Квадратные уравнения → 5 (24.01.2025)
 *   Физика/Законы Ньютона → 4 (23.01.2025)
 *   Литература/Сочинение → 5 (22.01.2025)
 *   История/Мировые войны → 4 (21.01.2025)
 *   Химия/Лабораторная (Неорганическая химия) → 3 (20.01.2025)
 */
export const studentRecords: StudentRecord[] = [
  {
    studentId: '1',
    name: 'Алишер Иманалиев',
    classId: 'c1',
    className: '10"А"',
    trainingProgress: {},
    topicPerformance: [
      // ── Алгебра ──────────────────────────────────────────────────────────
      {
        topicId: 'algebra_quadratic',
        subjectId: 'algebra',
        attendanceRate: 95,
        lastExamScore: 92,
        gradeHistory: [
          { score: 4, type: 'homework', date: '2025-01-02', topicId: 'algebra_quadratic' },
          { score: 5, type: 'classwork', date: '2025-01-08', topicId: 'algebra_quadratic' },
          { score: 4, type: 'test', date: '2025-01-14', topicId: 'algebra_quadratic', label: 'Проверочная' },
          { score: 5, type: 'classwork', date: '2025-01-20', topicId: 'algebra_quadratic' },
          { score: 5, type: 'exam', date: '2025-01-24', topicId: 'algebra_quadratic', label: 'Контрольная работа' },
        ],
      },
      {
        topicId: 'algebra_functions',
        subjectId: 'algebra',
        attendanceRate: 100,
        lastExamScore: 88,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-12-05', topicId: 'algebra_functions' },
          { score: 5, type: 'homework', date: '2024-12-11', topicId: 'algebra_functions' },
          { score: 4, type: 'test', date: '2024-12-18', topicId: 'algebra_functions' },
          { score: 5, type: 'exam', date: '2024-12-22', topicId: 'algebra_functions', label: 'Контрольная' },
        ],
      },
      {
        topicId: 'algebra_trig',
        subjectId: 'algebra',
        attendanceRate: 90,
        lastExamScore: 80,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-11-10', topicId: 'algebra_trig' },
          { score: 4, type: 'homework', date: '2024-11-17', topicId: 'algebra_trig' },
          { score: 5, type: 'test', date: '2024-11-24', topicId: 'algebra_trig' },
          { score: 4, type: 'exam', date: '2024-12-01', topicId: 'algebra_trig', label: 'СОЧ' },
        ],
      },
      {
        topicId: 'algebra_log',
        subjectId: 'algebra',
        attendanceRate: 100,
        lastExamScore: 96,
        gradeHistory: [
          { score: 5, type: 'classwork', date: '2024-10-07', topicId: 'algebra_log' },
          { score: 5, type: 'homework', date: '2024-10-14', topicId: 'algebra_log' },
          { score: 5, type: 'exam', date: '2024-10-21', topicId: 'algebra_log', label: 'Контрольная' },
        ],
      },
      {
        topicId: 'algebra_progressions',
        subjectId: 'algebra',
        attendanceRate: 95,
        lastExamScore: 90,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-09-16', topicId: 'algebra_progressions' },
          { score: 5, type: 'test', date: '2024-09-23', topicId: 'algebra_progressions' },
          { score: 5, type: 'exam', date: '2024-09-30', topicId: 'algebra_progressions', label: 'СОР' },
        ],
      },

      // ── Физика ───────────────────────────────────────────────────────────
      {
        topicId: 'physics_mechanics',
        subjectId: 'physics',
        attendanceRate: 88,
        lastExamScore: 78,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-09-10', topicId: 'physics_mechanics' },
          { score: 4, type: 'homework', date: '2024-09-17', topicId: 'physics_mechanics' },
          { score: 4, type: 'exam', date: '2024-09-24', topicId: 'physics_mechanics', label: 'Контрольная' },
        ],
      },
      {
        topicId: 'physics_newton',
        subjectId: 'physics',
        attendanceRate: 92,
        lastExamScore: 82,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-10-08', topicId: 'physics_newton' },
          { score: 4, type: 'homework', date: '2024-10-15', topicId: 'physics_newton' },
          { score: 4, type: 'test', date: '2024-10-22', topicId: 'physics_newton' },
          { score: 4, type: 'exam', date: '2025-01-23', topicId: 'physics_newton', label: 'Проверочная работа' },
        ],
      },
      {
        topicId: 'physics_thermo',
        subjectId: 'physics',
        attendanceRate: 80,
        lastExamScore: 68,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-11-05', topicId: 'physics_thermo' },
          { score: 3, type: 'homework', date: '2024-11-12', topicId: 'physics_thermo' },
          { score: 4, type: 'test', date: '2024-11-19', topicId: 'physics_thermo', label: 'Тест' },
          { score: 4, type: 'exam', date: '2024-11-26', topicId: 'physics_thermo', label: 'Контрольная' },
        ],
      },
      {
        topicId: 'physics_optics',
        subjectId: 'physics',
        attendanceRate: 75,
        lastExamScore: 60,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-12-03', topicId: 'physics_optics' },
          { score: 4, type: 'homework', date: '2024-12-10', topicId: 'physics_optics' },
          { score: 3, type: 'exam', date: '2024-12-17', topicId: 'physics_optics', label: 'СОЧ' },
        ],
      },
      {
        topicId: 'physics_electro',
        subjectId: 'physics',
        attendanceRate: 95,
        lastExamScore: 85,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2025-01-07', topicId: 'physics_electro' },
          { score: 4, type: 'homework', date: '2025-01-14', topicId: 'physics_electro' },
          { score: 5, type: 'test', date: '2025-01-21', topicId: 'physics_electro' },
        ],
      },

      // ── Литература ────────────────────────────────────────────────────────
      {
        topicId: 'lit_analysis',
        subjectId: 'literature',
        attendanceRate: 96,
        lastExamScore: 88,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-10-01', topicId: 'lit_analysis' },
          { score: 5, type: 'homework', date: '2024-10-08', topicId: 'lit_analysis' },
          { score: 4, type: 'test', date: '2024-10-15', topicId: 'lit_analysis' },
          { score: 5, type: 'exam', date: '2024-10-22', topicId: 'lit_analysis', label: 'Итоговая' },
        ],
      },
      {
        topicId: 'lit_essay',
        subjectId: 'literature',
        attendanceRate: 100,
        lastExamScore: 94,
        gradeHistory: [
          { score: 4, type: 'homework', date: '2024-11-05', topicId: 'lit_essay' },
          { score: 5, type: 'classwork', date: '2024-11-12', topicId: 'lit_essay' },
          { score: 5, type: 'test', date: '2024-12-03', topicId: 'lit_essay', label: 'Сочинение' },
          { score: 5, type: 'exam', date: '2025-01-22', topicId: 'lit_essay', label: 'Итоговое сочинение' },
        ],
      },
      {
        topicId: 'lit_poetry',
        subjectId: 'literature',
        attendanceRate: 92,
        lastExamScore: 82,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-09-17', topicId: 'lit_poetry' },
          { score: 4, type: 'homework', date: '2024-09-24', topicId: 'lit_poetry' },
          { score: 4, type: 'exam', date: '2024-10-01', topicId: 'lit_poetry' },
        ],
      },
      {
        topicId: 'lit_romanticism',
        subjectId: 'literature',
        attendanceRate: 88,
        lastExamScore: 78,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-12-10', topicId: 'lit_romanticism' },
          { score: 4, type: 'homework', date: '2024-12-17', topicId: 'lit_romanticism' },
          { score: 5, type: 'exam', date: '2025-01-07', topicId: 'lit_romanticism' },
        ],
      },

      // ── История ───────────────────────────────────────────────────────────
      {
        topicId: 'history_kz20',
        subjectId: 'history',
        attendanceRate: 82,
        lastExamScore: 72,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-09-09', topicId: 'history_kz20' },
          { score: 4, type: 'homework', date: '2024-09-16', topicId: 'history_kz20' },
          { score: 3, type: 'test', date: '2024-09-23', topicId: 'history_kz20', label: 'Тест' },
          { score: 3, type: 'exam', date: '2024-09-30', topicId: 'history_kz20', label: 'СОЧ' },
        ],
      },
      {
        topicId: 'history_wars',
        subjectId: 'history',
        attendanceRate: 78,
        lastExamScore: 65,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-10-14', topicId: 'history_wars' },
          { score: 3, type: 'homework', date: '2024-10-21', topicId: 'history_wars' },
          { score: 3, type: 'test', date: '2024-10-28', topicId: 'history_wars' },
          { score: 4, type: 'exam', date: '2025-01-21', topicId: 'history_wars', label: 'Тест по теме' },
        ],
      },
      {
        topicId: 'history_medieval',
        subjectId: 'history',
        attendanceRate: 70,
        lastExamScore: 55,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-11-11', topicId: 'history_medieval' },
          { score: 3, type: 'homework', date: '2024-11-18', topicId: 'history_medieval' },
          { score: 2, type: 'test', date: '2024-11-25', topicId: 'history_medieval', label: 'Контрольная' },
          { score: 3, type: 'exam', date: '2024-12-02', topicId: 'history_medieval', label: 'СОЧ' },
        ],
      },
      {
        topicId: 'history_modern',
        subjectId: 'history',
        attendanceRate: 85,
        lastExamScore: 70,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-12-09', topicId: 'history_modern' },
          { score: 3, type: 'homework', date: '2024-12-16', topicId: 'history_modern' },
          { score: 3, type: 'exam', date: '2025-01-13', topicId: 'history_modern' },
        ],
      },

      // ── Английский ────────────────────────────────────────────────────────
      {
        topicId: 'english_grammar',
        subjectId: 'english',
        attendanceRate: 95,
        lastExamScore: 90,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-09-11', topicId: 'english_grammar' },
          { score: 5, type: 'homework', date: '2024-09-18', topicId: 'english_grammar' },
          { score: 4, type: 'test', date: '2024-09-25', topicId: 'english_grammar' },
          { score: 5, type: 'exam', date: '2024-10-02', topicId: 'english_grammar', label: 'Grammar Test' },
        ],
      },
      {
        topicId: 'english_reading',
        subjectId: 'english',
        attendanceRate: 92,
        lastExamScore: 86,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-10-14', topicId: 'english_reading' },
          { score: 5, type: 'homework', date: '2024-10-21', topicId: 'english_reading' },
          { score: 4, type: 'exam', date: '2024-10-28', topicId: 'english_reading' },
        ],
      },
      {
        topicId: 'english_writing',
        subjectId: 'english',
        attendanceRate: 98,
        lastExamScore: 88,
        gradeHistory: [
          { score: 5, type: 'homework', date: '2024-11-12', topicId: 'english_writing' },
          { score: 4, type: 'classwork', date: '2024-11-19', topicId: 'english_writing' },
          { score: 5, type: 'exam', date: '2024-11-26', topicId: 'english_writing', label: 'Writing task' },
        ],
      },
      {
        topicId: 'english_vocab',
        subjectId: 'english',
        attendanceRate: 90,
        lastExamScore: 84,
        gradeHistory: [
          { score: 4, type: 'classwork', date: '2024-12-03', topicId: 'english_vocab' },
          { score: 5, type: 'test', date: '2024-12-10', topicId: 'english_vocab' },
          { score: 4, type: 'exam', date: '2025-01-14', topicId: 'english_vocab' },
        ],
      },

      // ── Химия ─────────────────────────────────────────────────────────────
      {
        topicId: 'chem_organic',
        subjectId: 'chemistry',
        attendanceRate: 72,
        lastExamScore: 48,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-09-10', topicId: 'chem_organic' },
          { score: 2, type: 'homework', date: '2024-09-17', topicId: 'chem_organic' },
          { score: 3, type: 'test', date: '2024-09-24', topicId: 'chem_organic', label: 'Тест' },
          { score: 2, type: 'exam', date: '2024-10-01', topicId: 'chem_organic', label: 'СОЧ' },
        ],
      },
      {
        topicId: 'chem_inorganic',
        subjectId: 'chemistry',
        attendanceRate: 68,
        lastExamScore: 52,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-10-15', topicId: 'chem_inorganic' },
          { score: 2, type: 'test', date: '2024-10-22', topicId: 'chem_inorganic', label: 'Лабораторная' },
          { score: 3, type: 'homework', date: '2024-10-29', topicId: 'chem_inorganic' },
          { score: 3, type: 'exam', date: '2025-01-20', topicId: 'chem_inorganic', label: 'Лабораторная работа' },
        ],
      },
      {
        topicId: 'chem_reactions',
        subjectId: 'chemistry',
        attendanceRate: 78,
        lastExamScore: 58,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-11-05', topicId: 'chem_reactions' },
          { score: 3, type: 'homework', date: '2024-11-12', topicId: 'chem_reactions' },
          { score: 2, type: 'test', date: '2024-11-19', topicId: 'chem_reactions' },
          { score: 3, type: 'exam', date: '2024-11-26', topicId: 'chem_reactions', label: 'Контрольная' },
        ],
      },
      {
        topicId: 'chem_periodic',
        subjectId: 'chemistry',
        attendanceRate: 82,
        lastExamScore: 62,
        gradeHistory: [
          { score: 3, type: 'classwork', date: '2024-12-03', topicId: 'chem_periodic' },
          { score: 4, type: 'homework', date: '2024-12-10', topicId: 'chem_periodic' },
          { score: 3, type: 'exam', date: '2025-01-07', topicId: 'chem_periodic', label: 'Тест' },
        ],
      },
    ],
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getSubjectById(subjectId: string): Subject | undefined {
  return subjects.find((s) => s.id === subjectId);
}

export function getStudentRecord(studentId: string): StudentRecord | null {
  return studentRecords.find((r) => r.studentId === studentId) ?? null;
}

/** Returns SubjectProgress-compatible summaries derived from real grade data. */
export function getSubjectSummaries(studentId: string): SubjectSummary[] {
  const record = getStudentRecord(studentId);
  if (!record) return [];

  return subjects.map((subject) => {
    const topicPerfs = record.topicPerformance.filter(
      (tp) => tp.subjectId === subject.id,
    );

    const allGrades = topicPerfs.flatMap((tp) => tp.gradeHistory);

    if (allGrades.length === 0) {
      return {
        id: subject.id,
        name: subject.name,
        color: subject.color,
        grade: 0,
        progress: 0,
        trend: 'stable' as const,
      };
    }

    const avgGrade =
      allGrades.reduce((sum, g) => sum + g.score, 0) / allGrades.length;

    // Trend: compare last 3 vs previous 3 grades sorted by date
    const sorted = [...allGrades].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const recent = sorted.slice(-3);
    const previous = sorted.slice(-6, -3);
    const recentAvg =
      recent.reduce((s, g) => s + g.score, 0) / (recent.length || 1);
    const prevAvg =
      previous.length > 0
        ? previous.reduce((s, g) => s + g.score, 0) / previous.length
        : recentAvg;
    const diff = recentAvg - prevAvg;

    const trend: 'up' | 'down' | 'stable' =
      diff > 0.2 ? 'up' : diff < -0.2 ? 'down' : 'stable';

    return {
      id: subject.id,
      name: subject.name,
      color: subject.color,
      grade: Math.round(avgGrade),
      progress: Math.round((avgGrade / 5) * 100),
      trend,
    };
  });
}

/** Returns the most recent grade entries across all subjects, sorted newest first. */
export function getRecentGrades(
  studentId: string,
  limit = 10,
): RecentGradeRow[] {
  const record = getStudentRecord(studentId);
  if (!record) return [];

  const rows: RecentGradeRow[] = [];

  for (const tp of record.topicPerformance) {
    const subject = getSubjectById(tp.subjectId);
    const topic = subject?.topics.find((t) => t.id === tp.topicId);
    if (!subject || !topic) continue;

    for (const g of tp.gradeHistory) {
      // Format date: YYYY-MM-DD → DD.MM.YYYY
      const [y, m, d] = g.date.split('-');
      rows.push({
        subject: subject.name,
        topic: g.label ?? topic.name,
        date: `${d}.${m}.${y}`,
        grade: g.score,
        type: g.type,
      });
    }
  }

  return rows
    .sort((a, b) => {
      // Parse DD.MM.YYYY back for sorting
      const parse = (s: string) => {
        const [dd, mm, yyyy] = s.split('.');
        return new Date(`${yyyy}-${mm}-${dd}`).getTime();
      };
      return parse(b.date) - parse(a.date);
    })
    .slice(0, limit);
}

export interface KioskTopStudent {
  id: number;
  name: string;
  className: string;
  score: number;
  achievement: string;
}

export interface KioskReplacement {
  id: number;
  time: string;
  className: string;
  subject: string;
  room: string;
  teacher: string;
  replacementTeacher: string;
}

export interface KioskAnnouncement {
  id: number;
  title: string;
  body: string;
  audience: string;
  time: string;
}

export interface KioskHighlight {
  id: number;
  label: string;
  value: string;
  note: string;
}

export const kioskTopStudents: KioskTopStudent[] = [
  {
    id: 1,
    name: "Амина Тлеуберген",
    className: '11 "A"',
    score: 98,
    achievement: "Лучший результат по математике и физике",
  },
  {
    id: 2,
    name: "Даниал Серик",
    className: '10 "B"',
    score: 96,
    achievement: "100% посещаемость и активность на олимпиаде",
  },
  {
    id: 3,
    name: "Малика Нургалиева",
    className: '9 "A"',
    score: 95,
    achievement: "Топ по английскому и дебатному клубу",
  },
];

export const kioskScheduleReplacements: KioskReplacement[] = [
  {
    id: 1,
    time: "08:30",
    className: '10 "A"',
    subject: "Алгебра",
    room: "305",
    teacher: "Иванова А.П.",
    replacementTeacher: "Садыкова Н.К.",
  },
  {
    id: 2,
    time: "10:20",
    className: '8 "B"',
    subject: "История Казахстана",
    room: "208",
    teacher: "Алиев Р.К.",
    replacementTeacher: "Жумабеков Т.С.",
  },
  {
    id: 3,
    time: "12:10",
    className: '11 "A"',
    subject: "Физика",
    room: "201",
    teacher: "Петров С.М.",
    replacementTeacher: "Сулейменов Д.А.",
  },
];

export const kioskAnnouncements: KioskAnnouncement[] = [
  {
    id: 1,
    title: "Сбор лидеров классов",
    body: "В 14:30 в актовом зале пройдет короткая встреча с администрацией.",
    audience: "Для старост и заместителей",
    time: "Сегодня",
  },
  {
    id: 2,
    title: "Олимпиада по информатике",
    body: "Регистрация открыта до 17:00. Участникам подойти в кабинет 402.",
    audience: "7-11 классы",
    time: "До 17:00",
  },
  {
    id: 3,
    title: "Родительское собрание",
    body: "Завтра в 18:30 состоится общее собрание для 9-11 классов.",
    audience: "Родители и кураторы",
    time: "Завтра",
  },
  {
    id: 4,
    title: "Школьный media day",
    body: "Фотосессия клубов и секций пройдет после 6 урока во внутреннем дворе.",
    audience: "Все ученики",
    time: "После 6 урока",
  },
];

export const kioskHighlights: KioskHighlight[] = [
  {
    id: 1,
    label: "Присутствуют",
    value: "498",
    note: "95% от общего числа учеников",
  },
  {
    id: 2,
    label: "Замены сегодня",
    value: "3",
    note: "Проверяйте кабинет и учителя перед уроком",
  },
  {
    id: 3,
    label: "Анонсов дня",
    value: "4",
    note: "Все ключевые объявления собраны на экране",
  },
];

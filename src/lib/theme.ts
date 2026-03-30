// Цветовая палитра из дизайн-системы
export const colors = {
  primary: {
    DEFAULT: '#50C878',
    dark: '#3AA868',
    light: '#7ED9A8',
    50: '#E8F8EF',
    100: '#D1F0DF',
    200: '#A3E1BF',
    300: '#75D29F',
    400: '#50C878',
    500: '#3AA868',
    600: '#2E8854',
    700: '#236840',
    800: '#17482C',
    900: '#0C2818',
  },
  secondary: {
    DEFAULT: '#DFFF00',
    dark: '#BFD100',
    light: '#E9FF33',
    50: '#FAFFCC',
    100: '#F5FF99',
    200: '#EFFF66',
    300: '#E9FF33',
    400: '#DFFF00',
    500: '#BFD100',
    600: '#9FA300',
    700: '#7F7500',
    800: '#5F4D00',
    900: '#3F2500',
  },
  tertiary: {
    DEFAULT: '#00DCFE',
    dark: '#00B8D4',
    light: '#33E5FF',
    50: '#CCF5FF',
    100: '#99EBFF',
    200: '#66E1FF',
    300: '#33E5FF',
    400: '#00DCFE',
    500: '#00B8D4',
    600: '#0094AA',
    700: '#007080',
    800: '#004C55',
    900: '#00282B',
  },
  neutral: {
    DEFAULT: '#F8F9FA',
    50: '#FFFFFF',
    100: '#F8F9FA',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
}

// Типографика
export const typography = {
  headline: {
    fontFamily: 'Space Grotesk',
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  body: {
    fontFamily: 'Manrope',
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  label: {
    fontFamily: 'Space Grotesk',
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
}

// Размеры шрифтов
export const fontSizes = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
}

// Радиус скругления
export const radius = {
  none: '0px',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
}

// Тени
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
}
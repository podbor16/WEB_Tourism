// Цвета и стили для разных видов туризма
export const TOURISM_COLORS = {
  'Пеший туризм': {
    primary: '#22c55e', // Зеленый
    light: '#dcfce7',
    dark: '#15803d',
    name: 'Пеший туризм',
  },
  'Горный туризм': {
    primary: '#57534e', // Графитовый
    light: '#f5f5f4',
    dark: '#44403c',
    name: 'Горный туризм',
  },
  'Водный туризм': {
    primary: '#3b82f6', // Синий
    light: '#dbeafe',
    dark: '#1e40af',
    name: 'Водный туризм',
  },
};

// Функция для получения цвета по типу туризма
export const getTourismColor = (tourType) => {
  // Если tourType - полное название
  if (TOURISM_COLORS[tourType]) {
    return TOURISM_COLORS[tourType];
  }
  
  // Если tourType - краткое название, маппируем на полное
  const typeMapping = {
    'пеший': 'Пеший туризм',
    'горный': 'Горный туризм',
    'водный': 'Водный туризм',
  };
  
  const fullType = typeMapping[tourType];
  return TOURISM_COLORS[fullType] || TOURISM_COLORS['Пеший туризм'];
};

// Общие цвета приложения
export const APP_COLORS = {
  primary: '#f8f9fa', // Светло-серый фон
  secondary: '#ffffff', // Белый
  text: '#333333', // Темный текст
  textLight: '#666666', // Светлый текст
  border: '#e5e7eb', // Легкая граница
  shadow: 'rgba(0, 0, 0, 0.1)', // Тень
};

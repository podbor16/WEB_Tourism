import axios from 'axios';

// Переменная для хранения CSRF токена
let csrfToken = null;

// Функция для получения CSRF токена из cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Базовая конфигурация axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Для отправки cookies
});

// Инициализировать CSRF токен при загрузке приложения
export const initializeCSRF = async () => {
  try {
    const response = await api.get('/account/auth/csrf_token/');
    csrfToken = response.data.csrfToken;
    console.log('CSRF токен получен и сохранён:', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Ошибка при получении CSRF токена:', error);
    // Пытаемся получить из cookies как fallback
    csrfToken = getCookie('csrftoken');
    console.log('CSRF токен из cookies:', csrfToken);
  }
};

// Interceptor для добавления CSRF токена
api.interceptors.request.use((config) => {
  // Для запросов, требующих CSRF (не GET)
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
    // Сначала пытаемся получить из cookies (самый свежий токен)
    let token = getCookie('csrftoken');
    
    // Если в cookies нет, используем сохранённый
    if (!token) {
      token = csrfToken;
    }
    
    if (token) {
      config.headers['X-CSRFToken'] = token;
      console.log('CSRF токен отправлен:', token);
    } else {
      console.warn('CSRF токен не найден!');
    }
  }
  
  return config;
});

// Error interceptor для обработки CSRF ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    // Если ошибка 403 (CSRF), переинициализируем токен и повторяем запрос
    if (response && response.status === 403 && config && !config.__retryCSRF) {
      console.log('CSRF ошибка 403, переинициализирую токен...');
      
      try {
        // Переинициализируем CSRF токен
        await initializeCSRF();
        
        // Пытаемся снова отправить запрос
        config.__retryCSRF = true;
        const newToken = getCookie('csrftoken');
        
        if (newToken) {
          config.headers['X-CSRFToken'] = newToken;
          console.log('Новый CSRF токен установлен, повторяю запрос...');
          return api.request(config);
        }
      } catch (e) {
        console.error('Ошибка при переинициализации CSRF:', e);
      }
    }
    
    return Promise.reject(error);
  }
);

// ==================== Туры ====================
export const toursAPI = {
  // Получить все туры
  getTours: (params = {}) => api.get('/tours/', { params }),

  // Получить конкретный тур
  getTourDetail: (id) => api.get(`/tours/${id}/`),
  getById: (id) => api.get(`/tours/${id}/`),

  // Получить типы туров
  getTypes: () => api.get('/tours/types/'),
  
  // Создать новый тур (только для авторизованных пользователей)
  createTour: (data) => api.post('/tours/', data),
  create: (data) => api.post('/tours/', data),
  
  // Обновить тур (PATCH для частичного обновления)
  updateTour: (id, data) => api.patch(`/tours/${id}/`, data),
  update: (id, data) => api.put(`/tours/${id}/`, data),
  
  // Удалить тур
  deleteTour: (id) => api.delete(`/tours/${id}/`),
  delete: (id) => api.delete(`/tours/${id}/`),
};

// ==================== Регистрация на туры ====================
export const toursRegistrationsAPI = {
  // Зарегистрироваться на тур
  register: (data) => api.post('/registrations/', data),

  // Получить мои регистрации
  getMyRegistrations: () => api.get('/registrations/'),

  // Отменить регистрацию
  cancel: (id) => api.delete(`/registrations/${id}/`),

  // Восстановить отменённую регистрацию
  reactivate: (id) => api.post(`/registrations/${id}/reactivate/`),
};

// ==================== Аутентификация ====================
export const authAPI = {
  // Регистрация
  register: (data) => api.post('/account/auth/register/', data),
  
  // Вход
  login: (email, password) => api.post('/account/auth/login/', { email, password }),
  
  // Выход
  logout: () => api.post('/account/auth/logout/'),
};

// ==================== Пользователь ====================
export const userAPI = {
  // Получить данные текущего пользователя
  getMe: () => api.get('/account/user/me/'),
  
  // Обновить профиль
  updateProfile: (data) => api.patch('/account/user/profile/', data),
};

export default api;

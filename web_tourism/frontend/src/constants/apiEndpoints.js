/**
 * API Endpoints Configuration
 * Base URL: http://localhost:8000/api/
 */

export const API_ENDPOINTS = {
  // Туры
  TOURS: {
    LIST: 'tours/',                    // GET - список всех туров
    DETAIL: 'tours/:id/',              // GET - подробная информация о туре
    CREATE: 'tours/',                  // POST - создать новый тур
    UPDATE: 'tours/:id/',              // PUT - обновить тур
    DELETE: 'tours/:id/',              // DELETE - удалить тур
    REGISTER: 'tours/:id/register/',   // POST - зарегистрироваться на тур
  },

  // Туристы
  TOURISTS: {
    LIST: 'tourists/',                 // GET - список туристов
    DETAIL: 'tourists/:id/',           // GET - информация о туристе
    CREATE: 'tourists/',               // POST - создать туриста
    UPDATE: 'tourists/:id/',           // PUT - обновить туриста
    DELETE: 'tourists/:id/',           // DELETE - удалить туриста
  },

  // Маршруты
  ROUTES: {
    LIST: 'routes/',                   // GET - список маршрутов
    DETAIL: 'routes/:id/',             // GET - подробная информация о маршруте
    CREATE: 'routes/',                 // POST - создать маршрут
    UPDATE: 'routes/:id/',             // PUT - обновить маршрут
    DELETE: 'routes/:id/',             // DELETE - удалить маршрут
  },

  // Регистрации на туры
  REGISTRATIONS: {
    LIST: 'tour-registrations/',       // GET - список регистраций
    DETAIL: 'tour-registrations/:id/', // GET - подробная информация о регистрации
    CREATE: 'tour-registrations/',     // POST - создать регистрацию
    UPDATE: 'tour-registrations/:id/', // PUT - обновить регистрацию
    DELETE: 'tour-registrations/:id/', // DELETE - удалить регистрацию (отписаться)
    MY: 'tour-registrations/my/',      // GET - мои регистрации
    CANCEL: 'tour-registrations/:id/cancel/', // POST - отменить регистрацию
  },

  // Пользователи и аутентификация
  AUTH: {
    LOGIN: 'auth/login/',              // POST - вход
    LOGOUT: 'auth/logout/',            // POST - выход
    REGISTER: 'auth/register/',        // POST - регистрация
    ME: 'auth/me/',                    // GET - информация о текущем пользователе
    PROFILE: 'auth/profile/',          // GET/PUT - профиль пользователя
  },

  // Профиль
  PROFILE: {
    GET: 'profile/',                   // GET - получить профиль
    UPDATE: 'profile/',                // PUT - обновить профиль
    AVATAR: 'profile/avatar/',         // POST - загрузить аватар
  },

  // CSRF токен
  CSRF: {
    GET: 'csrf/',                      // GET - получить CSRF токен
  },
};

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * Tour Types / Виды туризма
 */
export const TOUR_TYPES = {
  WALKING: 'Пеший туризм',
  MOUNTAIN: 'Горный туризм',
  WATER: 'Водный туризм',
};

/**
 * API Response Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Example API Calls
 * 
 * 1. Get all tours:
 *    GET /api/tours/
 * 
 * 2. Get tour by ID:
 *    GET /api/tours/1/
 * 
 * 3. Create new tour:
 *    POST /api/tours/
 *    Body: {
 *      name: "Эльбрус",
 *      description: "Восхождение на Эльбрус",
 *      start_date: "2024-06-01",
 *      end_date: "2024-06-10",
 *      price: 50000,
 *      type: "Горный туризм"
 *    }
 * 
 * 4. Register for tour:
 *    POST /api/tours/1/register/
 *    Body: {
 *      tourist_id: 1
 *    }
 * 
 * 5. Get my registrations:
 *    GET /api/tour-registrations/my/
 * 
 * 6. Login:
 *    POST /api/auth/login/
 *    Body: {
 *      email: "user@example.com",
 *      password: "password123"
 *    }
 * 
 * 7. Get current user:
 *    GET /api/auth/me/
 *    Headers: {
 *      Authorization: "Bearer token"
 *    }
 */

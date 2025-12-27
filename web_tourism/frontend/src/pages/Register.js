import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../api';

function Register({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Проверка паролей на фронтенде
      if (formData.password !== formData.password2) {
        setError('Пароли не совпадают');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Пароль должен быть не менее 6 символов');
        setLoading(false);
        return;
      }

      // Регистрация
      const response = await authAPI.register(formData);
      console.log('Регистрация успешна:', response.data);
      
      // После регистрации получить данные пользователя из сессии
      const userResponse = await userAPI.getMe();
      console.log('Данные пользователя:', userResponse.data);
      setUser(userResponse.data);
      navigate('/profile');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      
      // Обработка различных типов ошибок
      if (err.response?.data) {
        const errors = err.response.data;
        
        // Если это словарь ошибок валидации
        if (errors.email) {
          if (Array.isArray(errors.email)) {
            setError(errors.email[0]);
          } else {
            setError(errors.email);
          }
        } else if (errors.password2) {
          if (Array.isArray(errors.password2)) {
            setError(errors.password2[0]);
          } else {
            setError(errors.password2);
          }
        } else if (errors.password) {
          if (Array.isArray(errors.password)) {
            setError(errors.password[0]);
          } else {
            setError(errors.password);
          }
        } else if (errors.detail) {
          setError(errors.detail);
        } else if (errors.non_field_errors) {
          setError(errors.non_field_errors[0] || 'Ошибка при регистрации');
        } else {
          // Общая ошибка
          const firstError = Object.values(errors)[0];
          if (Array.isArray(firstError)) {
            setError(firstError[0]);
          } else if (typeof firstError === 'string') {
            setError(firstError);
          } else {
            setError('Ошибка при регистрации. Проверьте введённые данные');
          }
        }
      } else if (err.message === 'Network Error') {
        setError('Ошибка сети. Убедитесь, что сервер Django запущен на http://localhost:8000');
      } else {
        setError('Ошибка при регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Регистрация</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="first_name">Имя</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Иван"
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Фамилия</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Петров"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Подтверждение пароля</label>
            <input
              id="password2"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-link">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

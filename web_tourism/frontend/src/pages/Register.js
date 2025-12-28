import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../api';
import styles from './Auth.module.css';

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
      
      // После регистрации получить данные пользователя
      const userResponse = await userAPI.getMe();
      console.log('Данные пользователя:', userResponse.data);
      setUser(userResponse.data);
      navigate('/profile');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      
      // Обработка ошибок
      if (err.response?.data) {
        const errors = err.response.data;
        
        if (errors.email) {
          const emailError = Array.isArray(errors.email) ? errors.email[0] : errors.email;
          setError(emailError);
        } else if (errors.password2) {
          const pwdError = Array.isArray(errors.password2) ? errors.password2[0] : errors.password2;
          setError(pwdError);
        } else if (errors.detail) {
          setError(errors.detail);
        } else {
          const firstError = Object.values(errors)[0];
          setError(Array.isArray(firstError) ? firstError[0] : firstError || 'Ошибка при регистрации');
        }
      } else {
        setError('Ошибка при регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Регистрация</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

        <p className={styles.authLink}>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

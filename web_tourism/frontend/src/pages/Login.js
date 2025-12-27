import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, userAPI, initializeCSRF } from '../api';
import '../styles/Auth.css';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Обновляем CSRF токен перед логином (на случай если сессия была очищена)
      await initializeCSRF();
      
      try {
        const response = await authAPI.login(email, password);
        console.log('Вход успешен:', response.data);
      } catch (loginErr) {
        // Если 403 CSRF ошибка, всё равно попытаемся получить данные пользователя
        // потому что сессия могла быть создана
        if (loginErr.response?.status === 403) {
          console.warn('CSRF ошибка при login, но проверяем сессию...');
        } else {
          throw loginErr; // Другие ошибки - пробрасываем дальше
        }
      }
      
      // После входа получить данные пользователя из сессии
      const userResponse = await userAPI.getMe();
      console.log('Данные пользователя:', userResponse.data);
      
      if (userResponse.data && userResponse.data.id) {
        // Пользователь авторизован
        setUser(userResponse.data);
        navigate('/profile');
      } else {
        // Пользователь не авторизован
        setError('Неверный email или пароль');
      }
    } catch (err) {
      console.error('Ошибка входа:', err);
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вход</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Загрузка...' : 'Вход'}
          </button>
        </form>

        <p className="auth-link">
          Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

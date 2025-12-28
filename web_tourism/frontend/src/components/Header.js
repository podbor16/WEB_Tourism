import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, initializeCSRF } from '../api';
import './Header.css';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const [showToursDropdown, setShowToursDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await authAPI.logout();
      console.log('Выход успешен:', response.data);
      
      // После logout получаем новый CSRF токен для следующих запросов
      await initializeCSRF();
      
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе (полная ошибка):', error);
      console.error('Ответ сервера:', error.response?.data);
      console.error('Статус:', error.response?.status);
      // Даже если есть ошибка, очищаем локальное состояние
      setUser(null);
      navigate('/');
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src="/static/image/logo.png" alt="Web Tourism" className="logo-img" />
        </Link>
        
        <div className="nav-center">

          <Link to="/" className="nav-link">Главная</Link>

          <div className="dropdown-container">
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => setShowToursDropdown(!showToursDropdown)}
            >
              Туры ▼
            </button>
            {showToursDropdown && (
              <div className="dropdown-menu">
                <Link 
                  to="/tourism/walking" 
                  className="dropdown-item"
                  onClick={() => setShowToursDropdown(false)}
                >
                  Пеший туризм
                </Link>
                <Link 
                  to="/tourism/mountain" 
                  className="dropdown-item"
                  onClick={() => setShowToursDropdown(false)}
                >
                  Горный туризм
                </Link>
                <Link 
                  to="/tourism/water" 
                  className="dropdown-item"
                  onClick={() => setShowToursDropdown(false)}
                >
                  Водный туризм
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/media" className="nav-link">Медиа</Link>
          <Link to="/contacts" className="nav-link">Контакты</Link>
          
          {user && (
            <Link to="/my-registrations" className="nav-link">Мои регистрации</Link>
          )}
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <Link to="/profile" className="nav-link">Профиль</Link>
              {user.is_staff && (
                <Link to="/admin/tours" className="nav-link" title="Управление турами">
                  ⚙️ Туры
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-logout">
                Выход
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-login">
                Вход
              </Link>
              <Link to="/register" className="btn btn-register">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI, toursRegistrationsAPI } from '../api';
import styles from './RouteDetail.module.css';

const RouteDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const routeDescriptions = { };

  useEffect(() => {
    fetchTour();
    checkRegistration();
  }, [id, user]);

  const fetchTour = async () => {
    try {
      const response = await toursAPI.getById(id);
      setTour(response.data);
    } catch (err) {
      console.error('Ошибка при загрузке тура:', err);
      setError('Тур не найден');
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    if (!user) return;
    try {
      const response = await toursRegistrationsAPI.getMyRegistrations();
      const isRegistered = response.data.some(reg => reg.tour === parseInt(id));
      setRegistered(isRegistered);
    } catch (err) {
      console.error('Ошибка при проверке регистрации:', err);
    }
  };

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Переходим на страницу заполнения формы регистрации
    navigate(`/tours/${id}/register`);
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка маршрута...</div>;
  }

  if (error && !tour) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!tour) {
    return <div className={styles.error}>Маршрут не найден</div>;
  }

  const routeData = routeDescriptions[tour.id] || {};

  // Используем изображение из API если есть, иначе fallback на hardcoded
  let mainImage = tour.image || routeData.images?.[0] || '/static/image/mountain_main.png';
  const galleryImages = routeData.images?.slice(1) || [];

  // Функция для форматирования описания (сохранение переносов)
  const formatDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        {idx < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Функция для получения названия сложности
  const getDifficultyName = (difficulty) => {
    const names = {
      'easy': 'Легкий',
      'medium': 'Средний',
      'hard': 'Сложный'
    };
    return names[difficulty] || 'Средний';
  };

  return (
    <div className={styles.routeContainer}>
      {/* Hero Section с информационными плашками */}
      <section className={styles.heroSection}>
        <img
          src={mainImage}
          alt={tour.name}
          className={styles.heroImage}
          onError={(e) => {
            e.target.src = '/static/image/mountain_main.png';
          }}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>{routeData.title || tour.name}</h1>

            {/* Информационные плашки */}
            <div className={styles.infoPlates}>
              {/* Даты */}
              <div className={styles.infoPlate}>
                <div className={styles.plateName}>📅 Даты</div>
                <div className={styles.plateValue}>
                  {new Date(tour.start_date).toLocaleDateString('ru-RU')}
                  {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
                </div>
              </div>

              {/* Сложность */}
              {tour.difficulty && (
                <div className={styles.infoPlate}>
                  <div className={styles.plateName}>⚡ Сложность</div>
                  <div className={styles.plateValue}>{getDifficultyName(tour.difficulty)}</div>
                </div>
              )}

              {/* Минимальный возраст */}
              {tour.min_age > 0 && (
                <div className={styles.infoPlate}>
                  <div className={styles.plateName}>👤 Возраст</div>
                  <div className={styles.plateValue}>с {tour.min_age} лет</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className={styles.descriptionSection}>
        <div className={styles.content}>
          <div className={styles.mainDescription}>{formatDescription(routeData.description || tour.description)}</div>
          {routeData.fullDescription && (
            <div className={styles.fullDescription}>{formatDescription(routeData.fullDescription)}</div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {galleryImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Фото ${idx + 1}`} className={styles.galleryImage} />
            ))}
          </div>
        </section>
      )}

      {/* Route Info */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3>💰 Стоимость</h3>
          <p>{tour.price ? `${tour.price} ₽` : 'По запросу'}</p>
        </div>
        <div className={styles.infoCard}>
          <h3>📅 Даты</h3>
          <p>
            {new Date(tour.start_date).toLocaleDateString('ru-RU')}
            {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
          </p>
        </div>
        <div className={styles.infoCard}>
          <h3>🎯 Тип</h3>
          <p>{tour.type}</p>
        </div>
      </section>

      {/* Features */}
      {routeData.features && (
        <section className={styles.featuresSection}>
          <h2>Что входит в маршрут</h2>
          <ul className={styles.featuresList}>
            {routeData.features.map((feature, idx) => (
              <li key={idx}>
                <span className={styles.checkmark}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {routeData.benefits && (
        <section className={styles.benefitsSection}>
          <h2>Преимущества маршрута</h2>
          <ul className={styles.benefitsList}>
            {routeData.benefits.map((benefit, idx) => (
              <li key={idx}>
                <span className={styles.bulletPoint}>●</span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Registration Button */}
      <section className={styles.registrationSection}>
        <button
          className={styles.registerButton}
          onClick={handleRegister}
          disabled={registering}
        >
          {registering ? 'Загрузка...' : 'Зарегистрироваться на тур'}
        </button>
        {!user && (
          <p className={styles.loginPrompt}>
            <a href="/login">Войдите</a> чтобы зарегистрироваться
          </p>
        )}
      </section>

      {/* Back Button */}
      <div className={styles.backButton}>
        <button onClick={() => navigate(-1)}>← Назад</button>
      </div>
    </div>
  );
};

export default RouteDetail;

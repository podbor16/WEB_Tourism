import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI, toursRegistrationsAPI, initializeCSRF } from '../api';
import styles from './TourRegistrationForm.module.css';

function TourRegistrationForm({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Участник формы
  const [participant, setParticipant] = useState({
    participant_first_name: '',
    participant_last_name: '',
    participant_birth_date: '',
    participant_phone: '',
    participant_email: '',
    participant_city: '',
  });

  useEffect(() => {
    fetchTourData();
    // Инициализируем форму данными из профиля пользователя
    if (user && user.profile) {
      setParticipant({
        participant_first_name: user.first_name || '',
        participant_last_name: user.last_name || '',
        participant_birth_date: user.profile.birth_date || '',
        participant_phone: user.profile.phone_number || '',
        participant_email: user.email || '',
        participant_city: user.profile.city || '',
      });
    }
  }, [user, id]);

  const fetchTourData = async () => {
    try {
      setLoading(true);
      const response = await toursAPI.getTourDetail(id);
      setTour(response.data);
    } catch (err) {
      console.error('Ошибка при загрузке маршрута:', err);
      setError('Не удалось загрузить информацию о маршруте');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Вычисляем возраст участника
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем возраст
    if (tour && tour.min_age > 0) {
      const age = calculateAge(participant.participant_birth_date);
      if (age < tour.min_age) {
        setError(`Минимальный возраст для этого маршрута: ${tour.min_age} лет. Ваш возраст: ${age} лет`);
        return;
      }
    }

    // Проверяем обязательные поля
    if (!participant.participant_first_name || !participant.participant_last_name || !participant.participant_birth_date ||
        !participant.participant_phone || !participant.participant_email || !participant.participant_city) {
      setError('Заполните все обязательные поля');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      await initializeCSRF();

      // Отправляем регистрацию
      const registrationData = {
        tour: id,
        participant_first_name: participant.participant_first_name,
        participant_last_name: participant.participant_last_name,
        participant_birth_date: participant.participant_birth_date,
        participant_phone: participant.participant_phone,
        participant_email: participant.participant_email,
        participant_city: participant.participant_city,
      };

      await toursRegistrationsAPI.register(registrationData);

      setSuccess('✓ Вы успешно зарегистрированы на маршрут!');

      // Перенаправляем в профиль через 2 секунды
      setTimeout(() => {
        navigate('/my-registrations');
      }, 2000);
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      const errorMsg = err.response?.data?.detail || 'Ошибка при регистрации на маршрут';
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loadingMessage}>Загрузка информации о маршруте...</div>;
  }

  if (!tour) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>Маршрут не найден</p>
        <button onClick={() => navigate('/tours')} className={styles.backButton}>
          ← Вернуться к маршрутам
        </button>
      </div>
    );
  }

  const age = calculateAge(participant.participant_birth_date);
  const canRegister = !tour.min_age || age >= tour.min_age;

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Регистрация на маршрут</h1>

        <div className={styles.tourInfo}>
          <h2>{tour.name}</h2>
          <p className={styles.dates}>
            📅 {new Date(tour.start_date).toLocaleDateString('ru-RU')} — {new Date(tour.end_date || tour.start_date).toLocaleDateString('ru-RU')}
          </p>
          {tour.min_age > 0 && (
            <p className={styles.ageRequirement}>
              ⚠️ Минимальный возраст: {tour.min_age} лет
            </p>
          )}
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        {!canRegister && (
          <div className={styles.warningMessage}>
            ⛔ Вы не можете зарегистрироваться на этот маршрут, так как не достигли минимального возраста.
            (Ваш возраст: {age} лет, требуется: {tour.min_age} лет)
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h3>Информация об участнике</h3>
            <p className={styles.hint}>Поля заполнены данными из вашего профиля. Отредактируйте при необходимости.</p>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="last_name">Фамилия *</label>
                <input
                  id="last_name"
                  type="text"
                  name="participant_last_name"
                  value={participant.participant_last_name}
                  onChange={handleChange}
                  placeholder="Петров"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="first_name">Имя *</label>
                <input
                  id="first_name"
                  type="text"
                  name="participant_first_name"
                  value={participant.participant_first_name}
                  onChange={handleChange}
                  placeholder="Иван"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="birth_date">Дата рождения *</label>
              <input
                id="birth_date"
                type="date"
                name="participant_birth_date"
                value={participant.participant_birth_date}
                onChange={handleChange}
                required
              />
              {participant.participant_birth_date && (
                <p className={styles.ageInfo}>
                  Ваш возраст: {age} лет
                  {tour.min_age > 0 && (
                    <span style={{marginLeft: '10px', color: canRegister ? '#22c55e' : '#dc3545'}}>
                      {canRegister ? '✓ Подходит' : '✗ Не подходит'}
                    </span>
                  )}
                </p>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone_number">Номер телефона *</label>
                <input
                  id="phone_number"
                  type="tel"
                  name="participant_phone"
                  value={participant.participant_phone}
                  onChange={handleChange}
                  placeholder="9001234567"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="participant_email"
                  value={participant.participant_email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">Населенный пункт *</label>
              <input
                id="city"
                type="text"
                name="participant_city"
                value={participant.participant_city}
                onChange={handleChange}
                placeholder="Москва"
                required
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting || !canRegister}
            >
              {submitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(`/tours/${id}`)}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TourRegistrationForm;


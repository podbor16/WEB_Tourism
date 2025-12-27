import React, { useEffect, useState } from 'react';
import { registrationsAPI } from '../api';
import styles from './MyRegistrations.module.css';

function MyRegistrations({ user }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationsAPI.getMy();
      setRegistrations(response.data.results || response.data);
    } catch (err) {
      setError('Ошибка при загрузке регистраций');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Вы уверены, что хотите отменить регистрацию?')) {
      try {
        await registrationsAPI.cancel(id);
        setRegistrations(registrations.map(reg =>
          reg.id === id ? { ...reg, status: 'cancelled' } : reg
        ));
      } catch (err) {
        alert('Ошибка при отмене регистрации');
        console.error(err);
      }
    }
  };

  const handleReactivate = async (id) => {
    try {
      await registrationsAPI.reactivate(id);
      setRegistrations(registrations.map(reg =>
        reg.id === id ? { ...reg, status: 'pending' } : reg
      ));
    } catch (err) {
      alert('Ошибка при восстановлении регистрации');
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loadingMessage}>Загрузка регистраций...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  const getTourTypeClass = (tourType) => {
    if (!tourType) return '';
    if (tourType.includes('Пеший')) return styles.typeWalking;
    if (tourType.includes('Горный')) return styles.typeMountain;
    if (tourType.includes('Водный')) return styles.typeWater;
    return '';
  };

  return (
    <div className={styles.registrationsContainer}>
      <div className={styles.registrationsHeader}>
        <h1>Мои регистрации на туры</h1>
      </div>

      {registrations.length > 0 ? (
        <div className={styles.registrationsList}>
          {registrations.map(registration => (
            <div key={registration.id} className={styles.registrationCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.tourName}>{registration.tour_name}</h2>
                {registration.tour_type && (
                  <span className={`${styles.tourType} ${getTourTypeClass(registration.tour_type)}`}>
                    {registration.tour_type}
                  </span>
                )}
              </div>

              <div className={styles.cardDetails}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Дата регистрации</div>
                  <div className={styles.detailValue}>
                    {new Date(registration.registration_date).toLocaleDateString('ru-RU')}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Статус</div>
                  <div className={styles.detailValue}>
                    {registration.status === 'pending' && 'Ожидание'}
                    {registration.status === 'confirmed' && 'Подтверждено'}
                    {registration.status === 'cancelled' && 'Отменено'}
                  </div>
                </div>
              </div>

              <div className={styles.cardActions}>
                {registration.status !== 'cancelled' ? (
                  <button
                    onClick={() => handleCancel(registration.id)}
                    className={styles.cancelButton}
                  >
                    Отменить регистрацию
                  </button>
                ) : (
                  <button
                    onClick={() => handleReactivate(registration.id)}
                    className={styles.viewButton}
                  >
                    Восстановить
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📋</div>
          <p className={styles.emptyStateText}>
            У вас нет регистраций на туры
          </p>
          <a href="/tours" className={styles.emptyStateButton}>Найти тур</a>
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;

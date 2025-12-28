import React, { useEffect, useState } from 'react';
import { toursRegistrationsAPI } from '../api';
import styles from './MyRegistrations.module.css';

function MyRegistrations({ user }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReg, setSelectedReg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await toursRegistrationsAPI.getMyRegistrations();
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
        await toursRegistrationsAPI.cancel(id);
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
      await toursRegistrationsAPI.reactivate(id);
      setRegistrations(registrations.map(reg =>
        reg.id === id ? { ...reg, status: 'pending' } : reg
      ));
    } catch (err) {
      alert('Ошибка при восстановлении регистрации');
      console.error(err);
    }
  };

  const openDetails = (registration) => {
    setSelectedReg(registration);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReg(null);
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
                <button
                  onClick={() => openDetails(registration)}
                  className={styles.viewButton}
                >
                  Подробнее
                </button>
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

      {/* МОДАЛЬНОЕ ОКНО С ДЕТАЛЯМИ */}
      {showModal && selectedReg && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>✕</button>

            <h2>Детали регистрации</h2>

            <div className={styles.modalSection}>
              <h3>Информация о маршруте</h3>
              <div className={styles.modalField}>
                <label>Название маршрута:</label>
                <p>{selectedReg.tour_name}</p>
              </div>
              <div className={styles.modalField}>
                <label>Тип маршрута:</label>
                <p>{selectedReg.tour_type}</p>
              </div>
              <div className={styles.modalField}>
                <label>Дата регистрации:</label>
                <p>{new Date(selectedReg.registration_date).toLocaleDateString('ru-RU')}</p>
              </div>
              <div className={styles.modalField}>
                <label>Статус:</label>
                <p>
                  {selectedReg.status === 'pending' && 'Ожидание'}
                  {selectedReg.status === 'confirmed' && 'Подтверждено'}
                  {selectedReg.status === 'cancelled' && 'Отменено'}
                </p>
              </div>
            </div>

            <div className={styles.modalSection}>
              <h3>Данные участника</h3>
              <div className={styles.modalField}>
                <label>Фамилия:</label>
                <p>{selectedReg.participant_last_name}</p>
              </div>
              <div className={styles.modalField}>
                <label>Имя:</label>
                <p>{selectedReg.participant_first_name}</p>
              </div>
              <div className={styles.modalField}>
                <label>Дата рождения:</label>
                <p>{new Date(selectedReg.participant_birth_date).toLocaleDateString('ru-RU')}</p>
              </div>
              <div className={styles.modalField}>
                <label>Телефон:</label>
                <p>{selectedReg.participant_phone}</p>
              </div>
              <div className={styles.modalField}>
                <label>Email:</label>
                <p>{selectedReg.participant_email}</p>
              </div>
              <div className={styles.modalField}>
                <label>Населённый пункт:</label>
                <p>{selectedReg.participant_city}</p>
              </div>
            </div>

            <button className={styles.modalCloseButton} onClick={closeModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;

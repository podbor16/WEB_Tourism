import React, { useEffect, useState } from 'react';
import { userAPI, initializeCSRF } from '../api';
import styles from './Profile.module.css';

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({
    gender: '',
    city: '',
    birth_date: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        gender: user.profile.gender || '',
        city: user.profile.city || '',
        birth_date: user.profile.birth_date || '',
        phone_number: user.profile.phone_number || '',
      });
    }
    setLoading(false);
  }, [user]);

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
      setSaving(true);
      setError('');
      setSuccess('');
      
      // Обновляем CSRF токен перед отправкой формы
      await initializeCSRF();
      
      try {
        const response = await userAPI.updateProfile(formData);
        setSuccess('Профиль успешно обновлен');
        // Обновляем user
        setUser({
          ...user,
          profile: response.data.data
        });
      } catch (updateErr) {
        // Если 403 CSRF ошибка, пытаемся снова с новым токеном
        if (updateErr.response?.status === 403) {
          console.warn('CSRF ошибка при обновлении профиля, переполучаем токен...');
          await initializeCSRF();
          // Повторная попытка
          const retryResponse = await userAPI.updateProfile(formData);
          setSuccess('Профиль успешно обновлен');
          setUser({
            ...user,
            profile: retryResponse.data.data
          });
        } else {
          throw updateErr;
        }
      }
    } catch (err) {
      console.error('Ошибка при сохранении профиля:', err);
      setError('Ошибка при сохранении профиля');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loadingMessage}>Загрузка профиля...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Мой профиль</h1>
        <p className={styles.userInfo}>
          {user.first_name && user.last_name && `${user.first_name} ${user.last_name} • `}
          {user.email}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="gender">Пол</label>
          <select
            id="gender"
            name="gender"
            className={styles.formSelect}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Не указано</option>
            <option value="M">Мужской</option>
            <option value="F">Женский</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="city">Город</label>
          <input
            id="city"
            type="text"
            name="city"
            className={styles.formInput}
            value={formData.city}
            onChange={handleChange}
            placeholder="Москва"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="birth_date">Дата рождения</label>
          <input
            id="birth_date"
            type="date"
            name="birth_date"
            className={styles.formInput}
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="phone_number">Телефон</label>
          <input
            id="phone_number"
            type="tel"
            name="phone_number"
            className={styles.formInput}
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="9001234567"
            maxLength="10"
          />
        </div>

        <button type="submit" className={styles.formButton} disabled={saving}>
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
}

export default Profile;

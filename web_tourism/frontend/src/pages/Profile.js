import React, { useEffect, useState } from 'react';
import { userAPI, initializeCSRF } from '../api';
import styles from './Profile.module.css';

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({
    gender: '',
    city: '',
    birth_date: '',
    country_code: '+7',
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
        country_code: user.profile.country_code || '+7',
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

      {/* Profile Form */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Личная информация</h3>
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
            <label className={styles.formLabel}>Телефон</label>
            <div className={styles.phoneInputGroup}>
              <select
                name="country_code"
                className={styles.countrySelect}
                value={formData.country_code}
                onChange={handleChange}
              >
                <option value="+7">Россия (+7)</option>
                <option value="+1">USA/Canada (+1)</option>
                <option value="+44">UK (+44)</option>
                <option value="+49">Germany (+49)</option>
                <option value="+33">France (+33)</option>
                <option value="+39">Italy (+39)</option>
                <option value="+34">Spain (+34)</option>
                <option value="+31">Netherlands (+31)</option>
                <option value="+43">Austria (+43)</option>
                <option value="+41">Switzerland (+41)</option>
                <option value="+32">Belgium (+32)</option>
                <option value="+46">Sweden (+46)</option>
                <option value="+47">Norway (+47)</option>
                <option value="+45">Denmark (+45)</option>
                <option value="+358">Finland (+358)</option>
                <option value="+48">Poland (+48)</option>
                <option value="+420">Czech Republic (+420)</option>
                <option value="+36">Hungary (+36)</option>
                <option value="+40">Romania (+40)</option>
                <option value="+30">Greece (+30)</option>
                <option value="+90">Turkey (+90)</option>
              </select>
              <input
                type="tel"
                name="phone_number"
                className={styles.phoneInput}
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="9001234567"
                maxLength="15"
              />
            </div>
            <small className={styles.hint}>Формат: 10-15 цифр без пробелов и символов</small>
          </div>

          <button type="submit" className={styles.formButton} disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

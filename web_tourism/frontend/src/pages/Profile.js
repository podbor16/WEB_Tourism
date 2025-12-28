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
  const [userDataForm, setUserDataForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUserData, setEditingUserData] = useState(false);


  useEffect(() => {
    if (user?.profile) {
      setFormData({
        gender: user.profile.gender || '',
        city: user.profile.city || '',
        birth_date: user.profile.birth_date || '',
        country_code: user.profile.country_code || '+7',
        phone_number: user.profile.phone_number || '',
      });
      setUserDataForm({
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
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

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveUserData = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Проверка на уникальность email если он изменился
      if (userDataForm.email !== user.email) {
        try {
          const response = await userAPI.checkEmailAvailability(userDataForm.email);
          if (!response.data.available) {
            setError('Пользователь с таким email уже существует');
            setSaving(false);
            return;
          }
        } catch (err) {
          console.error('Ошибка при проверке email:', err);
        }
      }

      await initializeCSRF();

      // Отправляем обновления
      const updateData = {
        first_name: userDataForm.first_name,
        last_name: userDataForm.last_name,
        email: userDataForm.email,
      };

      // Для email нужен отдельный запрос или включение в updateProfile
      const response = await userAPI.updateUserData(updateData);
      setSuccess('Основная информация успешно обновлена');

      setUser({
        ...user,
        ...response.data
      });
      setEditingUserData(false);
    } catch (err) {
      console.error('Ошибка при сохранении:', err);
      setError(err.response?.data?.detail || 'Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
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

      {/* Основные данные пользователя */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Основная информация</h3>
          {!editingUserData && (
            <button
              type="button"
              onClick={() => setEditingUserData(true)}
              className={styles.editButton}
            >
              Редактировать
            </button>
          )}
        </div>

        {editingUserData ? (
          <form onSubmit={handleSaveUserData}>
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="first_name">Имя</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                className={styles.formInput}
                value={userDataForm.first_name}
                onChange={handleUserDataChange}
                placeholder="Иван"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="last_name">Фамилия</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                className={styles.formInput}
                value={userDataForm.last_name}
                onChange={handleUserDataChange}
                placeholder="Иванов"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className={styles.formInput}
                value={userDataForm.email}
                onChange={handleUserDataChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.formButton} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setEditingUserData(false)}
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.staticInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Имя:</span>
              <span className={styles.infoValue}>{user.first_name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Фамилия:</span>
              <span className={styles.infoValue}>{user.last_name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{user.email}</span>
            </div>
          </div>
        )}
      </div>

      {/* Личная информация */}
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
            <label className={styles.formLabel} htmlFor="phone_number">Телефон</label>
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

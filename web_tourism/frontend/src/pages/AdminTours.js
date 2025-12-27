import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI, userAPI } from '../api';
import styles from './AdminTours.module.css';

const AdminTours = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tours, setTours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    price: '',
    type: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const tourTypes = ['Пеший туризм', 'Горный туризм', 'Водный туризм'];

  useEffect(() => {
    // Проверяем статус пользователя
    const checkPermissions = async () => {
      try {
        const response = await userAPI.getMe();
        setUser(response.data);
        
        // Если пользователь не staff, редиректим на главную
        if (!response.data.is_staff) {
          navigate('/');
          return;
        }
        
        fetchTours();
      } catch (err) {
        console.error('Ошибка при проверке прав:', err);
        navigate('/');
      }
    };
    
    checkPermissions();
  }, [navigate]);

  const fetchTours = async () => {
    try {
      const response = await toursAPI.getTours();
      setTours(response.data.results || response.data || []);
    } catch (err) {
      console.error('Ошибка при загрузке туров:', err);
      setError('Ошибка при загрузке туров');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация
    if (!formData.name.trim()) {
      setError('Введите название тура');
      return;
    }
    if (!formData.start_date) {
      setError('Выберите дату начала');
      return;
    }
    if (!formData.type) {
      setError('Выберите тип тура');
      return;
    }

    try {
      if (editingTour) {
        // Обновление существующего тура
        const response = await toursAPI.updateTour(editingTour.id, formData);
        setTours(tours.map(t => t.id === editingTour.id ? response.data : t));
        setSuccess('Тур успешно обновлён');
      } else {
        // Создание нового тура
        const response = await toursAPI.createTour(formData);
        setTours([...tours, response.data]);
        setSuccess('Тур успешно добавлен');
      }

      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.response?.data?.detail || 'Ошибка при сохранении тура');
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      description: tour.description || '',
      start_date: tour.start_date,
      end_date: tour.end_date || '',
      price: tour.price || '',
      type: tour.type,
    });
    setShowForm(true);
  };

  const handleDelete = async (tourId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот тур?')) {
      return;
    }

    try {
      await toursAPI.deleteTour(tourId);
      setTours(tours.filter(t => t.id !== tourId));
      setSuccess('Тур успешно удалён');
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Ошибка при удалении тура');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      price: '',
      type: '',
    });
    setEditingTour(null);
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка туров...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Управление турами</h1>

      {error && <div className={styles.alert + ' ' + styles.error}>{error}</div>}
      {success && <div className={styles.alert + ' ' + styles.success}>{success}</div>}

      <button 
        className={styles.addButton}
        onClick={() => {
          resetForm();
          setShowForm(!showForm);
        }}
      >
        {showForm ? '✕ Закрыть форму' : '+ Добавить новый тур'}
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <h2>{editingTour ? 'Редактировать тур' : 'Добавить новый тур'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Название тура *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Например: Красноярские столбы"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Опишите маршрут..."
                rows={4}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Дата начала *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Дата окончания</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Тип тура *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="">Выберите тип</option>
                  {tourTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Стоимость (₽)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1500"
                  step="0.01"
                />
              </div>
            </div>

            <div className={styles.formButtons}>
              <button type="submit" className={styles.submitButton}>
                {editingTour ? 'Обновить тур' : 'Добавить тур'}
              </button>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.toursGrid}>
        {tours.length === 0 ? (
          <p className={styles.noTours}>Туры не добавлены</p>
        ) : (
          tours.map(tour => (
            <div key={tour.id} className={styles.tourCard}>
              <div className={styles.tourHeader}>
                <h3>{tour.name}</h3>
                <span className={styles.tourType}>{tour.type}</span>
              </div>

              <div className={styles.tourBody}>
                {tour.description && (
                  <p className={styles.description}>
                    {tour.description.substring(0, 100)}...
                  </p>
                )}

                <div className={styles.tourDetails}>
                  <div>
                    <strong>Начало:</strong>
                    <br />
                    {new Date(tour.start_date).toLocaleDateString('ru-RU')}
                  </div>
                  {tour.end_date && (
                    <div>
                      <strong>Окончание:</strong>
                      <br />
                      {new Date(tour.end_date).toLocaleDateString('ru-RU')}
                    </div>
                  )}
                  {tour.price && (
                    <div>
                      <strong>Стоимость:</strong>
                      <br />
                      {tour.price} ₽
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.tourActions}>
                <button 
                  className={styles.editButton}
                  onClick={() => handleEdit(tour)}
                >
                  ✏️ Редактировать
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(tour.id)}
                >
                  🗑️ Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTours;

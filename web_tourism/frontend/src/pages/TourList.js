import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toursAPI } from '../api';
import styles from './TourList.module.css';

function TourList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Иконки для разных типов туризма
  const typeIcons = {
    'Пешеходный туризм': '🥾',
    'Горный туризм': '⛰️',
    'Водный туризм': '🚣',
    // 'Пешем': '🥾',
    // 'Горном': '⛰️',
    // 'Водном': '🚣',
  };

  // Изображения по умолчанию для каждого типа
  const typeImages = {
    'Пешеходный туризм': '/static/image/peshiy.png',
    'Горный туризм': '/static/image/mountain_main.png',
    'Водный туризм': '/static/image/vodniy.png',
    // 'Пешем': '/static/image/peshiy.png',
    // 'Горном': '/static/image/mountain_main.png',
    // 'Водном': '/static/image/vodniy.png',
  };

  // Функция для получения цвета по типу туризма
  const getTourTypeColor = (type) => {
    const colors = {
      'Пеший туризм': '#22c55e',
      'Горный туризм': '#8b7355',
      'Водный туризм': '#3b82f6',
    };
    return colors[type] || '#57534e';
  };

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedType) {
        params.type = selectedType;
      }
      const response = await toursAPI.getTours(params);
      const toursData = response.data.results || response.data;
      
      // Фильтрация по поисковому запросу
      let filtered = toursData;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = toursData.filter(tour => 
          (tour.name && tour.name.toLowerCase().includes(query)) ||
          (tour.description && tour.description.toLowerCase().includes(query))
        );
      }
      
      setTours(filtered);
    } catch (err) {
      setError('Ошибка при загрузке туров');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedType, searchQuery]);

  const fetchTypes = useCallback(async () => {
    try {
      const response = await toursAPI.getTypes();
      setTypes(response.data.types || response.data || []);
    } catch (err) {
      console.error('Ошибка при загрузке типов туров:', err);
    }
  }, []);

  useEffect(() => {
    fetchTours();
    fetchTypes();
  }, [selectedType, searchQuery, fetchTours, fetchTypes]);

  if (loading) return <div className={styles.loading}>Загрузка туров...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <section className={styles.pageHeader}>
        <h1>🗺️ Доступные маршруты</h1>
        <p>Выбери маршрут, который тебе по душе</p>
      </section>
      
      <div className={styles.filtersSection}>
        {/*<input*/}
        {/*  type="text"*/}
        {/*  placeholder="Поиск по названию маршрута..."*/}
        {/*  className={styles.searchInput}*/}
        {/*  value={searchQuery}*/}
        {/*  onChange={(e) => setSearchQuery(e.target.value)}*/}
        {/*/>*/}
        <label htmlFor="type-filter">Фильтр по типу:</label>
        <select 
          id="type-filter"
          value={selectedType} 
          onChange={(e) => {
            setSelectedType(e.target.value);
            if (e.target.value) {
              setSearchParams({ type: e.target.value });
            } else {
              setSearchParams({});
            }
          }}
          className={styles.filterSelect}
        >
          <option value="">Все маршруты</option>
          {types && types.map(type => (
            <option key={type} value={type}>
              {typeIcons[type] || '🥾'} {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tourGrid}>
        {tours.length > 0 ? (
          tours.map(tour => (
            <Link key={tour.id} to={`/tours/${tour.id}`} className={styles.tourCardLink}>
              <div className={styles.tourCard}>
                <div className={styles.tourImageContainer}>
                  <img 
                    src={tour.image || typeImages[tour.type] || '/static/image/mountain_main.png'} 
                    alt={tour.name} 
                    className={styles.tourImage}
                    onError={(e) => {
                      e.target.src = typeImages[tour.type] || '/static/image/mountain_main.png';
                    }}
                  />
                  <div className={styles.tourTypeBadge}>
                    {typeIcons[tour.type] || '🥾'} {tour.type}
                  </div>
                </div>
                <div className={styles.tourContent}>
                  <h3>{tour.name}</h3>
                  {tour.description && (
                    <p className={styles.tourDescription}>
                      {tour.description.substring(0, 100)}...
                    </p>
                  )}
                  <div className={styles.tourMeta}>
                    {tour.start_date && (
                      <div className={styles.metaItem}>
                        <span className={styles.metaIcon}>📅</span>
                        <span>{new Date(tour.start_date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    )}
                    {tour.end_date && (
                      <div className={styles.metaItem}>
                        <span className={styles.metaIcon}>📆</span>
                        <span>{new Date(tour.end_date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    )}
                  </div>
                  {tour.price && (
                    <div className={styles.priceBadge}>💰 {tour.price} ₽</div>
                  )}
                </div>
                <div className={styles.tourFooter}>
                  <button className={styles.btnDetails}>Подробнее →</button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noToursMessage}>
            <p>😔 Туры не найдены</p>
            <p>Попробуйте выбрать другой фильтр или поисковой запрос</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourList;

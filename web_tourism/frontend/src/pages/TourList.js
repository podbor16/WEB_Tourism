import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toursAPI } from '../api';
import '../styles/TourList.css';

function TourList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Иконки для разных типов туризма
  const typeIcons = {
    'Пешеходный туризм': '🥾',
    'Горный туризм': '⛰️',
    'Водный туризм': '🚣',
  };

  // Изображения по умолчанию для каждого типа
  const typeImages = {
    'Пешеходный туризм': '/static/image/peshiy.png',
    'Горный туризм': '/static/image/mountain_main.png',
    'Водный туризм': '/static/image/vodniy.png',
  };

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      const params = selectedType ? { type: selectedType } : {};
      const response = await toursAPI.getTours(params);
      setTours(response.data.results || response.data);
    } catch (err) {
      setError('Ошибка при загрузке туров');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedType]);

  const fetchTypes = useCallback(async () => {
    try {
      const response = await toursAPI.getTypes();
      setTypes(response.data.types || []);
    } catch (err) {
      console.error('Ошибка при загрузке типов туров:', err);
    }
  }, []);

  useEffect(() => {
    fetchTours();
    fetchTypes();
  }, [selectedType, fetchTours, fetchTypes]);

  if (loading) return <div className="loading">Загрузка туров...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tour-list-page">
      <section className="page-header">
        <h1>🗺️ Доступные маршруты</h1>
        <p>Выбери маршрут, который тебе по душе</p>
      </section>
      
      <div className="filters-section">
        <label htmlFor="type-filter">Фильтр по типу туризма:</label>
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
          className="filter-select"
        >
          <option value="">Все маршруты</option>
          {types.map(type => (
            <option key={type} value={type}>
              {typeIcons[type] || '📍'} {type}
            </option>
          ))}
        </select>
      </div>

      <div className="tour-grid">
        {tours.length > 0 ? (
          tours.map(tour => (
            <Link key={tour.id} to={`/tours/${tour.id}`} className="tour-card-link">
              <div className="tour-card">
                <div className="tour-image-container">
                  <img 
                    src={tour.image || typeImages[tour.type] || '/static/image/mountain_main.png'} 
                    alt={tour.name} 
                    className="tour-image" 
                    onError={(e) => e.target.src = typeImages[tour.type] || '/static/image/mountain_main.png'}
                  />
                  <div className="tour-type-badge">
                    {typeIcons[tour.type] || '📍'} {tour.type}
                  </div>
                </div>
                <div className="tour-content">
                  <h3>{tour.name}</h3>
                  {tour.description && (
                    <p className="tour-description">
                      {tour.description.substring(0, 100)}...
                    </p>
                  )}
                  <div className="tour-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span>{new Date(tour.start_date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    {tour.end_date && (
                      <div className="meta-item">
                        <span className="meta-icon">📆</span>
                        <span>{new Date(tour.end_date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    )}
                  </div>
                  {tour.price && (
                    <div className="price-badge">💰 {tour.price} ₽</div>
                  )}
                </div>
                <div className="tour-footer">
                  <button className="btn-details">Подробнее →</button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-tours-message">
            <p>😔 Туры не найдены</p>
            <p>Попробуйте выбрать другой фильтр</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourList;

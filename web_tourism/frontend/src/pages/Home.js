import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI } from '../api';
import Calendar from '../components/Calendar';
import styles from './Home.module.css';

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularTours();
    // Обновляем популярные туры каждые 30 секунд
    const interval = setInterval(fetchPopularTours, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPopularTours = async () => {
    try {
      const response = await toursAPI.getPopular();
      const toursData = response.data.results || response.data;
      setTours(Array.isArray(toursData) ? toursData : []);
    } catch (err) {
      console.error('Ошибка при загрузке популярных туров:', err);
      // Fallback на обычные туры если популярные не доступны
      try {
        const response = await toursAPI.getTours();
        const toursData = Array.isArray(response.data.results) ? response.data.results : response.data;
        setTours(toursData.slice(0, 3));
      } catch (e) {
        setTours([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Типы туризма с иконками
  const tourismTypes = [
    {
      title: 'Пеший туризм',
    },
    {
      title: 'Горный туризм',
    },
    {
      title: 'Водный туризм',
    },
  ];

  const getTourImageUrl = (tour) => {
    // Если у тура есть своё изображение, используем его
    if (tour.image) {
      return tour.image;
    }
    // Иначе используем дефолтное по типу
    const typeImages = {
      'Пеший туризм': '/static/image/peshiy.png',
      'Горный туризм': '/static/image/mountain_main.png',
      'Водный туризм': '/static/image/vodniy.png',
    };
    return typeImages[tour.type] || '/static/image/peshiy.png';
  };

  const handleTourismClick = (tourType) => {
    // Маппинг типов на URL параметры
    const tourTypeMap = {
      'Пеший туризм': 'walking',
      'Горный туризм': 'mountain',
      'Водный туризм': 'water',
    };
    const urlType = tourTypeMap[tourType];
    navigate(`/tourism/${urlType}`);
  };

  return (
    <div className={styles.homeContainer}>
      {/* ГЕРОИЧЕСКИЙ РАЗДЕЛ - с 4 типами туризма */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(100, 100, 100, 0.35) 100%), url('/static/image/glavnaya.png')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className={styles.tourismOptions}>
          {tourismTypes.map((type, idx) => (
            <div 
              key={idx}
              className={styles.tourismItem}
            >
              <div className={styles.tourismIcon}>{type.icon}</div>
              <h3>{type.title}</h3>
              <button 
                onClick={() => handleTourismClick(type.title)}
                className={styles.tourismLink}
              >
                Выбрать →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ПОПУЛЯРНЫЕ МАРШРУТЫ */}
      <section className={styles.popularRoutes}>
        <h2>Популярные маршруты</h2>
        {loading ? (
          <p className={styles.loading}>Загрузка маршрутов...</p>
        ) : tours.length === 0 ? (
          <p className={styles.loading}>Маршруты пока не добавлены</p>
        ) : (
          <div className={styles.routeCards}>
            {tours.map((tour) => (
              <div
                key={tour.id}
                className={styles.routeCardWrapper}
                onClick={() => navigate(`/tours/${tour.id}`)}
              >
                <div className={styles.routeCard}>
                  <img
                    src={getTourImageUrl(tour)}
                    alt={tour.name}
                    onError={(e) => {
                      e.target.src = '/static/image/peshiy.png';
                    }}
                  />
                  <div className={styles.routeInfo}>
                    <h3>{tour.name}</h3>
                    <div className={styles.routeDetails}>
                      {tour.price && <span className={styles.price}>💰 {tour.price} ₽</span>}
                      {tour.type && <span className={styles.type}> {tour.type}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* КАЛЕНДАРЬ ТУРОВ */}
      <section className={styles.calendarSection}>
        <h2>Календарь событий</h2>
        <Calendar />
      </section>

      {/* КНОПКА "ВСЕ ТУРЫ" */}
      <section className={styles.allToursSection}>
        <button 
          className={styles.allToursButton}
          onClick={() => navigate('/tours')}
        >
          Посмотреть все туры →
        </button>
      </section>
    </div>
  );
};

export default Home;

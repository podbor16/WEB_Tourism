import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI } from '../api';
import { getTourismColor } from '../constants/tourismColors';
import styles from './TourismTypePage.module.css';

const TourismTypePage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const tourismData = {
    'walking': {
      title: 'Пеший туризм',
      image: '/static/image/peshiy.png',
      description: 'Пеший туризм — это возможность почувствовать природу во всей её красе, окунуться в тишину лесов, насладиться свежим воздухом лугов и восхититься панорамами, открывающимися с вершины холмов. Это идеальный способ соединиться с миром вокруг и с самим собой.',
      benefits: [
        'Подойдёт как новичкам, так и опытным путешественникам.',
        'Достаточно удобной обуви, рюкзака и минимального набора.',
        'Удобный маршрут: от спокойных прогулок до многодневных походов.',
        'Улучшайте физическую форму и настроение.',
      ],
      apiType: 'Пеший туризм',
      colorType: 'Пеший туризм',
    },
    'mountain': {
      title: 'Горный туризм',
      image: '/static/image/mountain_main.png',
      description: 'Горный туризм — это приключение для тех, кто ищет вызов. Покорение вершин, преодоление скальных участков, виды, которые захватывают дух, и ощущение победы на каждом шаге. Это путь для активных и целеустремлённых путешественников.',
      benefits: [
        'Подходит для опытных туристов и любителей экстрима.',
        'Требует специальное снаряжение и подготовку.',
        'Маршруты разной сложности: от средней до высокой.',
        'Развивает силу, выносливость и психологическую устойчивость.',
      ],
      apiType: 'Горный туризм',
      colorType: 'Горный туризм',
    },
    'water': {
      title: 'Водный туризм',
      image: '/static/image/vodniy.png',
      description: 'Водный туризм — это не просто путешествие, это целая стихия, в которой каждый может найти своё: от тихого катания на лодке до бурного сплава на каяке. Природа вокруг кажется ещё ближе, когда вы видите её отражение в водной глади.',
      benefits: [
        'Включает спокойные водные прогулки и активные сплавы.',
        'Безопасность обеспечивается правильным снаряжением.',
        'Вода дарует ощущение свободы и единения с природой.',
        'Укрепляет командный дух и взаимопомощь.',
      ],
      apiType: 'Водный туризм',
      colorType: 'Водный туризм',
    },
  };

  const data = tourismData[type];

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await toursAPI.getTours();
        const toursData = Array.isArray(response.data.results) ? response.data.results : response.data;
        
        const currentData = tourismData[type];
        if (currentData) {
          const filteredTours = toursData.filter(tour => tour.type === currentData.apiType);
          setTours(filteredTours);
        }
      } catch (err) {
        console.error('Ошибка при загрузке маршрутов:', err);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [type]);

  if (!data) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Вид туризма не найден</p>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          ← На главную
        </button>
      </div>
    );
  }

  const colors = getTourismColor(data.colorType);

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

  return (
    <div className={styles.container}>
      {/* Героический раздел с заголовком */}
      <section className={styles.heroSection}>
        <img src={data.image} alt={data.title} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <h1>{data.title}</h1>
        </div>
      </section>

      {/* Описание */}
      <section className={styles.descriptionSection}>
        <div className={styles.content}>
          <p className={styles.description}>{data.description}</p>
          
          <div 
            className={styles.benefits}
            style={{ borderTopColor: colors.primary }}
          >
            <h2 style={{ color: colors.primary }}>
              Почему выбрать {data.title.toLowerCase()}?
            </h2>
            <ul>
              {data.benefits.map((benefit, idx) => (
                <li key={idx} style={{ color: '#555' }}>
                  <span style={{ color: colors.primary }}>✓</span> {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Маршруты */}
      <section className={styles.routesSection}>
        <div className={styles.content}>
          <h2>{data.title}: маршруты</h2>
          
          {loading ? (
            <p className={styles.loading}>Загрузка маршрутов...</p>
          ) : tours.length === 0 ? (
            <p className={styles.noRoutes}>Маршруты этого типа пока не добавлены</p>
          ) : (
            <div className={styles.routeCards}>
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className={styles.routeCard}
                  onClick={() => navigate(`/tours/${tour.id}`)}
                >
                  <div className={styles.cardImage}>
                    <img
                      src={getTourImageUrl(tour)}
                      alt={tour.name}
                      onError={(e) => {
                        e.target.src = '/static/image/peshiy.png';
                      }}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{tour.name}</h3>
                    {tour.duration && (
                      <p className={styles.duration}>⏱️ {tour.duration}</p>
                    )}
                    {tour.price && (
                      <p 
                        className={styles.price}
                        style={{ color: colors.primary }}
                      >
                        💰 {tour.price} ₽
                      </p>
                    )}
                    <button 
                      className={styles.detailsButton}
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark || colors.primary} 100%)`
                      }}
                    >
                      Подробнее →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Кнопка назад */}
      <div className={styles.backButtonContainer}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          ← На главную
        </button>
      </div>
    </div>
  );
};

export default TourismTypePage;

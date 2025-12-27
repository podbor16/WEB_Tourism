import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI, registrationsAPI } from '../api';
import styles from './RouteDetail.module.css';

const RouteDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const routeDescriptions = {
    1: {
      name: 'Красноярские столбы',
      title: 'КРАСНОЯРСКИЕ СТОЛБЫ',
      type: 'walking',
      description: `Маршрут "Красноярские столбы" – это незабываемое путешествие в сердце сибирской природы, где величественные скалы, утопающие в зелени тайги, создают атмосферу уединения и вдохновения. Этот уникальный природный заповедник, расположенный недалеко от города Красноярска, является одним из самых живописных мест России и привлекает туристов со всего мира.`,
      fullDescription: `"Красноярские столбы" – это не только природа, но и богатая история, традиции "столбистов" и культура взаимопомощи, которые объединяют людей уже более века. Присоединяйтесь к маршруту и откройте для себя настоящую сибирскую сказку!`,
      features: [
        'Прогулка по захватывающим скальным тропам',
        'Навыки скалолазания по оборудованным маршрутам',
        'Опытные гиды и страховка',
        'Парковка, гиды, оборудованные тропы',
        'История "столбистов" и традиции местной культуры'
      ],
      benefits: [
        'Тайга, скалы и природа вблизи города',
        'Физическая активность и тренировка',
        'История и культурное наследие',
        'Общение с единомышленниками',
        'Адреналин и позитивные эмоции'
      ],
      images: [
        '/static/image/stolbyonback.jpg',
        '/static/image/stolb2.jpg',
        '/static/image/stolb3.jpg',
        '/static/image/stolb1.jpg'
      ]
    },
    2: {
      name: 'Эльбрус',
      title: 'ВОСХОЖДЕНИЕ НА ЭЛЬБРУС',
      type: 'mountain',
      description: `Эльбрус – это не просто самая высокая вершина России и Европы, это испытание для духа и тела. Восхождение на 5642 метра требует подготовки, но наградой становится вид, который не забудется никогда.`,
      fullDescription: `Эльбрус манит альпинистов и любителей гор со всего мира. Этот великан Кавказа предлагает несколько маршрутов разной сложности. Вы почувствуете настоящую горную стихию и преодолеете себя.`,
      features: [
        'Восхождение на высоту 5642м',
        'Акклиматизационные дни',
        'Профессиональные альпинист-гиды',
        'Современное снаряжение',
        'Базовые лагеря с комфортом'
      ],
      benefits: [
        'Преодоление экстремальной высоты',
        'Вид с вершины Европы и России',
        'Физическое и психологическое испытание',
        'Сплочение команды',
        'Бесценный опыт альпинизма'
      ],
      images: [
        '/static/image/elbrus.jpg',
        '/static/image/kazbek.jpeg'
      ]
    },
    3: {
      name: 'Манский порог',
      title: 'СПЛАВ ПО МАНСКОМУ ПОРОГУ',
      type: 'water',
      description: `Манский порог – это захватывающий сплав по полноводной сибирской реке с чистейшей водой и непредсказуемыми порогами. Маршрут подойдет как для начинающих, так и для опытных водников.`,
      fullDescription: `Река Манская манит своей дикой красотой и кристальной прозрачностью. Сплав здесь – это баланс между адреналином и умиротворением природой. Закаты над водой и ночи у костра станут незабываемыми.`,
      features: [
        'Сплав по настоящей дикой реке',
        'Несложные и средние пороги',
        'Опытные инструкторы и спасатели',
        'Катамараны или байдарки на выбор',
        'Несколько лагерей и кострища'
      ],
      benefits: [
        'Работа в команде гребцов',
        'Адреналин от преодоления порогов',
        'Близость к природе',
        'Закаты и восходы над рекой',
        'Умение правильно гребить и балансировать'
      ],
      images: [
        '/static/image/mana.jpg',
        '/static/image/katun.jpg',
        '/static/image/katun2.webp'
      ]
    },
    4: {
      name: 'Музыкальное озеро',
      title: 'ВОДНЫЙ ТУРИЗМ НА ОЗЁРАХ',
      type: 'water',
      description: `Озёрный туризм предлагает спокойствие и красоту на фоне горных пейзажей. Сплав на каяках или катамаранах по кристальным озёрам – это идеальный вариант для семей и новичков.`,
      fullDescription: `Озёра России пленяют своей чистотой и безмятежностью. Путешествие на каяках по зеркальной воде, отражающей небо и горы, дарует ощущение единства с природой.`,
      features: [
        'Спокойные озёра для всех уровней',
        'Каяки и всё необходимое снаряжение',
        'Песочные пляжи для лагерей',
        'Рыбалка в свободное время',
        'Пейзажи гор, отражённые в воде'
      ],
      benefits: [
        'Релаксация и медитация на воде',
        'Подходит для всей семьи',
        'Наблюдение за дикой природой',
        'Здоровая активность',
        'Отдалённость от суеты'
      ],
      images: [
        '/static/image/ribnaya.png',
        '/static/image/Esaulovka.jpg'
      ]
    }
  };

  useEffect(() => {
    fetchTour();
    checkRegistration();
  }, [id, user]);

  const fetchTour = async () => {
    try {
      const response = await toursAPI.getById(id);
      setTour(response.data);
    } catch (err) {
      console.error('Ошибка при загрузке тура:', err);
      setError('Тур не найден');
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    if (!user) return;
    try {
      const response = await registrationsAPI.getMy();
      const isRegistered = response.data.some(reg => reg.tour === parseInt(id));
      setRegistered(isRegistered);
    } catch (err) {
      console.error('Ошибка при проверке регистрации:', err);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      await registrationsAPI.register(id);
      setRegistered(true);
      alert('Вы успешно зарегистрированы на этот тур!');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      setError(err.response?.data?.detail || 'Ошибка при регистрации');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка маршрута...</div>;
  }

  if (error && !tour) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!tour) {
    return <div className={styles.error}>Маршрут не найден</div>;
  }

  const routeData = routeDescriptions[tour.id] || {};
  const mainImage = routeData.images?.[0] || '/static/image/mountain_main.png';
  const galleryImages = routeData.images?.slice(1) || [];

  return (
    <div className={styles.routeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <img src={mainImage} alt={tour.name} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <h1>{routeData.title || tour.name}</h1>
        </div>
      </section>

      {/* Description */}
      <section className={styles.descriptionSection}>
        <div className={styles.content}>
          <p className={styles.mainDescription}>{routeData.description || tour.description}</p>
          <p className={styles.fullDescription}>{routeData.fullDescription}</p>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {galleryImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Фото ${idx + 1}`} className={styles.galleryImage} />
            ))}
          </div>
        </section>
      )}

      {/* Route Info */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3>💰 Стоимость</h3>
          <p>{tour.price ? `${tour.price} ₽` : 'По запросу'}</p>
        </div>
        <div className={styles.infoCard}>
          <h3>📅 Даты</h3>
          <p>
            {new Date(tour.start_date).toLocaleDateString('ru-RU')}
            {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
          </p>
        </div>
        <div className={styles.infoCard}>
          <h3>🎯 Тип</h3>
          <p>{tour.type}</p>
        </div>
      </section>

      {/* Features */}
      {routeData.features && (
        <section className={styles.featuresSection}>
          <h2>Что входит в маршрут</h2>
          <ul className={styles.featuresList}>
            {routeData.features.map((feature, idx) => (
              <li key={idx}>
                <span className={styles.checkmark}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {routeData.benefits && (
        <section className={styles.benefitsSection}>
          <h2>Преимущества маршрута</h2>
          <ul className={styles.benefitsList}>
            {routeData.benefits.map((benefit, idx) => (
              <li key={idx}>
                <span className={styles.bulletPoint}>●</span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Registration Button */}
      <section className={styles.registrationSection}>
        <button
          className={`${styles.registerButton} ${registered ? styles.registered : ''}`}
          onClick={handleRegister}
          disabled={registering || registered}
        >
          {registered ? '✓ Вы зарегистрированы' : 'Зарегистрироваться на тур'}
        </button>
        {!user && (
          <p className={styles.loginPrompt}>
            <a href="/login">Войдите</a> чтобы зарегистрироваться
          </p>
        )}
      </section>

      {/* Back Button */}
      <div className={styles.backButton}>
        <button onClick={() => navigate(-1)}>← Назад</button>
      </div>
    </div>
  );
};

export default RouteDetail;

import React, { useState } from 'react';
import styles from './Media.module.css';

const Media = () => {
  // Пример данных слайдеров
  const [activeSliders] = useState({
    walking: 0,
    mountain: 0,
    water: 0,
  });

  const sliders = {
    walking: [
      {
        image: '/static/image/peshiy.png',
        title: 'Лесная прогулка',
        description: 'Спокойный маршрут сквозь густой лес',
      },
      {
        image: '/static/image/peshiy.png',
        title: 'Горная тропа',
        description: 'Подъём на холм с панорамным видом',
      },
      {
        image: '/static/image/peshiy.png',
        title: 'Луговой маршрут',
        description: 'Прогулка по красивым лугам',
      },
    ],
    mountain: [
      {
        image: '/static/image/mountain_main.png',
        title: 'Альпинизм',
        description: 'Покорение горных вершин',
      },
      {
        image: '/static/image/mountain_main.png',
        title: 'Скальный маршрут',
        description: 'Преодоление скальных участков',
      },
      {
        image: '/static/image/mountain_main.png',
        title: 'Горное плато',
        description: 'Путешествие по высокогорному плато',
      },
    ],
    water: [
      {
        image: '/static/image/vodniy.png',
        title: 'Речной сплав',
        description: 'Активный сплав по реке',
      },
      {
        image: '/static/image/vodniy.png',
        title: 'Озёрное катание',
        description: 'Спокойное катание на лодке',
      },
      {
        image: '/static/image/vodniy.png',
        title: 'Морское путешествие',
        description: 'Прибрежное путешествие',
      },
    ],
  };

  const nextSlide = (type) => {
    // Логика смены слайда
  };

  const prevSlide = (type) => {
    // Логика смены слайда
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Галерея туров</h1>
      <p className={styles.subtitle}>Посмотрите, какие увлекательные маршруты ждут вас</p>

      {/* Слайдер для пешего туризма */}
      <section className={styles.sliderSection}>
        <h2>Пеший туризм</h2>
        <div className={styles.slider}>
          <button className={styles.sliderBtn} onClick={() => prevSlide('walking')}>
            ←
          </button>
          <div className={styles.sliderContent}>
            <img
              src={sliders.walking[activeSliders.walking].image}
              alt={sliders.walking[activeSliders.walking].title}
            />
            <div className={styles.sliderInfo}>
              <h3>{sliders.walking[activeSliders.walking].title}</h3>
              <p>{sliders.walking[activeSliders.walking].description}</p>
            </div>
          </div>
          <button className={styles.sliderBtn} onClick={() => nextSlide('walking')}>
            →
          </button>
        </div>
      </section>

      {/* Слайдер для горного туризма */}
      <section className={styles.sliderSection}>
        <h2>Горный туризм</h2>
        <div className={styles.slider}>
          <button className={styles.sliderBtn} onClick={() => prevSlide('mountain')}>
            ←
          </button>
          <div className={styles.sliderContent}>
            <img
              src={sliders.mountain[activeSliders.mountain].image}
              alt={sliders.mountain[activeSliders.mountain].title}
            />
            <div className={styles.sliderInfo}>
              <h3>{sliders.mountain[activeSliders.mountain].title}</h3>
              <p>{sliders.mountain[activeSliders.mountain].description}</p>
            </div>
          </div>
          <button className={styles.sliderBtn} onClick={() => nextSlide('mountain')}>
            →
          </button>
        </div>
      </section>

      {/* Слайдер для водного туризма */}
      <section className={styles.sliderSection}>
        <h2>Водный туризм</h2>
        <div className={styles.slider}>
          <button className={styles.sliderBtn} onClick={() => prevSlide('water')}>
            ←
          </button>
          <div className={styles.sliderContent}>
            <img
              src={sliders.water[activeSliders.water].image}
              alt={sliders.water[activeSliders.water].title}
            />
            <div className={styles.sliderInfo}>
              <h3>{sliders.water[activeSliders.water].title}</h3>
              <p>{sliders.water[activeSliders.water].description}</p>
            </div>
          </div>
          <button className={styles.sliderBtn} onClick={() => nextSlide('water')}>
            →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Media;

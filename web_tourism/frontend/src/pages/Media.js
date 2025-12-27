import React from 'react';
import styles from './Media.module.css';

const Media = () => {
  const galleries = [
    {
      type: 'горный',
      title: 'Горный туризм',
      images: [
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
    },
    {
      type: 'водный',
      title: 'Водный туризм',
      images: [
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
    },
    {
      type: 'пеший',
      title: 'Пеший туризм',
      images: [
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
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Галерея туров</h1>
      <p className={styles.subtitle}>Посмотрите, какие увлекательные маршруты уже реализованы и ждут вас</p>

      {galleries.map((gallery) => (
        <section key={gallery.type} className={styles.sliderSection}>
          <h2>{gallery.title}</h2>
          <div className={styles.gallery}>
            {gallery.images.map((item, idx) => (
              <div key={idx} className={styles.galleryItem}>
                <img src={item.image} alt={item.title} />
                <div className={styles.galleryInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Media;

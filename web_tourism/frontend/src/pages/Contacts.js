import React from 'react';
import styles from './Contacts.module.css';

const Contacts = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Контакты</h1>
      <p className={styles.subtitle}>Свяжитесь с нами для получения подробной информации</p>

      <div className={styles.contactsGrid}>
        {/* Основная информация */}
        <section className={styles.infoSection}>
          <h2>Основная информация</h2>
          
          <div className={styles.contactItem}>
            <div className={styles.icon}>📍</div>
            <div className={styles.contactContent}>
              <h3>Адрес</h3>
              <p>Россия, Красноярск<br/>ул. Туризма, д. 1</p>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.icon}>📞</div>
            <div className={styles.contactContent}>
              <h3>Телефон</h3>
              <p><a href="tel:+79990001122">+7 (999) 000-11-22</a></p>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.icon}>✉️</div>
            <div className={styles.contactContent}>
              <h3>Email</h3>
              <p><a href="mailto:info@webtourism.ru">info@webtourism.ru</a></p>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.icon}>🕐</div>
            <div className={styles.contactContent}>
              <h3>Время работы</h3>
              <p>Пн-Пт: 9:00 - 18:00<br/>Сб-Вс: 10:00 - 16:00</p>
            </div>
          </div>
        </section>

        {/* Форма обратной связи */}
        <section className={styles.formSection}>
          <h2>Оставить сообщение</h2>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="ivan@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                placeholder="+7 (999) 000-11-22"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                placeholder="Напишите ваше сообщение..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Отправить сообщение
            </button>
          </form>
        </section>
      </div>

      {/* Социальные сети */}
      <section className={styles.socialSection}>
        <h2>Следите за нами</h2>
        <div className={styles.socialLinks}>
          <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <span>ВКонтакте</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <span>Instagram</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <span>YouTube</span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <span>Facebook</span>
          </a>
        </div>
      </section>

      {/* О компании */}
      <section className={styles.aboutSection}>
        <h2>О компании</h2>
        <p>
          WEB Tourism — это ваш проводник в мир приключений. Мы организуем туры по самым красивым и интересным местам России. 
          Наша миссия — помочь каждому человеку открыть для себя чудеса природы и получить незабываемые впечатления.
        </p>
        <p>
          С нами вы сможете:
        </p>
        <ul>
          <li>Выбрать маршрут по своему уровню подготовки</li>
          <li>Получить профессиональное снаряжение</li>
          <li>Путешествовать с опытными гидами</li>
          <li>Познакомиться с единомышленниками</li>
          <li>Создать незабываемые воспоминания</li>
        </ul>
      </section>
    </div>
  );
};

export default Contacts;

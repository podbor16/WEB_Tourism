function WaterTourism() {
    const routes = [
        {
            title: 'Cплав по реке "Катунь"',
            image: window.staticImages.katun,
            place: 'Алтай',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Сплав по реке "Есауловка"',
            image: window.staticImages.esaulovka,
            place: 'Красноярск',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Сплав по реке "Мана"',
            image: window.staticImages.mana,
            place: 'Красноярск',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Сплав по реке "Тумча"',
            image: window.staticImages.tumcha,
            place: 'Карелия',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Cплав по реке "Белая"',
            image: window.staticImages.belaya,
            place: 'Башкирия',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
    ];

    return (
        <div>
            {/* Секция с фоновым изображением и заголовком */}
            <div className="tourism-section">
                <img src={window.staticImages.katun2} className="background-image" alt="Background" />
                <Header /> {/* Глобальная функция Header из header.js */}
                <h1>ВОДНЫЙ ТУРИЗМ</h1>
            </div>

            {/* Описание */}
            <div className="tourism-description">
                <p>
                    Водный туризм — это не просто путешествие, это целая стихия, в которой каждый может найти своё: от тихого катания на лодке до бурного сплава на каяке. Природа вокруг кажется ещё ближе, когда вы видите её отражение в водной глади.
                </p>
                <ul className="tourism-benefits">
                    <li>🔵 Потрясающие виды, которые недоступны с берега.</li>
                    <li>🔵 Слаженная работа в команде.</li>
                    <li>🔵 Удобный маршрут: от спокойного каякинга до экстремального рафтинга.</li>
                    <li>🔵 Тишина и уединение на воде, вдали от городской суеты.</li>
                </ul>
            </div>

            {/* Призыв к действию */}
            <p className="cta-text">
                Почувствуйте дух приключений на воде, скользя по рекам, озёрам или морям!
            </p>

            {/* Популярные маршруты */}
            <div className="popular-routes">
                <div className="route-cards">
                    {routes.map((route, index) => (
                        <div className="route-card" key={index}>
                            <img src={route.image} alt={route.title} />
                            <div className="route-info">
                                <h3>{route.title}</h3>
                                <p>Место: {route.place}</p>
                                <p>
                                    Включено: <br /> {route.included}
                                </p>
                                <a href={route.link}>Подробнее</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
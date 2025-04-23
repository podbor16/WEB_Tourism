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
                <h1 className="text-4xl font-bold text-white text-center absolute top-1/2 w-full">
                    ВОДНЫЙ ТУРИЗМ
                </h1>
                <div className="tourism-options flex justify-center gap-8 absolute bottom-10 w-full">
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/walking_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Пеший туризм</h3>
                        </a>
                        <a href="/walking_tourism/" className="text-blue-500 hover:underline">Перейти ></a>
                    </div>
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/mountain_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Горный туризм</h3>
                        </a>
                        <a href="/mountain_tourism/" className="text-blue-500 hover:underline">Перейти ></a>
                    </div>
                </div>
            </div>

            {/* Описание */}
            <div className="tourism-description">
                <p>
                    <b>Водный туризм</b> — это не просто путешествие, это целая стихия, в которой каждый может найти своё: от тихого катания на лодке до бурного сплава на каяке. Природа вокруг кажется ещё ближе, когда вы видите её отражение в водной глади.
                </p>
                <ul className="tourism-benefits">
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2770d6" />
                        </svg>
                        Потрясающие виды, которые недоступны с берега.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2770d6" />
                        </svg>
                        Слаженная работа в команде.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2770d6" />
                        </svg>
                        Удобный маршрут: от спокойного каякинга до экстремального рафтинга.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2770d6" />
                        </svg>
                        Тишина и уединение на воде, вдали от городской суеты.
                    </li>
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
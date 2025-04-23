function WalkingTourism() {
    const routes = [
        {
            title: 'Столбы',
            image: window.staticImages.stolb,
            duration: '7 часов',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Ергаки',
            image: window.staticImages.ergaki,
            duration: '7 часов',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Плато Путорана',
            image: window.staticImages.putoran,
            duration: '7 часов',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Ергаки',
            image: window.staticImages.ergaki,
            duration: '7 часов',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
        {
            title: 'Столбы',
            image: window.staticImages.stolb,
            duration: '7 часов',
            included: 'Трансфер',
            link: '/stolby_route/',
        },
    ];

    return (
        <div>
            {/* Секция с фоновым изображением и заголовком */}
            <div className="tourism-section">
                <img src={window.staticImages.background} className="background-image" alt="Background" />
                <Header /> {}
                <h1 className="text-4xl font-bold text-white text-center absolute top-1/2 w-full">
                    ПЕШИЙ ТУРИЗМ
                </h1>
                <div className="tourism-options flex justify-center gap-8 absolute bottom-10 w-full">
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/water_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Водный туризм</h3>
                        </a>
                        <a href="/water_tourism/" className="text-blue-500 hover:underline">Перейти ></a>
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
                    <b>Пеший туризм</b> — это возможность почувствовать природу во всей её красе, окунуться в тишину лесов, насладиться свежим воздухом и восхититься панорамами, открывающимися с вершины холмов. Это идеальный способ соединиться с миром вокруг и самим собой.
                </p>
                <ul className="tourism-benefits">
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2da12d" />
                        </svg>
                        Подойдёт как новичкам, так и опытным путешественникам.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2da12d" />
                        </svg>
                        Достаточно удобной обуви, рюкзака и минимального набора.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2da12d" />
                        </svg>
                        Удобный маршрут: от спокойных прогулок до многодневных походов.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#2da12d" />
                        </svg>
                        Улучшайте физическую форму и настроение.
                    </li>
                </ul>
            </div>

            {/* Призыв к действию */}
            <p className="cta-text">
                Отправляйтесь в увлекательное путешествие по тропам, где каждый шаг открывает новые горизонты!
            </p>

            {/* Популярные маршруты */}
            <div className="popular-routes">
                <div className="route-cards">
                    {routes.map((route, index) => (
                        <div className="route-card" key={index}>
                            <img src={route.image} alt={route.title} />
                            <div className="route-info">
                                <h3>{route.title}</h3>
                                <p>Протяженность по времени: {route.duration}</p>
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
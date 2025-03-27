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
                <h1>ПЕШИЙ ТУРИЗМ</h1>
            </div>

            {/* Описание */}
            <div className="tourism-description">
                <p>
                    <b>Пеший туризм</b> — это возможность почувствовать природу во всей её красе, окунуться в тишину лесов, насладиться свежим воздухом и восхититься панорамами, открывающимися с вершины холмов. Это идеальный способ соединиться с миром вокруг и самим собой.
                </p>
                <ul className="tourism-benefits">
                    <li>🟡 Подойдёт как новичкам, так и опытным путешественникам.</li>
                    <li>🟡 Достаточно удобной обуви, рюкзака и минимального набора.</li>
                    <li>🟡 Удобный маршрут: от спокойных прогулок до многодневных походов.</li>
                    <li>🟡 Улучшайте физическую форму и настроение.</li>
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
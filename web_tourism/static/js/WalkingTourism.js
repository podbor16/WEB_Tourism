function WalkingTourismHeading() {
    return (
        <div className="tourism-heading-container">
            <h1 className="tourism-heading">ПЕШИЙ ТУРИЗМ</h1>
        </div>
    );
}
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
            duration: '5-7 дней',
            included: 'Трансфер, питание',
            link: '/stolby_route/',
        },
        {
            title: 'Кутурчинское Белогорье',
            image: window.staticImages.belogorye,
            duration: '3 дня',
            included: 'Трансфер, питание',
            link: '/stolby_route/',
        },
        {
            title: 'Мининские столбы',
            image: window.staticImages.mininskie,
            duration: '7 часов',
            included: 'Трансфер',
            link: '/stolby_route/',
        }
    ];

    return (
        <div>
            <div className="tourism-section">
                <div className="tourism-hero relative w-full h-full">
                    <img src={window.staticImages.background} className="background-image" alt="Background" />
                    <Header /> 
                    <WalkingTourismHeading />
                </div>
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


            <div className="popular-routes">
                <p className="cta-text">
                    Отправляйтесь в увлекательное путешествие по тропам, где каждый шаг открывает новые горизонты!
                </p>
                <div className="route-cards">
                    {routes.map((route, index) => (
                        <a href={route.link} className="route-card-link" key={index}>
                            <div className="route-card">
                                <img src={route.image} alt={route.title} />
                                <div className="route-info">
                                    <h3>{route.title}</h3>
                                    <p>{route.duration}</p>
                                    <p>{route.included}</p>
                                    <span className="route-details">Подробнее</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
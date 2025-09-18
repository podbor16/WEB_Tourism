function MountainTourismHeading() {
    return (
        <div className="tourism-heading-container">
            <h1 className="tourism-heading">ГОРНЫЙ ТУРИЗМ</h1>
        </div>
    );
}
function MountainTourism() {
    const routes = [
        {
            title: 'Борус',
            image: window.staticImages.borus,
            included: 'Трансфер, Питание',
            link: '/borus_route/',
        },
        {
            title: 'Арктру',
            image: window.staticImages.arktru,
            location: 'Алтай',
            included: 'Трансфер, Питание',
            link: '/arktru_route/',
        },
        {
            title: 'Белуха',
            image: window.staticImages.beluha,
            location: 'Алтай',
            included: 'Трансфер, Питание',
            link: '/beluha_route/',
        },
        {
            title: 'Казбек',
            image: window.staticImages.kazbek,
            location: 'Грузия',
            included: 'Трансфер, Питание',
            link: '/kazbek_route/',
        }
    ];

    return (
        <div>
            <div className="tourism-section">
                <div className="tourism-hero relative w-full h-full">
                    <img src={window.staticImages.background} className="background-image" alt="Background" />
                    <Header />
                    <MountainTourismHeading/>
                </div>
                <div className="tourism-options flex justify-center gap-8 absolute bottom-10 w-full">
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/walking_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Пеший туризм</h3>
                        </a>
                        <a href="/walking_tourism/" className="text-blue-500 hover:underline">Перейти </a>
                    </div>
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/water_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Водный туризм</h3>
                        </a>
                        <a href="/water_tourism/" className="text-blue-500 hover:underline">Перейти </a>
                    </div>
                </div>
            </div>

            <div className="tourism-description">
                <p>
                    <b>Горный туризм</b> — это путешествие туда, где воздух чище, а виды настолько грандиозны, что перехватывает дух. Это приключение для тех, кто хочет проверить себя, выйти за рамки повседневного и зарядиться энергией гор.
                </p>
                <ul className="tourism-benefits">
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#808080" />
                        </svg>
                        Горный климат благоприятно влияет на организм.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#808080" />
                        </svg>
                        Захватывающие виды: панорамы горных долин, ледников и каньонов.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#808080" />
                        </svg>
                        Преодоление сложных маршрутов дарит ощущение триумфа.
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                            <circle cx="8" cy="8" r="8" fill="#808080" />
                        </svg>
                        Современная экипировка делает путешествие комфортным.
                    </li>
                </ul>
            </div>

            <div className="popular-routes">
                <p className="cta-text">
                    Покорите вершины и ощутите восторг от достижения новых высот!
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
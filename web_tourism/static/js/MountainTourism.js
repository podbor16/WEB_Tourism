function MountainTourism() {
    const routes = [
        {
            title: 'Эльбрус',
            image: window.staticImages.elbrus,
            location: 'Кавказ',
            included: 'Трансфер, Питание',
            link: '/elbrus_route/',
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
        },
        {
            title: 'Килиманджаро',
            image: window.staticImages.kilimand,
            location: 'Танзания',
            included: 'Трансфер, Питание',
            link: '/kilimand_route/',
        },
    ];

    return (
        <div>
            {/* Секция с фоновым изображением и заголовком */}
            <div className="tourism-section">
                <img src={window.staticImages.background} className="background-image" alt="Background" />
                <Header />
                <h1 className="text-4xl font-bold text-white text-center absolute top-1/2 w-full">
                    ГОРНЫЙ ТУРИЗМ
                </h1>
                <div className="tourism-options flex justify-center gap-8 absolute bottom-10 w-full">
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/walking_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Пеший туризм</h3>
                        </a>
                        <a href="/walking_tourism/" className="text-blue-500 hover:underline">Перейти ></a>
                    </div>
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/water_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Водный туризм</h3>
                        </a>
                        <a href="/water_tourism/" className="text-blue-500 hover:underline">Перейти ></a>
                    </div>
                </div>
            </div>

            {/* Описание */}
            <div className="tourism-description">
                <p>
                    <b>Горный туризм</b> — это путешествие туда, где воздух чище, а виды настолько грандиозны, что перехватывает дух. Это приключение для тех, кто хочет проверить себя, выйти за рамки повседневного и зарядиться энергией гор.
                </p>
                <ul className="tourism-benefits">
                    <li>🟢 Горный климат благоприятно влияет на организм.</li>
                    <li>🟢 Захватывающие виды: панорамы горных долин, ледников и каньонов.</li>
                    <li>🟢 Преодоление сложных маршрутов дарит ощущение триумфа.</li>
                    <li>🟢 Современная экипировка делает путешествие комфортным.</li>
                </ul>
            </div>

            {/* Призыв к действию */}
            <p className="cta-text">
                Покорите вершины и ощутите восторг от достижения новых высот!
            </p>

            {/* Популярные маршруты */}
            <div className="popular-routes">
                <div className="route-cards">
                    {routes.map((route, index) => (
                        <div className="route-card" key={index}>
                            <img src={route.image} alt={route.title} />
                            <div className="route-info">
                                <h3>{route.title}</h3>
                                <p>Место: {route.location}</p>
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
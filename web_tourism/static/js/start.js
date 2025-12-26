function MonthView() {
    return (
        <div className="month-view-wrapper">
            <div className="month-header">
                <h3 className="month-title">Январь 2025</h3>

                <div className="month-nav">
                    <button className="nav-btn">‹</button>
                    <button className="nav-btn">›</button>
                </div>
            </div>

            <div className="month-grid">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
                    <div key={d} className="day-header">{d}</div>
                ))}

                {[
                    '', '', '', '', '', '1', '2',
                    '3', '4', '5', '6', '7', '8', '9',
                    '10', '11', '12', '13', '14', '15', '16',
                    '17', '18', '19', '20', '21', '22', '23',
                    '24', '25', '26', '27', '28', '29', '30'
                ].map((day, i) => (
                    <div key={i} className={`day-cell ${day === '' ? 'empty' : ''}`}>
                        {day && <div className="day-number">{day}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

const months = [
    'Январь 2025', 'Февраль 2025', 'Март 2025', 'Апрель 2025',
    'Май 2025', 'Июнь 2025', 'Июль 2025', 'Август 2025',
    'Сентябрь 2025', 'Октябрь 2025', 'Ноябрь 2025', 'Декабрь 2025',
];

function YearView() {
    return (
        <div className="year-grid">
            {months.map((title) => (
                <div key={title} className="year-month-wrapper">
                    <div className="year-month-header">
                        <h3 className="year-month-title">{title}</h3>
                        <div className="year-month-nav">
                            <button className="year-nav-btn">‹</button>
                            <button className="year-nav-btn">›</button>
                        </div>
                    </div>

                    <div className="year-month-grid">
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
                            <div key={d} className="year-day-header">{d}</div>
                        ))}

                        {Array.from({ length: 42 }).map((_, i) => (
                            <div key={i} className="year-day-cell" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
function ListView() {
    const events = [
        {
            id: 1,
            date: "22 января 2026",
            title: "Поход на Столбы",
            linkText: "Подробнее",
            linkUrl: "#",
            image: "/static/image/stolb2.jpg"
        },
        {
            id: 2,
            date: "4-6 апреля 2026",
            title: "Восхождение на Борус",
            linkText: "Подробнее",
            linkUrl: "#",
            image: "/static/image/borus.png"
        },
        {
            id: 3,
            date: "1-6 августа 2026",
            title: "Манский порог",
            linkText: "Подробнее",
            linkUrl: "#",
            image: "/static/image/mana.jpg"
        }
    ];

    return (
        <div className="list-view-wrapper">
            <div className="list-view-container">
                {events.map((event) => (
                    <div key={event.id} className="list-event-card">
                        <div className="list-event-image">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="list-event-img"
                            />
                        </div>

                        <div className="list-event-content">
                            <div className="list-event-header">
                                <h3 className="list-event-title">{event.title}</h3>
                                <div className="list-event-date-below">{event.date}</div>
                            </div>

                            <div className="list-event-footer">
                                <a href={event.linkUrl} className="list-event-link">
                                    {event.linkText}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
function Start() {
    const [viewMode, setViewMode] = React.useState('month');
   
    return (
        <div>
            <div className="tourism-section">
                <img
                    src="/static/image/glavnaya.png"
                    alt="Фоновое изображение"
                    className="background-image"
                />
                <Header />
                <div className="tourism-options flex justify-center gap-8 absolute bottom-10 w-full">
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/walking_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Пеший туризм</h3>
                        </a>
                        <a href="/walking_tourism/" className="text-blue-500 hover:underline">Перейти &gt;</a>
                    </div>
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/water_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Водный туризм</h3>
                        </a>
                        <a href="/water_tourism/" className="text-blue-500 hover:underline">Перейти &gt;</a>
                    </div>
                    <div className="tourism-item bg-white p-4 rounded-lg shadow-lg">
                        <a href="/mountain_tourism/" className="text-xl font-semibold text-blue-600 hover:underline">
                            <h3>Горный туризм</h3>
                        </a>
                        <a href="/mountain_tourism/" className="text-blue-500 hover:underline">Перейти &gt;</a>
                    </div>
                </div>
            </div>

            <div className="promo-section">
                <div className="promo-background">
                    <img
                        src="/static/image/gooooryi.png"
                        alt="Промо изображение"
                        className="background-image"
                    />
                    <div className="tourism-heading-container">
                        <img
                            src="/static/image/shcola.png"
                            alt="Школа правильного туризма"
                            className="tourism-logo"
                        />
                        <p className="promo-text">
                            Место, где каждый может научиться самостоятельно организовывать походы и уверенно чувствовать себя в любых природных условиях.
                        </p>
                        <div className="white-rectangle">
                            <p className="promo-text" style={{ color: "black" }}>
                                НАША МИССИЯ
                            </p>
                            <p className="promo-text" style={{ color: "black", fontSize: "20px", fontFamily: "Manrope" }}>
                                передать знания, которые помогут вам не только наслаждаться красотой дикой природы, но и делать это безопасно и грамотно.
                            </p>
                            <p className="promo-text" style={{ color: "black", fontSize: "28px" }}>
                                Мы обучаем базовым и продвинутым навыкам в трёх направлениях:
                            </p>

                            <div className="directions-container">
                                <div className="direction-item">
                                    <div className="direction-content">
                                        <img
                                            src="/static/image/Arrow 1.png"
                                            alt="Стрелка"
                                            className="direction-arrow" />
                                        <p className="direction-text">
                                            <strong>Пеший туризм</strong> – походы по равнинам, лесам и холмистым местностям, где вы научитесь правильно планировать маршруты, ориентироваться на местности и комфортно обустраивать лагерь.
                                        </p>
                                    </div>
                                </div>

                                <div className="direction-item">
                                    <div className="direction-content">
                                        <img
                                            src="/static/image/Arrow 2.png"
                                            alt="Стрелка"
                                            className="direction-arrow" />
                                        <p className="direction-text">
                                            <strong>Водный туризм</strong> – сплавы по рекам и озёрам, включая обучение техникам гребли, навигации и безопасности на воде.
                                        </p>
                                    </div>
                                </div>

                                <div className="direction-item">
                                    <div className="direction-content">
                                        <img
                                            src="/static/image/Arrow 3.png"
                                            alt="Стрелка"
                                            className="direction-arrow" />
                                        <p className="direction-text">
                                            <strong>Горный туризм</strong> – путешествия по горам, с акцентом на физическую подготовку, преодоление сложных подъёмов и использование специального снаряжения.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="promo-text" style={{ color: "black", fontSize: "22px", fontFamily: "Manrope", marginTop: "30px" }}>
                                Наша школа — это практический опыт, который вы приобретаете вместе с командой опытных инструкторов.
                            </p>
                            <p className="promo-text" style={{ color: "black", fontSize: "30px", marginTop: "20px" }}>
                                Присоединяйтесь и откройте для себя мир туризма, где свобода и уверенность идут рука об руку!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Наши популярные маршруты:</h2>
            <div className="popular-routes">
                <div className="route-cards">
                    <a href="/stolby_route/" className="route-card-link">
                        <div className="route-card">
                            <img src="/static/image/stolb.png" alt="Столбы" />
                            <div className="route-info">
                                <h3>Столбы</h3>
                                <p>Протяженность по времени: 7 часов</p>
                                <p>Включено: <br /> Трансфер</p>
                                <a href="/stolby_route/" className="route-details">Подробнее</a>
                            </div>
                        </div>
                    </a>
                    <a href="/elbrus_route/" className="route-card-link">
                        <div className="route-card">
                            <img src="/static/image/elbrus.jpg" alt="Эльбрус" />
                            <div className="route-info">
                                <h3>Эльбрус</h3>
                                <p>Протяженность по времени: 5-7 дней</p>
                                <p>Включено: <br />Питание, Трансфер</p>
                                <a href="/elbrus_route/" className="route-details">Подробнее</a>
                            </div>
                        </div>
                    </a>
                    <a href="/mansky_route/" className="route-card-link">
                        <div className="route-card">
                            <img src="/static/image/mansky.jpg" alt="Манский порог" />
                            <div className="route-info">
                                <h3>Манский порог</h3>
                                <p>Протяженность по времени: 3 часа</p>
                                <p>Включено: <br />Трансфер</p>
                                <a href="/mansky_route/" className="route-details">Подробнее</a>
                            </div>
                        </div>
                    </a>
                    <a href="/ergaki_route/" className="route-card-link">
                        <div className="route-card">
                            <img src="/static/image/Ergaki.png" alt="Ергаки" />
                            <div className="route-info">
                                <h3>Ергаки</h3>
                                <p>Протяженность по времени: 5-7 дней</p>
                                <p>Включено: <br />Питание, Трансфер</p>
                                <a href="/ergaki_route/" className="route-details">Подробнее</a>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="calendar-buttons">
                <button
                    className={`calendar-btn ${viewMode === 'month' ? 'active' : ''}`}
                    onClick={() => setViewMode('month')}>
                    Месяц
                </button>
                <button
                    className={`calendar-btn ${viewMode === 'year' ? 'active' : ''}`}
                    onClick={() => setViewMode('year')}>
                    Год
                </button>
                <button
                    className={`calendar-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}>
                    Список
                </button>
            </div>

            {viewMode === 'month' ? <MonthView /> :
                viewMode === 'year' ? <YearView /> :
                    <ListView />}
        </div>
    );
}
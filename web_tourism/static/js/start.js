function Start() {
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
                        src="/static/image/glavnaya.png"
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

                            {/* Блок с направлениями */}
                            <div className="directions-container">
                                <div className="direction-item">
                                    <div className="direction-content">
                                        <img
                                            src="/static/image/Arrow 1.png"
                                            alt="Стрелка"
                                            className="direction-arrow"/>
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
                                            className="direction-arrow"/>
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
                                            className="direction-arrow"/>
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
            <div className="calendar-section">
                <h2>Календарь с занятиями</h2>
            </div>
        </div>
    );
}
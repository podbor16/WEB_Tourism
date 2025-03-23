function Start() {
    return (
        <div>
            {/* Секция с туризмом */}
            <div className="tourism-section">
                <img
                    src="/static/image/IMG_6230.jpg"
                    alt="Фоновое изображение"
                    className="background-image"
                />
                <Header />
                <div className="tourism-options">
                    <div className="tourism-item">
                        <h3>Пеший туризм</h3>
                        <a href="/walking_tourism/">Перейти&gt;</a>
                    </div>
                    <div className="tourism-item">
                        <h3>Водный туризм</h3>
                        <a href="/water_tourism/">Перейти&gt;</a>
                    </div>
                    <div className="tourism-item">
                        <h3>Горный туризм</h3>
                        <a href="/mountain_tourism/">Перейти&gt;</a>
                    </div>
                </div>
            </div>

            {/* Описание туризма */}
            <div className="tourism-description">
                <p style={{ padding: '5px' }}>
                    <b>Школа правильного туризма ЕБУЧИЙ ТЕСТ ОТ 23.03</b> — это место, где каждый может научиться самостоятельно организовывать походы и уверенно чувствовать себя в любых природных условиях.
                </p>
                <p style={{ padding: '5px' }}>
                    <b>Наша миссия</b> — передать знания, которые помогут вам не только наслаждаться красотой дикой природы, но и делать это безопасно и грамотно.
                </p>
                <p style={{ padding: '5px' }}>Мы обучаем базовым и продвинутым навыкам в трех направлениях:</p>
                <p style={{ padding: '5px' }}>
                    🐾<b> Пеший туризм </b> — походы по равнинам, лесам и холмистым местностям, где вы научитесь правильно планировать маршруты, ориентироваться на местности и комфортно обустраивать лагерь.
                </p>
                <p style={{ padding: '5px' }}>
                    💦<b> Водный туризм </b> — сплавы по рекам и озерам, включая обучение техникам гребли, навигации и безопасности на воде.
                </p>
                <p style={{ padding: '5px' }}>
                    🌄<b> Горный туризм </b> — путешествия по горам, с акцентом на физическую подготовку, преодоление сложных подъемов и использование специального снаряжения.
                </p>
                <p style={{ padding: '5px' }}>
                    Наша школа — это практический опыт, который вы приобретаете вместе с командой опытных инструкторов. Присоединяйтесь и откройте для себя мир туризма, где свобода и уверенность идут рука об руку!
                </p>
            </div>

            {/* Популярные маршруты */}
            <h2>Наши популярные маршруты:</h2>
            <div className="popular-routes">
                <div className="route-cards">
                    <div className="route-card">
                        <img src="/static/image/stolb.png" alt="Столбы" />
                        <div className="route-info">
                            <h3>Столбы</h3>
                            <p>Протяженность по времени: 7 часов</p>
                            <p>Включено: <br /> Трансфер</p>
                            <a href="/stolby_route/">Подробнее</a>
                        </div>
                    </div>
                    <div className="route-card">
                        <img src="/static/image/elbrus.jpg" alt="Эльбрус" />
                        <div className="route-info">
                            <h3>Эльбрус</h3>
                            <p>Протяженность по времени: 5-7 дней</p>
                            <p>Включено: <br />Питание, Трансфер</p>
                            <a href="/elbrus_route/">Подробнее</a>
                        </div>
                    </div>
                    <div className="route-card">
                        <img src="/static/image/mansky.jpg" alt="Манский порог" />
                        <div className="route-info">
                            <h3>Манский порог</h3>
                            <p>Протяженность по времени: 3 часа</p>
                            <p>Включено: <br />Трансфер</p>
                            <a href="/mansky_route/">Подробнее</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Календарь */}
            <div className="calendar-section">
                <h2>Календарь с занятиями</h2>
                {/* Здесь можно добавить календарь позже */}
            </div>
        </div>
    );
}
function Zagolowok() {
    const title = "СТОЛБЫ";
    return (
        <div className="route-heading-container">
            <h1 className="route-heading">{title}</h1>
        </div>
    );
}
function InfoFrame() {
    return (
        <div className="info-frame-container">
            <div className="info-frame-group">
                <div className="info-item-row">
                    <div className="info-item-label">Продолжительность</div>
                    <div className="info-item-value">4-6 часов</div>
                </div>

                <div className="info-item-row">
                    <div className="info-item-label">Точка старта</div>
                    <div className="info-item-value">Остановка "Турбаза"</div>
                </div>

                <div className="info-item-row">
                    <div className="info-item-label">Уровень сложности</div>
                    <div className="info-item-value">средний</div>
                </div>

                <div className="info-item-row">
                    <div className="info-item-label">Минимальный возраст</div>
                    <div className="info-item-value">нет ограничений</div>
                </div>

                <div className="info-item-row">
                    <div className="info-item-label">Ночевки</div>
                    <div className="info-item-value">не требуется</div>
                </div>

                <div className="info-item-row">
                    <div className="info-item-label">Связь</div>
                    <div className="info-item-value multiline">
                        доступна на большей<br />части маршрута
                    </div>
                </div>
            </div>
        </div>
    );
}

function Route() {
    return (
        <div>
            <div className="route-section">
                <img
                    src="/static/image/Stolby_fon.png"
                    alt="Фоновое изображение"
                    className="background-image"
                />
                <Header />
                <Zagolowok />
                <div className="frame">
                    <div className="group">
                        <div className="rectangle" />

                        <p className="div">
                            <span className="span">
                                {" "}
                                Красноярские Столбы — национальный парк в Красноярском крае на северо-западных отрогах
                                Восточного Саяна, граничащих со Среднесибирским плоскогорьем. Ранее имел статус заповедника
                                и назывался «заповедник „Столбы“.
                            </span>
                        </p>

                        <div className="text-wrapper-2">Введение</div>
                    </div>
                </div>
                <div className="info-header">
                    <div className="info-header-text">ИНФОРМАЦИЯ</div>
                </div>
                <div className="dark-info-section">
                    <InfoFrame />
                </div>
            </div>
        </div>
    );
}
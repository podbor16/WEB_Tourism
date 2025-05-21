const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [theme, setTheme] = React.useState("light");
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [isChoiceModalOpen, setIsChoiceModalOpen] = React.useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark-theme", newTheme === "dark");
    };

    const openChoiceModal = (e) => {
        e.preventDefault();
        setIsChoiceModalOpen(true);
        setIsLoginModalOpen(false);
        setIsRegistering(false);
    };

    return (
        <React.Fragment>
            <nav className="navbar">
                <div className="container">
                    <a href="/" className="navbar-brand">LOGO</a>
                    <div className="navbar-wrap">
                        <ul className="navbar-menu">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
                                    Направления
                                </a>
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu open">
                                        <li><a href="/walking_tourism/">Пеший туризм</a></li>
                                        <li><a href="/water_tourism/">Водный туризм</a></li>
                                        <li><a href="/mountain_tourism/">Горный туризм</a></li>
                                    </ul>
                                )}
                            </li>
                            <li><a href="/media/">Медиа</a></li>
                            <li><a href="/medicine/">Медицина</a></li>
                            <li><a href="/about_project/">Контакты</a></li>
                            <li><a href="#" onClick={openChoiceModal}>Профиль</a></li>
                            <li>
                                <a href="#" className="callback theme-toggle vertical-toggle" onClick={toggleTheme}>
                                    <span>{theme === "light" ? "☀️" : "🌙"}</span>
                                    <span>{theme === "light" ? "🌙" : "☀️"}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Выбор вход/регистрация */}
            {(isChoiceModalOpen || isLoginModalOpen || isRegistering) && (
                <div className="modal-overlay" onClick={() => {
                    setIsChoiceModalOpen(false);
                    setIsLoginModalOpen(false);
                    setIsRegistering(false);
                }}>
                    {!isLoginModalOpen && !isRegistering && (
                        <div className="auth-choice-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal" onClick={() => setIsChoiceModalOpen(false)}>×</button>
                            <h2>Вход или регистрация</h2>
                            <button className="register-button" onClick={() => {
                                setIsRegistering(true);
                                setIsChoiceModalOpen(false);
                            }}>
                                Зарегистрироваться
                            </button>
                            <div className="divider">
                                <hr /><span>Уже есть аккаунт?</span><hr />
                            </div>
                            <button className="login-button" onClick={() => {
                                setIsLoginModalOpen(true);
                                setIsChoiceModalOpen(false);
                            }}>
                                Войти
                            </button>
                        </div>
                    )}
                    {/* Форма входа */}
                    {isLoginModalOpen && (
                        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>Вход</h2>
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Введите свой адрес электронной почты" />
                                </div>
                                <div className="form-group">
                                    <label>Пароль</label>
                                    <input type="password" placeholder="Введите свой пароль" />
                                </div>
                                <div className="form-footer">
                                    <a href="#" className="forgot-password">Забыли пароль?</a>
                                    <button type="submit" className="login-button">Войти</button>
                                </div>
                            </form>
                            <button className="close-modal" onClick={() => setIsLoginModalOpen(false)}>×</button>
                        </div>
                    )}
                    {/* Форма регистрации */}
                    {isRegistering && (
                        <div className="register-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>Регистрация</h2>
                            <form>
                                <div className="form-group">
                                    <label>Фамилия</label>
                                    <input type="text" placeholder="Введите вашу фамилию" required />
                                </div>
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input type="text" placeholder="Введите ваше имя" required />
                                </div>
                                <div className="form-group">
                                    <label>Дата рождения</label>
                                    <input type="date" required />
                                </div>
                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input type="tel" placeholder="+7 (___) ___-__-__" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Введите адрес электронной почты" required />
                                </div>
                                <div className="form-group">
                                    <label>Город</label>
                                    <input type="text" placeholder="Ваш город" required />
                                </div>
                                <div className="form-group">
                                    <label>Придумайте пароль</label>
                                    <input type="password" placeholder="Пароль" required />
                                </div>
                                <button type="submit" className="register-submit-button">Зарегистрироваться</button>
                            </form>
                            <button className="close-modal" onClick={() => setIsRegistering(false)}>×</button>
                        </div>
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

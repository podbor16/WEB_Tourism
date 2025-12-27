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

    const handleLogout = async () => {
        try {
            const response = await fetch('/account/logout/', { method: 'POST' });
            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
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

                            {/* Блок профиля */}
                            <li className="profile-section">
                                {window.user && window.user.isAuthenticated ? (
                                    <div className="user-menu">
                                        <span>{window.user.username}</span> |
                                        <a href="/account/profile/">Личный кабинет</a> |
                                        <a href="#" onClick={handleLogout}>Выйти</a>
                                    </div>
                                ) : (
                                    <a href="#" onClick={openChoiceModal}>Профиль</a>
                                )}
                            </li>

                            {/* Переключатель темы */}
                            <li>
                                <div className={`theme-switch-button ${theme}`} onClick={toggleTheme}>
                                    <div className="icon-wrapper">
                                        <img
                                            src={theme === "light" ? "/static/image/sun.png" : "/static/image/moon.png"}
                                            alt="theme icon"
                                            className="theme-icon"
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Модальные окна */}
            {(isChoiceModalOpen || isLoginModalOpen || isRegistering) && (
                <div
                    className="modal-overlay"
                    onClick={() => {
                        setIsChoiceModalOpen(false);
                        setIsLoginModalOpen(false);
                        setIsRegistering(false);
                    }}
                >

                    {/* Окно выбора */}
                    {!isLoginModalOpen && !isRegistering && (
                        <div className="auth-choice-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal" onClick={() => setIsChoiceModalOpen(false)}>×</button>
                            <h2>Вход или регистрация</h2>

                            <button
                                className="register-button"
                                onClick={() => {
                                    setIsRegistering(true);
                                    setIsChoiceModalOpen(false);
                                }}
                            >
                                Зарегистрироваться
                            </button>

                            <div className="divider">
                                <hr /><span>Уже есть аккаунт?</span><hr />
                            </div>

                            <button
                                className="login-button"
                                onClick={() => {
                                    setIsLoginModalOpen(true);
                                    setIsChoiceModalOpen(false);
                                }}
                            >
                                Войти
                            </button>
                        </div>
                    )}
                    {/* Форма входа */}
                    {isLoginModalOpen && (
                        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>Вход</h2>

                            <form method="POST" action="/account/login/">
                                <input type="hidden" name="csrfmiddlewaretoken" value={window.csrfToken} />

                                <div className="form-group">
                                    <label htmlFor="id_username">Имя пользователя</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="id_username"
                                        placeholder="Введите имя пользователя"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="id_password">Пароль</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="id_password"
                                        placeholder="Введите свой пароль"
                                        required
                                    />
                                </div>

                                <div className="form-footer">
                                    <a href="/account/password_reset/" className="forgot-password">Забыли пароль?</a>
                                    <button type="submit" className="login-button">Войти</button>
                                </div>
                            </form>

                            <button className="close-modal" onClick={() => setIsRegistering(false)}>×</button>
                        </div>
                    )}
                    {/* Форма регистрации */}
                    {isRegistering && (
                        <div className="register-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>Регистрация</h2>

                            <form method="POST" action="/account/signup/">
                                <input type="hidden" name="csrfmiddlewaretoken" value={window.csrfToken} />

                                <div className="form-group">
                                    <label>Фамилия</label>
                                    <input type="text" name="last_name" required />
                                </div>

                                <div className="form-group">
                                    <label>Имя</label>
                                    <input type="text" name="first_name" required />
                                </div>

                                <div className="form-group">
                                    <label>Дата рождения</label>
                                    <input type="date" name="birth_date" required />
                                </div>

                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input type="tel" name="phone" required />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" required />
                                </div>

                                <div className="form-group">
                                    <label>Город</label>
                                    <input type="text" name="city" required />
                                </div>

                                <div className="form-group">
                                    <label>Пароль</label>
                                    <input type="password" name="password1" required />
                                </div>

                                <button type="submit" className="register-submit-button">
                                    Зарегистрироваться
                                </button>
                            </form>

                            <button className="close-modal" onClick={() => setIsRegistering(false)}>×</button>
                        </div>
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

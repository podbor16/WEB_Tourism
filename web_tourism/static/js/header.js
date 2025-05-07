const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [theme, setTheme] = React.useState("light");
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark-theme", newTheme === "dark");
    };

    const toggleLoginModal = (e) => {
        e.preventDefault();
        setIsLoginModalOpen(!isLoginModalOpen);
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
                            <li><a href="#" onClick={toggleLoginModal}>Профиль</a></li>
                            <li>
                                <a href="#" className="callback theme-toggle" onClick={toggleTheme}>
                                    {theme === "light" ? "☀️|🌙" : "☀️|🌙"}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {isLoginModalOpen && (
                <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
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
                </div>
            )}
        </React.Fragment>
    );
};
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
        </React.Fragment>
    );
};

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [theme, setTheme] = React.useState("light");

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark-theme", newTheme === "dark");
    };

    const tourismRoutes = {
        walking: [
            { name: "Столбы", link: "/routes/stolby/" },
            { name: "Ергаки", link: "/routes/ergaki/" },
            { name: "Кутурчинское белогорье", link: "/routes/kuturcha/" },
            { name: "Мининские столбы", link: "/routes/mininskie/" },
        ],
        water: [
            { name: "Катунь", link: "/routes/katun/" },
            { name: "Есауловка", link: "/routes/esaulovka/" },
            { name: "Мана", link: "/routes/mana/" },
            { name: "Рыбная", link: "/routes/rybnaya/" },
        ],
        mountain: [
            { name: "Борус", link: "/routes/borus/" },
            { name: "Арктру", link: "/routes/arctru/" },
            { name: "Белуха", link: "/routes/beluha/" },
            { name: "Казбек", link: "/routes/kazbek/" },
        ],
    };

    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="navbar-brand">LOGO</a>
                <div className="navbar-wrap">
                    <ul className="navbar-menu">
                        <li
                            className="dropdown"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
                                Направления
                            </a>
                            {isDropdownOpen && (
                                <ul className="dropdown-menu open">
                                    <li className="tourism-item-container">
                                        <a href="/walking_tourism/">Пеший туризм</a>
                                        <ul className="routes-dropdown">
                                            {tourismRoutes.walking.map((route, i) => (
                                                <li key={i}><a href={route.link}>{route.name}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="tourism-item-container">
                                        <a href="/water_tourism/">Водный туризм</a>
                                        <ul className="routes-dropdown">
                                            {tourismRoutes.water.map((route, i) => (
                                                <li key={i}><a href={route.link}>{route.name}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="tourism-item-container">
                                        <a href="/mountain_tourism/">Горный туризм</a>
                                        <ul className="routes-dropdown">
                                            {tourismRoutes.mountain.map((route, i) => (
                                                <li key={i}><a href={route.link}>{route.name}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li><a href="/media/">Медиа</a></li>
                        <li><a href="/medicine/">Медицина</a></li>
                        <li><a href="/about_project/">Контакты</a></li>
                        <li><a href="/account/profile/">Профиль</a></li>
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
    );
};

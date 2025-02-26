function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [theme, setTheme] = React.useState("light");

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        document.body.classList.toggle("dark-theme");
    };

    return (
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
                                <ul className="dropdown-menu">
                                    <li><a href="/walking_tourism/">Пеший туризм</a></li>
                                    <li><a href="/water_tourism/">Водный туризм</a></li>
                                    <li><a href="/mountain_tourism/">Горный туризм</a></li>
                                </ul>
                            )}
                        </li>
                        <li><a href="/media/">Медиа</a></li>
                        <li><a href="/medicine/">Медицина</a></li>
                        <li><a href="/about_project/">Контакты</a></li>
                        <li>
                            <a href="#" className="callback theme-toggle" onClick={toggleTheme}>
                                {theme === "light" ? "☀️|🌙" : "☀️|🌙"}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

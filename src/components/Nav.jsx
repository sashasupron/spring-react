import '../index.css'; 


function NavBar({navItems}) {
    return (
        <nav className="nav"> 
            {navItems.map((item, index) => {
                if (!item.title) {
                    return item.items.map((subItem, i) => {
                        if (typeof subItem === 'object' && subItem.className) {
                            return (
                                <span key={i} className={subItem.className}>
                                    {subItem.label}
                                </span>
                            );
                        }
                        return null;
                    });
                }

                return (
                    <div key={index} className="navbar-item-wrapper">
                        <div className="navbar-link">
                            {item.title}
                            <span className="arrow-down"></span>
                        </div>
                        <ul className="navbar-dropdown">
                            {item.items.map((subItem, i) => {
                                if (typeof subItem === 'string') {
                                    if (subItem === '') {
                                        return <li key={i} style={{ height: '1.5em' }}></li>;
                                    }
                                    return (
                                        <li key={i}>
                                            <a className="navbar-item">{subItem}</a>
                                        </li>
                                    );
                                } else if (typeof subItem === 'object') {
                                    return (
                                        <li key={i}>
                                            <a className="navbar-item">
                                                {subItem.label}
                                                <img
                                                    src={subItem.icon}
                                                    alt={subItem.iconAlt}
                                                    width={subItem.iconWidth}
                                                    height={subItem.iconHeight}
                                                />
                                            </a>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                );
            })}
        </nav>
    );
}

export default NavBar;
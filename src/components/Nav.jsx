import React, { useState } from 'react';
import '../index.css';

function NavBar({ navItems }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="nav">
      {navItems.map((item, index) => {
        if (!item.title) { // tanzu spring
          return item.items.map((subItem, i) => {
            if (typeof subItem === "object" && subItem.className) {
              return (
                <span key={i} className={subItem.className}>
                  {subItem.label}
                </span>
              );
            }
            return null;
          });
        }

        const isOpen = openDropdown === index;

        return (
          <div key={index} className="navbar-item-wrapper">
            <div
              className="navbar-link"
              onClick={() => toggleDropdown(index)}
              style={{ cursor: 'pointer' }}
            >
              {item.title}
              <span className="arrow-down"></span>
            </div>
            <ul className={`navbar-dropdown ${isOpen ? 'navDrop-open' : ''}`}>
              {item.items.map((subItem, i) => {
                if (typeof subItem === 'string') {
                  if (subItem === '') { // empty lines
                    return <li key={i} style={{ height: '1.5em' }}></li>;
                  }
                  return (
                    <li key={i}>
                      <a href="#" className="navbar-item">
                        {subItem}
                      </a>
                    </li>
                  );
                } else if (typeof subItem === 'object') { // img
                  return (
                    <li key={i}>
                      <a href="#" className="navbar-item">
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

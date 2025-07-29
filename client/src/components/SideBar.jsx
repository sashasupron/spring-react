import { useState } from "react";
import { NavBar } from "./Nav";

function SideBar({ navItems }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      <button
        className={`burger-menu ${isNavOpen ? "hidden" : ""}`}
        onClick={toggleNav}
      >
        ☰
      </button>

      <nav id="side-bar" className={isNavOpen ? "nav-open" : ""}>
        <button
          id="close-button"
          className={isNavOpen ? "button-open" : ""}
          onClick={toggleNav}
        >
          &#x2715;
        </button>
        <NavBar navItems={navItems} />
      </nav>
    </>
  );
}

export { SideBar };

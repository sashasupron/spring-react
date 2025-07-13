import "../index.css";
import navItems from "../data/navItems";
import SideBar from "./SideBar";

function Header() {
  return (
    <header className="header">
      <img id="logo" src="assets/icons/Spring.svg" alt="Logo" />

     <SideBar navItems={navItems} />
    </header>
  );
}

export default Header;

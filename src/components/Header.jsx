import '../index.css'; 
import navItems from '../data/navItems';
import NavBar from './Nav';


function Header() {
    return (
        <header className="header">
            <img id="logo" src="assets/icons/Spring.svg" alt="Logo" />

            <div className="burger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <button id="close-button">&#x2715;</button>

            <NavBar navItems={navItems} />
        </header>
    );
}


export default Header;
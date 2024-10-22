import { useState } from 'react';
import { Link } from "react-router-dom";
import './style.css';

const MainNavbar = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);

    const openSideNav = () => setSideNavOpen(true);
    const closeSideNav = () => setSideNavOpen(false);

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/homepage">
                        <img
                            src="https://cdn.glitch.global/e2081ffb-88b9-4a6a-99f1-550a785a48b6/WhatsApp%20Image%202024-09-30%20at%2011.11.43_a2b32ab8.jpg?v=1729424881320"
                            alt="Srini Property Services Logo"
                            title="Srini Property Services Logo"
                            height="50px"
                            loading="lazy"
                        />
                        <h1><strong>GGP Community</strong></h1>
                    </Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/"><strong>Home</strong></Link></li>
                    <li><Link to=""><strong>Events</strong></Link></li>
                    <li><Link to="/workshops"><strong>Work Shops</strong></Link></li>
                    <li><Link to="/jobs"><strong>Jobs</strong></Link></li>
                    <li><Link to=""><strong>AboutUs</strong></Link></li>
                </ul>
                <button className="menu-btn" id="menu-btn" aria-label="Open Menu" onClick={openSideNav}>
                    &#9776;
                </button>
            </nav>

            <div className={`side-nav ${sideNavOpen ? 'open' : ''}`} id="side-nav" role="navigation" aria-label="Side Navigation">
                <button className="close-btn" id="close-btn" aria-label="Close Menu" onClick={closeSideNav}>
                    &times;
                </button>
                <ul className="side-nav-links">
                    <li><Link to="/"><strong>Home</strong></Link></li>
                    <li><Link to=""><strong>Events</strong></Link></li>
                    <li><Link to="/jobs"><strong>Jobs</strong></Link></li>
                    <li><Link to="/workshops"><strong>Work Shops</strong></Link></li>
                    <li><Link to=""><strong>Contact</strong></Link></li>
                </ul>
            </div>
        </>
    );
};

export default MainNavbar;

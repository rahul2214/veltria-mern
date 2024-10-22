import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";
import LogoutButton from "../LogoutButton";
import './style.css'
const NavBar = () => {
    const { authUser } = useAuthContext();
  
    return (

        <div >
            <nav className="navbar">
                <div className="logo">
                    <Link to="/dashboard">
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
                    <li><Link to="/dashboard" >Home</Link></li>
                    <li><Link to="/workshopList">WorkShops List</Link></li>

                    <li><Link to="/employeeList">Jobs List</Link></li>
                    <li>{authUser.username}</li>
                    <li><LogoutButton /></li>
                </ul>
              

            </nav>
          
        </div>
    )
}

export default NavBar;

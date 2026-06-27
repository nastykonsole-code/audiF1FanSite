import { Link } from "react-router-dom";
import logo from "../assets/Audif1.com_logo.svg";
import "../styles/Navbar.css";


function Navbar() {
  return (
    <nav id="navbar">
        <Link to="/"><img src={logo} /></Link>
        <div id="links">
          <Link to="/team">Team</Link>
          <Link to="/car">Car</Link>
          <Link to="/season">Season</Link>
          <Link to="/more">More</Link>
        </div>
      </nav>
  );
}

export default Navbar;
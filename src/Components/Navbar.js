import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">edugueetar</h2>
      <ul className="navLinks">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/metronom">Metronom</Link></li>
        <li><Link to="/tuner">Tuner</Link></li>
        <li><Link to="/academia">Academia</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

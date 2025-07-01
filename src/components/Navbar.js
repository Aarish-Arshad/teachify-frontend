import "../styles/Navbar.css";
import ScrollLink from "./ScrollLink";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import logo from "../assets/logo.png"

const { Header } = Layout;

const menuItems = [
  {
    key: "home",
    label: <ScrollLink to="home">Home</ScrollLink>,
  },
  {
    key: "features",
    label: <ScrollLink to="features">Features</ScrollLink>,
  },
  {
    key: "whychoose",
    label: <ScrollLink to="whychoose">Why Choose Us</ScrollLink>,
  },
  {
    key: "testimonials",
    label: <ScrollLink to="testimonials">Testimonials</ScrollLink>,
  },
];

function Navbar() {
  return (
    <Header className="navbar">
      
      <img src={logo} className="logo" ></img>
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        className="center-menu"
        items={menuItems}
      />
      <div className="auth-links">
        <Link to="/signup">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </Header>
  );
}

export default Navbar;

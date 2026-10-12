import "./header.css";
import gcLogo from "../../assets/images/gc_gaming_logo.svg";
import profileIcon from "../../assets/images/profile-icon.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { text: "Inicio", path: "/" },
  { text: "Productos", path: "/products" },
  { text: "Contacto", path: "/contact" },
  { text: "Acerca de Nosotros", path: "/about" },
  { text: "Registro", path: "/register" },
  { text: "Portal Admin", path: "/admin", protected: true },
];

function Header() {
  const isUserAdmin = true;
  const navigate = useNavigate();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark px-0">
        <div className="container-fluid px-0">
          <div className="nav-brand">
            <img className="logo-header" src={gcLogo} alt="Gaming Center" />
            <h1>
              Gaming <span className="title-span">Center</span>
            </h1>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto nav-list">
              {NAV_LINKS.map((link) => {
                if (link.protected && !isUserAdmin) {
                  return null;
                }

                return (
                  <li className="nav-item" key={link.path}>
                    <NavLink to={link.path} className="nav-link">
                      {link.text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="nav-login">
              <button className="buttom-cart">
                <i className="fa-solid fa-cart-shopping" />
              </button>
              <img
                className="profile-icon"
                src={profileIcon}
                alt="Profile Icon"
              />
              <button className="buttom-login" onClick={() => navigate("/login")}>
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

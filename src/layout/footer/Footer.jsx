import "./footer.css";
import gcLogo from "../../assets/images/gc_gaming_logo.svg";

function Footer() {
  return (
    <footer>
      <section className="footer-brand">
        <img
          className="logo-footer"
          src={gcLogo}
          alt="Gaming Center logo"
        />
        <h2>
          Gaming <span className="title-span">Center</span>
        </h2>
        <p>Tu tienda gamer de confianza.</p>
      </section>
      <section className="footer-socialmedia">
        <h3>Seguinos</h3>
        <ul className="social-list">
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener">
              <i className="fa-brands fa-linkedin" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener">
              <i className="fa-brands fa-square-facebook" />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener">
              <i className="fa-brands fa-x-twitter" />
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener">
              <i className="fa-brands fa-instagram" />
              <span>Instagram</span>
            </a>
          </li>
        </ul>
      </section>
      <section className="footer-contact">
        <h3>Contacto</h3>
        <ul className="contact-list">
          <li>
            <i className="fa-solid fa-envelope" /> contacto@gamingcenter.io
          </li>
          <li>
            <i className="fa-solid fa-phone" /> +123 456 7890
          </li>
          <li>
            <i className="fa-solid fa-location-dot" /> Gaming 123, Ciudad Gaming
          </li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;

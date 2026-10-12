import "./home.css";
import { getProducts } from "../../services/products.service";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import gtaVi from "../../assets/images/Jason_and_Lucia_01_With_Logos_landscape.jpg";
import rdr2 from "../../assets/images/rdr2_officialart2_desktop.jpg";
import ac4 from "../../assets/images/ac4res.webp";
import heroImage from "../../assets/images/photo-1614285457768-646f65ca8548.avif"
function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("No se pudieron cargar los productos."));
  }, []);

  return (
    <>
      <section>
        <div className="hero-section">
          <div className="hero-box">
            <h2>
              Gaming <span className="title-span">Center</span>
            </h2>
            <p>Bienvenido a tu tienda de juegos favorita!</p>
            <p>
              En Gaming Center, nos apasiona el mundo de los videojuegos y
              estamos comprometidos a ofrecerte la mejor experiencia de compra.
              Ya seas un jugador casual o un entusiasta de los juegos, tenemos
              todo lo que necesitas para sumergirte en tus aventuras virtuales.
            </p>
          </div>
          <div className="hero-image">
            <img
              src= {heroImage}
              alt="Gaming Center"
            />
          </div>
        </div>
      </section>
      <section>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={rdr2}
                className="d-block w-100"
                alt="rdr2"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Red Dead Redemption 2</h5>
                <p>
                  Sabiendo que va a morir, Arthur dedica sus últimos días a
                  ayudar a su compañero John Marston a escapar con su familia
                  para que puedan tener un futuro honrado.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={ac4}
                className="d-block w-100"
                alt="AC4"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Assassins Creed Black Flag: Resynced</h5>
                <p>
                  Edward es un joven galés pobre, ambicioso y rebelde que busca
                  dinero y gloria en el mar Caribe durante la Edad de Oro de la
                  piratería.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={gtaVi}
                className="d-block w-100"
                alt="gtavi"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Grand Theft Auto VI</h5>
                <p>Una historia de amor criminal al estilo Bonnie y Clyde.</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="products-section">
        <h2 className="product-title">Nuestro catalogo de juegos</h2>
        <p className="product-text">
          Conoce nuestros mejores juegos y descuentos especiales
        </p>
        {error && <p className="loader-error">{error}</p>}
        <div className="product-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="features-section">
        <h2 className="features-title">¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-truck-fast" />
            </div>
            <h3>Envío gratis</h3>
            <p>En compras a partir de $25. Entrega rápida a todo el país.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <h3>Garantía 12 meses</h3>
            <p>
              Todos nuestros productos cuentan con garantía oficial del
              fabricante.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-headset" />
            </div>
            <h3>Soporte 24/7</h3>
            <p>
              Nuestro equipo está disponible para ayudarte en cualquier momento.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-credit-card" />
            </div>
            <h3>Múltiples pagos</h3>
            <p>
              Pagá con tarjeta, transferencia, cuotas o en efectivo. Sin
              problema.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

import "./about.css";

function About() {
  return (
    <main>
      <section className="about-header">
        <div className="about-card">
          <div className="about-section">
            <h2>Sobre el proyecto</h2>
            <p>
              Gaming Center es una tienda online dedicada a ofrecer una amplia
              variedad de videojuegos, consolas y accesorios para gamers de
              todas las edades. Nuestro objetivo es proporcionar a nuestros
              clientes una experiencia de compra excepcional, con productos de
              alta calidad y un servicio al cliente amigable y eficiente. En
              Gaming Center, nos apasiona el mundo de los videojuegos y nos
              esforzamos por ser la tienda de referencia para todos los
              entusiastas del gaming.
            </p>
            <p>
              Nos enorgullece ofrecer una amplia selección de productos, desde
              los últimos lanzamientos hasta clásicos atemporales, para
              satisfacer las necesidades de todos los tipos de jugadores.
              Además, nuestro equipo de atención al cliente está siempre
              disponible para ayudar a nuestros clientes con cualquier consulta
              o problema que puedan tener, asegurando una experiencia de compra
              sin complicaciones y satisfactoria.
            </p>
            <p>
              Este proyecto es una ecommerce de videojuegos, desarrollado como
              parte de un proyecto académico. El objetivo es generar un
              ecommerce funcional, Utilizando HTML, CSS en una primera etapa y
              luego agregando funcionalidades con JavaScript. El proyecto se
              centra en ofrecer una experiencia de compra atractiva y fácil de
              usar para los amantes de los videojuegos, con un catálogo de
              productos, carrito de compras y proceso de pago simulado.
            </p>
          </div>
          <div className="about-image">
            <img
              src="./src/assets/images/gc_gaming_logo.svg"
              alt="Imagen de videojuegos"
            />
          </div>
        </div>
      </section>
      <section className="dev-profile-section">
        <div className="dev-profile-card">
          <div className="dev-profile-avatar">
            <img src="./src/assets/images/dev-image.jpeg" alt="" />
          </div>
          <div className="dev-profile-info">
            <span className="dev-profile-tag">Desarrollador</span>
            <h2>Santiago Maldonado</h2>
            <p>
              Estudiante de desarrollo web full stack con enfoque en el stack
              MERN. Actualmente trabajo en el sector IT como coordinador en un
              área de soporte y gestión de incidencias, lo que me permite
              combinar la experiencia operativa con el aprendizaje técnico de
              programación. Este proyecto forma parte de mi formación práctica
              en el desarrollo de aplicaciones web.
            </p>
            <div className="dev-profile-tags">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;

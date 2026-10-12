import "./contact.css";

function Contact() {
  return (
    <main>
      <div className="contact-box">
        <section className="contact-form-section">
          <h2 className="contact-title">Dejanos tu consulta</h2>
          <form className="contact-form" action="">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" required="" placeholder="Juan Perez" />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                required=""
                placeholder="juan.perez@gamingcenter.io"
              />
            </div>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                required=""
                placeholder="Dejanos tu consulta acá..."
                minLength={20}
                maxLength={1000}
                defaultValue={""}
              />
            </div>
            <button type="submit" className="contact-submit">
              Enviar
            </button>
          </form>
        </section>
        <section className="contact-map-section">
          <div className="map-box">
            <iframe
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d639.6980614521389!2d-58.37517977236963!3d-34.608700578170286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad3a8e03a1f%3A0x39e898196816ca97!2sAv.%20Rivadavia%20600%20c1069%2C%20C1067%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1780866336812!5m2!1ses-419!2sar"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
        <section className="contact-info-section">
          <div className="contact-info-card">
            <i className="fa-solid fa-location-dot contact-info-icon" />
            <div>
              <h3 className="contact-info-title">¿Dónde estamos?</h3>
              <p>Av. Gaming 123, Ciudad Gaming</p>
            </div>
          </div>
          <div className="contact-info-card">
            <i className="fa-regular fa-clock contact-info-icon" />
            <div>
              <h3 className="contact-info-title">Horarios de atención</h3>
              <p>
                Lunes a Viernes de 9:00 a 18:00hs. - Sábados de 9:00 a 13:00hs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;

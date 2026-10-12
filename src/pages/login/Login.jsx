import "./login.css";
import { useForm } from "react-hook-form";
import gcLogo from "../../assets/images/gc_gaming_logo.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // En esta entrega no se autentica contra una API: solo se muestran los datos.
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main>
      <section className="login-section">
        <div className="login-card">
          <img className="login-logo" src={gcLogo} alt="Gaming Center" />
          <h1>Iniciar sesión</h1>
          <p className="subtitle">Ingresá tus datos para acceder a tu cuenta</p>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="correo@ejemplo.com"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Formato de correo inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="field-error">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Tu contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              {errors.password && (
                <p className="field-error">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-login w-100">
              Ingresar
            </button>
            <a href="#" className="login-forgot">
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;

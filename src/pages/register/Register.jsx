import "./register.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createUser } from "../../services/users.service";

const PROVINCES = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Otro país",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      birthDate: "",
      province: "",
    },
  });

  const onSubmit = async ({ repeatPassword: _repeat, ...data }) => {
    try {
      await createUser(data);
      Swal.fire({
        title: "Registro exitoso",
        text: `Bienvenido/a ${data.name}`,
        icon: "success",
      });
      reset();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error al registrarse",
        text: "No pudimos crear tu cuenta. Intentá nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <main>
      <section className="register-section">
        <div className="register-card">
          <h1>Crear cuenta</h1>
          <p className="subtitle">Completá tus datos para registrarte</p>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Ej: Juan García"
                {...register("name", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 80, message: "Máximo 80 caracteres" },
                })}
              />
              {errors.name && (
                <p className="field-error">{errors.name.message}</p>
              )}
            </div>
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mínimo 6 caracteres"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              {errors.password && (
                <p className="field-error">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">
                Repetir contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                placeholder="Repetí tu contraseña"
                {...register("repeatPassword", {
                  required: "Repetí la contraseña",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors.repeatPassword && (
                <p className="field-error">{errors.repeatPassword.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                {...register("birthDate", {
                  required: "La fecha de nacimiento es obligatoria",
                })}
              />
              {errors.birthDate && (
                <p className="field-error">{errors.birthDate.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="province" className="form-label">
                Provincia o país
              </label>
              <select
                className="form-select"
                id="province"
                {...register("province", { required: "Seleccioná una opción" })}
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p className="field-error">{errors.province.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-register w-100"
              disabled={isSubmitting}
            >
              Registrarme
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;

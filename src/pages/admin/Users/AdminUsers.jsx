import "../admin.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../services/users.service";

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

const EMPTY = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  birthDate: "",
  province: "",
};

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY });

  const loadUsers = async () => {
    try {
      setUsers(await getUsers());
      setError(null);
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    reset({
      ...EMPTY,
      ...user,
      repeatPassword: user.password ?? "",
      birthDate: user.birthDate ? String(user.birthDate).slice(0, 10) : "",
    });
  };

  const handleCancel = () => {
    setSelectedUser(null);
    reset(EMPTY);
  };

  const onSubmit = async ({ repeatPassword: _repeat, ...data }) => {
    const isEditing = Boolean(selectedUser);
    try {
      if (isEditing) {
        await updateUser(selectedUser.id, {
          ...data,
          createdAt: selectedUser.createdAt,
        });
      } else {
        await createUser(data);
      }
      Swal.fire({
        title: isEditing ? "Usuario actualizado" : "Usuario creado",
        text: `El usuario ${data.name} se guardó correctamente`,
        icon: "success",
      });
      handleCancel();
      loadUsers();
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: `No se pudo ${isEditing ? "actualizar" : "crear"} el usuario`,
        icon: "error",
      });
    }
  };

  const handleDelete = async (user) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${user.name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;

    try {
      await deleteUser(user.id);
      Swal.fire({ title: "Usuario eliminado", icon: "success" });
      if (selectedUser?.id === user.id) handleCancel();
      loadUsers();
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el usuario",
        icon: "error",
      });
    }
  };

  return (
    <section className="adm-section">
      <div className="fr-products">
        <h2>{selectedUser ? "Editar usuario" : "Agregar usuario"}</h2>

        <form
          className="products-charge"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group-adm">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              placeholder="Ej: Juan García"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 80, message: "Máximo 80 caracteres" },
              })}
            />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>

          <div className="form-group-adm">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
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

          <div className="form-group-adm">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
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

          <div className="form-group-adm">
            <label htmlFor="repeatPassword">Repetir contraseña</label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="Repetí la contraseña"
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

          <div className="form-group-adm">
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              type="date"
              {...register("birthDate", {
                required: "La fecha de nacimiento es obligatoria",
              })}
            />
            {errors.birthDate && (
              <p className="field-error">{errors.birthDate.message}</p>
            )}
          </div>

          <div className="form-group-adm">
            <label htmlFor="province">Provincia o país</label>
            <select
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

          <div className="adm-form-actions">
            <button
              type="submit"
              className="btn-adm-submit"
              disabled={isSubmitting}
            >
              {selectedUser ? "Guardar cambios" : "Guardar usuario"}
            </button>
            {selectedUser && (
              <button
                type="button"
                className="btn-adm-cancel"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="tb-products">
        <h2>Usuarios registrados</h2>
        {error && <p className="loader-error">{error}</p>}
        {!loading && !error && (
          <table className="table-colums">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Nacimiento</th>
                <th>Provincia</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={7}>No hay usuarios registrados.</td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.birthDate
                      ? new Date(user.birthDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{user.province}</td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="btn-adm-edit"
                      onClick={() => handleEdit(user)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-adm-delete"
                      onClick={() => handleDelete(user)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default AdminUsers;

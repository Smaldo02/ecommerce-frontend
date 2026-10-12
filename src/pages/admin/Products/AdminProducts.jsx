import "../admin.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/products.service";

const EMPTY = {
  name: "",
  image: "",
  price: "",
  description: "",
  category: "",
  stock: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY });

  const loadProducts = async () => {
    try {
      setProducts(await getProducts());
      setError(null);
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    reset({ ...EMPTY, ...product });
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    reset(EMPTY);
  };

  const onSubmit = async (data) => {
    const isEditing = Boolean(selectedProduct);
    try {
      if (isEditing) {
        await updateProduct(selectedProduct.id, data);
      } else {
        await createProduct(data);
      }
      Swal.fire({
        title: isEditing ? "Producto actualizado" : "Producto creado",
        text: `El producto ${data.name} se guardó correctamente`,
        icon: "success",
      });
      handleCancel();
      loadProducts();
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: `No se pudo ${isEditing ? "actualizar" : "crear"} el producto`,
        icon: "error",
      });
    }
  };

  const handleDelete = async (product) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar producto?",
      text: `Se eliminará "${product.name}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;

    try {
      await deleteProduct(product.id);
      Swal.fire({ title: "Producto eliminado", icon: "success" });
      if (selectedProduct?.id === product.id) handleCancel();
      loadProducts();
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el producto",
        icon: "error",
      });
    }
  };

  return (
    <section className="adm-section">
      <div className="fr-products">
        <h2>{selectedProduct ? "Editar producto" : "Agregar producto"}</h2>

        <form
          className="products-charge"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group-adm">
            <label htmlFor="name">Nombre del producto</label>
            <input
              id="name"
              type="text"
              placeholder="Ingresa el nombre del producto"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p className="field-error">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group-adm">
            <label htmlFor="image">Imagen (URL)</label>
            <input
              id="image"
              type="url"
              placeholder="Ingresa la URL de la imagen del producto"
              {...register("image", { required: "La imagen es obligatoria" })}
            />
            {errors.image && (
              <p className="field-error">{errors.image.message}</p>
            )}
          </div>

          <div className="form-group-adm">
            <label htmlFor="price">Precio del producto</label>
            <input
              id="price"
              type="number"
              min="0"
              step="any"
              placeholder="Ingresa el precio"
              {...register("price", {
                valueAsNumber: true,
                required: "El precio es obligatorio",
                min: { value: 0, message: "El precio no puede ser negativo" },
              })}
            />
            {errors.price && (
              <p className="field-error">{errors.price.message}</p>
            )}
          </div>

          <div className="form-group-adm">
            <label htmlFor="description">Descripción del producto</label>
            <textarea
              id="description"
              placeholder="Breve descripcion del producto aquí"
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
            />
            {errors.description && (
              <p className="field-error">{errors.description.message}</p>
            )}
          </div>

          <div className="form-group-adm">
            <label htmlFor="category">Categoría del producto</label>
            <select
              id="category"
              {...register("category", {
                required: "Seleccioná una categoría",
              })}
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              <option value="Juego">Juego</option>
              <option value="Consola">Consola</option>
              <option value="PC">PC</option>
            </select>
            {errors.category && (
              <p className="field-error">{errors.category.message}</p>
            )}
          </div>

          <div className="form-group-adm">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              min="0"
              {...register("stock", {
                valueAsNumber: true,
                required: "El stock es obligatorio",
                min: { value: 0, message: "El stock no puede ser negativo" },
              })}
            />
            {errors.stock && (
              <p className="field-error">{errors.stock.message}</p>
            )}
          </div>

          <div className="adm-form-actions">
            <button
              type="submit"
              className="btn-adm-submit"
              disabled={isSubmitting}
            >
              {selectedProduct ? "Guardar cambios" : "Guardar producto"}
            </button>
            {selectedProduct && (
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
        <h2>Productos cargados</h2>
        {error && <p className="loader-error">{error}</p>}
        {!loading && !error && (
          <table className="table-colums">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha de Ingreso</th>
                <th>Stock</th>
                <th>Categoria</th>
                <th>Fecha de actualización</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={9}>No hay productos cargados.</td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.updatedAt
                      ? new Date(product.updatedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="btn-adm-edit"
                      onClick={() => handleEdit(product)}
                    >
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-adm-delete"
                      onClick={() => handleDelete(product)}
                    >
                      <i class="fa-solid fa-trash"></i>
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

export default AdminProducts;

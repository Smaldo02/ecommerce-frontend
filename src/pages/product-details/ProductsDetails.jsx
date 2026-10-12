import "./products-details.css";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../services/products.service";
import { useEffect, useState } from "react";

function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => setError("No se pudo cargar el producto."));
  }, [id]);

  if (error) {
    return (
      <main>
        <p className="loader-error">
          {error} <Link to="/products">Volver a productos</Link>
        </p>
      </main>
    );
  }

  if (!product) {
    return <main />;
  }

  return (
    <main>
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-3 shadow"
            />
          </div>
          <div className="col-md-6">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="pd-price">${product.price}</span>
            </div>
            <p className="pd-description">{product.description}</p>
            <ul className="pd-specs list-unstyled mb-4">
              <li>
                <strong>Stock:</strong>{" "}
                <span className={`pd-stock ${product.stock > 0 ? "" : "pd-stock--out"}`}>
                  {product.stock > 0
                    ? `Disponible (${product.stock})`
                    : "Sin stock"}
                </span>
              </li>
              {product.createdAt && (
                <li>
                  <strong>Ingreso:</strong>{" "}
                  {new Date(product.createdAt).toLocaleDateString()}
                </li>
              )}
            </ul>
            <button className="btn pd-btn-cart w-100 mt-4">
              <i className="fa-solid fa-cart-shopping me-2" /> Agregar al
              carrito
            </button>
            <Link to="/products" className="btn pd-btn-back w-100 mt-2">
              <i className="fa-solid fa-arrow-left me-2" /> Volver a productos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductsDetails;

import "./products.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products.service";
import ProductCard from "../../components/ui/ProductCard";

const CATEGORIES = ["Juego", "Consola", "PC"];

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("No se pudieron cargar los productos."));
  }, []);

  const visible = products.filter(
    (product) => !category || product.category === category,
  );

  return (
    <main>
      <section className="products-header">
        <div className="product-section-title">
          <h2>Productos</h2>
        </div>
      </section>
      <div className="products-layout">
        <aside className="products-sidebar">
          <div className="filter-group">
            <div className="filter-header">
              <h3>Categoría</h3>
            </div>
            <hr className="filter-divider" />
            <ul className="filter-options">
              <li>
                <label>
                  <input
                    type="radio"
                    name="category"
                    checked={category === ""}
                    onChange={() => setCategory("")}
                  />
                  Todas
                </label>
              </li>
              {CATEGORIES.map((item) => (
                <li key={item}>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => setCategory(item)}
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="products-content">
          {error && <p className="loader-error">{error}</p>}
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Products;

import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const inStock = product.stock > 0;

  return (
    <div className="card">
      <div className="card-header">
        <img src={product.image} alt={product.name} />
        <Link to={`/products/${product.id}`} className="details">
          Ver más
        </Link>
      </div>
      <div className="card-body">
        <p className="category-product">{product.category}</p>
        <h3 className="name">{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="info-container">
          <div className="price-container">
            <span className="price">${product.price}</span>
          </div>
          <button className="button">
            Comprar <i className="fa-solid fa-bag-shopping" />
          </button>
        </div>
      </div>
      <div className="card-footer">
        <p className={inStock ? "stock" : "stock no-stock"}>
          {inStock ? "En stock" : "Sin stock"}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;

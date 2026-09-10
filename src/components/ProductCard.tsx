import { Product } from "../types/product";
import "../styles.css";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card">
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="category">{product.category}</div>
    </div>
  );
}

export default ProductCard;

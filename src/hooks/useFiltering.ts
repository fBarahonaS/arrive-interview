import { Product } from "../types/product";

const useFiltering = (products: Product[], query: string) => {
  if (!products || products.length === 0 || !query) {
    return products;
  }

  const filteredProducts: Product[] = products.filter((product) => 
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return filteredProducts;
}

export default useFiltering;

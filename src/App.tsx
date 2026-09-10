import { useEffect, useState } from 'react';
import "./styles.css";
import ProductCard from "./components/ProductCard";
import { Product } from './types/product';
import Header from './components/Header';
import useFiltering from './hooks/useFiltering';
import AlertComponent from './components/AlertComponent';

export default function App() {
  const url = "https://dummyjson.com/products?limit=10";
  const [loading, setLoading] = useState<boolean>(true);
  const [listedProducts, setListedProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setquery] = useState<string>("");
  const [displayErrorAlert, setDisplayErrorAlert] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);

      try {
        const request = await fetch(url, { signal });
        const data = await request.json();
        const prodList: Product[] = data.products;
        setListedProducts(prodList); 
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setDisplayErrorAlert(true);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      setFilteredProducts(useFiltering(listedProducts, query));
    }
  }, [query]);

  const RenderProducts = () => {
    const prodsFullList = query.length > 2 ? filteredProducts : listedProducts;
    if (loading) {
      return <div className="loader">
        Loading Products...
      </div>;
    }

    return prodsFullList.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const filteredProductsMsg = filteredProducts.length > 0 ?
    `Filtered Products: ${filteredProducts.length}` :
    'No products found';

  return (
    <div className="App">
      <h1>Arrive Logistics</h1>

      <Header setquery={setquery} />

      {query.length > 0 && (
        <AlertComponent
          type="info"
          message={filteredProductsMsg}
        />
      )}

      <div className="container">
        {RenderProducts()}
      </div>

      {!loading && displayErrorAlert && (
        <AlertComponent
          type="error"
          message="Failed to fetch products. Please try again later."
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Products = ({ filters, sort, query, limit}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = query ? `/products?search=${query}` : "/products";
        const res = await userRequest.get(endpoint);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [query]);

  useEffect(() => {
    let tempProducts = [...products];

    if (filters) {
      tempProducts = tempProducts.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          !value ? true : item[key]?.includes(value)
        )
      );
    }

    if (sort === "newest") {
      tempProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "asc") {
      tempProducts.sort((a, b) => a.originalPrice - b.originalPrice);
    } else if (sort === "desc") {
      tempProducts.sort((a, b) => b.originalPrice - a.originalPrice);
    }

    setFilteredProducts(tempProducts);
  }, [products, filters, sort]);

  return (
  <div className="flex flex-wrap mx-[40px]">
    {filteredProducts
      .slice(0, limit || filteredProducts.length)
      .map((product) => (
        <Link to={`/product/${product._id}`} key={product._id}>
          <Product product={product} />
        </Link>
      ))}
  </div>
);

};

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.string,
  query: PropTypes.string,
  limit: PropTypes.number,
};

export default Products;

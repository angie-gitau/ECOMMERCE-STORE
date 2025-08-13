import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import AIQuantityEstimator from "../components/AIQuantityEstimator";
import { useState } from "react";

const ProductList = () => {

  const location =useLocation();
  const query = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const {sort, setSort} = useState("newest")

  const handleFilters = (e) =>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between m-4">
        {/* LEFT*/}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Filter Products</span>
          <select name="concern" id="" className="p-2 mb-4 sm:mb-0 sm:mr-4" onChange={handleFilters}>
            <option>Concern</option>
                <option>Cement & Concrete</option>
                <option>Steel & Reinforcement</option>
                <option>Bricks & Blocks</option>
                <option>Wood & Timber</option>
                <option>Roofing Materials</option>
                <option>Flooring & Tiles</option>
                <option>Doors & Windows</option>
                <option>Paints & Coatings</option>
                <option>Plumbing & Pipes</option>
                <option>Electrical Components</option>
                <option>Lighting Fixtures</option>
                <option>Glass & Glazing</option>
                <option>Insulation Materials</option>
                <option>Wall Panels & Cladding</option>
                <option>Waterproofing Solutions</option>
                <option>Fasteners & Adhesives</option>
                <option>Hand Tools</option>
                <option>Power Tools</option>
                <option>Safety Equipment & Gear</option>
                <option>Heavy Machinery & Equipment</option>
                <option>Landscaping & Outdoor Materials</option>
                <option>Drainage & Plumbing Fixtures</option>
                <option>Interior Finishes & Decor</option>
                <option>Sealants & Bonding Agents</option>
          </select>
          <select name="brand" id="" className="p-2 mb-4 sm:mb-0 sm:mr-4" onChange={handleFilters}>
            <option>Brand</option>
            <option>Bamburi cement</option>
            <option>Twyford tiles</option>
            <option>APL Apolo Pipes</option>
            <option>Kenya Builders and Concrete</option>
            <option>Woodways Ltd</option>
          </select>
        </div>
        {/* LEFT*/}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Sort Products</span>
          <select name="price" id="" onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products query={query} filters={filters} sort={sort}/>
      <AIQuantityEstimator />
    </div>
  );
};

export default ProductList;

import Products from "../components/Products";

const ProductList = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between m-4">
        {/* LEFT*/}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Filter Products</span>
          <select name="concern" id="" className="p-2 mb-4 sm:mb-0 sm:mr-4">
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
          <select name="brand" id="" className="p-2 mb-4 sm:mb-0 sm:mr-4">
            <option>Brand</option>
            <option>Bamburi cement</option>
            <option>Bamburi cement</option>
            <option>Bamburi cement</option>
            <option>Bamburi cement</option>
            <option>Bamburi cement</option>
          </select>
        </div>
        {/* LEFT*/}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4">Filter Products</span>
          <select name="" id="">
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductList;

import Product from "./Product";

const Products = () => {
  return (
    <div className="grid grid-cols-4 gap-6 px-[30px]">
      <Product img="/cement.jpg" />
      <Product img="/cement.jpg"/>
      <Product img="/cement.jpg"/>
      <Product img="/cement.jpg"/>
    </div>
  );
};

export default Products;

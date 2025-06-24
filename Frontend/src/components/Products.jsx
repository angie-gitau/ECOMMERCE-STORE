import Product from "./Product";

const Products = () => {
  return (
    <div className="grid grid-cols-4 gap-6 px-[30px]">
      <Product img="/lotion.jpg" />
      <Product img="/lotion1.jpg"/>
      <Product img="/lotion2.jpg"/>
      <Product img="/serum1.jpg"/>
    </div>
  );
};

export default Products;

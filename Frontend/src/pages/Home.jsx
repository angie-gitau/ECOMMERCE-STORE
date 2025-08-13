import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Products limit={3} />
    </div>
  );
};

export default Home;

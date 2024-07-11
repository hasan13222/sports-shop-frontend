import Product from "../../components/ui/Product";
import Slider from "../../components/ui/Slider";

const Home = () => {
  return (
    <>
      <Slider />

      {/* featured products */}
      <div className="featured_section container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Featured Products</h2>
        <div className="featured_products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
      </div>
    </>
  );
};

export default Home;

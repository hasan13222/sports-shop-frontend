import { Layout, Spin } from "antd";
import { FaBars } from "react-icons/fa";
import Slider from "../../components/ui/Slider";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Product from "../../components/ui/Product";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { categories } from "../../constants/categories";
import { useAppDispatch } from "../../redux/hooks";
import { setCategory } from "../../redux/features/product/productQuerySlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Header } = Layout;
const Home = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({
    limit: 8,
  });

  const categoryHandler = (category: string) => {
    dispatch(setCategory(category));
    navigate("/products");
  };
  return (
    <>
      <Slider />
      <Header
        style={{
          display: "flex",
          color: "#ffffff",
          alignItems: "center",
          backgroundColor: "#5EB06C",
          boxShadow: "0 2px 3px 1px #e2e3e2",
        }}
      >
        <div className="mobile_categories block lg:hidden relative">
          <button className="flex items-center gap-1" onClick={() => setShowCategories(!showCategories)}>
            <FaBars />
            <span>Categories</span>
          </button>
          <ul className={`${showCategories ? "block" : "hidden"} absolute top-14 rounded-md bg-black w-[250px] z-10`}>
          {categories.map((category, i) => (
            <li className="cursor-pointer hover:bg-white hover:text-black pl-4" onClick={() => categoryHandler(category)} key={`category${i}`}>
              {category}
            </li>
          ))}
          </ul>
        </div>
        <div className="categories hidden lg:flex">
          {categories.map((category, i) => (
            <div
              key={i}
              className="item hover:bg-white hover:text-primary cursor-pointer"
            >
              <button onClick={() => categoryHandler(category)}>
                {category}
              </button>
            </div>
          ))}
        </div>
      </Header>
      {/* featured products */}
      <div className="featured_section container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Featured Products</h2>
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <div className="featured_products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
          {data?.data?.result?.map((product: TProduct) => (
            <>
              <Product item={product} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

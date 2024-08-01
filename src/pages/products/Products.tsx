import Product from "../../components/ui/Product";
import { CiFilter } from "react-icons/ci";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { Modal, Pagination, Spin } from "antd";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearFilter,
  setPage,
  setSearchTerm,
  setSort,
} from "../../redux/features/product/productQuerySlice";
import { SyntheticEvent, useRef } from "react";
import { setFilterModalOpen } from "../../redux/features/product/productSlice";
import FilterForm from "../../components/form/FilterForm";
import { RiArrowUpDownLine } from "react-icons/ri";

const Products = () => {
  const {
    searchTerm,
    page,
    limit,
    sort,
    category,
    minPrice,
    maxPrice,
    brand,
    minRating,
  } = useAppSelector((state) => state.productQuery);
  const { filterModalOpen } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const { data, isError, error, isFetching }: Record<string, any> =
    useGetProductsQuery({
      searchTerm,
      page,
      limit,
      sort,
      category,
      minPrice,
      maxPrice,
      brand,
      minRating,
    });

    console.log(category,brand, minPrice, maxPrice, minRating)

  const searchFormRef = useRef<HTMLFormElement>(null);
  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = e.currentTarget.searchText.value;
    if (!searchText) {
      return;
    }
    dispatch(setPage(1));
    dispatch(setSearchTerm(searchText));
  };

  const handleCancel = () => {
    dispatch(setFilterModalOpen(false));
  };

  const showFilterModal = () => {
    dispatch(setFilterModalOpen(true));
  };

  const handleClearFilter = () => {
    dispatch(setSearchTerm(""));
    dispatch(clearFilter());
    searchFormRef.current?.reset();
  };

  const sortHandler = () => {
    if(sort === "price"){
      dispatch(setSort("-price"));
    } else{
      dispatch(setSort("price"));
    }
  }

  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Our Products</h2>
        {/* search filter row */}
        <div className="search_filter flex items-center gap-4 mb-4">
          <button
            onClick={showFilterModal}
            className="btn btn-accent text-white"
          >
            <CiFilter className="text-lg text-white"/> <span>Filter</span>
          </button>

          <Modal
            title="Product Filter"
            open={filterModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <FilterForm />
          </Modal>
          <form ref={searchFormRef} onSubmit={handleSearch}>
            <input
              name="searchText"
              type="text"
              className="input input-bordered"
              placeholder="type product name here..."
            />
            <button type="submit" className="btn btn-success text-white ml-1">
              Search
            </button>
          </form>
          <button
            onClick={handleClearFilter}
            className="btn btn-secondary text-white"
          >
            Clear Search & Filter
          </button>
          <div className="justify-self-end">
            <button onClick={sortHandler} className="btn btn-accent text-white">Sort <RiArrowUpDownLine/></button>
          </div>
        </div>

        {isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        
        {/* products */}
        <div className="all_products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
          {data?.data?.result?.map((product: TProduct) => (
            <>
              <Product item={product} />
            </>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-end mt-7">
          <Pagination
            onChange={onPageChange}
            defaultCurrent={data?.data?.meta?.page}
            total={data?.data?.meta?.mainTotal}
            pageSize={data?.data?.meta?.limit}
          />
        </div>
      </div>
    </>
  );
};

export default Products;

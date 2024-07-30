import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { Spin } from "antd";
import { CustomError } from "../../types/baseQueryApi";
import { content } from "../../components/ui/Loading";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { setCart } from "../../redux/features/cart/cartSlice";
import { useRef } from "react";

export type TCartItem = {
  id: string;
  qty: number;
};

const SingleProduct = () => {
  const { productId } = useParams();
  const { data, isLoading, isFetching, isError, error } =
    useGetSingleProductQuery(productId);
  const dispatch = useAppDispatch();
  const cartQtyRef = useRef<HTMLInputElement>(null);

  const addToCartHandler = () => {
    const newItem: TCartItem = {
      id: productId as string,
      qty: Number(cartQtyRef?.current?.value),
    };
    const cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      localStorage.setItem("cartItems", JSON.stringify([newItem]));
    } else {
      const parsedPreviousCartItems = JSON.parse(cartItems as string);
      const isItemAlreadyAdded = parsedPreviousCartItems.find(
        (item: TCartItem) => item.id === productId
      );
      if (isItemAlreadyAdded) {
        toast("The Item is Already In Your Cart");
        return;
      }
      parsedPreviousCartItems.push(newItem);

      localStorage.setItem(
        "cartItems",
        JSON.stringify(parsedPreviousCartItems)
      );
      dispatch(setCart(parsedPreviousCartItems));
      toast.success("The Item added to the cart", {position: "top-right"})
    }
  };

  return (
    <>
      <div
        style={isLoading || isFetching || isError ? {} : { display: "none" }}
        className="container mx-auto px-3 py-8"
      >
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="singleProduct container mx-auto px-3 py-8 flex items-center gap-8">
        <div className="img_wrapper">
          <img
            className="w-[550px] h-[400px] object-contain"
            src={data?.data?.image}
            alt=""
          />
        </div>
        <div className="text_wrapper flex flex-col gap-3">
          <h3 className="font-semibold uppercase">{data?.data?.name}</h3>
          <div className="rating">
            <div className="stars pt-[1px] pr-1 App">
              <Rating
                placeholderRating={data?.data?.rating}
                emptySymbol={<FaRegStar className="text-primary" />}
                placeholderSymbol={<FaStar className="text-primary" />}
                fullSymbol={<FaStar className="text-primary" />}
              />
            </div>
            <p>(Customer Reviews)</p>
          </div>
          <p className="text-accentColor font-semibold">
            Availability: {data?.data?.stock} in Stock
          </p>
          <p>{data?.data?.description}</p>
          <p className="price font-bold text-lg">$20</p>
          <div className="addToCart flex gap-4 items-center">
            <input min={1} ref={cartQtyRef} defaultValue={1} className="shadow p-2 w-16" type="number" />
            <button
              onClick={addToCartHandler}
              disabled={data?.data?.stock - Number(cartQtyRef.current?.value) < 0}
              className="bg-primary text-white rounded-sm px-6 py-2 hover:bg-txtColor"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

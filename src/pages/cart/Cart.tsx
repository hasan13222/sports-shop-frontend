import { Spin } from "antd";
import { useGetCartProductsQuery } from "../../redux/features/cart/cartApi";
import { useAppSelector } from "../../redux/hooks";
import { TCartItem } from "../products/SingleProduct";
import { CustomError } from "../../types/baseQueryApi";
import { content } from "../../components/ui/Loading";
import { TProduct } from "../../types/productType";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/features/cart/cartSlice";
import { toast } from "sonner";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const {cartItems, cartItemIds} = useAppSelector((state) => state.cart);
  const {
    data: cartProducts,
    isError,
    error,
    isFetching,
  }: Record<string, any> = useGetCartProductsQuery(cartItemIds);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseCartHandler = (productId: string) => {
    const increasedQtyItems = cartItems.map((item: TCartItem) =>
      item.id === productId ? { ...item, qty: item.qty + 1 } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(increasedQtyItems));
    dispatch(setCart(increasedQtyItems));
  };
  const decreaseCartHandler = (productId: string) => {
    const decreasedQtyItems = cartItems.map((item: TCartItem) => {
      if (item.id === productId) {
        if (item.qty === 1) {
          toast("Qty reached the minimum limit");
          return;
        } else {
          return { ...item, qty: item.qty - 1 };
        }
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(decreasedQtyItems));
    dispatch(setCart(decreasedQtyItems));
  };
  const removeCartHandler = (id: string) => {
    const FilterCartItems = cartItems.filter((item: TCartItem) => item.id !== id);

    localStorage.setItem("cartItems", JSON.stringify(FilterCartItems));
    dispatch(setCart(FilterCartItems));
  };

  const subtotal = cartProducts?.data?.reduce((acc: number, item: TProduct) => {
    const itemIndex = cartItemIds.indexOf(item._id);
    return acc + (item.price * cartItems[itemIndex]?.qty);
  }, 0);

  const isAnyCartItemStockOut = cartProducts?.data?.find((item: TProduct) => {
    const itemIndex = cartItemIds.indexOf(item._id);
    return item.stock < cartItems[itemIndex]?.qty;
  });

  const proceedCheckoutHandler = () => {
    navigate('/checkout')
  }
  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Cart</h2>
        {isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <div className="cart_price grid grid-cols-3 gap-8 items-start">
          {/* cart products */}
          <div className="cart_products col-span-2 w-full">
            <table className="w-full">
              <tr>
                <th className="border py-2">Items</th>
                <th className="border py-2">Price</th>
                <th className="border py-2">Quantity</th>
                <th className="border py-2">Total</th>
                <th className="border py-2">Action</th>
              </tr>
              {cartProducts?.data.map((product: TProduct) => {
                const productIndex = cartItemIds.indexOf(product._id);

                return (
                  <tr id={product._id}>
                    <td className="border p-5 text-center">
                      <div className="img-wrap flex justify-center">
                        <img
                          className="w-[75px] h-auto object-contain"
                          src={product.image}
                          alt=""
                        />
                      </div>

                      <p className="text-center">{product.name}</p>
                    </td>
                    <td className="border p-5 text-center">${product.price}</td>
                    <td className="border p-5 text-center">
                      <button
                        onClick={() => decreaseCartHandler(product._id as string)}
                        className="p-1 px-2 bg-gray-200"
                      >
                        -
                      </button>
                      <span className="p-1 px-2 bg-gray-50">
                        {cartItems[productIndex]?.qty}
                      </span>
                      <button
                        onClick={() => increaseCartHandler(product._id as string)}
                        className="p-1 px-2 bg-gray-200"
                      >
                        +
                      </button>
                      {isAnyCartItemStockOut?._id === product._id && (<p>The Item is stock out</p>)}
                    </td>
                    <td className="border p-5 text-center">{cartItems[productIndex]?.qty * product.price}</td>
                    <td className="border p-5 text-center">
                      <button
                        onClick={() => removeCartHandler(product._id as string)}
                        className="btn px-2 min-h-8 h-8 btn-error text-white"
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>

          {/* price details */}
          <div className="price_details card mt-0 m-8 p-5 border border-green-500 rounded-md">
            <h2 className="font-semibold text-lg mb-5">Price Summary</h2>
            <div className="items">
              <div className="item mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="item mb-2 flex justify-between">
                <span>Vat (15%)</span>
                <span>${(subtotal * 0.15).toFixed(2)}</span>
              </div>
              <div className="total item border-t flex justify-between border-gray-300 my-3 pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">${(subtotal + (subtotal*0.15)).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={proceedCheckoutHandler} disabled={isAnyCartItemStockOut} className="btn btn-success text-white">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

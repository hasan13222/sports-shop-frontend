import { useForm } from "react-hook-form";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { CustomError } from "../../types/baseQueryApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TCartItem } from "../../pages/products/SingleProduct";
import {
  clearCart,
  setSingleProductId,
} from "../../redux/features/cart/cartSlice";
import { Spin } from "antd";
import { content } from "../ui/Loading";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  // getting cartItems and single product id from redux
  const { cartItems, singleProductId } = useAppSelector((state) => state.cart);

  // fetching single product data
  const {
    data: SingleProduct,
    refetch,
    isError,
  } = useGetSingleProductQuery(singleProductId);

  // update product query from rtk
  const [updateProduct, { isError: isUpdateError, isLoading, error }] =
    useUpdateProductMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // reack hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // update product error handling
  if (isUpdateError) {
    console.log(error);
    toast.error((error as CustomError).data.message, {
      duration: 3000,
      position: "top-right",
    });
  }

  // checkout functionality
  const onSubmit = async (data: any) => {
    console.log(data);
    placeOrder();
  };

  const placeOrder = () => {
    let res: any;
    let n: number = 0;

    // for every cart item trigger update product request to database
    cartItems.forEach(async (cartItem: TCartItem) => {
      // fetching each product data one by one through rtk
      dispatch(setSingleProductId(cartItem.id));

      // if single product data fetch failed try again
      if (!SingleProduct) {
        refetch();
      }

      // if any error show error message
      if (isError) {
        console.log(error);
        toast.error((error as CustomError).data.message, {
          duration: 3000,
          position: "top-right",
        });
      }

      // update product functionality
      res = await updateProduct({ productId: cartItem.id, data: { stock: SingleProduct?.data?.stock - cartItem.qty } });

      // if product update is successful, show success message
      if (res?.data?.success) {
        n++;
        if (cartItems.length === n) {
          dispatch(clearCart());
          localStorage.removeItem("cartItems");
          toast.success("Your Order is placed successfully", {
            duration: 2000,
            position: "top-right",
          });
          navigate("/");
        }
      }
    });
  };
  return (
    <>
      {isLoading && (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      )}
      
      {/* checkout form */}
      <form
        className="flex flex-col gap-3 max-w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* billing details */}
        <h3 className="font-semibold text-lg">Billing Details</h3>
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            className="py-2 border rounded-md px-2"
            {...register("full_name", { required: true })}
          />
          <p className="text-red-500">
            {errors.full_name && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="py-2 border rounded-md px-2"
            {...register("email", { required: true })}
          />
          <p className="text-red-500">
            {errors.email && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            className="py-2 border rounded-md px-2"
            {...register("phone", { required: true })}
          />
          <p className="text-red-500">
            {errors.phone && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>City</label>
          <input
            className="py-2 border rounded-md px-2"
            {...register("city", { required: true })}
          />
          <p className="text-red-500">
            {errors.city && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Delivery Address</label>
          <textarea
            className="py-2 border rounded-md px-2"
            {...register("full_address", { required: true })}
          ></textarea>

          <p className="text-red-500">
            {errors.full_address && <span>This field is required</span>}
          </p>
        </div>

        {/* payment details */}
        <h3 className="font-semibold text-lg">Payment Details</h3>
        <div className="flex gap-2">
          <input
            checked
            value="cash"
            className="py-2 border rounded-md px-2"
            type="radio"
            {...register("payment_option", { required: true })}
          />
          <label>Cash On Delivery</label>
        </div>
        <p className="text-red-500">
          {errors.payment_option && <span>This field is required</span>}
        </p>
        <div>
          <input
            className="btn bg-primary text-white hover:bg-black"
            type="submit"
            value="Place Order"
          />
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;

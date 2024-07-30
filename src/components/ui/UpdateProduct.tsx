import { Space } from "antd";
import { useDeleteProductMutation, useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { CustomError } from "../../types/baseQueryApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFormMode, setmodalOpen, setProductId, setProductPicture } from "../../redux/features/product/productSlice";

const UpdateProduct = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { productId } = useAppSelector(
    (state) => state.product
  );
  const { data, refetch } = useGetSingleProductQuery(productId);
  const [deleteProduct, { isError, error }] = useDeleteProductMutation();

  const handleUpdate = (id: string) => {
    dispatch(setFormMode("update"))
    dispatch(setmodalOpen(true))
    dispatch(setProductId(id));
    refetch();
    dispatch(setProductPicture(data?.data?.image));
  };
  const handleDelete = async (id: string) => {
    const res = await deleteProduct(id);

    if (res?.data?.success) {
      toast.success("Product Deleted successfully!", { duration: 2000, position: "top-right" });
    }

    if (isError) {
      toast.error((error as CustomError).data.message, {
        duration: 3000,
        position: "top-right"
      });
    }
  };

  return (
    <Space size="middle">
      <button
        onClick={() => handleUpdate(id)}
        className="text-primary hover:text-txtColor font-bold"
      >
        Update
      </button>
      <span>/</span>
      <button
        onClick={() => handleDelete(id)}
        className="text-primary hover:text-txtColor font-bold"
      >
        Delete
      </button>
    </Space>
  );
};

export default UpdateProduct;

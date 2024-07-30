import { useForm, SubmitHandler } from "react-hook-form";
import { TProductInput } from "../../types/productType";
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setLoading,
  setmodalOpen,
  setProductPicture,
} from "../../redux/features/product/productSlice";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { CustomError } from "../../types/baseQueryApi";
import { categories } from "../../constants/categories";
import axios from "axios";

export default function ProductForm() {
  const { formMode, productPicture, productId } = useAppSelector(
    (state) => state.product
  );
  const productFileRef = useRef<HTMLInputElement>(null);

  const { data } = useGetSingleProductQuery(productId);

  const [addProduct, { isError, error }] = useAddProductMutation();
  console.log(error);
  const [updateProduct, { isError: isUpdateError, error: UpdateError }] =
    useUpdateProductMutation();
  const dispatch = useAppDispatch();

  const name = data?.data?.name || "";
  const brand = data?.data?.brand || "";
  const description = data?.data?.description || "";
  const category = data?.data?.category || "";
  const stock = data?.data?.stock || "";
  const price = data?.data?.price || "";
  const rating = data?.data?.rating || "";

  const defaultValues = useMemo(() => {
    if (formMode === "add") {
      return {};
    } else if (formMode === "update") {
      return { name, brand, description, price, rating, category, stock };
    }
  }, [name, brand, description, price, rating, category, stock, formMode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProductInput>({ defaultValues });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const custImg = e.target.files[0];
      const data = { image: custImg };

      axios
        .post(
          "https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734",
          data,
          {
            headers: { "content-Type": "multipart/form-data" },
          }
        )
        .then((data) => {
          dispatch(setProductPicture(data.data.data.display_url));
        });
    }
  };

  const onSubmit: SubmitHandler<TProductInput> = async (data) => {
    dispatch(setLoading(true));
    data.stock = Number(data.stock);
    data.rating = 4;
    data.price = Number(data.price);
    if (productPicture) {
      data.image = productPicture;
    }

    // const formdata = new FormData();
    // if (productFileRef.current && productFileRef.current.files) {
    //   formdata.append("file", productFileRef.current?.files[0]);
    // }
    // const stringifyData = JSON.stringify(data);
    // formdata.append("data", stringifyData);

    let res;

    if (formMode === "add") {
      res = await addProduct(data);
      setProductPicture("")
    }

    if (formMode === "update") {
      res = await updateProduct({ productId, data });
    }

    if (res?.data?.success) {
      dispatch(setLoading(false));
      dispatch(setmodalOpen(false));
      toast.success(res?.data?.message, {
        duration: 2000,
        position: "top-right",
      });
    }

    if (isError) {
      dispatch(setmodalOpen(false));
      toast.error((error as CustomError).data.message, {
        duration: 3000,
        position: "top-right",
      });
    }
    if (isUpdateError) {
      console.log(UpdateError);
      dispatch(setmodalOpen(false));
      toast.error((UpdateError as CustomError).data.message, {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    reset(defaultValues);
    if (formMode === "add") {
      reset({});
    }
  }, [data?.data?.image, reset, defaultValues, formMode]);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label>Product Name</label>
        <input
          className="py-2 border rounded-md px-2"
          // defaultValue={!isSPE ? data?.data?.name : ""}
          {...register("name", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.name && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Brand</label>
        <input
          className="py-2 border rounded-md px-2"
          // defaultValue={!isSPE ? data?.data?.brand : ""}
          {...register("brand", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.brand && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Category</label>
        <select
          className="py-2 border rounded-md px-2"
          // defaultValue={!isSPE ? data?.data?.category : ""}
          {...register("category", { required: formMode === "add" })}
        >
          {categories.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>
        <p className="text-red-500">
          {errors.category && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Descritption</label>
        <input
          className="py-2 border rounded-md px-2"
          // defaultValue={!isSPE ? data?.data?.description : ""}
          {...register("description", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.description && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Stock Quantity</label>
        <input
          type="number"
          className="py-2 border rounded-md px-2"
          // defaultValue={!isSPE ? data?.data?.stock : ""}
          {...register("stock", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.stock && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Price</label>
        <input
          type="number"
          className="py-2 border rounded-md px-2"
          // defaultValue={!isSPE ? data?.data?.price : ""}
          {...register("price", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.price && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Image</label>
        <input
          ref={productFileRef}
          onChange={handleImageUpload}
          type="file"
          className="py-2 border rounded-md px-2"
        />
      </div>

      <img
        className="max-w-10 max-h-7 overflow-hidden object-contain"
        src={productPicture ? productPicture : ""}
        alt=""
      />

      <input
        className="btn bg-primary text-white"
        type="submit"
        value={formMode === "add" ? "Add Product" : "Update Product"}
      />
    </form>
  );
}
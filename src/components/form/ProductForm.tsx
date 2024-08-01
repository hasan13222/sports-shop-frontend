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
  // redux product state
  const { formMode, productPicture, productId } = useAppSelector(
    (state) => state.product
  );

  // ref to handle image file
  const productFileRef = useRef<HTMLInputElement>(null);

  // single product fetch
  const { data } = useGetSingleProductQuery(productId);

  // add product query
  const [addProduct, { isError, error }] = useAddProductMutation();
  console.log(error);

  // update product query
  const [updateProduct, { isError: isUpdateError, error: UpdateError }] =
    useUpdateProductMutation();

    // redux dispatch
  const dispatch = useAppDispatch();

  // populate product data when update
  const name = data?.data?.name || "";
  const brand = data?.data?.brand || "";
  const description = data?.data?.description || "";
  const category = data?.data?.category || "";
  const stock = data?.data?.stock || "";
  const price = data?.data?.price || "";
  const rating = data?.data?.rating || "";

  // usememo to toggle form data when updating and adding product
  const defaultValues = useMemo(() => {
    if (formMode === "add") {
      return {};
    } else if (formMode === "update") {
      return { name, brand, description, price, rating, category, stock };
    }
  }, [name, brand, description, price, rating, category, stock, formMode]);

  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProductInput>({ defaultValues });

  // image upload in imgbb
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const custImg = e.target.files[0];
      const data = { image: custImg };

      // imgbb api key
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImgBBapiKey}`,
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
    // loading true until add or update product finished
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

    // toggle add and update
    if (formMode === "add") {
      res = await addProduct(data);
      setProductPicture("")
    }

    if (formMode === "update") {
      res = await updateProduct({ productId, data });
    }

    // success message after add or update
    if (res?.data?.success) {
      dispatch(setLoading(false));
      dispatch(setmodalOpen(false));
      toast.success(res?.data?.message, {
        duration: 2000,
        position: "top-right",
      });
    }

    // add product error handler
    if (isError) {
      dispatch(setmodalOpen(false));
      toast.error((error as CustomError).data.message, {
        duration: 3000,
        position: "top-right",
      });
    }

    // update product error handler
    if (isUpdateError) {
      console.log(UpdateError);
      dispatch(setmodalOpen(false));
      toast.error((UpdateError as CustomError).data.message, {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  // reset form data when form works as add product form
  useEffect(() => {
    reset(defaultValues);
    if (formMode === "add") {
      reset({});
    }
  }, [data?.data?.image, reset, defaultValues, formMode]);

  return (
    // product add and update form
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label>Product Name</label>
        <input
          className="py-2 border rounded-md px-2"
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

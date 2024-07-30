import { SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../constants/categories";
import { useAppDispatch } from "../../redux/hooks";
import { setFilterValues } from "../../redux/features/product/productQuerySlice";
import { setFilterModalOpen } from "../../redux/features/product/productSlice";

const FilterForm = () => {
  const { register, handleSubmit } = useForm<TFilterItem>();
  const dispatch = useAppDispatch();

  interface TFilterItem {
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  }

  const onSubmit: SubmitHandler<TFilterItem> = async (data) => {
    const maxPrice = Number(data.maxPrice) ? Number(data.maxPrice) : Number.POSITIVE_INFINITY;
    dispatch(setFilterValues({
      category: data.category,
      brand: data.brand,
      minPrice: Number(data.minPrice),
      maxPrice,
      minRating: Number(data.minRating)
    }));

    dispatch(setFilterModalOpen(false))
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Brand</label>
          <input
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("brand", { required: false })}
          />
        </div>
        <div className="flex flex-col">
          <label>Category</label>
          <select
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.category : ""}
            {...register("category", { required: false })}
          >
            {categories.map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label>Minimum Price</label>
          <input
            type="number"
            className="py-2 border rounded-md px-2"
            {...register("minPrice", { required: false })}
          />
        </div>
        <div className="flex flex-col">
          <label>Maximum Price</label>
          <input
            type="number"
            className="py-2 border rounded-md px-2"
            {...register("maxPrice", { required: false })}
          />
        </div>
        <div className="flex flex-col">
          <label>Rating</label>
          <input
            type="number"
            className="py-2 border rounded-md px-2"
            {...register("minRating", { required: false })}
          />
        </div>

        <input
          className="btn bg-primary text-white"
          type="submit"
          value="Filter"
        />
      </form>
    </>
  );
};

export default FilterForm;

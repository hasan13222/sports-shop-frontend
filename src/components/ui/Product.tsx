const Product = () => {
  return (
    <>
      <div className="card w-full shadow-xl">
        <figure className="px-5 pt-5">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body p-5 pt-4">
          <div className="flex justify-between">
            <h2 className="card-title text-base font-bold leading-4">Shoes product! </h2>
            <button className="px-2 py-1 rounded-sm bg-slate-700 text-white">Cricket</button>
          </div>

          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p><span className="font-semibold">Brand:</span> YAmaha</p>
          <div className="rating_price flex justify-between items-center">
            <div className="rating">******</div>
            <div className="price">
              <p className="font-bold">$20</p>
            </div>
          </div>
          <div className="card-actions flex justify-between items-center">
            <span className="text-sm font-semibold text-accentColor">
              In Stock: 24
            </span>
            <button className="btn bg-primary text-white">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

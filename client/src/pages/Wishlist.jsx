import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { addAllToCart, addToCart } from "../redux/cartRedux";

// eslint-disable-next-line react/prop-types
export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  return (
    <div className="lg:mx-40 mx-5 my-20">
      <div className="border-y-2 border-gray-300 py-2 flex justify-between items-center flex-wrap lg:flex-nowrap">
        <h1 className="text-3xl font-bold">Wishlist ({wishlist?.length})</h1>
        <button
          onClick={() =>
            dispatch(
              addAllToCart(
                wishlist.map((item) => ({
                  id: item._id,
                  name: item.name,
                  img: item.img,
                  price: item.price,
                  quantity: 1,
                }))
              )
            )
          }
          className="relative px-10 py-3 font-bold text-black group my-3"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span className="relative">ADD ALL TO CART</span>
        </button>
      </div>

      <div className="flex gap-6 flex-wrap justify-center lg:justify-start my-5">
        {wishlist.map((item) => (
          <div key={item._id}>
            <Card item={item} />
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item._id,
                    name: item.name,
                    img: item.img,
                    price: item.price,
                    quantity: 1,
                  })
                )
              }
              className="relative px-10 py-3 font-bold text-black group mt-2 mb-5 w-full"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span className="relative">ADD TO CART</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

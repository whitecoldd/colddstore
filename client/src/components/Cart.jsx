import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { userRequest } from "../req";

// eslint-disable-next-line react/prop-types
const Cart = ({ setCartOpen }) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await userRequest.post(
        "/api/checkout/create-checkout-session",
        {
          products,
        }
      );
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="absolute right-0 lg:right-5 top-20 min-w-[250px] z-[300] bg-white py-6 px-3 lg:p-12 shadow-2xl">
      <div className="flex justify-between items-start">
        <h1 className="mb-7 text-gray-500 text-2xl">Products in your cart</h1>
        <button className={`lg:hidden text-3xl`} onClick={() => setCartOpen(false)}>
          <AiOutlineCloseSquare />
        </button>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {products?.map((item) => (
          <div
            className="flex items-start justify-start gap-5 mb-7 "
            key={item.id}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-24 object-cover"
            />
            <div className="flex items-center justify-between gap-5 mb-7 w-full">
              <div>
                <h1 className="text-lg font-medium">{item.name}</h1>
                <p className="text-gray-500 mb-2 text-sm">
                  {item?.desc?.substring(0, 100)}
                </p>
                <div className="text-teal-700">
                  {item.quantity} x ${item.price}
                </div>
              </div>
              <MdDeleteForever
                className="text-red-700 text-3xl cursor-pointer"
                onClick={() => dispatch(removeItem(item.id))}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-medium text-lg mb-5">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button
        onClick={() => handlePayment()}
        className="w-[250px] p-2 flex items-center justify-center gap-5 cursor-pointer border-none bg-teal-700 text-white font-medium mb-5"
      >
        PROCEED TO CHECKOUT
      </button>
      <span
        className="text-red-700 text-xs cursor-pointer"
        onClick={() => dispatch(resetCart())}
      >
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;

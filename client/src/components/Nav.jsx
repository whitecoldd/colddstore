import { AiTwotoneHeart, AiFillCaretDown } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";
const Nav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.cart.products);
  const categories = useSelector((state) => state.category.categories);
  return (
    <>
      <div className="flex justify-between mx-5 my-6">
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1 hover:text-teal-600 cursor-pointer">
            <h2 className="text-lg font-semibold">USD</h2>
            <AiFillCaretDown />
          </div>
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat._id}
              className="hover:text-teal-600 text-lg font-semibold"
              to={`/category/${cat._id}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="flex font-burtons text-2xl text-teal-600 ml-7">
          <Link to={"/"}> colddstore </Link>
        </div>
        <div className="flex gap-5 items-center">
          <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
            Home
          </Link>
          <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
            About
          </Link>
          <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
            Contact
          </Link>
          <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
            Stores
          </Link>
          <BiSearchAlt className="text-slate-700 text-2xl hover:text-teal-600 font-semibold cursor-pointer mt-0.5" />
          <Link to={"/wishlist"} >
            <AiTwotoneHeart className="text-slate-700 text-2xl hover:text-teal-600 font-semibold cursor-pointer" />
          </Link>

          <Link to={user ? "/profile" : "/register"}>
            <CgProfile className="text-slate-700 text-xl hover:text-teal-600 font-semibold cursor-pointer" />
          </Link>
          <div>
            <MdShoppingCart
              onClick={() => setCartOpen(!cartOpen)}
              className="text-slate-700 absolute hover:text-teal-600 font-semibold cursor-pointer text-2xl"
            />
            <span className="bg-teal-600 rounded-full text-white font-semibold relative px-1.5 text-xs bottom-3 left-3">
              {products.length}
            </span>
          </div>
        </div>
      </div>
      {cartOpen && <Cart />}
    </>
  );
};

export default Nav;

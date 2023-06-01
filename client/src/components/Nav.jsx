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
  const [hamOpen, setHamOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.cart.products);
  const categories = useSelector((state) => state.category.categories);
  const openHamburger = () => {
    setHamOpen(!hamOpen);
  };
  return (
    <>
      <div className="flex justify-between lg:mx-5 lg:my-6 relative">
        <div className="hidden lg:flex lg:gap-5 lg:items-center">
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
        <div className="lg:flex font-burtons text-2xl text-teal-600 lg:ml-7 hidden">
          <Link to={"/"}> colddstore </Link>
        </div>
        <section className="flex flex-col items-end lg:hidden w-full h-full">
          <div className="flex justify-between items-baseline w-full">
            <div className="flex font-burtons text-2xl text-teal-600 sticky z-[200] mx-5 my-6 lg:ml-7">
              <Link to={"/"}> colddstore </Link>
            </div>
            <div
              onClick={() => openHamburger()}
              className="flex flex-col items-end mr-5"
            >
              <div className="space-y-2 sticky z-[200]">
                <span className="block h-0.5 w-8 bg-teal-600"></span>
                <span className="block h-0.5 w-8 bg-teal-600"></span>
                <span className="block h-0.5 w-8 bg-teal-600"></span>
              </div>

              <div
                className={`absolute bg-[#edebe7] z-[100] h-[100vh] w-[100vw] inset-x-0 my-auto ${
                  hamOpen
                    ? "opacity-100 transition-opacity duration-1000 ease-out"
                    : "invisible opacity-0 transition-opacity duration-700 ease-out"
                }`}
              >
                <div className="my-[40%]">
                  <div className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl font-semibold mt-2 hover:text-teal-600 cursor-pointer">
                      USD
                    </h2>
                    {categories.slice(0, 4).map((cat) => (
                      <Link
                        key={cat._id}
                        className="hover:text-teal-600 text-2xl font-semibold"
                        to={`/category/${cat._id}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex gap-5 items-center justify-center mt-7 mr-1">
                    <BiSearchAlt className="text-slate-700 text-2xl hover:text-teal-600 font-semibold cursor-pointer mt-0.5" />
                    <Link to={"/wishlist"}>
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
              </div>
            </div>
          </div>
        </section>

        <div className="lg:flex lg:gap-5 lg:items-center hidden">
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
          <Link to={"/wishlist"}>
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
      {cartOpen && <Cart setCartOpen={setCartOpen} />}
    </>
  );
};

export default Nav;

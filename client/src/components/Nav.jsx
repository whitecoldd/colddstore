import { AiTwotoneHeart, AiFillCaretDown } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutFunc } from "../redux/apiCalls";
const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="flex justify-between mx-5 my-6">
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-1 hover:text-teal-600 cursor-pointer">
          <h2 className="text-lg font-semibold">USD</h2>
          <AiFillCaretDown />
        </div>
        <Link
          className="hover:text-teal-600 text-lg font-semibold"
          to={"/category/:id"}
        >
          women
        </Link>
        <Link
          className="hover:text-teal-600 text-lg font-semibold"
          to={"/category/:id"}
        >
          men
        </Link>
        <Link
          className="hover:text-teal-600 text-lg font-semibold"
          to={"/category/:id"}
        >
          children
        </Link>
        <Link
          className="hover:text-teal-600 text-lg font-semibold"
          to={"/category/:id"}
        >
          accessories
        </Link>
      </div>
      <div className="flex font-burtons text-2xl text-teal-600 ml-7">
        <Link to={"/"}> colddstore </Link>
      </div>
      <div className="flex gap-5 items-center">
        <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
          home
        </Link>
        <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
          about
        </Link>
        <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
          contact
        </Link>
        <Link className="hover:text-teal-600 text-lg font-semibold" to={"/"}>
          stores
        </Link>
        <BiSearchAlt className="text-slate-700 text-2xl hover:text-teal-600 font-semibold cursor-pointer mt-0.5" />
        <AiTwotoneHeart
          onClick={() => logoutFunc(dispatch)}
          className="text-slate-700 text-2xl hover:text-teal-600 font-semibold cursor-pointer"
        />
        <Link to={user ? "/profile" : "/register"}>
          <CgProfile className="text-slate-700 text-xl hover:text-teal-600 font-semibold cursor-pointer" />
        </Link>
        <div>
          <MdShoppingCart className="text-slate-700 absolute hover:text-teal-600 font-semibold cursor-pointer text-2xl" />
          <span className="bg-teal-600 rounded-full text-white font-semibold relative px-1.5 text-xs bottom-3 left-3">
            5
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;

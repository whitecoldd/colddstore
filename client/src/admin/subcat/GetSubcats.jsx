import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRedux, getRedux } from "../../redux/apiCalls";

import { Link } from "react-router-dom";
import {
  deleteSubCatFailure,
  deleteSubCatStart,
  deleteSubCatSuccess,
  getSubCatFailure,
  getSubCatStart,
  getSubCatSuccess,
} from "../../redux/subcatRedux";
import { MdDeleteForever } from "react-icons/md";
import Toggle from "../Toggle";

const GetSubcats = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const subcats = useSelector((state) => state.subcat.subcats);
  useEffect(() => {
    getRedux(
      dispatch,
      getSubCatStart,
      getSubCatSuccess,
      getSubCatFailure,
      "subcat"
    );
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteRedux(
      id,
      dispatch,
      deleteSubCatStart,
      deleteSubCatSuccess,
      deleteSubCatFailure,
      "subcat"
    );
  };

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {subcats.map((cat) => (
          <>
            <article className="relative my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
              <Link key={cat._id} to={`/admin/subcat/${cat._id}`} className="">
                <div className="shadow-lg max-h-[200px] bg-white hover:bg-teal-700 hover:text-white ">
                  <header className="flex items-center justify-center leading-tight p-2 md:p-4 ">
                    <h1 className="text-2xl font-semibol p-2 ">
                      <p className="no-underline">{cat.name}</p>
                    </h1>
                  </header>
                </div>
              </Link>
              <MdDeleteForever
                onClick={() => setToggle(true)}
                className="hover:text-red-600 text-3xl absolute border z-20 cursor-pointer border-white hover:bg-white bg-red-500 text-white top-1   right-5"
              />
            </article>
            {toggle && (
              <Toggle
                onDelete={handleDelete}
                setToggle={setToggle}
                type={"subcategory"}
                id={cat._id}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default GetSubcats;

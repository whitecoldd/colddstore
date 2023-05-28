import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRedux, getRedux } from "../../redux/apiCalls";
import { MdDeleteForever } from "react-icons/md";
import {
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/categoryRedux";
import { Link } from "react-router-dom";
import Toggle from "../Toggle";

const GetCategories = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    getRedux(
      dispatch,
      getCategoryStart,
      getCategorySuccess,
      getCategoryFailure,
      "category"
    );
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteRedux(
      id,
      dispatch,
      deleteCategoryStart,
      deleteCategorySuccess,
      deleteCategoryFailure,
      "category"
    );
  };

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {categories.map((cat) => (
          <>
            <div
              key={cat._id}
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
            >
              <article className="overflow-hidden shadow-lg h-[200px] relative">
                <div>
                  <img
                    alt="Placeholder"
                    className="h-full w-full object-cover"
                    src={cat.img[0]}
                  />
                </div>

                <MdDeleteForever
                  onClick={() => setToggle(true)}
                  className="text-red-600 text-3xl absolute border z-20 cursor-pointer border-white bg-white hover:bg-red-500 hover:text-white top-2 right-2"
                />
                <Link to={`/admin/category/${cat._id}`}>
                  <header className="flex items-center justify-center leading-tight p-2 md:p-4 absolute inset-0">
                    <h1 className="text-2xl font-semibold bg-white hover:bg-gray-200 p-2 ">
                      <p className="no-underline text-black">{cat.name}</p>
                    </h1>
                  </header>
                </Link>
              </article>
            </div>
            {toggle && (
              <Toggle
                onDelete={handleDelete}
                setToggle={setToggle}
                type={"category"}
                id={cat._id}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default GetCategories;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsBoxArrowRight } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { deleteRedux, getRedux } from "../../redux/apiCalls";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../../redux/productRedux";
import { userRequest } from "../../req";
import { Link } from "react-router-dom";
import Toggle from "../Toggle";

const GetProducts = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    getRedux(
      dispatch,
      getProductStart,
      getProductSuccess,
      getProductFailure,
      "product"
    );
  }, [dispatch]);
  const [cat, setCat] = useState([]);
  const [subCat, setSubCat] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await userRequest.get(`/api/category/find`);
        setCat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCats();
  }, []);
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await userRequest.get(`/api/subcat/find`);
        setSubCat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCats();
  }, []);

  console.log(products);

  const handleDelete = (id) => {
    deleteRedux(
      id,
      dispatch,
      deleteProductStart,
      deleteProductSuccess,
      deleteProductFailure,
      "product"
    );
  };

  return (
    <div className="flex flex-row-reverse justify-between items-start">
      <Link
        to={`/admin/addproduct`}
        className="relative px-6 py-3 font-bold text-black group mt-10 mb-5 mr-5"
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
        <span className="relative">Add new product</span>
      </Link>
      <div className="flex flex-col items-start ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b-2 font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-xl">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4 text-xl">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-xl">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4 text-xl">
                      SubCategory
                    </th>
                    <th scope="col" className="px-6 py-4 text-xl">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4 text-xl">
                      <BsBoxArrowRight />
                    </th>
                    <th scope="col" className="px-6 py-4 text-xl">
                      <MdDeleteForever />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr
                        key={product._id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-medium">
                          {product._id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          {cat
                            .filter((cat) => cat._id === product.category)
                            .map((cat) => cat.name)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          {subCat
                            .filter((subcat) => subcat._id === product.subcat)
                            .map((subcat) => subcat.name)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          {product.price}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          <Link to={`/admin/product/${product._id}`}>
                            <BsBoxArrowRight className="text-teal-700" />
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-lg">
                          <MdDeleteForever
                            onClick={() => setToggle(true)}
                            className="text-red-700 cursor-pointer"
                          />
                        </td>
                        {toggle && (
                          <Toggle
                            onDelete={handleDelete}
                            setToggle={setToggle}
                            type={"product"}
                            id={product._id}
                          />
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProducts;

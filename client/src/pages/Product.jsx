import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../req";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiScales3Line } from "react-icons/ri";
import { getRedux } from "../redux/apiCalls";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "../redux/categoryRedux";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCatFailure,
  getSubCatStart,
  getSubCatSuccess,
} from "../redux/subcatRedux";
import { addToCart } from "../redux/cartRedux";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const cat = useSelector((state) => state.category.categories);
  const subcat = useSelector((state) => state.subcat.subcats);
  const id = params.id;
  const [fav, setFav] = useState(false);
  const [qty, setQty] = useState(1);
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/product/find/${id}`);
        setItem(res.data);
        setImage(res.data.img[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, [id]);
  useEffect(() => {
    getRedux(
      dispatch,
      getCategoryStart,
      getCategorySuccess,
      getCategoryFailure,
      "category"
    );
  }, [dispatch]);
  useEffect(() => {
    getRedux(
      dispatch,
      getSubCatStart,
      getSubCatSuccess,
      getSubCatFailure,
      "subcat"
    );
  }, [dispatch]);

  console.log(id);

  return (
    <div className="py-5 px-10 flex gap-12 min-h-[70vh]">
      <div className="flex-1 flex gap-3 ">
        <div className="flex-1 overflow-y-auto max-h-[803px]">
          {item.img?.map((im, i) => (
            <img
              key={i}
              src={im}
              alt=""
              className="w-full h-64 object-cover cursor-pointer mb-3"
              onClick={(e) => setImage(e.currentTarget.src)}
            />
          ))}
        </div>
        <div className="flex-3 ">
          <img src={image} alt="" className="w-full h-[793px] object-cover" />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-6 items-start">
        <h1 className="text-4xl font-bold">{item.name}</h1>
        <span className="text-3xl text-teal-500 font-medium">
          ${item.price}
        </span>
        <span className="text-xl text-gray-500 font-light">
          In stock: {item.qty}
        </span>
        <p className="text-lg font-light text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ullam
          nobis provident qui. Incidunt dolor ex debitis ducimus, voluptatibus
          esse porro cupiditate architecto, nobis quod, laborum magni animi.
          Exercitationem, doloribus.
        </p>
        <div className="flex items-center gap-3 ">
          <button
            className="text-xl font-bold border-2 border-black px-3 py-1"
            onClick={() => setQty((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            &ndash;
          </button>
          <p className="text-xl font-bold">{qty}</p>
          <button
            className="text-xl font-bold border-2 border-black px-3 py-1"
            onClick={() =>
              setQty((prev) => (prev >= item.qty ? item.qty : prev + 1))
            }
          >
            +
          </button>
        </div>
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: item._id,
                name: item.name,
                img: item.img,
                price: item.price,
                qty: qty,
                quantity: qty,
              })
            )
          }
          className="relative px-10 py-3 font-bold text-black group mt-10 mb-5"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span className="relative">ADD TO CART</span>
        </button>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setFav(!fav)}
            className="flex items-center gap-3 text-teal-700"
          >
            {!fav ? (
              <AiOutlineHeart className="text-3xl" />
            ) : (
              <AiFillHeart className="text-3xl" />
            )}
            ADD TO WISH LIST
          </button>
          <button className="flex items-center gap-3 text-teal-700">
            <RiScales3Line className="text-3xl" /> ADD TO COMPARE
          </button>
        </div>
        <div className="text-slate-500 font-medium flex flex-col gap-2">
          <h3>Vendor: {item?.vendor}</h3>
          <h3>
            Type:{" "}
            {subcat
              .filter((sub) => sub._id === item.subcat)
              .map((sub) => sub.name)}
          </h3>
          <h3>
            Tags:{" "}
            {cat
              .filter((sub) => sub._id === item.category)
              .map((sub) => sub.name)}
            ,{" "}
            {subcat
              .filter((sub) => sub._id === item.subcat)
              .map((sub) => sub.name)}
          </h3>
        </div>
        <hr className="h-[2px] bg-gray-400 border-0 w-full" />
        <div className="font-medium text-slate-500 flex flex-col gap-2">
          <div className="uppercase">Description</div>
          <hr className="h-[2px] bg-gray-400 border-0" />
          <div className="uppercase">Additional Info</div>
          <hr className="h-[2px] bg-gray-400 border-0" />
          <div className="uppercase">FAQ</div>
        </div>
      </div>
    </div>
  );
};

export default Product;

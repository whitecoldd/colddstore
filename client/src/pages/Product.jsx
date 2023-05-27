import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../req";

const Product = () => {
  const params = useParams();
  const id = params.id;
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

  console.log(id);
  console.log(item);

  return (
    <div className="py-5 px-10 flex gap-12 min-h-[70vh]">
      <div className="flex-1 flex gap-3 ">
        <div className="flex-1">
          {item.img?.map((im, i) => (
            <img
              key={i}
              src={im}
              alt=""
              className="w-full h-36 object-cover cursor-pointer mb-3"
              onClick={(e) => setImage(e.currentTarget.src)}
            />
          ))}
        </div>
        <div className="flex-3 ">
          <img src={image} alt="" className="w-full h-[700px] object-cover" />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl">{item.name}</h1>
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
        <button className="relative px-6 py-3 font-bold text-black group mt-10 mb-5">
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span className="relative">ADD TO CART</span>
        </button>
        {/* <div className="links">
          <div className="item">
            <FavoriteBorderIcon /> ADD TO WISH LIST
          </div>
          <div className="item">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
        <div className="info">
          <span>Vendor: Polo</span>
          <span>Product Type: T-Shirt</span>
          <span>Tag: T-Shirt, Women, Top</span>
        </div>
        <hr />
        <div className="info">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div> */}
      </div>
    </div>
  );
};

export default Product;

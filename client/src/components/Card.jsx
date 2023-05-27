// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Card = ({ item }) => {
  console.log(item);
  return (
    <Link className="link" to={`/product/${item._id}`}>
      <div className="w-72 flex flex-col gap-2 mb-12">
        <div className="w-full h-96 overflow-hidden relative">
          {/* {item?.attributes.isNew && <span>New Season</span>} */}
          <img
            src={item?.img[0]}
            alt=""
            className="z-10 w-full h-full object-cover absolute hover:z-0"
          />
          <img
            src={item?.img[1]}
            alt=""
            className="w-full h-full object-cover absolute z-0 hover:z-10"
          />
        </div>
        <h2 className="text-xl font-medium">{item.name}</h2>
        <div className="text-lg font-semibold">
          <h3>${item?.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

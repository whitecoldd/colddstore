// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getRedux } from "../redux/apiCalls";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../redux/productRedux";

// eslint-disable-next-line react/prop-types
const Featured = ({ type }) => {
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
  console.log(products);
  return (
    <div className="mx-40 my-10">
      <div className="flex align-center justify-between mb-12">
        <h1 className="flex-2 capitalize font-bold text-3xl">
          {type} products
        </h1>
        <p className="flex-3 text-gray-700">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          temporibus cumque quidem quaerat nesciunt assumenda ut. Obcaecati
          quidem ea libero iste rerum, sapiente quis at totam cumque officia
          illum doloribus.
        </p>
      </div>
      <div className="mx-28 flex gap-10 overflow-x-auto">
        {products.map((product) => (
          <div key={product._id}>
            <Card item={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;

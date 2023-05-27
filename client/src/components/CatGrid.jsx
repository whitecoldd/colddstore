import { useEffect } from "react";
import { getRedux } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "../redux/categoryRedux";
import CatCard from "./CatCard";

const CatGrid = () => {
  const category = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    getRedux(
      dispatch,
      getCategoryStart,
      getCategorySuccess,
      getCategoryFailure,
      "category"
    );
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 grid-rows-2 h-[80vh] gap-2 m-2">
      {category.map((cat, i) => (
        <CatCard key={i} cat={cat} category={category} index={i} />
      ))}
    </div>
  );
};

export default CatGrid;

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { publicRequest } from "../req";

const Category = () => {
  const catId = useParams().id;
  const [maxPrice, setMaxPrice] = useState(250);
  const [sort, setSort] = useState(false);
  const [data, setData] = useState([]);
  const [cat, setCat] = useState({});
  const [subCat, setSubCat] = useState([]);

  console.log(catId);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(
          `/api/product/find?category=${catId}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, [catId]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/subcat/find`);
        setSubCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await publicRequest.get(`/api/category/find/${catId}`);
        setCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCats();
  }, [catId]);

  const [Check, setCheck] = useState([]);
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheck([...Check, e.target.value]);
      console.log(Check);
    } else {
      setCheck(Check.filter((id) => id !== e.target.value));
    }
  };
  const handleSort = () => {
    setSort(!sort);
    if (sort === false) {
      const sorted = [...data].sort((a, b) => (a.price > b.price ? 1 : -1));
      setData(sorted);
    } else if (sort === true) {
      const sorted = [...data].sort((a, b) => (a.price < b.price ? 1 : -1));
      setData(sorted);
    }
  };
  console.log(sort);
  return (
    <div className="py-8 px-12 flex">
      <div className="flex-1 sticky h-full top-12 ">
        <div className="mb-8">
          <h2 className="font-normal mb-5">Product Categories</h2>
          {subCat?.map((item) => (
            <div className="mb-3" key={item._id}>
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                onChange={handleCheck}
              />
              <label htmlFor={item._id} className="ml-2">
                {item?.name}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h2 className="font-normal mb-5">Filter by price</h2>
          <div className="mb-3">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={250}
              step={10}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="mb-8">
          <h2 className=" font-normal mb-5">Sort by</h2>
          <div className="mb-2">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={() => handleSort()}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={() => handleSort()}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="flex-3">
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover mb-12 opacity-80"
            src={cat?.img}
            alt=""
          />
          <h1 className="absolute z-20 text-white text-5xl font-bold min-w-[100px] w-fit h-12 inset-0 m-auto">
            {cat.name}
          </h1>
        </div>
        <div className="flex justify-start gap-10 flex-wrap min-h-[500px]">
          {data
            ?.filter((item) => item.price <= maxPrice)
            .filter((item) =>
              Check.length === 0 ? item.subcat : Check.includes(item.subcat)
            )
            .sort((a, b) => {
              sort ? (a.price > b.price ? 1 : -1) : a.price < b.price ? 1 : -1;
            })
            .map((item) => (
              <Card item={item} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

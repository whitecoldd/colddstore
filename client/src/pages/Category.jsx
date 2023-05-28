import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { publicRequest } from "../req";
import { Range } from "react-range";

const Category = () => {
  const catId = useParams().id;
  const [sort, setSort] = useState(false);
  const [data, setData] = useState([]);
  const [cat, setCat] = useState({});
  const [subCat, setSubCat] = useState([]);
  const [state, setState] = useState({ values: [25, 100] });
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
    <div className="py-8 px-10 flex gap-3">
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
          <div className="mb-3 flex items-center gap-2">
            <span>{state.values[0]}</span>
            {/* <input
              type="range"
              min={0}
              max={250}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            /> */}
            <div className="w-1/2">
              <Range
                step={5}
                min={0}
                max={250}
                allowOverlap={false}
                values={state.values}
                onChange={(values) => setState({ values })}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#0d9488",
                      borderRadius: "10px"
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#0d9488",
                    }}
                  />
                )}
              />
            </div>
            <span>{state.values[1]}</span>
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
            ?.filter(
              (item) =>
                item.price <= state.values[1] && item.price >= state.values[0]
            )
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

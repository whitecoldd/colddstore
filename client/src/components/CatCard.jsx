import { Link } from "react-router-dom";

const CatCard = ({ cat, category, index }) => {
  return (
    <Link
      to={`/category/${cat._id}`}
      className={`flex-1 overflow-hidden z-0 relative  ${
        category.length % 2 !== 0 && index === 1 ? "row-span-2" : ""
      } `}
      key={cat._id}
    >
      <img
        className="w-full h-full object-cover hover:shadow-inner cursor-pointer hover:transition hover:opacity-80"
        src={cat.img[0]}
      />
      <button className="absolute z-20 border-2 text-black font-bold bg-gradient-to-tr from-slate-100 to-gray-100 min-w-[100px] w-fit h-12 p-3 inset-0 m-auto">
        {cat.name}
      </button>
    </Link>
  );
};

export default CatCard;

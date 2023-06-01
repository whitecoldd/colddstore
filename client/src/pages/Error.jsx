import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
const Error = () => {
  return (
    <div className="text-center min-h-[50vh]">
      <h1 className="text-3xl  font-bold">Something went wrong</h1>
      <Link to={"/"}>
        <div className="text-2xl font-bold gap-2 text-teal-600 flex justify-center items-center">
          <h2>Continue shopping</h2>
          <GoArrowRight className="text-2xl mt-1" />
        </div>
      </Link>
    </div>
  );
};

export default Error;

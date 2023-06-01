import { useState } from "react";
import { publicRequest } from "../req";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // const { isFetching } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post(`/api/auth/login`, inputs);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (e) {
      dispatch(loginFailure());
      console.log(e);
    }
  };
  return (
    <div className="lg:mx-40 my-36">
      <div className="text-center mb-10">
        <h1 className="font-semibold text-3xl">Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex gap-10 justify-center">
          <div className="flex flex-col items-center gap-4">
            <input
              name="email"
              type="text"
              placeholder="email or phone"
              onChange={handleInput}
              className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
            />
            <input
              name="psw"
              type="password"
              placeholder="password"
              onChange={handleInput}
              className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
            />
          </div>
        </div>
        <button
          type="submit"
          className="relative px-6 py-3 font-bold text-black group mt-10"
          // disabled={isFetching}
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span className="relative">Submit</span>
        </button>
      </form>
      <div className="flex justify-center gap-1 mt-5 flex-wrap w-full">
        <h1>Don&apos;t have an account?</h1>
        <Link to={"/register"} className="font-medium text-teal-500">
          Register
        </Link>
      </div>
    </div>
  );
}

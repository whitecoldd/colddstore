import { useState } from "react";
import { publicRequest } from "../req";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post(`/api/auth/register`, inputs);
      console.log(res.data);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-40 my-36">
      <div className="text-center mb-10">
        <h1 className="font-semibold text-3xl">Register</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex gap-10 justify-center">
          <div className="flex flex-col items-center gap-4">
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleInput}
              className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
            />
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleInput}
              className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
            />
            <input
              name="phone"
              type="phone"
              placeholder="phone"
              onChange={handleInput}
              className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <input
              name="fname"
              type="text"
              placeholder="first name"
              onChange={handleInput}
              className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
            />
            <input
              name="lname"
              type="text"
              placeholder="last name"
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
          className="relative px-6 py-3 font-bold text-black group mt-10 mb-5"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-teal-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
          <span className="relative">Submit</span>
        </button>
      </form>
    </div>
  );
}

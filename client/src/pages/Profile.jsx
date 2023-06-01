import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../req";
import { logoutFunc } from "../redux/apiCalls";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [userInfo, setUserInfo] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [address, setAddress] = useState([]);
  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleInputAddress = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/api/user/${user._id}`, inputs);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    const addressfull = { address: { ...address } };
    try {
      const res = await userRequest.put(
        `/api/user/${user._id}/address`,
        addressfull
      );
      console.log(res);
    } catch (err) {
      console.log(e);
    }
  };
  console.log(user.address);
  return (
    <div className="flex flex-col lg:flex-row lg:mx-40 mx-5 my-20 gap-7">
      <div className="flex-1 flex flex-col gap-7">
        <div className="bg-white p-10">
          <h1 className="text-3xl">User profile</h1>
          <div className="flex justify-between flex-wrap">
            <div>
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">{user.username}</h1>
              </div>
              <div>
                <h1 className="text-lg">User info</h1>
                <h2 className="text-base italic">
                  {user.fname} {user.lname}
                </h2>
                <h2 className="text-base italic">{user.email}</h2>
                <h2 className="text-base italic">{user.phone}</h2>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-2 lg:gap-0">
              <button
                onClick={() => setUserInfo(false)}
                className="px-5 py-2.5 overflow-hidden group bg-teal-500 relative hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-teal-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Edit user info</span>
              </button>
              <button
                onClick={() => logoutFunc(dispatch)}
                className="px-5 py-2.5 overflow-hidden group bg-teal-500 relative hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-teal-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Logout</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-10">
          <h1 className="text-3xl">Addresses</h1>
          {user.address.length !== 0 ? (
            user.address.map((addr, i) => (
              <div key={i}>
                <h1 className="text-xl font-medium">
                  {addr?.name}&lsquo;s address
                </h1>
                <h4>
                  {addr.row1}, {addr.row2}
                </h4>
                <h1 className="text-xl font-medium">
                  Contacts
                </h1>
                <h4>
                  {addr.email}, {addr.phone}
                </h4>
                <h1 className="text-xl font-medium">
                  Commentary
                </h1>
                <h4>
                  {addr.comment}
                </h4>
              </div>
            ))
          ) : (
            <div>
              <h1 className="text-lg">You have no adresses</h1>
              <button
                onClick={() => setUserInfo(true)}
                className="px-5 py-2.5 overflow-hidden group bg-teal-500 relative hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-teal-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add new address</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-2 bg-white p-10">
        {!userInfo ? (
          <div>
            <h1 className="text-2xl mb-10 font-semibold">Change User Info</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex gap-10 flex-wrap justify-center">
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
        ) : (
          <div>
            <h1 className="text-2xl mb-10 font-semibold">Add new address</h1>
            <form
              onSubmit={handleSubmitAddress}
              className="flex flex-col items-center"
            >
              <div className="flex gap-10 justify-center">
                <div className="flex flex-col items-center gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    onChange={handleInputAddress}
                    className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    onChange={handleInputAddress}
                    className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                  />
                  <input
                    name="phone"
                    type="phone"
                    placeholder="phone"
                    onChange={handleInputAddress}
                    className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <input
                    name="row1"
                    type="text"
                    placeholder="address row 1"
                    onChange={handleInputAddress}
                    className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                  />
                  <input
                    name="row2"
                    type="text"
                    placeholder="address row 2"
                    onChange={handleInputAddress}
                    className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                  />
                  <input
                    name="comment"
                    type="text"
                    placeholder="commentary"
                    onChange={handleInputAddress}
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
        )}
      </div>
    </div>
  );
};

export default Profile;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mx-40 flex flex-col gap-10 mt-20">
      <div className="grid grid-flow-col grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-bold">Categories</h2>
          <div className="leading-6">
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Women
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Men
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Children
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Shoes
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Accessories
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              New Arrivals
            </h4>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Useful Links</h2>
          <div className="leading-7 mt-0.5">
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              FAQ
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Pages
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Stores
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Compare
            </h4>
            <h4 className="text-gray-700 hover:text-cyan-600 cursor-pointer">
              Cookies
            </h4>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">About Us</h2>
          <h3 className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            labore necessitatibus quos facere iusto dignissimos inventore
            corporis est exercitationem repellendus nesciunt harum, eius alias!
            Dolore praesentium modi quaerat quo amet.
          </h3>
        </div>
        <div>
          <h2 className="text-lg font-bold">Contact Info</h2>
          <h3 className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            labore necessitatibus quos facere iusto dignissimos inventore
            corporis est exercitationem repellendus nesciunt harum, eius alias!
            Dolore praesentium modi quaerat quo amet.
          </h3>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-2">
          <Link to={"/"} className="font-burtons text-2xl text-teal-600">
            colddstore{" "}
            <span className="font-sans text-sm text-black">by whitecoldd</span>
          </Link>

          <span> &copy; Copyright 2023, All Right Reserved </span>
        </div>
        <div className="overflow-hidden mb-2">
          <img src="/payment.png" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

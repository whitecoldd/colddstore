import { updateRedux } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  updateSubCatFailure,
  updateSubCatStart,
  updateSubCatSuccess,
} from "../../redux/subcatRedux";

export default function EditSubCat() {
  // const [progress, setProgress] = useState();
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleObject = () => {
    const SubCat = { ...inputs };
    console.log(SubCat);
    updateRedux(
      SubCat,
      dispatch,
      updateSubCatStart,
      updateSubCatSuccess,
      updateSubCatFailure,
      "subcat"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleObject();
  };

  return (
    <div className="mx-40 my-20">
      <h1 className="font-semibold text-xl">Edit SubCategory</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start">
              <label className="text-sm">Title</label>
              <input
                name="name"
                type="text"
                placeholder="Category title"
                onChange={handleChange}
                className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 font-medium bg-teal-50 hover:bg-teal-100 hover:text-teal-600 text-teal-500 text-lg mt-10 border border-teal-600"
          >
            Edit a subcategory
          </button>
        </form>
      </div>
    </div>
  );
}

import { addRedux } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "../../redux/productRedux";
import { userRequest } from "../../req";

export default function AddProduct() {
  // const [progress, setProgress] = useState();
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  const [cat, setCat] = useState([]);
  const [subCat, setSubCat] = useState([]);

  let images = [];
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await userRequest.get(`/api/category/find`);
        setCat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCats();
  }, []);
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await userRequest.get(`/api/subcat/find`);
        setSubCat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCats();
  }, []);
  const upload = () => {
    const storage = getStorage(app);
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL);
            images.push(downloadURL);
            resolve();
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  };
  const handleObject = () => {
    const product = { ...inputs, img: images };
    console.log(product);
    addRedux(
      product,
      dispatch,
      addProductStart,
      addProductSuccess,
      addProductFailure,
      "product"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await upload();
    handleObject();
  };
  return (
    <div className="mx-40 my-20">
      <h1 className="font-semibold text-xl">Add New Product</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start">
              <label>Images</label>
              <input
                onChange={(e) => setFiles(Array.from(e.target.files))}
                type="file"
                id="files"
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Title</label>
              <input
                className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                name="name"
                type="text"
                placeholder="Product title"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Price</label>
              <input
                className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Quantity</label>
              <input
                className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                name="qty"
                type="number"
                placeholder="Quantity"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Category</label>
              <select
                className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                name="category"
                onChange={handleChange}
              >
                <option value={null}>---</option>
                {cat.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start">
              <label>SubCategory</label>
              <select
                className="border border-black p-3 focus-visible:outline focus-visible:outline-teal-600"
                name="subcat"
                onChange={handleChange}
              >
                <option value={null}>---</option>
                {subCat.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 font-medium bg-teal-50 hover:bg-teal-100 hover:text-teal-600 text-teal-500 text-lg mt-10 border border-teal-600"
          >
            Add a product
          </button>
        </form>
      </div>
    </div>
  );
}

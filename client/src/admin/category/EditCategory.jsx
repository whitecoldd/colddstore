import { updateRedux } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
} from "../../redux/categoryRedux";

export default function EditCategory() {
  // const [progress, setProgress] = useState();
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  let images = [];
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
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

    return uploadPromises;
  };
  const handleObject = () => {
    console.log(images);
    const category = { ...inputs, img: images };
    console.log(category);
    updateRedux(
      category,
      dispatch,
      updateCategoryStart,
      updateCategorySuccess,
      updateCategoryFailure,
      "category"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadPromises = upload();
    await Promise.all(uploadPromises);
    handleObject();
  };

  return (
    <div className="mx-40 my-20">
      <h1 className="font-semibold text-xl">Edit Category</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
              <label className="text-sm">Images</label>
              <input
                onChange={(e) => setFiles(Array.from(e.target.files))}
                type="file"
                id="files"
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
            </div>
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
            Edit a category
          </button>
        </form>
      </div>
    </div>
  );
}

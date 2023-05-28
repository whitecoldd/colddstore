import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import AddProduct from "./admin/product/AddProduct";
import EditProduct from "./admin/product/EditProduct";
import AddCategory from "./admin/category/AddCategory";
import AddSubcat from "./admin/subcat/AddSubcat";
import Admin from "./admin/Admin";
import GetProducts from "./admin/product/GetProducts";
import GetCategories from "./admin/category/GetCategories";
import GetSubcats from "./admin/subcat/GetSubcats";
import EditCategory from "./admin/category/EditCategory";
import EditSubCat from "./admin/subcat/EditSubcat";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/profile",
        element: <div>U are logged in</div>,
      },
    ],
  },
]);
const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/profile",
        element: <div>U are logged in</div>,
      },

      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "addproduct",
            element: <AddProduct />,
          },
          {
            path: "products",
            element: <GetProducts />,
          },
          {
            path: "product/:id",
            element: <EditProduct />,
          },
          {
            path: "addcategory",
            element: <AddCategory />,
          },
          {
            path: "categories",
            element: <GetCategories />,
          },
          {
            path: "category/:id",
            element: <EditCategory />,
          },
          {
            path: "addsubcat",
            element: <AddSubcat />,
          },
          {
            path: "subcats",
            element: <GetSubcats />,
          },
          {
            path: "subcat/:id",
            element: <EditSubCat />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const check = () => {
    if (admin) return adminRouter;
    else if (user) return authRouter;
    else return router;
  };
  return (
    <>
      <RouterProvider router={check()} />
    </>
  );
}

export default App;

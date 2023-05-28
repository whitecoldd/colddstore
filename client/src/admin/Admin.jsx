import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-2 min-h-[500px] py-20 flex-1 shadow-lg bg-white">
        <Link className="px-4 font-medium text-xl border-b-2" to={`/admin/products`}>
          Products
        </Link>
        <Link className="px-4 font-medium text-xl border-b-2" to={`/admin/categories`}>
          Categories
        </Link>
        <Link className="px-4 font-medium text-xl border-b-2" to={`/admin/subcats`}>
          SubCategories
        </Link>
      </div>
      <div className="flex-[5] shadow-lg min-h-[500px] bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

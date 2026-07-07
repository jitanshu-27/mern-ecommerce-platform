import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Users", path: "/admin/users" },
];

  return (
    <aside className="w-64 min-h-screen bg-black text-white">
      <div className="text-2xl font-bold p-6 border-b">
        Admin Panel
      </div>

      <nav className="flex flex-col mt-6">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-6 py-4 hover:bg-gray-800 ${
              location.pathname === item.path
                ? "bg-gray-800"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
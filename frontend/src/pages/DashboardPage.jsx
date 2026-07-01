import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="space-y-4">

        <Link
          to="/profile"
          className="block border p-4 rounded"
        >
          My Profile
        </Link>

        <Link
          to="/my-orders"
          className="block border p-4 rounded"
        >
          My Orders
        </Link>

      </div>

    </div>
  );
};

export default DashboardPage;
import { useEffect, useState } from "react";

import api from "../../services/api";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import DashboardCard from "../../components/admin/DashboardCard";

const DashboardPage = () => {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } =
        await api.get("/admin/dashboard");

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Header />

        <div className="p-8">

          <div className="grid md:grid-cols-4 gap-6">

            <DashboardCard
              title="Products"
              value={stats.products}
            />

            <DashboardCard
              title="Orders"
              value={stats.orders}
            />

            <DashboardCard
              title="Users"
              value={stats.users}
            />

            <DashboardCard
              title="Revenue"
              value={`₹${stats.revenue}`}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
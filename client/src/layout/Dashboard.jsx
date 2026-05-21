import React from "react";
import Usermenu from "../components/Usermenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="grid grid-cols-[220px_1fr] min-h-[90vh] mt-20 px-6">
      
      {/* User Menu */}
      <div className="bg-white border-r border-black pr-6">
        <Usermenu />
      </div>

      {/* Outlet */}
      <div className="bg-white pl-6 border-l border-gray-200">
        <Outlet />
      </div>

    </section>
  );
};

export default Dashboard;
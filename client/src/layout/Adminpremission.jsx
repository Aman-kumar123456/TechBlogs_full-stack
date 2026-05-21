import React from "react";
import { useSelector } from "react-redux";

const Adminpremission = ({ children }) => {
  const user = useSelector((state) => state?.user);
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      {user.role === "admin" ? (
        children
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full border border-red-200">
          {/* Icon */}
          <div className="text-yellow-500 text-5xl text-yellow-500 mb-4">
            🚫
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Access Denied
          </h2>

          <p className="text-gray-600 mb-6">
            You are not authorized to access this page.
          </p>

          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Adminpremission;
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthCard = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span
          onClick={() => navigate(-1)} // 👈 Go back to previous page
          className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
        >
          &larr;
        </span>
        {title}
      </h2>
      <div className="text-gray-600 text-sm mb-4">{children}</div>
    </div>
  );
};

export default AuthCard;

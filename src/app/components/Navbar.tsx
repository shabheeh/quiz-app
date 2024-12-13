import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="p-2">
      <div className="flex items-center justify-center p-2">
        <div className="flex items-center bg-green-500 text-white p-2 rounded-lg shadow-lg">
          <FaQuestionCircle className="mr-2 text-2xl" />
          <span className="text-lg font-bold">Quiz</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

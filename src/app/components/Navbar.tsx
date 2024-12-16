import { FaQuestionCircle } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <nav className="fixed w-full bg-white shadow-md p-4 z-10 flex items-center justify-between">
//       <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
//         <FaQuestionCircle className="mr-2 text-2xl" />
//         <span className="text-lg font-bold">Quiz</span>
//       </div>
//       <div className="ml-auto">
//         <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };


const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full bg-white shadow-md p-4 z-10 flex items-center justify-center">
      <div className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
        <FaQuestionCircle className="mr-2 text-2xl" />
        <span className="text-lg font-bold">Quiz</span>
      </div>
    </nav>
  );
};

export default Navbar;

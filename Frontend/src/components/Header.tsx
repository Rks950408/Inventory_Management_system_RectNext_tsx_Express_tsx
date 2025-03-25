// import React from "react";
// import { Link } from "react-router-dom";

// const Header: React.FC = () => {
//   return (
//     <header className="bg-indigo-600 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo / Title */}
//         <h1 className="text-xl font-bold">Inventory Management</h1>

//         {/* Navigation Menu - Centered */}
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <Link to="/brands" className="font-bold hover:text-gray-200">
//                 Brand
//               </Link>
//             </li>
//             <li>
//               <Link to="/item" className="font-bold hover:text-gray-200">
//                 Item Master
//               </Link>
//             </li>
//             <li>
//               <Link to="/suppliers" className="font-bold hover:text-gray-200">
//                 Supplier
//               </Link>
//             </li>
//             <li>
//               <Link to="/purchase-list" className="font-bold hover:text-gray-200">
//                 Purchase
//               </Link>
//             </li>
//             <li>
//               <Link to="/sale-list" className="font-bold hover:text-gray-200">
//                 Sale
//               </Link>
//             </li>
//             <li>
//               <Link to="/report" className="font-bold hover:text-gray-200">
//                 Report
//               </Link>
//             </li>
//             <li>
//               <Link to="/detailed-report" className="font-bold hover:text-gray-200">
//                 Detailed Report
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Auth Buttons - Positioned Right */}
//         <div className="space-x-4">
//           <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
//             Login
//           </Link>
//           <Link to="/signup" className="bg-indigo-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">
//             Signup
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5001/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send auth token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Assuming API returns { message: "User Name" }
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Company Name */}
        <h1 className="text-2xl font-bold">Arya Motor Tour and Travel</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/brands" className="font-bold hover:text-gray-200">Brand</Link></li>
            <li><Link to="/item" className="font-bold hover:text-gray-200">Item Master</Link></li>
            <li><Link to="/suppliers" className="font-bold hover:text-gray-200">Supplier</Link></li>
            <li><Link to="/purchase-list" className="font-bold hover:text-gray-200">Purchase</Link></li>
            <li><Link to="/sale-list" className="font-bold hover:text-gray-200">Sale</Link></li>
            <li><Link to="/report" className="font-bold hover:text-gray-200">Report</Link></li>
            <li><Link to="/detailed-report" className="font-bold hover:text-gray-200">Detailed Report</Link></li>
          </ul>
        </nav>

        {/* Show User Name and Logout Option */}
        {user ? (
          <div className="flex items-center space-x-4">
          <span className="font-bold text-lg">
            {user?.message?.split(" ").slice(0, 2).join(" ")} <br />
            {user?.message?.split(" ").slice(2).join(" ")}
          </span>           
           <button 
              onClick={handleLogout} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">Login</Link>
            <Link to="/signup" className="bg-indigo-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">Signup</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

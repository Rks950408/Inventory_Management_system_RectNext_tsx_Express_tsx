import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold">Inventory Management</h1>

        {/* Navigation Menu - Centered */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/brands" className="font-bold hover:text-gray-200">
                Brand
              </Link>
            </li>
            <li>
              <Link to="/item" className="font-bold hover:text-gray-200">
                Item Master
              </Link>
            </li>
            <li>
              <Link to="/suppliers" className="font-bold hover:text-gray-200">
                Supplier
              </Link>
            </li>
            <li>
              <Link to="/purchase-list" className="font-bold hover:text-gray-200">
                Purchase
              </Link>
            </li>
            <li>
              <Link to="/sale-list" className="font-bold hover:text-gray-200">
                Sale
              </Link>
            </li>
            <li>
              <Link to="/report" className="font-bold hover:text-gray-200">
                Report
              </Link>
            </li>
            <li>
              <Link to="/detailed-report" className="font-bold hover:text-gray-200">
                Detailed Report
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons - Positioned Right */}
        <div className="space-x-4">
          <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
            Login
          </Link>
          <Link to="/signup" className="bg-indigo-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

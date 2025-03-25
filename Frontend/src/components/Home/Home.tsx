// import React from "react";
// import { Link } from "react-router-dom";

// const Home: React.FC = () => {
//   return (
//     <div className="h-screen flex flex-col">
//       {/* Header Section */}
//       <header className="bg-indigo-600 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Company Name */}
//           <h1 className="text-2xl font-bold">Arya Motor Tour and Travel</h1>

//           {/* Login & Signup Buttons */}
//           <div className="space-x-4">
//             <Link
//               to="/login"
//               className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-indigo-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700"
//             >
//               Signup
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex flex-1 items-center justify-center text-center px-6">
//         <div className="max-w-3xl">
//           <h2 className="text-4xl font-bold text-indigo-600">
//             Welcome to Arya Motor Tour and Travel
//           </h2>
//           <p className="mt-4 text-lg text-gray-700">
//             Manage your inventory effortlessly with our powerful and user-friendly system.
//             Keep track of your bookings, vehicles, suppliers, and more with ease.
//           </p>

//           {/* Action Buttons */}
//           <div className="mt-6 space-x-4">
//             <Link
//               to="/inventory"
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
//             >
//               Explore Inventory
//             </Link>
//             <Link
//               to="/about"
//               className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400"
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center p-4">
//         &copy; {new Date().getFullYear()} Arya Motor Tour and Travel. All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../Header";

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
                <Header/>

      {/* Header Section */}
      <header className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Company Name */}
          <h1 className="text-2xl font-bold">Arya Motor Tour and Travel</h1>

          {/* Login & Signup Buttons */}
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700"
            >
              Signup
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold text-indigo-600">
            Welcome to Arya Motor Tour and Travel
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Manage your inventory effortlessly with our powerful and user-friendly system.
            Keep track of your bookings, vehicles, suppliers, and more with ease.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 space-x-4">
            <Link
              to="/inventory"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Explore Inventory
            </Link>
            <Link
              to="/about"
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>

      {/* Contact Us Section */}
      <section className="bg-gray-100 py-10 text-center">
        <h3 className="text-2xl font-bold text-indigo-600">Contact Us</h3>
        <p className="mt-2 text-gray-700">We'd love to hear from you! Get in touch with us:</p>

        <div className="mt-4 space-y-3">
          <p className="flex items-center justify-center space-x-2 text-gray-700">
            <FaPhone className="text-indigo-600" />
            <span>+91 9876543210</span>
          </p>
          <p className="flex items-center justify-center space-x-2 text-gray-700">
            <FaEnvelope className="text-indigo-600" />
            <span>contact@aryamotortour.com</span>
          </p>
          <p className="flex items-center justify-center space-x-2 text-gray-700">
            <FaMapMarkerAlt className="text-indigo-600" />
            <span>Krishnapuri Road Number 5B, India</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:text-indigo-400">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-indigo-400">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-indigo-400">
            <FaInstagram size={20} />
          </a>
        </div>
        &copy; {new Date().getFullYear()} Arya Motor Tour and Travel. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;

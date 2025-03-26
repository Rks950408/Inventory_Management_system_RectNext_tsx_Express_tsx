import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#311B92] text-white border-t border-purple-700 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">TravelEase</h2>
            <p className="text-gray-300 mb-4">
              Your one-stop solution for tours and vehicle rentals. Experience the world your way with our premium services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-yellow-400">Home</Link></li>
              <li><Link to="/tours" className="text-gray-300 hover:text-yellow-400">Tours</Link></li>
              <li><Link to="/rentals" className="text-gray-300 hover:text-yellow-400">Rentals</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/tours" className="text-gray-300 hover:text-yellow-400">Tour Packages</Link></li>
              <li><Link to="/services/bike-rentals" className="text-gray-300 hover:text-yellow-400">Bike Rentals</Link></li>
              <li><Link to="/services/car-rentals" className="text-gray-300 hover:text-yellow-400">Car Rentals</Link></li>
              <li><Link to="/services/chauffeur" className="text-gray-300 hover:text-yellow-400">Chauffeur Services</Link></li>
              <li><Link to="/services/custom-tours" className="text-gray-300 hover:text-yellow-400">Custom Tour Planning</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                <span>123 Travel Street, Tourism Hub, New Delhi, India</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                <span>info@travelease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

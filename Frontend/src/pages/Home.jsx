import { Link, useNavigate } from "react-router-dom";
import { MapPin, Bike, Car, Star } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover the World <span className="text-yellow-400">Your Way</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Book amazing tours or rent vehicles for your perfect adventure. Experience freedom and flexibility with our premium services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tours" className="btn-primary text-lg px-8 py-3">
              Explore Tours
            </Link>
            <button className="btn-primary text-lg px-8 py-3" onClick={() => navigate("/rentals")}>
              Rent Vehicles
            </button>
            <button className="btn-primary text-lg px-8 py-3" onClick={() => navigate("/rentals")}>
              Sale Vehicles
            </button>
            <button className="btn-primary text-lg px-8 py-3" onClick={() => navigate("/rentals")}>
              Purchase Preowned Vehicles
            </button>
            

          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-center leading-snug bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-transparent bg-clip-text">
  Featured <span className="text-blue-300">Tours</span>
</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Mountain Expedition", location: "Himalayan Range", duration: "5 days", capacity: "10 people", price: "$599" },
              { title: "Beach Paradise", location: "Goa Beaches", duration: "4 days", capacity: "8 people", price: "$499" },
              { title: "Cultural Heritage", location: "Rajasthan", duration: "7 days", capacity: "12 people", price: "$799" },
            ].map((tour, index) => (
              <div key={index} className="bg-white shadow-md p-6 rounded-xl border">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-gray-600 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" /> {tour.location}
                </p>
                <p className="text-gray-500">{tour.duration} | {tour.capacity}</p>
                <p className="text-xl font-bold text-blue-600 mt-2">{tour.price}</p>
                <button className="btn-primary mt-4 w-full">Book Now</button>
              </div>
            ))}
          </div>
          <Link to="/tours" className="text-blue-600 text-lg font-semibold mt-6 inline-block">View All Tours</Link>
        </div>
      </section>

      {/* Rental Options Section */}
      <section className="py-16 bg-gray-200 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Rental <span className="text-blue-600">Options</span></h2>
          <div className="flex justify-center gap-6 mb-6">
            <button className="btn-secondary">Bikes</button>
            <button className="btn-secondary">Cars</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Mountain Bike", type: "Self-Drive", price: "₹1200/day", driverPrice: "₹1800/day", icon: Bike },
          { title: "City Cruiser", type: "Self-Drive", price: "₹1000/day", driverPrice: "₹1600/day", icon: Car },
          { title: "Electric Bike", type: "Self-Drive", price: "₹2000/day", driverPrice: "₹2500/day", icon: Bike },
        ].map((rental, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-xl border">
            <rental.icon className="h-10 w-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">{rental.title}</h3>
            <p className="text-gray-500">{rental.type}</p>
            <p className="text-xl font-bold text-blue-600 mt-2">Self-Drive: {rental.price}</p>
            <p className="text-xl font-bold text-green-600">With Driver: {rental.driverPrice}</p>
            <button className="btn-primary mt-4 w-full">Rent Now</button>
          </div>
        ))}
      </div>

          <Link to="/rentals" className="text-blue-600 text-lg font-semibold mt-6 inline-block">View All Rentals</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 text-center bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our <span className="text-blue-600">Customers Say</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", location: "Delhi", review: "Amazing experience with the mountain expedition tour. The guides were knowledgeable and the arrangements were perfect. Will definitely book again!" },
              { name: "Priya Patel", location: "Mumbai", review: "Rented a car for our family trip and it was in excellent condition. The process was smooth and the staff was very helpful. Highly recommended!" },
              { name: "Amit Kumar", location: "Bangalore", review: "The beach paradise tour was wonderful. The only reason for 4 stars is that I wish we had more free time to explore on our own. Otherwise, perfect!" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-xl border">
                <div className="flex justify-center mb-4">
                  {[...Array(index === 2 ? 4 : 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.review}"</p>
                <h4 className="mt-4 font-bold">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-lg mb-6">Sign up now to get exclusive deals on tours and rentals. Start planning your perfect getaway today!</p>
        <Link to="/signup" className="btn-primary text-lg px-8 py-3">Sign Up Now</Link>
      </section>
    </div>
  );
};

export default Home;

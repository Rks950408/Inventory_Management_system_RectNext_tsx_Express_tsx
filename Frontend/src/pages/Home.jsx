import { Link } from "react-router-dom"
import { Star, Moon, Sun, Clock, Users, MessageCircle } from "lucide-react"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-darkBlue via-darkBlue/90 to-darkBlue"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="flex items-center mb-6">
            <Moon className="h-12 w-12 text-lightOrange" />
            <Star className="h-8 w-8 text-lightOrange ml-2" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your <span className="text-lightOrange">Cosmic Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
            Connect with expert astrologers for personalized readings that illuminate your past, present, and future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <button 
              className="btn-primary mt-6"
              onClick={() => navigate('/astrologers')}
            >
              Explore Services
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
              <Star className="h-10 w-10 text-lightOrange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Horoscope</h3>
              <p className="text-gray-400">Get personalized daily insights based on your zodiac sign.</p>
            </div>
            <div className="bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
              <Users className="h-10 w-10 text-lightOrange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compatibility</h3>
              <p className="text-gray-400">
                Discover how your stars align with friends, family, and potential partners.
              </p>
            </div>
            <div className="bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
              <MessageCircle className="h-10 w-10 text-lightOrange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Consultations</h3>
              <p className="text-gray-400">Chat with experienced astrologers for personalized guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-darkBlue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-lightOrange">FutureTalk</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine ancient wisdom with modern technology to provide you with accurate and insightful readings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-darkBlue p-6 rounded-xl border border-darkBlue-lighter">
              <div className="w-14 h-14 bg-lightOrange/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-lightOrange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Astrologers</h3>
              <p className="text-gray-400">Our team consists of certified astrologers with years of experience.</p>
            </div>

            <div className="bg-darkBlue p-6 rounded-xl border border-darkBlue-lighter">
              <div className="w-14 h-14 bg-lightOrange/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-lightOrange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-400">
                Get readings anytime, anywhere. Our astrologers are available round the clock.
              </p>
            </div>

            <div className="bg-darkBlue p-6 rounded-xl border border-darkBlue-lighter">
              <div className="w-14 h-14 bg-lightOrange/10 rounded-full flex items-center justify-center mb-4">
                <Sun className="h-7 w-7 text-lightOrange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Readings</h3>
              <p className="text-gray-400">Our predictions are based on precise astronomical calculations.</p>
            </div>

            <div className="bg-darkBlue p-6 rounded-xl border border-darkBlue-lighter">
              <div className="w-14 h-14 bg-lightOrange/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-lightOrange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Private Consultations</h3>
              <p className="text-gray-400">All readings are confidential and tailored to your specific questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-lightOrange">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from people whose lives have been transformed by our astrological insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-lightOrange fill-lightOrange" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "The reading I received was incredibly accurate. It helped me make an important career decision that I
                was struggling with for months."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-lightOrange/20 flex items-center justify-center mr-4">
                  <span className="text-lightOrange font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-400 text-sm">Marketing Executive</p>
                </div>
              </div>
            </div>

            <div className="bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-lightOrange fill-lightOrange" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "I was skeptical at first, but the compatibility reading for me and my partner was spot on. It helped us
                understand each other better."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-lightOrange/20 flex items-center justify-center mr-4">
                  <span className="text-lightOrange font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-gray-400 text-sm">Teacher</p>
                </div>
              </div>
            </div>

            <div className="bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-lightOrange fill-lightOrange" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "The daily horoscopes have become part of my morning routine. They provide valuable insights that help
                me navigate my day with confidence."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-lightOrange/20 flex items-center justify-center mr-4">
                  <span className="text-lightOrange font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-gray-400 text-sm">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-darkBlue to-darkBlue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your <span className="text-lightOrange">Cosmic Path</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Join thousands of satisfied clients who have found clarity and guidance through our astrological services.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home


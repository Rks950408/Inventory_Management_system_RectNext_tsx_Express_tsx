"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Star, Sun, Moon, Calendar, MessageCircle, Clock, ArrowRight } from "lucide-react"

const Dashboard = () => {
  const { user } = useAuth()
  const [dailyHoroscope, setDailyHoroscope] = useState(null)
  const [upcomingConsultations, setUpcomingConsultations] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock zodiac sign based on birth date
  const getZodiacSign = () => {
    // In a real app, calculate this from user.birth_date
    return "Libra"
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // Mock data for demonstration

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setDailyHoroscope({
          sign: getZodiacSign(),
          date: new Date().toLocaleDateString(),
          prediction:
            "Today is a great day for new beginnings. Your creative energy is at its peak, making it an excellent time to start projects you've been putting off. Trust your intuition when making decisions, especially regarding finances. Someone close to you may need your advice - be honest but tactful.",
          lucky_number: 7,
          lucky_color: "Blue",
          compatibility: "Gemini",
        })

        setUpcomingConsultations([
          {
            id: 1,
            astrologer: "Maya Stargazer",
            date: "2023-06-15",
            time: "14:30",
            type: "Tarot Reading",
            duration: 30,
            status: "confirmed",
          },
          {
            id: 2,
            astrologer: "Raj Cosmos",
            date: "2023-06-18",
            time: "10:00",
            type: "Birth Chart Analysis",
            duration: 45,
            status: "pending",
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightOrange"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.username || "Cosmic Explorer"}</h1>
        <p className="text-gray-400 mt-2">Here's your cosmic overview for today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Horoscope */}
          {dailyHoroscope && (
            <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Sun className="h-5 w-5 text-lightOrange mr-2" />
                  Daily Horoscope
                </h2>
                <div className="flex items-center text-lightOrange">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">{dailyHoroscope.date}</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-lightOrange/10 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-8 w-8 text-lightOrange" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{dailyHoroscope.sign}</h3>
                  <p className="text-gray-400">Your cosmic guide for today</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{dailyHoroscope.prediction}</p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-darkBlue rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Lucky Number</p>
                  <p className="text-xl font-bold text-lightOrange">{dailyHoroscope.lucky_number}</p>
                </div>
                <div className="bg-darkBlue rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Lucky Color</p>
                  <p className="text-xl font-bold text-lightOrange">{dailyHoroscope.lucky_color}</p>
                </div>
                <div className="bg-darkBlue rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Compatibility</p>
                  <p className="text-xl font-bold text-lightOrange">{dailyHoroscope.compatibility}</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link to="/horoscope/detailed" className="btn-secondary">
                  View Detailed Horoscope
                </Link>
              </div>
            </div>
          )}

          {/* Upcoming Consultations */}
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <MessageCircle className="h-5 w-5 text-lightOrange mr-2" />
                Upcoming Consultations
              </h2>
              <Link to="/consultations" className="text-sm text-lightOrange flex items-center">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {upcomingConsultations.length > 0 ? (
              <div className="space-y-4">
                {upcomingConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="bg-darkBlue rounded-lg p-4 border border-darkBlue-lighter flex flex-col sm:flex-row sm:items-center justify-between"
                  >
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-semibold">{consultation.type}</h3>
                      <p className="text-gray-400 text-sm">with {consultation.astrologer}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-4 w-4 mr-1 text-lightOrange" />
                        <span className="text-sm">{new Date(consultation.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center text-gray-300">
                        <Clock className="h-4 w-4 mr-1 text-lightOrange" />
                        <span className="text-sm">
                          {consultation.time} ({consultation.duration} min)
                        </span>
                      </div>

                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          consultation.status === "confirmed"
                            ? "bg-green-900/20 text-green-400"
                            : "bg-yellow-900/20 text-yellow-400"
                        }`}
                      >
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You don't have any upcoming consultations</p>
                <Link to="/astrologers" className="btn-primary">
                  Book a Consultation
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-8">
          {/* User Profile Summary */}
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-lightOrange/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-lightOrange">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>

              <h3 className="text-xl font-bold">{user?.username || "User"}</h3>
              <p className="text-gray-400 text-sm mb-4">{user?.email || "user@example.com"}</p>

              <div className="w-full border-t border-darkBlue-lighter pt-4 mt-2">
                <Link to="/profile" className="btn-secondary w-full">
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Services</h2>

            <div className="space-y-3">
              <Link
                to="/services/compatibility"
                className="flex items-center p-3 rounded-lg hover:bg-darkBlue transition-colors"
              >
                <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center mr-3">
                  <Moon className="h-5 w-5 text-lightOrange" />
                </div>
                <div>
                  <h3 className="font-medium">Compatibility Check</h3>
                  <p className="text-xs text-gray-400">Find your cosmic match</p>
                </div>
              </Link>

              <Link
                to="/services/tarot"
                className="flex items-center p-3 rounded-lg hover:bg-darkBlue transition-colors"
              >
                <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center mr-3">
                  <Star className="h-5 w-5 text-lightOrange" />
                </div>
                <div>
                  <h3 className="font-medium">Tarot Reading</h3>
                  <p className="text-xs text-gray-400">Glimpse into your future</p>
                </div>
              </Link>

              <Link
                to="/services/birth-chart"
                className="flex items-center p-3 rounded-lg hover:bg-darkBlue transition-colors"
              >
                <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center mr-3">
                  <Sun className="h-5 w-5 text-lightOrange" />
                </div>
                <div>
                  <h3 className="font-medium">Birth Chart Analysis</h3>
                  <p className="text-xs text-gray-400">Understand your cosmic blueprint</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-darkBlue to-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <Star className="w-full h-full text-lightOrange" />
            </div>

            <h3 className="text-lg font-bold mb-2">Premium Membership</h3>
            <p className="text-gray-300 text-sm mb-4">
              Unlock unlimited readings and priority consultations with our expert astrologers.
            </p>

            <Link to="/premium" className="btn-primary w-full">
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


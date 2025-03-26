"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Send, Phone, Video, Clock, Calendar, Star, Info, ArrowLeft } from "lucide-react"

const Consultation = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [consultation, setConsultation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        // In a real app, this would be an actual API call
        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setConsultation({
          id: Number.parseInt(id),
          astrologer: {
            id: 1,
            name: "Maya Stargazer",
            avatar: null,
            specialties: ["Tarot", "Palmistry", "Numerology"],
            rating: 4.8,
          },
          date: "2023-06-15",
          time: "14:30",
          type: "Tarot Reading",
          duration: 30,
          status: "active",
          notes: "Focus on career and relationships",
        })

        setMessages([
          {
            id: 1,
            sender: "astrologer",
            text: "Hello! Welcome to your tarot reading session. How are you feeling today?",
            timestamp: "2023-06-15T14:30:00Z",
          },
          {
            id: 2,
            sender: "user",
            text: "Hi Maya, I'm doing well. I'm particularly interested in insights about my career path.",
            timestamp: "2023-06-15T14:31:00Z",
          },
          {
            id: 3,
            sender: "astrologer",
            text: "Great! I'll focus on your career in this reading. Let me draw some cards for you...",
            timestamp: "2023-06-15T14:32:00Z",
          },
          {
            id: 4,
            sender: "astrologer",
            text: "I've drawn The Magician, The Wheel of Fortune, and The Star. These are very positive cards for your career journey!",
            timestamp: "2023-06-15T14:33:00Z",
          },
          {
            id: 5,
            sender: "astrologer",
            text: "The Magician suggests you have all the tools and resources you need to succeed. The Wheel of Fortune indicates a positive change coming your way. And The Star represents hope and inspiration - a sign that you're on the right path.",
            timestamp: "2023-06-15T14:34:00Z",
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching consultation:", error)
        setLoading(false)
      }
    }

    fetchConsultation()
  }, [id])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate astrologer response after 1-2 seconds
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "astrologer",
        text: "Thank you for sharing. Let me draw another card to provide more insight on this specific aspect...",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, response])
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightOrange"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <Link to="/dashboard" className="flex items-center text-gray-400 hover:text-lightOrange">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Area - 3/4 width on large screens */}
        <div className="lg:col-span-3 bg-darkBlue-light rounded-xl border border-darkBlue-lighter overflow-hidden flex flex-col h-[calc(100vh-200px)]">
          {/* Chat Header */}
          <div className="bg-darkBlue p-4 border-b border-darkBlue-lighter flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-lightOrange/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-lightOrange">{consultation.astrologer.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-semibold">{consultation.astrologer.name}</h3>
                <div className="flex items-center text-xs text-gray-400">
                  <div className="flex items-center mr-2">
                    <Star className="h-3 w-3 text-lightOrange mr-1" />
                    <span>{consultation.astrologer.rating}</span>
                  </div>
                  <span>{consultation.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-darkBlue-lighter flex items-center justify-center text-gray-300 hover:bg-lightOrange/20 hover:text-lightOrange transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-darkBlue-lighter flex items-center justify-center text-gray-300 hover:bg-lightOrange/20 hover:text-lightOrange transition-colors">
                <Video className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-darkBlue-lighter flex items-center justify-center text-gray-300 hover:bg-lightOrange/20 hover:text-lightOrange transition-colors">
                <Info className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-lightOrange/20 text-white" : "bg-darkBlue text-white"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-darkBlue-lighter">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                className="input flex-1"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary h-10 w-10 p-0 flex items-center justify-center"
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar - 1/4 width on large screens */}
        <div className="space-y-6">
          {/* Consultation Details */}
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <h2 className="text-xl font-semibold mb-4">Consultation Details</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-lightOrange mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-medium">{new Date(consultation.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-lightOrange mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-medium">{consultation.time}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-lightOrange mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-medium">{consultation.type}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-lightOrange mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="font-medium">{consultation.duration} minutes</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-darkBlue-lighter">
              <h3 className="font-medium mb-2">Notes</h3>
              <p className="text-sm text-gray-300">{consultation.notes}</p>
            </div>
          </div>

          {/* Astrologer Specialties */}
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <h2 className="text-lg font-semibold mb-4">Astrologer Specialties</h2>

            <div className="flex flex-wrap gap-2">
              {consultation.astrologer.specialties.map((specialty, index) => (
                <span key={index} className="bg-darkBlue px-3 py-1 rounded-full text-sm text-gray-300">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <button className="btn-secondary w-full mb-3">End Consultation</button>
            <button className="text-red-400 hover:text-red-300 text-sm w-full">Report an Issue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultation


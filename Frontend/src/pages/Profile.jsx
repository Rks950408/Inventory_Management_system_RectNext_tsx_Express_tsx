"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { User, Mail, Calendar, MapPin, Clock, AlertCircle, Check } from "lucide-react"

const Profile = () => {
  const { user, updateProfile } = useAuth()

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    birthDate: user?.birth_date || "",
    birthTime: user?.birth_time || "",
    birthPlace: user?.birth_place || "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")

    if (!formData.username || !formData.email) {
      setFormError("Username and email are required")
      return
    }

    setIsSubmitting(true)

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        birth_date: formData.birthDate || null,
        birth_time: formData.birthTime || null,
        birth_place: formData.birthPlace || null,
      }

      await updateProfile(userData)
      setFormSuccess("Profile updated successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Profile update error:", error)
      setFormError(error.response?.data?.message || "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-gray-400 mt-2">Manage your account information</p>
      </div>

      <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter overflow-hidden">
        <div className="p-6 sm:p-8">
          {formError && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg flex items-start mb-6">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-lg flex items-start mb-6">
              <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start gap-8 mb-8">
            <div className="w-24 h-24 bg-lightOrange/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-lightOrange">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.username || "User"}</h2>
              <p className="text-gray-400">{user?.email || "user@example.com"}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 text-lightOrange mr-2" />
                  <span>
                    {user?.birth_date ? new Date(user.birth_date).toLocaleDateString() : "Birth date not set"}
                  </span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 text-lightOrange mr-2" />
                  <span>{user?.birth_time || "Birth time not set"}</span>
                </div>

                <div className="flex items-center text-gray-300 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-lightOrange mr-2" />
                  <span>{user?.birth_place || "Birth place not set"}</span>
                </div>
              </div>
            </div>

            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn-secondary">
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="input pl-10"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="input pl-10"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-darkBlue-lighter">
                  <h3 className="text-lg font-medium mb-4">Birth Information (Optional)</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
                        Birth Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          className="input pl-10"
                          value={formData.birthDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="birthTime" className="block text-sm font-medium mb-2">
                        Birth Time
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="birthTime"
                          name="birthTime"
                          type="time"
                          className="input pl-10"
                          value={formData.birthTime}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="birthPlace" className="block text-sm font-medium mb-2">
                        Birth Place
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="birthPlace"
                          name="birthPlace"
                          type="text"
                          className="input pl-10"
                          placeholder="City, Country"
                          value={formData.birthPlace}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    className="btn-primary flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-darkBlue"></div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        username: user?.username || "",
                        email: user?.email || "",
                        birthDate: user?.birth_date || "",
                        birthTime: user?.birth_time || "",
                        birthPlace: user?.birth_place || "",
                      })
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="pt-4 border-t border-darkBlue-lighter">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>

                <div className="space-y-4">
                  <button className="btn-secondary w-full sm:w-auto">Change Password</button>

                  <button className="text-red-400 hover:text-red-300 block w-full sm:w-auto text-center">
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-darkBlue-lighter">
                <h3 className="text-lg font-medium mb-4">Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-400">Receive emails about your consultations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-darkBlue-lighter rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lightOrange"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Daily Horoscope</h4>
                      <p className="text-sm text-gray-400">Receive your daily horoscope by email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-darkBlue-lighter rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lightOrange"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile


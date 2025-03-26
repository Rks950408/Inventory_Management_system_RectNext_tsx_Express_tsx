"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError("Please fill in all required fields")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match")
      return false
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters long")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        birth_date: formData.birthDate || null,
        birth_time: formData.birthTime || null,
        birth_place: formData.birthPlace || null,
      }
    
      console.log("Sending user data:", userData);  // Log the data being sent
    
      await register(userData)
      navigate("/dashboard")
    } catch (error) {
      console.error("Registration error:", error);  // Log the full error object
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      console.log("Error message from server:", errorMessage);  // Log the error message
      setFormError(errorMessage);
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-darkBlue-light p-8 rounded-xl border border-darkBlue-lighter">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Your Account</h2>
          <p className="mt-2 text-gray-400">Begin your cosmic journey with FutureTalk</p>
        </div>

        {formError && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input"
                placeholder="cosmic_traveler"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="input pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters long</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="pt-4 border-t border-darkBlue-lighter">
              <h3 className="text-lg font-medium mb-2">Birth Information (Optional)</h3>
              <p className="text-sm text-gray-400 mb-4">For more accurate astrological readings</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
                    Birth Date
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="input"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="birthTime" className="block text-sm font-medium mb-2">
                    Birth Time
                  </label>
                  <input
                    id="birthTime"
                    name="birthTime"
                    type="time"
                    className="input"
                    value={formData.birthTime}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="birthPlace" className="block text-sm font-medium mb-2">
                    Birth Place
                  </label>
                  <input
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    className="input"
                    placeholder="City, Country"
                    value={formData.birthPlace}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-darkBlue"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-lightOrange hover:text-lightOrange/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register


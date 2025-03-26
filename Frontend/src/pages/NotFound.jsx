import { Link } from "react-router-dom"
import { Moon, Star } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex items-center mb-6">
        <Moon className="h-12 w-12 text-lightOrange" />
        <Star className="h-8 w-8 text-lightOrange ml-2" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>

      <p className="text-xl text-gray-300 max-w-md mb-8">
        The cosmic page you're looking for seems to have drifted into another dimension.
      </p>

      <Link to="/" className="btn-primary text-lg px-8 py-3">
        Return to Home
      </Link>
    </div>
  )
}

export default NotFound


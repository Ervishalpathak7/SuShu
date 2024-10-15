import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button.jsx"

export default function Maintenance() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    fetch(`${process.env.VITE_BACKEND_URL}`,  {
      method: "GET",
    })
    setCurrentDate(new Date().toLocaleDateString())
  }, [])



  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Site Under Maintenance
          </h1>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-gray-300">
              We're fine-tuning our digital gears to bring you an even better experience.
            </p>
            <p className="text-lg md:text-xl text-gray-400">
              Your patience is greatly appreciated. We'll be back shortly!
            </p>
          </div>

          <div className="flex justify-center items-center space-x-2 text-white">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg">Working on it...</span>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-gray-500">
              Estimated completion: {currentDate}
            </p>

            <Button variant="outline" className="bg-white text-black hover:bg-gray-200">
              <a href="mailto:support@yourcompany.com" className="no-underline">Contact Support</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full p-4 flex justify-between items-center text-gray-600 text-sm">
        <span>© {new Date().getFullYear()} Your Company</span>
        <span>Status: Maintenance Mode</span>
      </div>
    </div>
  )
}
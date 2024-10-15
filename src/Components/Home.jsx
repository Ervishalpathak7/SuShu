
import { Button } from "./ui/button"
import { MessageCircle, Lock, Zap, Menu } from "lucide-react"
import { Link } from "react-router-dom";

function testingapi(){
  fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => console.log(data));
}

testingapi();

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <MessageCircle className="w-8 h-8" />
          <h1 className="text-xl font-bold">RealChat</h1>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Menu</span>
        </Button>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Contact</Button>
        </nav>
      </header>
      <main
        className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Connect Instantly, Communicate Clearly</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Experience real-time conversations with our intuitive and secure chat platform.
        </p>
        <Link to='/login' >
        <Button  className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg">
        Start Chatting Now
        </Button>
        </Link>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="flex flex-col items-center">
            <Zap className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Instant message delivery for seamless conversations.</p>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">End-to-end encryption keeps your chats confidential.</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rich Features</h3>
            <p className="text-gray-600">From file sharing to voice messages, we've got you covered.</p>
          </div>
        </div>
      </main>
      <footer className="border-t p-8">
        <div
          className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2024 RealChat. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-black">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
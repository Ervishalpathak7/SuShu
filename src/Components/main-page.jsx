'use client';
import { useState, useEffect, useMemo } from 'react';
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, User, Search, Menu, Settings, Send } from "lucide-react";

const messages = [
  { 
    id: 1, 
    name: "Alice Smith", 
    lastMessage: "Hey, how are you?", 
    time: "10:30 AM",
    chat: [
      { text: "Hey, how are you?", sent: false },
      { text: "I'm good, thanks! How about you?", sent: true },
      { text: "I'm doing well. Did you finish the project?", sent: false },
      { text: "Yes, I just submitted it. How about yours?", sent: true },
    ]
  },
  { 
    id: 2, 
    name: "Bob Johnson", 
    lastMessage: "Can we meet tomorrow?", 
    time: "Yesterday",
    chat: [
      { text: "Hi Bob, can we meet tomorrow?", sent: true },
      { text: "Sure, what time works for you?", sent: false },
      { text: "How about 2 PM?", sent: true },
      { text: "Sounds good, see you then!", sent: false },
    ]
  },
  { 
    id: 3, 
    name: "David Brown", 
    lastMessage: "Did you see the latest update?", 
    time: "3 days ago",
    chat: [
      { text: "Did you see the latest update?", sent: false },
      { text: "Not yet, what's new?", sent: true },
      { text: "They added some cool new features!", sent: false },
      { text: "I'll check it out, thanks!", sent: true },
    ]
  },
  { 
    id: 4, 
    name: "Eva Davis", 
    lastMessage: "Let's catch up soon!", 
    time: "1 week ago",
    chat: [
      { text: "Hey Eva, let's catch up soon!", sent: true },
      { text: "Definitely! How about next week?", sent: false },
      { text: "Perfect, I'll check my schedule and get back to you.", sent: true },
      { text: "Sounds great, looking forward to it!", sent: false },
    ]
  },
];

const profileOptions = [
  { id: 1, name: "Edit Profile", icon: <User size={18} /> },
  { id: 2, name: "Settings", icon: <Settings size={18} /> },
  { id: 3, name: "Help & Support", icon: <MessageCircle size={18} /> },
];

export default function MainPageComponent() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('messages');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (selectedOption === 'profile') {
      setSelectedItemId(1); // Set "Edit Profile" as default
    }
  }, [selectedOption]);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedItemId) {
      const updatedMessages = messages.map(msg => 
        msg.id === selectedItemId 
          ? { ...msg, chat: [...msg.chat, { text: newMessage, sent: true }] }
          : msg
      );
      // Update messages array immutably
      messages.splice(0, messages.length, ...updatedMessages);
      setNewMessage('');
    }
  };

  const selectedChat = useMemo(() => 
    messages.find(m => m.id === selectedItemId)?.chat || [], 
    [selectedItemId]
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sliding Menu */}
      <div className={`bg-gray-100 w-80 transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full z-10 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold">RealChat</h1>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search" className="pl-8" />
          </div>
        </div>
        <div className="p-4 flex space-x-2">
          <Button
            variant={selectedOption === 'messages' ? 'default' : 'ghost'}
            className="flex-1 justify-center"
            onClick={() => setSelectedOption('messages')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button
            variant={selectedOption === 'profile' ? 'default' : 'ghost'}
            className="flex-1 justify-center"
            onClick={() => setSelectedOption('profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {selectedOption === 'messages' ? (
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-2 rounded cursor-pointer ${selectedItemId === message.id ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                  onClick={() => {
                    setSelectedItemId(message.id);
                    setSelectedOption('messages');
                  }}
                >
                  <div className="font-semibold">{message.name}</div>
                  <div className="text-sm text-gray-500">{message.lastMessage}</div>
                  <div className="text-xs text-gray-400">{message.time}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {profileOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedItemId === option.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedItemId(option.id)}
                >
                  {option.icon}
                  <span className="ml-2">{option.name}</span>
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${menuOpen ? 'ml-80' : 'ml-0'}`}>
        <header className="bg-white border-b p-4 flex items-center">
          {!menuOpen && (
            <Button variant="ghost" size="icon" className="mr-4" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <h2 className="text-xl font-semibold">
            {selectedOption === 'messages' && selectedItemId
              ? messages.find(m => m.id === selectedItemId)?.name
              : selectedOption === 'profile'
              ? 'Profile'
              : 'Messages'}
          </h2>
        </header>
        <main className="flex-1 p-6 flex">
          {selectedOption === 'messages' && selectedItemId ? (
            <div className="w-full flex flex-col h-full">
              <ScrollArea className="flex-grow mb-4">
                <div className="space-y-4">
                  {selectedChat.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg max-w-[70%] ${msg.sent ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-100'}`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <h3 className="text-gray-500 text-lg">
                {selectedOption === 'profile' ? 'Select an option' : 'Select a chat'}
              </h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

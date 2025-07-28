"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Finance App</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
              <Link href="/income" className="hover:text-purple-400 transition-colors">Income</Link>
              <Link href="/expense" className="hover:text-purple-400 transition-colors">Expenses</Link>
              <Link href="/statistics" className="hover:text-purple-400 transition-colors">Statistics</Link>
              <Link href="/account" className="hover:text-purple-400 transition-colors">Account</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-purple-400 transition-colors">Login</Link>
              <Link href="/register" className="hover:text-purple-400 transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black p-4 shadow-md">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="hover:text-purple-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/income" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Income
                </Link>
                <Link 
                  href="/expense" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Expenses
                </Link>
                <Link 
                  href="/statistics" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Statistics
                </Link>
                <Link 
                  href="/account" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
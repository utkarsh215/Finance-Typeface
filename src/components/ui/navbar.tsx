"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  BarChart2,
  IndianRupee,
  TrendingDown,
  User,
  Settings,
  FileUp
} from "lucide-react";

export function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">💸</span> Finance-typeface
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {!user && <Link href="/" className="hover:text-gray-300 transition-colors flex items-center gap-1">Home</Link>}
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link href="/income" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <IndianRupee className="w-4 h-4" /> Income
              </Link>
              <Link href="/expense" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <TrendingDown className="w-4 h-4" /> Expenses
              </Link>
              <Link href="/upload-transactions" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <FileUp className="w-4 h-4" /> Upload Bank Statement
              </Link>
              <Link href="/statistics" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <BarChart2 className="w-4 h-4" /> Statistics
              </Link>
              <Link href="/account" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <User className="w-4 h-4" /> Account
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link href="/register" className="hover:text-gray-300 transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black p-4 shadow-md">
          <div className="flex flex-col space-y-3">
            {!user && (
              <Link 
                href="/" 
                className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            )}
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <Link 
                  href="/income" 
                  className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IndianRupee className="w-5 h-5" /> Income
                </Link>
                <Link 
                  href="/expense" 
                  className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TrendingDown className="w-5 h-5" /> Expenses
                </Link>
                <Link 
                  href="/upload-transactions" 
                  className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileUp className="w-5 h-5" /> Upload Bank Statement
                </Link>
                <Link 
                  href="/statistics" 
                  className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart2 className="w-5 h-5" /> Statistics
                </Link>
                <Link 
                  href="/account" 
                  className="hover:text-gray-300 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" /> Account
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
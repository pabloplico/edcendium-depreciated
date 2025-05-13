import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/lessons', label: 'My Lessons' },
    { path: '/create-lesson', label: 'Create Lesson' },
  ];
  
  const isActive = (path) => {
    return router.pathname === path || 
      (path !== '/' && router.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            MCMPORTAL
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`${
                      isActive(item.path) 
                        ? 'text-blue-600 font-medium' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`block px-4 py-3 ${
                      isActive(item.path) 
                        ? 'text-blue-600 font-medium bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} MCMPORTAL. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

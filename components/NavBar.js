import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function NavBar() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setMobileMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!session) {
      return [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Log In' },
        { href: '/register', label: 'Register' },
      ];
    }

    const commonLinks = [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/profile', label: 'Profile' },
    ];

    if (session.user?.role === 'teacher') {
      return [
        ...commonLinks,
        { href: '/teacher-dashboard', label: 'Teacher Dashboard' },
        { href: '/courses/manage', label: 'My Courses' },
        { href: '/assignments', label: 'Assignments' },
      ];
    } else if (session.user?.role === 'admin') {
      return [
        ...commonLinks,
        { href: '/admin-dashboard', label: 'Admin Dashboard' },
        { href: '/users', label: 'User Management' },
        { href: '/settings', label: 'Settings' },
      ];
    } else if (session.user?.role === 'student') {
      return [
        ...commonLinks,
        { href: '/student-dashboard', label: 'Student Dashboard' },
        { href: '/courses/enrolled', label: 'My Courses' },
        { href: '/assignments/my', label: 'My Assignments' },
      ];
    }

    return commonLinks;
  };

  // Only compute navLinks if not loading
  const navLinks = loading ? [] : getNavLinks();

  // Show a simplified UI when loading
  if (loading) {
    return (
      <nav className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                MCM Portal
              </Link>
            </div>
            <div className="animate-pulse h-6 w-24 bg-indigo-500 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                MCM Portal
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {session ? (
                <div className="flex items-center">
                  <span className="text-white mr-4 text-sm">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="pt-4 pb-3 border-t border-indigo-700">
          {session ? (
            <div className="px-2 space-y-1">
              <div className="px-3 py-2 text-white">
                Signed in as <span className="font-medium">{session.user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="px-2 space-y-1">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

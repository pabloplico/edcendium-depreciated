import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (!isLoading && session) {
      if (session.user.role === 'teacher') {
        router.push('/teacher-dashboard');
      } else if (session.user.role === 'admin') {
        router.push('/admin-dashboard');
      } else if (session.user.role === 'student') {
        router.push('/student-dashboard');
      } else {
        // Default dashboard for any other role
        router.push('/dashboard');
      }
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to MCM Portal
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            A comprehensive learning management system for students and teachers.
          </p>
          
          {!session && (
            <div className="mt-10 flex justify-center">
              <Link href="/login" className="mx-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Log in
              </Link>
              <Link href="/register" className="mx-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for effective learning
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  {/* Icon placeholder */}
                  <span className="h-6 w-6">📚</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Comprehensive Courses</h3>
                <p className="mt-2 text-base text-gray-500">
                  Access a wide range of courses designed by expert educators.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  {/* Icon placeholder */}
                  <span className="h-6 w-6">📊</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Progress Tracking</h3>
                <p className="mt-2 text-base text-gray-500">
                  Monitor your learning progress with detailed analytics.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  {/* Icon placeholder */}
                  <span className="h-6 w-6">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Collaborative Learning</h3>
                <p className="mt-2 text-base text-gray-500">
                  Engage with peers and teachers in a collaborative environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import { TeacherRoute } from '../components/RouteGuard';
import NavBar from '../components/NavBar';

export default function TeacherHomepage() {
  return (
    <TeacherRoute>
      <div>
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <Head>
            <title>MCMPORTAL - Teacher Dashboard</title>
            <meta name="description" content="Teacher Dashboard for Education Management Platform" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <h1 className="text-3xl font-bold text-center mb-8">
              Welcome to MCMPORTAL Teacher Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link href="/create-course" legacyBehavior>
                <a className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg border border-blue-200 cursor-pointer transition block">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">Create Course Outline</h2>
                  <p className="text-gray-600">
                    Design a course outline or unit plan aligned with curriculum standards, general capabilities, and cross-curriculum priorities.
                  </p>
                </a>
              </Link>
              
              <Link href="/create-lesson" legacyBehavior>
                <a className="bg-green-50 hover:bg-green-100 p-6 rounded-lg border border-green-200 cursor-pointer transition block">
                  <h2 className="text-xl font-semibold text-green-800 mb-2">Create Lesson Plan</h2>
                  <p className="text-gray-600">
                    Generate AI-assisted lesson plans aligned with your course objectives and curriculum standards.
                  </p>
                </a>
              </Link>
            </div>

            <div className="mt-12 bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">About this tool</h2>
              <p className="text-gray-700 mb-4">
                This curriculum planning tool helps teachers create course outlines and unit plans that align with curriculum standards, 
                including learning areas, content descriptors, general capabilities, and cross-curriculum priorities.
              </p>
              <p className="text-gray-700">
                Search and select from a comprehensive database of curriculum elements to build your course outline or unit plan, 
                then save and share it with colleagues or students.
              </p>
            </div>
          </main>
        </div>
      </div>
    </TeacherRoute>
  );
}

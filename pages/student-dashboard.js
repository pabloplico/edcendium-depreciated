import { useSession } from 'next-auth/react';
import { StudentRoute } from '../components/RouteGuard';
import NavBar from '../components/NavBar';

export default function StudentDashboard() {
  const { data: session } = useSession();

  return (
    <StudentRoute>
      <div>
        <NavBar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
            <p className="mb-4">This is your student dashboard. Here you can access your courses and assignments.</p>
            
            {/* Statistics cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h3 className="text-indigo-800 font-medium">Enrolled Courses</h3>
                <p className="text-2xl font-bold text-indigo-600">4</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-green-800 font-medium">Completed Assignments</h3>
                <p className="text-2xl font-bold text-green-600">12/15</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-yellow-800 font-medium">Average Grade</h3>
                <p className="text-2xl font-bold text-yellow-600">B+</p>
              </div>
            </div>
            
            {/* My Courses */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">My Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Course Card 1 */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <div className="p-4">
                    <h4 className="font-semibold">Algebra 101</h4>
                    <p className="text-sm text-gray-600 mb-3">Prof. Johnson • MWF 10:00 AM</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">45% complete</p>
                  </div>
                </div>
                
                {/* Course Card 2 */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="h-32 bg-gradient-to-r from-green-500 to-teal-600"></div>
                  <div className="p-4">
                    <h4 className="font-semibold">Biology 201</h4>
                    <p className="text-sm text-gray-600 mb-3">Dr. Smith • TR 1:30 PM</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">80% complete</p>
                  </div>
                </div>
                
                {/* Course Card 3 */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                  <div className="p-4">
                    <h4 className="font-semibold">History 101</h4>
                    <p className="text-sm text-gray-600 mb-3">Prof. Williams • TR 9:00 AM</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">65% complete</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Assignments */}
            <div>
              <h3 className="text-lg font-medium mb-3">Upcoming Assignments</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  <li className="p-4 hover:bg-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Algebra Worksheet 5</h4>
                        <p className="text-sm text-gray-600">Algebra 101</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Due Tomorrow</span>
                        <p className="text-xs text-gray-500 mt-1">11:59 PM</p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Cell Structure Essay</h4>
                        <p className="text-sm text-gray-600">Biology 201</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Due in 3 days</span>
                        <p className="text-xs text-gray-500 mt-1">11:59 PM</p>
                      </div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">World War II Paper</h4>
                        <p className="text-sm text-gray-600">History 101</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Due in 7 days</span>
                        <p className="text-xs text-gray-500 mt-1">11:59 PM</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentRoute>
  );
}

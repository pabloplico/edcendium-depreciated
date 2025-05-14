import { useSession } from 'next-auth/react';
import { TeacherRoute } from '../components/RouteGuard';
import NavBar from '../components/NavBar';

export default function TeacherDashboard() {
  const { data: session } = useSession();

  return (
    <TeacherRoute>
      <div>
        <NavBar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
            <p className="mb-4">This is your teacher dashboard. Here you can manage your courses and students.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {/* Course Management */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">Course Management</h3>
                <p className="text-sm text-blue-600 mb-3">Create and manage your courses</p>
                <button className="text-sm bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Manage Courses
                </button>
              </div>
              
              {/* Student Progress */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">Student Progress</h3>
                <p className="text-sm text-green-600 mb-3">Track your students' performance</p>
                <button className="text-sm bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                  View Progress
                </button>
              </div>
              
              {/* Assignment Management */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-800 mb-2">Assignments</h3>
                <p className="text-sm text-purple-600 mb-3">Create and grade assignments</p>
                <button className="text-sm bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                  Manage Assignments
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3">
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">New Submission</span>
                      <p className="ml-2 text-sm text-gray-700">John Smith submitted "Math Homework 3"</p>
                      <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Course</span>
                      <p className="ml-2 text-sm text-gray-700">You published a new lesson in "Algebra 101"</p>
                      <span className="ml-auto text-xs text-gray-500">Yesterday</span>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Question</span>
                      <p className="ml-2 text-sm text-gray-700">Sarah Johnson asked a question in "Geometry"</p>
                      <span className="ml-auto text-xs text-gray-500">2 days ago</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherRoute>
  );
}

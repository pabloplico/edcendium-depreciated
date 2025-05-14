import { useSession } from 'next-auth/react';
import { AdminRoute } from '../components/RouteGuard';
import NavBar from '../components/NavBar';

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <AdminRoute>
      <div>
        <NavBar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
            <p className="mb-4">This is your admin dashboard. Here you can manage the entire system.</p>
            
            {/* Statistics overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-blue-800 font-medium">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">347</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-green-800 font-medium">Active Courses</h3>
                <p className="text-3xl font-bold text-green-600">24</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-purple-800 font-medium">Teachers</h3>
                <p className="text-3xl font-bold text-purple-600">18</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-yellow-800 font-medium">Students</h3>
                <p className="text-3xl font-bold text-yellow-600">325</p>
              </div>
            </div>
            
            {/* Admin Functions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* User Management */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md p-5 text-white">
                <h3 className="font-semibold text-lg mb-3">User Management</h3>
                <p className="text-blue-100 mb-4">Add, edit, or remove users from the system</p>
                <button className="bg-white text-blue-700 py-2 px-4 rounded hover:bg-blue-50 transition-colors">
                  Manage Users
                </button>
              </div>
              
              {/* Course Management */}
              <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md p-5 text-white">
                <h3 className="font-semibold text-lg mb-3">Course Management</h3>
                <p className="text-green-100 mb-4">Create, edit, and assign courses</p>
                <button className="bg-white text-green-700 py-2 px-4 rounded hover:bg-green-50 transition-colors">
                  Manage Courses
                </button>
              </div>
              
              {/* System Settings */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-md p-5 text-white">
                <h3 className="font-semibold text-lg mb-3">System Settings</h3>
                <p className="text-purple-100 mb-4">Configure system preferences and settings</p>
                <button className="bg-white text-purple-700 py-2 px-4 rounded hover:bg-purple-50 transition-colors">
                  Settings
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                        <div className="text-sm text-gray-500">sarah.j@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Account created</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2 hours ago</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Complete
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Michael Roberts</div>
                        <div className="text-sm text-gray-500">michael.r@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Course created</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Yesterday</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Complete
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">David Wilson</div>
                        <div className="text-sm text-gray-500">david.w@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Password reset</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2 days ago</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

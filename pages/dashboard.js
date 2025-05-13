import { useSession } from 'next-auth/react';
import ProtectedRoute from '../components/ProtectedRoute';
import NavBar from '../components/NavBar';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div>
        <NavBar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
            <p className="mb-4">This is your protected dashboard page.</p>
            
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-medium">User Information:</p>
              <ul className="mt-2">
                <li>Email: {session?.user?.email}</li>
                <li>Role: {session?.user?.role || 'User'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

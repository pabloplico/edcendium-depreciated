import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import CreateLesson from './pages/CreateLesson';
import ManageCourses from './pages/ManageCourses';
import StudentEnrollment from './pages/StudentEnrollment';
import StudentProgress from './pages/StudentProgress';
import Notifications from './pages/Notifications';
import CoursePlanner from './pages/CoursePlanner';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="dashboard-container flex bg-gray-50">
      {/* Navigation Sidebar */}
      <Navigation 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="md:hidden mb-4">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md bg-blue-500 text-white"
          >
            {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 min-h-[90vh]">
          <Routes>
            <Route path="/" element={<CreateLesson />} />
            <Route path="/create-lesson" element={<CreateLesson />} />
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/student-enrollment" element={<StudentEnrollment />} />
            <Route path="/student-progress" element={<StudentProgress />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/course-planner" element={<CoursePlanner />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;

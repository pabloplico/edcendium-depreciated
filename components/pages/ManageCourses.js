import React, { useState } from 'react';

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Algebra Fundamentals', enrolled: 28, lessons: 12, lastUpdated: '2023-10-15' },
    { id: 2, title: 'Introduction to Biology', enrolled: 32, lessons: 15, lastUpdated: '2023-10-10' },
    { id: 3, title: 'World History', enrolled: 24, lessons: 20, lastUpdated: '2023-10-05' },
    { id: 4, title: 'English Literature', enrolled: 30, lessons: 18, lastUpdated: '2023-09-28' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Course
        </button>
      </div>
      
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search courses..."
              className="p-2 border border-gray-300 rounded-md w-1/3"
            />
            
            <div className="flex space-x-2">
              <select className="p-2 border border-gray-300 rounded-md">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>History</option>
                <option>English</option>
              </select>
              
              <select className="p-2 border border-gray-300 rounded-md">
                <option>All Grades</option>
                <option>Elementary</option>
                <option>Middle School</option>
                <option>High School</option>
              </select>
            </div>
          </div>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students Enrolled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-800">{course.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {course.enrolled} students
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {course.lessons} lessons
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {course.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                  <button className="text-green-600 hover:text-green-800">Lessons</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;

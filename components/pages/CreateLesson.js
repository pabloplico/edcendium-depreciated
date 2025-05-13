import React from 'react';

const CreateLesson = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Lesson with AI</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Lesson Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter lesson title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Mathematics</option>
              <option>Science</option>
              <option>History</option>
              <option>English</option>
              <option>Art</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
              <button 
                key={grade} 
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300"
              >
                Grade {grade}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">AI Prompt</h2>
        <p className="text-sm text-gray-600 mb-4">
          Describe what you want to teach and get AI-generated lesson content.
        </p>
        
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
          placeholder="e.g., Create a lesson about photosynthesis for 5th graders that includes an interactive activity and assessment questions."
        ></textarea>
        
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Generate Lesson
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">AI-Generated Content</h2>
        <p className="text-gray-500 text-center py-8">
          Generated lesson content will appear here
        </p>
      </div>
    </div>
  );
};

export default CreateLesson;

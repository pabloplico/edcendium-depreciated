import React, { useState } from 'react';

const CreateLesson = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [gradeLevel, setGradeLevel] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const handleGenerateLesson = async () => {
    if (!lessonTitle || !subject || !gradeLevel || !prompt) {
      alert('Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonTitle,
          subject,
          gradeLevel,
          prompt
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || errorData.error || 'Failed to generate lesson');
      }
      
      const data = await response.json();
      setGeneratedContent(data);
      console.log('Lesson generated successfully');
    } catch (error) {
      console.error('Error generating lesson:', error);
      let errorMessage = 'Failed to generate lesson. Please try again.';
      
      if (error.message.includes('OpenAI API error')) {
        errorMessage = 'Error with AI service. Please check your API key and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

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
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter lesson title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="English">English</option>
              <option value="Art">Art</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
              <button 
                key={grade} 
                className={`px-3 py-1 border ${gradeLevel === grade ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-300'} rounded-md hover:bg-blue-50 hover:border-blue-300`}
                onClick={() => setGradeLevel(grade)}
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
          placeholder="e.g., Create a lesson about photosynthesis for 5th graders that includes an interactive activity and assessment questions."
        ></textarea>
        
        <div className="mt-4 flex justify-end">
          <button 
            className={`${isGenerating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md transition-colors`}
            onClick={handleGenerateLesson}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Lesson'}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">AI-Generated Content</h2>
        
        {generatedContent ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Lesson Title:</h3>
              <p>{generatedContent.title}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Subject:</h3>
              <p>{generatedContent.subject}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Grade Level:</h3>
              <p>Grade {generatedContent.gradeLevel}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Learning Objectives:</h3>
              <ul className="list-disc pl-5">
                {generatedContent.objectives.map((objective, idx) => (
                  <li key={idx}>{objective}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Lesson Content:</h3>
              <p className="whitespace-pre-line">{generatedContent.content}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Activities:</h3>
              <ul className="list-disc pl-5">
                {generatedContent.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end mt-6">
              <button 
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setGeneratedContent(null)}
              >
                Edit
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Save Lesson
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Generated lesson content will appear here
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateLesson;

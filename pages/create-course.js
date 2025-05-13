import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchInput from '../components/ui/SearchInput';

const CreateCourse = () => {
  const router = useRouter();
  
  // Course information
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedLearningArea, setSelectedLearningArea] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  
  // Search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [searchGCQuery, setSearchGCQuery] = useState('');
  const [searchCCPQuery, setSearchCCPQuery] = useState('');
  const [filteredContentDescriptors, setFilteredContentDescriptors] = useState([]);
  
  // Selected items for course plan
  const [selectedContentDescriptors, setSelectedContentDescriptors] = useState([]);
  const [selectedGeneralCapabilities, setSelectedGeneralCapabilities] = useState([]);
  const [selectedCrossCurriculumPriorities, setSelectedCrossCurriculumPriorities] = useState([]);
  
  // Data stores
  const [learningAreas, setLearningAreas] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [contentDescriptors, setContentDescriptors] = useState([]);
  const [generalCapabilities, setGeneralCapabilities] = useState([]);
  const [crossCurriculumPriorities, setCrossCurriculumPriorities] = useState([]);
  const [achievementStandards, setAchievementStandards] = useState([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load initial data
  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [
          contentDescriptorsResponse, 
          generalCapabilitiesResponse, 
          crossCurriculumResponse,
          achievementStandardsResponse
        ] = await Promise.all([
          fetch('/api/curriculum/content-descriptors'),
          fetch('/api/curriculum/general-capabilities'),
          fetch('/api/curriculum/cross-curriculum-priorities'),
          fetch('/api/curriculum/achievement-standards')
        ]);

        const contentDescriptorsData = await contentDescriptorsResponse.json();
        const generalCapabilitiesData = await generalCapabilitiesResponse.json();
        const crossCurriculumData = await crossCurriculumResponse.json();
        const achievementStandardsData = await achievementStandardsResponse.json();

        // Extract unique learning areas from content descriptors
        const uniqueLearningAreas = [...new Set(contentDescriptorsData
          .filter(item => item['Learning Area'])
          .map(item => item['Learning Area']))];
        
        // Get available year levels
        const uniqueYearLevels = [...new Set(contentDescriptorsData
          .filter(item => item['Level'])
          .map(item => item['Level']))];

        setContentDescriptors(contentDescriptorsData);
        setGeneralCapabilities(generalCapabilitiesData);
        setCrossCurriculumPriorities(crossCurriculumData);
        setAchievementStandards(achievementStandardsData);
        setLearningAreas(uniqueLearningAreas);
        setYearLevels(uniqueYearLevels);
        
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
        alert('Failed to load curriculum data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurriculumData();
  }, []);

  // Update subjects when learning area changes
  useEffect(() => {
    if (selectedLearningArea) {
      const filteredSubjects = [...new Set(contentDescriptors
        .filter(item => item['Learning Area'] === selectedLearningArea && item['Subject'])
        .map(item => item['Subject']))];
      
      setSubjects(filteredSubjects);
      setSelectedSubject('');
    } else {
      setSubjects([]);
    }
    
    // Reset content descriptor filtering
    filterContentDescriptors();
  }, [selectedLearningArea, contentDescriptors]);
  
  // Filter content descriptors based on selections and search query
  useEffect(() => {
    filterContentDescriptors();
  }, [selectedLearningArea, selectedSubject, selectedYearLevel, searchQuery, contentDescriptors]);

  const filterContentDescriptors = () => {
    if (!contentDescriptors.length) return;
    
    let filtered = [...contentDescriptors];
    
    // Filter by learning area if selected
    if (selectedLearningArea) {
      filtered = filtered.filter(item => item['Learning Area'] === selectedLearningArea);
    }
    
    // Filter by subject if selected
    if (selectedSubject) {
      filtered = filtered.filter(item => item['Subject'] === selectedSubject);
    }
    
    // Filter by year level if selected
    if (selectedYearLevel) {
      filtered = filtered.filter(item => item['Level'] === selectedYearLevel);
    }
    
    // Filter by search query if provided
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        (item['Content Description'] && item['Content Description'].toLowerCase().includes(query)) ||
        (item['Code'] && item['Code'].toLowerCase().includes(query))
      );
    }
    
    // Only show content descriptors with actual content, not organizational items
    filtered = filtered.filter(item => item['Content Description'] && item['Content Description'].trim() !== '');
    
    setFilteredContentDescriptors(filtered);
  };

  const handleToggleContentDescriptor = (descriptor) => {
    const exists = selectedContentDescriptors.some(item => item.Code === descriptor.Code);
    
    if (exists) {
      setSelectedContentDescriptors(selectedContentDescriptors.filter(item => item.Code !== descriptor.Code));
    } else {
      setSelectedContentDescriptors([...selectedContentDescriptors, descriptor]);
    }
  };
  
  const handleToggleGeneralCapability = (capability) => {
    const exists = selectedGeneralCapabilities.some(item => item.Code === capability.Code);
    
    if (exists) {
      setSelectedGeneralCapabilities(selectedGeneralCapabilities.filter(item => item.Code !== capability.Code));
    } else {
      setSelectedGeneralCapabilities([...selectedGeneralCapabilities, capability]);
    }
  };
  
  const handleToggleCrossCurriculumPriority = (priority) => {
    const exists = selectedCrossCurriculumPriorities.some(item => item.Code === priority.Code);
    
    if (exists) {
      setSelectedCrossCurriculumPriorities(selectedCrossCurriculumPriorities.filter(item => item.Code !== priority.Code));
    } else {
      setSelectedCrossCurriculumPriorities([...selectedCrossCurriculumPriorities, priority]);
    }
  };

  const handleSaveCourse = async () => {
    if (!courseTitle) {
      alert('Please enter a course title');
      return;
    }
    
    if (selectedContentDescriptors.length === 0) {
      alert('Please select at least one content descriptor');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const courseData = {
        title: courseTitle,
        learningArea: selectedLearningArea,
        subject: selectedSubject,
        yearLevel: selectedYearLevel,
        contentDescriptors: selectedContentDescriptors,
        generalCapabilities: selectedGeneralCapabilities,
        crossCurriculumPriorities: selectedCrossCurriculumPriorities,
        createdAt: new Date().toISOString()
      };
      
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save course');
      }
      
      alert('Course outline saved successfully!');
      // Optionally redirect to course list or the saved course
      // router.push('/courses');
      
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Get the relevant achievement standard for the current selection
  const getAchievementStandard = () => {
    if (!selectedLearningArea || !selectedSubject || !selectedYearLevel || !achievementStandards.length) {
      return null;
    }
    
    return achievementStandards.find(standard => 
      standard['Learning Area'] === selectedLearningArea &&
      standard['Subject'] === selectedSubject &&
      standard['Level'] === selectedYearLevel
    );
  };
  
  const achievementStandard = getAchievementStandard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading curriculum data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Create Course Outline - MCMPORTAL</title>
        <meta name="description" content="Create curriculum-aligned course outlines and unit plans" />
      </Head>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Course Outline</h1>
      
      {/* Course Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Course Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
            <input 
              type="text" 
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Learning Area</label>
            <select 
              value={selectedLearningArea}
              onChange={(e) => setSelectedLearningArea(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Learning Area</option>
              {learningAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={!selectedLearningArea}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
            <select 
              value={selectedYearLevel}
              onChange={(e) => setSelectedYearLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Year Level</option>
              {yearLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Content Search Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Curriculum Content</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Content Descriptors</label>
          <SearchInput 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search by keyword or code..."
          />
          {searchQuery && (
            <div className="text-sm text-gray-500 mt-1">
              Showing {filteredContentDescriptors.length} result(s) for "{searchQuery}"
            </div>
          )}
        </div>
        
        {/* Content Descriptor Search Results */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-800 mb-2">Content Descriptors</h3>
          {filteredContentDescriptors.length > 0 ? (
            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md bg-white">
              {filteredContentDescriptors.map((descriptor) => (
                <div 
                  key={descriptor.Code} 
                  className="p-3 border-b border-gray-200 hover:bg-blue-50 cursor-pointer flex items-start"
                  onClick={() => handleToggleContentDescriptor(descriptor)}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedContentDescriptors.some(item => item.Code === descriptor.Code)}
                    onChange={() => {}}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-medium text-sm text-blue-600">{descriptor.Code}</div>
                    <div className="text-sm">{descriptor['Content Description']}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-md bg-white p-6">
              <p className="text-gray-500 text-center">
                {searchQuery && selectedLearningArea 
                  ? `No content descriptors found for "${searchQuery}". Try a different search term.` 
                  : selectedLearningArea 
                    ? "No content descriptors found. Try selecting a subject or year level."
                    : "Please select a Learning Area to view content descriptors."}
              </p>
              {searchQuery && (
                <div className="text-center mt-2">
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Achievement Standard */}
        {achievementStandard && (
          <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100">
            <h3 className="text-md font-medium text-blue-800 mb-2">Achievement Standard</h3>
            <p className="text-sm text-gray-700">{achievementStandard['Achievement Standard']}</p>
          </div>
        )}
        
        {/* General Capabilities Section */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-2">General Capabilities</h3>
          <p className="text-sm text-gray-600 mb-2">Select general capabilities addressed in this course:</p>
          
          <div className="mb-3">
            <SearchInput
              placeholder="Search general capabilities..."
              value={searchGCQuery || ''}
              onChange={(e) => setSearchGCQuery(e.target.value)}
              onClear={() => setSearchGCQuery('')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {generalCapabilities
              .filter(capability => {
                // Only main capability entries, not elements or sub-elements
                const isMainCapability = capability['General Capability'] && !capability['Element'] && !capability['Sub-Element'];
                
                // If search query exists, filter by it
                if (searchGCQuery && isMainCapability) {
                  return capability['General Capability'].toLowerCase().includes(searchGCQuery.toLowerCase());
                }
                
                return isMainCapability;
              })
              .map((capability) => (
                <div 
                  key={capability.Code} 
                  className="flex items-center p-2 border border-gray-200 rounded-md hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleToggleGeneralCapability(capability)}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedGeneralCapabilities.some(item => item.Code === capability.Code)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span className="text-sm">{capability['General Capability']}</span>
                </div>
              ))}
          </div>
        </div>
        
        {/* Cross-Curriculum Priorities Section */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-800 mb-2">Cross-Curriculum Priorities</h3>
          <p className="text-sm text-gray-600 mb-2">Select cross-curriculum priorities addressed in this course:</p>
          
          <div className="mb-3">
            <SearchInput
              placeholder="Search cross-curriculum priorities..."
              value={searchCCPQuery || ''}
              onChange={(e) => setSearchCCPQuery(e.target.value)}
              onClear={() => setSearchCCPQuery('')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {crossCurriculumPriorities
              .filter(priority => {
                // Only main priority entries, not organizing ideas
                const isMainPriority = priority['Cross-Curriculum Priority'] && !priority['Organising ideas title'] && !priority['Organising idea indicator'];
                
                // If search query exists, filter by it
                if (searchCCPQuery && isMainPriority) {
                  return priority['Cross-Curriculum Priority'].toLowerCase().includes(searchCCPQuery.toLowerCase());
                }
                
                return isMainPriority;
              })
              .map((priority) => (
                <div 
                  key={priority.Code} 
                  className="flex items-center p-2 border border-gray-200 rounded-md hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleToggleCrossCurriculumPriority(priority)}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedCrossCurriculumPriorities.some(item => item.Code === priority.Code)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span className="text-sm">{priority['Cross-Curriculum Priority']}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Preview Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Course Outline Preview</h2>
        
        {(selectedContentDescriptors.length > 0 || selectedGeneralCapabilities.length > 0 || selectedCrossCurriculumPriorities.length > 0) ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-medium text-gray-900">Course Title:</h3>
              <p>{courseTitle || 'No title provided'}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Subject Area:</h3>
              <p>{selectedLearningArea} {selectedSubject ? `- ${selectedSubject}` : ''}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Year Level:</h3>
              <p>{selectedYearLevel || 'Not specified'}</p>
            </div>
            
            {/* Selected Content Descriptors */}
            {selectedContentDescriptors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900">Content Descriptors:</h3>
                <ul className="list-disc pl-5 mt-2">
                  {selectedContentDescriptors.map((descriptor) => (
                    <li key={descriptor.Code} className="mb-2">
                      <span className="text-sm font-medium text-blue-600">{descriptor.Code}</span>
                      <p className="text-sm">{descriptor['Content Description']}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Selected General Capabilities */}
            {selectedGeneralCapabilities.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900">General Capabilities:</h3>
                <ul className="list-disc pl-5 mt-2">
                  {selectedGeneralCapabilities.map((capability) => (
                    <li key={capability.Code}>
                      {capability['General Capability']}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Selected Cross-Curriculum Priorities */}
            {selectedCrossCurriculumPriorities.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900">Cross-Curriculum Priorities:</h3>
                <ul className="list-disc pl-5 mt-2">
                  {selectedCrossCurriculumPriorities.map((priority) => (
                    <li key={priority.Code}>
                      {priority['Cross-Curriculum Priority']}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleSaveCourse}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Course Outline'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Select content descriptors and other curriculum elements to preview your course outline
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;

// API endpoint for managing courses/unit plans
// This uses a simple in-memory store, but in a real application this would connect to a database

// Mock database for courses
let courses = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return all courses or filter by query parameters
    const { learningArea, subject, yearLevel } = req.query;
    
    let filteredCourses = [...courses];
    
    if (learningArea) {
      filteredCourses = filteredCourses.filter(course => course.learningArea === learningArea);
    }
    
    if (subject) {
      filteredCourses = filteredCourses.filter(course => course.subject === subject);
    }
    
    if (yearLevel) {
      filteredCourses = filteredCourses.filter(course => course.yearLevel === yearLevel);
    }
    
    res.status(200).json(filteredCourses);
  } 
  else if (req.method === 'POST') {
    // Create a new course
    const courseData = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    
    courses.push(courseData);
    res.status(201).json(courseData);
  } 
  else if (req.method === 'PUT') {
    // Update an existing course
    const { id, ...updatedData } = req.body;
    
    const courseIndex = courses.findIndex(course => course.id === id);
    
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    courses[courseIndex] = {
      ...courses[courseIndex],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    res.status(200).json(courses[courseIndex]);
  } 
  else if (req.method === 'DELETE') {
    // Delete a course
    const { id } = req.query;
    
    const courseIndex = courses.findIndex(course => course.id === id);
    
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    courses.splice(courseIndex, 1);
    
    res.status(200).json({ message: 'Course deleted successfully' });
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

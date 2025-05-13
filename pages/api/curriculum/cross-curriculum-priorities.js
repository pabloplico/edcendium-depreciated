// API endpoint for accessing cross-curriculum priorities
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the cross-curriculum priorities JSON file
    const dataFilePath = path.join(process.cwd(), 'data', 'cross_curriculum_priorities.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const crossCurriculumPriorities = JSON.parse(fileContents);
    
    res.status(200).json(crossCurriculumPriorities);
  } catch (error) {
    console.error('Error fetching cross-curriculum priorities:', error);
    res.status(500).json({ error: 'Failed to fetch cross-curriculum priorities' });
  }
}

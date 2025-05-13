// API endpoint for accessing content descriptors
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the content descriptors JSON file
    const dataFilePath = path.join(process.cwd(), 'data', 'content_descriptors.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const contentDescriptors = JSON.parse(fileContents);
    
    res.status(200).json(contentDescriptors);
  } catch (error) {
    console.error('Error fetching content descriptors:', error);
    res.status(500).json({ error: 'Failed to fetch content descriptors' });
  }
}

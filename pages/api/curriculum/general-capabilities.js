// API endpoint for accessing general capabilities
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the general capabilities JSON file
    const dataFilePath = path.join(process.cwd(), 'data', 'general_capabilities.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const generalCapabilities = JSON.parse(fileContents);
    
    res.status(200).json(generalCapabilities);
  } catch (error) {
    console.error('Error fetching general capabilities:', error);
    res.status(500).json({ error: 'Failed to fetch general capabilities' });
  }
}

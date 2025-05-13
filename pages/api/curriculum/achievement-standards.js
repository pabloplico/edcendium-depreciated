// API endpoint for accessing achievement standards
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the achievement standards JSON file
    const dataFilePath = path.join(process.cwd(), 'data', 'achievement_standards.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const achievementStandards = JSON.parse(fileContents);
    
    res.status(200).json(achievementStandards);
  } catch (error) {
    console.error('Error fetching achievement standards:', error);
    res.status(500).json({ error: 'Failed to fetch achievement standards' });
  }
}

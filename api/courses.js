import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'db.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Read and return the courses
    const data = fs.readFileSync(dataFilePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    // Add a new course
    const newCourse = req.body;
    
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    jsonData.courses.push(newCourse);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    res.status(201).json(newCourse);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

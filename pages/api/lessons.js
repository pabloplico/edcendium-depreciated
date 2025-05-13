// Mock database for lessons
let lessons = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    gradeLevel: 8,
    createdAt: '2023-10-15T09:00:00Z',
    objectives: [
      'Understand basic algebraic concepts',
      'Solve simple equations',
      'Apply algebraic thinking to real-world problems'
    ],
    content: 'This is a sample algebra lesson for 8th graders.',
    activities: [
      'Group problem-solving exercise',
      'Algebraic equation worksheet',
      'Real-world application project'
    ]
  },
  {
    id: '2',
    title: 'Solar System Exploration',
    subject: 'Science',
    gradeLevel: 5,
    createdAt: '2023-10-14T10:30:00Z',
    objectives: [
      'Name the planets in our solar system',
      'Describe key characteristics of each planet',
      'Understand the concept of orbit and rotation'
    ],
    content: 'This lesson introduces students to our solar system.',
    activities: [
      'Solar system model building',
      'Planet fact research activity',
      'Space quiz competition'
    ]
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(lessons);
  } else if (req.method === 'POST') {
    const newLesson = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    
    lessons.push(newLesson);
    res.status(201).json(newLesson);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

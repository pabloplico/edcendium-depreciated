// API endpoint for generating lesson content using OpenAI API
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { lessonTitle, subject, gradeLevel, prompt } = req.body;
    
    if (!lessonTitle || !subject || !gradeLevel || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Call OpenAI API to generate the lesson content
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use "gpt-4" for improved results if you have access
      messages: [
        {
          role: "system",
          content: "You are an educational content creator specializing in creating comprehensive lesson plans for teachers. You create well-structured, grade-appropriate content with clear learning objectives, detailed lesson content, and engaging activities."
        },
        {
          role: "user",
          content: `Create a detailed lesson plan about "${lessonTitle}" for grade ${gradeLevel} in the subject of ${subject}. 
            Additional context: ${prompt}
            
            Format your response as ONLY valid JSON with the following structure:
            {
              "objectives": ["objective1", "objective2", "objective3"],
              "content": "detailed lesson content here with structured sections and explanations",
              "activities": ["activity1", "activity2", "activity3"]
            }
            
            The objectives should be specific, measurable learning outcomes.
            The content should be detailed and include all necessary explanations, examples, and teaching points.
            The activities should be practical, engaging, and reinforce the learning objectives.`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" } // Ensure valid JSON response
    });

    // Extract and parse the generated content
    const aiGeneratedContentText = completion.choices[0].message.content;
    let aiGeneratedContent;
    
    try {
      aiGeneratedContent = JSON.parse(aiGeneratedContentText);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    // Combine with the original request data
    const generatedLesson = {
      title: lessonTitle,
      subject,
      gradeLevel,
      ...aiGeneratedContent
    };

    return res.status(200).json(generatedLesson);
  } catch (error) {
    console.error('Error generating lesson:', error);
    // Check for OpenAI specific errors
    if (error.name === 'APIError') {
      // Handle OpenAI API errors
      return res.status(500).json({ 
        error: 'OpenAI API error', 
        message: error.message,
        type: error.type
      });
    }
    return res.status(500).json({ error: 'Failed to generate lesson content' });
  }
}

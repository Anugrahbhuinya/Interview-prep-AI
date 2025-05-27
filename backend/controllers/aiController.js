const { GoogleGenerativeAI } = require('@google/generative-ai');
const { conceptExplainPrompt, questionAnswerPrompt } = require('../utils/prompts');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// aiController.js
// aiController.js
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required field(s)" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    console.log("Generated prompt:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.candidates[0].content.parts[0].text;
    console.log("Raw Gemini AI response:", text);

    const jsonMatch = text.match(/\[\s*{[\s\S]*?}\s*]/);
    if (!jsonMatch) {
      console.error("No valid JSON array found in AI response:", text);
      return res.status(500).json({ message: "Invalid JSON format returned by AI" });
    }

    let data;
    try {
      data = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message, "Text:", text);
      return res.status(500).json({ message: "Failed to parse AI response" });
    }
    console.log("Parsed questions:", JSON.stringify(data, null, 2));

    // Normalize and validate questions
    const validQuestions = data
      .map((q, index) => {
        const normalized = {
          question: q.question || q.Question || q.q || "",
          answer: q.answer || q.Answer || q.a || "",
        };
        if (!normalized.question || !normalized.answer) {
          console.warn(`Invalid question at index ${index}: ${JSON.stringify(q)}`);
          return null;
        }
        return normalized;
      })
      .filter(q => q !== null);

    if (validQuestions.length === 0) {
      console.error("No valid questions in parsed data:", data);
      return res.status(500).json({ message: "No valid questions generated" });
    }

    return res.status(200).json(validQuestions);
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};



const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    console.log('Received question:', question);
    if (!question || typeof question !== 'string' || question.trim() === '') {
      console.log('Validation failed: Invalid question');
      return res.status(400).json({ message: 'Valid question is required' });
    }
    const prompt = conceptExplainPrompt(question.trim());
    console.log('Generated prompt:', prompt);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Calling Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Gemini API response:', JSON.stringify(result, null, 2));
    if (!result.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini API response structure:', result);
      return res.status(500).json({ message: 'Invalid response from AI service' });
    }
    let text = result.response.candidates[0].content.parts[0].text;
    console.log('Extracted text:', text);
    // Remove Markdown code fences and trim
    text = text.replace(/```json\n|```\n|```/g, '').trim();
    console.log('Cleaned text:', text);
    let data;
    try {
      data = JSON.parse(text);
      console.log('Parsed data:', data);
      if (!data.title || !data.explanation) {
        throw new Error('Invalid data structure: missing title or explanation');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError.message, 'Text:', text);
      // Fallback: Use question as title and raw text as explanation
      data = {
        title: question,
        explanation: text
      };
    }
    console.log('Final data:', data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error generating concept explanation:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    return res.status(500).json({
      message: 'Failed to generate explanation',
      error: error.message || 'Internal server error',
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};

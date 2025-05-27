const Question = require('../models/questionModel');
const Session = require('../models/sessionModel');

// Add multiple questions to a session
exports.addQuestion = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;


        if (!questions || !sessionId || !Array.isArray(questions)) {
            return res.status(400).json({ error: "Invalid request data" });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        const createdQuestions = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                    note: q.note || "",
                    isPinned: q.isPinned || false
                });
                return question;
            })
        );

        // Optionally update session's questions array
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();

        return res.status(201).json({
            session,
            questions: createdQuestions
        });
    } catch (err) {
        console.error('Error in addQuestion:', err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
};

// Update note for a question
exports.updateQuestion = async (req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.note = note || "";
        await question.save();

        return res.status(200).json({ success: true, message: "Question successfully updated" });
    } catch (err) {
        console.error('Error in updateQuestion:', err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
};

// Toggle pin/unpin a question
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        return res.status(200).json({ success: true, question });
    } catch (err) {
        console.error('Error toggling pin status:', err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
};

// Optional: Get all questions for a session
exports.getQuestionsBySession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const questions = await Question.find({ session: sessionId }).sort({ createdAt: -1 });
        return res.status(200).json(questions);
    } catch (err) {
        console.error('Error fetching questions:', err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
};

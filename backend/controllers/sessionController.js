const Session = require('../models/sessionModel.js');
const Question = require('../models/questionModel.js');
const mongoose = require('mongoose');

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id;

    // 1. Create session without questions
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: [], // initially empty
    });

    // 2. Create question documents
    const questionDocs = await Promise.all(
      questions.map((q) =>
        Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        })
      )
    );

    // 3. Update session with the question ObjectIds
    session.questions = questionDocs.map((q) => q._id);
    await session.save();

    // 4. Return full session + question data
    return res.status(201).json({
      session,
      questions: questionDocs,
    });
  } catch (err) {
    console.error("Session creation failed:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};



exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .populate('questions')
      .sort({ createdAt: -1 });

    res.status(200).json(sessions); // Return array of sessions
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};


exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate('questions')
            .populate('user', 'name email');

        if (!session) {
            return res.status(404).json({ error: "Session not found." });
        }

        return res.status(200).json(session);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong." });
    }
}


exports.deleteSession = async (req, res) => {
  try {
      if (!req.user) {
          return res.status(401).json({ error: "Unauthorized" });
      }

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: "Invalid session ID" });
      }

      const session = await Session.findById(req.params.id);
      if (!session) {
          return res.status(404).json({ error: "Session not found." });
      }

      if (!session.user || session.user.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: "You are not authorized to delete this session." });
      }

      await session.deleteOne();
      return res.status(200).json({ message: "Session deleted successfully." });

  } catch (err) {
      console.error("Delete Session Error:", err);
      return res.status(500).json({ error: "Something went wrong." });
  }
};

import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
  }],
  createdBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
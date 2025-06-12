const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  examId: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // array of strings, e.g., ["A", "B", "C", "D"]
    required: true,
  },
  correctAnswer: {
    type: String, // store the correct option value like "A" or "Option A"
    required: true,
  },
}, { timestamps: true });

const QuestionModel = mongoose.model("Question", questionSchema);

module.exports = QuestionModel;


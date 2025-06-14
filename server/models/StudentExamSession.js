const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentExamSessionSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  examId: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  answers: {
    type: Map,
    of: String,
    default: {},
  },
  score: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const StudentExamSession = mongoose.model("StudentExamSession", studentExamSessionSchema);
module.exports = StudentExamSession;

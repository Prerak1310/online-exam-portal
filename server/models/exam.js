const mongoose = require("mongoose");
const { Schema } = mongoose;

const examSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    duration: {
      type: Number, // in minutes
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ExamModel = mongoose.model("Exam", examSchema);

module.exports = ExamModel;


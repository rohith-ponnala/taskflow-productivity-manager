const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: [
      "Todo",
      "In Progress",
      "Completed",
    ],
    default: "Todo",
  },

  category: {
    type: String,
    enum: [
      "Work",
      "Study",
      "Personal",
      "Health",
      "Other",
    ],
    default: "Personal",
  },

  priority: {
    type: String,
    enum: [
      "Low",
      "Medium",
      "High",
    ],
    default: "Medium",
  },

  dueDate: {
    type: Date,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  completedAt: {
    type: Date,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{
  timestamps: true,
}
);

module.exports =
mongoose.model(
  "Todo",
  todoSchema
);
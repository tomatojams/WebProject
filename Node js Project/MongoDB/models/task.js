const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = schema(
  {
    task: { type: String, require: true },
    isComplete: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task".taskSchema);
module.exports = Task;

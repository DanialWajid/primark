const projmodel = require("mongoose");

const projectSchema = projmodel.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  { timestamp: true }
);
const project = projmodel.model("project", projectSchema);
module.exports = project;

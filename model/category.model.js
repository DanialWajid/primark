const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Men", "Women", "Kids", "Click & Collect", "Home", "Baby"],
      required: true,
    },
    linkName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

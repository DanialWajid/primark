const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizesAvailable: {
      type: [String],
      required: true,
    },
    categoryType: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

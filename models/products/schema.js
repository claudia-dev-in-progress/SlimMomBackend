const { Schema, model } = require("mongoose");

const product = new Schema({
  categories: { type: String },
  weight: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  groupBloodNotAllowed: {
    1: { type: Boolean, required: true },
    2: { type: Boolean, required: true },
    3: { type: Boolean, required: true },
    4: { type: Boolean, required: true },
  },
});

const Product = model("product", product);

module.exports = Product;

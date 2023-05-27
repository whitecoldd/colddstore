const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: [{ type: String, required: true }],
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    qty: { type: Number, required: true },
    subcat: { type: mongoose.Schema.Types.ObjectId, ref: "SubCat", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

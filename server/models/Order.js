const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    products: { type: Array, required: true },
    stripeid: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

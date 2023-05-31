require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Product = require("../models/Product");
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/create-checkout-session", verifyToken, async (req, res) => {
  const { products } = req.body;
  const lineItems = await Promise.all(
    products.map(async (product) => {
      const item = await Product.findOne(product._id);
      return {
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    })
  );
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/error`,
    });
    const order = new Order({ products, stripeid: session.id });
    await order.save();
    res.status(200).json({ stripeSession: session });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

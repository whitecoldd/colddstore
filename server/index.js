const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const subcatRoute = require("./routes/subcat");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const userRoute = require("./routes/user");
const cors = require("cors");

//configs and connections
dotenv.config();
connectDB();
app.use(
  cors({
    origin: [
      "https://colddstore.onrender.com/",
      "https://colddstore.netlify.app/",
    ],
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://main--colddstore.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcat", subcatRoute);
app.use("/api/product", productRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/user", userRoute);

//driver
app.listen(process.env.PORT || 3000, () => {
  console.log("backend server is up on PORT" + process.env.PORT || 3000);
});

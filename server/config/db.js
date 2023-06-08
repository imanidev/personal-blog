const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", function (error) {
  console.error("MongoDB connection error:", error);
});

db.once("open", function () {
  console.log("Connected to MongoDB!");
});

require("dotenv").config();
const express = require("express");
const app = express();

//database connection
require("./config/db");

const PORT = process.env.PORT || 3001;

//middlewares
const middlewares = require('./middlewares/index');
app.use(middlewares);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

//routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);



//listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

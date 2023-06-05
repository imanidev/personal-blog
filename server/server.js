require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

// path
const path = require("path");

require('./config/db');


const PORT = process.env.PORT || 3001;


const middlewares = require("./middlewares/index");
app.use(middlewares);


//routes
app.get("/", (req, res) => {
    res.send("Hello Express!");
    });



// listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

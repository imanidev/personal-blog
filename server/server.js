require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");


const path = require("path");

require('./config/db');


const PORT = process.env.PORT || 3001;


const middlewares = require("./middlewares/index");
app.use(middlewares);


//routes
app.get("/", (req, res) => {
    res.send("Hello Express!");
    });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

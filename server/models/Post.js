// This code defines the schema for a blog post. It uses the Mongoose library to create a schema that will be used to create new posts.
//The schema is defined in the postSchema variable, which is then exported so that it can be used in other files.

const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
    default: "Imani",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Post", postSchema)

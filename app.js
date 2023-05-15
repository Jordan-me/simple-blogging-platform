// express web application framework for Node.js that provides a set of tools and utilities for building web and mobile applications
const express = require("express");
// mongoose provides a way to interact with MongoDB databases using a higher-level, schema-based 
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

// Connect to MongoDB Atlas - process.env.MONGODB_URI if failed will connect to mongodb://localhost/my-blog-app
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my-blog-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api/posts", require("./routes/posts"));

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

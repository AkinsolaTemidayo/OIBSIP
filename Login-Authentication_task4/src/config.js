const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/mydb");

// check database conneted or not
connect
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

// Create a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// collection part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;

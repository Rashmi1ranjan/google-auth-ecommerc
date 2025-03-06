const mongoose = require("mongoose");
const colors = require("colors");

// Function to connect MongoDB database
const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/Auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDb;
// const mongoose = require("mongoose");
// const colors = require("colors");
// require('dotenv').config();

// // Function to connect MongoDB database
// const connectDb = async () => {
//   try {
//     const conn = await mongoose.connect("mongodb://localhost:27017/Auth", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log(`Connected to MongoDB: ${conn.connection.host}`.bgGreen);
//   } catch (error) {
//     console.log(`MongoDB Error: ${error.message}`.bgRed);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;



const mongoose = require("mongoose");
const colors = require("colors");
require('dotenv').config(); // Ensure dotenv is required to load the .env file

// Function to connect MongoDB database
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
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

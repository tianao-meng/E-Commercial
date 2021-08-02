const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");


// dotenv.config({ path: "backend/config/config.env" });
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

connectDatabase();

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`close the server due to ${err.message}`);
  console.log(`Error Stack: ${err.stack}`);
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `node listen to ${process.env.PORT} port in ${process.env.NODE_ENV} mode`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`close the server due to ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});

const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const Product = require("../models/product");
const data = require("../data/data.json");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seed = async () => {
  try {
    await Product.deleteMany();
    console.log("All data has been deleted");
    await Product.insertMany(data);
    console.log("All data has been inserted");
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
};

seed();

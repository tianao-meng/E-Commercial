const express = require("express");
const products = require("./routes/product");
const users = require("./routes/user");
const orders = require("./routes/order");
const payment = require("./routes/payment");
const errorMiddleware = require("./middlewares/errorMiddlewares");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const path = require('path')
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//app.use(fileUpload());
app.use(cookieParser());

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);
app.use("/api/v1", payment);

if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    })
}

app.use(errorMiddleware);

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/bgc")
  .then(() => {
    console.log("Connected to the server successfully");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.log(err)
  });

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization, X-Requested-With, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "agreementrequired");
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", require("./routes/userRoutes"));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

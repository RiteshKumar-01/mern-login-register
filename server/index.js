const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/userdata");

const PORT = 8001;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/demoUser");

app.post("/register", (req, res) => {
  console.log(req.body);
  userModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect details");
      }
    } else {
      res.json("no record existed!!");
    }
  });
});

app.listen(PORT, () => console.log(`server get connected at PORT: ${PORT}`));

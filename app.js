const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const fs = require("fs");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/p", postRoutes);
app.use("/api", commentRoutes);
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Running");
  });
}
app.listen(PORT, () => {
  console.log("Server statrted at port 8000");
});

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// import routes
const postRoute = require("./routes/postRoute");

// body parser
app.use(express.json());

app.use("/api", postRoute);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// handle global error
app.use((err, req, res, next) => {
  return res.status(500).json({ err });
});

/**
 * connect to the mongodb. after connected listen app
 */
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-kszlk.mongodb.net/eboo_project`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is running on PORT ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));

/**
 * for the DeprecationWarning error, i have to set those value
 */
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

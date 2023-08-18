// Express
const express = require("express");
const port = 8000;
const app = express();
const cors = require("cors");

// Database Connection
const db_connection = require("./config/mongoose");

// Allowing CORS requests//Remember to change the allowed orgin
app.use(cors());

// Parsers
app.use(express.urlencoded());
app.use(express.json({ extended: true }));

// Passport
const passport = require("passport");
const jwt = require("./config/passport-jwt-strategy");

db_connection().then(() => {
  // Routes
  app.use("/", require("./routes"));

  // Initialise Passport
  app.use(passport.initialize());

  // Server
  app.listen(port, function (err) {
    if (err) {
      console.log(`Server Failed to start . Error Encountered : ${err} `);
      return;
    }

    console.log(`Server started succesfully`);
  });
});

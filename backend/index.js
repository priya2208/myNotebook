const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;
var cors = require("cors");

// for cors connecting backend and front end

app.use(cors());
// used if we want to get the data from BODY-- this is a middleware
app.use(express.json());

//Available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

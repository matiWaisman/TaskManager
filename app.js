const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRouter = require("./routes/api");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const path = require("path");

app.use(express.static("./public"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/api", apiRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {}
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "client", "build", "index.html");
    res.sendFile(indexPath);
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.use(notFound);

start();

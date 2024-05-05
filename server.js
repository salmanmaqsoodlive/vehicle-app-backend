require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./routes/index");

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vehicle-db.mpa0xru.mongodb.net/`;

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connected to database");
      console.log(`Server listening on port: ${PORT}`);
    })
  )
  .catch((error) => console.error("An error occurred:", error));

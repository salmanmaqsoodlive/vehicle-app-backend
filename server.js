require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vehicle-db.mpa0xru.mongodb.net/`;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello from app"));

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  )
  .catch((error) => console.error("An error occurred:", error));

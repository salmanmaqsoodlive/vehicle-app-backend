const express = require("express");
const authRoutes = require("./authRoutes");
const vehicleCategoryRoutes = require("./vehicleCategoryRoutes");

const router = express.Router();

router.use("/", authRoutes);
router.use("/vehicleCategory", vehicleCategoryRoutes);
module.exports = router;

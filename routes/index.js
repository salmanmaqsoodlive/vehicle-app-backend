const express = require("express");
const authRoutes = require("./authRoutes");
const vehicleCategoryRoutes = require("./vehicleCategoryRoutes");
const vehicleRoutes = require("./vehicleRoutes");

const router = express.Router();

router.use("/", authRoutes);
router.use("/vehicleCategory", vehicleCategoryRoutes);
router.use("/vehicle", vehicleRoutes);
module.exports = router;

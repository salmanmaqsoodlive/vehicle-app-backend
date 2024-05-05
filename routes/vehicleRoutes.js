const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, vehicleController.getAllVehicles);
router.get("/:id", authenticate, vehicleController.getVehicleById);
router.post("/", authenticate, vehicleController.createVehicle);
router.put("/:id", authenticate, vehicleController.updateVehicle);
router.delete("/:id", authenticate, vehicleController.deleteVehicle);

module.exports = router;

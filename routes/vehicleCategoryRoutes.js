const express = require("express");
const router = express.Router();
const VehicleCategoryController = require("../controllers/vehicleCategoryController");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, VehicleCategoryController.getAllCategories);
router.get("/:id", authenticate, VehicleCategoryController.getCategoryById);
router.post("/", authenticate, VehicleCategoryController.createCategory);
router.put("/:id", authenticate, VehicleCategoryController.updateCategory);
router.delete("/:id", authenticate, VehicleCategoryController.deleteCategory);

module.exports = router;

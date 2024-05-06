const vehicleCategoryService = require("../services/vehicleCategoryService");

class VehicleCategoryController {
  async createCategory(req, res) {
    try {
      const data = await vehicleCategoryService.createCategory(
        req.userId,
        req.body
      );
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllCategories(req, res) {
    try {
      const data = await vehicleCategoryService.getAllCategories();
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const data = await vehicleCategoryService.getCategoryById(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const data = await vehicleCategoryService.updateCategory(
        id,
        req.userId,
        req.body
      );

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const data = await vehicleCategoryService.deleteCategory(
        req.userId,
        req.params.id
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new VehicleCategoryController();

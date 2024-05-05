const vehicleService = require("../services/vehicleService");

class VehicleController {
  async createVehicle(req, res) {
    try {
      const data = await vehicleService.createVehicle(req.userId, req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllVehicles(req, res) {
    try {
      const data = await vehicleService.getAllVehicles();
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getVehicleById(req, res) {
    try {
      const data = await vehicleService.getVehicleById(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async updateVehicle(req, res) {
    try {
      const id = req.params.id;
      const data = await vehicleService.updateVehicle(req.userId, id, req.body);

      res.status(404).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteVehicle(req, res) {
    try {
      const data = await vehicleService.deleteVehicle(
        req.userId,
        req.params.id
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new VehicleController();

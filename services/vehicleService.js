const Vehicle = require("../models/Vehicle");
const xss = require("xss");

class VehicleService {
  async createVehicle(userId, vehicleData) {
    const { model, color, make, registrationNumber, categoryId } = vehicleData;
    if (!model || !color || !make || !registrationNumber || !categoryId) {
      throw new Error("All fields are required");
    }

    const sanitizedModel = xss(model);
    const sanitizedColor = xss(color);
    const sanitizedMake = xss(make);
    const sanitizedRegistrationNumber = xss(registrationNumber);

    const vehicle = new Vehicle({
      model: sanitizedModel,
      color: sanitizedColor,
      make: sanitizedMake,
      registrationNumber: sanitizedRegistrationNumber,
      category: categoryId,
      user: userId,
    });

    await vehicle.save();

    return vehicle;
  }

  async getAllVehicles() {
    const vehicles = await Vehicle.find()
      .populate("category")
      .sort({ createdAt: -1 });
    if (vehicles.length < 1) {
      throw new Error("Vehicles not found");
    }
    return vehicles;
  }

  async getVehicleById(id) {
    if (!id) {
      throw new Error("ID is required");
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  }

  async updateVehicle(userId, id, vehicleData) {
    try {
      let vehicle = await Vehicle.findOne({ _id: id, user: userId });
      if (!vehicle) {
        throw new Error("Vehicle not found");
      }

      // Sanitize the vehicleData
      const sanitizedFields = {};
      for (let key in vehicleData) {
        if (Object.prototype.hasOwnProperty.call(vehicleData, key)) {
          sanitizedFields[key] = xss(vehicleData[key]);
        }
      }

      // Update the vehicle fields
      for (let key in sanitizedFields) {
        if (Object.prototype.hasOwnProperty.call(sanitizedFields, key)) {
          vehicle[key] = sanitizedFields[key];
        }
      }

      // Save the updated vehicle
      vehicle = await vehicle.save();

      return vehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteVehicle(userId, id) {
    const vehicle = await Vehicle.findOne({ _id: id, user: userId });
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    await Vehicle.deleteOne({ _id: id });

    return { message: "Vehicle deleted successfully" };
  }
}

module.exports = new VehicleService();

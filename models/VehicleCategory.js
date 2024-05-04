const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleCategorySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const VehicleCategory = mongoose.model("VehicleCategory", vehicleSchema);

module.exports = VehicleCategory;

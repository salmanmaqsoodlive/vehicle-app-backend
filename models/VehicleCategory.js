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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//serialize user object for response
vehicleCategorySchema.methods.toJSON = function () {
  const vehicleCategoryObject = this.toObject();
  delete vehicleCategoryObject.user;
  return vehicleCategoryObject;
};

const VehicleCategory = mongoose.model(
  "VehicleCategory",
  vehicleCategorySchema
);

module.exports = VehicleCategory;

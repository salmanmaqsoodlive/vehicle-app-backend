const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Vehicle = require("./Vehicle");

const SALT = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
      validate: {
        validator: (value) => {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm.test(
            value
          );
        },
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      },
    },
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    categories: [{ type: Schema.Types.ObjectId, ref: "VehicleCategory" }],
  },
  {
    timestamps: true,
  }
);

//Middleware to encrypt password before saving to database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, SALT);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

//method to compare password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// Middleware to delete all cars associated with a user before the user is removed
userSchema.pre("remove", async function (next) {
  try {
    await Vehicle.deleteMany({ user: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

//serialize user object for response
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

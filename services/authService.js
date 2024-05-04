const validator = require("validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generatePassword = require("generate-password");
const emailService = require("./emailService");

class AuthService {
  async signup(userData) {
    const { name, email } = userData;
    this.validateUserData({ name, email });

    const password = generatePassword.generate({
      length: 8,
      numbers: true,
      uppercase: true,
      lowercase: true,
    });

    const user = new User({ name, email, password });
    await user.save();

    emailService.sendEmail(
      email,
      "Welcome to vehicle registration app",
      `Your auto generated password: ${password}`
    );

    const token = this.signJwtToken(user._id);

    return { user, token };
  }

  async login(email, password) {
    this.validateEmail(email);
    this.validatePassword(password);

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = this.signJwtToken(user._id);

    return { user, token };
  }

  validateEmail(email) {
    if (!email || !validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
  }

  validatePassword(password) {
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
  }

  validateUserData({ name, email }) {
    if (!name) {
      throw new Error("Name is required");
    }

    this.validateEmail(email);
  }

  signJwtToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
  }
}

module.exports = new AuthService();

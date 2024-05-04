const authService = require("../services/authService");

class AuthController {
  async signup(req, res) {
    try {
      const data = await authService.signup(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const data = await authService.login(email, password);
      res.status(200).json(data);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();

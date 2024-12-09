const userModel = require("../models/userModel");
const { nanoid } = require("nanoid");

const authController = {
  async register(request, h) {
    const { name, email, password } = request.payload;
    try {
      const userId = nanoid();

      await userModel.createUser({
        id: userId,
        name,
        email,
        password,
      });

      return h.response({ message: "User registered successfully!", userId }).code(201);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to register user." }).code(500);
    }
  },

  async login(request, h) {
    const { email, password } = request.payload;

    try {
      const user = await userModel.getUserByEmail(email);
      if (!password) {
        return h.response({ error: "Invalid email or password." }).code(401);
      }
      return h.response({ message: "Login successful", user }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to login." }).code(500);
    }
  },

  async resetPassword(request, h) {
    const { email, newPassword, confirmPassword } = request.payload;
  
    if (newPassword !== confirmPassword) {
      return h.response({ error: "Passwords do not match." }).code(400);
    }
  
    try {
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return h.response({ error: "User not found." }).code(404);
      }
  
      await userModel.updateUserPassword(email, newPassword);
      return h.response({ message: "Password reset successful." }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to reset password." }).code(500);
    }
  }
  

};

module.exports = authController;

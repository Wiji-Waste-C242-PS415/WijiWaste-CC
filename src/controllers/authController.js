const userModel = require("../models/userModel");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = {
  async register(request, h) {
    const { name, email, password } = request.payload;
    try {
      const userId = nanoid();
      
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      await userModel.createUser({
        id: userId,
        name,
        email,
        password: hashedPassword,
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
      if (!user) {
        return h.response({ error: "Invalid email or password." }).code(401);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return h.response({ error: "Invalid email or password." }).code(401);
      }

      // Create JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return h.response({ message: "Login successful!", token }).code(200);
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

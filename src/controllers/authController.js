const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const authController = {
  async register(request, h) {
    const { name, email, password } = request.payload;
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .pattern(/[^A-Za-z0-9]/) // Validasi harus ada setidaknya satu simbol
        .required()
        .messages({
          "string.min": "Password must be at least 6 characters long.",
          "string.pattern.base": "Password must include at least one symbol.",
        }),
    });

    const { error } = schema.validate(request.payload);
    if (error) {
      return h.response({ error: error.details[0].message }).code(400);
    }

    if (!name || !email || !password) {
      return h.response({ error: "All fields are required." }).code(400);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await userModel.createUser({
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

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
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

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userModel.updateUser(user.id, { password: hashedPassword });

      return h.response({ message: "Password reset successful." }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to reset password." }).code(500);
    }
  }

};

module.exports = authController;

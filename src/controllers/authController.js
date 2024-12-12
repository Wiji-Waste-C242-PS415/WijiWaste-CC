const userModel = require("../models/userModel");
const { nanoid } = require("nanoid");

const authController = {
  async register(request, h) {
    const { name, email, password } = request.payload;
    try {
        // Periksa apakah email sudah terdaftar
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return h.response({ error: "Email is already registered." }).code(400);
        }

        const userId = nanoid();
        // Tambahkan field address dan photoUrl dengan nilai default
        await userModel.createUser({
            id: userId,
            name,
            email,
            password,
            address: "", // Default address kosong
            photoUrl: "",
            points: 0,
        });

        return h.response({
            message: "User registered successfully!",
            userId
        }).code(201);
    } catch (err) {
        console.error(err);
        return h.response({ error: "Failed to register user." }).code(500);
    }
},

  async login(request, h) {
    const { email, password } = request.payload;

    try {
      const user = await userModel.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.response({ error: "Invalid email or password." }).code(401);
      }

      return h.response({ message: "Login successful!", user }).code(200);
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
  },

  async logout(request, h) {
    try {
      // Menghapus cookie (misalnya untuk sesi login)
      return h.response({ message: "Logout successful!" })
        .unstate('session')  // Menghapus cookie 'session'
        .code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to logout." }).code(500);
    }
  },
};

module.exports = authController;

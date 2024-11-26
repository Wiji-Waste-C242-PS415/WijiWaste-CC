const userModel = require("../models/profileModel");

const profileController = {
  async getProfile(request, h) {
    const { userId } = request.query;

    try {
      const user = await userModel.getUserById(userId);
      if (!user) {
        return h.response({ error: "User not found." }).code(404);
      }

      return h.response({ message: "Profile retrieved successfully.", user }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to retrieve profile." }).code(500);
    }
  },

  async updateProfile(request, h) {
    const { userId } = request.query;
    const { name, email } = request.payload;

    try {
      const user = await userModel.getUserById(userId);
      if (!user) {
        return h.response({ error: "User not found." }).code(404);
      }

      await userModel.updateUser(userId, { name, email });

      return h.response({ message: "Profile updated successfully." }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to update profile." }).code(500);
    }
  },
};

module.exports = profileController;

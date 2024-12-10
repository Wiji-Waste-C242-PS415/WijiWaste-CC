const profileModel = require("../models/profileModel");

const profileController = {
  async getProfile(request, h) {
    const email = request.user.email; // Ambil email dari token yang diverifikasi
    try {
      const user = await profileModel.getUserByEmail(email); // Ambil user berdasarkan email
      if (!user) {
        return h.response({ error: "User not found." }).code(404);
      }
  
      return h.response({
        message: "Profile retrieved successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address || "",
          photoUrl: user.photoUrl || "",
        },
      }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to retrieve profile." }).code(500);
    }
  },
  
  async updateProfile(request, h) {
    const { userId } = request.query;
    const { name, email, password, address, photoUrl } = request.payload;

    try {
      const user = await profileModel.getUserById(userId);
      if (!user) {
        return h.response({
          error: "User not found."
        }).code(404);
      }

      const updatedData = { name, email, address };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
      if (photoUrl) {
        updatedData.photoUrl = photoUrl;
      }

      await profileModel.updateUser(userId, updatedData);

      return h.response({
        message: "Profile updated successfully.",
        redirect: `/profile?userId=${userId}`,
      }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to update profile." }).code(500);
    }
  },
};

module.exports = profileController;
